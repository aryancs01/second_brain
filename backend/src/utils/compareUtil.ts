import bcrypt from 'bcrypt';

export async function compareUtil(userPassword:string,originalHash:string){
    const content = await bcrypt.compare(userPassword,originalHash)
    console.log(content);
    return content;
}