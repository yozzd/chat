<template>
  <div>
    <Button @click="handleSubmit">Submit</Button>
  </div>
</template>

<script>
import { CREATE_ROOM } from '../apollo/queries/room';

export default {
  methods: {
    async handleSubmit() {
      const { data } = await this.$apollo.mutate({
        mutation: CREATE_ROOM,
        variables: {
          name: 'segfault',
          user: 'yozz',
        },
      });
      console.log(data);
    },
  },
};
</script>
