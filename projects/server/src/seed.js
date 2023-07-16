const child = require("child_process");

console.log(process.argv);
const file = process.argv[2];

(() => {
	child.exec(`node ./seeders/${file}.js`, (err) => {
		if(err) console.log(err);
	});
	console.log("Seeded");
	process.exit();
})();