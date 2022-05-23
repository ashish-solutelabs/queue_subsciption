import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  
  @Field()
  @IsEmail()
  email:string

  @Field()
  @IsString()
  firstname:string

  @Field()
  @IsString()
  lastname:string

  @Field()
  @IsString()
  password:string
}
