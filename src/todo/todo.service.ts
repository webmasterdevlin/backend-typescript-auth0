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
    return await this.todoRepository.find();
  }

  async selectById(id: string): Promise<TodoEntity> {
    return await this.todoRepository.findOne({ id });
  }

  async add(todoDto: CreateTodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save(todoDto);
  }

  async update(id: string, todoDto: CreateTodoDto): Promise<TodoEntity> {
    const todoToUpdate: TodoEntity = await this.todoRepository.findOne({
      id,
    });
    const updated: TodoEntity = Object.assign(todoToUpdate, todoDto);
    return await this.todoRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete({ id });
  }
}
