import { addClass, removeClass } from 'utils'

const Transition = (context) => {
  return {
    beforeEnter (el) {
      addClass('collapse-transition', el)
      if (!el.dataset) el.dataset = {}

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },

    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
      // context.parent.collapseHook('enter')
    },

    afterEnter (el) {
      removeClass('collapse-transition', el)
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflo
    },

    beforeLeave (el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },

    leave (el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass('collapse-transition', el)
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
      // context.parent.collapseHook('leave')
    },

    afterLeave (el) {
      removeClass('collapse-transition', el)
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }
}

export default {
  name: 'ElCollapseTransition',
  functional: true,
  render (h, context) {
    const data = {
      on: new Transition(context)
    }

    return h('transition', data, context.children)
  }
}
