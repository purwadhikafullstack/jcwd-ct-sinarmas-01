const { seed, faker } = require("./");
const { hash } = require("../lib");

(async () => {
	await seed(20, "users", {
		fullname: () => faker.person.fullName(),
		email: () => faker.internet.email().toLowerCase(),
		password: "Test.1234",
		username: () => faker.internet.userName().toLowerCase(),
		profile_pic: () => faker.internet.avatar(),
		role: "User",
		createdAt: () => faker.date.recent(),
		updatedAt: () => faker.date.recent()
	});
})()