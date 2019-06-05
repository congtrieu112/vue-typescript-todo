import Vue from 'vue'
import Vuex from 'vuex'

import { ITodosState } from '@/typings'
import { TodoModule } from './TodoStore'

Vue.use(Vuex);

export interface RootState {
    LoginModule: ITodosState
}

export const store = new Vuex.Store({
    modules: {
        TodoModule
    }
})