import axios from 'axios';
import React, { useState } from 'react';
import { appConfig } from '../../config';
import IShopItem from '../../interfaces/IShopItem';
import AdmBlock from '../AdmBlock/AdmBlock';
import AdmBtn from '../AdmBtn/AdmBtn';
import styles from './AdmProduct.module.scss';
interface AdmProductProps {
	item: IShopItem;
}
export default function AdmProduct({ item }: AdmProductProps) {
	const [removing, setRemoving] = useState(false);

	function remove() {
		setRemoving(true);
		axios.get(`${appConfig.baseUrl}/products/remove/${item.id}`, { withCredentials: true }).then(res => window.location.reload());
	}

	return (
		<AdmBlock customClass={styles.block}>
			<div className={styles.top}>
				<div className={styles.id}>#{item.id}</div>
				<div className={styles.name}>{item.name}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.media}>
					<img
						src={`${appConfig.baseUrl}/static/shopitem/closed-${item.id}.png`}
						alt=""
						className={styles.closed}
					/>
					<img
						src={`${appConfig.baseUrl}/static/shopitem/opened-${item.id}.png`}
						alt=""
						className={styles.opened}
					/>
				</div>

				<div className={styles.data}>
					<div className={styles.desc}>
						<img src="/img/package.png" alt="" />
						<div className={styles.text}>{item.amountDesc}</div>
					</div>
					<div className={styles.desc}>
						<img src="/img/info.png" alt="" />
						<div className={styles.text}>{item.desc}</div>
					</div>

					<div className={styles.numbers}>
						<div className={styles.weight}>вес: {item.weight} г.</div>
						<div className={styles.price}>Цена: {item.price} ₽</div>
					</div>
				</div>

				<div className={styles.controls}>
					<AdmBtn customClass={styles.control} onClick={() => {}} href={`/admin/dashboard/products/edit/${item.id}`}>
						Редактирoвать
					</AdmBtn>
					<AdmBtn customClass={styles.control} onClick={() => {remove()}} loading={removing} type="secondary">
						Удалить
					</AdmBtn>
					<div className={styles.grabber}>
						<img src="/img/move.svg" alt="" />
					</div>
				</div>
			</div>
		</AdmBlock>
	);
}
