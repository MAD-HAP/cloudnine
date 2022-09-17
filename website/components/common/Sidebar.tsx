import { Button, Link, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWidth } from "../hooks/useWidth";
import {
    FolderShared,
    Groups2,
    ListAlt,
    ChevronRight,
    ChevronLeft, Add,
} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import {db} from "../../serverless/firebase";
import {doc, DocumentSnapshot, getDoc, setDoc} from "@firebase/firestore";
import {DataSnapshot} from "@firebase/database";
import {useRouter} from "next/router";

function Sidebar() {
  const width = useWidth();
  const { data: session, status } = useSession();
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    width > 1000 ? setIsExpanded(true) : setIsExpanded(false);
  }, []);

  if (!isExpanded) {
    return (
      <>
        <div
          style={{
            height: "100vh",
            width: "50px",
            borderRight: "0.33px solid black",
            boxShadow: "4px 0 2px -1px #888",
          }}
        >
          <Button onClick={() => setIsExpanded(true)}>
            <ChevronRight />
          </Button>
        </div>
      </>
    );
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "20vw",
        minWidth: "350px",
        borderRight: "0.33px solid black",
        boxShadow: "4px 0 2px -1px #888",
      }}
    >
      <Button fullWidth sx={{alignContent: 'right'}} onClick={()=>{setIsExpanded(false);}}><ChevronLeft /></Button>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "15px",
          "& button": { m: 1 },
        }}
      >
        <div>
          <ListAlt sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{ textDecoration: "none", fontSize: "1.33rem", color: "black" }}
            href="my"
          >
            {" "}
            Owned Files{" "}
          </Link>
        </div>
        <div>
          <FolderShared sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{ textDecoration: "none", fontSize: "1.33rem", color: "black" }}
            href="shared"
          >
            {" "}
            Shared{" "}
          </Link>
        </div>
          <div>
              <Add sx={{ height: "40px", width: "40px" }} />{" "}
              <div
                  style={{ textDecoration: "none", fontSize: "1.33rem", color: "black" }}
                  onClick={()=>{
                      // @ts-ignore
                      let name : string = prompt("enter name")
                      getDoc(doc(db,"Groups",name===null ? "" : name)).then((snap : DocumentSnapshot)=>{
                          if(snap.exists()) {
                              alert("Group with this name already exists")
                          }
                          else {
                              setDoc(doc(db,"Groups",name),{
                                  name : name
                              }).then(r=>{
                                  router.push(`/groups/${name}`)
                              }).catch(error=> console.log(error))
                          }
                      })
                  }}
              >
                  {" "}
                  Add Group{" "}
              </div>
          </div>
        <div>
          <Groups2 sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            style={{ textDecoration: "none", fontSize: "1.33rem", color: "black" }}
            href="groups"
          >
            {" "}
            Groups{" "}
          </Link>
        </div>
      </Stack>
    </div>
  );
}

export default Sidebar;
