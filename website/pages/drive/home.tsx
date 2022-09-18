import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../serverless/firebase";
import { getSession, useSession } from "next-auth/react";
import { FileCopy, Folder } from "@mui/icons-material";
import {Grid, Link} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

function Home({ folders, files }: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log(folders)
    console.log(files)

    useEffect(() => {
        if (!session?.user?.email) return;
        setDoc(
            doc(db, "users", session?.user?.email!),
            {
                name: session?.user?.name!,
                email: session?.user?.email,
                image: session?.user?.image!,
            },
            { merge: true }
        );
    }, [session]);

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Head>
                <title>My Drive</title>
            </Head>
            <Navbar />
            <div className="w-full flex">
                <Sidebar />
                <div className="w-full flex flex-col ">
                    <Grid container spacing={6} className="w-[100%] m-[10px]">
                        {
                            folders?.map((f: any, index: any)=> {

                                return (
                                    <Grid item xs={2}>
                                        <Link href={`/drive/folders/${f[1]}`}>
                                            <div className="flex flex-col items-center shadow-md p-[10px] hover:cursor-pointer hover:bg-gray-50 hover:shadow-xl duration-[400]" >

                                                <Image src="/assets/icons/folder.png" alt="File" height={80} width={80} />
                                                <div className="w-[100%] h-[20px] text-center">
                                                    {
                                                        f[0]
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </Grid>
                                )
                            })
                        }
                        {
                            files.map((f: any, index: any)=> {
                                let icon = "/assets/icons/file.png"
                                let s = f[0]
                                if(s.endsWith("pdf")) {
                                    icon = "/assets/icons/pdf.png"
                                }
                                else if(s.endsWith("doc") || s.endsWith("docx")) {
                                    icon = "/assets/icons/doc.png"
                                }
                                else if(s.endsWith("jpg")) {
                                    icon = "/assets/icons/jpg.png"
                                }
                                else if(s.endsWith("xls") || s.endsWith("xlsx")) {
                                    icon = "/assets/icons/xls.png"
                                }
                                else if(s.endsWith("txt")) {
                                    icon = "/assets/icons/txt.png"
                                }
                                return (
                                    <Grid item xs={2}>
                                        <Link href={f[1]}>
                                            <div className="flex flex-col items-center shadow-md p-[10px] hover:cursor-pointer hover:bg-gray-50 hover:shadow-xl duration-[400]" >

                                                <Image src={icon} alt="File" height={80} width={80} />
                                                <div className="w-[100%] h-[20px] text-center">
                                                    {
                                                        f[0]
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Home;

export async function getServerSideProps(context: any) {
    const user = await getSession(context);
    const docRef = doc(db, "users", user?.user?.email!);
    const docs = (await getDoc(docRef)).data();

    const fileRef = collection(docRef, "files");
    const files = (await getDocs(fileRef)).docs?.map((file) => {
        return [
            file.data()["name"]["name"],
            file.data()["url"] ? file.data()["url"] : "",
        ];
    });

    const folders = docs?.["folders"]
        ? docs?.["folders"]?.map((folder: any) => {
              return [folder["name"], folder["id"]];
          })
        : null;

    return {
        props: {
            folders,
            files,
        },
    };
}
