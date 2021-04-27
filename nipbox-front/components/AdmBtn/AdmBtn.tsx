import styles from './AdmBtn.module.scss';
import Link from 'next/link';

interface AdmBtnProps {
	onClick?: () => any;
	children: React.ReactNode;
	customClass?: string;
	loading?: boolean;
	href?: string;
	type?: 'primary' | 'secondary';
  btnType?: 'button' | 'submit';
  btnDisabled?: boolean;
}

export default function AdmBtn({ btnDisabled = false, btnType = 'button', children, onClick = () => {}, customClass, loading, href, type = 'primary' }: AdmBtnProps) {
	if (href) {
		return (
			<Link href={href}>
				<a
					onClick={() => {
						if (!loading) onClick();
					}}
					className={`${styles.admBtn} ${type === 'secondary' && styles.secondary} ${
						loading && styles.loading
					} ${customClass}`}
				>
					{children}
				</a>
			</Link>
		);
	}

	return (
		<button
			onClick={() => {
				if (!loading) onClick();
			}}
			className={`${styles.admBtn} ${type === 'secondary' && styles.secondary} ${
				loading && styles.loading
			} ${customClass}`}
      type={btnType}
      disabled={btnDisabled}
		>
			{children}
		</button>
	);
}
