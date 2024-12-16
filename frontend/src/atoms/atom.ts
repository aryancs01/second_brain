import {atom} from 'recoil';

export const modal = atom({
    key:"modal open or close",
    default:false
})

export const buttonType = atom({
    key:"type button",
    default:"youtube"
})