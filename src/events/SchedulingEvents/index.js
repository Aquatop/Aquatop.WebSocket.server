import { CompressionTypes } from 'kafkajs';

export default class AquariumEvents {
  constructor(server) {
    this.aquariumSocket = server.of('/scheduling');

    this.initEvents();
  }

  initEvents() {
    this.aquariumSocket.on('connection', client => {
      client.on('CLIENT_INFO', async message => {
        console.log(
          `Scheduling client connected - Name: ${message.params.name}`
        );
      });
    });
  }
}
