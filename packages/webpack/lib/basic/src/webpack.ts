import webpack, { Compiler, Stats, WatchOptions } from 'webpack';
import { Webpack } from '@nger-cloud/webpack.core';
import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@nestjs/common';
@Injectable()
export class WebpackImpl extends Webpack {
    compiler: Compiler = webpack();
    options: WatchOptions = {};
    constructor() {
        super();
    }

    async init() {
        this.options = {};
        this.compiler = webpack({});
    }

    async run(): Promise<Stats> {
        return new Promise((resolve, reject) => {
            this.compiler.run((err: Error, stats: Stats) => {
                if (err) return reject(err);
                resolve(stats);
            });
        });
    }
    watch(): Observable<Stats> {
        return Observable.create((sub: Subscriber<Stats>) => {
            this.compiler.watch(this.options, (err: Error, stats: Stats) => {
                if (err) sub.error(err);
                sub.next(stats);
            });
        });
    }
}
