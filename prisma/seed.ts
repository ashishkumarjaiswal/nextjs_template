import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialUsers: Prisma.UserCreateInput[] = [
    {
        email: 'jayswal99299@gmail.com',
        name: 'Ashish Kumar Jaiswal',
        password: 'ashish'
    },
    {
        email: 'test1@gmail.com',
        name: 'Test User 1',
        password: 'ashish'
    },
    {
        email: 'test2@gmail.com',
        name: 'Test User 2',
        password: 'ashish'
    }
]
async function main() {
    console.log(`Start seeding ...`)

    for (const u of initialUsers) {
        const user = await prisma.user.create({
            data: u
        })
        console.log(`Created user with id: ${user.id}`)
    }

    console.log(`Seeding finished.`)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
