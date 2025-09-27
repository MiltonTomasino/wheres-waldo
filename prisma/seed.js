const { PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
    // await prisma.fileInfo.create({
    //     data: {
    //         name: "Waldo",
    //         path: "/images/waldo.jpeg",
    //         width: 2560,
    //         height: 1440,
    //         coords: {
    //             x1: 1859 / 2560,
    //             x2: 1917 / 2560,
    //             y1: 723 / 1440,
    //             y2: 790 / 1440
    //         }
    //     }
    // });

    // await prisma.fileInfo.update({
    //     where: {
    //         name: "Waldo"
    //     },
    //     data: {
    //         coords: [
    //             {
    //                 name: "waldo",
    //                 axis: {
    //                     x1: 1859 / 2560,
    //                     x2: 1917 / 2560,
    //                     y1: 723 / 1440,
    //                     y2: 790 / 1440
    //                 }
    //             },
    //             {
    //                 name: "cannon",
    //                 axis: {
    //                     x1: 197 / 2560,
    //                     x2: 353 / 2560,
    //                     y1: 1343 / 1440,
    //                     y2: 1437 / 1440
    //                 }
    //             }
    //         ]
    //     }
    // });

    await prisma.fileInfo.create({
        data: {
            name: "Waldo2",
            path: "/images/waldo2.jpeg",
            width: 2800,
            height: 1760,
            coords: [
                {
                    name: "waldo",
                    axis: {
                        x1: 1143 / 2800,
                        x2: 1223 / 2800,
                        y1: 285 / 1760,
                        y2: 382 / 1760
                    }
                },
                {
                    name: "pipe smoker",
                    axis: {
                        x1: 1417 / 2800,
                        x2: 1499 / 2800,
                        y1: 1456 / 1760,
                        y2: 1630 / 1760
                    }
                }
            ]
        }
    })
}

main().catch(console.error).finally(() => prisma.$disconnect());