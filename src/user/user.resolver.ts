import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';
import { filter } from 'rxjs';

@Resolver(() => User)
export class UserResolver {

  private pubSub: PubSub

  constructor(private readonly userService: UserService) {
    this.pubSub = new PubSub();
  }
  
  
  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput:CreateUserInput) {
    const user = await this.userService.createUser(createUserInput);
    await this.pubSub.publish('userAdded',{userAdded:user} )
    return user
  }

  @Subscription((returns) => User,{ 
    filter:(payload,variables) => payload.userAdded.email == variables.email,
  })  
  userAdded(@Args('email') email: string){
    console.log('-----------')
    return this.pubSub.asyncIterator('userAdded')
  }
}
