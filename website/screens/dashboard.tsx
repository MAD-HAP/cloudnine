import React from "react";
import { signOut } from "next-auth/react";

function DashBoard() {
    return (
        <div>
            <p>DashBoard</p>
            <button onClick={() => signOut()}>signout</button>
        </div>
    );
}

export default DashBoard;
