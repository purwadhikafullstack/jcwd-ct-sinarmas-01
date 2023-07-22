const { seed, faker } = require("./");

(async () => {
  const date = new Date();
  await seed(20, "categories", {
    category_name: () => faker.word.words({ min: 1, max: 4 }),
    createdAt: date,
    updatedAt: date
  });
})();