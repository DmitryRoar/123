import axios from 'axios';
import { appConfig } from '../config';

export const ssrUtils = {
	validateReq: async (cookies) => {
		const { username, password } = cookies;

		try {
			const res = await axios.get(`${appConfig.baseUrl}/auth/check`, {
				headers: {
					cookie: `username=${username}; password=${password}`,
				},
			});

			return true;
		} catch (err) {
			return false;
		}
	},
};
