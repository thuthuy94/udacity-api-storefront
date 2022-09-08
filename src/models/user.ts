import Client from "../database";
import bcrypt from "bcrypt";
export type User = {
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<{ first_name: string; last_name: string }[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT first_name, last_name FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Cannot get users");
    }
  }

  async show(
    first_name: string
  ): Promise<{ first_name: string; last_name: string }> {
    try {
      const sql =
        "SELECT first_name, last_name FROM users where first_name=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [first_name]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${first_name}. Error ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const saltRounds: string = process.env.SALT_ROUNDS as string;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const conn = await Client.connect();
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
console.log('err', err);
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }

  async authenticate(
    first_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const conn = await Client.connect();
      const sql = "SELECT password FROM users WHERE first_name=($1)";
      const result = await conn.query(sql, [first_name]);

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
console.log('err', err);
      throw new Error(`User authentication failed`);
    }
  }
}
