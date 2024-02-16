// import { createClient } from "redis";
const redis = require("redis");

// const client = redis.createClient();
const client = redis.createClient({
    // host: "redis-server",
    // host: "127.0.0.1",
    // port: 6379
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
});

// client.on("error", (err) => console.log("Redis Client Error ", err));
client.on('error', err => console.log('Redis Client Error', err));

const connectionRedis = async () => {
    // await client.connect();
    await client.connect();
    console.log("Redis connection")
}

// const redisServer = connectionRedis();
connectionRedis();

module.exports = client;
