import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CategorieModule } from './categorie/categorie.module';

@Module({
  imports: [AuthModule, PostModule, CategorieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
