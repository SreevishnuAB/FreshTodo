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
  priority: TodoPriority
}

export type Todo = {
  id: string,
  status: TodoStatus,
  createdAt: string,
  completedAt?: string,
  modifiedAt: string
} & TodoRequest