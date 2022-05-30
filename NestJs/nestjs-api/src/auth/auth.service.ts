import { Injectable } from "@nestjs/common";
import { Bookmark, User} from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    login(){
        return { msg: 'I am in login' }
    } 

    signUp(){
        return { msg: 'I am in singup' }
    }
}