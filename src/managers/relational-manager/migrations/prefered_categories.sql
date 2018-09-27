CREATE TABLE prefered_categories (
    member_id integer NOT NULL,
    category_id integer NOT NULL REFERENCES categories(id),
    score numeric(10,9) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE INDEX member_id_idx ON prefered_categories(member_id int4_ops);
