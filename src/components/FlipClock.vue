<template>
    <div class="flipClock">
        <Flip class="flip" :digit="Math.floor(house / 10 % 10)"></Flip>
        <Flip class="flip" :digit="house % 10"></Flip>
        <div class="dotGroup">
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <Flip class="flip" :digit="Math.floor(min / 10 % 10)"></Flip>
        <Flip class="flip" :digit="min % 10"></Flip>
        <div class="dotGroup">
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <Flip class="flip" :digit="Math.floor(sec / 10 % 10)"></Flip>
        <Flip class="flip" :digit="sec % 10"></Flip>
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-content: space-between;
}

.flip {
    width: 150px;
    height: 200px;
    margin: 10px;
}

.dotGroup {
    height: 200px;
    margin: 10px;
}
.dot:nth-child(1) {
    background-color: black;
    margin-top:60px;
}
.dot:nth-child(2) {
    background-color: black;
    margin-top:60px;
}
.dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
}
</style>