import type { Ref } from 'vue'

export const vMenu = {
  mounted: (el: HTMLDivElement, coords: Ref<[number, number]>) => {
    el.style.left = coords.value[0] - el.offsetWidth / 2 + 'px'
    el.style.top = coords.value[1] - 16 + 'px'
  },
  updated: (el: HTMLDivElement, coords: Ref<[number, number]>) => {
    el.style.left = coords.value[0] - el.offsetWidth / 2 + 'px'
    el.style.top = coords.value[1] - 16 + 'px'
  }
}
