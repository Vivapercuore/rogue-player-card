<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

const instance = getCurrentInstance();

// defineProps<{ msg: string  }>()
if (!store.state.card?.currentCard) {
    store.dispatch('loadCard')
}

console.log("当前角色卡:", store.state.card?.currentCard)
// const count = ref(0);
</script>

<template>
    <div class="container hide">
        <el-card>
            <!-- 属性表 -->
            <el-row :gutter="20" border>
                <el-col
                    :sm="12"
                    :span="24"
                >角色名称: {{ store.state.card?.currentCard?.name || '请设定角色卡名称' }}</el-col>
                <el-col
                    :sm="12"
                    :span="24"
                >职业: {{ store.state.card?.currentCard?.profession || '请选择角色卡职业' }}</el-col>
                <el-col
                    v-for="(value, attr) in store.state.card?.currentCard?.baseAttr"
                    :key="attr"
                    :xs="12"
                    :sm="8"
                    :md="4"
                    :lg="4"
                    :xl="4"
                >{{ attr }}:{{ value }}</el-col>
            </el-row>
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
.el-col {
    border: 1px solid #f0f0f0;
    padding: 5px;
}
</style>
