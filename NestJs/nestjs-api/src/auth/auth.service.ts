import { Injectable } from "@nestjs/common";
import { Bookmark } from '@prisma/client'
@Injectable({})
export class AuthService {
    login(){
        return { msg: 'I am in signup' }
    } 

    signUp(){
        return { msg: 'I am in singnin' }
    }
}