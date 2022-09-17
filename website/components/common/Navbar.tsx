import {InputAdornment, TextField} from "@mui/material";
import {Close, Info, Search, Settings} from "@mui/icons-material";
import {useEffect, useState} from "react";

export const Navbar = () => {

    const [width,setWidth] = useState(4000)
    const [hideIcons,setHideIcons] = useState(false)

    useEffect(()=>{
        setWidth(window.innerWidth)
        const handleWidth = ()=>{
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleWidth)
        return ()=>{
            window.removeEventListener("resize",handleWidth)
        }
    })

    return (
        <div className="flex flex-row p-[10px] shadow items-center">
            <img
                src="/templogo.gif"
                className="h-[60px] w-auto rounded-[50%]"
                alt="Cloud Nine"/>
            {
                width > 800 && (
                    <div className="text-[20px] ml-[5px] font-bold">
                        Cloud Nine
                    </div>
                )
            }
            {
                (hideIcons || width >=540) && (
                    <TextField
                        InputProps={{
                            startAdornment : (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {
                                        hideIcons && <Close onClick={()=> setHideIcons(false)}/>
                                    }
                                </InputAdornment>
                            )
                        }}
                        placeholder="Search ~(˘▾˘~)"
                        style={{
                            flex : "auto",
                            margin : `0 ${width > 800 ? "50px" : "10px"}`
                        }}
                    />
                )
            }
            <div className="berysmol:flex-auto" />
            {
                !hideIcons && (
                    <Settings
                        className="h-[40px] p-[5px] w-auto mx-[10px] rounded-[50%] hover:cursor-pointer hover:bg-gray-200 mid:mx-[5px] mid:h-[35px]"/>
                )
            }
            {
                !hideIcons && (
                    <Info
                        className="h-[40px] p-[5px] w-auto mx-[10px] rounded-[50%] hover:cursor-pointer hover:bg-gray-200 mid:mx-[5px] mid:h-[35px]"/>
                )
            }
            {
                !hideIcons && width < 540 && (
                    <Search
                        className="h-[40px] p-[5px] w-auto mx-[10px] rounded-[50%] hover:cursor-pointer hover:bg-gray-200 mid:mx-[5px] mid:h-[35px]"
                        onClick={()=> setHideIcons(true)}
                    />
                )
            }

            <img
                src="/tempprofile.jpg"
                alt="User"
                className="h-[50px] w-[50px] rounded-[50%] ml-[10px] mid:ml-[5px] mid:h-[40px] mid:w-[40px]"/>
        </div>
  );
};
