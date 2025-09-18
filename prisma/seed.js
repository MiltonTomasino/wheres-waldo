const { PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
    await prisma.fileInfo.create({
        data: {
            name: "Waldo",
            path: "/images/waldo.jpeg",
            width: 2560,
            height: 1440,
            coords: {
                x1: 1859 / 2560,
                x2: 1917 / 2560,
                y1: 723 / 1440,
                y2: 790 / 1440
            }
        }
    })
}

main().catch(console.error).finally(() => prisma.$disconnect());