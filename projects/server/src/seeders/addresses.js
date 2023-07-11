const { seed, faker } = require("./");

(async () => {
	await seed(20,"addresses", {
		address_name: () => faker.location.streetAddress(),
		city: () => faker.location.city(),
		type: () => "Kabupaten",
		province: () => faker.location.state(),
		geolocation: () => faker.location.nearbyGPSCoordinate().join(", "),
		createdAt: () => faker.date.recent(),
		updatedAt: () => faker.date.recent()
	});
})();