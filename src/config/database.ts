import { Sequelize } from "sequelize";
import { env } from "./env";

let sequelize: Sequelize;

if (env.db.url) {
    sequelize = new Sequelize(env.db.url, {
        dialect: "postgres",
        logging: env.nodeEnv === "development" ? console.log : false,
    });
} else {
    sequelize = new Sequelize({
        host: env.db.host,
        port: env.db.port,
        database: env.db.name,
        username: env.db.user,
        password: env.db.pass,
        dialect: "postgres",
        logging: env.nodeEnv === "development" ? console.log : false,
    });
}

export default sequelize;
