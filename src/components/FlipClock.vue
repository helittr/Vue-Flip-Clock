<template>
    <div class="flipClock">
        <Flip class="flip" :digit="Math.floor(house / 10 % 10)"></Flip>
        <Flip class="flip" :digit="house % 10" ></Flip>
        <div class="dotGroup">
        </div>
        <Flip class="flip" :digit="Math.floor(min / 10 % 10)" ></Flip>
        <Flip class="flip" :digit="min % 10" ></Flip>
        <div class="dotGroup">
        </div>
        <Flip class="flip" :digit="Math.floor(sec / 10 % 10)" ></Flip>
        <Flip class="flip" :digit="sec % 10" ></Flip>
    </div>
</template>

<script lang="ts" setup>
import Flip from './Flip.vue';

import { ref, onMounted } from 'vue'

const house = ref(0)
const min = ref(0)
const sec = ref(0)

onMounted(()=>{
    function update(){
        var date = new Date()
        house.value = date.getHours()
        min.value = date.getMinutes()
        sec.value = date.getSeconds() 
    }
    setInterval(update, 1000)
})

</script>

<style scoped>
.flipClock {
    width: 98%;
    display: flex;
    justify-content: space-around;
    padding: 1%;
}

.flip {
    width: 14%;
    -webkit-app-region: drag;
}

.dotGroup {
    width: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.dotGroup::before,.dotGroup::after {
    content: '';
    aspect-ratio: 1;
    width: 100%;
    background-color: rgb(227, 81, 118);
    display: block;
    border-radius: 50%;
}
</style>