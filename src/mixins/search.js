export default {
  methods: {
    getAttr (node) {
      if (!node || node.nodeName === 'BODY') return {}

      const contract = node.getAttribute('data-contract')
      if (contract) {
        const name = node.getAttribute('data-name')
        return { contract, name }
      } else return this.getAttr(node.parentNode)
    },

    // 搜索父节点委托事件
    searchIntrust (e) {
      const { contract, name } = this.getAttr(e.target)
      this.$emit('search', { _id: contract, name })
    },

    clearInput () {
      this.searchInput = ''
      this.$refs['search-input'] && this.$refs['search-input'].focus()
    },
    checkInput (t) {
      t = t.toLocaleLowerCase()
      // const match = /^(0x)([A-Za-z0-9]{40})$/
      return !!/^(0x)?[0-9a-f]{40}$/i.test(t) && (!(!/^(0x)?[0-9a-f]{40}$/.test(t) && !/^(0x)?[0-9A-F]{40}$/.test(t)))
    },
    setBlockSearch ({ _id, name }) {
      _id = _id.toLocaleLowerCase()
      if (!this.checkInput(_id)) return
      const list = localStorage.getItem('lens_searches')
      let data = [{ _id, name }]
      if (list) {
        // 取出重复的item
        const _item = JSON.parse(list).filter(item => item._id === _id)[0]

        // 如果没有传入 name 并且 _item 存在，则替换 name 为 _item.name
        if (_item && !name) {
          data = [{ _id, name: _item.name }]
        }

        const _list = JSON.parse(list).filter(item => item._id !== _id)
        data = [].concat(data, _list).slice(0, 10)
      }
      localStorage.setItem('lens_searches', JSON.stringify(data))
    }
  }
}
