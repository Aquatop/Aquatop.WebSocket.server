export default class Communication {
  constructor(kafka, monitoringSocket) {
    this.kafka = kafka;
    this.monitoringSocket = monitoringSocket;

    this.consumer = this.kafka.consumer({ groupId: 'monitoringSocket-group' });

    this.run();
  }

  async run() {
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'monitoring-websocket' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value);
        const { type, aquarium } = payload;

        switch (type) {
          case 'REQUEST_REPORT':
            this.monitoringSocket.emit(type, { aquarium });
        }
      },
    });
  }
}
