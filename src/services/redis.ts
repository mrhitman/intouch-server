import { forEach } from 'lodash';
import * as redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient(process.env.REDIS_HOST, process.env.REDIS_PORT);
const map = {
    get: client.get,
    set: client.set,
    hset: client.hset,
    hget: client.hget,
    hkeys: client.hkeys,
    hmset: client.hmset,
};

forEach(map, (func, name) => {
    client[name] = promisify(func);
});

export default client;
