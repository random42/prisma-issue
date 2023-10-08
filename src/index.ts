import { PrismaClient } from '@prisma/client';

async function main() {
  const client = new PrismaClient();
}

main().catch(console.error);
