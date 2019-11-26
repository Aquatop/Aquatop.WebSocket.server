import { CompressionTypes } from 'kafkajs';

export default class SchedulingEvents {
  constructor(server) {
    this.schedulingSocket = server.of('/scheduling');

    this.initEvents();
  }

  initEvents() {
    this.schedulingSocket.on('connection', client => {
      client.on('CLIENT_INFO', async message => {
        console.log(
          `Scheduling client connected - Name: ${message.params.name}`
        );
      });
    });
  }
}
