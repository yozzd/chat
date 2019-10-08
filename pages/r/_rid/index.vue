<template>
  <div>
    <Row type="flex" justify="center" align="middle" class="chatroom">
      <Col span="8" class="chat"><Chat :data="showRoom" /></Col>
      <Col span="3" class="users"><Users :data="showRoom.users" /></Col>
    </Row>
  </div>
</template>

<script>
import {
  SHOW_ROOM,
  CREATE_USER_SUBSCRIPTION,
} from '../../../apollo/queries/room';
import { CREATE_MESSAGE_SUBSCRIPTION } from '../../../apollo/queries/message';
import Chat from '../../../components/chat/index.vue';
import Users from '../../../components/users/index.vue';

export default {
  components: { Chat, Users },
  data() {
    return {
      showRoom: {
        users: [],
        messages: [],
      },
    };
  },
  apollo: {
    showRoom: {
      query: SHOW_ROOM,
      variables() {
        return {
          id: this.$route.params.rid,
        };
      },
      subscribeToMore: [
        {
          document: CREATE_MESSAGE_SUBSCRIPTION,
          updateQuery: (previousData, { subscriptionData }) => ({
            showRoom: {
              ...previousData.showRoom,
              messages: [
                ...previousData.showRoom.messages,
                subscriptionData.data.createdMessage,
              ],
            },
          }),
        },
        {
          document: CREATE_USER_SUBSCRIPTION,
          updateQuery: (previousData, { subscriptionData }) => ({
            showRoom: {
              ...previousData.showRoom,
              users: [
                ...previousData.showRoom.users,
                subscriptionData.data.createdUser,
              ],
            },
          }),
        },
      ],
    },
  },
};
</script>

<style scoped>
.chatroom {
  height: calc(100vh);
}
.chat {
  border: 1px dashed #999999;
}
.users {
  border-top: 1px dashed #999999;
  border-right: 1px dashed #999999;
  border-bottom: 1px dashed #999999;
}
.chat,
.users {
  height: 400px;
}
</style>
