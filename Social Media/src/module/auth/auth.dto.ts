
export interface LoginDTO
{
    email : string,
    Password : string
}

export interface SignupDTO extends LoginDTO 
{
    name : string
    
}