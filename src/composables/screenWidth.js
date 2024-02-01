import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useScreenWidth() {
  const screenWidth = ref(window.innerWidth)
  const sm = computed(() => screenWidth.value < 750)
  const md = computed(() => screenWidth.value >= 750 && screenWidth.value < 1000)
  const lg = computed(() => screenWidth.value >= 1000)

  function handleResize() {
    screenWidth.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', handleResize))
  onBeforeUnmount(() => window.removeEventListener('resize', handleResize))

  return { screenWidth, sm, md, lg }
}
