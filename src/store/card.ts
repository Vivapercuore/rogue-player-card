
import _ from "lodash";
import { Commit, Dispatch } from 'vuex'
import { isOwnKey, NonNeverState, GetState, GetMutationKeyParamMap, GetActionKeyParamMap } from "vuex-with-type"
import Rootstore from "src/store/index"
import { defaultCardData } from "src/data/definition"
import { Skill } from "src/data/profession"


export interface RogueCard {
    name: string,
    profession?: string,
    MaxHP?: number,
    currentHP?: number,
    baseAttr: {
        力量: number,
        敏捷: number,
        体质: number,
        智力: number,
        感知: number,
        魅力: number,
    },
    /**衍生属性 */
    deriveAttr?: {
        [key: string]: string | number
    },
    /**习得技能 */
    skills?: Array<Skill>
    /**习得天赋 */
    talents?: Array<Skill>
}

export enum BaseAttr {
    力量 = '力量',
    敏捷 = '敏捷',
    体质 = '体质',
    智力 = '智力',
    感知 = '感知',
    魅力 = '魅力',
}

// localStorage.setItem("cards", JSON.stringify({}))

//单独的state才能推断类型
const state: { currentCard: RogueCard | null, cards: Array<RogueCard> } = {
    currentCard: null,
    cards: getAllCardsFromLocalStorage(),
}

// store.dispatch  触发 actions ->
// store.commit    触发 mutations -> 

const store = {
    state,
    // getters: {
    //     currentScenario: state => {
    //         return { ...scenario[state.scenarioName] }
    //     }
    // },
    mutations: { //信号
        saveCard(s: NonNeverState<typeof state>, cardData: RogueCard) {
            localStorage.setItem(`card:${cardData.name}`, JSON.stringify(cardData))
            const i = _.findIndex(s.cards, c => c.name === cardData.name)
            if (i >= 0) {
                s.cards.splice(i, 1, cardData)
            } else {
                s.cards.push(cardData)
            }
        },
        deleteCard(s: NonNeverState<typeof state>, cardData: RogueCard) {
            const i = _.findIndex(s.cards, c => c.name === cardData.name)
            if (i >= 0) {
                s.cards.splice(i, 1)
                console.log('deleteCard', s.cards.length)
                localStorage.removeItem(`card:${cardData.name}`)
            }
        },
        changeCard(s: NonNeverState<typeof state>, cardData: RogueCard) {
            s.currentCard = cardData
        },
        createNewCard(s: NonNeverState<typeof state>) {
            s.currentCard = _.cloneDeep(defaultCardData)
        }
    },
    actions: { //动作
        getCard({ commit, dispatch, rootState }: { commit: Commit, dispatch: Dispatch, rootState: any }, cardName: string): RogueCard | undefined {
            return _.find(rootState.card.cards, card => card.name === cardName)
        },
        //保存卡
        saveCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("saveCard", cardData)
        },
        //删除卡
        deleteCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("deleteCard", cardData)
        },
        createNewCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("createNewCard")
        },
        changeCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("changeCard", cardData)
        },
        async loadCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardName: string) {
            if (cardName === "new") {
                commit("createNewCard")
            } else {
                const cardData = await dispatch("getCard", cardName) as unknown as RogueCard
                console.log('loadCard', cardName, { cardData })
                if (!cardData?.name) {
                    return false
                }
                commit("changeCard", cardData)
            }
            return true
        },
    }
}

export default store


function getAllCardsFromLocalStorage(): Array<RogueCard> {
    let cards = []
    for (var i = 0; i < localStorage.length; i++) {
        const cardNamestr = localStorage.key(i)
        const matchReg = /(?<=card:).*/;
        const cardName = cardNamestr?.match(matchReg)?.[0]
        if (cardName) {
            try {
                const cardData = JSON.parse(localStorage.getItem(cardNamestr) as string)
                cards.push(cardData)
            } catch (error) { }
        }
    }
    return cards
}