import { Button, Link, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useWidth } from "../hooks/useWidth";
import {
  FolderShared,
  Groups2,
  ListAlt,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import ButtOn from "./ButtOn/ButtOn";
import { useRouter } from "next/router";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../serverless/firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import UploadFile from "../forms/UploadFile";
import UploadFolder from "../forms/UploadFolder";
import {LoadingDialog} from "./LoadingDialog";

function Sidebar() {
  const router = useRouter();
  const user = useSession();
  const width = useWidth();
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [imageToPost, setImageToPost] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false)

  const addImageToFile = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      // console.log(readerEvent.target);
      setImageToPost(readerEvent.target?.result);
    };
  };
  
  const uploadSomething = async (name: string) => {
    // console.log("object"); working till here
    setLoadingOpen(true)
    if (imageToPost) {
      const path = router.pathname;
      if (path === "/drive/home") {
        addDoc(collection(db, `/users/${user?.data?.user?.email}/files`), {
          name: { name },
        }).then((id) => {
          const storageRef = ref(
            storage,
            `media/${user?.data?.user?.email}/${name}`
          );
          uploadString(storageRef, imageToPost, "data_url").then(() => {
            getDownloadURL(
              ref(storage, `media/${user?.data?.user?.email}/${name}`)
              ).then((url) => {
              setDoc(
                doc(db, `/users/${user?.data?.user?.email}/files`, id.id),
                {
                  url,
                },
                {
                  merge: true,
                }
              ).finally(()=>{setLoadingOpen(false)});
            });
          });
        });
      } else {
        while (!router.isReady) {
          continue;
        }
        addDoc(collection(db, `folders/${router.query.folder}/files`), {
          name: { name },
        }).then((id) => {
          const storageRef = ref(
            storage,
            `media/${user?.data?.user?.email}/${name}`
            );
          uploadString(storageRef, imageToPost, "data_url").then(() => {
            getDownloadURL(
              ref(storage, `media/${user?.data?.user?.email}/${name}`)
            ).then((url) => {
              setDoc(
                doc(db, `folders/${router.query.folder}/files`, id.id),
                {
                  url,
                },
                {
                  merge: true,
                }
                ).finally(()=> setLoadingOpen(false));
            });
          });
        });
      }
    } else {
      console.log("Nothing to upload");
    }
    setUploadOpen(false);
  };

  useEffect(() => {
    width > 1000 ? setIsExpanded(true) : setIsExpanded(false);
  }, []);
  const addFolder = (n: any) => {
    setLoadingOpen(true)
    const path = router.pathname;
    if (path === "/drive/home") {
      addDoc(collection(db, "folders"), {
        name: n,
        perms: "kjagdfkdv",
      }).then(async (docRef) => {
        const id = docRef.id;
        const data = await getDoc(doc(db, "folders", id));
        setDoc(
          doc(db, `/users/${user.data?.user?.email}`),
          {
            folders: arrayUnion({
              id: id,
              name: data.data()!["name"],
            }),
          },
          {
            merge: true,
          }
        ).finally(()=>{setLoadingOpen(false)});
      });
    } else {
      while (!router.isReady) {
        continue;
      }
      addDoc(collection(db, "folders"), {
        name: "Name",
        perms: "kjagdfkdv",
      }).then(async (docRef) => {
        const id = docRef.id;
        const parentId = router.query.folder;
        const data = await getDoc(doc(db, "folders", id));
        setDoc(
          doc(db, `/folders/${parentId}`),
          {
            folders: arrayUnion({
              id: id,
              name: data.data()!["name"],
            }),
          },
          {
            merge: true,
          }
        ).finally(()=>{setLoadingOpen(false)});
      });
    }
    setFolderOpen(false);
  };
  const addFile = () => {
    setUploadOpen(true);
  };

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
      <UploadFile uploadSomething={uploadSomething} addImageToFile={addImageToFile} open={uploadOpen} close={()=>setUploadOpen(false)}/>
      <UploadFolder addFolder={addFolder} open={folderOpen} close={()=>setFolderOpen(false)} />
      <input type="file" hidden ref={uploadRef} onChange={addImageToFile} />
      <Button
        fullWidth
        sx={{ justifyContent: "end" }}
        onClick={() => {
          setIsExpanded(false);
        }}
      >
        <ChevronLeft />
      </Button>

      <br />
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
        <ButtOn onClick={addFile}>Upload Files</ButtOn>
        <ButtOn onClick={()=>setFolderOpen(true)}>Create Folder</ButtOn> <br />
        <br />
        <div>
          <ListAlt sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{
              textDecoration: "none",
              fontSize: "1.33rem",
              color: "black",
            }}
            href="my"
          >
            {" "}
            Owned Files{" "}
          </Link>
        </div>
        <div>
          <FolderShared sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{
              textDecoration: "none",
              fontSize: "1.33rem",
              color: "black",
            }}
            href="shared"
          >
            {" "}
            Shared{" "}
          </Link>
        </div>
        <div>
          <Groups2 sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{
              textDecoration: "none",
              fontSize: "1.33rem",
              color: "black",
            }}
            href="/groups"
          >
            {" "}
            Groups{" "}
          </Link>
        </div>
      </Stack>
      <LoadingDialog open={loadingOpen} onClose={()=> {}} />
    </div>
  );
}

export default Sidebar;
