import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/DB/models/user.model';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {


  constructor(
    @Inject(CACHE_MANAGER) private cachemanager: Cache,
    @InjectModel(User.name) private readonly userModel,
    private jwtService: JwtService
  ) {

  }

  async create(createAuthDto: CreateAuthDto) {
    let exist = await this.userModel.findOne({ email: createAuthDto.email })
    if (exist) {
      throw new ConflictException("User already exist")
    }
    return this.userModel.create(createAuthDto)
  }

  async login(loginDto: loginDto) {
    let user = await this.userModel.findOne({ email: loginDto.email })
    if (!user) {
      throw new ConflictException("User not found")
    }
    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException("Wrong credentials")
    }
    let payload =
    {
      id: user.id
    }
    return {
      access_token: this.jwtService.sign(payload)
    }

  }


  async findAll() {
    let cached = await this.cachemanager.get('users')
    console.log(cached,"before");
    
    if (cached) {
      return cached
    }
    let users = await this.userModel.find();
   let add =  await this.cachemanager.set('users', JSON.stringify(users))
   console.log(add, "after");
   
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
