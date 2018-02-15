package conveyer;

import com.fasterxml.jackson.annotation.JsonValue;

public enum OutSourceProperty {
    P24("P24"),
    SENDER("Sender"),
    MOB_P24("mobP24"),
    IOS_MOB_P24("iosMobP24"),
    TSO("TSO"),
    EXT_POINT_MOB("extPointMob"),
    MP("MP"),
    CUREX("CUREX")
    ;

    private String name;

    OutSourceProperty(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return name;
    }
}
