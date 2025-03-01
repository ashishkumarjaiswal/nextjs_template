'use client'

import { useSession } from 'next-auth/react'

const page = () => {
    const session = useSession()

    return <div>page</div>
}

export default page
