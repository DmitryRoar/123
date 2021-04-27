import CreatePageDto from './create-page.dto';
declare const EditPageDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePageDto>>;
export default class EditPageDto extends EditPageDto_base {
    id: string;
}
export {};
