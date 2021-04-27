import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ILike } from 'typeorm';
import DaLocationEntity, { Suggestions } from '../../entities/DaLocation.entity';
import LocationEntity from '../../entities/Location.entity';

@Injectable()
export default class LocationService {
	cache = new Map<
		string,
		{
			value: string;
			index: string;
			house: string;
			city: string;
		}[]
	>();

	async findSdekLocations(name: string, cc: string) {
		let code = '48';

		if (cc === 'Беларусь') code = '42';

		const locations = await LocationEntity.find({
			where: {
				city_name: ILike(`${name}%`),
				country_code: code,
			},
			take: 10,
		});

		return locations;
	}

	async getAdressHint(text: string) {
		try {
			if (this.cache.has(text.toLowerCase())) {
				return this.cache.get(text.toLowerCase());
			}

			const key = JSON.parse(readFileSync(resolve(__dirname, '../../../post.config.json')).toString()).daDataKey;

			const res = await axios.post(
				'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
				{
					query: text,
					count: 20,
					locations: [
						{
							country: 'Россия',
						},
					],
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Token ' + key,
					},
				}
			);

			const cities: Suggestions = res.data;
			setTimeout(() => {
				DaLocationEntity.createQueryBuilder()
					.insert()
					.values(
						cities.suggestions.map((s) => {
							return {
								value: s.value,
								unValue: s.unrestricted_value,
								...s.data,
							};
						})
					)
					.onConflict(`("house_fias_id") DO NOTHING`)
					.execute();
			}, 100);

			const data = cities.suggestions.map((s) => ({
				value: s.value,
				index: s.data.postal_code,
				house: s.data.house,
				city: s.data.city
			}));

			this.cache.set(text.toLowerCase(), data);

			return data;
		} catch (err) {
			console.log(err);
			return [];
		}
	}
}
