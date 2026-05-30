import {GenderEnums, RoleEnums, ProviderEnums} from '../enums/index.js'

export interface Iuser
{
    userName:string,
    firstName:string,
    lastName:string,
    email:string,
    phone: string,
    profilePic?:string,
    profileCoverPic?:string[],
    password:string,
    gender?:GenderEnums,
    Role?:RoleEnums,
    provider?:ProviderEnums,
    confirmEmail:boolean,
    createdAt?:Date,
    updatedAt?:Date
}