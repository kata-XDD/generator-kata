import Generator, { GeneratorOptions } from 'yeoman-generator';
import * as Language from './questions/language/index';
import * as Kotlin from './questions/language/kotlin';
import { CaseHelper, IYeomanGenerator, DestinationProcessor } from '@clowder-generator/utils';
import * as path from 'path';

export interface GeneratorContext {
    language: string;
    kotlin?: {
        groupId: string;
        groupPath: string;
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
                const kotlinAnswer = await this.prompt<Kotlin.Answer>(Kotlin.questions);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.context!.kotlin = {
                    groupId: kotlinAnswer.groupId,
                    groupPath: path.join(...kotlinAnswer.groupId.split('.')),
                    artifactId: kotlinAnswer.artifactId,
                    packageName: CaseHelper.fromKebabCase(kotlinAnswer.artifactId).toCamelCase().toLowerCase()
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
                mavenGroupId: this.context?.kotlin?.groupId,
                mavenArtifactId: this.context?.kotlin?.artifactId,
                kotlinGroupId: this.context?.kotlin?.groupId,
                kotlinPackageName: this.context?.kotlin?.packageName,
                mavenScenarioName: 'dummy'
            },
            undefined,
            {
                globOptions: { dot: true },
                processDestinationPath: DestinationProcessor.renameAll(
                    ['kotlinPackageName', this.context?.kotlin?.packageName],
                    ['kotlinGroupIdPath', this.context?.kotlin?.groupPath])
            }
        );
    }
}
