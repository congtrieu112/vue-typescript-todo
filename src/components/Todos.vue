<template>
  <v-layout row wrap v-show="TodoState.todos.length">
    <TodoItem v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"/>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "@/components/TodoItem.vue";
import { State, Getter, namespace } from "vuex-class";
import { mapState } from "vuex";
import { store } from "@/store/index.ts";

const TodoGetter = namespace("TodoModule", Getter);

@Component({
  components: {
    TodoItem
  }
})
export default class Todos extends Vue {
  @State("TodoModule") TodoState;
  @TodoGetter filteredTodos;
}
</script>


