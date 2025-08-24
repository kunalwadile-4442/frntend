export interface SearchListTypes {
    is_assign: boolean;
    project_id: string;
    name: string;
    name_lc: string;
    customer_name: string;
    customer_name_lc: string;
    customer_id: string;
    address: string;
    address_lc: string;
    project_type_name: string;
    project_type_name_lc: string;
    project_type_id: string;
    estimated_tonnage: string;
    estimated_tonnage_lc: string;
    project_scope_id: string;
    project_scope_name: string;
    project_scope_name_lc: string;
    scope_of_work_id: string;
    scope_of_work_name: string;
    scope_of_work_name_lc: string;
    dor: string;
    doc: string;
    foreman_name: string;
    foreman_name_lc: string;
    foreman_email: string;
    foreman_phone_code: string;
    foreman_phone: string;
    coordinator_name: string;
    coordinator_name_lc: string;
    coordinator_email: string;
    coordinator_phone_code: string;
    coordinator_phone: string;
    submission_email_chain: string;
    general_contractor_name: string;
    general_contractor_name_lc: string;
    concrete_contractor: string;
    concrete_contractor_name_lc: string;
    architect_name: string;
    architect_name_lc: string;
    engineer_name: string;
    engineer_name_lc: string;
    team_lead?: string;
    qa?: string;
    shipping_pincode?: string;
    billing_pincode?: string;

}
export interface ISearchListType {
    optionsList?: [];
    items: SearchListTypes[];
    totalCount: number;
};

export interface ISearchRes {
    searchList: {
        optionsList?: [];
        items: SearchListTypes[];
        totalCount: number;
    };

    searchDetails?: SearchListTypes;
}