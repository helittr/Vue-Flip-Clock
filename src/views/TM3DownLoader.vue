<template>
    <div>
        <el-row class="new-task-table" justify="end">
            <el-col :span="10" :pull="1">
                <el-input type="text" v-model="url" clearable>
                    <template #prepend>http(s)://</template>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="submitTask">新建任务</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="task-list-header">
        <el-text size="large">任务列表</el-text>
    </div>
    <div class="infinite-list-wrapper task-list-border" style="overflow: auto">
        <ul infinite-scroll-immediate class="list" :infinite-scroll-disabled="disabled">
            <li v-for="k in Object.keys(downloadingList)" :key="k" class="list-item">
                <el-row :gutter="10" align="middle" justify="center">
                    <el-col :span="4"><el-text truncated size="large">{{ k }}</el-text></el-col>
                    <el-col :span="10">
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="downloadingList[k].progress"
                            striped :striped-flow="downloadingList[k].stat != 'finished'" stroke-linecap="square" />
                    </el-col>
                    <!-- <el-col :span="6"><el-text truncated size="large">{{ downloadingList[k].saveDir }}</el-text></el-col> -->
                    <el-col :span="4"><el-text size="large">{{ downloadingList[k].stat }}</el-text></el-col>
                    <el-col :span="2"><el-text size="large">{{ downloadingList[k].compeleted }}/{{ downloadingList[k].tsCnt }}</el-text></el-col>
                    <el-col :span="2"><el-text size="large">{{ downloadingList[k].aliveThreads }}</el-text></el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, type Ref } from 'vue'
import axios from 'axios'


// interface IDownloadItem {
//     index: number,
//     progress: number,
//     time: number,
// }

const url = ref('')
// const downloadItem: IDownloadItem = { index: 1, progress: 50, time: 10 }
const downloadingList: Ref = ref({})

const count = ref(1)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)

const submitTask = () => {
    if (url.value === '') {
        console.log('请输入正确的 uRL 地址！！！')
        return
    }

    axios.post('/m3', { 'url': url.value }).then((res) => {
        console.log(res)
    })
}

// function updateStatus() {
//     // console.log('update status')

//     axios.get('/m3/')
//         .then((res) => {
//             downloadingList.value = res.data
//             console.log(res.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })

//     setTimeout(updateStatus, 1000)
// }

onMounted(() => {
    // setTimeout(updateStatus, 1000);
})

</script>

<style>
.task-list-header {
    margin: 10px;
    text-align: center;
}

.new-task-table {
    margin: 10px;
}

.infinite-list-wrapper {
    height: 300px;
    text-align: center;
    margin: 10px;
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

.task-list-border {
    border: var(--el-border-radius-small) solid var(--el-border-color);
    margin-top: 20px;
    padding: 10px;
}

.el-col {
    line-height: var(--el-font-line-height-primary);
}
</style>
