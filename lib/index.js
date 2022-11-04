"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const ipfs = require("ipfs-storage");

module.exports = {
  init(config) {
    return {
      uploadStream(file) {
        return new Promise(async (resolve, reject) => {
          try {
            const url = await ipfs.uploadFile[config.defaultStorage](
              config[config.defaultStorage],
              file
            );
            file.url = url;
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
      upload(file) {
        return new Promise(async (resolve, reject) => {
          try {
            const url = await ipfs.uploadFile[config.defaultStorage](
              config[config.defaultStorage],
              file
            );
            file.url = url;
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
      delete(file) {
        return new Promise(async (resolve, reject) => {
          try {
            await ipfs.deleteFile[config.defaultStorage](
              config[config.defaultStorage],
              file
            );
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      },
    };
  },
};
