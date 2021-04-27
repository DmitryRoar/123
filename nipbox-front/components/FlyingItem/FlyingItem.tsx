import { observer } from 'mobx-react-lite';
import { createRef, useEffect, useState } from 'react';
import { useStore } from '../../store/store';

const FlyingItem = observer(() => {
	const { cart } = useStore();
	const [can, setCan] = useState(true);

	useEffect(() => {
		// console.log(cart.toFly)
		if (cart.toFly.img && can) {
			const item = document.querySelector<HTMLDivElement>('.flyingItem')!;

			setCan(false);
			item.style.display = 'block';
			item.style.left = `${cart.toFly.from.x}px`;
			item.style.top = `${cart.toFly.from.y}px`;
			item.style.transition = '0.7s';

			setTimeout(() => {
				const elmnt = document.querySelector<HTMLDivElement>('.cart')!;

				item.style.left = `${elmnt.getBoundingClientRect().x + 30}px`;
				item.style.top = `${elmnt.getBoundingClientRect().y + 30}px`;
				item.style.opacity = '0';
				item.style.width = '10px';
				item.style.height = '10px';

				setTimeout(() => {
					item.style.transition = '0';
					item.style.left = `${0}px`;
					item.style.top = `${0}px`;
					item.style.opacity = '1';
					item.style.width = '200px';
					item.style.height = '200px';
					item.style.display = 'none';
					setCan(true);
					cart.setPixels({
						from: {
							x: 0,
							y: 0,
						},
						img: '',
					});
				}, 699);
			}, 50);
		}
	}, [cart.toFly, can]);

	return (
		<div className="flyingItem">
			<img src={cart.toFly.img} alt="" />
		</div>
	);
});

export default FlyingItem;
