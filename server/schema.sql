CREATE TABLE IF NOT EXISTS tbl_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    date TEXT NOT NULL,
    description TEXT,
    info TEXT,
    status BOOLEAN NOT NULL
);