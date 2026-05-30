import { Model, PopulateOptions } from "mongoose";
import { Iuser } from "../../interface/user.interface.js";
import { HydratedDocument } from "mongoose";  
import { SetRequired } from "sequelize/lib/utils/set-required";

export class DatabaseRepository
{
    constructor(private model: Model<Iuser>)
    {
        this.model = model
    }

    create(data: Partial<Iuser>) : Promise<HydratedDocument<Iuser>>
    {
        return this.model.create(data)
    }
    async findOne(filter:Partial<Iuser> ,select?:any , populate?:any)
    {
        let query = this.model.findOne(filter)
        if (select) {
            query = query.select(select)
        }
        return await query.exec()
    }
    async findOneAndUpdate(filter:Partial<Iuser>, data:Partial<Iuser>, options?:any)
    {

        return await this.model.findOneAndUpdate(filter, data, options)
    }
    // async create({data, options}:{data: any , options?:any})
    // {
    //     return await this.model.create(data,options)
    // }
    async findById(
            id: string,
            select?:string | Record<string, 0 | 1>,
           populate?:PopulateOptions | PopulateOptions[])
    {
        let query = this.model.findById(id)
        if (select) query = query.select(select)
        if (populate) query = query.populate(populate)
        return query
    }
}