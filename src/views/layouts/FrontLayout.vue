<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app right temporary>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.link">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3" dark>
    <v-toolbar-title class="d-flex , d-sm-none" >Macroword Online Learning </v-toolbar-title>    
    <v-avatar class="hidden-sm-and-down" >
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>
    <template>     
    <v-toolbar-items class="hidden-xs-only" v-for="item in items" :key="item.title">
    <v-btn text >
    <v-icon left >{{item.icon}}</v-icon>
        {{ item.text }}
    </v-btn>
    </v-toolbar-items>
    </template>
      <v-spacer />
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer color="primary" app>
      <v-spacer />

      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "FrontLayout",

  data: () => ({
    drawer: null,

    items: [
      { icon: "mdi-account-circle", text: "Dashboard", link: "" },
      { icon: "mdi-account-circle", text: "Manage Users", link: "" },
      { icon: "mdi-chevron-up", "icon-alt": "mdi-chevron-down", text: "Labels", model: true,
        children: [{ icon: "mdi-plus", text: "Create label" }]
      },
      { icon: "mdi-chevron-up", "icon-alt": "mdi-chevron-down", text: "Permission", model: true,
        children: [{ text: "Course", icon: "mdi-account-circle", link: "" }]
      }
    ]
  })
};
</script>