import { TodoNotFoundError } from "../error.ts";
import TodoRepository from "../repository/TodoRepository.ts";
import { Todo, TodoDB } from "../types/index.ts";

export default class TodoService{
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository){
    this.todoRepository = todoRepository;
  }

  async create(todo: TodoDB): Promise<Todo>{
    try{
      console.log(`Creating todo '${todo.title}'`);
      return await this.todoRepository.insertOne(todo) as Todo;
    } catch(error){
      console.error(`Error while creating Todo '${todo.title}': ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Todo[]>{
    try{
      return await this.todoRepository.findAll() as Todo[];
    } catch(error){
      console.error(`Error while fetching Todos: ${error}`);
      throw error;
    }
  }

  async get(id: string): Promise<Todo>{
    try{
      const todo = await this.todoRepository.findById(id) as Todo;
      if (!todo){
        throw new TodoNotFoundError(id);
      }
      console.log(`Fetched todo: ${JSON.stringify(todo)}`);
      return todo;
      
    } catch(error){
      console.error(`Error while fetching Todo '${id}': ${error}`);
      throw error;
    }
  }

  // deno-lint-ignore no-explicit-any
  async update(id: string, newValues: any): Promise<Todo>{
    try{
      const todo =  await this.todoRepository.update(id, newValues) as Todo;
      if (!todo){
        throw new TodoNotFoundError(id);
      }
      return todo;
    } catch(error){
      console.error(`Error while updating Todo '${id}': ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void>{
    try {
      const todo = await this.todoRepository.delete(id);
      console.log(`Deleted todo: '${todo}'`);
      
      if (!todo || todo === ''){
        throw new TodoNotFoundError(id);
      }

    } catch (error) {
      console.error(`Error while deleting Todo '${id}': ${error}`);
      throw error;
    }
  }
}