import {
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { ContactMailSharp } from "@mui/icons-material";
import ModalContainer from "../common/ModalContainer/ModalContainer";
import ButtOn from "../common/ButtOn/ButtOn";
import { AddedToGroup } from "../../services/AddedToGroup";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {arrayUnion, collection, doc, setDoc} from "firebase/firestore";
import {db} from "../../serverless/firebase";
import {DocumentData, query} from "@firebase/firestore";

export default function AddToGroup({ id, group, owner, open, close, link }: any) {
  const form = useRef(null);
  const [email, setEmail] = useState("");
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [download, setDownload] = useState(false);
  const [del, setDel] = useState(false);
  const [users] = useCollectionData(query(collection(db,"users")))

  const handleChangeRead = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRead(e.target.checked);
  };
  const handleChangeWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrite(e.target.checked);
  };
  const handleChangeDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownload(e.target.checked);
  };
  const handleChangeDel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDel(e.target.checked);
  };

  const submit = (e: any) => {
    e.preventDefault();
    //update firebase, add person to group

    if(group.members.find((member : any)=> member.email===email)) {
      alert("User is already present in the group")
      return
    }

    let user = users?.find((data : DocumentData)=> data.email===email)

    if(!user) {
      alert("User with this email does not exist")
      return
    }

    setDoc(doc(db,"Groups",id), {
      members : arrayUnion({
        email : email,
        image : user.image,
        read : read,
        write : write,
        download : download,
        delete : del
      })
    },{
      merge : true
    }).finally(()=> close())

    console.log(form.current)
    //group, owner, link, email
    AddedToGroup(form.current);
  };
  return (
    <ModalContainer isOpen={open} close={close}>
      <br />
      <p className="text-3xl">Add Members to your Group</p>
      <form ref={form}>
        Add members to the group: <input name="group" value={group.name} /> <br/>
        Owner: <input name="owner" value={owner} /> <br />
        <br />
        <br />
        <TextField
          label="Email"
          name="email"
          autoComplete="false"
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactMailSharp color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <p className="text-2xl">Permissions</p>
        <FormControlLabel
          label="Read"
          control={<Checkbox checked={read} onChange={handleChangeRead} />}
        />
        <FormControlLabel
          label="Write"
          control={<Checkbox checked={write} onChange={handleChangeWrite} />}
        />
        <FormControlLabel
          label="Download"
          control={
            <Checkbox checked={download} onChange={handleChangeDownload} />
          }
        />
        <FormControlLabel
          label="Delete"
          control={<Checkbox checked={del} onChange={handleChangeDel} />}
        />
        <br /> <br />
        Generated link: <input name="link" value={link} /> <br /> <br />
        <ButtOn onClick={submit}>Add Member</ButtOn>
      </form>
    </ModalContainer>
  );
}
