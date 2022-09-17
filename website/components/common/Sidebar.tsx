import { Button, Link, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWidth } from "../hooks/useWidth";
import {
  FolderShared,
  Groups2,
  ListAlt,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";

function Sidebar() {
  const width = useWidth();
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
          <Groups2 sx={{ height: "40px", width: "40px" }} />{" "}
          <Link
            sx={{ textDecoration: "none", fontSize: "1.33rem", color: "black" }}
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
