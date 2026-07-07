import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function main() {
  try {
    console.log("Connection successful!");

    await sql`DROP TABLE IF EXISTS books`;
    await sql`DROP TABLE IF EXISTS authors`;
    await sql`CREATE TABLE authors (id SERIAL PRIMARY KEY, name TEXT NOT NULL)`;
    await sql`CREATE TABLE books (id SERIAL PRIMARY KEY, title TEXT NOT NULL, author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE)`;
    console.log("Schema created.");

    await sql.begin(async (sql) => {
      console.log("\nTransaction started.");

      const [author] = await sql`INSERT INTO authors (name) VALUES ('George Orwell') RETURNING id`;
      console.log(`CREATE: Author 'George Orwell' inserted with ID: ${author.id}`);

      await sql`INSERT INTO books (title, author_id) VALUES ('1984', ${author.id})`;
      console.log("CREATE: Book '1984' inserted.");

      const [book] = await sql`SELECT b.title, a.name AS author FROM books b JOIN authors a ON b.author_id = a.id WHERE a.id = ${author.id}`;
      console.log(`READ: Fetched '${book.title}' by ${book.author}`);

      await sql`UPDATE books SET title = 'Nineteen Eighty-Four' WHERE author_id = ${author.id}`;
      console.log("UPDATE: Book title updated.");

      await sql`DELETE FROM authors WHERE id = ${author.id}`;
      console.log("DELETE: Author and their books deleted.");
    });

    console.log("Transaction committed successfully.\n");
  } catch (err) {
    console.error("Database operation failed:", err);
  } finally {
    await sql.end();
  }
}

main();
