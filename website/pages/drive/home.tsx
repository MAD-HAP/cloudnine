import Head from 'next/head'
import React, {useEffect} from 'react'
import { Navbar } from '../../components/common/Navbar'
import Sidebar from '../../components/common/Sidebar'
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../serverless/firebase";
import {useSession} from "next-auth/react";

function Home() {

    const { data: session, status } = useSession();

    useEffect(()=>{
        if(!session?.user?.email) return
        setDoc(doc(db,"users",session?.user?.email!),{
            name : session?.user?.name!,
            email: session?.user?.email,
            image : session?.user?.image!
        }, {merge : true})
    },[session])
  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col'>
      <Head>
        <title>My Drive</title>
      </Head>
        <Navbar />
        <div className='flex'>
            <Sidebar />
        </div>
    </div>
  )
}

export default Home