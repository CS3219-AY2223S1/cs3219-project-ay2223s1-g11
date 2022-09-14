import { DataTypes } from "sequelize";
import { sequelize } from "./repository.js";

export const PendingMatch = sequelize.define("PendingMatch", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  socketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficultyLevel: {
    type: DataTypes.ENUM,
    values: ["easy", "hard", "difficult"],
    allowNull: false,
  },
});

// Creates PendingMatches Table, dropping it first if it already exists.
await PendingMatch.sync({ force: true });
console.log("DB: PendingMatch were synchronized successfully.");
