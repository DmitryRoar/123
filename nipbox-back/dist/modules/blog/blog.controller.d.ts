import BlogService from './blog.service';
import CreateBlogDto from './dto/create-blog.dto';
import ChangeBlogDto from './dto/change-blog.dto';
export default class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    getAll(): Promise<import("../../entities/Blog.entity").default[]>;
    getParent(): Promise<import("../../entities/Blog.entity").default[]>;
    getByGroupId(id: string): Promise<import("../../entities/Blog.entity").default[]>;
    getById(id: string): Promise<import("../../entities/Blog.entity").default>;
    create(createBlogDto: CreateBlogDto, img: any): Promise<import("../../entities/Blog.entity").default>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    changeBlog(changeBlogDto: ChangeBlogDto, img: any): Promise<import("../../entities/Blog.entity").default>;
    moveBlog(changeOrderDto: any): Promise<boolean>;
    move(moveBlogDto: any): Promise<boolean>;
}
