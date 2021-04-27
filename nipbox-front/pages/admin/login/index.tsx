import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import AdmBtn from '../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../components/AdminInput/AdminInput';
import AdmPage from '../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../config';
import { ssrUtils } from '../../../utils/ssr';
import styles from './Login.module.scss';

const textRegexp = /^([a-z0-9а-яА-Я@#\-!.,() ])+$/i;

export default function Login() {
	const [username, setUsername] = useState('');
	const [usernameErr, setUsernameErr] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordErr, setPasswordErr] = useState(false);

	const [loginErr, setLoginErr] = useState('');

	const [loading, setLoading] = useState(false);

	function login() {
		// if (!passwordErr || !usernameErr) {
		// 	setLoginErr('Введенные данные сoдержат запрещенные симвoлы');
		// 	return;
		// }

		setLoading(true);
		axios
			.post(
				// `${appConfig.baseUrl}/auth/login`,
        `http://localhost:5757/api/auth/login`,
				{
					name: username,
					password
				},
				{
					withCredentials: true
				}
			)
			.then((res) => {
				const data = res.data;

				console.log(data, 'd');
				window.location.href = '/admin/dashboard/orders';
			})
			.catch((err) => {
				console.log(err, 's');
				setLoading(false);
			});
	}

	return (
		<AdmPage title="Админ панель" isAuthed={false}>
			<div className={styles.login}>
				<h1>Вхoд в админ панель</h1>

				<AdminInput
					placeholder="Username"
					customClass={styles.input}
					autoComplete="username"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
					err={{
						match: textRegexp,
						set: setUsernameErr,
						value: usernameErr,
					}}
				/>
				<AdminInput
					placeholder="Password"
					customClass={styles.input}
					name="current-password"
					autoComplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
					err={{
						match: textRegexp,
						set: setPasswordErr,
						value: passwordErr,
					}}
				/>

				<AdmBtn
					customClass={styles.btn}
					loading={loading}
					onClick={() => {
						login();
					}}
				>
					Вoйти{' '}
				</AdmBtn>
			</div>
		</AdmPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	if (await ssrUtils.validateReq(context.req.cookies)) {
		return {
			redirect: {
				destination: '/admin/dashboard/orders',
			},
			props: {},
		};
	}

	return {
		props: {},
	};
};
