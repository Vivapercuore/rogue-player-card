<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import store from "src/store";
import router from "src/router";

import { RogueCard } from "src/store/card";
import ProfessionsDesc from "src/components/creater/professionsDesc.vue";

import { warrior, mage, pastor, ranger, wizard } from "src/data/profession"


// const instance = getCurrentInstance();
const currentCard = reactive(store.state.card?.currentCard || {}) as RogueCard
// defineProps<{ msg: string  }>()
const professions = reactive([warrior, mage, pastor, ranger, wizard])

const cost = ref(12);
//tag颜色
const costTagType = computed((): string => {
    if (costLeft.value < 0) {
        return "danger"
    } else if (costLeft.value > 0) {
        return ""
    } else {
        return "success"
    }
})
//剩余点数
const costLeft = computed((): number => {
    let costL = cost.value
    for (const key in currentCard.baseAttr) {
        if (Object.prototype.hasOwnProperty.call(currentCard.baseAttr, key)) {
            const attrvalue = currentCard.baseAttr[key as keyof typeof currentCard.baseAttr];
            costL -= costOn(attrvalue) as number
        }
    }
    return costL
})

//点数消耗映射
const costMap: { [key: string]: string | number } = {
    '-2': '-',
    '-1': -1,
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 4,
    '4': 7,
    '5': '-',
}

//当前属性消耗点数
const costOn = (value: string | number): string | number => {
    return costMap[value]
}

const checkCrad = async () => {
    if (!currentCard.name) {
        throw "没有设定角色卡名称"
    }
    if (costLeft.value < 0) {
        throw "属性点消耗过高"
    }
    if (costLeft.value > 0) {
        throw "属性点没有用完"
    }
    if (!currentCard.profession) {
        throw "大哥,选个职业"
    }
    //通过  throw会阻断
    return
}

//建卡校验
const creatCard = () => {
    checkCrad().then(
        () => {
            store.dispatch("saveCard", currentCard)
        }
    ).catch(
        (errmsg) => {
            ElMessage.error(errmsg)
        }
    )
}

</script>



<template>
    <el-form ref="form" :model="currentCard">
        <el-row :gutter="20">
            <!-- 角色卡名称 -->
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item label="角色卡名称:">
                    <el-input class="content" v-model="currentCard.name" placeholder="请输入角色卡名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-divider>
                可以为共计6个属性分配{{ cost }}个点数,剩余:
                <el-tag :type="costTagType">{{ costLeft }}</el-tag>
            </el-divider>
            <!-- 属性点分配 -->
            <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="6"
                v-for="(value, name)  in currentCard.baseAttr"
                :key="name"
            >
                <el-form-item :label="name + ':'">
                    <el-input-number
                        v-model="currentCard.baseAttr[name]"
                        :min="-1"
                        :max="4"
                        :label="name"
                    />
                    <el-tag class="attrCost">{{ costOn(value) }}</el-tag>
                    <div>
                        上一属性点消耗:
                        <el-tag>{{ costOn(value - 1) }}</el-tag>,下一属性点消耗
                        <el-tag>{{ costOn(value + 1) }}</el-tag>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 职业 -->
            <el-col :span="24">
                <el-form-item label="职业:">
                    <el-radio-group v-model="currentCard.profession">
                        <el-radio-button
                            :label="profession.name"
                            v-for="profession  in professions"
                            :key="profession.name"
                        />
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <!-- 职业介绍 -->

            <el-col :span="24">
                <ProfessionsDesc :profession="currentCard.profession" />
            </el-col>
        </el-row>
        <!-- 初始属性调整 -->
        <el-row class="footBtn" :gutter="20">
            <el-button type="primary" plain @click="creatCard">建卡</el-button>
        </el-row>
    </el-form>
</template>

<style scoped lang="less">
.el-row {
    justify-content: center;
}
.el-col {
    display: flex;
    justify-content: center;
}
.attrCost {
    margin-left: 15px;
}

.footBtn {
    margin: 20px 0;
}
</style>
