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
        const { type, aquarium, pin } = payload;

        switch (type) {
          case 'DISPLAY_PIN':
            this.aquariumSocket.emit(type, { aquarium, pin });
          case 'REQUEST_TURN_ON_LIGHTS':
          case 'REQUEST_TURN_OFF_LIGHTS':
          case 'REQUEST_FEED_FISHES':
          case 'REQUEST_SWAP_WATER':
            this.aquariumSocket.emit(type, { aquarium });
          default:
        }
      },
    });
  }
}
