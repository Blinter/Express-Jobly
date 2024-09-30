/**
 * @fileoverview Database connection module for the application.
 * This module establishes a connection to the PostgreSQL database using the pg library.
 * It handles different connection configurations for production and non-production environments.
 * 
 * @module db
 * @requires pg
 * @requires ./config
 */

"use strict";
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
/**
 * The database client instance.
 * @type {pg.Client}
 */
let db;
if (process.env.NODE_ENV === "production") {
  /**
   * Production database configuration.
   * Uses SSL with rejected unauthorized connections.
   */
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  /**
   * Non-production (development/test) database configuration.
   * Does not use SSL.
   */
  db = new Client({
    connectionString: getDatabaseUri()
  });
}
/**
 * Establishes a connection to the database.
 * @function
 */
db.connect();
/**
 * Exports the database client instance.
 * @exports db
 */
module.exports = db;
