import Generator from 'yeoman-generator';
import { Validator } from '@clowder-generator/utils';

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
        validate: Validator.validateWith([
            Validator.nonBlankValidation('ArtifactId cannot be blank'),
            Validator.shouldMatchRegexValidation(/^([a-z]+\.)*[a-z]+$/)
        ], {
            trimmed: true
        })
    },
    {
        type: 'input',
        name: 'artifactId' as keyof Answer,
        message: 'What will the artifactId be ?',
        validate: Validator.validateWith([
            Validator.nonBlankValidation('ArtifactId cannot be blank'),
            Validator.kebabCaseValidation('ArtifactId must be in kebab-case')
        ], {
            trimmed: true
        })
    }
];
