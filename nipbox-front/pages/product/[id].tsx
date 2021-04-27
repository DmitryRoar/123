import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { createRef, useState } from 'react';
import Page from '../../components/Page/Page';
import { appConfig } from '../../config';
import IShopItem from '../../interfaces/IShopItem';
import Slider from 'react-slick';
import { useStore } from '../../store/store';
import FlyingItem from '../../components/FlyingItem/FlyingItem';
import ShopItem from '../../components/ShopItem/ShopItem';
import Link from 'next/link';
import sanitizeFont from '../../utils/sanitizeFont';

export default function Product({ item, interesting }: { item: IShopItem; interesting: IShopItem[] }) {
	let [sliderRef, setSliderRef] = useState<any>();
	let [sliderNavRef, setSliderNavRef] = useState<any>();

	const [cartText, setcartText] = useState('Купить');

	const btnRef = createRef<HTMLDivElement>();

	const { cart } = useStore();

	function getSlides() {
		let slides: string[] = [];

		while (slides.length < 4) {
			slides.push(...item.media.imgs);
		}

		return slides;
	}

	function addToCart() {
		cart.addItem(item, {
			from: {
				x: btnRef.current.getBoundingClientRect().x + 50,
				y: btnRef.current.getBoundingClientRect().y + 10,
			},
			img: `${appConfig.baseUrl}/static/shopitem/opened-${item.id}.png`,
		});
		setcartText('✔ Дoбавленo в кoрзину');

		setTimeout(() => {
			setcartText('Купить');
		}, 2000);
	}

	return (
		<Page desc={item.seoDesc} tags={item.seoTags} title={item.name}>
			<section id="product" className="product pageInner">
				<div className="container">
					<p className="fontNotoSansJp textJap">製品</p>
					<h2 className="h2Inner fontLena">{item.name}</h2>
					<div className="productCard">
						<div className="row">
							<div className="col-xs-12 col-md-8">
								<div className="productImages">
									<Slider
										ref={(ref) => {
											setSliderRef(ref);
										}}
										asNavFor={sliderNavRef}
										infinite={true}
										slidesToShow={1}
										slidesToScroll={1}
										fade={true}
										arrows={true}
										dots={false}
										adaptiveHeight={true}
										className="sliderSingle"
									>
										{getSlides().map((src) => {
											console.log(src);
											return (
												<img
													src={`${appConfig.baseUrl}/static/shopitem-slide/${src}`}
													alt="productImage"
												/>
											);
										})}
									</Slider>

									<Slider
										ref={(ref) => {
											setSliderNavRef(ref);
										}}
										infinite={true}
										slidesToShow={4}
										slidesToScroll={1}
										focusOnSelect={true}
										arrows={true}
										dots={false}
										asNavFor={sliderRef}
										className="sliderNav"
									>
										{getSlides().map((src) => {
											console.log(src);
											return (
												<img
													src={`${appConfig.baseUrl}/static/shopitem-slide/${src}`}
													alt="productImage"
												/>
											);
										})}
									</Slider>
								</div>
							</div>
							<div className="col-xs-12 col-md-4">
								<div className="productInfo">
									<p className="productCardPrice">
										{item.price} <span className="currency currencyGray">₽</span>
									</p>
									<div className="productInfoBlock">
										<img src="/img/package.png" alt="productInfoIcon" className="productInfoIcon" />
										<p className="productCardQuantity">{item.amountDesc}</p>
									</div>
									<div className="productInfoBlock">
										<img src="/img/info.png" alt="productInfoIcon" className="productInfoIcon" />
										<p className="productCardDescription">{item.desc}</p>
									</div>
									<div
										className={'btnPink btnPinkLong ' + `${cartText ? 'cartAdding' : ''}`}
										ref={btnRef}
										onClick={() => addToCart()}
									>
										{cartText}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="interestingContainer">
						<p className="fontNotoSansJp textJap">多分</p>
						<h2 className="h2Inner fontLena">Мoжет быть интереснo</h2>
						<div className="interesting">
							{interesting
								.sort((a, b) => a.order - b.order)
								.map((obj, i) => {
									return (
										<div className="interestingItem">
											<img
												src={`${appConfig.baseUrl}/static/shopitem/opened-${obj.id}.png`}
												alt=""
											/>
											<p className="catalogItemName fontLena">{sanitizeFont(obj.name)}</p>
											<p className="catalogItemQuantity fontUbuntuNormal">
												{sanitizeFont(obj.amountDesc)}
											</p>
											<Link href={`/product/${obj.id}`}>
												<a className="catalogItemLink">Узнать пoдрoбнее</a>
											</Link>
											<p className="catalogItemPrice fontLena">
												{obj.price} <span className="currency currencyPink">₽</span>
											</p>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</section>
			<FlyingItem />
		</Page>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params;

	try {
		const res = await axios.get(`${appConfig.baseUrl}/products/id/${id}`);

		const res2 = await axios.get(`${appConfig.baseUrl}/products/exclude/${id}/take/4`);

		return {
			props: {
				item: res.data,
				interesting: res2.data,
			},
		};
	} catch (err) {
		console.log(err.message);

		return {
			props: {},
			redirect: '/',
		};
	}
};
