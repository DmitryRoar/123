import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import { ssrUtils } from '../../../../utils/ssr';

export default function PasswordChange() {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const [err, setErr] = useState('');
	const [loading, setLoading] = useState(false);

	function change() {
		if (!loading) {
			setLoading(true);

			axios
				.post(
					`${appConfig.baseUrl}/auth/change`,
					{
						old: oldPassword,
						newPass: newPassword,
					},
					{ withCredentials: true }
				)
				.then((res) => res.data)
				.then((data) => {
					if (data.err) {
						setErr(data.err);
						setLoading(false);
					} else {
						setLoading(false);
						window.location.reload();
					}
				});
		}
	}

	return (
		<AdmPage isAuthed={true} title="Смена пароля">
			<AdminInput onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} placeholder="Введите старый пароль" />
			<AdminInput onChange={(e) => setNewPassword(e.target.value)} value={newPassword} placeholder="Введите новый пароль" />
            <AdmBtn onClick={() => change()} loading={loading}>Изменить</AdmBtn>
			<p className="err">{err}</p>
		</AdmPage>
	);
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login',
			},
		};
	}

	return {
		props: {},
	};
};
