import {GenderEnums, RoleEnums, ProviderEnums} from '../enums/index.js'

export interface Iuser
{
    fullName:string,
    fistName:string,
    LastName:string,
    email:string,
    Password:string,
    gender:GenderEnums,
    Role:RoleEnums,
    Provider:ProviderEnums
}