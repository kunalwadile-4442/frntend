// utils/googleMapsApi.js
import axios from 'axios';

export const getLocation = async (api_url?:any, accessToken?:any, data?:any, pdf?:any) => {
    const headers: any = {
        'Accept':"application/json",
      }

      if(accessToken){
        headers.Authorization = `Bearer ${accessToken}`

      }
      if(pdf){
        headers.Accept = "application/pdf"
      }
      const header: any = {
        headers:headers
      }
      if(data){
        header.params = data
      }

        const getResponse = axios.get(`${import.meta.env.VITE_APP_ENDPOINT_URL}${api_url}`,header).then(function (result) {
          return result;
        }).catch((e)=>e.response)
        return getResponse;
};
