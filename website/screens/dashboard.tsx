import React from "react";
import { signOut } from "next-auth/react";
import { Navbar } from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function DashBoard() {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <button onClick={() => signOut()}>signout</button>
        </div>
    );
}

export default DashBoard;
