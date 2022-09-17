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

export default function AddToGroup({ group, owner, open, close, link }: any) {
  const form = useRef(null);
  const [email, setEmail] = useState("");
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [download, setDownload] = useState(false);
  const [del, setDel] = useState(false);
  
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

    //send email to invited person
    AddedToGroup({
      group: group,
      owner: owner,
      email: email,
      link: link
    })
  }
  return (
    <ModalContainer open={open} close={close}>
      <p className="text-3xl">Add members to {group}</p>
      <p className="text-l">Owner: {owner}</p>
      <br />
      <br />
      <form ref={form}>
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

        <ButtOn onClick={submit}>
          Add Member
        </ButtOn>
      </form>
    </ModalContainer>
  );
}
