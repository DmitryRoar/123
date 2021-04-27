import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Catalog from '../components/Catalog/Catalog';
import FlyingItem from '../components/FlyingItem/FlyingItem';
import Hero from '../components/Hero/Hero';
import Page from '../components/Page/Page';
import Reviews from '../components/Reviews/Reviews';
import VideoPlayerFixed from '../components/VideoPlayerFixed/VideoPlayerFixed';
import VideoReviews from '../components/VideoReviews/VideoReviews';
import { appConfig } from '../config';
import IShopItem from '../interfaces/IShopItem';

const Home = observer(
	({
		items,
		seoConfig,
	}: {
		items: IShopItem[];
		seoConfig: {
			seoDesc: string;

			seoTitle: string;

			seoTags: string;
		};
	}) => {
		return (
			<Page title={seoConfig.seoTitle} desc={seoConfig.seoDesc} tags={seoConfig.seoTags}>
				<Hero />
				<Catalog itemsArr={items} />
				<section id="theySay" className="theySay">
					<div className="container">
						<Reviews />
						<VideoReviews />
					</div>
				</section>
				<VideoPlayerFixed />
				<FlyingItem />
			</Page>
		);
	}
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		// console.log(`${appConfig.baseUrl}/products/`)
		const res = await axios.get(`${appConfig.baseUrl}/products/`);
		const seoConfig = (await axios.get(`${appConfig.baseUrl}/seo-config/`)).data;
		// console.log(res.data);
		return {
			props: {
				items: res.data,
				seoConfig: seoConfig,
			},
		};
	} catch (err) {
		console.log(err.message);
		return {
			props: {
				items: [],
			},
		};
	}
};
