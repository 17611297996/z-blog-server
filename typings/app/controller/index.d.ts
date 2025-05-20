// This file is created by egg-ts-helper@2.1.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportArticle = require('../../../app/controller/article');
import ExportHome = require('../../../app/controller/home');
import ExportMarkdown = require('../../../app/controller/markdown');

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    home: ExportHome;
    markdown: ExportMarkdown;
  }
}
