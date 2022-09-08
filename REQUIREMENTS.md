# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

1. Users
Create New user - [POST] /users - (first_name, last_name, password)

Index - [GET] /users 

Show - [GET] /users/:id - (id and verify by token)

2. Orders
Create - [POST] /orders - Access token required. (user_id and status)

Index - [GET] /orders - Admin access token required. 

Show - [GET] /orders/orderId - Access token required. 

Add product - [POST] - /orders/:id/add-product- Access token required. order_id, product_id, quantity 

Order by user - [GET] /orders/user_id/:id - Access token required. 

Completed Orders by user - [GET] /users/:id/orders/completed - Access token required. 

3. Products
Create - [POST] /products - Admin access token required. (name, price, category) 

Index - [GET] /products - Returns all available products in DB

Show - [GET] /products/:id - Returns product details based on given id

Delete - [DELETE] /products -  token required. id of product 

Products by category - [GET] /products/category/:category.  token required and category


#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- first_name
- last_name
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

----------------------
#### Database Schema

1. User
   
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(255),
    password_digest VARCHAR(100)

2. Product

    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    category VARCHAR

3. Order
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    status VARCHAR NOT NULL

4. Product order

    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    order_id INT REFERENCES orders(id) NOT NULL,
    product_id INT REFERENCES products(id) NOT NULL