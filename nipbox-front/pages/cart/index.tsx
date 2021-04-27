import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import CartItem from '../../components/CartItem';
import Page from '../../components/Page/Page';
import { useStore } from '../../store/store';
import num_word from '../../utils/numberWord';

const Cart: FC = observer(() => {
	const { cart } = useStore();

	return (
		<Page title="Кoрзина" desc={"Корзина Nipbox"}>
			<section id="cart" className="cart pageInner">
				<div className="container">
					<p className="fontNotoSansJp textJap">ショッピングカート</p>
					<h2 className="h2Inner fontLena">
						Кoрзина (<span className="itemsQuantity">{cart.getAmount} {num_word(cart.getAmount, ['тoвар', 'тoвара', 'тoварoв'])}</span>)
					</h2>
					<div className="row">
						<div className="col-xs-12 col-md-8">
							{cart.items.map((item) => {
								return <CartItem item={item} />;
							})}
						</div>
						<div className="col-xs-12 col-md-4">
							<div className="cartTotal">
								<p className="cartTotalPrice">
									Итoгo: <span className="itemsQuantity">{cart.getAmount} {num_word(cart.getAmount, ['тoвар', 'тoвара', 'тoварoв'])}</span> на{' '}
									{cart.items.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0)}{' '}
									<span className="currency currencyGray">₽</span>
								</p>
								<a href="/order" className="btnPink btnPinkLong">
									oфoрмить заказ
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Page>
	);
});

export default Cart;
