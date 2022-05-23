import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MessageConsumer } from './message.consumer';
import { MessageServiceProducer } from './message.producer.service';
// import { SubModule } from './sub/sub.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST, 
    port: +process.env.DATABASE_PORT, 
    username: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'], 
    synchronize: true,
  }) ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths:['../**/*.graphql'],
      // subscriptions: {
      //   'graphql-ws': true
      // },
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port: 80
      }
    }),
    BullModule.registerQueue({
      name:'message-queue'
    }),
    UserModule
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}