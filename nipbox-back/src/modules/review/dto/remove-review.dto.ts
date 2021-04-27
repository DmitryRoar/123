import { IsNotEmpty } from "class-validator";

export default class RemoveReviewDto {
    @IsNotEmpty()
    id: string;
}