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

function Folder({ folders, files }: any) {
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const [folder,setFolder] = useState()

    useEffect(()=>{
        while (!router.isReady) {}
        // @ts-ignore
        setFolder(router.query.folder)
    },[router])

    console.log(folder)
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Head>
                <title>My Drive</title>
            </Head>
            <Navbar />
            <div className="w-full flex">
                <Sidebar />
                <div className="w-full flex flex-col ">
                {folders?.map((f: any, index: any) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-row justify-evenly w-full"
                            onClick={() => {
                                router.push(`/drive/folders/${f[1]}`);
                            }}
                        >
                            <Fldr />
                            <p className="text-2xl"> {f[0]} </p>
                        </div>
                    );
                })}
                {files?.map((f: any, index: any) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-row justify-evenly w-full"
                            onClick={() => {
                                window.location.href = f[1];
                            }}
                        >
                            <FileCopy />
                            <p className="text-2xl"> {f[0]} </p>
                        </div>
                    );
                })}
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
    const docData = (await getDoc(docRef)).data();

    const fileRef = collection(docRef, "files");
    const files = (await getDocs(fileRef)).docs?.map((file) => {
        if (file.data()["url"])
            return [
                file.data()["name"]["name"]
                    ? file.data()["name"]["name"]
                    : "Nothing",
                file.data()["url"] ? file.data()["url"] : "",
            ];
    });

    const folders = docData?.["folders"]
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
