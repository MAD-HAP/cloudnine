import { AddCircleSharp } from "@mui/icons-material";
import React, { useRef } from "react";
import ModalContainer from "../common/ModalContainer/ModalContainer";

export default function UploadFile({ open, close }: any) {
  const uploadRef = useRef(null);
  return (
    <ModalContainer isOpen={open} close={close}>
      <div className="flex flex-col justify-between h-full w-full align-middle">
        <div style={{alignItems: 'center'}} className="mt-10 flex flex-col">
          <AddCircleSharp sx={{ height: "300px", width: "300px" }} />
          <p className="text-2xl">Drag and Drop files</p>
        </div>
        <div style={{alignItems: 'center'}} className="flex flex-col">
          <p className="text-2xl">Browse files manually</p>
          <br/><br/>
          <input type="file" ref={uploadRef} />
        </div>
        <br />
      </div>
    </ModalContainer>
  );
}
