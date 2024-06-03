import { FreshContext, Handlers } from "$fresh/server.ts";
import { dbClient } from "../../../../db/client.ts";
import { TodoNotFoundError } from "../../../../error.ts";
import TodoRepository from "../../../../repository/TodoRepository.ts";
import TodoService from "../../../../service/TodoService.ts";
import { TodoUpdate } from "../../../../types/index.ts";

export const handler: Handlers<TodoUpdate | null> = {
  async GET(_req: Request, ctx: FreshContext) {
    const todoService = new TodoService(new TodoRepository(dbClient));
    
    const id = ctx.params.id;
    try {
      console.log(`Fetching todo '${id}'`);
      const todo = await todoService.get(id);
      return new Response(JSON.stringify(todo), {status: 200});
    } catch (error) {
      console.error(`Todo '${id}' could not be fetched: ${error}`);
      if (error instanceof TodoNotFoundError){
        return new Response(`Todo '${id}' not found`, {status: 404});
      }
      return new Response("Error while fetching todo", {status: 500});
    }
  },

  async PATCH(req: Request, ctx: FreshContext) {
    const todoService = new TodoService(new TodoRepository(dbClient));
    const id = ctx.params.id;
    const update = (await req.json()) as TodoUpdate;
    update.modifiedAt = new Date();
    console.log(`Updating todo ${id} with ${JSON.stringify(update)}`);
    try {
      const updatedTodo = await todoService.update(id, update);
      return new Response(JSON.stringify(updatedTodo), {status: 200})
    } catch (error) {
      console.error(`Error while updating todo '${id}': ${error}`);
      if (error instanceof TodoNotFoundError){
        return new Response(`Todo '${id}' not found`, {status: 404});
      }
      return new Response("Error while updating todo", {status: 500});
    }
  },

  async DELETE(_req: Request, ctx: FreshContext) {
    const todoService = new TodoService(new TodoRepository(dbClient));
    const id = ctx.params.id;

    try {
      await todoService.delete(id);
      return new Response(`Todo '${id}' successfully deleted`, {status: 200})
    } catch (error) {
      if (error instanceof TodoNotFoundError){
        return new Response(`Todo '${id}' not found`, {status: 404});
      }
      return new Response("Error while deleting todo", {status: 500});
    }
  }
}