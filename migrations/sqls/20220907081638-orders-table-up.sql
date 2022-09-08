/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    status VARCHAR NOT NULL,
    title VARCHAR NOT NULL
);