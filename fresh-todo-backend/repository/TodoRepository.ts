import { todos } from "../db/schema.ts";
import BaseRepository from "./BaseRepository.ts";

export default class TodoRepository extends BaseRepository{
  constructor(db){
    super(db, todos);
  }
}