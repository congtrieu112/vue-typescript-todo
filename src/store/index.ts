import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: [
            { id: 0, title: "Item 1", completed: true },
            { id: 0, title: "Item 2", completed: true },
            { id: 0, title: "Item 3", completed: false },
            { id: 0, title: "Item 4", completed: false }
        ]
    },

    getters: {
        activeTodos: state => {
            return state.todos.filter((todo: any) => {
                return !todo.completed;
            });
        }
    },

    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        removeTodo(state, todo) {
            state.todos.splice(state.todos.indexOf(todo), 1);
        },

        editTodo(state, todo) {
            todo = state.todos.find(item => todo.id == item.id);
            todo.title = todo.title.trim();
        }
    },

    actions: {
        addTodo({ state, commit }, todoTitle) {
            let todo = {
                id: new Date().getTime(),
                title: todoTitle,
                completed: false
            };

            commit('addTodo', todo);
        },

        removeTodo({ state, commit }, todo) {
            commit('removeTodo', todo);
        },

        editTodo({ state, commit }, todo) {
            commit('editTodo', todo);
            if (!todo.title) {
                commit('removeTodo', todo);
            }
        }
    }
})