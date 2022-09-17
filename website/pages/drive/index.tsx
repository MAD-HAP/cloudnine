import React from "react";

function Index() {
    return (
        <div className="h-screen w-screen grid place-items-center">Loading</div>
    );
}

export default Index;

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "/drive/home",
            permanent: false,
        },
    };
}
