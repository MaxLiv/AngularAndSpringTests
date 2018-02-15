package conveyer;

public class BaseRequest {

    private String outMessageRef;


    private OutSourceProperty outSource;

    public String getOutMessageRef() {
        return outMessageRef;
    }

    public void setOutMessageRef(String outMessageRef) {
        this.outMessageRef = outMessageRef;
    }

    public OutSourceProperty getOutSource() {
        return outSource;
    }

    public void setOutSource(OutSourceProperty outSource) {
        this.outSource = outSource;
    }
}
