import { CompressionTypes } from 'kafkajs';

export default class AquariumEvents {
  constructor(server, producer) {
    this.aquariumSocket = server.of('/aquarium');
    this.producer = producer;

    this.initEvents();
  }

  initEvents() {
    this.aquariumSocket.on('connection', client => {
      client.on('CLIENT_INFO', async message => {
        const response = message;
        response.type = 'CREATE_AQUARIUM';

        await this.producer.send({
          topic: 'websocket-aquarium',
          compression: CompressionTypes.GZIP,
          messages: [{ value: JSON.stringify(response) }],
        });
      });
    });
  }
}
