import { Injectable } from '@nestjs/common';
import Promocode from '../../entities/Promocode.entity';

@Injectable()
export default class PromocodesService {
	async findByName(name: string) {
		return await Promocode.findOne({
			where: {
				codeName: name,
			},
		});
	}

	async create(name: string, precentage: number) {
		const promocode = new Promocode();
		promocode.codeName = name;
		promocode.precentage = precentage;
		await promocode.save();

		return true;
	}
	async all() {
		return await Promocode.find();
	}
	async remove(id: string) {
		await Promocode.delete({
			id: id,
		});

		return true;
	}
}
