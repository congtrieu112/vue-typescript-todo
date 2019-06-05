import { GetterTree, Module, MutationTree, ActionTree } from 'vuex'
import { ITodosState, ITodo } from '@/typings'
import { RootState } from './index';

export const state: ITodosState = {
    todos: [
        { id: 0, title: "Item 1", completed: true },
        { id: 0, title: "Item 2", completed: true },
        { id: 0, title: "Item 3", completed: true },
        { id: 0, title: "Item 4", completed: false }
    ]
}

export const getters: GetterTree<ITodosState, RootState> = {
    all(state) {
        return state.todos;
    },
    activeTodo(state) {
        return state.todos.filter(todo => todo.completed);
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
    addTodo({ state, commit }, todoTitle: string) {
        let todo: ITodo = {
            id: new Date().getTime(),
            title: todoTitle,
            completed: false
        };

        commit('addTodo', todo);
    },

    removeTodo({ state, commit }, todo: ITodo) {
        commit('removeTodo', todo);
    },

    editTodo({ state, commit }, todo) {
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