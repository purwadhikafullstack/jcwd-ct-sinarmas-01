const { seeder, faker } = require("./");

(async () => {
  for (let i = 0; i < 34; i++) {
    if (i === 20) continue;
    await seeder.seed(0, "stocks", {
      stock: faker.number.int({ min: 4, max: 30 }),
      warehouse_id: faker.number.int({ min: 1, max: 3 }),
      product_id: i+1,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    })
  }
  process.exit();
})();