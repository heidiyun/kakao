import { ChattingUser } from './chat';

export default class ChattingMessage {
  public readonly message: string;
  public readonly date: string;
  public user: ChattingUser;
  constructor(message: string, date: string, user: firebase.User) {
    this.message = message;
    this.date = date;
    this.user = {
      photoURL: user.photoURL ? user.photoURL : '-',
      displayName: user.displayName ? user.displayName : '-',
      uid: user.uid
    };
  }
}
