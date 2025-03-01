import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';

import {BlogDto} from './blog.dto';
import {Blog, BlogDocument} from './blog.schema';

/* Mendifinisikan class untuk service ini dengan `@Injectable`
 * dan memanggil model yang sudah dibuat dari `blog.schema`
 */
@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly model: Model<BlogDocument>) {}

  // method untuk mencari semua data blogs
  async getBlogs(page: number, limit: number): Promise<BlogDocument[] | any> {
    try {
      const skip = (page - 1) * limit;
      const blogs = await this.model.find().skip(skip).limit(limit).exec();

      if (!blogs || !blogs.length)
        throw new NotFoundException({
          statusCode: 404,
          statusError: 'noDataFound',
          message: 'Tidak ada data blog di dalam database!'
        });

      const count: number = await this.model.countDocuments().exec();
      const pages: number = Math.ceil(count / limit);

      return {
        data: blogs,
        totalData: count,
        totalPages: pages
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Terjadi kesalahan pada server kami. Cobalah beberapa saat lagi!'
      );
    }
  }

  // method untuk mencari 1 data blog
  async getBlog(idOrSlug: string): Promise<BlogDocument | any> {
    try {
      // cek apakah param adalah `ObjectId` yang valid
      const isObjectId = mongoose.isValidObjectId(idOrSlug);
      const query: any = isObjectId ? {_id: idOrSlug} : {slug: idOrSlug};

      const blog = await this.model.find(query).exec();

      if (!blog)
        throw new NotFoundException({
          statusCode: 404,
          statusError: 'notFound',
          message: `Data dengan ID/Slug: "${idOrSlug}" tidak ditemukan!`
        });

      return blog;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Terjadi kesalahan pada server kami. Cobalah beberapa saat lagi!'
      );
    }
  }

  // method untuk menambahkan data blog baru ke database
  async createBlog(data: BlogDto): Promise<BlogDocument | any> {
    try {
      const createdBlog = await this.model.create(data);
      if (!createdBlog)
        throw new BadRequestException({
          statusCode: 400,
          statusError: 'failed',
          message: 'Gagal menambahkan data!'
        });

      return createdBlog;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Terjadi kesalahan pada server kami. Cobalah beberapa saat lagi!'
      );
    }
  }

  // method untuk memperbarui data blog yang sudah ada di database
  async updateBlog(blogId: string, data: BlogDto): Promise<BlogDocument | any> {
    try {
      const updatedBlog = await this.model.findByIdAndUpdate(blogId, data);
      if (!updatedBlog)
        throw new BadRequestException({
          statusCode: 400,
          statusError: 'failed',
          message: 'Gagal memperbarui data!'
        });

      return updatedBlog;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Terjadi kesalahan pada server kami. Cobalah beberapa saat lagi!'
      );
    }
  }

  // method untuk menghapus 1 data blog dari database
  async deleteBlog(blogId: string): Promise<any> {
    try {
      const deletedBlog = await this.model.findByIdAndDelete(blogId);
      if (!deletedBlog)
        throw new BadRequestException({
          statusCode: 400,
          statusError: 'failed',
          message: 'Gagal menghapus data!'
        });

      return {status: 'success', message: 'Data berhasil dihapus.'};
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Terjadi kesalahan pada server kami. Cobalah beberapa saat lagi!'
      );
    }
  }
}
