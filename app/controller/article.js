const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class ArticleController extends Controller {
    async getBasicInfo() {
        const { ctx } = this;
        const folderPath = path.join(this.app.baseDir, 'public', 'config');

        try {
            if (!fs.existsSync(folderPath)) {
                ctx.status = 404;
                ctx.body = { code: 404, msg: '文件夹不存在', data: null };
                return;
            }

            const files = fs.readdirSync(folderPath);
            const articles = [];

            for (const file of files) {
                if (file.endsWith('.md')) {
                    const filePath = path.join(folderPath, file);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const frontMatter = this.parseFrontMatter(fileContent);

                    articles.push({
                        filename: file,
                        userName: frontMatter.userName,
                        drip: frontMatter.drip || [],
                    });
                }
            }
            ctx.body = {
                code: 200,
                msg: "读取成功",
                data: articles,
            };
        } catch (err) {
            console.error('Error reading folder:', err);
            ctx.status = 500;
            ctx.body = { code: 500, msg: '无法读取文件夹', data: null };
        }
    }
    async getFiles() {
        const { ctx } = this;
        const name = ctx.query.name; // 获取到查询参数 name
        const tag = ctx.query.tag;
        const folderPath = path.join(this.app.baseDir, 'public', 'markdownFiles');

        try {
            if (!fs.existsSync(folderPath)) {
                ctx.status = 404;
                ctx.body = { code: 404, msg: '文件夹不存在', data: null };
                return;
            }

            const files = fs.readdirSync(folderPath);
            const articles = [];

            for (const file of files) {
                if (file.endsWith('.md')) {
                    const filePath = path.join(folderPath, file);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const frontMatter = this.parseFrontMatter(fileContent);

                    articles.push({
                        filename: file,
                        title: frontMatter.title || '无标题',
                        description: frontMatter.description || '无描述',
                        date: frontMatter.date || '无日期',
                        tags: frontMatter.tags || [],
                        sort: frontMatter.sort || 1
                    });
                }
            }

            // 按标题模糊搜索
            let filteredArticles = articles.filter(article => {
                if (!name) return true; // 如果没有搜索词，则返回所有文章
                return article.title.toLowerCase().includes(name.toLowerCase());
            });

            // 按标签下标1精准搜索
            if (tag) {
                filteredArticles = filteredArticles.filter(article => {
                    if (article.tags.length > 2) { // 确保标签数组长度大于1
                        return article.tags[2].toLowerCase() === tag.toLowerCase();
                    }
                    return false;
                });
            }
            ctx.body = {
                code: 200,
                msg: "读取成功",
                data: filteredArticles,
            };
        } catch (err) {
            console.error('Error reading folder:', err);
            ctx.status = 500;
            ctx.body = { code: 500, msg: '无法读取文件夹', data: null };
        }
    }

    async getContent() {
        const { ctx } = this;
        const filename = ctx.params.filename;
        console.log(ctx.params, '===>')
        const folderPath = path.join(this.app.baseDir, 'public', 'markdownFiles');
        const filePath = path.join(folderPath, filename);
        console.log(filePath, 'filePath')
        try {
            if (!fs.existsSync(filePath)) {
                ctx.status = 404;
                ctx.body = { code: 404, msg: '文件不存在', data: null };
                return;
            }

            const data = fs.readFileSync(filePath, 'utf8');
            const contentWithoutFrontMatter = data.replace(/^---\s*(?:.*?\s*)*?---\s*/s, '');
            const md = require('markdown-it')();
            //const htmlContent = md.render(contentWithoutFrontMatter);
            ctx.body = { content: contentWithoutFrontMatter };

        } catch (err) {
            console.error('Error reading file:', err);
            ctx.status = 500;
            ctx.body = { code: 500, msg: '无法读取文件', data: null };
        }
    }

    parseFrontMatter(content) {
        const frontMatterRegex = /^---\s*(?:.*?\s*)*?---/s;
        const match = content.match(frontMatterRegex);
        if (match) {
            try {
                return yaml.load(match[0].slice(3, -3));
            } catch (err) {
                console.error('Error parsing front matter:', err);
                return {};
            }
        }
        return {};
    }
}

module.exports = ArticleController;