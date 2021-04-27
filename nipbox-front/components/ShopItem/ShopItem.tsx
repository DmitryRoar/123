import Link from 'next/link';
import { createRef, useEffect, useState } from 'react';
import { appConfig } from '../../config';
import IShopItem from '../../interfaces/IShopItem';
import { useStore } from '../../store/store';
import Image from 'next/image';
import sanitizeFont from '../../utils/sanitizeFont';

interface ShopItemProps {
	item: IShopItem;
}

export default function ShopItem({ item }: ShopItemProps) {
	const { cart } = useStore();
	const [buyText, setBuyText] = useState('Купить');
	const ref = createRef<HTMLDivElement>();
	const [length, setLength] = useState<number | undefined>(undefined);

	function addToCart() {
		cart.addItem(item, {
			from: {
				x: ref.current.getBoundingClientRect().x + 50,
				y: ref.current.getBoundingClientRect().y - 10,
			},
			img: `${appConfig.baseUrl}/static/shopitem/opened-${item.id}.png`,
		});
		setBuyText('✔ Дoбавленo в кoрзину');

		setTimeout(() => {
			setBuyText('Купить');
		}, 2000);
	}

	useEffect(() => {
		setInterval(() => {
			if (window.innerWidth <= 768) {
				setLength(23);
			} else {
				setLength(undefined);
			}
		}, 1000);
	}, []);

	return (
		<div className="catalogItemContainer">
			<div className="catalogItem">
				<Link href={`/product/${item.id}`}>
					<a className="productLink">
						<img
							src={`${appConfig.baseUrl}/static/shopitem/closed-${item.id}.png`}
							alt="catalogItemImage"
							className="catalogItemImage"
						/>
						<img
							src={`${appConfig.baseUrl}/static/shopitem/opened-${item.id}.png`}
							alt="catalogItemImage"
							className="catalogItemImage catalogItemImageOpen"
						/>
						{/* <Image src={`${appConfig.baseUrl}/static/shopitem/opened-${item.id}.png`} className="catalogItemImage catalogItemImageOpen" /> */}
					</a>
				</Link>
				<p className="catalogItemName fontLena" ref={ref}>
					{item.name}
				</p>
				<p className="catalogItemQuantity fontUbuntuNormal">
					{length === undefined && sanitizeFont(item.amountDesc)}
					{length && item.amountDesc.length > length && item.amountDesc.slice(0, length) + '...'}
					{length && item.amountDesc.length <= length && item.amountDesc}
				</p>
				<p className="catalogItemDescription fontUbuntuNormal">{sanitizeFont(item.mini)}</p>
				<p className="catalogItemPrice fontLena">
					{item.price} <span className="currency currencyPink">₽</span>
				</p>
				<Link href={`/product/${item.id}`}>
					<a className="catalogItemLink">Узнать пoдрoбнее</a>
				</Link>

				<div
					className={`catalogItemBtn btnPink ${buyText === '✔ Дoбавленo в кoрзину' && 'addingToCart'}`}
					onClick={() => addToCart()}
				>
					{buyText}
				</div>
			</div>
		</div>
	);
}
