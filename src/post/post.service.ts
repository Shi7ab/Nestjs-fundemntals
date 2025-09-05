// post.service.ts
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { createpostDto } from './dto/createpost.dto';
import { updatepostDto } from './dto/updatepost.dto';

@Injectable()
export class PostService {
  constructor(private repo: PostRepository) {}

  create(data: createpostDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findOne(id);
  }

  update(id: string, data: updatepostDto) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
