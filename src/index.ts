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



// ------------------------------------------------------------------------------------------------
//INSERTING USER (2 WASY: 1-> SQL INJECTION, 2-> PREVENTING SQL INJECTION)

// 1-> SQL INJECTION

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
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user@example.com', 'user_password');";
//     const res = await client.query(insertQuery);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// insertData();

// ------------------------------------------------------------
// 2-> PREVENTING SQL INJECTION
// More Secured Way => i.e preventing SQL injection


// import { Client } from 'pg';
// import dotenv from 'dotenv'

// dotenv.config()


// // Async function to insert data into a table
// async function insertData(username: string, email: string, password: string) {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL
//   });

// // This prevents SQL injection
//   try {
//     await client.connect(); // Ensure client connection is established
//     // Use parameterized query to prevent SQL injection
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
//     const values = [username, email, password];
//     const res = await client.query(insertQuery, values);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// // Example usage
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);


// ------------------------------------------------------------------------------------------------

// GETTING USER

import { Client } from 'pg';
import dotenv from 'dotenv'

dotenv.config()


// Async function to fetch user data from the database given an email
async function getUser(email: string) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    

  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('user5@example.com').catch(console.error);
