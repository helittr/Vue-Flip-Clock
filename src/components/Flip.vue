<template>
    <div ref="view" class="flip">
        <div @mouseenter="on_enter" @mouseleave="on_leave" class="page back" :class="{ flipback: frontNumber != backNumber }"
            :data-number="backNumber"></div>
        <div @mouseenter="on_enter" @mouseleave="on_leave" class="page front" :class="{ flipfront: isFlip }" :data-number="frontNumber"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
    digit: number,
    color_up?: string,
    color_down?: string,
    color?: string
}>(), {
    digit: 0,
    color_up: "black",
    color_down: "black",
    color: "white"
})

const view = ref(null)
let isFlip = ref(false)
let backNumber = ref(0)
let frontNumber = ref(0)
let h = ref("")
let w = ref("")

function show(num: number) {
    if (frontNumber.value == num) {
        return
    }
    backNumber.value = num;
    isFlip.value = true;
    setTimeout(() => {
        frontNumber.value = num;
        isFlip.value = false;
    }, 500);
}

watch(() => props.digit, (digit, _) => {
    if (0 <= digit && digit <= 9) {
        show(digit)
    }
})
// @ts-ignore
watch(() => view.offsetHeight, (v, _) => {
    console.log(v)
    if (v) h.value = v + 'px'
})
// @ts-ignore
watch(() => view.offsetWidth, (v, _) => {
    console.log(v)
    if (v) w.value = v + 'px'
})

onMounted(() => {
    var observe = new ResizeObserver((entries) => {
        for (var e of entries) {
            if (e.target === view.value) {
                w.value = e.borderBoxSize[0].inlineSize + 'px'
                h.value = Math.floor(e.borderBoxSize[0].inlineSize * 1.4) + 'px'
            }
        }
    })
    // @ts-ignore
    observe.observe(view.value)
    // @ts-ignore
    w.value = view.value.offsetWidth + 'px'
    // @ts-ignore
    h.value = Math.floor(view.value.offsetWidth * 1.5) + 'px'
    show(props.digit)
})

function on_enter() {
    console.log('enter');
}

function on_leave() {
    console.log('leave');
}
</script>

<style scoped>
.flip {
    height: v-bind(h);
}

.front,
.back {
    position: absolute;
    width: v-bind(w);
    height: v-bind(h);
    font-size: v-bind(w);
    border-radius: 10%;
}

.back::after {
    transform: rotateX(180deg);
    z-index: 1;
}

.flipfront::before {
    animation-name: before;
    animation-fill-mode: both;
    animation-duration: .3s;
    animation-direction: alternate;
    transform-origin: center bottom;
}

.flipback::after {
    animation-name: after;
    animation-fill-mode: both;
    animation-duration: .3s;
    animation-direction: alternate;
    transform-origin: center top;
}

@keyframes before {
    100% {
        transform: rotateX(180deg);
    }
}

@keyframes after {
    100% {
        transform: rotateX(0);
    }
}

.page::before,
.page::after {
    display: block;
    content: attr(data-number);
    position: absolute;
    overflow: hidden;
    backface-visibility: hidden;
    color: v-bind(color);
    text-align: center;
    width: 100%;
    box-shadow: -.1ex .1ex .4px rgb(178, 64, 92);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(227, 81, 118);
    border-radius: 10%;
}

.page::before {
    top: 0;
    bottom: 51%;
    background-color: rgb(227, 81, 118);
    line-height: v-bind(h);
}

.page::after {
    top: 51%;
    bottom: 0;
    background-color: rgb(227, 81, 118);
    line-height: 0;
}
</style>, onMounted, onMounted, hasInjectionContext
