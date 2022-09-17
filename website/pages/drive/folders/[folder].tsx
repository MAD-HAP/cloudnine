import { doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { Navbar } from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";
import { useRouter } from "next/router";
import { FileCopy, Folder as Fldr } from "@mui/icons-material";
import Head from "next/head";
import { db } from "../../../serverless/firebase";

function Folder({folders, files}: any) {
    const router = useRouter();
    return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Head>
        <title>My Drive</title>
      </Head>
      <Navbar />
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full flex flex-col ">
          {folders.map((f: any, index: any) => {
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
          {files.map((f: any, index: any) => {
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
    </div>
  );
}

export default Folder;

export async function getServerSideProps(context: any) {
    const folderId = context.query.folder;

    const docRef = doc(db, 'folders', folderId);
    const docData = await getDoc(docRef);


    return {
        props: {}
    }
}