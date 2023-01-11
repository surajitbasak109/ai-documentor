export const schema = `CREATE TABLE IF NOT EXISTS users (
	id serial primary key,
	fullname text not null,
	email text not null,
	password text not null
);

CREATE TABLE IF NOT EXISTS documents (
	id serial primary key,
	title text not null,
    content text,
	created_at text not null,
	updated_at text not null,
	creator integer not null references users(id)
)`;
