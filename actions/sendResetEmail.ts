'use server'

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generateResetPasswordTokens } from "@/lib/token"
import { ForgotPsswordSchema } from "@/schemas"
import * as z from "zod"
export const sendResetEmail =async (values:z.infer<typeof ForgotPsswordSchema>)=>{
    
    const validateFields = ForgotPsswordSchema.safeParse(values)
    if(!validateFields.success){
        return {error:'Invalid Fields'}
    }
    const {email} = validateFields.data

    const existingUser = await getUserByEmail(email)
    if(!existingUser) return {error:'Email does not exist'}
    const verficationToken = await generateResetPasswordTokens(email);
    await sendPasswordResetEmail(verficationToken.email, verficationToken.token,existingUser.name as string);
    return {success: "Reset email sent!"};

}