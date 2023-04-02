import Generator from 'yeoman-generator';
import {
    kebabCaseValidation,
    nonBlankValidation,
    shouldMatchRegexValidation,
    validateWith
} from '@clowder-generator/utils/dist/validator-helper';
import { DestinationPathProcessor, renameAll } from '@clowder-generator/utils/dist/destination-path-processor-helper';
import * as path from 'path';
import { fromKebabCase } from '@clowder-generator/utils/dist/case-helper';
import { Context } from '@clowder-generator/utils/dist/context-helper';
import { ITemplateData } from '@clowder-generator/utils';

export interface Answer {
    // kotlinPackageName
    // mavenArtifactId
    // mavenScenarioName
    version: string;
    groupId: string;
    artifactId: string;
}

export const questions: Generator.Question[] = [
    {
        type: 'list',
        name: 'version' as keyof Answer,
        message: 'Which java version do you want to use ?',
        choices: [
            '1.8',
            '11',
            '17'
        ]
    },
    {
        type: 'input',
        name: 'groupId' as keyof Answer,
        message: 'What will the groupId be ?',
        default: 'fr.leddzip.kata.xdd.base.kotlinxdd',
        validate: validateWith([
            nonBlankValidation('GroupId cannot be blank'),
            shouldMatchRegexValidation(/^([a-z]+\.)*[a-z]+$/)
        ], {
            trimmed: true
        })
    },
    {
        type: 'input',
        name: 'artifactId' as keyof Answer,
        message: 'What will the artifactId be ?',
        validate: validateWith([
            nonBlankValidation('ArtifactId cannot be blank'),
            kebabCaseValidation('ArtifactId must be in kebab-case')
        ], {
            trimmed: true
        })
    }
];

export class JavaContext implements Context {
    private readonly version: string;
    private readonly groupId: string;
    private readonly groupPath: string;
    private readonly artifactId: string;
    private readonly packageName: string;

    public destinationPathProcessor: DestinationPathProcessor;

    constructor(javaAnswer: Answer) {
        this.version = javaAnswer.version;
        this.groupId = javaAnswer.groupId;
        this.groupPath = path.join(...javaAnswer.groupId.split('.'));
        this.artifactId = javaAnswer.artifactId;
        this.packageName = fromKebabCase(javaAnswer.artifactId).toCamelCase().toLowerCase();

        this.destinationPathProcessor = renameAll(
            ['javaPackageName', this.packageName],
            ['javaGroupIdPath', this.groupPath]
        );
    }

    templateContext(): ITemplateData {
        return {
            mavenArtifactId: this.artifactId,
            javaGroupId: this.groupId,
            javaPackageName: this.packageName
        };
    }

    templatePath(): string | string[] {
        return 'java/**/*';
    }
}
