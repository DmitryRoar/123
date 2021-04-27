import styles from './AdmBlock.module.scss';

interface AdmBlockProps {
	children: React.ReactNode;
	customClass?: string;
}

export default function AdmBlock({ children, customClass }: AdmBlockProps) {
	return <div className={`${styles.admBlock} ${customClass}`}>{children}</div>;
}
