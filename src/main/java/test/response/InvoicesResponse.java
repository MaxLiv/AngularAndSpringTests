package test.response;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleh_dovbnya on 27.06.17.
 */
public class InvoicesResponse {
    private List<Invoise> invoiseList = new ArrayList<Invoise>();

    public List<Invoise> getInvoiseList() {
        return invoiseList;
    }

    public void setInvoiseList(List<Invoise> invoiseList) {
        this.invoiseList = invoiseList;
    }

    public void addInvoise(InvoicesResponse.Invoise invoise) {
        if (invoise != null) {
            invoiseList.add(invoise);
        }
    }

    public static class Invoise {

        private String account;
        private String allSum;
        private String bank;
        private String categoryid;
        private String clientID;
        private String clientIdType;
        private String commission;
        private String complexid;
        private String currency;
        private String dateChange;
        private String dateCreate;
        private String delivery;
        private String id;
        private String invDetails;
        private String invName;
        private String idInvoice;
        private InvoicesTypeProperty type;
        private String invValid;
        private String lang;
        private String mfo;
        private String numCell;
        private String okpo;
        private String payDetails;
        private String phone;
        private String recipientName;
        private String statysId;
        private String sumAct;
        private String sumInv;
        private String tso;
        private String oldcred;
        private String paypal;
        private String annuity;
        private String iid;

        public String getAccount() {
            return account;
        }

        public void setAccount(String account) {
            this.account = account;
        }

        public String getAllSum() {
            return allSum;
        }

        public void setAllSum(String allSum) {
            this.allSum = allSum;
        }

        public String getBank() {
            return bank;
        }

        public void setBank(String bank) {
            this.bank = bank;
        }

        public String getCategoryid() {
            return categoryid;
        }

        public void setCategoryid(String categoryid) {
            this.categoryid = categoryid;
        }

        public String getClientID() {
            return clientID;
        }

        public void setClientID(String clientID) {
            this.clientID = clientID;
        }

        public String getClientIdType() {
            return clientIdType;
        }

        public void setClientIdType(String clientIdType) {
            this.clientIdType = clientIdType;
        }

        public String getCommission() {
            return commission;
        }

        public void setCommission(String commission) {
            this.commission = commission;
        }

        public String getComplexid() {
            return complexid;
        }

        public void setComplexid(String complexid) {
            this.complexid = complexid;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getDateChange() {
            return dateChange;
        }

        public void setDateChange(String dateChange) {
            this.dateChange = dateChange;
        }

        public String getDateCreate() {
            return dateCreate;
        }

        public void setDateCreate(String dateCreate) {
            this.dateCreate = dateCreate;
        }

        public String getDelivery() {
            return delivery;
        }

        public void setDelivery(String delivery) {
            this.delivery = delivery;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getInvDetails() {
            return invDetails;
        }

        public void setInvDetails(String invDetails) {
            this.invDetails = invDetails;
        }

        public String getInvName() {
            return invName;
        }

        public void setInvName(String invName) {
            this.invName = invName;
        }

        public String getIdInvoice() {
            return idInvoice;
        }

        public void setIdInvoice(String idInvoice) {
            this.idInvoice = idInvoice;
        }

        public InvoicesTypeProperty getType() {
            return type;
        }

        public void setType(InvoicesTypeProperty type) {
            this.type = type;
        }

        public String getInvValid() {
            return invValid;
        }

        public void setInvValid(String invValid) {
            this.invValid = invValid;
        }

        public String getLang() {
            return lang;
        }

        public void setLang(String lang) {
            this.lang = lang;
        }

        public String getMfo() {
            return mfo;
        }

        public void setMfo(String mfo) {
            this.mfo = mfo;
        }

        public String getNumCell() {
            return numCell;
        }

        public void setNumCell(String numCell) {
            this.numCell = numCell;
        }

        public String getOkpo() {
            return okpo;
        }

        public void setOkpo(String okpo) {
            this.okpo = okpo;
        }

        public String getPayDetails() {
            return payDetails;
        }

        public void setPayDetails(String payDetails) {
            this.payDetails = payDetails;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getRecipientName() {
            return recipientName;
        }

        public void setRecipientName(String recipientName) {
            this.recipientName = recipientName;
        }

        public String getStatysId() {
            return statysId;
        }

        public void setStatysId(String statysId) {
            this.statysId = statysId;
        }

        public String getSumAct() {
            return sumAct;
        }

        public void setSumAct(String sumAct) {
            this.sumAct = sumAct;
        }

        public String getSumInv() {
            return sumInv;
        }

        public void setSumInv(String sumInv) {
            this.sumInv = sumInv;
        }

        public String getTso() {
            return tso;
        }

        public void setTso(String tso) {
            this.tso = tso;
        }

        public String getOldcred() {
            return oldcred;
        }

        public void setOldcred(String oldcred) {
            this.oldcred = oldcred;
        }

        public String getPaypal() {
            return paypal;
        }

        public void setPaypal(String paypal) {
            this.paypal = paypal;
        }

        public String getAnnuity() {
            return annuity;
        }

        public void setAnnuity(String annuity) {
            this.annuity = annuity;
        }

        public String getIid() {
            return iid;
        }

        public void setIid(String iid) {
            this.iid = iid;
        }
    }
}
