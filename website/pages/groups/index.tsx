import {Button, Fab, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import { Navbar } from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ModalContainer from "../../components/common/ModalContainer/ModalContainer";
import {
  addDoc,
  collection,
  DocumentReference,
  query,
  QueryDocumentSnapshot
} from "@firebase/firestore";
import {db} from "../../serverless/firebase";
import {useRouter} from "next/router";
import {Add} from "@mui/icons-material";
import {useSession} from "next-auth/react";
import {useCollection} from "react-firebase-hooks/firestore";
import Link from "next/link";
import Lottie from "react-lottie-player";
import emptybox from "../../public/assets/emptybox.json";
import Head from "next/head";
import {LoadingDialog} from "../../components/common/LoadingDialog";

type Member = {
  email : string,
  read : boolean,
  write : boolean,
  download : boolean,
  delete : boolean,
  image? : string | null
}

type Group = {
  name : string,
  creator : string,
  members : Member[]
}

export default function group() {

  const router = useRouter()
  const { data: session, status } = useSession();
  const [open,setOpen] = useState(false)
  const [name,setName] = useState("")
  const [userGroups,setUserGroups] : [QueryDocumentSnapshot[],any] = useState([])
  const [loadingOpen ,setLoadingOpen] = useState(false)

  const createGroup = async () => {
    if(name==="") {
      alert("Name cannot be empty")
      return
    }
    setLoadingOpen(true)
    addDoc(collection(db,"Groups"),{
      name : name,
      creator : session?.user?.email!,
      members : [{
        email: session?.user?.email!,
        read : true,
        write : true,
        download : true,
        "delete" : true,
        image : session?.user?.image
      }]
    }).then((docRef: DocumentReference) => {
      router.push(`/groups/${docRef.id}`)
    }).finally(()=> setLoadingOpen(false))
  }

  const [groupCollection] = useCollection(query(collection(db,"Groups")))

  useEffect(()=>{
    let groups : QueryDocumentSnapshot[] = []
    groupCollection?.docs?.forEach((snapshot : QueryDocumentSnapshot) => {
      // @ts-ignore
      let group : Group = snapshot.data()
      group.members?.forEach((member : Member) => {
        if(member.email===session?.user?.email!) {
          groups.push(snapshot)
          return
        }
      })
    })
    setUserGroups(groups)
  },[groupCollection])

  return (
    <div>
      <Head>
        <title>Groups</title>
      </Head>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', margin : "20px", flexDirection : "row", alignItems : "center"}}>
            <div className="font-bold text-[40px] ">Your Groups</div>
            <Fab variant="extended" className="mx-[20px] flex-end" onClick={()=> setOpen(true)}>
              <Add />
              Create group
            </Fab>
          </div>
          <div className="m-[20px]">
            {
              userGroups.map((snapshot : QueryDocumentSnapshot)=> {
                // @ts-ignore
                let group : Group = snapshot.data()
                return (
                    <Link href={`/groups/${snapshot.id}`}>
                      <div className="rounded-[20px] my-[10px] shadow-md border-[2px] p-[10px] w-[100%] overflow-y-auto hover:cursor-pointer hover:shadow-xl hover:bg-gray-100 duration-200">
                        <div className="font-bold text-[25px] mb-[5px]">
                          {group.name}
                        </div>
                        <div>
                          {`${group.members.length} member${group.members.length>1 ? "s" : ""}`}
                        </div>
                      </div>
                    </Link>
                )
              })
            }
            {
              userGroups.length===0 && groupCollection && (
                    <div className="m-auto flex flex-col items-center">
                      <Lottie
                          play
                          loop
                          animationData={emptybox}
                          style={{
                            height : "200px",
                            width : "auto"
                          }} />
                      <div className="m-[20px] font-bold text-[25px]">
                        You are not in any group
                      </div>
                    </div>
                )
            }
          </div>
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
          <div className="font-bold text-[30px] m-[10px]">
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
            onClick={createGroup}
            style={{
              margin : "20px",
              fontSize : "23px",
              border : "2px_solid_black"
            }}>
            Create
          </Button>
        </div>
      </ModalContainer>
      <LoadingDialog open={loadingOpen} onClose={()=> {}} />
    </div>
  );
}
