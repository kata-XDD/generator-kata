import Generator, { GeneratorOptions } from 'yeoman-generator';
import * as Language from './questions/language/index';
import * as Kotlin from './questions/language/kotlin';
import * as Java from './questions/language/java';
import { IYeomanGenerator } from '@clowder-generator/utils';
import { GeneratorContext } from './model';
import { Context, mergeTemplatePath } from '@clowder-generator/utils/dist/context-helper';
import { KotlinContext } from './questions/language/kotlin';
import { JavaContext } from './questions/language/java';

export default class GeneratorKata extends Generator<GeneratorOptions> implements IYeomanGenerator {
    private context: GeneratorContext | undefined = undefined;
    private kotlinContext: Context | undefined = undefined;
    private javaContext: Context | undefined = undefined;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(args: string, opts: GeneratorOptions) {
        super(args, opts);
    }

    public initializing(): void {
        this.context = {
            language: '',
            kotlin: undefined,
            java: undefined
        };
    }

    public async prompting(): Promise<void> {
        const languageAnswer = await this.prompt<Language.Answer>(Language.question);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.context!.language = languageAnswer.language;
        switch (languageAnswer.language) {
            case 'kotlin': {
                const kotlinAnswer = await this.prompt<Kotlin.Answer>(Kotlin.questions);
                this.kotlinContext = new KotlinContext(kotlinAnswer);
                break;
            }
            case 'java': {
                const javaAnswer = await this.prompt<Java.Answer>(Java.questions);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.javaContext = new JavaContext(javaAnswer);
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.templatePath(...mergeTemplatePath(this.kotlinContext!)),
            this.destinationPath(),
            // TODO: here, have to find a way to build a different set of value and path post processor based on the chosen language
            {
                ...this.kotlinContext?.templateContext(),
                mavenScenarioName: 'dummy'
            },
            undefined,
            {
                globOptions: { dot: true },
                processDestinationPath: this.kotlinContext?.destinationPathProcessor
            }
        );
    }
}
