module.exports = () => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        topic: {
          field: 'slug',
          references: 'title',
        },
        serie: {
          field: 'slug',
          references: 'name',
        },
      },
    },
  },
  wysiwyg: {
    enabled: true,
    resolve: "./src/plugins/wysiwyg",
  },
});