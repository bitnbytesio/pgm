

const UserSeed = require('./UserSeed');
const MemberShipSeed = require('./MemberShipSeed');
const ExerciseSeed = require('./ExerciseSeed');


function start() {

	console.log('Seeding..');

	return new Promise( (resolve, reject) => {

		//return ExerciseSeed.init(0).then(resolve).catch(reject);

		UserSeed.init(1).then(function () {
		
			MemberShipSeed.init(3).then(function () {
				
				ExerciseSeed.init(0).then(resolve).catch(reject);

			}).catch(reject);
		
		}).catch(reject);
	});
}

module.exports.start = start;
