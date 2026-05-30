import { Model } from "mongoose";
import { Iuser } from "../interface/user.interface.js";
import { HydratedDocument } from "mongoose";  

export class DatabaseService 
    {


    constructor(private model: Model<Iuser>)
    {
        this.model = model
    }

    create(data: Partial<Iuser>) : Promise<HydratedDocument<Iuser>>
    {
        return this.model.create(data)
    }
    findOne(filter:Partial<Iuser> ,select:any , populate:any)
    {
        return this.model.findOne(filter,select,populate)
    }

    update(data:Partial<Iuser>): Promise<HydratedDocument<Iuser>>
    {
            return this.model.updateOne(data)
    }
    remove(data:Partial<Iuser>): Promise<HydratedDocument<Iuser>>
    {
            return this.model.deleteOne(data)
    }
    
}


    