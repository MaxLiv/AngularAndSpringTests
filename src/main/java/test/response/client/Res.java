package test.response.client;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.json.JSONObject;
import test.response.InvoicesResponse;

import java.util.List;

public class Res {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ClientTemplatesResponse clientTemplates;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private InvoicesResponse invoices;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<JSONObject> singleTicket;

    public ClientTemplatesResponse getClientTemplates() {
        return clientTemplates;
    }

    public void setClientTemplates(ClientTemplatesResponse clientTemplates) {
        this.clientTemplates = clientTemplates;
    }

    public InvoicesResponse getInvoices() {
        return invoices;
    }

    public void setInvoices(InvoicesResponse invoices) {
        this.invoices = invoices;
    }

    public List<JSONObject> getSingleTicket() {
        return singleTicket;
    }

    public void setSingleTicket(List<JSONObject> singleTicket) {
        this.singleTicket = singleTicket;
    }
}
