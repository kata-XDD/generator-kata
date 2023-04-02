import Generator from 'yeoman-generator';
import {
    kebabCaseValidation,
    nonBlankValidation,
    shouldMatchRegexValidation,
    validateWith
} from '@clowder-generator/utils/dist/validator-helper';
import { Context } from '@clowder-generator/utils/dist/context-helper';
import {
    DestinationPathProcessor,
    renameAll
} from '@clowder-generator/utils/dist/destination-path-processor-helper';
import { ITemplateData } from '@clowder-generator/utils';
import * as path from 'path';
import { fromKebabCase } from '@clowder-generator/utils/dist/case-helper';

export interface Answer {
    groupId: string;
    artifactId: string;
}

export const questions: Generator.Question[] = [
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

export class KotlinContext implements Context {
    private readonly groupId: string;
    private readonly groupPath: string;
    private readonly artifactId: string;
    private readonly packageName: string;

    public destinationPathProcessor: DestinationPathProcessor;

    constructor(kotlinAnswer: Answer) {
        this.groupId = kotlinAnswer.groupId;
        this.groupPath = path.join(...kotlinAnswer.groupId.split('.'));
        this.artifactId = kotlinAnswer.artifactId;
        this.packageName = fromKebabCase(kotlinAnswer.artifactId).toCamelCase().toLowerCase();

        this.destinationPathProcessor = renameAll(
            ['kotlinPackageName', this.packageName],
            ['kotlinGroupIdPath', this.groupPath]
        );
    }

    templateContext(): ITemplateData {
        return {
            mavenArtifactId: this.artifactId,
            kotlinGroupId: this.groupId,
            kotlinPackageName: this.packageName
        };
    }

    templatePath(): string | string[] {
        return 'kotlin/**/*';
    }
}
