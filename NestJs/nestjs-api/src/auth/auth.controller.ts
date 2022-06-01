import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Request } from "express";

@Controller ('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
       console.log({dto})
      return this.authService.signUp(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
       return this.authService.login(dto)
    }
}