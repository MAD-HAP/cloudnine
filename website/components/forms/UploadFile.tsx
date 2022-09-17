import { AddCircleSharp } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import ModalContainer from "../common/ModalContainer/ModalContainer";

export default function UploadFile({
  addImageToFile,
  uploadSomething,
  open,
  close,
}: any) {
  const uploadRef = useRef(null);
  const [filename, setFilename] = useState("");
  const upload = (e: any) => {
    uploadSomething(filename);
  };
  return (
    <ModalContainer isOpen={open} close={close}>
      <div className="flex flex-col justify-between h-full w-full align-middle">
        FileName to be displayed: 
        <TextField
          type="string"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <div style={{ alignItems: "center" }} className="mt-10 flex flex-col">
          <AddCircleSharp sx={{ height: "300px", width: "300px" }} />
          <p className="text-2xl">Drag and Drop files</p>
        </div>
        <div style={{ alignItems: "center" }} className="flex flex-col">
          <p className="text-2xl">Browse files manually</p>
          <br />
          <br />
          <input type="file" ref={uploadRef} onChange={addImageToFile} />
        </div>
        <button onClick={upload}>submit</button>
        <br />
      </div>
    </ModalContainer>
  );
}
