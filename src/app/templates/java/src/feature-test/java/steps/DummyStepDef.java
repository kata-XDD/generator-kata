package steps;

import io.cucumber.java.PendingException;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class DummyStepDef {

    @When("I create {n} useless feature file(s?)")
    public void when_i_create_N_useless_feature_files(Integer n){
        throw new PendingException();
    }

    @Then("I will delete the file")
    public void then_i_will_delete_the_file(){
        throw new PendingException();
    }

    @Then("I waste time")
    public void then_i_waste_time(){
        throw new PendingException();
    }

}
