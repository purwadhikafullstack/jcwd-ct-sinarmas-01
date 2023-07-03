const { seed, faker } = require("./");

(async () => {
  await seed(10, "warehouses", {
    warehouse_name: () => faker.word.words({ length: { min: 2, max: 3 } }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  });
})()