export default {
  methods: {
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
        const _list = JSON.parse(list).filter(item => item._id !== _id)
        data = [].concat(data, _list).slice(0, 10)
      }
      localStorage.setItem('lens_searches', JSON.stringify(data))
    }
  }
}
