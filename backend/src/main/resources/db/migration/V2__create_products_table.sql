CREATE TABLE products (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    category VARCHAR(255),

    price DOUBLE PRECISION,

    stock_quantity INTEGER,

    image_url VARCHAR(500)
);