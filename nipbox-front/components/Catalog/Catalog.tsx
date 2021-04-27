import axios from 'axios';
import { GetServerSideProps } from 'next';
import { appConfig } from '../../config';
import IShopItem from '../../interfaces/IShopItem';
import ShopItem from '../ShopItem/ShopItem';
import styles from './Catalog.module.scss';

export default function Catalog({ itemsArr }: { itemsArr: IShopItem[] }) {
	return (
		<section id="catalog" className="catalog">
			<div className="container">
				<p className="fontNotoSansJp textJap">カタログ</p>
				<h2 className="h2Main fontLena">Каталог</h2>
				<div className={styles.catalogScroll}>
					<div className={styles.rowCatalog}>
						{itemsArr
							.sort((a, b) => a.order - b.order)
							.map((obj, i) => {
								return <ShopItem key={i} item={obj} />;
							})}
					</div>
				</div>
			</div>
		</section>
	);
}
