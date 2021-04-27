import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import * as sharp from 'sharp';

@Injectable()
export default class FileService {
	saveFile(fileName: string, type: 'shopitem' | 'video' | 'shopitem-slide'| 'blog', file: { buffer: Buffer }) {
		const dir = resolve(__dirname, '../../../static/' + type + `/${fileName}`);
		sharp(file.buffer)
			.resize(400, 359)
			.toFile(dir, (err) => {
				if (err) console.error(err);
			});
	}
}
