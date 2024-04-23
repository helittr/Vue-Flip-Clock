<template>
  <FlipClock />
</template>

<script lang="ts" setup>
import FlipClock from './components/FlipClock.vue';

window.addEventListener("resize", () => {
  var el = document.querySelector("body")
  window.resizeTo(el?.offsetWidth as number, el?.offsetHeight as number)
});

</script>

<style></style>