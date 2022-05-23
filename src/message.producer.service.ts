import { InjectQueue } from "@nestjs/bull";
import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MessageServiceProducer{

    constructor(@InjectQueue('message-queue') private messageQueue:Queue ){}


    async message(message:string){
        for(let i= 1;i<100;i++)
            {
                await this.messageQueue.add('message-job',{
                message:i,//i
             })
        }
    }
}