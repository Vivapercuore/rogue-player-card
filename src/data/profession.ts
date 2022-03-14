
import { BaseAttr } from "src/store/card";
import warriorSkills from "src/data/warriorSkills"


enum Materials {
    军用武器 = '军用武器',
    重型武器 = '重型武器',
    轻型武器 = '轻型武器',
    远程武器 = '远程武器',
    简易武器 = '简易武器',
    法器 = '法器',
}


export const warrior: Profession = {
    name: "战士",
    lifeDice: "1D8+体质",
    mainAttr: BaseAttr.力量,
    material: [Materials.军用武器, Materials.重型武器, Materials.轻型武器, Materials.远程武器, Materials.简易武器],
    characteristics: [
        {
            description: "基础AC+1"
        },
        {
            description: "每持用一把武器招架+1"
        }
    ],
    skills: warriorSkills,
}

export const mage: Profession = {
    name: "法师",
    lifeDice: "1D4+体质",
    mainAttr: BaseAttr.智力,
}

export const pastor: Profession = {
    name: "牧师",
    lifeDice: "1D4+体质",
    mainAttr: BaseAttr.感知,
}

export const ranger: Profession = {
    name: "游侠",
    lifeDice: "1D6+体质",
    mainAttr: BaseAttr.敏捷,
}

export const wizard: Profession = {
    name: "术士",
    lifeDice: "1D6+体质",
    mainAttr: BaseAttr.魅力,
}

export interface Profession {
    name: string,
    /*生命骰*/
    lifeDice: string,
    /*主要属性*/
    mainAttr: BaseAttr,
    /*特征*/
    characteristics?: Array<Characteristic>
    /*允许物品种类*/
    material?: Array<Materials>
    /*技能*/
    skills: Array<any>
}
interface Characteristic {
    description: string,
    function?: Function
}


export default {
    warrior,
    mage,
    pastor,
    ranger,
    wizard,
}