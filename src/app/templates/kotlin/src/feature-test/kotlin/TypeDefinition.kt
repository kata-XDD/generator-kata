
import io.cucumber.java.ParameterType

@ParameterType("([0-9]+)")
fun n(n: String): Int {
    return n.toInt()
}