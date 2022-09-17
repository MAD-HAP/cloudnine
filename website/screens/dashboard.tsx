import React from "react";
import { signOut } from "next-auth/react";
import Sidebar from "../components/common/Sidebar";
import {Divider, Grid} from "@mui/material";
import {FilePresent} from "@mui/icons-material";
import Image from "next/image";
import { Navbar } from "../components/common/Navbar";

function DashBoard() {

    const stuff = ["my life.txt","maaboi.pdf","i am sad.py","assign.docx","Mylife.kt","aaaa.java","omg.tsx"]
    return (
        <div>
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <div className="flex-auto">
                    <div className="shadow-md">
                        Owned by me
                    </div>
                    <Grid container spacing={2}>
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
                                    <Grid item xs={3}>
                                        <div className="flex flex-col items-center shadow-md" >

                                            <Image src={icon} alt="File" height={80} width={80} />
                                            <div className="w-[100%] h-[20px] overflow-x-clip">
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
                </div>
            </div>
            <button onClick={() => signOut()}>signout</button>
        </div>
    );
}

export default DashBoard;
