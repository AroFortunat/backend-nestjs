import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('all')
  showAllPost() {
    return this.postService.getAllPost();
  }
  @Get('/:slug')
  showPostById(@Param('slug') slug: string) {
    return this.postService.getPostById(slug);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() data: CreatePostDto) {
    return this.postService.createPost(data);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.updatePost(id, data);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
