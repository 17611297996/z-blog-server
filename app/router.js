/**
 * @param {Egg.Application} app - egg applicat..
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/markdown-files', controller.article.getFiles);
  router.get('/api/markdown-content/:filename', controller.article.getContent);
  router.get('/api/basicInfo', controller.article.getBasicInfo);
  router.get('/api/category', controller.article.getCategory);
  router.post('/process-markdown', controller.markdown.processMarkdown);
};
