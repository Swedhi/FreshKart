CREATE TABLE orders (

    id BIGSERIAL PRIMARY KEY,

    customer_name VARCHAR(255),

    quantity INTEGER,

    total_price DOUBLE PRECISION,

    order_date TIMESTAMP
);