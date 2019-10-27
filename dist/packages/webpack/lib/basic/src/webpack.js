"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_core_1 = require("@nger-cloud/webpack.core");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
let WebpackImpl = class WebpackImpl extends webpack_core_1.Webpack {
    constructor() {
        super();
        this.compiler = webpack_1.default();
        this.options = {};
    }
    async init() {
        this.options = {};
        this.compiler = webpack_1.default({});
    }
    async run() {
        return new Promise((resolve, reject) => {
            this.compiler.run((err, stats) => {
                if (err)
                    return reject(err);
                resolve(stats);
            });
        });
    }
    watch() {
        return rxjs_1.Observable.create((sub) => {
            this.compiler.watch(this.options, (err, stats) => {
                if (err)
                    sub.error(err);
                sub.next(stats);
            });
        });
    }
};
WebpackImpl = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WebpackImpl);
exports.WebpackImpl = WebpackImpl;
