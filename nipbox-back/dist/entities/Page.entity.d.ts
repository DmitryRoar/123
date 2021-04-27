import { BaseEntity } from 'typeorm';
export declare class TextContent {
    blocks: {
        data: any;
        type: string;
    }[];
    time: number;
    version: string;
}
export default class PageEntity extends BaseEntity {
    id: string;
    url: string;
    content: TextContent;
    title: string;
    category: string;
    seoDesc: string;
    seoTags: string;
}
