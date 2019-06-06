export interface ITodosState {
    todos: ITodo[]
}
export interface ITodo {
    id: number,
    title: string,
    completed: boolean
}