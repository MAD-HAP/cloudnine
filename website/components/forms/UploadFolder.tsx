import { AddCircleSharp } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import ModalContainer from "../common/ModalContainer/ModalContainer";

export default function UploadFolder({
  open,
  close,
  addFolder
}: any) {
  const [filename, setFilename] = useState("");
  const upload = () => {
    if(filename==="") {
      alert("Name can't be empty")
      return
    }
    addFolder(filename)
  }
  return (
    <ModalContainer isOpen={open} close={close}>
      <div className="flex flex-col justify-between h-full w-full align-middle">
        FileName to be displayed: 
        <TextField
          type="string"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        
        <button onClick={upload}>submit</button>
        <br />
      </div>
    </ModalContainer>
  );
}
