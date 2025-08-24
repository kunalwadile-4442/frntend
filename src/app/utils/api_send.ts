/* eslint-disable array-callback-return */
export const callStateListRequest = (country_id, send) => {
    // const CityRequest = {
    //     type: "stateService",
    //     action: "list",
    //     payload: {
    //         country_id: country_id,
    //         query: "",
    //         limit: "5000",
    //         page: "1",
    //         active: true,
    //         sort_by: "name",
    //         sort_order: "asc",
    //     },
    //     demo: { search_city: true },
    // };
    // send(CityRequest);
};
export const callCityListRequest = (city_id, send) => {
    // const CityRequest = {
    //   type: "cityService",
    //   action: "list",
    //   payload: {
    //     state_id: city_id,
    //     query: "",
    //     limit: "5000",
    //     page: "1",
    //     active: true,
    //     sort_by: "name",
    //     sort_order: "asc",
    //   },
    //   demo: { search_city: true },
    // };
    // send(CityRequest);
};
export const callSocketProductList = (send: Function, payload?:any, demo?: any) =>{
    const productServicePayload:any = {
        "type": "projectService",
        "action": "list",
        "payload": {
            "query": payload?.query ?? "",
            "limit": payload?.limit ?? "50",
            "page": payload?.page ?? "1",
            "active": payload?.active ?? true,
            "sort_by": payload?.sort_by ?? "updated_at",
            "sort_order": payload?.sort_order ?? "desc",
            "status": payload?.status ?? "OPEN",
        }
    }
    if(payload){
        Object?.keys(payload)?.map?.((item)=>{
            productServicePayload.payload[item] = payload[item];
        })
    }
    if(demo){
        productServicePayload.demo = demo;
    }
    send(productServicePayload);
}
export const callSocketColumnPermission = (send: Function, column_permissions?:any, demo?: any) =>{
    const productServicePayload:any = {
        "type": "userService",
        "action": "updateColumnPermission",
        "payload": {
            "column_permissions": column_permissions,
        }
    }
    if(demo){
        productServicePayload.demo = demo;
    }
    send(productServicePayload);
}