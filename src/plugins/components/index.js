const Vue = require('vue').default
const files = [
  'components/layout/Header.vue',
  'components/layout/Footer.vue',
  'components/svg',
  'components/stories/Blockies.vue',
  'components/utils/MaskCard.vue',
  'components/stories/popup',
  'components/stories/collapse',
  'components/stories/collapse/item'
]

for (const file of files) {
  const component = require(`${__dirname}/../../${file}`).default
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
  Vue.use(component)
}
