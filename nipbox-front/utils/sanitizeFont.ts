export default function sanitizeFont(x: string) {
	return x
		.split('')
		.map((x) => {
			if (x === 'о') return 'o';

			return x;
		})
		.join('');
}
