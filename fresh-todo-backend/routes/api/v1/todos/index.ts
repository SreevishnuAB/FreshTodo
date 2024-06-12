
import { Handlers } from "$fresh/server.ts";
import { dbClient } from "../../../../db/client.ts";
import TodoRepository from "../../../../repository/TodoRepository.ts";
import TodoService from "../../../../service/TodoService.ts";

import { TodoDB, TodoPriority, TodoRequest, TodoStatus } from "../../../../types/index.ts"; 

export const handler: Handlers<TodoRequest | null> = {
  async POST(_req: Request){
    const todoService = new TodoService(new TodoRepository(dbClient));

    const payload = (await _req.json()) as TodoRequest;
    if (!payload.priority){
      payload.priority = TodoPriority.Medium;
    }
    const newItem = {...payload, status: TodoStatus.Created} as TodoDB;
    
    try{
      const createdTodo = await todoService.create(newItem);
      console.log(`Todo successfully created: ${JSON.stringify(createdTodo)}`);
      const headers = new Headers();
      headers.append("Location", `/todo/${createdTodo.id}`);
      return new Response(JSON.stringify(createdTodo), {status: 201, headers: headers})
    }
    catch(error){
      console.error(`Error while inserting Todo: ${error}`);
      const errorMsg = JSON.stringify({"error": "Todo could not be created"});
      return new Response(errorMsg, {status: 500})
    }
  },

  async GET(_req: Request){
    const todoService = new TodoService(new TodoRepository(dbClient));
    try{
      const todos = await todoService.getAll();
      return new Response(JSON.stringify(todos), {status: 200});
    }
    catch(error){
      console.error(`Error while fetching todos: ${error}`);
      return new Response("Could not fetch todos", {status: 500});
    }
  }
}