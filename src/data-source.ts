import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "proyecto",
    synchronize: true,
    logging: false,
    entities: ["src/**/*.entity.ts"],
    subscribers: [],
    migrationsTableName: "migrations",
    migrations: ["src/database/migrations/*.ts"],
})