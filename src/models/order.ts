import Client from "../database";
export type Order = {
  title: string;
  user_id: string;
  status: string;
};

export type ProductOrder = {
  quantity: number;
  order_id: string;
  product_id: string;
};
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Cannot get orders");
    }
  }

  async show(title: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders where title=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [title]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find order ${title}. Error ${error}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status,title) VALUES($1,$2,$3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status, o.title]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
console.log('err', err);
      throw new Error(
        `Could not create order by user ${o.user_id}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
console.log('err', err);
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(p: ProductOrder): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        p.quantity,
        p.order_id,
        p.product_id,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
console.log('err', err);
      throw new Error(
        `Could not add product ${p.product_id} to order ${p.order_id}: ${err}`
      );
    }
  }
  async ordersByUser(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
console.log('err', err);
      throw new Error(`unable get orders by users: ${err}`);
    }
  }
  async completedOrders(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE status='completed' AND orders.user_id =($1) ";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
console.log('err', err);
      throw new Error(`Could not find completed orders ${id}. Error: ${err}`);
    }
  }
}
