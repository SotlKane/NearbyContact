import {redisClient} from "../index.ts";

export const cacheSet = {
    string: async (key: string, value: any, ex: number) => redisClient.set('s' + key, value, {'EX': ex}),
    buffer: async (key: string, value: Buffer, ex: number) => redisClient.set('b' + key, value.toString('base64'), {'EX': ex}),
    json: async (key: string, value: object, ex: number) => redisClient.set('j' + key, JSON.stringify(value), {'EX': ex}),
    hash: async (hash: string, ex: number) => redisClient.set('h' + hash, '', {'EX': ex}),
}

export const cacheGet = {
    string: async (key: string) => {
        return redisClient.get('s' + key)
    },
    buffer: async (key: string) => {
        const value = await redisClient.get('b' + key);
        return value ? Buffer.from(value, 'base64') : null;
    },
    json: async (key: string) => {
        const value = await redisClient.get('j' + key);
        return value ? JSON.parse(value) : null;
    },
    hash: async (hash: string) => {
        const value = await redisClient.get('h' + hash);
        return value !== null;
    }
}

export const cacheClear = {
    string: (key: string) => redisClient.del('s' + key),
    buffer: (key: string) => redisClient.del('b' + key),
    json: (key: string) => redisClient.del('j' + key),
}