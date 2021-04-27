import CreateVideoReviewDto from './create-video-review.dto';
declare const EditVideoReview_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVideoReviewDto>>;
export default class EditVideoReview extends EditVideoReview_base {
    id: string;
}
export {};
