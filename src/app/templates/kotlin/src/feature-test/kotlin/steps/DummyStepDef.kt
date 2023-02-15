package steps

import io.cucumber.java.PendingException
import io.cucumber.java.en.Given
import io.cucumber.java.en.Then
import io.cucumber.java.en.When
import java.time.LocalDate

class DummyStepDef {

    @Given("I have {n} useless feature file(s?)")
    fun `I have N useless feature file`(n: Int) {
        throw PendingException()
    }

    @When("I create {n} additional useless feature file(s?)")
    fun `When I create N useless feature file`(n: Int) {
        throw PendingException()
    }

    @Then("I waste time")
    fun `Then I waste time`() {
        throw PendingException()
    }

}


