export default class Chat {
  private message: string[] = [];
  public readonly time: string = '';
  public readonly isSender: boolean = false;

  constructor(message: string, time: string, isSender: boolean) {
    this.message.push(message);
    this.time = time;
    this.isSender = isSender;
  }

  public addMessage(message: string) {
    this.message.push(message);
  }
}
