import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        todos: [
            { id: 0, title: "Item 1", completed: false },
            { id: 0, title: "Item 2", completed: false },
            { id: 0, title: "Item 3", completed: false },
            { id: 0, title: "Item 4", completed: false }
        ]
    }
})