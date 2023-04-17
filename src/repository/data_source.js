import { DataSource } from "typeorm";
import Track from "../entity/Track.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [Track],
});

await AppDataSource.initialize();
