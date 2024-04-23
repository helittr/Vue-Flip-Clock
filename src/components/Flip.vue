<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
    digit: number,
    bgcolor_up?: string,
    bgcolor_down?: string,
    fontcolor_up?: string,
    fontcolor_down?: string,
    bordercolor_up?: string,
    bordercolor_down?: string,
    shadowcolor_up?: string,
    shadowcolor_down?: string
}>(), {
    digit: 0,
    bgcolor_up: "rgba(178, 64, 93, .3)",
    bgcolor_down: "rgba(178, 64, 93, .3)",
    fontcolor_up: "white",
    fontcolor_down: "white",
    bordercolor_up: "white",
    bordercolor_down: "white",
    shadowcolor_up: "rgba(178, 64, 93, 0.2)",
    shadowcolor_down: "rgba(178, 64, 93, 0.2)",
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
// window.resizeTo(100, 50)
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

// function on_enter() {
//     console.log('enter');
// }

// function on_leave() {
//     console.log('leave');
// }
</script>

<template>
    <div ref="view" class="flip">
        <div class="page back" :class="{ flipback: frontNumber != backNumber }" :data-number="backNumber"></div>
        <div class="page front" :class="{ flipfront: frontNumber != backNumber }" :data-number="frontNumber"></div>
    </div>
</template>

<style scoped>
.flip {
    height: v-bind(h);
}

.page {
    position: absolute;
    width: v-bind(w);
    height: v-bind(h);
    font-size: v-bind(w);
    border-radius: 10%;
}

.page::before,
.page::after {
    width: 100%;
    content: attr(data-number);
    display: block;
    position: absolute;
    overflow: hidden;
    backface-visibility: hidden;
    text-align: center;
    border-width: .03ex;
    border-style: dotted;
    border-radius: 16%;
}

.page::before {
    top: 0;
    bottom: 51%;
    line-height: v-bind(h);
}

.page::after {
    top: 51%;
    bottom: 0;
    line-height: 0;
}

.back::before {
    box-shadow: -.1ex .1ex .4px v-bind(shadowcolor_up);
    border-color: v-bind(bordercolor_up);
    color: rgba(0, 0, 0, 0);
    background-color: v-bind(bgcolor_up);
}

.back::after {
    transform: rotateX(180deg);
    z-index: 1;
    background-color: rgba(0, 0, 0, 0);
    color: v-bind(fontcolor_up);
    border-color: v-bind(bordercolor_up);
}

.front::before {
    background-color: rgba(0, 0, 0, 0);
    color: v-bind(fontcolor_up);
    border-color: v-bind(bordercolor_up);
}

.front::after {
    box-shadow: -.1ex .1ex .4px v-bind(shadowcolor_down);
    border-color: v-bind(bordercolor_down);
    color: v-bind(fontcolor_down);
    background-color: v-bind(bgcolor_down);
}

.flipfront::before {
    animation-name: before;
    animation-fill-mode: both;
    animation-duration: .3s;
    animation-direction: alternate;
    transform-origin: center bottom;
}

@keyframes before {
    100% {
        transform: rotateX(180deg);
    }
}

.flipfront::after {
    animation-name: front;
    animation-fill-mode: both;
    animation-duration: .3s;
    transform-origin: center bottom;
}

@keyframes front {
    100% {
        color: rgba(0, 0, 0, 0);
    }
}

.flipback::after {
    animation-name: after;
    animation-fill-mode: both;
    animation-duration: .3s;
    transform-origin: center top;
}

@keyframes after {
    100% {
        transform: rotateX(0);
        color: v-bind(fontcolor_down);
        border-color: v-bind(bordercolor_down);
    }
}

.flipback::before {
    animation-name: back;
    animation-duration: .3s;
    animation-fill-mode: both;
    transform-origin: center top;
}

@keyframes back {
    100% {
        color: v-bind(fontcolor_up);
    }
}
</style>
