'use client'

import { useSession } from 'next-auth/react'

const page = () => {
    const session = useSession()

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to Ashish Website Template
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your journey to a beautiful and functional website starts here.
                </p>
                <button className="mt-8 rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default page
