"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const Blog_entity_1 = require("../../entities/Blog.entity");
const file_service_1 = require("../file/file.service");
let BlogService = class BlogService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async create(createBlogDto, img) {
        const blog = new Blog_entity_1.default();
        const { text, desc, url } = JSON.parse(createBlogDto.dto);
        if (text && desc && img) {
            blog.text = text.trim();
            blog.desc = desc.trim();
            blog.url = url;
            const id = uuid_1.v4();
            this.fileService.saveFile(`blog-${id}.png`, 'blog', img);
            blog.img = `blog-${id}.png`;
            await blog.save();
            if (createBlogDto.id) {
                blog.groupId = createBlogDto.id;
                blog.isChildren = true;
            }
            else {
                blog.isChildren = null;
                blog.groupId = blog.id;
            }
            await blog.save();
            return blog;
        }
        throw new common_1.ConflictException('Не все поля были переданны');
    }
    async getAll() {
        return await Blog_entity_1.default.find({
            order: {
                id: 'ASC'
            }
        });
    }
    async getParent() {
        return await Blog_entity_1.default.find({
            where: {
                isChildren: null
            }
        });
    }
    async getById(id) {
        return await Blog_entity_1.default.findOne({ id });
    }
    async getByGroupdId(id) {
        return await Blog_entity_1.default.find({
            where: {
                groupId: id
            }
        });
    }
    async remove(id) {
        return await Blog_entity_1.default.delete({
            id
        });
    }
    async change(changeBlogDto, img, id) {
        const candidate = await Blog_entity_1.default.findOne({
            where: {
                id
            }
        });
        const { text, desc, url } = JSON.parse(changeBlogDto.dto);
        if (text && desc) {
            candidate.text = text;
            candidate.desc = desc;
            candidate.url = url;
            if (img) {
                const id = uuid_1.v4();
                this.fileService.saveFile(`blog-${id}.png`, 'blog', img);
                candidate.img = `blog-${id}.png`;
            }
            await candidate.save();
            return candidate;
        }
        throw new common_1.ConflictException('Не все поля были переданны');
    }
};
BlogService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_service_1.default])
], BlogService);
exports.default = BlogService;
//# sourceMappingURL=blog.service.js.map