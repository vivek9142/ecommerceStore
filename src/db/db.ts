import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var primsa : undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.primsa ?? prismaClientSingleton()

export default db

if(process.env.NODE_ENV !== "production") globalThis.primsa = db