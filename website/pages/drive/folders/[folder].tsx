import React, {useEffect, useState} from "react";
import { Navbar } from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";
import ButtOn from "../../../components/common/ButtOn/ButtOn";
import AddToGroup from "../../../components/forms/ShareFile";
import {useRouter} from "next/router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FileCopy, Folder as Fldr } from "@mui/icons-material";
import Head from "next/head";
import { db } from "../../../serverless/firebase";
import {Grid} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {useCollectionData, useDocument} from "react-firebase-hooks/firestore";
import {query} from "@firebase/firestore";

function Folder({ folders, files }: any) {
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const [folder,setFolder] = useState("a")

    // const [folders] = useDocument(doc(db,"folders",folder))
    // @ts-ignore
    // const [files] = useCollectionData(query(collection(doc(db,"folders",folder),"files")))

    // console.log(folders?.data())
    // console.log(files)

    useEffect(()=>{
        if (!router.isReady) { return}
        // @ts-ignore
        setFolder(router.query.folder)
    },[router])

    // console.log(folders?.data())
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
                                console.log(f)
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
                            files?.map((f: any, index: any)=> {
                                console.log(f)
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
            <AddToGroup
                file={folder}
                open={open}
                close={()=>setOpen(false)}
                link={"http://localhost:3000/" + router.asPath} />
        </div>
    );
}

export default Folder;

export async function getServerSideProps(context: any) {
    const folderId = context.query.folder;

    const docRef = doc(db, "folders", folderId);
    const docData = (await getDoc(docRef))?.data();

    const fileRef = collection(docRef, "files");
    const fileDoc = await getDocs(fileRef);
    const files = fileDoc && fileDoc.docs ? fileDoc.docs?.map((file) => {
        if (file.data()["url"])
            return [
                file.data()["name"]["name"] && file.data()["name"]["name"].length>0
                    ? file.data()["name"]["name"]
                    : "Nothing",
                file.data()["url"] ? file.data()["url"] : "",
            ];
    }) : [];

    const folders = docData && docData?.["folders"]
        ? docData?.["folders"]?.map((folder: any) => {
              return [folder["name"], folder["id"]];
          })
        : [];
    return {
        props: {
            name: docData?.["name"],
            folders,
            files,
        },
    };
}
