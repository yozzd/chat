<template>
  <div>
    <Row class="user-header">
      <div>Users</div>
    </Row>
    <Row class="user-list">
      <div class="display-table">
        <div v-for="(u, uid) in data" :key="uid" class="display-row">
          <div class="display-column">
            {{ u.name }}
          </div>
        </div>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-list {
  height: 360px;
  padding: 10px 0 10px 5px;
}
.user-header {
  height: 40px;
}
.user-header {
  border-bottom: 1px dashed #999999;
  padding: 0 10px;
  line-height: 40px;
}
</style>
