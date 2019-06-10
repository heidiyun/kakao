import { Vue, Component } from 'vue-property-decorator';
import Chat from './chat';
import firebase from 'firebase';
import firebaseConfig from '@/firebaseConfig';
import uuid from 'uuid/v4';
import _ from 'lodash';

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const firestore = firebase.firestore();
const chat = firestore.collection('/chat');

@Component
export default class Kakao extends Vue {
  private inputMessage: string = '';
  private chatList: Chat[] = [];
  private user!: firebase.User;

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

    // if (this.chatList.length === 0) {
    //   this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));
    // } else {
    //   if (!this.chatList[this.chatList.length - 1].isSender) {
    //     this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));
    //   } else {
    //     if (this.chatList[this.chatList.length - 1].time === this.getDate()) {
    //       this.chatList[this.chatList.length - 1].addMessage(this.inputMessage);
    //     } else {
    //       this.chatList.push(new Chat(this.inputMessage, this.getDate(), true));

    //     }
    //   }
    // }

    chat.doc(uuid()).set({
      message: this.inputMessage,
      date: this.getDate(),
      user: {
        displayName: this.user.displayName ? this.user.displayName : '-',
        photoURL: this.user.photoURL ? this.user.photoURL : '-',
        uid: this.user.uid
      }
    });
    this.inputMessage = '';
    // setTimeout(this.sendReply, 3000);
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
    // if (this.chatList[this.chatList.length - 1].isSender) {
    //   this.chatList.push(new Chat('answer', this.getDate(), false));
    // } else {
    //   if (this.chatList[this.chatList.length - 1].time === this.getDate()) {
    //     this.chatList[this.chatList.length - 1].addMessage('answer');
    //   } else {
    //     this.chatList.push(new Chat('answer', this.getDate(), false));
    //   }
    // }
  }

  private mounted() {
    console.log(auth.currentUser);

    // Progress Bar
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      } else {
        console.log(user);
        this.user = user;
        console.log(this.user);
        // TODO

        chat.onSnapshot((changes) => {
          const docs = changes.docChanges();

          _.forEach(docs, (doc) => {
            const source = doc.doc.data();
            console.log(source);

            const message = new Chat(source.message, this.getDate(), {
              displayName: source.user.displayName,
              photoURL: source.user.photoURL,
              uid: source.user.uid
            });
            this.chatList.push(message);
            // new Chat(source.message, source.date, source.user);
          });
          // console.log(docs);
        });
      }
    });

    // firebase init
    // console.log(app);
    // 만약 유저가 없으면, 로그인을 시킨다.
    // 유저가 있으면 채팅창을 띄운다
  }
}
