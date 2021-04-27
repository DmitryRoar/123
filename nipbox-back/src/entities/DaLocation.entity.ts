import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class DaLocationEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	constructor(data?: ILocInfo, value?: string, unValue?: string) {
		super();
		if (value) {
			this.value = value;
		}

		if (unValue) {
			this.unValue = unValue;
		}
		if (data) {
			for (const key of Object.keys(data)) {
				this[key] = data[key];
			}
		}
	}

	@Column({ nullable: true })
	value: string;

	@Column({ nullable: true })
	unValue: string;

	@Column({ nullable: true })
	postal_code: string;
	@Column({ nullable: true })
	country: string;
	@Column({ nullable: true })
	country_iso_code: string;
	@Column({ nullable: true })
	federal_district?: string;
	@Column({ nullable: true })
	region_fias_id: string;
	@Column({ nullable: true })
	region_kladr_id: string;
	@Column({ nullable: true })
	region_iso_code: string;
	@Column({ nullable: true })
	region_with_type: string;
	@Column({ nullable: true })
	region_type: string;
	@Column({ nullable: true })
	region_type_full: string;
	@Column({ nullable: true })
	region: string;
	@Column({ nullable: true })
	area_fias_id: string;
	@Column({ nullable: true })
	area_kladr_id: string;
	@Column({ nullable: true })
	area_with_type: string;
	@Column({ nullable: true })
	area_type: string;
	@Column({ nullable: true })
	area_type_full: string;
	@Column({ nullable: true })
	area: string;
	@Column({ nullable: true })
	city_fias_id?: string;
	@Column({ nullable: true })
	city_kladr_id?: string;
	@Column({ nullable: true })
	city_with_type?: string;
	@Column({ nullable: true })
	city_type?: string;
	@Column({ nullable: true })
	city_type_full?: string;
	@Column({ nullable: true })
	city?: string;
	@Column({ nullable: true })
	city_area?: string;
	@Column({ nullable: true })
	city_district_fias_id?: string;
	@Column({ nullable: true })
	city_district_kladr_id?: string;
	@Column({ nullable: true })
	city_district_with_type?: string;
	@Column({ nullable: true })
	city_district_type?: string;
	@Column({ nullable: true })
	city_district_type_full?: string;
	@Column({ nullable: true })
	city_district?: string;
	@Column({ nullable: true })
	settlement_fias_id: string;
	@Column({ nullable: true })
	settlement_kladr_id: string;
	@Column({ nullable: true })
	settlement_with_type: string;
	@Column({ nullable: true })
	settlement_type: string;
	@Column({ nullable: true })
	settlement_type_full: string;
	@Column({ nullable: true })
	settlement: string;
	@Column({ nullable: true })
	street_fias_id: string;
	@Column({ nullable: true })
	street_kladr_id: string;
	@Column({ nullable: true })
	street_with_type: string;
	@Column({ nullable: true })
	street_type: string;
	@Column({ nullable: true })
	street_type_full: string;
	@Column({ nullable: true })
	street: string;
	@Column({ nullable: true, unique: true })
	house_fias_id: string;
	@Column({ nullable: true })
	house_kladr_id: string;
	@Column({ nullable: true })
	house_type: string;
	@Column({ nullable: true })
	house_type_full: string;
	@Column({ nullable: true })
	house: string;
	block_type?: string;
	@Column({ nullable: true })
	block_type_full?: string;
	@Column({ nullable: true })
	block?: string;
	@Column({ nullable: true })
	flat_fias_id?: string;
	@Column({ nullable: true })
	flat_type?: string;
	@Column({ nullable: true })
	flat_type_full?: string;
	@Column({ nullable: true })
	flat?: string;
	@Column({ nullable: true })
	flat_area?: string;
	@Column({ nullable: true })
	square_meter_price?: string;
	@Column({ nullable: true })
	flat_price?: string;
	@Column({ nullable: true })
	postal_box?: string;
	@Column({ nullable: true })
	fias_id: string;
	@Column({ nullable: true })
	fias_code: string;
	@Column({ nullable: true })
	fias_level: string;
	@Column({ nullable: true })
	fias_actuality_state: string;
	@Column({ nullable: true })
	kladr_id: string;
	@Column({ nullable: true })
	geoname_id: string;
	@Column({ nullable: true })
	capital_marker: string;
	@Column({ nullable: true })
	okato: string;
	@Column({ nullable: true })
	oktmo: string;
	@Column({ nullable: true })
	tax_office: string;
	@Column({ nullable: true })
	tax_office_legal: string;
	@Column({ nullable: true })
	timezone?: string;
	@Column({ nullable: true })
	geo_lat: string;
	@Column({ nullable: true })
	geo_lon: string;
	@Column({ nullable: true })
	beltway_hit?: string;
	@Column({ nullable: true })
	beltway_distance?: string;
	@Column({ nullable: true })
	metro?: string;
	@Column({ nullable: true })
	qc_geo: string;
	@Column({ nullable: true })
	qc_complete?: string;
	@Column({ nullable: true })
	qc_house?: string;
	@Column({ nullable: true })
	history_values?: string;
	@Column({ nullable: true })
	unparsed_parts?: string;
	@Column({ nullable: true })
	source?: string;
	@Column({ nullable: true })
	qc?: string;
}

export interface ILocInfo {
	postal_code: string;
	country: string;
	country_iso_code: string;
	federal_district?: string;
	region_fias_id: string;
	region_kladr_id: string;
	region_iso_code: string;
	region_with_type: string;
	region_type: string;
	region_type_full: string;
	region: string;
	area_fias_id: string;
	area_kladr_id: string;
	area_with_type: string;
	area_type: string;
	area_type_full: string;
	area: string;
	city_fias_id?: string;
	city_kladr_id?: string;
	city_with_type?: string;
	city_type?: string;
	city_type_full?: string;
	city?: string;
	city_area?: string;
	city_district_fias_id?: string;
	city_district_kladr_id?: string;
	city_district_with_type?: string;
	city_district_type?: string;
	city_district_type_full?: string;
	city_district?: string;
	settlement_fias_id: string;
	settlement_kladr_id: string;
	settlement_with_type: string;
	settlement_type: string;
	settlement_type_full: string;
	settlement: string;
	street_fias_id: string;
	street_kladr_id: string;
	street_with_type: string;
	street_type: string;
	street_type_full: string;
	street: string;
	house_fias_id: string;
	house_kladr_id: string;
	house_type: string;
	house_type_full: string;
	house: string;
	block_type?: string;
	block_type_full?: string;
	block?: string;
	flat_fias_id?: string;
	flat_type?: string;
	flat_type_full?: string;
	flat?: string;
	flat_area?: string;
	square_meter_price?: string;
	flat_price?: string;
	postal_box?: string;
	fias_id: string;
	fias_code: string;
	fias_level: string;
	fias_actuality_state: string;
	kladr_id: string;
	geoname_id: string;
	capital_marker: string;
	okato: string;
	oktmo: string;
	tax_office: string;
	tax_office_legal: string;
	timezone?: string;
	geo_lat: string;
	geo_lon: string;
	beltway_hit?: string;
	beltway_distance?: string;
	metro?: string;
	qc_geo: string;
	qc_complete?: string;
	qc_house?: string;
	history_values?: string;
	unparsed_parts?: string;
	source?: string;
	qc?: string;
}

export interface Suggestion {
	value: string;
	unrestricted_value: string;
	data: ILocInfo;
}

export interface Suggestions {
	suggestions: Suggestion[];
}
