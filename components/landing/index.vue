<template>
  <div>
    <Row type="flex" justify="space-around" align="middle" class="landing">
      <Col span="6">
      <Form
        ref="form"
        :model="form"
        :rules="rules"
        @submit.native.prevent="
          joinRoom
            ? handleJoin('form')
            : createRoom
              ? handleCreate('form')
              : handleConfirm('form')
        "
      >
        <FormItem prop="userName">
          <Input
            v-model="form.userName"
            type="text"
            placeholder="Enter your username"
            size="large"
          >
          </Input>
        </FormItem>
        <FormItem prop="roomName">
          <Input
            v-model="form.roomName"
            type="text"
            placeholder="Enter room id"
            size="large"
            @on-change="handleOnChange"
          >
          </Input>
        </FormItem>
        <Alert v-if="cStatus" :type="cType">
          {{ cText }}
        </Alert>
        <div v-if="errors.length">
          <Alert
            v-for="(error, errorIndex) in errors"
            :key="errorIndex"
            type="error"
          >
            {{ error }}
          </Alert>
        </div>
        <FormItem>
          <Button type="primary" html-type="submit">
            {{ joinRoom ? 'JOIN?' : createRoom ? 'CREATE' : 'CONFIRM' }}
          </Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import errorHandler from '../../apollo/config/errorHandler';
import { CONFIRM_ROOM, CREATE_ROOM, JOIN_ROOM } from '../../apollo/queries/room';

export default {
  data() {
    return {
      createRoom: false,
      joinRoom: false,
      cStatus: false,
      cText: '',
      cType: '',
      roomId: '',
      form: {
        userName: '',
        roomName: '',
      },
      rules: {
        userName: [
          {
            required: true,
            message: 'Required',
            trigger: 'blur',
          },
        ],
        roomName: [
          {
            required: true,
            message: 'Required',
            trigger: 'blur',
          },
        ],
      },
      errors: '',
    };
  },
  methods: {
    handleOnChange() {
      this.joinRoom = false;
      this.createRoom = false;
      this.cStatus = false;
      this.cText = '';
    },
    handleConfirm(form) {
      this.joinRoom = false;
      this.createRoom = false;
      this.errors = '';
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$apollo.mutate({
              mutation: CONFIRM_ROOM,
              variables: {
                name: this.form.roomName,
              },
            });
            if (data.confirmRoom) {
              this.roomId = data.confirmRoom.id;
              this.joinRoom = true;
              this.createRoom = false;
              this.cStatus = true;
              this.cText = 'Room confirmed, Join?';
              this.cType = 'success';
            } else {
              this.joinRoom = false;
              this.createRoom = true;
              this.cStatus = true;
              this.cText = 'Room doesn\'t exist, Create?';
              this.cType = 'error';
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
    handleCreate(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$apollo.mutate({
              mutation: CREATE_ROOM,
              variables: {
                name: this.form.roomName,
                user: this.form.userName,
              },
            });
            if (data.createRoom) {
              this.$router.push({ path: `/r/${data.createRoom.id}/`, query: { u: data.createRoom.user } });
            }
            return true;
          } catch (err) {
            this.errors = errorHandler(err);
            this.handleOnChange();
            return false;
          }
        } else {
          return false;
        }
      });
    },
    handleJoin(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$apollo.mutate({
              mutation: JOIN_ROOM,
              variables: {
                id: this.roomId,
                user: this.form.userName,
              },
            });
            if (data.joinRoom) {
              this.$router.push({ path: `/r/${data.joinRoom.id}/`, query: { u: data.joinRoom.user } });
            }
            return true;
          } catch (err) {
            this.errors = errorHandler(err);
            this.handleOnChange();
            return false;
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.landing {
  height: calc(100vh);
}
/deep/ .ivu-input-group-large .ivu-input {
  height: 38px;
}
</style>
