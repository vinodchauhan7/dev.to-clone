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

const LoginMutation = `mutation($data:LoginInputType!){
    login(data : $data){
      accessToken
    }
  }`;

describe("Login User", () => {
  it("Get Access Token", async () => {
    //because password is going to hash we need to get a copy of it.
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 13);
    const user = await User.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashedPassword,
      joinedDate: faker.date.month()
    }).save();

    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        data: {
          email: user.email,
          password: password
        }
      }
    });

    console.log(response);

    expect(response).toBeDefined();
  });
});
