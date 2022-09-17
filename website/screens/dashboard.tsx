import React from "react";
import { signOut } from "next-auth/react";
import Sidebar from "../components/common/Sidebar";
import {Divider, Grid} from "@mui/material";
import {FilePresent} from "@mui/icons-material";
import Image from "next/image";
import { Navbar } from "../components/common/Navbar";
import Lottie from 'react-lottie-player'
import emptybox from '../public/assets/emptybox.json'

function DashBoard() {

    const stuff = ["my life.txt","maaboi.pdf","i am sad.py","assign.docx","Mylife.kt","aaaa.java","omg.tsx"]
    // const stuff : string[] = []
    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <div className="basis-[100%]">
                    {
                        stuff.length > 0 && (
                            <>
                                <div className="font-bold text-[20px] p-[10px]">
                                    Owned by me
                                </div>
                                <Grid container spacing={6} className="w-[100%] m-[10px]">
                                    {
                                        stuff.map((s: string)=> {
                                            let icon = "/assets/icons/file.png"

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
                                                    <div className="flex flex-col items-center shadow-md" >

                                                        <Image src={icon} alt="File" height={80} width={80} />
                                                        <div className="w-[100%] h-[20px] overflow-x-hidden text-center">
                                                            {
                                                                s
                                                            }
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </>
                        )
                    }
                    {
                        stuff.length==0 && (
                            <div className="flex flex-col items-center p-[20px] m-auto">
                                <Lottie
                                    play
                                    loop
                                    animationData={emptybox}
                                    style={{
                                        height : "200px",
                                        width : "auto"
                                    }}
                                />
                                <div>
                                    No files added
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <button onClick={() => signOut()}>signout</button>
        </div>
    );
}

export default DashBoard;
