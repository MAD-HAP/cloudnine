import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../serverless/firebase";
import { getSession, useSession } from "next-auth/react";
import { FileCopy, Folder } from "@mui/icons-material";
import {Link} from '@mui/material';
import { useRouter } from "next/router";

function Home({ folders, files }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
          {folders.map((f: any, index: any) => {
            return (
              <div key={index} className="flex flex-row justify-evenly w-full" onClick={() => window.location.href = f[2]}>
                {f[2] === "folder" ? <Folder /> : <FileCopy />}
                <p className="text-2xl"> {f[0]} </p>
              </div>
            );
          })}
          {files.map((f: any, index: any) => {
            return (
              <div key={index} className="flex flex-row justify-evenly w-full" onClick={() => router.push(f[2])}>
                {f[2] === "folder" ? <Folder /> : <FileCopy />}
                <p className="text-2xl"> {f[0]} </p>
              </div>
            );
          })}
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
    const files = (await getDocs(fileRef)).docs.map((file) => {
        return [file.data()["name"]["name"], "file", file.data()["url"]];
    });

    const folders = docs?.["folders"].map((folder: any) => {
        return [folder["name"], "folder", folder["id"]];
    });

    return {
        props: {
            folders,
            files,
        },
    };
}
