import Database from 'bun:sqlite';

const db = new Database('app.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS tbl_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    info TEXT,
    status BOOLEAN NOT NULL
);
`);

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
}

export const UserRoles = {
    selectByUsername: db.prepare('SELECT * FROM tbl_users WHERE username = ?'),
    insert: db.prepare('INSERT INTO tbl_users (username, role, email, password) VALUES (?, ?, ?, ?)'),
}

export type Event = {
    id: number;
    name: string;
    type: string;
    date: string;
    description: string;
    info: string;
    status: boolean;
};

export const EventRoles = {
    insert: db.prepare('INSERT INTO tbl_events (name, type, date, status, description, info) VALUES (?, ?, ?, ?, ?, ?)'),
    updateStatus: db.prepare('UPDATE tbl_events SET status = ? WHERE id = ?'),
    selectAllOpen: db.prepare('SELECT * FROM tbl_events WHERE status = true'),
}