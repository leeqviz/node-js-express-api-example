import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("test_db", "leeqviz", "123456789", {
    dialect: "mssql",
    host: "localhost",
    port: "1433",
});