"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const chalk = require("chalk");
const execa_1 = __importDefault(require("execa"));
const logTransformer = require("strong-log-transformer");
const children = new Set();
const colorWheel = ["cyan", "magenta", "blue", "yellow", "green", "red"];
const NUM_COLORS = colorWheel.length;
let currentColor = 0;
function spawnStreaming(command, args = [], opts, prefix) {
    const options = {
        ...opts,
        stdio: ["ignore", "pipe", "pipe"]
    };
    const spawned = spawnProcess(command, args, options);
    const stdoutOpts = {};
    const stderrOpts = {};
    if (prefix) {
        const colorName = colorWheel[currentColor % NUM_COLORS];
        const color = chalk[colorName];
        currentColor += 1;
        stdoutOpts.tag = `${color.bold(prefix)}:`;
        stderrOpts.tag = `${color(prefix)}:`;
    }
    if (children.size > process.stdout.listenerCount("close")) {
        process.stdout.setMaxListeners(children.size);
        process.stderr.setMaxListeners(children.size);
    }
    spawned.stdout.pipe(logTransformer(stdoutOpts)).pipe(process.stdout);
    spawned.stderr.pipe(logTransformer(stderrOpts)).pipe(process.stderr);
    return wrapError(spawned);
}
exports.spawnStreaming = spawnStreaming;
function getChildProcessCount() {
    return children.size;
}
exports.getChildProcessCount = getChildProcessCount;
function getExitCode(result) {
    if (typeof result.code === "number") {
        return result.code;
    }
    if (typeof result.code === "string") {
        return os.constants.errno[result.code];
    }
    throw new TypeError(`Received unexpected exit code value ${JSON.stringify(result.code)}`);
}
function spawnProcess(command, args, opts) {
    const child = execa_1.default(command, args, opts);
    const drain = (code, signal) => {
        children.delete(child);
        if (signal === undefined) {
            child.removeListener("exit", drain);
        }
    };
    child.once("exit", drain);
    child.once("error", drain);
    if (opts.pkg) {
        child.pkg = opts.pkg;
    }
    children.add(child);
    return child;
}
function wrapError(spawned) {
    if (spawned.pkg) {
        return spawned.catch((err) => {
            if (err.code) {
                err.code = getExitCode(err);
                err.pkg = spawned.pkg;
            }
            throw err;
        });
    }
    return spawned;
}
