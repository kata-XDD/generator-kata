Feature: Basic kotlin generation
    Generating kotlin base project without kata scenario


    Scenario: Kotlin base project are correctly created
        Given a generator
        When I call it with the following prompt answer
            | prompt     | answer         |
            | language   | kotlin         |
            | artifactId | my-artifact-id |
        Then I should have the following files
            | filename                                                                     |
            | .sdkmanrc                                                                    |
            | pom.xml                                                                      |
            | src/feature-test/kotlin/steps/DummyStepDef.kt                                |
            | src/feature-test/kotlin/RunCucumber.kt                                       |
            | src/feature-test/kotlin/TypeDefinition.kt                                    |
            | src/feature-test/resources/feature/dummy.feature                             |
            | src/feature-test/resources/junit-platform.properties                         |
            | src/main/kotlin/fr/leddzip/kata/xdd/base/kotlinxdd/myartifactid/Dummy.kt     |
            | src/test/kotlin/fr/leddzip/kata/xdd/base/kotlinxdd/myartifactid/DummyTest.kt |


    Scenario: Kotlin base project are correctly created with groupId
        Given a generator
        When I call it with the following prompt answer
            | prompt     | answer              |
            | language   | kotlin              |
            | artifactId | my-artifact-id      |
            | groupId    | this.is.my.group.id |
        Then I should have the following files
            | filename                                                                     |
            | .sdkmanrc                                                                    |
            | pom.xml                                                                      |
            | src/feature-test/kotlin/steps/DummyStepDef.kt                                |
            | src/feature-test/kotlin/RunCucumber.kt                                       |
            | src/feature-test/kotlin/TypeDefinition.kt                                    |
            | src/feature-test/resources/feature/dummy.feature                             |
            | src/feature-test/resources/junit-platform.properties                         |
            | src/main/kotlin/this/is/my/group/id/myartifactid/Dummy.kt                    |
            | src/test/kotlin/this/is/my/group/id/myartifactid/DummyTest.kt |
