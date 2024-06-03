export class TodoNotFoundError extends Error{
  constructor(id: string){
    super(`Todo '${id}' not found`);
    this.name = "TodoNotFoundError";
  }
}