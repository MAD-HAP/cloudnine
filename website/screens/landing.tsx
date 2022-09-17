import { signIn } from "next-auth/react";
import { useWidth } from "../components/hooks/useWidth";

function Landing() {
  const width = useWidth();
    return (
        <div>
            <div>
                {/* TODO */}
                {/* navbar */}
                <button onClick={() => signIn()}>Login</button>
                <div className="flex flex-row p-[10px] shadow items-center">
            {width > 800 ? (
                <img
                    src="/cloudnine-big.svg"
                    className="h-[60px] w-auto rounded-[50%]"
                    alt="Cloud Nine"
                />
            ) : (
                <img
                    src="/cloudnine.svg"
                    className="h-[60px] w-auto rounded-[50%]"
                    alt="Cloud Nine"
                />
            )}
            {width > 800 && (
                <div className="text-[20px] ml-[5px] font-bold">Cloud Nine</div>
            )}
            
        </div>
            </div>
            <div>
                {/* TODO */}
                {/* big splash */}
                {/* left = text, right = image, left doen = "try Now" */}
            </div>
            <div>
                {/* TODO */}
                {/* 4 boxes on the left, big details */}
            </div>
            <div>
                {/* TODO */}
                {/* Footer */}
            </div>
        </div>
    );
}

export default Landing;
