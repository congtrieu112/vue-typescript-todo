import { GetterTree, Module, MutationTree, ActionTree } from 'vuex'
import { ITodosState, ITodo } from '@/typings'
import { RootState } from './index';
import axios from 'axios';

export const state: ITodosState = {
    todos: []
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
        return getters['all'];
    }
}

export const mutations: MutationTree<ITodosState> = {
    setTodos(state, todos: ITodo[]) {
        state.todos = todos
    },
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
    loadTodos({commit}) {
        axios
            .get('http://localhost:3000/todos')
            .then(r => r.data)
            .then(todos => {
                commit('setTodos', todos)
            });
    },
    addTodoAction({ state, commit }, todoTitle: string) {
        let todo: ITodo = {
            id: new Date().getTime(),
            title: todoTitle,
            completed: false
        };

        axios
            .post('http://localhost:3000/todos', todo)
            .then(_ => {
                commit('addTodo', todo);
            });
    },

    editTodoAction({ state, commit }, todo) {
        axios
            .put(`http://localhost:3000/todos/${todo.id}`, todo)
            .then(_ => {
                commit('editTodo', todo);
            });

        if (!todo.title) {
            commit('removeTodo', todo);
        }
    },

    removeTodoAction({commit}, todo) {
        axios
            .delete(`http://localhost:3000/todos/${todo.id}`)
            .then(_ => {
                commit('removeTodo', todo);
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