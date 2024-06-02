
import { Handlers } from "$fresh/server.ts";
import prismaClient from "../../../../db/client.ts";

import { TodoRequest, TodoStatus } from "../../../../types/index.ts";



export const handler: Handlers<TodoRequest | null> = {
  async POST(_req: Request){
    const payload = (await _req.json()) as TodoRequest;
    console.log(`Request body: ${payload}`);
    const id = crypto.randomUUID();
    try{
      await prismaClient.todo.create({data: {
        id: id,
        title: payload.title,
        details: payload.details,
        priority: payload.priority,
        status: TodoStatus.Created
      }});
      console.log("Todo successfully created");
      
    }
    catch(error){
      console.error(`Error while inserting Todo: ${error}`);
      const errorMsg = JSON.stringify({"error": "Todo could not be created"});
      return new Response(errorMsg, {status: 500})
    }

    const headers = new Headers();
    headers.append("Location", `/todo/${id}`);
    try{
      const todo = await prismaClient.todo.findUnique({
        where: {
          id: id
        }
      });
      return new Response(JSON.stringify(todo), {status: 201, headers: headers})
    }
    catch(error){
      console.error(`Error while retrieving created todo: ${error}`);
      return new Response("Something went wrong", {status: 500, headers: headers});
    }
  },

  async GET(_req: Request){
    try{
      const todos = await prismaClient.todo.findMany()
      return new Response(JSON.stringify(todos), {status: 200});
    }
    catch(error){
      console.error(`Error while fetching todos: ${error}`);
      return new Response("Could not fetch todos", {status: 500});
    }
  }
}