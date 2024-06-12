// deno-lint-ignore-file no-explicit-any
import { eq } from "drizzle-orm";


export default class BaseRepository{
  db;
  objectType;
  constructor(db: any, objectType: any){
    this.db = db;
    this.objectType = objectType;
  }

  async findById(id: string){
    const todo = await this.db.select().from(this.objectType).where(eq(this.objectType.id, id));
    return todo[0];
  }

  async findAll(){
    return await this.db.select().from(this.objectType);
  }

  async insertOne(object: any){
    const newObject = await this.db.insert(this.objectType).values(object).returning();
    return newObject[0];
  }

  async insertMany(objects: any[]){
    return await this.db.insert(this.objectType).values(objects).returning();
  }

  async update(id: string, newValues: any){
   const updatedObj = await this.db.update(this.objectType).set(newValues).where(eq(this.objectType.id, id)).returning();
   return updatedObj[0];
  }

  async delete(id: string){
    const deletedTodo = await this.db.delete(this.objectType).where(eq(this.objectType.id, id)).returning();
    return deletedTodo[0];
  }
}