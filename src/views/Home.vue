<template>
  <div class="home" id="home">
    <v-container grid-list-xs>
      <Header />
      <Todos />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Todos from "@/components/Todos.vue";

@Component({
  components: {
    Header,
    Todos
  }
})
export default class Home extends Vue {}
</script>