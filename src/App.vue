<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <sign></sign>
    <!-- <index></index> -->
  </div>
</template>

<script>
import sign from './components/sign.vue'
// import index from './components/index.vue'

export default {
  name: 'App',
  components: {
    sign,
    // index
  }
}
</script>

<style>
html,body,p,div,ul,input,img{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
input{
  outline: none;
}
button{
  border: none;
  outline: none;
}
a{
  color: black;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
