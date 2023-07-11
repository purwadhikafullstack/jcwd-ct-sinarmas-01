const { faker, seeder } = require("./");
const { getCities } = require("../lib/ongkir");

(async () => {
	const { rajaongkir } = await getCities();
	for (let i = 0; i < rajaongkir.results.length; i++) {
		await seeder.seed(0, "cities", {
			city_name: `${rajaongkir.results[i].type} ${rajaongkir.results[i].city_name}`,
			type: rajaongkir.results[i].type,
			createdAt: () => faker.date.recent(),
			updatedAt: () => faker.date.recent()
		});
		console.log("Data length : ", rajaongkir.results.length);
		console.log(rajaongkir.results[i]);
	}
	process.exit();
})();