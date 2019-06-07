import { GetterTree, Module, MutationTree, ActionTree } from 'vuex'
import { ITodosState, ITodo } from '@/typings'
import { RootState } from './index';
import axios from 'axios';

export const state: ITodosState = {
    todos: []
}

export const getters: GetterTree<ITodosState, RootState> = {
    all(state) {
        return state.todos.reverse();
    },
    active(state) {
        return state.todos.reverse().filter(todo => !todo.completed);
    },
    completed(state) {
        return state.todos.reverse().filter(todo => todo.completed);
    },
    filteredTodos(state, getters) {
        return getters['all'];
    }
}

export const mutations: MutationTree<ITodosState> = {
    SET_TODOS(state, todos: ITodo[]) {
        state.todos = todos
    },
    ADD_TODO(state, todo: ITodo) {
        state.todos.push(todo);
    },
    REMOVE_TODO(state, todo: ITodo) {
        state.todos.splice(state.todos.indexOf(todo), 1);
    },
    EDIT_TODO(state, todo) {
        todo = state.todos.find(item => todo.id == item.id);
        todo.title = todo.title.trim();
    }
}

export const actions: ActionTree<ITodosState, RootState> = {
    loadTodos({commit}) {
        axios
            .get('http://localhost:3000/todos')
            .then(r => r.data)
            .then(todos => {
                commit('SET_TODOS', todos)
            });
    },
    addTodoAction({ state, commit }, todoTitle: string) {
        let todo: ITodo = {
            id: new Date().getTime(),
            title: todoTitle,
            description: 'Tempore dolor cum rerum placeat nam facilis sed. Cupiditate quae accusamus est. Dolores quos delectus libero ad ipsa.',
            completed: false
        };

        axios
            .post('http://localhost:3000/todos', todo)
            .then(_ => {
                commit('ADD_TODO', todo);
            });
    },

    editTodoAction({ state, commit }, todo) {
        axios
            .put(`http://localhost:3000/todos/${todo.id}`, todo)
            .then(_ => {
                commit('EDIT_TODO', todo);
            });

        if (!todo.title) {
            commit('REMOVE_TODO', todo);
        }
    },

    removeTodoAction({commit}, todo) {
        axios
            .delete(`http://localhost:3000/todos/${todo.id}`)
            .then(_ => {
                commit('REMOVE_TODO', todo);
            });
    }
}

export const TodoModule: Module<ITodosState, RootState> = {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}