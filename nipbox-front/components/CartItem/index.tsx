import { observer } from 'mobx-react-lite';
import { appConfig } from '../../config';
import IShopItem from '../../interfaces/IShopItem';
import { ICartItem } from '../../store/CartStore';
import { useStore } from '../../store/store';
import sanitizeFont from '../../utils/sanitizeFont';

const CartItem = observer(({ item }: { item: ICartItem }) => {
	const { cart } = useStore();

	return (
		<div className="cartList">
			<div className="cartListItem">
				<img
					src={`${appConfig.baseUrl}/static/shopitem/closed-${item.item.id}.png`}
					alt="cartItemImage"
					className="cartItemImage"
				/>
				<p className="cartItemName">{sanitizeFont(item.item.name)}</p>
				<div className="cartItemQuantity">
					<a onClick={() => cart.minusItem(item.item)} href="#" className="cartItemMinus">
						-
					</a>
					<span className="cartItemQuantityNumber">{item.amount}</span>
					<a onClick={() => cart.addItem(item.item)} className="cartItemPlus">
						+
					</a>
				</div>
				<p className="cartItemPrice">
					{item.item.price} <span className="currency currencyGray">₽</span>
				</p>
				<a onClick={() => cart.removeItem(item.item)} className="cartItemDelete">
					✖
				</a>
			</div>
		</div>
	);
});

export default CartItem;
