import Generator, { GeneratorOptions } from 'yeoman-generator';
import * as Base from './questions/Base';
import { IYeomanGenerator } from '@clowder-generator/utils';

export interface GeneratorContext {
    name: string;
}

export default class GeneratorKata extends Generator<GeneratorOptions> implements IYeomanGenerator {
    private context: GeneratorContext | undefined = undefined;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(args: string, opts: GeneratorOptions) {
        super(args, opts);
    }

    public initializing(): void {
        this.context = {
            name: ''
        };
    }

    public async prompting(): Promise<void> {
        const baseAnswer = await this.prompt<Base.Answer>(Base.question);
        this.context.name = baseAnswer.name; // consider replace direct assignation to enricher to merge response with context
    }

    public configuring(): void {
        // this.config.save();
    }

    public writing(): void {
        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(),
            {
                name: this.context.name
            },
            undefined,
            { globOptions: { dot: true } }
        );
    }
}
