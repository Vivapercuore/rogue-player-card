import { Skill } from "src/data/profession"

import { Rarity, CDLevel } from "src/data/definition"

const skills: Array<Skill> = [
    {
        name: "嘲讽",
        rarity: Rarity.normal,
        description: "花费1行动点,嘲讽1/2/3个敌人2回合",
        CDLevel: CDLevel.short,
        variable: {
            行动点: 1,
            嘲讽数量: 1,
            嘲讽回合: 2,
        },
        level: {
            1: {
                嘲讽数量: 1
            },
            2: {
                嘲讽数量: 2
            },
            3: {
                嘲讽数量: 3
            },
        }
    },
    {
        name: "王车易位",
        rarity: Rarity.normal,
        description: "反应动作:近战攻击范围内的友方被攻击时 ,花费1/1/0行动点立即与其交换位置 ,并代替其承受这次攻击。CD2/1/1"
    },
    {
        name: "旋风斩",
        rarity: Rarity.normal,
        description: "花费3行动力 ,对周围1格范围内所有单位造成所持武器基础伤害+力量的伤害。"
    },
    {
        name: "止步",
        rarity: Rarity.normal,
        description: "被动:强化借机攻击 ,你的借机攻击现在只花费1行动点。此外当你的借机攻击命中时 ,本回合内敌人不能移动。"
    },
    {
        name: "冲锋",
        rarity: Rarity.normal,
        description: "花费2行动点 ,冲锋至多移动距离格 ,如果近战攻击范围内有敌人 ,那么立即对一个目标造成力量伤害 ,再近战攻击这个目标 ,CD3"
    },
    {
        name: "冲撞",
        rarity: Rarity.normal,
        description: "花费2行动点 ,使用盾牌或者重型近战武器攻击 ,这次攻击不造成伤害而改为:将目标击退X+1格 ,若是命中障碍物或敌人 ,则对双方造成2D6+力量的伤害 ,并摧毁被命中的障碍物 ,CD3（X为力量）"
    },
    {
        name: "反击",
        rarity: Rarity.normal,
        description: "反应动作:当你被近战攻击宣言时 ,若对方处于敏感范围内 ,可以立即对攻击来源发动借机攻击。"
    },
    {
        name: "顺劈",
        rarity: Rarity.normal,
        description: "近战攻击命中后 ,花费1行动点 ,额外攻击另一个近战攻击范围内的敌人 ,伤害为50%/100% ,CD1"
    },
    {
        name: "投掷",
        rarity: Rarity.normal,
        description: "投掷盾牌或者武器 ,掷出力量点数格 ,对直线上所有敌人攻击一次（仅投一次命中） ,命中则造成1d8+力量的伤害 ,当你走到掷出的装备所在格时 ,立即捡起它。（使用时手上必须持有武器或盾牌）"
    },
    {
        name: "致死打击",
        rarity: Rarity.normal,
        description: "宣言攻击目标时 ,花费1行动点 ,使得本次攻击伤害结果翻倍 ,当你击杀敌人时 ,刷新这个技能。CD4"
    },
    {
        name: "刃盾",
        rarity: Rarity.normal,
        description: "被动:每次攻击命中后 ,为自己提供一个数值等于力量的护盾 ,持续1回合。"
    },
    {
        name: "碎甲",
        rarity: Rarity.normal,
        description: "攻击命中后 ,再花费1行动点 ,使其AC-2 ,持续3回合。CD3。"
    },
    {
        name: "敏锐",
        rarity: Rarity.normal,
        description: "被动:你的目视敏感范围扩大到180度。"
    },
    {
        name: "战嚎",
        rarity: Rarity.normal,
        description: "花费全部（至少为3）行动点 ,嘲讽3格内的所有敌人 ,AC+3 ,持续3轮次。CD4。"
    },
    {
        name: "忍耐",
        rarity: Rarity.normal,
        description: "免疫1次伤害 ,CD4"
    },
    {
        name: "荆棘",
        rarity: Rarity.normal,
        description: "被动:当你受到近战伤害时 ,立即对伤害来源造成力量点数的伤害。此外 ,当敌人攻击你的时候 ,如果本次攻击没能命中 ,你可以宣言本次攻击命中 ,并只收到1点伤害 ,且不承受本次攻击附加的负面效果。"
    },
]

export default skills