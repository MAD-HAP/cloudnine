import React from "react";
import {Dialog, DialogTitle} from "@mui/material";
import Lottie from "react-lottie-player";
import loadingAnimation from '../../public/assets/loadinganimation.json'

export const LoadingDialog = ({open,onClose} : {open : boolean, onClose : any})=>{
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className="flex flex-col items-center justify-center rounded-[60px]">
                <Lottie
                    animationData = {loadingAnimation}
                    play
                    loop
                    className="h-[140px]"
                />
                <div className="font-bold text-[28px]">
                    Loading
                </div>
            </DialogTitle>
        </Dialog>
    )
}