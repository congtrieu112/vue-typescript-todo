<template>
  <div>
    <h1 class="primary--text display-4">Todo list</h1>
    <v-text-field
      name="name"
      label="What needs to be done?"
      single-line
      autofocus
      autocomplete="off"
      v-model="newTodo"
      @keyup.enter="addTodo"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";

const TodoAction = namespace("TodoModule", Action);

@Component({})
export default class Header extends Vue {
  @TodoAction addTodoAction;
  public newTodo: string = "";

  addTodo() {
    if (this.newTodo.length) {
      this.addTodoAction(this.newTodo.trim());
      this.newTodo = "";
    }
  }
}
</script>