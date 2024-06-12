export const enum TodoStatus {
  Created = "CREATED",
  InProgress = "IN PROGRESS",
  Completed = "COMPLETED",
  Inactive = "INACTIVE"
}

export const enum TodoPriority{
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  VeryHigh = "VERY HIGH"
}

export type TodoRequest = {
  title: string,
  details?: string,
  priority?: TodoPriority
}
export type TodoUpdate = {status?: TodoStatus, priority?: TodoPriority, modifiedAt?: Date};

export type TodoDB =  {status: TodoStatus} & TodoRequest;

export type Todo = {
  id: string,
  createdAt: string,
  completedAt?: string,
  modifiedAt: string
} & TodoDB