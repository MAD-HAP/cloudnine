import Head from 'next/head'
import React from 'react'
import { Navbar } from '../../components/common/Navbar'
import Sidebar from '../../components/common/Sidebar'

function Home() {
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