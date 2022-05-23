import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: "user"
})
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id:number

  @Field()
  @Column()
  email:string

  @Field()
  @Column()
  firstname:string

  @Field()
  @Column()
  lastname:string

  @Field()
  @Column()
  password:string

  // @Field({nullable:true})
  // @Column()
  // type?:string
}
