package conveyer;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Created by oleh_dovbnya on 28.07.17.
 */
public enum LangProperty {
    RU("ru"),
    UA("ua");

    private String name;

    LangProperty(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return name;
    }
}
