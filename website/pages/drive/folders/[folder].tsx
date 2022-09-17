import { doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { Navbar } from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";
import { db } from "../../../serverless/firebase";

function Folder() {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex">
                <Sidebar />
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