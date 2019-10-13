import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import faker from "faker";
import { gCall } from "./../../../test-utils/gCall";
import { User } from "./../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `mutation Register($data : RegisterInputType!){
    register(data : $data){
      id
      name
      joinedDate
      email
    }
  }`;

describe("Register User", () => {
  it("Create user", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      joinedDate: faker.date.month()
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    console.log(response);

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
  });
});
