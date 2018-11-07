import { img2Base64 } from 'utils'
export default {
  computed: {
    ossOrigin () {
      return process.env.OSS_ORIGIN
    }
  },
  methods: {
    onImgLoad (e) {
      const _target = e.target
      img2Base64(_target.src).then(str => {
        _target.src = str
      })
    },

    async onImgError (e) {
      const _target = e.target
      img2Base64(`${this.ossOrigin}/0xsir/source/sir-error-icon.svg`).then(str => {
        _target.src = str
      })
    }
  }
}
