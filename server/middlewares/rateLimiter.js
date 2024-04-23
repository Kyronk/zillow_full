const redis = require("../config/redis.config");
const { gerenateKeyRedis } = require("../utils/fn");

const reteLimiter =  async (req, res, next ) => {
    // const clientId = req.headers?.client_id;
    const clientId = gerenateKeyRedis("")
    // console.log(clientId)
    
    const currentTime = Date.now(); //ms

    const client = await redis.hGetAll(`rateLimit-${clientId}`);
    // console.log(client);

    if(Object.keys(client).length === 0 ) {
        await redis.hSet(`rateLimit-${clientId}`, "createdAt", currentTime);
        await redis.hSet(`rateLimit-${clientId}`, "count", 1);
        redis.expireAt(`rateLimit-${clientId}`, parseInt((+new Date)/1000) + 600); // này là số giây 
        
        return next();
    }

    let difference = (currentTime - +client.createdAt) / 1000;
    // console.log(difference);

    if(difference >= +process.env.RATE_LIMIT_RESET) {
        await redis.hSet(`rateLimit-${clientId}`, "createdAt", currentTime);
        await redis.hSet(`rateLimit-${clientId}`, "count", 1);
        redis.expireAt(`rateLimit-${clientId}`, parseInt((+new Date)/1000) + 600); // này là số giây 

        return next();
    }

    if(client.count > +process.env.RATE_LIMIT_COUNT) {
        return res.status(429).json({
            success: false,
            mes: "Don't spam!!!"
        })
    }else {
        await redis.hSet(`rateLimit-${clientId}`, "count", +client.count + 1);
        redis.expireAt(`rateLimit-${clientId}`, parseInt((+new Date)/1000) + 600); // này là số giây 

        return next()
    }

};

module.exports = reteLimiter;