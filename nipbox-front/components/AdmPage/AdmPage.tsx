import Head from 'next/head';
import Link from 'next/link';
import AdmBlock from '../AdmBlock/AdmBlock';

import styles from './AdmPage.module.scss';

interface IAdmPageProps {
	isAuthed: boolean;
	title: string;
	children: React.ReactNode;
}

export default function AdmPage({ children, isAuthed, title }: IAdmPageProps) {
	if (!isAuthed) {
		return (
			<>
				<Head>
					<title>{title}</title>
				</Head>
				<div className={styles.page}>{children}</div>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className={styles.page}>
				<div className={styles.navBar}>
					<div className={styles.logo}>
            <Link href="/">
              <a>
                Nipbox
              </a>
            </Link>
          </div>
					<Link href="/admin/dashboard/orders">
						<a className={styles.navItem}>Заказы</a>
					</Link>
					<Link href="/admin/dashboard/products">
						<a className={styles.navItem}>Товары</a>
					</Link>
					<Link href="/admin/dashboard/reviews">
						<a className={styles.navItem}>Oтзывы</a>
					</Link>
					<Link href="/admin/dashboard/videos">
						<a className={styles.navItem}>Видео</a>
					</Link>
          <Link href="/admin/dashboard/blogs">
						<a className={styles.navItem}>Блоги</a>
					</Link>
					<Link href="/admin/dashboard/pages">
						<a className={styles.navItem}>Страницы</a>
					</Link>

					<Link href="/admin/dashboard/config">
						<a className={styles.navItem}>Конфиг</a>
					</Link>
					<Link href="/admin/dashboard/seo-config">
						<a className={styles.navItem}>Seo главная</a>
					</Link>
					<Link href="/admin/dashboard/promocodes">
						<a className={styles.navItem}>Промокоды</a>
					</Link>
					<Link href="/admin/dashboard/password-change">
						<a className={styles.navItem}>Смена пароля</a>
					</Link>
				</div>
				<AdmBlock customClass={styles.content}>{children}</AdmBlock>
				{/* <div className={styles.content}></div> */}
			</div>
		</>
	);
}
