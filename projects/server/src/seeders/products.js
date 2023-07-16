const { faker, seed } = require("./");

(async () => {
  await seed(30, "products", {
    product_name: () => faker.word.words({ count: { min: 1, max: 6 } }) ,
    desc: () => faker.word.words({ count: { min: 10, max: 100 } }),
    price: () => faker.number.int({ min: 1000, max: 5000000 }),
    product_image: () => faker.image.url(),
    weight: () => faker.number.int({ min: 100, max: 5000 }),
    createdAt: () => faker.date.anytime(),
    updatedAt: () => faker.date.anytime()
  });
})();