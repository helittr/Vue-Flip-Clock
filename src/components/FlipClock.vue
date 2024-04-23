<template>
    <div class="flipClock" @wheel="wheel_handle">
        <Flip class="flip" :digit="Math.floor(house / 10 % 10)" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
        <Flip class="flip" :digit="house % 10" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
        <div class="dotGroup">
        </div>
        <Flip class="flip" :digit="Math.floor(min / 10 % 10)" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
        <Flip class="flip" :digit="min % 10" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
        <div class="dotGroup">
        </div>
        <Flip class="flip" :digit="Math.floor(sec / 10 % 10)" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
        <Flip class="flip" :digit="sec % 10" :bgcolor_up="bgColor" :bgcolor_down="bgColor" :shadowcolor_up="shColor" :shadowcolor_down="shColor"></Flip>
    </div>
</template>

<script lang="ts" setup>
import Flip from './Flip.vue';

import { ref, onMounted, computed } from 'vue'

const house = ref(0)
const min = ref(0)
const sec = ref(0)
const transparency = ref(1)
const bgColor =  computed(()=>'rgba(178, 64, 93, ' + transparency.value + ')') 
const shColor =  computed(()=>bgColor.value) 

onMounted(()=>{
    function update(){
        var date = new Date()
        house.value = date.getHours()
        min.value = date.getMinutes()
        sec.value = date.getSeconds() 
    }
    setInterval(update, 1000)
})

function wheel_handle (event: WheelEvent){
    console.log(event)
    var target = transparency.value + (event.deltaY / 1000)
    transparency.value =  0<= target && target <= 1?  target: transparency.value;
}
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
    background-color:v-bind(bgColor);
    display: block;
    border-radius: 50%;
}
</style>