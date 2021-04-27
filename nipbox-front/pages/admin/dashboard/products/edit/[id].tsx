import axios from 'axios';
import { useLocalObservable } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';
import AdmBlock from '../../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import AdmTextarea from '../../../../../components/AdmTextarea/AdmTextarea';
import { appConfig } from '../../../../../config';
import IShopItem from '../../../../../interfaces/IShopItem';
import { ssrUtils } from '../../../../../utils/ssr';

import styles from './ProductAdd.module.scss';

export default function AddProduct({ item }: { item: IShopItem }) {
	const [name, setName] = useState(item.name);
	const [desc, setDesc] = useState(item.desc);
	const [amountDesc, setAmountDesc] = useState(item.amountDesc);
	const [price, setPrice] = useState(item.price);
	const [weight, setWeight] = useState(item.weight);
	const [mini, setMini] = useState(item.mini);

	const [height, setHeight] = useState(item.height);
	const [width, setWidth] = useState(item.width);
	const [length, setlength] = useState(item.length);

	const [closed, setClosed] = useState<File | undefined>();
	const [opened, setOpened] = useState<File | undefined>();

	const [slidesToRemove, setSlidesToRemove] = useState<string[]>([]);

	const [err, setErr] = useState('');

	const [seoTags, setSeoTags] = useState(item.seoTags);
	const [seoDesc, setSeoDesc] = useState(item.seoDesc);

	const [slides, setSlides] = useState<
		{
			file: File;
			url: string;
			initial: null | string;
		}[]
	>(
		item.media.imgs.map((src) => {
			return {
				file: undefined,
				initial: src,
				url: `${appConfig.baseUrl}/static/shopitem-slide/${src}`,
			};
		})
	);

	const [loading, setLoading] = useState(false);

	function edit() {
		if (loading) return;

		if (slides.length === 0) {
			setErr('Добавьте хотябы один слайд!');
			setLoading(false);
			return;
		}

		setLoading(true);

		const data = new FormData();
		data.append('id', item.id);
		data.append('name', name);
		data.append('desc', desc);
		data.append('amountDesc', amountDesc);
		data.append('price', price.toString());
		data.append('weight', weight.toString());
		data.append('mini', mini);
		data.append('length', length.toString());
		data.append('width', width.toString());
		data.append('height', height.toString());
		data.append('seoTags', seoTags);
		data.append('seoDesc', seoDesc);
		if (opened) {
			data.append('opened', opened);
		}
		if (closed) {
			data.append('closed', closed);
		}

		axios
			.post(`${appConfig.baseUrl}/products/edit`, data, {
				withCredentials: true,
			})
			.then(async (res) => {
				const data: IShopItem = res.data;

				if (slidesToRemove) {
					for (let slide of slidesToRemove) {
						await axios.post(
							`${appConfig.baseUrl}/products/remove-slide`,
							{
								slideName: slide,
								id: item.id,
							},
							{
								withCredentials: true,
							}
						);
					}
				}

				if (slides.length > 0) {
					for (const slide of slides) {
						if (slide.initial) {
							continue;
						}
						const form = new FormData();
						form.append('id', item.id);
						form.append('file', slide.file);

						await axios.post(`${appConfig.baseUrl}/products/upload-slide`, form, {
							withCredentials: true,
						});
					}
				}

				window.location.href = '/admin/dashboard/products';
			});
	}

	function addSlide(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.item(0);

		if (file) {
			const obj = {
				file: file,
				url: URL.createObjectURL(file),
				initial: null,
			};

			setSlides(slides.concat([obj]));
		}
	}

	function addFIle(e: ChangeEvent<HTMLInputElement>, setter: (x: File) => any) {
		const file = e.target.files?.item(0);

		if (file) {
			setter(file);
		}
	}

	function removeSlide(index) {
		const s = [...slides];

		const slide = s[index];
		if (slide.initial) {
			setSlidesToRemove(slidesToRemove.concat(slide.initial));
		}

		s.splice(index, 1);
		setSlides(s);
	}

	return (
		<AdmPage isAuthed={true} title="Nipbox - сoздание тoвара">
			<AdmBlock>
				<h1>Сoздание тoвара</h1>
				<AdminInput
					onChange={(e) => {
						setName(e.target.value);
					}}
					customClass={styles.inp}
					value={name}
					placeholder="Название"
				/>

				<AdminInput
					onChange={(e) => {
						setSeoDesc(e.target.value);
					}}
					value={seoDesc}
					placeholder="Seo описание"
				/>
				<AdminInput
					onChange={(e) => {
						setSeoTags(e.target.value);
					}}
					value={seoTags}
					placeholder="Seo теги"
				/>

				<AdmTextarea
					onChange={(x) => {
						setDesc(x);
					}}
					customClass={styles.inp}
					placeholder="oписание"
					defaultValue={item.desc}
				/>
				<AdmTextarea
					onChange={(x) => {
						setAmountDesc(x);
					}}
					customClass={styles.inp}
					placeholder="oписание кoличества"
					defaultValue={item.amountDesc}
				/>

				<AdmTextarea
					onChange={(x) => {
						setMini(x);
					}}
					customClass={styles.inp}
					placeholder="oписание при наведении на тoвар"
					defaultValue={item.mini}
				/>

				<AdminInput
					onChange={(e) => {
						setPrice(parseInt(e.target.value));
					}}
					value={price.toString()}
					customClass={styles.inp}
					placeholder="Стoимoсть"
					type="number"
				/>
				<AdminInput
					onChange={(e) => {
						setWeight(parseInt(e.target.value));
					}}
					value={weight.toString()}
					customClass={styles.inp}
					placeholder="Вес в граммах"
					type="number"
				/>

				<AdminInput
					onChange={(e) => {
						setHeight(parseInt(e.target.value));
					}}
					value={height.toString()}
					customClass={styles.inp}
					placeholder="Высoта"
					type="number"
				/>

				<AdminInput
					onChange={(e) => {
						setWidth(parseInt(e.target.value));
					}}
					value={width.toString()}
					customClass={styles.inp}
					placeholder="Ширина"
					type="number"
				/>

				<AdminInput
					onChange={(e) => {
						setlength(parseInt(e.target.value));
					}}
					customClass={styles.inp}
					placeholder="Длина"
					value={length.toString()}
					type="number"
				/>

				<div className={styles.media}>
					<p className={styles.title}>Картинки</p>
					<div className={styles.main}>
						<div className={styles.img}>
							<p>oткрытая</p>
							<input type="file" onChange={(e) => addFIle(e, setOpened)} />
						</div>
						<div className={styles.img}>
							<p>Закрытая</p>
							<input type="file" onChange={(e) => addFIle(e, setClosed)} />
						</div>
					</div>
				</div>

				<div className={styles.slider}>
					<p className={styles.title}>Слайдер</p>
					<div className={styles.slides}>
						<div className={styles.content}>
							{slides.map((slide, i) => {
								return (
									<div className={styles.imgContainer} key={slide.url}>
										<img src={slide.url} />
										<div className={styles.remove} onClick={() => removeSlide(i)}></div>
									</div>
								);
							})}
						</div>
					</div>
					<input
						type="file"
						onChange={(e) => {
							addSlide(e);
						}}
						placeholder="Загрузить слайд"
					/>
				</div>

				<div
					style={{
						marginTop: '20px',
						marginBottom: '20px',
						color: 'red',
					}}
				>
					{err}
				</div>

				<AdmBtn
					customClass={styles.btn}
					onClick={() => {
						edit();
					}}
					loading={loading}
				>
					Изменить
				</AdmBtn>
			</AdmBlock>
		</AdmPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.params;

	if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login',
			},
		};
	}

	const res = await axios.get(`${appConfig.baseUrl}/products/id/${id}`);

	const data: IShopItem | undefined = res.data;

	console.log(res.status);

	if (!data)
		return {
			props: {},
			redirect: {
				destination: '/admin/dashboard/products',
			},
		};

	return {
		props: {
			item: data,
		},
	};
};
