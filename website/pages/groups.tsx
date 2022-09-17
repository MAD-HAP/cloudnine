import { Button } from "@mui/material";
import React from "react";
import { Navbar } from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function group() {
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
            <Button onClick={() => createGroup}>+ New Group</Button>
          </div>
          display groups here
        </div>
      </div>
    </div>
  );
}
