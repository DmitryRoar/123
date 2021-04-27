import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import CreatePageDto from './create-page.dto';

export default class EditPageDto extends PartialType(CreatePageDto) {
	@IsNotEmpty()
	@IsNumberString()
	id: string;
}
