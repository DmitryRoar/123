import { ChangeEvent, useEffect, useState } from 'react';
import styles from './AdminInput.module.scss';

interface InputProps {
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
	type?: 'text' | 'email' | 'password' | 'number' | 'file';
	name?: string;
	value?: string;
	autoComplete?: string;
	customClass?: string;
	err?: {
		set: (x: boolean) => any;
		value: boolean;
		match: RegExp;
	};
  multiple?: boolean;
}

export default function AdminInput({
	onChange,
	placeholder,
	type,
	name,
	autoComplete,
	customClass,
	err,
	value = '',
  multiple = false
}: InputProps) {
	const [text, setText] = useState('');
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setText(value)
	}, [value])

	useEffect(() => {
		if (err) {
			if (!text) {
				return;
			}
			if (!err.match.test(text)) {
				err.set(true);
			} else {
				err.set(false);
			}
		}
	}, [text]);

	return (
		<div className={`${styles.input} ${err && err.value ? styles.err : ''} ${customClass}`}>
			<div className={`${styles.placeholder} ${editing || text ? styles.editing : ''}`}>{placeholder}</div>
			<input
				type={type}
				name={name}
				autoComplete={autoComplete}
        multiple={multiple}
				onBlur={(e) => {
					setEditing(false);
				}}
				onFocus={(e) => {
					setEditing(true);
				}}
				onChange={(e) => {
					setText(e.target.value);
					if (onChange) {
						onChange(e);
					}
				}}
				value={value ? value : text}
			/>
		</div>
	);
}
