<template>
  <div class="search-main">
    <sir-header :showTool="false"/>
    <search class="search-component" :visible="searchModel" @search="searchHandle"/>
    <sir-footer/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  data: () => {
    return {
      searchModel: false
    }
  },
  components: {
    Search
  },
  methods: {
    searchHandle (value) {
      console.log('value', value)
      this.$router.push(`/address/${value}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.searchModel = true
    })
  }
}
</script>

<style lang="scss" scoped>
  .search-main {
    padding: 30px;
    color: #fff;
    background-color: #151618;
  }
  .search-component {
    margin-bottom: 50px;
  }
</style>
