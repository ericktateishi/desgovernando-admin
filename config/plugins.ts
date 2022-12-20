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
  wysiwyg: {
    enabled: true,
    resolve: "./src/plugins/wysiwyg",
  },
});