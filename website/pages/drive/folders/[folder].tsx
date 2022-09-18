import React, {useEffect, useState} from "react";
import { Navbar } from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";
import ButtOn from "../../../components/common/ButtOn/ButtOn";
import AddToGroup from "../../../components/forms/ShareFile";
import {useRouter} from "next/router";

function Folder() {

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
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div>
                    <ButtOn
                        onClick={() => setOpen(true)}>
                        share
                    </ButtOn>
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
