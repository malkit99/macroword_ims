<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.link"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Google Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
  <div class="text-center">
    <v-menu offset-y :nudge-width="200" >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
       <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout" v-if="authetincated">
          <v-list-item-title>Logout</v-list-item-title>
           <v-btn icon > <v-icon>mdi-bell</v-icon></v-btn>
        </v-list-item>

        <v-list-item @click="">
          <v-list-item-title>Profile</v-list-item-title>
          <v-btn icon > <v-icon>mdi-bell</v-icon></v-btn>
        </v-list-item>

           <v-list-item @click="" >
          <v-list-item-title>Profile</v-list-item-title>
           <v-btn icon > <v-icon>mdi-bell</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    </v-app-bar>
    <v-content>
      <v-container
       
        fluid
      >
        <v-row align="center" justify="center">
      <v-col>
      <router-view></router-view>
      </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import {mapGetters , mapActions } from 'vuex'
  export default {
    name: 'AdminDashboard',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'mdi-account-circle', text: 'Dashboard' , link:'/admin-dashboard'},
        { icon: 'mdi-account-circle', text: 'Manage Users'},

         { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-chevron-down', text: 'Manage Test', model: true,
          children: [
            { icon: 'mdi-plus', text: 'All Enquery ', link:'/test'},
          ],
        },
      
      ],

    }),

  computed: {
    ...mapGetters({
      authetincated:'auth/adminAuthencated',
    }),
  },

  methods: {
    ...mapActions({
        loggedOut:'auth/loggedOut',
        addNotification:'application/addNotification',
    }),

    logout(){
      this.loggedOut()
      .then(()=>{
        this.$router.push({name:'center-login'});
         this.addNotification({
            show: true,
            text : 'You are successfully Logout'
        })
      })
      .catch(()=>{
           this.addNotification({
              show: true,
              text : 'Something went wrong '
          })
      })
    },
  },
    
  }
</script>


