<template>
<div>
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

    <v-app-bar  color="blue darken-3" dark>
    <v-toolbar-title class="d-flex , d-sm-none" >Macroword Online Learning </v-toolbar-title>    
    <template>     
  <v-toolbar-items class="hidden-xs-only" v-for="(item , i) in items" :key="i">
   <v-menu open-on-hover  offset-y  :close-on-content-click="false" :nudge-width="200">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" :to="item.link">
          {{item.text}}
        </v-btn>
      </template>
        <v-card>
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            append-icon
          >
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.link">
              <v-list-item-action v-if="child.icon">
                <v-icon color="success">{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="red--text">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-card>
    </v-menu>
    </v-toolbar-items>
    </template>
      <v-spacer />
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer" />
    </v-app-bar>
</div>
</template>
<script>
export default {
    name:"NavHeader",
      data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "Home", link: "/" },
      { icon: "mdi-account-circle", text: "About", link: "about-home" },
      { icon: "mdi-chevron-up", "icon-alt": "mdi-chevron-down", text: "Programme", model: true,
        children: [{ icon: "mdi-plus", text: "Courses" , link: "programme"}]
      },
      { icon: "mdi-chevron-up", text: "Contact" , link: "contact-us"},
      { icon: "mdi-login", text: "Login" , link: "/login"}
    ]
  })
}
</script>