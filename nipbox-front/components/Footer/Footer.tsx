import axios from 'axios';
import { useEffect, useState } from 'react';
import { appConfig } from '../../config';
import sanitizeFont from '../../utils/sanitizeFont';

export default function Footer() {
	const [pages, setPages] = useState<{ id: string, url: string; category: string; title: string }[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/pages/`).then((res) => setPages(res.data));
	}, []);

	return (
		<footer>
			<div className="container">
				<div className="row">
					<div className="hidden-xs col-sm-6 col-md-3">
						<p className="footerTitle">О нас</p>
						<p className="footerText">
							Каждый месяц мы отправляем удивительные боксы с японскими сладостями с разным составом
						</p>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<p className="footerTitle">Боксы</p>
						{pages
							.filter((x) => x.category === 'Боксы')
							.map((x) => {
								return (
									<a 
                    href={`/pages/${x.url}`} 
                    className="footerLink"
                    key={x.id}
                  >
										{sanitizeFont(x.title)}
									</a>
								);
							})}
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<p className="footerTitle">Информация</p>

						{pages
							.filter((x) => x.category === 'Информация')
							.map((x) => {
								return (
									<a 
                    href={`/pages/${x.url}`} 
                    className="footerLink"
                    key={x.id}
                  >
										{sanitizeFont(x.title)}
									</a>
								);
							})}
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<p className="footerTitle">Контакты</p>
						{/* <a href="tel:+7 800 000-00-00" className="footerLink">
							+7 800 000-00-00
						</a> */}
						<a href="https://vk.com/nipbox" target="_blank" className="footerLink">
							Группа ВК
						</a>
            <a href="https://instagram.com/nipbox.ru" target="_blank" className="footerLink">
							Инстаграм
						</a>
						{/* <a href="https://www.youtube.com" target="_blank" className="footerLink">
							Канал YouTube
						</a> */}
					</div>
					<div className="col-xs-12 tac">
						<img src="/img/logo.png" alt="nipbox" className="footerlogo hidden-xs" />
						<p className="copyright">©2013-2021 все права защищены</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
