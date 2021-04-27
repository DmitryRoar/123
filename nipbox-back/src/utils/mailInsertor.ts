import PurchaseEntity from '../entities/Purchase.entity';

export default function mailInsertor(order: PurchaseEntity) {
	return `<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
    <tbody>
    <tr>
    <td align="center" valign="top">
    <div id="m_-676169492179236060template_header_image_mr_css_attr_mr_css_attr">
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="600"
    id="m_-676169492179236060template_container_mr_css_attr_mr_css_attr"
    style="background-color:#ffffff;border:1px solid #e5dce2;border-radius:3px">
    <tbody>
    <tr>
    <td align="center" valign="top">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%"
    id="m_-676169492179236060template_header_mr_css_attr_mr_css_attr"
    style="background-color:#f97fb8;color:#202020;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0 0">
    <tbody>
    <tr>
    <td id="m_-676169492179236060header_wrapper_mr_css_attr_mr_css_attr"
    style="padding:36px 48px;display:block">
    <h1
    style="font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#202020">
    Заказ: № ${order.id} (${new Date(order.created_at).toLocaleString()})</h1>
    </td>
    </tr>
    </tbody>
    </table>
    
    </td>
    </tr>
    <tr>
    <td align="center" valign="top">
    
    <table border="0" cellpadding="0" cellspacing="0" width="600"
    id="m_-676169492179236060template_body_mr_css_attr_mr_css_attr">
    <tbody>
    <tr>
    <td valign="top"
    id="m_-676169492179236060body_content_mr_css_attr_mr_css_attr"
    style="background-color:#ffffff">
    
    <table border="0" cellpadding="20" cellspacing="0" width="100%">
    <tbody>
    <tr>
    <td valign="top" style="padding:48px 48px 32px">
    <div id="m_-676169492179236060body_content_inner_mr_css_attr_mr_css_attr"
    style="color:#636363;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left">
    
    <p style="margin:0 0 16px">Спасибо за заказ!</p>
    
    <h2
    style="color:#f97fb8;display:block;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">

    
    <div style="margin-bottom:40px">
    <table cellspacing="0" cellpadding="6"
    border="1"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;width:100%;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
    
    <tbody>
    <tr>
    <th scope="col"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Товар</th>
    <th scope="col"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Количество</th>
    <th scope="col"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Цена</th>
    </tr>
    
    </tbody>
    <tbody>
    ${order.items
		.map((x) => {
			return `<tr> <td
    style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;word-wrap:break-word">
    ${x.item.name}</td>
    <td
    style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
    ${x.amount}</td>
    <td
    style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
    <span>${x.item.price}
    руб.</span></td>
    </tr>`;
		})
		.join('')}
     
    </tbody>
    
    <tbody>
    <tr>
    <th scope="row" colspan="2"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px">
    Подытог:</th>
    <td
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left;border-top-width:4px">
    <span>${order.items.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0)}&nbsp;<span>
    руб.</span></span></td>
    </tr>
    <tr>
    <th scope="row" colspan="2"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Доставка:</th>
    <td
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    <span>${order.deliverySum}&nbsp;<span>
    руб.</span></span>&nbsp;<small>(${order.deliveryType})</small>
    </td>
    </tr>
    <tr>
    <th scope="row" colspan="2"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Метод оплаты:</th>
    <td
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Яндекс.Касса (банковские карты,
    электронные деньги и другое)
    </td>
    </tr>
    <tr>
    <th scope="row" colspan="2"
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    Всего:</th>
    <td
    style="color:#636363;border:1px solid #e5e5e5;vertical-align:middle;padding:12px;text-align:left">
    <span>${order.sum}&nbsp;<span>
    руб.</span></span></td>
    </tr>
    
    </tbody>
    </table>
    </div>
    
    <div
    style="display:none;font-size:0;max-height:0;line-height:0;padding:0">
    </div>
    <table
    id="m_-676169492179236060addresses_mr_css_attr_mr_css_attr"
    cellspacing="0" cellpadding="0" border="0"
    style="width:100%;vertical-align:top;margin-bottom:40px;padding:0">
    <tbody>
    <tr>
    
    <td valign="top" width="50%"
    style="text-align:left;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;padding:0">
    <h2
    style="color:#f97fb8;display:block;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
    Адрес доставки</h2>
    
    ${order.name}<br>${order.adress}<br>${order.index}
    </td>
    </tr>
    </tbody>
    </table>
    <p style="margin:0 0 16px">Спасибо за покупку.
    </p>
    </div>
    </td>
    </tr>
    </tbody>
    </table>
    
    </td>
    </tr>
    </tbody>
    </table>
    
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr>
    <td align="center" valign="top">
    
    <table border="0" cellpadding="10" cellspacing="0" width="600"
    id="m_-676169492179236060template_footer_mr_css_attr_mr_css_attr">
    <tbody>
    <tr>
    <td valign="top" style="padding:0;border-radius:6px">
    <table border="0" cellpadding="10" cellspacing="0" width="100%">
    <tbody>
    <tr>
    <td colspan="2" valign="middle"
    id="m_-676169492179236060credit_mr_css_attr_mr_css_attr"
    style="border-radius:6px;border:0;color:#8a8a8a;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:12px;line-height:150%;text-align:center;padding:24px 0">
    <p style="margin:0 0 16px">NipBox<br>2021 ©</p>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    
    </td>
    </tr>
    </tbody>
    </table>`;
}
