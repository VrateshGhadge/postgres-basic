// import { Client } from 'pg'
// import dotenv from 'dotenv'

// dotenv.config()
 
// const client = new Client({
//   connectionString: process.env.DATABASE_URL
// })


// async function createUsersTable() {
//     await client.connect()
//     // const result = await client.query('SELECT * FROM USERS;')
//     const result = await client.query(`
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `)
//     console.log(result)
// }

// createUsersTable();



// ----------------------------------------------------------------------

// import { Client } from 'pg';
// import dotenv from 'dotenv'

// dotenv.config()

// // Async function to insert data into a table
// async function insertData() {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL
//   });

//   try {
//     await client.connect(); // Ensure client connection is established
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//     const res = await client.query(insertQuery);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// insertData();

// ----------------------------------------------------------------------

// More Secured Way => i.e preventing SQL injection

import { Client } from 'pg';
import dotenv from 'dotenv'

dotenv.config()


// Async function to insert data into a table
async function insertData(username: string, email: string, password: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

// This prevents SQL injection
  try {
    await client.connect(); // Ensure client connection is established
    // Use parameterized query to prevent SQL injection
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertData('username5', 'user5@example.com', 'user_password').catch(console.error);