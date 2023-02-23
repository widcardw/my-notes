import { onMount } from 'solid-js'
onMount(() => {
  Array.from(document.getElementsByTagName('pre')).forEach((element) => {
    element.setAttribute('tabindex', '0')
  })
})
