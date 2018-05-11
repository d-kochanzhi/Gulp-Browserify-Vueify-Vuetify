<template>
<div>
  <h2 class="comp-a">{{msg}}</h2>
  <span>{{fromStore}}</span>
</div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "Hello from component Home!"
    };
  },
  computed: {
    fromStore: function() {
      return this.$store.getters.msg;
    }
  }
};
</script>

<style scoped>
.comp-a {
  color: #affa00;
}
</style>