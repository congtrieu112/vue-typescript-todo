<template>
  <v-container grid-list-xs>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ $route.params.id }}. Kangaroo Valley Safari</h3>
              <div>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <router-link to="/" tag="v-btn">
                <v-btn flat color="orange">Go Back</v-btn>
            </router-link>
            <router-link to="/" tag="v-btn">
                <v-btn flat color="orange">Delete</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
