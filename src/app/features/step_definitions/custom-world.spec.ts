import {RunContext, RunResult} from "yeoman-test";
import {setWorldConstructor} from "@cucumber/cucumber";

export class CustomWorld {
    public runResult?: RunResult;
    public runContext?: RunContext;
    public error?: Error;

    constructor() {
        this.runResult = undefined;
        this.runContext = undefined;
        this.error = undefined;
    }
}

setWorldConstructor(CustomWorld);