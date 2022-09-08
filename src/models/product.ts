import Client from "../database";

export type Product = {
  name: string;
  price: Number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Cannot get products");
    }
  }
  async show(name: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products where name=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [name]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${name}. Error ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Could not add new product ${p.name}. Error ${error}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Could not delete product ${id}. Error ${error}`);
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE category=($1)";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
console.log('err', err);
      throw new Error(
        `Could not find any product for ${category}. Error: ${err}`
      );
    }
  }
}
