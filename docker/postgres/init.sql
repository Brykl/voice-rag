CREATE TABLE users (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- auto-incrementing primary key
    username varchar(20) NOT NULL, -- username column, cannot be null
    email varchar(255) NOT NULL UNIQUE, -- email column, cannot be null and must be unique
    firebase_uid varchar(255) NOT NULL UNIQUE, -- firebase_uid column, cannot be null and must be unique
    is_admin boolean NOT NULL DEFAULT false, -- is_admin column, cannot be null and defaults to false
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- created_at column, cannot be null and defaults to current timestamp
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP -- updated_at column, cannot be null and defaults to current timestamp
);

CREATE TABLE workspace (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- auto-incrementing primary key
    name text NOT NULL, -- name column, cannot be null
    user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE, -- foreign key referencing users table, cannot be null, if the referenced user is deleted, the workspace will also be deleted
    UNIQUE (name, user_id) -- unique constraint on name and user_id combination
);