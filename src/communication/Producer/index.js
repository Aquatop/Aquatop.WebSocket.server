export default class Communication {
  constructor(kafka) {
    this.kafka = kafka;

    this.producer = this.kafka.producer();

    this.run();
  }

  async run() {
    await this.producer.connect();
  }
}
