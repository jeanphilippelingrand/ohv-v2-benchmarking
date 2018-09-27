CREATE TABLE categories (
    id integer DEFAULT nextval('untitled_table_id_seq'::regclass) PRIMARY KEY,
    name text NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX id_idx ON categories(id);
