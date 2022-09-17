import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import { Navbar } from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import ModalContainer from "../components/common/ModalContainer/ModalContainer";

export default function group() {

  const [open,setOpen] = useState(false)
  const [name,setName] = useState("")

  const createGroup = async () => {

  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1>Your Groups</h1>
            <Button onClick={() => setOpen(true)}>+ New Group</Button>
          </div>
          display groups here
        </div>
      </div>
      <ModalContainer
        isOpen={open}
        close={()=> setOpen(false)}
        >
        <div>
          <div className="font-bold text-[25px]">
            Create Group
          </div>
          <TextField
            placeholder="Enter name"
            value={name}
            onChange={(event: any)=> setName(event.target.value)}
            />
        </div>
      </ModalContainer>
    </div>
  );
}
