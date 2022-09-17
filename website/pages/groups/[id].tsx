import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {doc, DocumentData, DocumentSnapshot, getDoc, onSnapshot} from "@firebase/firestore";
import {db} from "../../serverless/firebase";
import {Navbar} from "../../components/common/Navbar";
import {useDocument} from "react-firebase-hooks/firestore";
import Lottie from "react-lottie-player";
import emptybox from '../../public/assets/emptybox.json'

const Group = () => {
    const router = useRouter()
    const id = router.query.id || "a";
    // @ts-ignore
    const [snapshot] = useDocument(doc(db, 'Groups', id));

    useEffect(()=> {

    },[])
    return (
        <div>
            <Navbar />
            {
                snapshot && snapshot.exists() && (
                    <div>
                        <div className="m-[10px] font-bold text-[30px]">
                            {snapshot.data().name}
                        </div>
                    </div>
                )
            }
            {
                snapshot && !snapshot.exists() && (
                    <div className="m-auto flex flex-col items-center">
                        <Lottie
                            play
                            loop
                            animationData={emptybox}
                            style={{
                                height : "200px",
                                width : "auto"
                            }} />
                        <div className="m-[20px] font-bold text-[25px]">
                            Group Not Found
                            {/*{snapshot.data().name}*/}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Group;