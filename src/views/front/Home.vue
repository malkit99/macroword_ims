<template>
  <div>
    <h1>This is an home page</h1>
    <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
    <router-link :to="{name: 'login'}">Login</router-link>
  </div>
</template>
<script>
export default {
  name:"Home",
}
</script>