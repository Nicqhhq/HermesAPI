const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    const newUser = await prisma.contatos.create({
        data: {
            contato_nome: 'Nícolas',
            contato_numero: '11961776581',
            contato_email: 'nic200433@gmail.com',
            contato_unidade: '100'
        },
    })
    console.log('Created new user: ', newUser)

    const allUsers = await prisma.contatos.findMany({
    })
    console.log('All users: ')
    console.dir(allUsers, { depth: null })
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())