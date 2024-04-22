// const { ne } = require("@faker-js/faker");
const { networkInterfaces } = require("os");
// const os = require("os");
const nets = networkInterfaces();
const results = {};

for ( const name of Object.keys(nets)) {
    for ( const net of nets[name]) {
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name]  = []
            }
            results[name].push(net.address)
        }
    }    
};

// console.log(Object.keys(results)[1]);






const getIpAddress = () => {
    const nets = networkInterfaces();
    const results = {};

    for ( const name of Object.keys(nets)) {
        for ( const net of nets[name]) {
            const familyV4Value = typeof net.family === "string" ? "IPv4" : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name]  = []
                }
                results[name].push(net.address)
            }
        }
    }

    // return Object.keys(results)[1]
    return Object.values(results)[1]


};

// export
const gerenateKeyRedis = (filter) => {
    const filterStringKey = JSON.stringify(filter)
        .replace(/\W/g, "")
        .split("")
        .sort((a,b) => a.localeCompare(b))
        .join("")

    const IPAddress = getIpAddress();
    return filterStringKey + IPAddress
}
// console.log(os.networkInterfaces());

module.exports = {
    gerenateKeyRedis,
}