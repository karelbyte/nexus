const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const dbjson = new JsonDB(new Config("./dbs/models", true, false, "/"));

module.exports = dbjson;
