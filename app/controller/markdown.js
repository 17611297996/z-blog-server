// app/controller/markdown.js
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class MarkdownController extends Controller {
    // async processMarkdown() {
    //     const { ctx } = this;
    //     try {
    //         const fileName = ctx.request.body.fileName;
    //         if (!fileName) {
    //             ctx.body = { success: false, error: '缺少文件名' };
    //             return;
    //         }

    //         // 构建完整的文件路径
    //         const publicDir = path.join(ctx.app.baseDir, 'public');
    //         const filePath = path.join(publicDir, 'markdownFiles', fileName);

    //         // 检查文件是否存在并且是文件而不是目录文件夹
    //         if (!fs.existsSync(filePath)) {
    //             ctx.body = { success: false, error: '文件不存在' };
    //             return;
    //         }

    //         const stats = fs.statSync(filePath);
    //         if (stats.isDirectory()) {
    //             ctx.body = { success: false, error: '不能处理目录!' };
    //             return;
    //         }

    //         await ctx.service.markdown.processMarkdown(filePath);
    //         ctx.body = { success: true };
    //     } catch (error) {
    //         ctx.body = { success: false, error: error.message };
    //     }
    // }
    async processMarkdown() {
        const { ctx } = this;

        try {
            // 1. 参数校验增强
            const { fileName } = ctx.request.body;
            if (!fileName || path.extname(fileName) !== '.md') {
                ctx.body = { success: false, error: '无效的 Markdown 文件名' };
                return;
            }

            // 2. 安全路径处理
            const safeFileName = path.basename(fileName); // 防御路径遍历攻击
            const markdownDir = path.join(ctx.app.baseDir, 'public/markdownFiles');
            const filePath = path.join(markdownDir, safeFileName);

            // 3. 文件校验优化
            if (!fs.existsSync(filePath)) {
                ctx.status = 404;
                ctx.body = { success: false, error: `文件 ${safeFileName} 不存在` };
                return;
            }

            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                ctx.status = 400;
                ctx.body = { success: false, error: '不支持处理目录' };
                return;
            }

            // 4. 处理并返回结果
            const processedContent = await ctx.service.markdown.processMarkdown(filePath);

            ctx.body = {
                success: true,
                data: {
                    content: processedContent,
                    webPath: `/markdownFiles/${safeFileName}` // 前端界面可访问路径
                }
            };

        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                error: '文件处理失败',
                detail: error.message
            };
            ctx.logger.error('Markdown 处理异常:', error);
        }
    }
}

module.exports = MarkdownController;