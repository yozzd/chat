<template>
  <div>
    <Row class="chat-header">
      <div>#{{ data.name }}</div>
    </Row>
    <Row class="chat-list" ref="list">
      <div class="display-table">
        <div v-for="(m, mid) in data.messages" :key="mid" class="display-row">
          <div class="display-column" :class="{ me: m.user.id === $route.query.u}">
            &#60;{{ renderDate(m.createdAt) }}&#62;
          </div>
          <div class="display-column" :class="{ me: m.user.id === $route.query.u}">
            &#60;{{ m.user.name }}&#62;
          </div>
          <div class="display-column" :class="{ me: m.user.id === $route.query.u}">
            {{ m.text }}
          </div>
        </div>
      </div>
    </Row>
    <Row class="input">
      <Form
        ref="form"
        :model="form"
        @submit.native.prevent="handleSend('form')"
      >
        <FormItem prop="message">
          <Input
            v-model="form.message"
            type="text"
            placeholder="Enter your message"
            size="large"
          >
          <Button slot="append" html-type="submit">
            Send
          </Button>
          </Input>
        </FormItem>
      </Form>
    </Row>
  </div>
</template>

<script>
import moment from 'moment';
import errorHandler from '../../apollo/config/errorHandler';
import { CREATE_MESSAGE } from '../../apollo/queries/message';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        message: '',
      },
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.$nextTick(() => this.scrollToBottom());
  },
  methods: {
    handleSend(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$apollo.mutate({
              mutation: CREATE_MESSAGE,
              variables: {
                text: this.form.message,
                room: this.$route.params.rid,
                user: this.$route.query.u,
              },
            });
            if (data.createMessage) {
              this.form.message = '';
            }
            return true;
          } catch (err) {
            this.errors = errorHandler(err);
            return false;
          }
        } else {
          return false;
        }
      });
    },
    renderDate(d) {
      return moment(new Date(d)).format('hh:mm');
    },
    scrollToBottom() {
      this.$refs.list.$el.scrollTop = this.$refs.list.$el.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-list {
  height: 320px;
  overflow-y: scroll;
  padding: 10px 0 10px 5px;
}
.chat-header,
.input {
  height: 40px;
}
.chat-header {
  border-bottom: 1px dashed #999999;
  padding: 0 10px;
  line-height: 40px;
}
.input {
  border-top: 1px dashed #999999;
}
.me {
  font-weight: bold;
}
/deep/ .ivu-input {
  border: 0;
}
/deep/ .ivu-input:hover {
  border-color: transparent;
}
/deep/ .ivu-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0;
}
/deep/ .ivu-input-group-append {
  background-color: #2d8cf0;
  border: 1px solid #2d8cf0;
  color: #ffffff;
}
/deep/ .ivu-form-item {
  margin-bottom: 0;
}
/deep/ .ivu-input-group-append {
  border-radius: 0 !important;
}
</style>
