import { CompressionTypes } from 'kafkajs';

export default class MonitoringEvents {
  constructor(server, producer) {
    this.monitoringSocket = server.of('/monitoring');
    this.producer = producer;

    this.initEvents();
  }

  initEvents() {
    this.monitoringSocket.on('connection', client => {
      client.on('CLIENT_INFO', async message => {
        const response = message;
        response.type = 'CREATE_AQUARIUM';

        await this.producer.send({
          topic: 'websocket-monitoring',
          compression: CompressionTypes.GZIP,
          messages: [{ value: JSON.stringify(response) }],
        });
      });

      client.on('RESPOND_REPORT', async message => {
        const response = message;
        response.type = 'UPDATE_AQUARIUM';

        await this.producer.send({
          topic: 'websocket-monitoring',
          compression: CompressionTypes.GZIP,
          messages: [{ value: JSON.stringify(response) }],
        });
      });
    });
  }
}
