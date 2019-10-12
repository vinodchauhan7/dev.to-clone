"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const fs = require("fs");
const util_1 = require("util");
exports.fsMkdir = util_1.promisify(fs.mkdir);
exports.fsWriteFile = util_1.promisify(fs.writeFile);
function parsePath(targetPath) {
    const directories = [];
    const parsedPath = path.parse(path.resolve(targetPath));
    const splitPath = parsedPath.dir.split(path.sep);
    if (parsedPath.root === "/") {
        splitPath[0] = `/${splitPath[0]}`;
    }
    splitPath.reduce((previous, next) => {
        const directory = path.join(previous, next);
        directories.push(directory);
        return path.join(directory);
    });
    return directories;
}
exports.parsePath = parsePath;
function mkdirRecursive(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const directories = parsePath(filePath);
        for (const directory of directories) {
            try {
                yield exports.fsMkdir(directory);
            }
            catch (err) {
                if (err.code !== "EEXIST") {
                    throw err;
                }
            }
        }
    });
}
exports.mkdirRecursive = mkdirRecursive;
function mkdirRecursiveSync(filePath) {
    const directories = parsePath(filePath);
    for (const directory of directories) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
    }
}
exports.mkdirRecursiveSync = mkdirRecursiveSync;
function outputFile(filePath, fileContent) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.fsWriteFile(filePath, fileContent);
        }
        catch (err) {
            if (err.code !== "ENOENT") {
                throw err;
            }
            yield mkdirRecursive(filePath);
            yield exports.fsWriteFile(filePath, fileContent);
        }
    });
}
exports.outputFile = outputFile;
function outputFileSync(filePath, fileContent) {
    try {
        fs.writeFileSync(filePath, fileContent);
    }
    catch (e) {
        if (e.code !== "ENOENT") {
            throw e;
        }
        mkdirRecursiveSync(filePath);
        fs.writeFileSync(filePath, fileContent);
    }
}
exports.outputFileSync = outputFileSync;
