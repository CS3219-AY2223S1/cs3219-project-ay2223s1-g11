import { DataTypes } from "sequelize";
import { sequelize } from "./repository.js";

/**
 * Stores the information about matches made.
 * Property: usernameOne < usernameTwo
 */
export const MatchInfo = sequelize.define("MatchInfo", {
    usernameOne: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usernameTwo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filterKey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Sync MatchInfo with existing table
await MatchInfo.sync({ force: false, alter: true });
console.log("DB: MatchInfo were synchronized successfully.");
