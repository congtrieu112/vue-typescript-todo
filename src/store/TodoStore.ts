import { GetterTree, Module, MutationTree, ActionTree } from 'vuex'
import { ITodosState, ITodo } from '@/typings'
import { RootState } from './index';

export const state: ITodosState = {
    todos: [
        { id: 0, title: "Item 1", completed: true },
        { id: 1, title: "Item 2", completed: true },
        { id: 2, title: "Item 3", completed: false },
        { id: 3, title: "Item 4", completed: false }
    ]
}

export const getters: GetterTree<ITodosState, RootState> = {
    all(state) {
        return state.todos;
    },
    active(state) {
        return state.todos.filter(todo => !todo.completed);
    },
    completed(state) {
        return state.todos.filter(todo => todo.completed);
    },
    filteredTodos(state, getters) {
        return getters['active'];
    }
}

export const mutations: MutationTree<ITodosState> = {
    addTodo(state, todo: ITodo) {
        state.todos.push(todo);
    },
    removeTodo(state, todo: ITodo) {
        state.todos.splice(state.todos.indexOf(todo), 1);
    },

    editTodo(state, todo) {
        todo = state.todos.find(item => todo.id == item.id);
        todo.title = todo.title.trim();
    }
}

export const actions: ActionTree<ITodosState, RootState> = {
    addTodoAction({ state, commit }, todoTitle: string) {
        let todo: ITodo = {
            id: new Date().getTime(),
            title: todoTitle,
            completed: false
        };

        commit('addTodo', todo);
    },

    editTodoAction({ state, commit }, todo) {
        commit('editTodo', todo);
        if (!todo.title) {
            commit('removeTodo', todo);
        }
    }
}

export const TodoModule: Module<ITodosState, RootState> = {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}