import bcrypt from "bcrypt"

class SecurityService 
{

    async Hashpassword ({plaintext,salt}:{plaintext:string,salt: string})
    {
        return await bcrypt.hash(plaintext,salt)
    }
    async comparehash ({plaintext, cyphertext}:{plaintext:string,cyphertext:string}):Promise<boolean>
    {
        return await bcrypt.comparehash(plaintext,cyphertext)
    }

}
