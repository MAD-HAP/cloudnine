import type { NextPage } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import Landing from "../screens/landing";
import DashBoard from "../screens/dashboard";

const Home: NextPage = ({loggedIn}: any) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!loggedIn ? <Landing /> : <DashBoard />}
        </div>
    );
};
export default Home;

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;
        const session = await getSession({ req });
        if (session) {
            return {
                props: {
                    loggedIn: true,
                },
            };
        }
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            loggedIn: false,
        },
    };
}
