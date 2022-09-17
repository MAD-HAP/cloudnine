import type { NextPage } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import Landing from "../screens/landing";

const Home: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col  py-2">
            <Head>
                <title>CloudNine</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Landing />
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
                redirect: {
                    destination: "/drive",
                    permanent: true,
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
