import { signIn } from "next-auth/react";

function Landing() {
  return (
    <div>
        <button onClick={() => signIn()}>Login pls</button>
    </div>
  )
}

export default Landing