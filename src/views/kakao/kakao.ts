import { Vue, Component } from 'vue-property-decorator';
import Chat from './chat';

@Component
export default class Kakao extends Vue {
  private inputMessage: string = '';
  private chatList: Chat[] = [];

  private get inputMessageLength(): boolean {
    return this.inputMessage.length === 0 ? false : true;
  }

  private clickSend() {
    if (this.inputMessage.replace(/\n/gi, '').length === 0) {
      return;
    }
    // 1. chatList size === 0 새로운거니까 추가!
    // 2. 이전 메세지가 '나' // 시간이 1분이 지났는가? 안지났으면 붙여 지났으면 새로만들어.
    // 3. 이전메세지가 내가 아니면 새로 만들어.

    if (this.chatList.length === 0) {
      this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));
    } else {
      if (!this.chatList[this.chatList.length - 1].isSender) {
        this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));
      } else {
        if (this.chatList[this.chatList.length - 1].time === this.getDate()) {
          this.chatList[this.chatList.length - 1].addMessage(this.inputMessage);
        } else {
          this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));
        }
      }
    }
    this.inputMessage = '';
    setTimeout(this.sendReply, 3000);
  }

  private getDate(): string {
    const date = new Date();
    let hour = date.getHours();
    let time: string = hour < 12 ? '오전' : '오후';
    hour = hour < 12 ? hour : hour - 12;
    time = time + hour.toString();
    const miniute = date.getMinutes();
    time = miniute < 10 ? time + ':' + '0' + miniute : time + ':' + miniute;
    return time;
  }

  private sendReply() {
    if (this.chatList[this.chatList.length - 1].isSender) {
      this.chatList.push(new Chat('answer', this.getDate(), false));
    } else {
      if (this.chatList[this.chatList.length - 1].time === this.getDate()) {
        this.chatList[this.chatList.length - 1].addMessage('answer');
      } else {
        this.chatList.push(new Chat('answer', this.getDate(), false));
      }
    }
  }
}
