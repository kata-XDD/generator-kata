import Generator, { GeneratorOptions } from 'yeoman-generator';
import * as Language from './questions/language/index';
import * as Kotlin from './questions/language/kotlin';
import * as Java from './questions/language/java';
import { IYeomanGenerator } from '@clowder-generator/utils';
import * as path from 'path';
import { GeneratorContext } from './model';
import { fromKebabCase } from '@clowder-generator/utils/dist/case-helper';
import { renameAll } from '@clowder-generator/utils/dist/destination-path-processor-helper';

export default class GeneratorKata extends Generator<GeneratorOptions> implements IYeomanGenerator {
    private context: GeneratorContext | undefined = undefined;

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
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.context!.kotlin = {
                    groupId: kotlinAnswer.groupId,
                    groupPath: path.join(...kotlinAnswer.groupId.split('.')),
                    artifactId: kotlinAnswer.artifactId,
                    packageName: fromKebabCase(kotlinAnswer.artifactId).toCamelCase().toLowerCase()
                };
                break;
            }
            case 'java': {
                const javaAnswer = await this.prompt<Java.Answer>(Java.questions);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.context!.java = {
                    version: javaAnswer.version,
                    groupId: javaAnswer.groupId,
                    groupPath: path.join(...javaAnswer.groupId.split('.')),
                    artifactId: javaAnswer.artifactId,
                    packageName: fromKebabCase(javaAnswer.artifactId).toCamelCase().toLowerCase()
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
            // TODO: here, have to find a way to build a different set of value and path post processor based on the chosen language
            {
                mavenArtifactId: this.context?.kotlin?.artifactId,
                kotlinGroupId: this.context?.kotlin?.groupId,
                kotlinPackageName: this.context?.kotlin?.packageName,
                mavenScenarioName: 'dummy'
            },
            undefined,
            {
                globOptions: { dot: true },
                processDestinationPath: renameAll(
                    ['kotlinPackageName', this.context?.kotlin?.packageName],
                    ['kotlinGroupIdPath', this.context?.kotlin?.groupPath])
            }
        );
    }
}
