const faker = require('faker');

const Seed = require('../../bin/faker/Seed');

const User = require('../../modules/user/models/user'),
passsword = require('../../lib/password');

class UserSeed extends Seed {

	async generate() {

		let password = await passsword.hash('123456');

		return {
			name: faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: password,
			status: faker.random.arrayElement(["active","inactive","blocked"])
		}

		 

	}

	model() {
		return User.get();
	}

}

module.exports = new UserSeed;
