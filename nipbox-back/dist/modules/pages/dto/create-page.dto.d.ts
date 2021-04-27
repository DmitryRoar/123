import { TextContent } from '../../../entities/Page.entity';
export default class CreatePageDto {
    textContent: TextContent;
    title: string;
    url: string;
    category: string;
    seoDesc: string;
    seoTags: string;
}
