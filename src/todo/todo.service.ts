import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';

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

  async selectById(id: string): Promise<TodoEntity> {
    try {
      return await this.todoRepository.findOne({ id });
    } catch (e) {
      throw e.message;
    }
  }

  async add(todoDto: any): Promise<TodoEntity> {
    try {
      return await this.todoRepository.save(todoDto);
    } catch (e) {
      throw e.message;
    }
  }

  async update(id: string, todoDto: CreateTodoDto): Promise<TodoEntity> {
    try {
      const todoToUpdate: TodoEntity = await this.todoRepository.findOne({
        id,
      });
      const updated: TodoEntity = Object.assign(todoToUpdate, todoDto);
      return await this.todoRepository.save(updated);
    } catch (e) {
      throw e.message;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.todoRepository.delete({ id });
    } catch (e) {
      throw e.message;
    }
  }
}
