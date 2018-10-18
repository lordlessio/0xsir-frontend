<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="$emit('click')">Essential Links</h2>
    <!-- <img :src="'https%3A%2F%2Fstorage.googleapis.com%2Fopensea-static%2Fetheremon-logo.png' | proxyImg"/> -->
    <div v-for="(item, index) of Object.values(erc721s || {})" :key="index">
      <ul v-if="item">
        <li v-for="(cItem, cIndex) of item.list" :key="`${index}_${cIndex}`">
          <img :src="cItem.poster | proxyImg"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getErc721s } from 'api'
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Welcome to Your Vue.js App'
    }
  },
  data () {
    return {
      erc721s: {}
    }
  },
  methods: {},
  async mounted () {
    const params = {
      address: '0x088e25e6027816c753d01d7f243c367710f20497',
      pn: 0
    }
    const res = await getErc721s(params)
    if (res.code === 1000) {
      this.erc721s = res.data.erc721
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
