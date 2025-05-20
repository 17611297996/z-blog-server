// app/service/markdown.js
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class MarkdownService extends Service {
    async processMarkdown(filePath) {
        try {
            // 读取 Markdown 文件
            const markdownContent = fs.readFileSync(filePath, 'utf8');

            // 提取 Base64 图片并转换为文件
            const processedMarkdown = this.extractBase64Images(markdownContent, filePath);

            // 保存处理后的 Markdown 文件
            fs.writeFileSync(filePath, processedMarkdown);

            return processedMarkdown;
        } catch (error) {
            throw error;
        }
    }

    extractBase64Images(markdownContent, filePath) {
        const base64Regex = /!\[.*?\]\((data:image\/[a-zA-Z]+;base64,.*?)\)/gi;

        return markdownContent.replace(base64Regex, (match, base64Str) => {
            const base64Data = base64Str.replace('data:image/', '').replace(';base64,', '');
            const imageType = base64Str.split(';')[0].split('/')[1];
            const imageBuffer = Buffer.from(base64Data, 'base64');

            // 创建 images 目录（如果不存在）
            const imageDir = path.join(path.dirname(filePath), 'images');
            if (!fs.existsSync(imageDir)) {
                fs.mkdirSync(imageDir);
            }

            // 计算图片的哈希值以确保唯一性
            const hash = crypto.createHash('md5').update(imageBuffer).digest('hex');
            const fileName = `${hash}.${imageType}`;
            const imagePath = path.join(imageDir, fileName);

            // 检查图片是否已经存在
            if (!fs.existsSync(imagePath)) {
                // 保存图片文件
                fs.writeFileSync(imagePath, imageBuffer);
            }

            // 返回替换后的 Markdown 图片引用
            const relativePath = path.relative(path.dirname(filePath), imagePath);
            return `![${match.split(']')[0].substring(2)}](${relativePath})`;
        });
    }
}

module.exports = MarkdownService;