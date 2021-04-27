import {Body, Controller, Get, Param, Post, Patch, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import BlogService from './blog.service';
import CreateBlogDto from './dto/create-blog.dto';
import ChangeBlogDto from './dto/change-blog.dto';

@Controller('blog')
export default class BlogController {
  constructor(
    private blogService: BlogService
  ) {}

  @Get()
  getAll() {
    return this.blogService.getAll()
  }

  @Get('/get-parent')
  getParent() {
    return this.blogService.getParent()
  }

  @Get('/get-group/:id')
  getByGroupId(@Param('id') id: string) {
    return this.blogService.getByGroupdId(id)
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.blogService.getById(id)
  }

  @Post('/create')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() img) {
    return this.blogService.create(createBlogDto, img)
  }

  @Get('/remove/:id')
  // @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.blogService.remove(id)
  }

  @Patch('/change/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  changeBlog(@Body() changeBlogDto: ChangeBlogDto, @UploadedFile() img) {
    return this.blogService.change(changeBlogDto, img)
  }

  @Post('/change-order')
  moveBlog(@Body() changeOrderDto) {
    return this.blogService.changeOrder(changeOrderDto)
  }

  @Patch('/move')
  move(@Body() moveBlogDto) {
    return this.blogService.move(moveBlogDto)
  }
}
