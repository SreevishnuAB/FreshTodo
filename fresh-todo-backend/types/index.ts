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

export type Todo = {
  id: string,
  title: string,
  details?: string,
  priority: TodoPriority,
  status: TodoStatus,
  createdAt: number,
  completedAt?: number
}