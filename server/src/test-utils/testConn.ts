import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./../entity/User";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "dev-to-clone-test",
    synchronize: drop,
    dropSchema: drop,
    logging: false,
    entities: [User]
  });
};
