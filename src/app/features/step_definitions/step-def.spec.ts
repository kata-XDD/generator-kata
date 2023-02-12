import {DataTable, Given, Then, When} from "@cucumber/cucumber";
import {CustomWorld} from "./custom-world.spec";
import assert from "assert";
import helpers from "yeoman-test";
import * as path from "path";
import {expect} from "chai";

Given('a generator', function (this: CustomWorld) {
    this.runContext = helpers.create(
        // MyGeneratorToRename
        path.join(__dirname, "../../../../generators/app")
    );
});


When('I call it with the following prompt answer', async function (this: CustomWorld, dataTable: DataTable) {
    let promptSetup = {
        // TODO - update with your actual prompt values
        name: "default",
        version: "default",
        description: "default"
    };

    type PromptKey = keyof typeof promptSetup;
    for (const [prompt, answer] of dataTable.rows()) {
        promptSetup[prompt as PromptKey] = answer;
    }
    this.runContext?.withPrompts(promptSetup);
    try {
        this.runResult = await this.runContext?.run();
    } catch (error: unknown) {
        this.error = error as Error;
    }

});

When('I call it with valid prompt', async function (this: CustomWorld) {
    let promptSetup = {
        // TODO - update with your actual prompt value
        name: "npm-name-default"
    };

    this.runContext?.withPrompts(promptSetup);
    this.runResult = await this.runContext?.run();
});


Then('I should have a file {string} with the content', function (this: CustomWorld, string, docString) {
    // TODO - remove of update. A lot of unecessary stuff mostly for exploration of
    //        what can be done or not.
    console.log("string", string)
    console.log("docstring", docString)
    assert(this.runContext !== undefined)
    assert(this.runResult !== undefined)
    this.runResult.assertFile("generated.md")
    const content = this.runResult.fs.read("generated.md") // to retrieve content
    console.log("content", content)

    this.runResult.assertFileContent("generated.md", docString)
});

Then('I should have the following CICD files', assertFileExist);
Then('I should have the following config files', assertFileExist);
Then('I should have the following sources files', assertFileExist);
Then('I should have the following feature files', assertFileExist);
Then('I should have the following template files', assertFileExist);
Then('I should have the following files', assertFileExist);
function assertFileExist(this: CustomWorld, dataTable: DataTable){
    for (const filePath of dataTable.rows()) {
        this.runResult?.assertFile(filePath);
    }
}

Then('I should have an error', function (this: CustomWorld) {
    expect(this.error).not.to.be.undefined;
});

Then('the error should contain the message {string}', function (this: CustomWorld, string: string) {
    expect(this.error?.message).to.equals(string)
});