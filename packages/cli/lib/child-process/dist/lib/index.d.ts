import { ExecaChildProcess, Options } from "execa";
interface ExecaOptions extends Options {
    pkg?: string;
}
interface IExecaChildProcess extends ExecaChildProcess {
    pkg: string;
}
export declare function spawnStreaming(command: string, args?: string[], opts?: ExecaOptions, prefix?: string): IExecaChildProcess;
export declare function getChildProcessCount(): number;
export {};
