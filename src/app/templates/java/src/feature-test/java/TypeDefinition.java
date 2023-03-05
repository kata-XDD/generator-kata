import io.cucumber.java.ParameterType;

public class TypeDefinition {

    @ParameterType("([0-9]+)")
    public Integer n(String n) {
        return Integer.valueOf(n);
    }

}
