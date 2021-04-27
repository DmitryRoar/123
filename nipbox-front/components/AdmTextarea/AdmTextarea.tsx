import { ChangeEvent, useEffect, useState } from 'react';

import styles from './AdmTextarea.module.scss';

interface AdmTextareaProps {
	placeholder?: string;
	onChange?: (x: string) => any;
	customClass?: string;
	defaultValue?: string;
}

export default function AdmTextarea({ onChange, placeholder, customClass, defaultValue = '' }: AdmTextareaProps) {
	const [text, setText] = useState('');
	const [editing, setEditing] = useState(false);
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		setEdited(true);
	}, [text])

	useEffect(() => {
		if (!edited) {
			setEditing(true)
		}
	}, [defaultValue, edited, text])

	return (
		<div className={`${styles.admTextareaContainer} ${customClass}`}>
			<div className={`${styles.placeholder} ${editing || text ? styles.editing : ''}`}>{placeholder}</div>
			<div
				defaultValue={'asdasdsd'}
				className={styles.textArea}
				contentEditable
				onFocus={() => {
					setEditing(true);
				}}
				onBlur={() => {
					setEditing(false);
				}}
				dangerouslySetInnerHTML={{
					__html: defaultValue
				}}
				onInput={(e) => {
					//@ts-ignore
					setText(e.target.textContent);
					//@ts-ignore
					if (onChange) onChange(e.target.textContent);
				}}
			></div>
		</div>
	);
}
