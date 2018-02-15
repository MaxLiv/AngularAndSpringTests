package conveyer;

import java.util.List;

public class GetSingRequest extends BaseRequest{

    private List<String> listAddress1;
    private String searchOption;
    private String url;
    private String entrySource;
    private String ekb;
    private String msgProcListener;
    private String cityId;
    private boolean pasteCity;

    public GetSingRequest(List<String> listAddress1, String searchOption, String url, String entrySource,
                          String ekb, String msgProcListener, String cityId, boolean pasteCity) {
        this.listAddress1 = listAddress1;
        this.searchOption = searchOption;
        this.url = url;
        this.entrySource = entrySource;
        this.ekb = ekb;
        this.msgProcListener = msgProcListener;
        this.cityId = cityId;
        this.pasteCity = pasteCity;
    }

    public List<String> getListAddress1() {
        return listAddress1;
    }

    public void setListAddress1(List<String> listAddress1) {
        this.listAddress1 = listAddress1;
    }

    public String getSearchOption() {
        return searchOption;
    }

    public void setSearchOption(String searchOption) {
        this.searchOption = searchOption;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getEntrySource() {
        return entrySource;
    }

    public void setEntrySource(String entrySource) {
        this.entrySource = entrySource;
    }

    public String getEkb() {
        return ekb;
    }

    public void setEkb(String ekb) {
        this.ekb = ekb;
    }

    public String getMsgProcListener() {
        return msgProcListener;
    }

    public void setMsgProcListener(String msgProcListener) {
        this.msgProcListener = msgProcListener;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public boolean isPasteCity() {
        return pasteCity;
    }

    public void setPasteCity(boolean pasteCity) {
        this.pasteCity = pasteCity;
    }
}
