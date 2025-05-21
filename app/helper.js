// app/helper.js。
const fs = require('fs');
const path = require('path');

exports.readFile = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.writeFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, err => {
            if (err) reject(err);
            else resolve();
        });
    });
};