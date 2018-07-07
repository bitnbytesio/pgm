const faker = require('faker');

const Seed = require('../../bin/faker/Seed');

const glob = require('glob');

const fs = require('fs');


const Exercise = require('../../modules/exercise/models/exercise');


class ExerciseSeed extends Seed {

	constructor() {

		super();

		this.feeds = [];

		glob( __dirname + '/exercises/*/*.json', (err, files) => {

			
			if (err) {
				throw new Error(err);
			}

			files.forEach((file) => {

				
				this.feeds.push( fs.readFileSync(file) );
			});

				

		});

	

	}

	async generate() {

		/*console.log(JSON.parse(this.feeds[0]));
		process.exit();*/

		let data = [];
		
		for (let i of this.feeds) {

			let item = JSON.parse(i);

			data.push({
				name:item.name,
			    description:item.description,
			    video_link:item.video,
			    image:item.images[0],
			    target_muscle:item.targetMuscle,
			    equipment_type:item.equipmentType,
			    exercise_type:item.type,
			    mechanics_type:'n/a',
			    level:item.level
			});
			
		} 

		return data;

		 

	}

	model() {
		return Exercise.get();
	}

}

module.exports = new ExerciseSeed;
