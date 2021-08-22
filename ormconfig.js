
module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typeorm",
    synchronize: true,
    logging:false,
    entities:["src/entity/*{.ts,.js}"]
}