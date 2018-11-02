const Vue = require('vue').default
const files = [
  'components/layout/Header.vue',
  'components/layout/Footer.vue',
  'components/svg',
  'components/stories/Blockies.vue',
  'components/stories/popup',
  'components/stories/popup/tool/Mask',
  'components/stories/collapse',
  'components/stories/collapse/item',

  'components/utils/MaskCard.vue',
  'components/utils/Loading'
]

for (const file of files) {
  const component = require(`${__dirname}/../../${file}`).default
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
  Vue.use(component)
}
