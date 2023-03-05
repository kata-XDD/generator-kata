import Generator from 'yeoman-generator';
import { Validator } from '@clowder-generator/utils';

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
            '1.8'
        ]
    },
    {
        type: 'input',
        name: 'groupId' as keyof Answer,
        message: 'What will the groupId be ?',
        default: 'fr.leddzip.kata.xdd.base.kotlinxdd',
        validate: Validator.validateWith([
            Validator.nonBlankValidation('GroupId cannot be blank'),
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
