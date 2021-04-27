import PageEntity from '../../entities/Page.entity';
import CreatePageDto from './dto/create-page.dto';
import EditPageDto from './dto/edit-page.dto';
export default class PagesService {
    create(dto: CreatePageDto): Promise<PageEntity>;
    edit(dto: EditPageDto): Promise<PageEntity>;
    find(): Promise<PageEntity[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getCategories(): Promise<string[]>;
    getByUrl(url: string): Promise<PageEntity>;
}
