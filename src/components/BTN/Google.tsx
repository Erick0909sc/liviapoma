import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';


type Props = {}

const Google = (props: Props) => {
    return (
        <div>
            <button
                className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                onClick={async (e) => {
                    e.preventDefault();
                    await signIn("google");
                }}
            >
                <FcGoogle className=' text-[40px]' />
            </button>
        </div>
    )
}

export default Google