import { ConflictException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import BlogEntity from 'src/entities/Blog.entity';
import FileService from '../file/file.service';

@Injectable()
export default class BlogService {

  constructor(
    private fileService: FileService
  ) {}

  async create(createBlogDto: any, img: any) {
    const blog = new BlogEntity()
    const {text, desc, url} = JSON.parse(createBlogDto.dto)

    if (text && desc && img) {
      blog.text = text.trim()
      blog.desc = desc.trim()
      blog.url = url

      const id = v4()
      this.fileService.saveFile(`blog-${id}.png`, 'blog', img)
      blog.img = `blog-${id}.png`

      await blog.save()

      if (createBlogDto.id) {
        blog.groupId = createBlogDto.id
        blog.isChildren = true
      } else {
        blog.isChildren = null
        blog.groupId = blog.id
        blog.order = '0'
      }

      await blog.save()
      return blog
    }
    throw new ConflictException('Не все поля были переданны')
  }

  async getAll() {
    return await BlogEntity.find({
      order: {
        id: 'ASC'
      }
    })
  }

  async getParent() {
    return await BlogEntity.find({
      where: {
        isChildren: null
      }
    })
  }

  async getById(id: string) {
    return await BlogEntity.findOne({id})
  }

  async changeOrder(changeOrderDto) {
    const parse = JSON.parse(changeOrderDto.dto)
    parse.forEach((i, idx) => {
			BlogEntity.update(
				{
					id: i.id,
				},
				{
					order: idx,
				}
			);
		});

		return true;
  }

  async move(moveBlogDto) {
    const parseDto = JSON.parse(moveBlogDto.dto)
    const candidate = await BlogEntity.findOne({where: {id: parseDto.id}})
    const num = Number(parseDto.order)
    candidate.order = (num + 1).toString()
    await candidate.save()
    return true
  }

  async getByGroupdId(id: string) {
    return await BlogEntity.find({
			where: {
        groupId: id
      },
      order: {
        order: 'ASC'
      }
		});
  }

  async remove(id: string) {
    return await BlogEntity.delete({
			id
		});
  }

  async change(changeBlogDto: any, img: any) {
    const candidate = await BlogEntity.findOne({
			where: {
				id: changeBlogDto.id
			}
		});
    const {text, desc, url} = JSON.parse(changeBlogDto.dto)
    if (text) {
      candidate.text = text
    }
    if (desc) {
      candidate.desc = desc
    }
    if (url) {
      candidate.url = url
    }

    if (img) {
      const id = v4()
      this.fileService.saveFile(`blog-${id}.png`, 'blog', img)
      candidate.img = `blog-${id}.png`
    }

    await candidate.save()
    return candidate
  }
}
