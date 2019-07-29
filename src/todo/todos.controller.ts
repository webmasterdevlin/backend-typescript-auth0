import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    console.log('getTodos()');
    return await this.todoService.selectAllFromDb();
  }
}
