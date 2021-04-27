import CreatePageDto from './dto/create-page.dto';
import EditPageDto from './dto/edit-page.dto';
import PagesService from './pages.service';
export default class PagesController {
    private pageService;
    constructor(pageService: PagesService);
    getCategories(): Promise<string[]>;
    edit(dto: EditPageDto): Promise<import("../../entities/Page.entity").default>;
    create(dto: CreatePageDto): Promise<import("../../entities/Page.entity").default>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getAll(): Promise<import("../../entities/Page.entity").default[]>;
    getByUrl(url: string): Promise<import("../../entities/Page.entity").default>;
}
