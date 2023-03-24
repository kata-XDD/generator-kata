import Generator from 'yeoman-generator';
import {
    kebabCaseValidation,
    nonBlankValidation,
    shouldMatchRegexValidation,
    validateWith
} from '@clowder-generator/utils/dist/validator-helper';
import { Context } from '@clowder-generator/utils/dist/context-helper';
import { renameAll } from '@clowder-generator/utils/dist/destination-path-processor-helper';

export interface Answer {
    // kotlinPackageName
    // mavenArtifactId
    // mavenScenarioName
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

export const kotlinContext: Context = {
    templateContext: () => ({
        groupId: '',
        artifactId: ''
    }),
    templatePath: () => 'kotlin/**/*',
    destinationPathProcessor: renameAll(
        ['kotlinPackageName', 'this.context?.kotlin?.packageName'],
        ['kotlinGroupIdPath', 'this.context?.kotlin?.groupPath'])
};
