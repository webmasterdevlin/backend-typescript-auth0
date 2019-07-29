import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    console.log('get()');
    return await this.todoService.selectAllFromDb();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    const todo = await this.todoService.selectById(id);
    if (todo) {
      return todo;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Item Not Found',
        },
        404,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postTodo(@Body() todoDto: CreateTodoDto) {
    return await this.todoService.add(todoDto);
  }

  @Put(':id')
  async putTodo(@Param('id') id: string, @Body() todoDto: CreateTodoDto) {
    return await this.todoService.update(id, todoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.todoService.remove(id);
  }
}
