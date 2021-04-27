import BlogEntity from 'src/entities/Blog.entity';
import FileService from '../file/file.service';
export default class BlogService {
    private fileService;
    constructor(fileService: FileService);
    create(createBlogDto: any, img: any): Promise<BlogEntity>;
    getAll(): Promise<BlogEntity[]>;
    getParent(): Promise<BlogEntity[]>;
    getById(id: string): Promise<BlogEntity>;
    getByGroupdId(id: string): Promise<BlogEntity[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    change(changeBlogDto: any, img: any, id: string): Promise<BlogEntity>;
}
