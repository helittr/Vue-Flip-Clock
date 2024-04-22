<template>
    <FlipClock/>
</template>

<script lang="ts" setup>
import FlipClock from './components/FlipClock.vue';


var el = document.querySelector("body")
  window.ipcRenderer.send('set-win-hight', el?.offsetWidth, el?.offsetWidth)
window.addEventListener("resize", ()=>{
  var el = document.querySelector("body")
  window.ipcRenderer.send('set-win-hight', el?.offsetWidth, el?.offsetHeight)
});

</script>

<style>

</style>