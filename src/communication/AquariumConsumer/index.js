export default class Communication {
  constructor(kafka, aquariumSocket) {
    this.kafka = kafka;
    this.aquariumSocket = aquariumSocket;

    this.consumer = this.kafka.consumer({ groupId: 'aquariumSocket-group' });

    this.run();
  }

  async run() {
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'aquarium-websocket' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value);
        const { type, aquarium } = payload;

        switch (type) {
          default:
          // case 'REQUEST_REPORT':
          //   this.monitoringSocket.emit(type, { aquarium });
        }
      },
    });
  }
}
