import Generator, { GeneratorOptions } from 'yeoman-generator';
import { printer } from './utils';
import * as Base from './questions/Base';
import { IYeomanGenerator } from '@clowder-generator/utils';

export interface GeneratorContext {
    name: string;
}

export default class GeneratorKata extends Generator<GeneratorOptions> implements IYeomanGenerator {

    private context: GeneratorContext | undefined = undefined;

    constructor(args: string, opts: GeneratorOptions) {
        super(args, opts);
    }

    public initializing() {
        context = {
            name: ""
        }
    }

    public async prompting() {
        const baseAnswer = await this.prompt<Base.Answer>(Base.question);
        this.context.name = baseAnswer.name; // considere replace direct assignation to enricher to merge response with context
    }

    public configuring() {
        // this.config.save();
    }

    public writing() {
        this.fs.copyTpl(
            this.templatePath("**/*"),
            this.destinationPath(),
            {
                name: this.context.name
            },
            undefined,
            {globOptions: {dot: true}}
        );
    }

}