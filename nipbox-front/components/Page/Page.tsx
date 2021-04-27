import { Fragment, useEffect } from 'react';
import { store, StoreContext } from '../../store/store';
import Footer from '../Footer/Footer';
import HeadData from '../HeadData/HeadData';
import Header from '../Header/Header';

interface PageProps {
	title?: string;
	tags?: string;
	desc?: string;
	children: React.ReactNode;
}

export default function Page({ title = 'nipbox - Главная', desc = 'nipbox', tags,children }: PageProps) {
	useEffect(() => {
		if (window) {
			const link = document.referrer;
			if (!link.includes('nipbox.ml') && !link.includes('nipbox.ru')) {
				localStorage.setItem('trafic_source', link);
			}
		}
	}, []);

	return (
		<StoreContext.Provider value={store}>
			<HeadData tags={tags} title={title} desc={desc} />
			<div
				dangerouslySetInnerHTML={{
					__html: `<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",t.onload=function(){VK.Retargeting.Init("VK-RTRG-807710-7Ooe6"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-807710-7Ooe6" style="position:fixed; left:-999px;" alt=""/></noscript><script>window.onload= () => {window.VK = VK;}</script>`,
				}}
			></div>
			<Header />

			{children}

			<Footer />
			<div
				dangerouslySetInnerHTML={{
					__html: `<script type="text/javascript" src="https://vk.com/js/api/openapi.js?168"></script>

					<!— VK Widget —>
					<div id="vk_community_messages"></div>
					<script type="text/javascript">
					VK.Widgets.CommunityMessages("vk_community_messages", 72383889, {tooltipButtonText: "Ответим на любые вопросы :)"});
					</script>`,
				}}
			></div>
			<div
				dangerouslySetInnerHTML={{
					__html: `<!— Yandex.Metrika counter —>
				<script type="text/javascript" >
				(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
				m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
				(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
				
				ym(72582790, "init", {
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true,
				webvisor:true,
				ecommerce:"dataLayer"
				});
				</script>
				<noscript><div><img src="https://mc.yandex.ru/watch/72582790" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
				<!— /Yandex.Metrika counter —>`,
				}}
			></div>
		</StoreContext.Provider>
	);
}
