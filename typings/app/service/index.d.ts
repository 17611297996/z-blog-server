// This file is created by egg-ts-helper@2.1.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFs = require('../../../app/service/fs');
import ExportMarkdown = require('../../../app/service/markdown');

declare module 'egg' {
  interface IService {
    fs: AutoInstanceType<typeof ExportFs>;
    markdown: AutoInstanceType<typeof ExportMarkdown>;
  }
}
