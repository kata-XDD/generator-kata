package <%= javaGroupId %>.<%= javaPackageName %>

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

public class DummyTest {

    @Test
    public void dummyTest() throws IllegalAccessException {
        throw new IllegalAccessException("Don't call it, delete it");
    }

}
