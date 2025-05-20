// app/service/markdown.js
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime-types');

class MarkdownService extends Service {
    /**
     * 处理 Markdown 文件中的 Base64 图片
     * @param {string} filePath - Markdown 文件绝对路径
     * @returns {string} 处理后的 Markdown 内容
     */
    async processMarkdown(filePath) {
        try {
            // 读取文件内容
            const markdownContent = fs.readFileSync(filePath, 'utf8');

            // 处理 Base64 图片
            const processedContent = this.extractBase64Images(markdownContent);

            // 写回处理后的内容
            fs.writeFileSync(filePath, processedContent);
            return processedContent;
        } catch (error) {
            this.ctx.logger.error('Markdown 处理失败:', error);
            throw new Error('MARKDOWN_PROCESS_ERROR');
        }
    }

    /**
     * 提取并转换 Base64 图片为本地文件
     * @param {string} content - Markdown 原始内容
     * @returns {string} 替换后的内容
     */
    extractBase64Images(content) {
        const base64Regex = /!\[(.*?)\]\((data:image\/[a-zA-Z+]+;base64,([^)]+))\)/g;

        return content.replace(base64Regex, (match, altText, base64Str) => {
            try {
                // 分离 MIME 类型和 Base64 数据
                const [header, data] = base64Str.split(';base64,');
                const mimeType = header.replace('data:', '').split(';')[0];

                // 获取文件扩展名
                const extension = mime.extension(mimeType) || 'bin';
                if (extension === 'bin') {
                    this.ctx.logger.warn('未知的图片类型:', mimeType);
                }

                // 解码图片
                const imageBuffer = Buffer.from(data, 'base64');
                if (imageBuffer.length === 0) {
                    this.ctx.logger.error('Base64 解码失败:', base64Str.substring(0, 20));
                    return match;
                }

                // 生成存储路径
                const hash = crypto.createHash('md5').update(imageBuffer).digest('hex');
                const fileName = `${hash}.${extension}`;
                const savePath = path.join(this.config.baseDir, 'app/public/markdown-images', fileName);

                // 确保目录存在
                fs.mkdirSync(path.dirname(savePath), { recursive: true });

                // 保存图片（如果不存在）
                if (!fs.existsSync(savePath)) {
                    fs.writeFileSync(savePath, imageBuffer);
                    this.ctx.logger.info('保存新图片:', fileName);
                }

                // 返回 Web 可访问路径
                return `![${altText}](/mardownImg/public/markdown-images/${fileName})`;
            } catch (err) {
                this.ctx.logger.error('图片处理失败:', err);
                return match; // 返回原始内容保证文档不损坏
            }
        });
    }
}

// 必须导出！！！
module.exports = MarkdownService;