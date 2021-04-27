export const envConfig = {
	ENV: 'PRODUCTION',
} as {
	ENV: 'DEVELOPMENT' | 'PRODUCTION';
};

export const appConfig = {
	baseUrl: envConfig.ENV === 'DEVELOPMENT' ? 'http://192.168.31.205:5757/api' : 'https://nipbox.ru/api',
};
