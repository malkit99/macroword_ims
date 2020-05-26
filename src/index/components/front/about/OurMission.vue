<template>
    <v-container fluid>
        <v-row
        align="center"
        justify="center"
        >
            <h1 >Our Mission</h1>
        </v-row>
        <v-row>
        <template>
  <v-card>
    <v-toolbar flat>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="pink"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            href="#mobile-tabs-5-1"
            class="primary--text"
          >
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab
            href="#mobile-tabs-5-2"
            class="primary--text"
          >
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab
            href="#mobile-tabs-5-3"
            class="primary--text"
          >
            <v-icon>mdi-account-box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'mobile-tabs-5-' + i"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:'OurMission',
      data () {
      return {
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
}
</script>