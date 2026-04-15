class person
{

    constructor(public name:string,public email: string, public password:string,public gender:string)
    {   
        this.name = name
        this.email = email
        this.password = password
        this.gender = gender 
    }

sayHello():string
{
    return`my name is ${this.name}and my gender is ${this.gender}`
}


}


class student extends person
{
        
}