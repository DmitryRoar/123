import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useStore } from '../../store/store';

const Header = observer(() => {
	const { cart } = useStore();

	return (
		<header>
			<div className="container">
				<div className="logo">
					<Link href="/">
            <a>
						  <img src="/img/logo.png" alt="nipbox" />
            </a>
					</Link>
				</div>

				<Link href="/cart">
					<a className="cart">
						<img src="/img/cart.svg" alt="" />

						<div className="circle">{cart.getAmount}</div>
					</a>
				</Link>
			</div>
		</header>
	);
})

export default Header;
