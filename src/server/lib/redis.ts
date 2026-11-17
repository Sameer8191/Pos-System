import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

globalForRedis.redis ??= new Redis(process.env.REDIS_URL!);

export const redis = globalForRedis.redis;
