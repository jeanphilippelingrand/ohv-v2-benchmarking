CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id integer NOT NULL REFERENCES categories(id)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX id_idx ON products(id);
