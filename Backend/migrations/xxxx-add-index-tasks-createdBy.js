// migrations/xxxx-add-index-tasks-createdBy.js
module.exports = {
  async up(db) {
    await db.collection('tasks').createIndex({ createdBy: 1 });
  },
  async down(db) {
    await db.collection('tasks').dropIndex('createdBy_1');
  },
};