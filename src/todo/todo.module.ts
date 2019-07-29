import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
