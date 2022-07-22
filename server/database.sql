create TABLE person
(
    id      SERIAL PRIMARY KEY,
    userName    VARCHAR(255) unique ,
    password VARCHAR(255),
    role CHARACTER VARYING(30)  NOT NULL DEFAULT 'USER'
);

create TABLE post
(
    id      SERIAL PRIMARY KEY,
    title   VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

-- create TABLE role
-- (
--     id    SERIAL PRIMARY KEY,
--     value VARCHAR [],
--     FOREIGN KEY (id) REFERENCES person (id)
-- );