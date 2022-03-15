<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";
import { RogueCard } from "src/store/card";
import { defaultCardData } from "src/data/definition"

const instance = getCurrentInstance();

// defineProps<{ msg: string  }>()
if (!store.state.card?.currentCard) {
    store.dispatch('loadCard')
}

console.log("当前角色卡:", store.state.card?.currentCard)
// const count = ref(0);

const currentCard = computed(() => {
    let currentCard = _.cloneDeep(store.state.card?.currentCard)
    currentCard = generateDeriveAttr(currentCard as RogueCard)
    return currentCard
})

// 生成衍生属性
function generateDeriveAttr(cardData: RogueCard): RogueCard {
    if (!cardData.deriveAttr) {
        cardData.deriveAttr = _.cloneDeep(defaultCardData.deriveAttr)
    }
    let deriveAttr = _.cloneDeep(defaultCardData.deriveAttr) as any
    deriveAttr.移动距离 = cardData.baseAttr.敏捷 + 5
    //合并衍生属性
    _.assign(cardData.deriveAttr, deriveAttr)
    return cardData
}

</script>

<template>
    <div class="container hide">
        <el-card>
            <!-- 属性表 -->
            <el-row :gutter="20" border>
                <el-col :sm="12" :span="24">角色名称: {{ currentCard?.name || '请设定角色卡名称' }}</el-col>
                <el-col :sm="12" :span="12">职业: {{ currentCard?.profession || '请选择角色卡职业' }}</el-col>
                <el-col
                    :sm="12"
                    :span="12"
                >HP: {{ currentCard?.MaxHP }}/{{ currentCard?.currentHP }}</el-col>
                <!-- 基础属性 -->
                <el-col
                    v-for="(value, attr) in currentCard?.baseAttr"
                    :key="attr"
                    :xs="12"
                    :sm="8"
                    :md="4"
                    :lg="4"
                    :xl="4"
                >{{ attr }}:{{ value }}</el-col>
                <!-- 衍生属性 -->
                <el-col
                    v-if="currentCard?.deriveAttr"
                    v-for="(value, attr) in currentCard?.deriveAttr"
                    :key="attr"
                    :xs="12"
                    :sm="8"
                    :md="4"
                    :lg="4"
                    :xl="4"
                >{{ attr }}:{{ value }}</el-col>
            </el-row>
            <!-- 习得技能 -->
            <div class="row">
                习得技能:
                <el-tag :type="''" v-for="(value, attr) in currentCard?.skills">{{ '技能名称' }}</el-tag>
                <div v-if="!currentCard?.skills?.length">暂无</div>
            </div>
            <!-- 习得天赋 -->
            <div class="row">
                习得天赋:
                <el-tag :type="''" v-for="(value, attr) in currentCard?.talents">{{ '技能名称' }}</el-tag>
                <div v-if="!currentCard?.talents?.length">暂无</div>
            </div>
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

.row {
    padding: 5px;
}
</style>
