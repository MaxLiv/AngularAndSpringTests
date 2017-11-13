package test.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "nodeAddress")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class NodeAddress {

    private String nodeName;
    private String typeName;
    private Integer nodeOrder;
    private String typeSName;
    private String code;

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer getNodeOrder() {
        return nodeOrder;
    }

    public void setNodeOrder(Integer nodeOrder) {
        this.nodeOrder = nodeOrder;
    }

    public String getTypeSName() {
        return typeSName;
    }

    public void setTypeSName(String typeSName) {
        this.typeSName = typeSName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}