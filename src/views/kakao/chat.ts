export interface ChattingUser {
  uid: string;
  displayName: string;
  photoURL: string;
}

export default class Chat {
  public readonly time: string = '';
  public readonly isSender: boolean = false;
  public readonly user: ChattingUser;

  private message: string[] = [];

  constructor(message: string, time: string, chattingUser: ChattingUser) {
    this.message.push(message);
    this.time = time;
    // this.isSender = isSender;
    this.user = chattingUser;
  }

  public addMessage(message: string) {
    this.message.push(message);
  }
}
