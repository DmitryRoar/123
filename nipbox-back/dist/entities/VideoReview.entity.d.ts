import { BaseEntity } from 'typeorm';
export default class VideoReview extends BaseEntity {
    id: string;
    videoLink: string;
    text: string;
}
