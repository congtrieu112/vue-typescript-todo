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
          v-for="(todo, index) in todos"
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

@Component({
  components: {
    TodoItem
  },
  computed: {
    ...mapState({
      todos: "todos"
    })
  }
})
export default class Todos extends Vue {
  todos: any;
  newTodo: string = "";
  editedTodo: any = null;
  beforeEditCache: any = null;

  addTodo(): void {
    const value = this.newTodo && this.newTodo.trim();
    if (!value) {
      return;
    }

    this.todos.push({
      id: new Date().getTime(),
      title: value,
      complete: false
    });
    this.newTodo = "";
  }

  removeTodo(todo: any): void {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  editTodo(todo: any): void {
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  doneEdit(todo: any): void {
    this.editedTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
      this.removeTodo(todo);
    }
  }

  cancelEdit(todo: any): void {
    this.editedTodo = null;
    todo.title = this.beforeEditCache;
  }
}
</script>


