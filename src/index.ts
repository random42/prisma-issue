import { PrismaClient } from '@prisma/client';
import ext1 from './ext1';
import ext2 from './ext2';

async function main() {
  const client = new PrismaClient().$extends(ext1).$extends(ext2);
  client.user.findMany({
    args2: '', // this works
  });
  client.user.findMany({
    args1: '', // this does not
  });
  const client1 = new PrismaClient().$extends(ext2).$extends(ext1);
  client1.user.findMany({
    args1: '', // this works
  });
  client1.user.findMany({
    args2: '', // this does not
  });
}

main().catch(console.error);
