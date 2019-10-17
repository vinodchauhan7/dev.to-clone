import { Connection } from "typeorm";
import { testConn } from "../../../test-utils/testConn";
import { gCall } from "./../../../test-utils/gCall";
import { User } from "../../../entity/User";
import faker from "faker";
import bcrypt from "bcryptjs";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const revokeRefreshToken = `mutation($userId : Int!){
    revokeRefreshToken(userId : $userId)
  }`;

describe("Revoke Refresh Token", () => {
  it("update TokenVersion ", async () => {
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 13);
    const user = await User.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashedPassword,
      joinedDate: faker.date.month(),
      tokenVersion: 0
    }).save();

    const response = await gCall({
      source: revokeRefreshToken,
      variableValues: {
        userId: user.tokenVersion
      }
    });

    console.log(response);

    expect(response).toBeTruthy();
  });
});
