import { ForbiddenException, Injectable } from "@nestjs/common";
import { Bookmark, User } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService 
        ) { }
    async login(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        })

        if(!user) throw new ForbiddenException("Credential Error")

        const passMathces = await argon.verify(user.hash,dto.password)
        if(!passMathces) throw new ForbiddenException("Credential Error")
        
       
        return this.signToken(user.id, user.email)
      
    }

    async signUp(dto: AuthDto) {

        const hash = await argon.hash(dto.password);
        try {
            console.log("datt", dto)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email, hash: hash, lastName: "lol",
                    firstName: "lolo"
                },
                // select:{
                //     email: true,
                //     lastName: true
                // }
            }
            )
           
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException(
                    "Credentials taken man!"
                );
            }
            throw error
        }
    }

    async signToken (userId: number, email: string
        ): Promise<{ access_token: string}> {
            const payload = {
                sub: userId,
                email
            }
            const secret = this.config.get("JWT_SECRET");

            const token = await this.jwt.signAsync(payload, {
                expiresIn: '15m',
                secret: secret
            })

            return {
                access_token: token
            }
        }


}