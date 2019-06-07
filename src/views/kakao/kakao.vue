<template>
  <div class="container">
    <div class="kakao-layout">
      <div class="profile-bar">
        <div class="blank"></div>
        <div class="user-info">
          <div class="profile-photo"></div>
          <div class="user-name">김민지</div>
        </div>
      </div>

      <div class="chat-list">
        <div
          class="chat-item"
          v-for="(chat,i) in chatList"
          :key="i"
          :type="chat.isSender ? 'sender' : 'receiver'"
        >
          <div class="profile-photo"></div>
          <div class="chat-info">
            <div class="user-name">김민지</div>
            <div class="message" v-for="(msg, j) in chat.message" :key="j">
              <div class="message-content">{{msg}}</div>
              <div class="send-time" v-if="j === chat.message.length - 1">{{chat.time}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="input-layout">
        <div class="input-menu"></div>
        <div class="input-window">
          <textarea class="input-content" @keyup.enter="clickSend" v-model="inputMessage"></textarea>
          <div class="send-button" :clickable="inputMessageLength" @click="clickSend">전송</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './kakao.scss';
</style>

<script src="./kakao.ts" >
</script>
