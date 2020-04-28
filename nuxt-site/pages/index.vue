<template>
  <div class="container">
    <div>
      <logo />
      <!-- Nova component starts -->
      <nova name="Example" :data="{ title: 'Ara Framework' }" />
        <nova name="Example-Vue" :data="{ title: 'two Ara Framework' }" />
      <!-- Nova component ends -->
      <h1 class="title">app-shell</h1>
      <h2 class="subtitle">NuxtJS based App Shell</h2>
      <input v-model="message" placeholder="edit me" v-on:keyup="changeHandler" />
      <p>Message is: {{ message }}</p>
     
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nova from 'nova-vue-bridge'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo,
    Nova
  },
  head: {
    script: [
      { src: 'http://localhost:3000/public/client.js' },
      { src: 'http://localhost:3001/public/client.js' }
    ]
  },
  data: function() {
    return {
      message: 'Some Message'
    }
  },
  methods: {
    changeHandler: function(event: any) {
      const customEvent = new CustomEvent('change-title', {
        detail: event.target.value
      })
      console.log(customEvent)
      document.dispatchEvent(customEvent)
    }
  }
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
