package test.response;

import java.util.List;

public class HouseholdBase {

    private String hos;
    private String addressHouse;
    private List<NodeAddress> nodes;

    public HouseholdBase() {
    }

    public HouseholdBase(String hos, String addressHouse, List<NodeAddress> nodes) {
        this.hos = hos;
        this.addressHouse = addressHouse;
        this.nodes = nodes;
    }

    public String getHos() {
        return hos;
    }

    public void setHos(String hos) {
        this.hos = hos;
    }

    public String getAddressHouse() {
        return addressHouse;
    }

    public void setAddressHouse(String addressHouse) {
        this.addressHouse = addressHouse;
    }

    public List<NodeAddress> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeAddress> nodes) {
        this.nodes = nodes;
    }
}
