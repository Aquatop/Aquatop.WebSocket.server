import io from 'socket.io';
import { Kafka, logLevel } from 'kafkajs';

import KafkaProducer from './communication/Producer';

import MonitoringEvents from './events/MonitoringEvents';
import MonitoringConsumer from './communication/MonitoringConsumer';

import AquariumEvents from './events/AquariumEvents';
import AquariumConsumer from './communication/AquariumConsumer';

class App {
  constructor() {
    this.server = io();

    this.kafka = new Kafka({
      clientId: 'websocket',
      brokers: ['localhost:9092'],
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
  }
}

export default new App().server;
