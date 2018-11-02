<template>
  <div class="search-main">
    <sir-header :showTool="false"/>
    <search class="search-component" :visible="searchModel" @search="searchHandle"/>
    <sir-footer/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import SearchMixin from '@/mixins/search'
export default {
  mixins: [SearchMixin],
  data: () => {
    return {
      searchModel: false
    }
  },
  components: {
    Search
  },
  methods: {
    searchHandle ({ _id, name }) {
      if (!this.checkInput(_id)) return
      this.setBlockSearch({ _id, name })
      this.$router.push(`/address/${_id}`)
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
    background-image: url(~/static/header-bg.jpg);
    background-size: 100% auto;
    background-repeat: no-repeat;
    // background-color: #151618;
  }
  .search-component {
    margin-bottom: 50px;
  }
</style>
