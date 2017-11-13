package test.response.client;


import test.response.HouseholdBase;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleh_dovbnya on 22.06.17.
 */
public class ClientTemplatesResponse {
    private List<ClientTemplatesResponse.Household> householdList = new ArrayList<Household>();

    public List<Household> getHouseholdList() {
        return householdList;
    }

    public void setHouseholdList(List<ClientTemplatesResponse.Household> householdList) {
        this.householdList = householdList;
    }

    public void addHousehold(ClientTemplatesResponse.Household household) {
        if (household != null) {
            householdList.add(household);
        }
    }

    public static class Household extends HouseholdBase {

        private String sourceAddr;
        private List<test.response.client.ClientTemplatesResponse.Household.Irs> irsList;
        private List<test.response.client.ClientTemplatesResponse.Household.SingleServise> singleServiseList;

        public String getSourceAddr() {
            return sourceAddr;
        }

        public void setSourceAddr(String sourceAddr) {
            this.sourceAddr = sourceAddr;
        }

        public List<test.response.client.ClientTemplatesResponse.Household.Irs> getIrsList() {
            return irsList;
        }

        public void setIrsList(List<test.response.client.ClientTemplatesResponse.Household.Irs> irsList) {
            this.irsList = irsList;
        }

        public List<test.response.client.ClientTemplatesResponse.Household.SingleServise> getSingleServiseList() {
            return singleServiseList;
        }

        public void setSingleServiseList(List<test.response.client.ClientTemplatesResponse.Household.SingleServise> singleServiseList) {
            this.singleServiseList = singleServiseList;
        }

        public static class Irs {
            private Integer kind_id;
            private String organizationId;
            private String orgName;
            private String totalPersonalAcc;
            private String organizationOkpo;
            private String templateName;
            private Boolean editAddrOther;
            private List<test.response.client.ClientTemplatesResponse.Household.Irs.Service> serviceList = new ArrayList<test.response.client.ClientTemplatesResponse.Household.Irs.Service>();

            public Integer getKind_id() {
                return kind_id;
            }

            public void setKind_id(Integer kind_id) {
                this.kind_id = kind_id;
            }

            public String getOrganizationId() {
                return organizationId;
            }

            public void setOrganizationId(String organizationId) {
                this.organizationId = organizationId;
            }

            public String getOrgName() {
                return orgName;
            }

            public void setOrgName(String orgName) {
                this.orgName = orgName;
            }

            public String getTotalPersonalAcc() {
                return totalPersonalAcc;
            }

            public void setTotalPersonalAcc(String totalPersonalAcc) {
                this.totalPersonalAcc = totalPersonalAcc;
            }

            public String getOrganizationOkpo() {
                return organizationOkpo;
            }

            public void setOrganizationOkpo(String organizationOkpo) {
                this.organizationOkpo = organizationOkpo;
            }

            public String getTemplateName() {
                return templateName;
            }

            public void setTemplateName(String templateName) {
                this.templateName = templateName;
            }

            public Boolean getEditAddrOther() {
                return editAddrOther;
            }

            public void setEditAddrOther(Boolean editAddrOther) {
                this.editAddrOther = editAddrOther;
            }

            public List<test.response.client.ClientTemplatesResponse.Household.Irs.Service> getServiceList() {
                return serviceList;
            }

            public void setServiceList(List<test.response.client.ClientTemplatesResponse.Household.Irs.Service> serviceList) {
                this.serviceList = serviceList;
            }

            public static class Service {
                private String templateId;
                private String serviceName;
                private Integer categoryId;

                public String getTemplateId() {
                    return templateId;
                }

                public void setTemplateId(String templateId) {
                    this.templateId = templateId;
                }

                public String getServiceName() {
                    return serviceName;
                }

                public void setServiceName(String serviceName) {
                    this.serviceName = serviceName;
                }

                public Integer getCategoryId() {
                    return categoryId;
                }

                public void setCategoryId(Integer categoryId) {
                    this.categoryId = categoryId;
                }
            }

        }

        public static class SingleServise {
            private Integer categoryId;
            private Integer kind_id;
            private String templateId;
            private String organizationId;
            private String organizationOkpo;
            private String orgName;
            private String totalPersonalAcc;
            private String serviceName;
            private String templateName;
            private Boolean editAddrOther;

            public Integer getCategoryId() {
                return categoryId;
            }

            public void setCategoryId(Integer categoryId) {
                this.categoryId = categoryId;
            }

            public Integer getKind_id() {
                return kind_id;
            }

            public void setKind_id(Integer kind_id) {
                this.kind_id = kind_id;
            }

            public String getTemplateId() {
                return templateId;
            }

            public void setTemplateId(String templateId) {
                this.templateId = templateId;
            }

            public String getOrganizationId() {
                return organizationId;
            }

            public void setOrganizationId(String organizationId) {
                this.organizationId = organizationId;
            }

            public String getOrganizationOkpo() {
                return organizationOkpo;
            }

            public void setOrganizationOkpo(String organizationOkpo) {
                this.organizationOkpo = organizationOkpo;
            }

            public String getOrgName() {
                return orgName;
            }

            public void setOrgName(String orgName) {
                this.orgName = orgName;
            }

            public String getTotalPersonalAcc() {
                return totalPersonalAcc;
            }

            public void setTotalPersonalAcc(String totalPersonalAcc) {
                this.totalPersonalAcc = totalPersonalAcc;
            }

            public String getServiceName() {
                return serviceName;
            }

            public void setServiceName(String serviceName) {
                this.serviceName = serviceName;
            }

            public String getTemplateName() {
                return templateName;
            }

            public void setTemplateName(String templateName) {
                this.templateName = templateName;
            }

            public Boolean getEditAddrOther() {
                return editAddrOther;
            }

            public void setEditAddrOther(Boolean editAddrOther) {
                this.editAddrOther = editAddrOther;
            }
        }
    }


}
