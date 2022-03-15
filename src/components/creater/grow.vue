<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";
import { ElMessage } from 'element-plus'

// const instance = getCurrentInstance();

// type Props={ 
//         skills:Skill 
//     }
// const props =  defineProps<Props>()
// const props = defineProps({ profession: String })

const TODO = () => {
    ElMessage.warning("还没做呢")
};
</script>

<template>
    <!-- 角色成长器 -->
    <el-row class="container">
        <el-button type="primary" plain @click="TODO">装备编辑</el-button>
        <el-button type="primary" plain @click="TODO">技能编辑</el-button>
        <el-button type="primary" plain @click="TODO">天赋编辑</el-button>
        <el-button type="primary" plain @click="TODO">属性成长</el-button>
        <el-button type="primary" plain @click="TODO">查看技能池</el-button>
    </el-row>
</template>

<style scoped lang="less">
.container {
    justify-content: center;
    margin: 20px 0;
}
</style>
