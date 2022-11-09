import { Sequelize } from "sequelize";
import 'dotenv/config';

let sequelizeInit;
if (process.env.CLOUD_DB_URL) {
    sequelizeInit = new Sequelize("matching-service",
        process.env.CLOUD_DB_USERNAME,
        process.env.CLOUD_DB_PASSWORD,
        {
            dialect: "postgres",
            host: process.env.CLOUD_DB_URL,
            port: process.env.CLOUD_DB_PORT,
            logging: (...msg) => console.log(`DB: ${msg[0]}`)
        }
    );
} else {
    sequelizeInit = new Sequelize("test.db", "user", "pass", {
        dialect: "sqlite",
        host: "./dev.sqlite",
        logging: (...msg) => console.log(`DB: ${msg[0]}`),
    });
}


// Established connection with database
try {
    await sequelizeInit.authenticate();
    console.log("DB: Database connection has been established successfully.");
} catch (error) {
    console.error("DB: Unable to connect to the database:", error);
}

export const sequelize = sequelizeInit;
