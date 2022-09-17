import React from "react";
import { Navbar } from "../../../components/common/Navbar";
import Sidebar from "../../../components/common/Sidebar";

function Folder() {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex">
                <Sidebar />
            </div>
        </div>
    );
}

export default Folder;
