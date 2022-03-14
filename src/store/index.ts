
import Vuex, { Commit } from 'vuex'
import { isOwnKey, NonNeverState, GetState, GetMutationKeyParamMap, GetActionKeyParamMap } from "vuex-with-type"

import card from './card'

import packageJson from '../../package.json'

//根数据
const state = {
    projectName: packageJson.title,
    version: packageJson.version,
}


//store配置
const storeOptions = {
    state,
    mutations: {
    },
    actions: {
    },
    modules: {
        card
    }
}

// const store = createStore({
//     state: {//数据
//         projectName: packageJson.title,
//         version: packageJson.version,
//     },
//     mutations: {//信号

//     },
//     actions: {//动作
//     },
//     modules: {//模块
//         card
//     }
// });


export type TState = NonNeverState<GetState<typeof storeOptions>>

export type TMutation = GetMutationKeyParamMap<typeof storeOptions>;

export type TAction = GetActionKeyParamMap<typeof storeOptions>;

const store = new Vuex.Store<TState>(storeOptions);

export default store;