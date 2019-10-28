export default class Communication {
  constructor(kafka, schedulingSocket) {
    this.kafka = kafka;
    this.schedulingSocket = schedulingSocket;

    this.consumer = this.kafka.consumer({ groupId: 'schedulingSocket-group' });

    this.run();
  }

  async run() {
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: 'scheduling-websocket' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value);
        const { type, aquarium } = payload;

        switch (type) {
          case 'REQUEST_FEED_FISHES':
            this.schedulingSocket.emit(type, { aquarium });
            break;
          case 'REQUEST_TURN_ON_LIGHTS':
            this.schedulingSocket.emit(type, { aquarium });
            break;
          case 'REQUEST_TURN_OFF_LIGHTS':
            this.schedulingSocket.emit(type, { aquarium });
            break;
        }
      },
    });
  }
}
