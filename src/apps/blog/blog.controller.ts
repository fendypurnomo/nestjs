import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import {Response} from 'express';

import {BlogDto} from './blog.dto';
import {Blog, BlogDocument} from './blog.schema';
import {BlogService} from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @Get()
  async getBlogs(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Res() res: Response
  ): Promise<BlogDocument[] | any> {
    page = page || 1;
    perPage = perPage || 10;

    const blogs = await this.service.getBlogs(page, perPage);
    return res.status(HttpStatus.OK).json(blogs);
  }

  @Get(':param')
  async getBlog(
    @Param('param') param: string,
    @Res() res: Response
  ): Promise<Blog | any> {
    const blog = await this.service.getBlog(param);
    return res.status(HttpStatus.OK).json({data: blog});
  }

  @Post()
  async createBlog(@Body() data: BlogDto, @Res() res: Response): Promise<Blog | any> {
    const createBlog = await this.service.createBlog(data);
    return res.status(HttpStatus.CREATED).json({data: createBlog});
  }

  @Put(':id')
  async updateBlog(
    @Body() data: BlogDto,
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Blog | any> {
    const updateBlog = await this.service.updateBlog(id, data);
    return res.status(HttpStatus.OK).json({data: updateBlog});
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const deleteBlog = await this.service.deleteBlog(id);
    return res.status(HttpStatus.OK).json({deleteBlog});
  }
}
