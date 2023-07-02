const { seed, faker } = require("./");

(async () => {
  await seed(30, "warehouses", {
    warehouse_name: () => faker.word.words({ length: { min: 2, max: 3 } }),
  });
})()