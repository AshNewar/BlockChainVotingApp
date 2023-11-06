import pg from 'pg';
const Pool = pg.Pool;

// Connection parameters
const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'data',
    password: 'ashish12@',
    port: 5432, // Default PostgreSQL port is 5432
};

const isProduction = false;
const databaseURL = "";

// Create a connection pool
const pool = new Pool(isProduction ? databaseURL : poolConfig);
export default pool;

// Now you can use the 'pool' object to work with the connection pool.
