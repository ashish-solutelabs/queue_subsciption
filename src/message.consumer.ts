// import { OnQueueActive, Process, Processor } from "@nestjs/bull";
// import { Job } from "bull";




// @Processor('message-queue') 
// export class MessageConsumer {

//     @Process('message-job')
//     readOperationJob(job:Job<unknown>){
//         console.log(job.data)
//         console.log( `${job.id} of type ${job.name} with data ${job.data}`)
//     }
    
//     // @OnQueueActive()
//     // onActive(job: Job) {
//     //     console.log(
//     //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
//     //     );
//     // }
// }
