import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { createpostDto } from './dto/createpost.dto';
import { updatepostDto } from './dto/updatepost.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorator';

@Controller('posts')
@UseGuards(AuthGuard('jwt'),RolesGuard) // 👈 حماية كل الراوتس
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() body: createpostDto) {
    return this.postService.create(body);
  }

  @Get()
  @Roles('admin') // 👈 حماية الراوت دي للادمن بس
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() update: updatepostDto
  ) {
    return this.postService.update(id, update);
  }
}
