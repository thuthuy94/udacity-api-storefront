import express, { Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { Order, OrderStore, ProductOrder } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    console.log("err", err);
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    console.log("err", err);
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
      title: req.body.title,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    console.log("err", err);
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.id;
  const product_id: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  const product: ProductOrder = {
    quantity: quantity,
    order_id: order_id,
    product_id: product_id,
  };
  try {
    const addedProduct = await store.addProduct(product);
    res.json(addedProduct);
  } catch (err) {
    console.log("err", err);
    res.status(400);
    res.json(err);
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrders(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const ordersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.ordersByUser(req.body.id);
    res.json(orders);
  } catch (err) {
    console.log("err", err);
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyToken, index);
  app.get("/orders/:id", verifyToken, show);
  app.get("/orders/user_id/:id", verifyToken, ordersByUser);
  app.post("/orders", verifyToken, create);
  app.post("/orders/:id/add-product", addProduct);
  app.get("/users/:id/orders/completed", verifyToken, completedOrders);
};

export default order_routes;
