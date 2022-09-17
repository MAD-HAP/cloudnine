import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../serverless/firebase";
import { useSession } from "next-auth/react";
import { FileCopy, Folder } from "@mui/icons-material";

function Home() {
  const { data: session, status } = useSession();
  const [fsStruct, setFsStruct] = useState([
    ["degree.pdf", "Baldev Setia", "folder"],
    ["degree.pdf", "Baldev Setia", "file"],
  ]);

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
          {fsStruct.map((f, index) => {
            return (
              <div className="flex flex-row justify-evenly w-full">
                {f[2] === "folder" ? <Folder /> : <FileCopy />}
                <p className="text-2xl"> {f[0]} </p>
                <p className="text-2xl"> {f[1]} </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
