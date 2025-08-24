/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { ILoginTypes } from "../../utils/types";
import { setShowModalPopup } from "../../redux/actions/action";

const URL = import.meta.env.VITE_APP_ENDPOINT_URL;

export function fetchData(
  url: string,
  method: any,
  headers: any = {},
  data: any = null,
  params: any = null
) {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      headers,
      data,
      params,
      withCredentials: true,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          const errorMessage =
            error.response.data.error ||
            error.response.data.message ||
            "An error occurred";
            if(errorMessage!=="unauthorized")
          toast.error(errorMessage);
          reject(error);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from server.");
          console.error("No response received:", error.request);
          reject("No response received from server.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error(`Request failed: ${error.message}`);
          console.error("Request failed:", error.message);
          reject(`Request failed: ${error.message}`);
        }
      });
  });
}

export const downloadFile1 = async (url, filename, token) => {
  try {
      const response = await fetch(`${URL}${url}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
          throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      const objectUrl = window.URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(objectUrl);
      link.remove();
  } catch (error) {
      console.error('Download failed:', error);
  }
};

export  const postDoc = async (
  url: string,
  token: string,
  body: any,
  dispatch?: any,
  download?: boolean,
  FileName?: any
): Promise<any> => {
  try {
    const response = await fetch(`${URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response?.status === 200) {
      // Optionally handle status-specific logic here
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType && !contentType.includes("application/json")) {
      // If the response is any file (non-JSON data)
      const blob = await response.blob();
      const contentDisposition = response.headers.get("content-disposition");

      let filename = FileName || "file"; // Default filename if not provided

      // Extract filename from Content-Disposition header if it exists
      if (contentDisposition) {
        const matches = /filename[^;=\n]*=([^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, ""); // Clean up any quotes
        }
      }

      if (dispatch) {
        if (download) {
          // Download the file
          await downloadFile(blob, filename, contentType);
        } else {
          // Open the file in a new tab (optional)
          await openFileInNewTab(blob, dispatch, FileName);
        }
      }

      return "File processed";
    } else {
      // Handle JSON response
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getData = async (url: string, token: string, dispatch?: any, download?: boolean, FileName?:any): Promise<any> => {
  try {
    const response = await fetch(`${URL}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      return response;
      // throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && !contentType.includes('application/json')) {
      // If the response is any file (non-JSON data)
      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition');

      let filename = FileName || 'file'; // Default filename if not provided

      // Extract filename from Content-Disposition header if it exists
      if (contentDisposition) {
        const matches = /filename[^;=\n]*=([^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, ''); // Clean up any quotes
        }
      }
      const fileType = getFileType(filename);

      if (dispatch) {
        // if (download ) {
          if (download || fileType !== 'pdf') {
          // Download the file
          await downloadFile(blob, filename, contentType);
        } else if (contentType === 'application/pdf' || filename?.endsWith('.pdf')) {
          console.log('download',fileType === 'pdf');

          // Open the file in a new tab (optional)
          await openFileInNewTab(blob, dispatch, FileName);
        }
        else{
          await downloadFile(blob, filename, contentType);
        }
      }

      return await response;
    } else {
      // Handle JSON response
      const data = await response.json();

      return data;
    }
  } catch (error) {
    return error;
  }
};

// Function to handle file download with any file type
const downloadFile = (blob: Blob, filename: string, contentType: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'downloaded_file'; // Fallback if no filename is set
  document.body.appendChild(a); // Append anchor to body
  a.click(); // Trigger click to download
  document.body.removeChild(a); // Remove anchor from body
  window.URL.revokeObjectURL(url); // Revoke the object URL
};

// Function to open a file in a new tab (optional use case)
const openFileInNewTab = (blob: Blob, dispatch?: any, filename?:any) => {
  const url = window.URL.createObjectURL(blob);

  dispatch(setShowModalPopup({
    show: "PREVIEW",
    data: { url: url, filename: filename },
  }));
};

export const postData = async (
  url: string,
  data_req: any,
  token: string,
  content_type: "application/json" | "multipart/form-data" = "application/json"
): Promise<any> => {
  try {
    const headers = {
      // Accept: "application/json",
      "Content-Type": content_type,
      Authorization: "Bearer " + token,
    };
    const data = await fetchData(`${URL}${url}`, "POST", headers, data_req);
    return data;
  } catch (error) {
    return error;
  }
};

export const patchData = async (
  url: string,
  data_req: any,
  token: string,
  content_type: "application/json" | "multipart/form-data" = "application/json"
): Promise<any> => {
  try {
    const headers = {
      // Accept: "application/json",
      "Content-Type": content_type,
      Authorization: "Bearer " + token,
    };
    const data = await fetchData(`${URL}${url}`, "PATCH", headers, data_req);
    return data;
  } catch (error) {
    return error;
  }
};

export const AuthReq = async (
  url: string,
  data_req: ILoginTypes
): Promise<any> => {
  try {
    const data = await fetchData(
      `${URL}${url}`,
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data_req
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getImage = async (url: string, token: string): Promise<string | null> => {
  try {
    const response = await fetch(`${URL}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const imageUrl = window.URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

export function getFileType(filename: string): string | null {
  const regex = /\.([a-zA-Z0-9]+)$/; // Matches the last extension after a dot
  const match = filename?.match?.(regex);

  return match ? match[1] : null; // Return the extension or null if not found
}