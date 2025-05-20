// app/controller/markdown.js
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class MarkdownController extends Controller {
    async processMarkdown() {
        const { ctx } = this;
        try {
            const fileName = ctx.request.body.fileName;
            if (!fileName) {
                ctx.body = { success: false, error: '缺少文件名' };
                return;
            }

            // 构建完整的文件路径
            const publicDir = path.join(ctx.app.baseDir, 'public');
            const filePath = path.join(publicDir, 'markdownFiles', fileName);

            // 检查文件是否存在并且是文件而不是目录
            if (!fs.existsSync(filePath)) {
                ctx.body = { success: false, error: '文件不存在' };
                return;
            }

            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                ctx.body = { success: false, error: '不能处理目录' };
                return;
            }

            await ctx.service.markdown.processMarkdown(filePath);
            ctx.body = { success: true };
        } catch (error) {
            ctx.body = { success: false, error: error.message };
        }
    }
}

module.exports = MarkdownController;