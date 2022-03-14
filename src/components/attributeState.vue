<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

const instance = getCurrentInstance();
// defineProps<{ msg: string  }>()

// const count = ref(0);
</script>

<template>
    <div class="container hide">
        <el-card>
            <!-- 属性表 -->
            <el-descriptions title="角色属性" :column="1">
                <el-descriptions-item
                    label="角色名称"
                >{{ store.state.card?.currentCard?.name || '请设定角色卡名称' }}</el-descriptions-item>
                <el-descriptions-item
                    v-for="(value, attr) in store.state.card?.currentCard?.baseAttr"
                    :key="attr"
                    :label="attr"
                >{{ value }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>

<style scoped lang="less">
.container {
    position: sticky;
    bottom: 5vw;
    z-index: 9;
    &.hide {
        bottom: -95%;
    }
}
</style>
