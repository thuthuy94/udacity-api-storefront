import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyToken from "../middleware/verifyToken";

const store = new ProductStore();
//get all products
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
console.log('err', err);
    res.status(400);
    res.json(err);
  }
};
//get specific product
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show("1");
    res.json(product);
  } catch (err) {
console.log('err', err);
    res.status(400);
    res.json(err);
  }
};
//create product & token require
const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category || "",
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//delete product by id
const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//product by category
const productsByCategory = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await store.productsByCategory(
      req.params.category
    );
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyToken, create);
  app.get("/products/category/:category", verifyToken, productsByCategory);
  app.delete("/products/:id", verifyToken, remove);
};

export default product_routes;
