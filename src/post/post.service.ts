import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllPost(){
    try {
      const post = await this.prismaService.post.findMany()
      return post
    } catch (error) {
        throw new Error(error)
    }
  }
  async getPostById(id: string){
    try {
      const postExist = await this.prismaService.post.findUnique({
        where: {
          id,
        },
      });
      if (!postExist) {
        throw new NotFoundException('Post not found');
      }
      return postExist;
    } catch (error) {
      return new Error(error);
    }
  }
  async createPost(data: CreatePostDto){
    try {
      const isExistingPost = await this.prismaService.post.findFirst({
        where:{
          title:data.title,
          content:data.content,
          author:data.author
        }
      })
      if(isExistingPost){
        throw new ConflictException('Post exist')
      }
      const post = await this.prismaService.post.create({
        data,
      })
      return post
    } catch (error) {
      return new Error(error)
    } 
  }
  async updatePost(id: string, data: UpdatePostDto){
    try {
      const postExist = await this.prismaService.post.findUnique({
        where: {
          id,
        },
      });
      if (!postExist) {
        throw new NotFoundException('Post not found');
      }
      const post = await this.prismaService.post.update({
        where: {
          id,
        },
        data,
      })
      return post
    } catch (error) {
      return new Error(error)
    }
  } 
  async deletePost(id: string) {
    try {
      const postExist = await this.prismaService.post.findUnique({
        where: {
          id,
        },
      });
      if (!postExist) {
        throw new NotFoundException('Post not found');
      }
      const post = await this.prismaService.post.delete({
        where: {
          id,
        },
      })
      return post
    } catch (error) {
      return new Error(error)
    }
  }
}
