import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from './app.module';

import isDocker = require('is-docker');
import * as dockerIpTools from "docker-ip-get";

async function bootstrap() {

  if(!process.env.REDIS_URL){
    console.error("Missing redis configuration! Fatal error.");
    process.exit(-1);
  }

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });


  // Figure out our external URL
  let servePort = process.env.HTTP_PORT||3000;
  let serveHost = "localhost";
  if(isDocker()){
    serveHost = await dockerIpTools.getContainerIp();
  }
  let serveURL = "http://"+serveHost;
  if(servePort!=80) serveURL+=':'+servePort;


  await app.startAllMicroservicesAsync();
  console.log('Microservice is listening');
  await app.listen(servePort);

  console.log('============================================');
  console.log("Server listening on "+serveURL);
  console.log('============================================');


}
bootstrap();
