<template>
  <v-flex xs12 mb-2>
    <v-card light color="white">
      <div class="view">
        <v-layout row wrap>
          <v-flex xs8 pa-2>
            <span @dblclick="onEdit(todo)">{{todo.title}}</span>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn color="error" @click="onRemove(todo)">Delete</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div class="edit px-2">
        <v-text-field
          name="name"
          single-line
          autocomplete="off"
          v-model="todo.title"
          @keyup.esc="onCancelEdit(todo)"
          @keyup.enter="onDoneEdit(todo)"
          @blur="onDoneEdit(todo)"
        ></v-text-field>
        <!-- v-todo-focus="todo == editedTodo" -->
      </div>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export default class Todo extends Vue {
  @Prop() todo!: any;
  @Prop() onRemove!: void;
  @Prop() onEdit!: void;
  @Prop() onCancelEdit!: void;
  @Prop() onDoneEdit!: void;
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