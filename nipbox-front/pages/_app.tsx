import '../styles/globals.css';
import '../styles/default.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/order.scss';
import '../styles/customEditor.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<div
				dangerouslySetInnerHTML={{
					__html: `<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",t.onload=function(){VK.Retargeting.Init("VK-RTRG-807710-7Ooe6"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-807710-7Ooe6" style="position:fixed; left:-999px;" alt=""/></noscript><script>window.onload= () => {window.VK = VK;}</script>`,
				}}
			></div>
			<Component {...pageProps} />
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


				{/* Человек с котом SEO */}
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
	m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
	
	ym(70423207, "init", {
	clickmap:true,
	trackLinks:true,
	accurateTrackBounce:true,
	ecommerce:"dataLayer"
	});`,
				}}
			/>
			<noscript>
				<div>
					<img
						src="https://mc.yandex.ru/watch/70423207"
						style={{
							position: 'absolute',
							left: '-9999px',
						}}
						alt=""
					/>
				</div>
			</noscript>
		</>
	);
}

export default MyApp;
