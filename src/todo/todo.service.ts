import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async selectAllFromDb(): Promise<TodoEntity[]> {
    try {
      const result = await this.todoRepository.find();
      console.log('RESULT: ', result);
      return result;
    } catch (e) {
      throw e.message;
    }
  }
}
