import os = require("os");
import chalk = require("chalk");
import execa, { ExecaChildProcess, Options } from "execa";
import logTransformer = require("strong-log-transformer");

interface ExecaOptions extends Options {
    pkg?: string;
}

interface CoreError extends Error {
    pkg: string;
    code: string | number;
}

interface IOptions {
    format: string;
    tag: string;
    mergeMultiline: boolean;
    timeStamp: boolean;
}

interface IExecaChildProcess extends ExecaChildProcess {
    pkg: string;
}

const children: Set<IExecaChildProcess> = new Set();

const colorWheel = ["cyan", "magenta", "blue", "yellow", "green", "red"];
const NUM_COLORS = colorWheel.length;

let currentColor = 0;

export function spawnStreaming(command: string, args: string[] = [], opts?: ExecaOptions, prefix?: string) {
    const options: ExecaOptions = {
        ...opts,
        stdio: ["ignore", "pipe", "pipe"]
    }
    const spawned = spawnProcess(command, args, options);
    const stdoutOpts: IOptions = {} as IOptions;
    const stderrOpts: IOptions = {} as IOptions;
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

export function getChildProcessCount(): number {
    return children.size;
}

function getExitCode(result: CoreError): number {
    if (typeof result.code === "number") {
        return result.code;
    }
    if (typeof result.code === "string") {
        return os.constants.errno[result.code];
    }
    throw new TypeError(`Received unexpected exit code value ${JSON.stringify(result.code)}`);
}

function spawnProcess(command: string, args: string[], opts: ExecaOptions): IExecaChildProcess {
    const child = execa(command, args, opts) as IExecaChildProcess;
    const drain = (code: number | null, signal: string | null) => {
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

function wrapError(spawned: IExecaChildProcess): IExecaChildProcess {
    if (spawned.pkg) {
        return spawned.catch<IExecaChildProcess>((err: CoreError) => {
            if (err.code) {
                err.code = getExitCode(err);
                err.pkg = spawned.pkg;
            }
            throw err;
        }) as any;
    }
    return spawned;
}
