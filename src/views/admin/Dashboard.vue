<template>
  <div class="about">
    <h1>This is an dashboard</h1>
  </div>
</template>

<script>
export default {
  name:"dashboard",

  mounted() {
    this.$store.dispatch('user/me')
  },
}
</script>
