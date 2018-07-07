const faker = require('faker');

const Seed = require('../../bin/faker/Seed');

const Model = require('../../modules/membership/models/membership');

class MemberShipSeed extends Seed {

	async generate() {

		let plans = [
		];

		let limit = faker.random.number({min:2, max:5});

		for (let i = 1; i<=limit; i++) {

			
			let period  = faker.random.arrayElement(["day","month", "year"]);
			let duration = 2;
			let price = 100;
			if (period == 'day') {
				duration = faker.random.arrayElement([2,7,15,25]);
				price = faker.finance.amount(100,1000);
			}

			if (period == 'month') {
				duration = faker.random.arrayElement([1,3,4,6,8,12]);
				price = faker.finance.amount(1000,8000);
			}

			if (period == 'year') {
				duration = faker.random.arrayElement([1,2,3,4,5]);
				price = faker.finance.amount(8000,40000);
			}

			plans.push({
				price: price,
				duration: duration,
				period: period,
			});
		}
		
		return {
			title: faker.lorem.word(),
			description: faker.lorem.paragraphs(faker.random.number({min:2, max:5})),
			plans: plans,
			status: faker.random.arrayElement(["active","inactive"])
		}

		 

	}

	model() {
		return Model.get();
	}

}

module.exports = new MemberShipSeed;
