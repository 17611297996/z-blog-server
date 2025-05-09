const fs = require('fs');
const Service = require('egg').Service;

class FsService extends Service {
    async readdir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
    }

    async readFile(path, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, encoding, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = FsService;