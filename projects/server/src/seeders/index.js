require("dotenv/config");
const Seeder = require("../seeder");
const { faker } = require("@faker-js/faker");

// Generate a new Seeder instance
const seeder = new Seeder(
  10, 
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  process.env.DB_NAME
);

async function seed (rounds, name, obj) {
  await seeder.seed(rounds, name, obj);
  seeder.exit();
  process.exit();
}

module.exports = { 
  faker, seed
};