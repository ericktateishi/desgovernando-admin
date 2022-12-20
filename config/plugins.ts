module.exports = () => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        topic: {
          field: 'slug',
          references: 'title',
        },
      },
    },
  },
});