import Generator, { GeneratorOptions } from 'yeoman-generator';
import * as Language from './questions/language/index';
import * as Kotlin from './questions/language/kotlin';
import { fromKebabCase, IYeomanGenerator } from '@clowder-generator/utils';

export interface GeneratorContext {
    language: string;
    kotlin?: {
        artifactId: string;
        packageName: string;
    };

}

export default class GeneratorKata extends Generator<GeneratorOptions> implements IYeomanGenerator {
    private context: GeneratorContext | undefined = undefined;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(args: string, opts: GeneratorOptions) {
        super(args, opts);
    }

    public initializing(): void {
        this.context = {
            language: '',
            kotlin: undefined
        };
    }

    public async prompting(): Promise<void> {
        const languageAnswer = await this.prompt<Language.Answer>(Language.question);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.context!.language = languageAnswer.language;
        switch (languageAnswer.language) {
            case 'kotlin': {
                const kotlinAnswer = await this.prompt<Kotlin.Answer>(Kotlin.question);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.context!.kotlin = {
                    artifactId: kotlinAnswer.artifactId,
                    packageName: fromKebabCase(kotlinAnswer.artifactId).toCamelCase().toLowerCase()
                };
                break;
            }
            default:
                throw new Error();
        }
    }

    public configuring(): void {
        this.config.save();
    }

    public writing(): void {
        this.fs.copyTpl(
            this.templatePath('kotlin/**/*'),
            this.destinationPath(),
            {
                mavenArtifactId: this.context?.kotlin?.artifactId,
                kotlinPackageName: this.context?.kotlin?.packageName,
                mavenScenarioName: 'dummy'
            },
            undefined,
            { globOptions: { dot: true } }
        );
    }
}
