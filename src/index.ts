import { PrismaClient } from '@prisma/client';
import * as cm from 'cache-manager';
import cacheExtension from 'prisma-extension-cache-manager';
import logExtension, { LogData } from 'prisma-extension-log';

async function main() {
  const cache = await cm.caching('memory');
  const log = (data: LogData, opt?: {}) => console.log(data);
  const ext1 = cacheExtension({ cache });
  const ext2 = logExtension({ log });
  const client = new PrismaClient();
  const client1 = client.$extends(ext1);
  client1.user.findFirst({
    cache: true, // works
  });
  const client2 = client.$extends(ext2);
  client2.user.findFirst({
    log: false, // works
  });
  const client3 = client.$extends(ext1).$extends(ext2);
  client3.user.findFirst({
    log: false, // works
  });
  client3.user.findFirst({
    cache: true, // type error
  });
  const client4 = client.$extends(ext2).$extends(ext1);
  client4.user.findFirst({
    cache: true, // works
  });
  client4.user.findFirst({
    log: false, // type error
  });
  client4.user.deleteMany({
    log: false, // works because deleteMany is not modified by the cache extension
  });
}

main().catch(console.error);
