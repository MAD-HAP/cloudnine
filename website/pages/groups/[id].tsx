import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {doc, DocumentData, DocumentSnapshot, getDoc, onSnapshot} from "@firebase/firestore";
import {db} from "../../serverless/firebase";
import {Navbar} from "../../components/common/Navbar";
import {useDocument} from "react-firebase-hooks/firestore";
import Lottie from "react-lottie-player";
import emptybox from '../../public/assets/emptybox.json'
import Head from "next/head";
import {Fab} from "@mui/material";
import {Add, Share} from "@mui/icons-material";
import AddToGroup from "../../components/forms/AddToGroup";
import {useSession} from "next-auth/react";
import Sidebar from "../../components/common/Sidebar";
import ShareFile from "../../components/forms/ShareFile";

const Group = () => {
    const router = useRouter()
    const id = router.query.id || "a";
    const { data: session, status } = useSession();
    const [open,setOpen] = useState(false)
    const [shareOpen, setShareOpen] = useState(false);
    // @ts-ignore
    const [snapshot] = useDocument(doc(db, 'Groups', id));

    useEffect(()=> {

    },[])
    return (
        <div>
            <Head>
                <title>
                    {
                        snapshot ? (snapshot.exists() ? snapshot.data().name : "Group Not Found") :  "Loading"
                    }
                </title>
            </Head>
            <Navbar />
            {
                // @ts-ignore
                (snapshot && snapshot.exists() && (snapshot?.data()?.members?.find(member => member.email===session?.user?.email!)) ) ? (
                    <div className="m-[30px]">
                        <div style={{display: 'flex', flexDirection : "row", alignItems : "center"}}>
                            <div className="font-bold text-[50px] flex-auto">{snapshot.data().name}</div>
                            {
                                snapshot?.data()?.creator===session?.user?.email! && (
                                    <>
                                        <Fab variant="extended" className="flex-end mx-[10px]" onClick={()=> setShareOpen(true)}>
                                            <Share />
                                            Share
                                        </Fab>
                                        <Fab variant="extended" className="flex-end ml-[10px]" onClick={()=> setOpen(true)}>
                                            <Add />
                                            Add member
                                        </Fab>
                                    </>
                                )
                            }
                        </div>
                        <div>
                            <div className="text-[20px] font-bold">Members</div>
                            <div className="flex flex-row p-[10px] overflow-x-auto">
                                {
                                    snapshot?.data().members.map((member : any)=> {
                                        return (
                                            <div className="flex flex-col items-center m-[10px] shadow-md">
                                                <img className="rounded-[50%] h-[80px] w-[80px] m-[5px]" src={member.image ? member.image : ""} alt=""/>
                                                <div className="w-[150px] overflow-x-hidden m-[10px]">
                                                    {member.email}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="text-[20px] font-bold">Files</div>
                        </div>
                        <AddToGroup
                            id={id}
                            group={snapshot?.data()}
                            owner={snapshot?.data()?.creator}
                            open={open}
                            close={() => setOpen(false)}
                            link={`http://localhost:3000/groups/${id}`}
                        />
                        <ShareFile
                            open={shareOpen}
                            close={()=>setShareOpen(false)}/>
                    </div>
                ) : (
                    <div className="m-auto flex flex-col items-center">
                        <Lottie
                            play
                            loop
                            animationData={emptybox}
                            style={{
                                height : "200px",
                                width : "auto"
                            }} />
                        <div className="m-[20px] font-bold text-[25px]">
                            Group Not Found
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Group;