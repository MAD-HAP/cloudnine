import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import { Navbar } from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ModalContainer from "../../components/common/ModalContainer/ModalContainer";
import {addDoc, collection, doc, DocumentReference, getDoc, setDoc} from "@firebase/firestore";
import {db} from "../../serverless/firebase";
import {useRouter} from "next/router";

export default function group() {

  const router = useRouter()
  const [open,setOpen] = useState(false)
  const [name,setName] = useState("")

  const createGroup = async () => {
    if(name==="" || name.includes(" ")) {
      alert("Name cannot be empty or contain blank characters")
      return
    }
    addDoc(collection(db,"Groups"),{
      name : name
    }).then((docRef: DocumentReference) => {
      alert(docRef.id)
      router.push(`/groups/${docRef.id}`)
    })
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
        style = {{
          height : "500px"
        }}
        >
        <div className="flex flex-col items-center">
          <div className="font-bold text-[25px] m-[10px]">
            Create Group
          </div>
          <TextField
            placeholder="Enter name"
            value={name}
            onChange={(event: any)=> setName(event.target.value)}
            style={{
              width : "100%"
            }}
            />
          <Button
            onClick={createGroup}>
            Create
          </Button>
        </div>
      </ModalContainer>
    </div>
  );
}
