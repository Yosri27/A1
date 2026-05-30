export class DatabaseRepository {
    model;
    constructor(model) {
        this.model = model;
        this.model = model;
    }
    create(data) {
        return this.model.create(data);
    }
    async findOne(filter, select, populate) {
        let query = this.model.findOne(filter);
        if (select) {
            query = query.select(select);
        }
        return await query.exec();
    }
    async findOneAndUpdate(filter, data, options) {
        return await this.model.findOneAndUpdate(filter, data, options);
    }
    // async create({data, options}:{data: any , options?:any})
    // {
    //     return await this.model.create(data,options)
    // }
    async findById(id, select, populate) {
        let query = this.model.findById(id);
        if (select)
            query = query.select(select);
        if (populate)
            query = query.populate(populate);
        return query;
    }
}
