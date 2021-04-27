import Head from 'next/head';
import { Fragment } from 'react';

interface HeadProps {
	title: string;
	desc: string;
	tags?: string;
}

export default function HeadData({ title, desc, tags }: HeadProps) {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.png" />
				<link href="/bootstrap.min.css" rel="stylesheet" type="text/css" />
				<meta name="description" content={desc} />
				<meta name="og:title" content={title} />
				<meta property="og:description" content={desc} />
				<meta property="og:site_name" content="Nipbox" />
				<meta property="og:image" content="https://nipbox.ru/img/bg/first.png" />
				<meta property="og:url" content="https://nipbox.ru/img/bg/first.png" />
				<meta property="og:locale" content="ru_RU" />
				<meta name="yandex-verification" content="e6784136f36e999d" />
				<div
				dangerouslySetInnerHTML={{
					__html: tags,
				}}
			></div>
				<script
					dangerouslySetInnerHTML={{
						__html: `/>${tags}  <script `,
					}}
				/> 
			</Head>
		</Fragment>
	);
}
