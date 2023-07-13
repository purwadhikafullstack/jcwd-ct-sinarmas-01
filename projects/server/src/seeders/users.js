const { seed, faker } = require("./");
const { hash } = require("../lib");

(async () => {
	const password = await hash.encrypt("Test.1234");
	await seed(20, "users", {
		fullname: () => faker.person.fullName(),
		email: () => faker.internet.email().toLowerCase(),
		password,
		username: () => faker.internet.userName().toLowerCase(),
		profile_pic: () => faker.internet.avatar(),
		role: "User",
		createdAt: () => faker.date.recent(),
		updatedAt: () => faker.date.recent(),
		isVerified: () => Math.round(Math.random())
	});
})()