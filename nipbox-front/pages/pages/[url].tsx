import axios from 'axios';
import { GetServerSideProps } from 'next';
import Page from '../../components/Page/Page';
import { appConfig } from '../../config';
import sanitizeFont from '../../utils/sanitizeFont';

export default function InfoPage({
	item,
}: {
	item: {
		id: string;

		url: string;

		content: {
			blocks: {
				data: any;
				type: string;
			}[];
			time: number;
			version: string;
		};

		title: string;

		category: string;
	};
}) {
	return (
		<Page title={item.title}>
			<section id="pageText">
				<div className="pContent">
					{item.content.blocks.map((b) => {
						switch (b.type) {
							case 'simpleImage':
								return <img src={b.data.url} alt="" />;
							case 'header':
								return <h2>{sanitizeFont(b.data.text)}</h2>;
							case 'paragraph':
								return <p dangerouslySetInnerHTML={{ __html: sanitizeFont(b.data.text) }}></p>;
							case 'list':
								return (
									<ul>
										{b.data.items.map((item) => {
											return <li dangerouslySetInnerHTML={{ __html: sanitizeFont(item) }}></li>;
										})}
									</ul>
								);
							case 'delimiter':
								return (
									<br/>
								)
						}
					})}
				</div>
			</section>
		</Page>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { url } = context.params;

	try {
		const res = await axios.get(`${appConfig.baseUrl}/pages/url/${url}`);

		return {
			props: {
				item: res.data,
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
