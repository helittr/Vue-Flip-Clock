<template>
    <div class="infinite-list-wrapper" style="overflow: auto">
        <ul v-infinite-scroll="load" infinite-scroll-immediate class="list" :infinite-scroll-disabled="disabled">
            <li v-for="i in downloadingList" :key="i.index" class="list-item">
                <el-row>
                    <el-col :span="5">{{ i.index }}</el-col>
                    <el-col :span="15">
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="i.progress" />
                    </el-col>
                    <el-col :span="4">{{ i.time }}</el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'

interface IDownloadList {
    index: number,
    progress: number,
    time: number,
}

const downloadItem: IDownloadList = { index: 1, progress: 50, time: 10 }
const downloadingList:Ref = ref([downloadItem])
const count = ref(1)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    console.log(count.value)
    setTimeout(() => {
        downloadingList.value.push({index:count.value, progress:50+count.value, time:10})
        count.value += 1
        loading.value = false
    }, 500)
}

for(let i = 0; i < 10;i++){
    downloadingList.value.push({index:count.value, progress:50+count.value, time:10})
        count.value += 1
}

</script>

<style>
.infinite-list-wrapper {
    height: 300px;
    text-align: center;
}

.infinite-list-wrapper .list {
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list-wrapper .list-item {
    /* display: flex; */
    align-items: center;
    justify-content: center;
    /* height: 50px; */
    background: var(--el-color-primary-light-5);
    /* color: var(--el-color-danger); */
}

.infinite-list-wrapper .list-item+.list-item {
    margin-top: 10px;
}
</style>