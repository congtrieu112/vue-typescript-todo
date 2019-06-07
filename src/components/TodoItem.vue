<template>
  <v-flex xs12 mb-2 :class="{editing: todo == editedTodo}">
    <v-card light color="white">
      <div class="view">
        <v-layout row wrap>
          <v-flex xs8 pa-2>
            <router-link :to="{name: 'todoDetail', params: {id: todo.id}}">{{todo.title}}</router-link>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn color="info" @click="editTodo(todo)">Edit</v-btn>
            <v-btn color="error" @click="removeTodo(todo)">Delete</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div class="edit px-2">
        <v-text-field
          name="name"
          single-line
          autocomplete="off"
          v-todo-focus="todo == editedTodo"
          v-model="todo.title"
          @keyup.esc="cancelEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @blur="doneEdit(todo)"
        ></v-text-field>
      </div>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action, Mutation, namespace } from "vuex-class";
import { ITodo } from "@/typings";

const TodoMutation = namespace("TodoModule", Mutation)
const TodoAction = namespace("TodoModule", Action);

@Component({
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export default class TodoItem extends Vue {
  @Prop({ required: true }) todo: ITodo;

  @TodoMutation removeTodo;
  @TodoAction editTodoAction;

  public beforeEditCache: string = "";
  public editedTodo: ITodo = null;

  editTodo(todo) {
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  doneEdit(todo) {
    this.editedTodo = null;
    this.editTodoAction(todo);
  }

  cancelEdit(todo) {
    this.editedTodo = null;
    todo.title = this.beforeEditCache;
  }
}
</script>

<style lang="css" scoped>
.view {
  display: block;
}
.edit {
  display: none;
}
.editing .view {
  display: none;
}
.editing .edit {
  display: block;
}
</style>