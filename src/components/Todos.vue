<template>
  <div class="home" id="home">
    <v-container grid-list-xs>
      <h1 class="primary--text display-4">Todo list</h1>
      <v-text-field
        name="name"
        label="What needs to be done?"
        single-line
        autocomplete="off"
        v-model="newTodo"
        @keyup.enter="addTodo"
      ></v-text-field>
      <v-layout row wrap>
        <TodoItem
          v-for="(todo, index) in activeTodos"
          :key="index"
          :class="{editing: todo == editedTodo}"
          :todo="todo"
          :onRemove="removeTodo"
          :onEdit="editTodo"
          :onCancelEdit="cancelEdit"
          :onDoneEdit="doneEdit"
        />
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "@/components/TodoItem.vue";
import { mapState } from "vuex";
import { store } from "../store";

@Component({
  components: {
    TodoItem
  },
  computed: {
    ...mapState({
      todos: "todos"
    }),
    activeTodos() {
      return this.$store.getters.activeTodos;
    }
  }
})
export default class Todos extends Vue {
  todos: any;
  newTodo: string = "";
  editedTodo: any = null;
  beforeEditCache: any = null;

  addTodo(): void {
    if (this.newTodo.length) {
      this.$store.dispatch("addTodo", this.newTodo.trim());
      this.newTodo = "";
    }
  }

  removeTodo(todo: any): void {
    this.$store.dispatch("removeTodo", todo);
  }

  editTodo(todo: any): void {
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  doneEdit(todo: any): void {
    this.editedTodo = null;
    this.$store.dispatch("editTodo", todo);
  }

  cancelEdit(todo: any): void {
    this.editedTodo = null;
    todo.title = this.beforeEditCache;
  }
}
</script>


