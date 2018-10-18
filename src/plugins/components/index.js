const Vue = require('vue').default
const files = [
  'components/svg',
  'components/stories/Blockies.vue',
  'components/utils/MaskCard.vue',
  'components/stories/popup' ]

for (const file of files) {
  const component = require(`${__dirname}/../../${file}`).default
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
  Vue.use(component)
}
