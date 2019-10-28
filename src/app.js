import io from 'socket.io';
import { Kafka, logLevel } from 'kafkajs';

import KafkaProducer from './communication/Producer';

import MonitoringEvents from './events/MonitoringEvents';
import MonitoringConsumer from './communication/MonitoringConsumer';

import AquariumEvents from './events/AquariumEvents';
import AquariumConsumer from './communication/AquariumConsumer';

import SchedulingEvents from './events/SchedulingEvents';
import SchedulingConsumer from './communication/SchedulingConsumer';

class App {
  constructor() {
    this.server = io();

    this.kafka = new Kafka({
      clientId: 'websocket',
      brokers: [process.env.KAFKA_URL],
      logLevel: logLevel.WARN,
    });

    this.producer = new KafkaProducer(this.kafka).producer;

    this.monitoringSocket = new MonitoringEvents(
      this.server,
      this.producer
    ).monitoringSocket;
    new MonitoringConsumer(this.kafka, this.monitoringSocket);

    this.aquariumSocket = new AquariumEvents(
      this.server,
      this.producer
    ).aquariumSocket;
    new AquariumConsumer(this.kafka, this.aquariumSocket);

    this.schedulingSocket = new SchedulingEvents(this.server).schedulingSocket;
    new SchedulingConsumer(this.kafka, this.schedulingSocket);
  }
}

export default new App().server;
