/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import { toast } from "react-toastify";
import { IToggleModalTypes } from "./types";

import { setShowModalPopup } from "../redux/actions/action";
import { downloadFile1, getData, postData } from "../api/rest/fetchData";
import {
  adminsidebarcontent,
  App_url,
} from "./constants/static";
import { toZonedTime } from "date-fns-tz";

export const formContent = (modal: string, name: string, submit: string) => {
  return {
    title: `${modal === "edit" ? "Edit" : modal} ${name}`,
    submit: submit ? submit : "Submit",
    // close: "Cancel",
  };
};

export function getNameEmail(text: string): { name: string, email: string } {
  const name = text.match(/^(.*?)(?=\s<)/)?.[0]; // Matches the name part
  const email = text.match(/<(.*?)>/)?.[1];
  return { name: name, email: email }
}

export function UUID4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const toggleModal = (
  state: IToggleModalTypes,
  setShowModal: React.Dispatch<React.SetStateAction<IToggleModalTypes>>
) => {
  setShowModal(state);
};

export const warnContent = (
  title: string,
  description: string,
  submit?: string,
  close?: string
) => {
  return {
    title: title,
    description: description,
    submit: submit ? submit : "Submit",
    close: close ? close : "Close",
  };
};

export function newYorkDate(dateString: string) {
  const date1 = new Date(dateString);
  return date1
    .toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/");
}

export const formatDate = (dateString: any): string => {
  const date = new Date(dateString);
  // Extract date components in UTC to avoid timezone issues
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth is 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${month}/${day}/${year}`;
};
export const formatDateDash = (dateString: any): string => {
  const date = new Date(dateString);
  // Extract date components in UTC to avoid timezone issues
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth is 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
};

export const formatCreatedDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const year = date.getFullYear();

  // Format to DD/MM/YYYY
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedMonth}/${formattedDay}/${year}`;
};

export function formatDate2(dateString: string | Date): string {
  const date = new Date(dateString);

  // Extract date components in UTC to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateShort(dateString: string | Date): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  return formattedDate;
}

export function formatDateMMDDYY(dateString: string | Date): string {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${month}-${day}-${year}`;
}

export function normalDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getWeekday(dateString) {
  const date = new Date(dateString);
  const options: any = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
}
export const renderPhoneValidate = (value, textError) => {
  if (
    value?.input_value &&
    value?.format &&
    value?.input_value?.length === value?.format?.length
  ) {
    return true;
  } else {
    return textError || "Invalid valid Contact Number";
  }
};

export const YearsAgo = (years) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date;
};

export const CommonResponse = (data) => {
  const commonBypass = ["unauthorized", "searchService", "Please provide pickup number", "Pickup number not available.", 'Delivery Fee need to check calculation', 'Delivery Fee need to check calculation', "Delivery Fee need to check calculation", "Unloading Overtime need to check calculation", "No matching group found.", "No matching groups found.", "Failed to fetch messages.", "Group not found"];
  if (data?.errors?.length > 0) {
    data?.errors?.map((item, index) => {
      if (item?.message) {
        toast.error(item?.message);
      }
    });
  } else {
    if (
      commonBypass?.includes(data?.msg) ||
      commonBypass?.includes(data?.request?.type)
    )
      return;
  }
  toast.error(data?.msg);
};

export const getPhone = (phone: string, phoneCode: string) => {
  if (phone.startsWith(phoneCode)) {
    // Remove the phone code from the start of the phone number
    return phone.substring(phoneCode.length);
  }
};
export const formatIfFloat = (value) => {
  if (typeof value === "number") {
    if (value % 1 !== 0) {
      return parseFloat(value.toFixed(4));
    }
    return value;
  }
  return value;
};

export const formatTwoDigit = (value) => {
  if (!isNaN(value)) {
    let num = parseFloat(value);
    if (num >= 1e10) {
      let exponent = Math.floor(Math.log10(num));
      let normalized = num / Math.pow(10, exponent);
      return parseFloat(normalized.toFixed(4));
    }
    if (num % 1 !== 0) {
      return parseFloat(num.toFixed(4));
    }
    return num;
  }
  return value;
};

export const formatOneDigit = (value) => {
  if (!isNaN(value)) {
    let num = parseFloat(value);
    if (num >= 1e10) {
      let exponent = Math.floor(Math.log10(num));
      let normalized = num / Math.pow(10, exponent);
      return parseFloat(normalized.toFixed(1));
    }
    if (num % 1 !== 0) {
      return parseFloat(num.toFixed(1));
    }
    return num;
  }
  return value;
};


export const checkPermission = (user_data: any, data: any) => {
  const api_permissions = user_data?.user?.api_permissions?.split(",");
  if (
    user_data?.user?.role === "admin" ||
    api_permissions?.includes(`${data}`)
  ) {
    return true;
  } else {
    return false;
  }
};


export const openPreview = (data: string, dispatch: any, fileName?: any) => {
  const binaryString = atob(data);
  const bytes = new Uint8Array(binaryString?.length);

  for (let i = 0; i < binaryString?.length; i++) {
    bytes[i] = binaryString?.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([bytes], { type: "application/pdf" });

  // Generate a download URL
  const url = URL.createObjectURL(blob);
  dispatch(
    setShowModalPopup({
      show: "PREVIEW",
      data: { url: url, filename: fileName || "file.pdf" },
    })
  );
};
export function objectCompare(obj1, obj2) {
  //Loop through properties in object 1
  for (let p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof obj1[p]) {
      //Deep compare objects
      case "object":
        if (!objectCompare(obj1[p], obj2[p])) return false;
        break;
      //Compare function code
      case "function":
        if (
          typeof obj2[p] == "undefined" ||
          (p != "compare" && obj1[p].toString() != obj2[p].toString())
        )
          return false;
        break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }

  //Check object 2 for any extra properties
  for (let p in obj2) {
    if (typeof obj1[p] == "undefined") return false;
  }
  return true;
}

export function formatDateToYYYYMMDD(dateObj) {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function nextDay(date: any) {
  const TxnDate = new Date(date);
  const next: any = TxnDate.setDate(TxnDate.getDate() + 1);
  return formatDate(next);
}
// Helper function for alphanumeric sorting
const sortList = (list, key) => {
  if (list?.length > 0) {
    return list.sort((a, b) => {
      if (a[key] && b[key]) {
        const regex = /(\d+)|(\D+)/g;
        const partsA = `${a[key]}`?.match(regex);
        const partsB = `${b[key]}`?.match(regex);

        while (partsA.length && partsB.length) {
          const partA: any = partsA.shift();
          const partB: any = partsB.shift();

          // If parts are numeric, compare them as numbers
          if (!isNaN(partA) && !isNaN(partB)) {
            const numA = parseFloat(partA);
            const numB = parseFloat(partB);
            if (numA !== numB) {
              return numA - numB;
            }
          } else {
            // Else compare them as strings
            const stringCompare = partA?.localeCompare?.(partB);
            if (stringCompare !== 0) {
              return stringCompare;
            }
          }
        }

        // If all parts are equal but one string is shorter, shorter string comes first
        return partsA.length - partsB.length;
      } else {
        return a?.[key]?.localeCompare?.(b?.[key]) || 0;
      }
    });
  } else {
    return [];
  }
};

// Main sorting function for the table
export const sortTableLayout = (products, request) => {
  if (products?.length > 0) {
    const productsCopy = [...products];
    const sortBy = request?.sort_by;

    // Sort using the sortList function with the specified key
    const sortedProducts = sortList(productsCopy, sortBy);

    // Reverse the order if request?.sort_order is 'desc'
    if (request?.sort_order === "desc") {
      return sortedProducts.reverse(); // Reverse the sorted array
    }

    return sortedProducts;
  } else {
    return [];
  }
};



export function extractTextFromHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
}

/* eslint-disable eqeqeq */
const GetViewFilesAPI = async (url, qr_token) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${qr_token}`
    }
  };
  const responce = await fetch(url, options)
    .then(res => res.blob())
    .then(blob => {
      let file = window.URL.createObjectURL(blob);
      return file;
    }).catch((error) => { return error; });
  return responce;
};
export const BlobGetViewFilesAPI = async (url, qr_token) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${qr_token}`
    }
  };
  const responce = await fetch(url, options)
    .then(res => res.blob())
    .then(blob => {
      let file = blob
      return file;
    }).catch((error) => { return error; });
  return responce;
};

export default GetViewFilesAPI;

export const getUTCDate = (date) => {
  if (date) {
    return new Date(toZonedTime(date, "UTC"));
  } else {
    return null;
  }
};

export const getSidebarList = (user_data) => {
  if (user_data?.user?.role === "admin") {
    return adminsidebarcontent;
  } else{
    return [];
  }
};

export const AmountFormat = (price, sign: boolean = true) => {
  if (price) {
    const number = Number(price).toLocaleString();
    if (!sign) {
      return `${formatIfFloat(number)}`;
    }
    return `${import.meta.env.VITE_APP_AMOUNT_SIGN} ${formatIfFloat(number)}`;
  } else {
    return "";
  }
};

export const weightFormat = (weight) => {
  if (weight) {
    return Number(weight)
      .toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
      })
      .replace(/(\.\d*?[1-9])0+$/, '$1') // Remove trailing zeros
      .replace(/\.0+$/, ''); // Remove trailing decimal if it's all zeros
  }

};

export const ConcatListArray = (input, key_name = "id") => {
  if (input?.length > 0) {
    const result = input?.reduce?.((accumulator, current) => {
      let exists = accumulator?.find((item) => {
        return item?.[key_name] === current?.[key_name];
      });
      if (!exists) {
        accumulator = accumulator?.concat?.(current);
      }
      return accumulator;
    }, []);
    return result;
  } else {
    return [];
  }
};


export function shortenText(text, maxLength = 39) {
  if (text?.length <= maxLength) {
    return text; // If the text is less than or equal to max length, return as is.
  }

  const extensionMatch = text && typeof text === 'string' && text.match(/\.[^\.]+$/); // Regular expression to find the file extension
  const extension = extensionMatch ? extensionMatch[0] : ""; // Extract the extension or set it to empty if not found

  const remainingLength = maxLength - extension?.length - 3; // Subtract 3 for "..."
  const startLength = Math.floor(remainingLength * 0.7); // Show more of the start (e.g., 70%)
  const endLength = remainingLength - startLength; // The remaining part goes to the end part

  const start = text && typeof text === 'string' && text.slice(0, startLength); // First part of the text
  const end = text && typeof text === 'string' && text.slice(-endLength - extension?.length); // End part including the extension

  return `${start}...${end}`; // Combine start, ellipses, and end parts
}
export function RemovePhoneCode(phone: string, phone_code: string) {
  if (phone) {
    return phone?.slice(phone_code?.length);
  } else {
    return "";
  }
}

export const formatDateTime = (isoDateString: string): string => {
  const messageDate: Date = new Date(isoDateString);
  const now: Date = new Date();

  const formatDateToMMDDYYYY = (date: Date): string => {
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day: string = String(date.getDate()).padStart(2, '0');
    const year: number = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatTimeToAMPM = (date: Date): string => {
    let hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const timeDifference: number = now.getTime() - messageDate.getTime(); // Difference in milliseconds
  const daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (daysDifference === 0) {
    return formatTimeToAMPM(messageDate);
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else {
    return formatDateToMMDDYYYY(messageDate);
  }
}


export const callDownloadPDF = async (setLoader, data, user_data, dispatch) => {
  const file_json = JSON.parse(data?.file_json);
  setLoader(data?.id);

  // downloadInvoice(data, false, user_data.accessToken, dispatch, setLoader, `INVOICE_${data?.invoice_number}_from_KAS_METALS.pdf`)
  if (file_json?.original_name?.includes(".pdf")) {
    await getData(
      `${App_url.link.ENDPOINT_LINKS.DOC_DOWNLOAD}/${file_json?.name}`,
      user_data?.accessToken,
      dispatch,
      false,
      `${data?.transfer_document_number}.pdf`
    );
  } else {
    await downloadFile1(
      `${App_url.link.ENDPOINT_LINKS.DOC_DOWNLOAD}/${file_json?.name}`,
      `${data?.transfer_document_number}`,
      user_data?.accessToken
    );
  }
  setTimeout(() => setLoader(""), 500);
};


export function PaginationList(array, page_size, page_number) {
  if (array) {
    return array?.slice((page_number - 1) * page_size, page_number * page_size);
  } else {
    return [];
  }
}
export function roundToFixed(num: number, precision: number): number {
  num = parseFloat(num?.toFixed?.(precision + 4));
  return parseFloat(
    (+(Math.round(+(num + "e" + precision)) + "e" + -precision))?.toFixed?.(
      precision
    )
  );
}

export function getProgressDesSelectedMap(designation: string, progress: string, selectedItemToggle) {
  if (designation === "detailer" && getProgress(selectedItemToggle, progress)) {
    return true
  }
  return false
}

export function getHighestNumber(mix_sub_list: any, full_num: boolean = false): any {
  let highestValue: number | null = null;
  let highestItem: string | null = null;

  mix_sub_list?.forEach((item: any) => {
    const match = item?.transfer_document_number?.match(/([A-Za-z]+-?)(\d+)/);
    if (match) {
      const currentNumber = parseInt(match[2], 10); // Extract the numeric part
      if (highestValue === null || currentNumber > highestValue) {
        highestValue = currentNumber;
        highestItem = item.transfer_document_number; // Keep the full string
      }
    }
  });

  // Return either the full string or just the numeric part based on full_num
  if (full_num) {
    return highestItem || ""; // Return the full string or empty string if no match found
  }

  return highestValue !== null ? highestValue : 0; // Return 0 if no valid numbers found

}

export function getProgressDesMap(userData, progress: string) {
  let des
  let prog
  if (progress === "25") {
    des = "detailer"
    prog = "25"
  }
  if (progress === "50") {
    des = "team_lead"
    prog = "50"
  }
  if (progress === "75") {
    des = "quality_assurance"
    prog = "75"
  }
  if (userData?.user?.designation === des && progress === prog) {
    return true
  }
  return false
}

export function getProgress(selectedItemToggle: any[], progress: string) {
  return selectedItemToggle?.every(item => item?.drawing_progress === progress);
}

export const getAccessType = (user_data) => {
  const accessType = user_data?.user?.user_type
  return accessType
}

export const onSelectLocation = (data, type, setValue) => {
  setValue(type, { ...data, address: data?.address + ", " + data?.postal_code });
};


export function callSampleDownload() {
  const fileUrl = App_url?.file?.sample; // Adjust the path if needed
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "sample.xlsx"; // Suggested file name for the download
  link.click();
}


export const collegeRes={
  "status": true,
  "msg": "college_with_cutoff_found",
  "data": {
    "items": [
      {
        "_id": "67f4d3ea481cc6db8125fcac",
        "college_name": "rajaram college",
        "college_code": "co-100",
        "hospital_details": "pune",
        "bed": 400,
        "ug_courses": [
          ""
        ],
        "pg_courses": [
          ""
        ],
        "is_hostel": true,
        "established_year": "1970-01-01T00:00:01.995Z",
        "academic_year": "2025",
        "documents": [
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcad",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcae",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56a6f",
            "_id": "67f4d3ea481cc6db8125fcaf",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56a6f",
            "_id": "67f4d3ea481cc6db8125fcb0",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          }
        ],
        "deleted_at": null,
        "active": true,
        "createdAt": "2025-04-08T07:44:42.380Z",
        "updatedAt": "2025-04-08T07:44:42.380Z",
        "cutoffs": [
          {
            "_id": "67f4d3ea481cc6db8125fcb2",
            "college_id": "67f4d3ea481cc6db8125fcac",
            "college_name": "rajaram College",
            "course_id": "67f0b955cba948127c5f605e",
            "course_name": "mbbs",
            "academic_year": "2025",
            "course_type": "ug",
            "sc_af": 100,
            "sc_al": 200,
            "sc_mf": 300,
            "sc_ml": 400,
            "st_af": 100,
            "st_al": 200,
            "st_mf": 300,
            "st_ml": 400,
            "vj_af": 0,
            "vj_al": 0,
            "vj_mf": 0,
            "vj_ml": 0,
            "nt1_af": 0,
            "nt1_al": 0,
            "nt1_mf": 0,
            "nt1_ml": 0,
            "nt2_af": 0,
            "nt2_al": 0,
            "nt2_mf": 0,
            "nt2_ml": 0,
            "nt3_af": 0,
            "nt3_al": 0,
            "nt3_mf": 0,
            "nt3_ml": 0,
            "obc_af": 0,
            "obc_al": 0,
            "obc_mf": 0,
            "obc_ml": 0,
            "ews_af": 0,
            "ews_al": 0,
            "ews_mf": 0,
            "ews_ml": 0,
            "open_af": 0,
            "open_al": 0,
            "open_mf": 0,
            "open_ml": 0,
            "d1_af": 0,
            "d1_al": 0,
            "d1_mf": 0,
            "d1_ml": 0,
            "d2_af": 0,
            "d2_al": 0,
            "d2_mf": 0,
            "d2_ml": 0,
            "d3_af": 0,
            "d3_al": 0,
            "d3_mf": 0,
            "d3_ml": 0,
            "pf_af": 0,
            "pf_al": 0,
            "pf_mf": 0,
            "pf_ml": 0,
            "mkb_af": 0,
            "mkb_al": 0,
            "mkb_mf": 0,
            "mkb_ml": 0,
            "nri_af": 0,
            "nri_al": 0,
            "nri_mf": 0,
            "nri_ml": 0,
            "deleted_at": null,
            "active": true,
            "createdAt": "2025-04-08T07:44:42.395Z",
            "updatedAt": "2025-04-08T07:44:42.395Z"
          }
        ]
      },
      {
        "_id": "67f4d3ea481cc6db8125fcac",
        "college_name": "rajaram college",
        "college_code": "co-100",
        "hospital_details": "pune",
        "bed": 400,
        "ug_courses": [
          ""
        ],
        "pg_courses": [
          ""
        ],
        "is_hostel": true,
        "established_year": "1970-01-01T00:00:01.995Z",
        "academic_year": "2025",
        "documents": [
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcad",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcae",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56a6f",
            "_id": "67f4d3ea481cc6db8125fcaf",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56a6f",
            "_id": "67f4d3ea481cc6db8125fcb0",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          }
        ],
        "deleted_at": null,
        "active": true,
        "createdAt": "2025-04-08T07:44:42.380Z",
        "updatedAt": "2025-04-08T07:44:42.380Z",
        "cutoffs": [
          {
            "_id": "67f4d3ea481cc6db8125fcb2",
            "college_id": "67f4d3ea481cc6db8125fcac",
            "college_name": "rajaram College",
            "course_id": "67f0b955cba948127c5f605e",
            "course_name": "mbbs",
            "academic_year": "2025",
            "course_type": "ug",
            "sc_af": 100,
            "sc_al": 200,
            "sc_mf": 300,
            "sc_ml": 400,
            "st_af": 100,
            "st_al": 200,
            "st_mf": 300,
            "st_ml": 400,
            "vj_af": 0,
            "vj_al": 0,
            "vj_mf": 0,
            "vj_ml": 0,
            "nt1_af": 0,
            "nt1_al": 0,
            "nt1_mf": 0,
            "nt1_ml": 0,
            "nt2_af": 0,
            "nt2_al": 0,
            "nt2_mf": 0,
            "nt2_ml": 0,
            "nt3_af": 0,
            "nt3_al": 0,
            "nt3_mf": 0,
            "nt3_ml": 0,
            "obc_af": 0,
            "obc_al": 0,
            "obc_mf": 0,
            "obc_ml": 0,
            "ews_af": 0,
            "ews_al": 0,
            "ews_mf": 0,
            "ews_ml": 0,
            "open_af": 0,
            "open_al": 0,
            "open_mf": 0,
            "open_ml": 0,
            "d1_af": 0,
            "d1_al": 0,
            "d1_mf": 0,
            "d1_ml": 0,
            "d2_af": 0,
            "d2_al": 0,
            "d2_mf": 0,
            "d2_ml": 0,
            "d3_af": 0,
            "d3_al": 0,
            "d3_mf": 0,
            "d3_ml": 0,
            "pf_af": 0,
            "pf_al": 0,
            "pf_mf": 0,
            "pf_ml": 0,
            "mkb_af": 0,
            "mkb_al": 0,
            "mkb_mf": 0,
            "mkb_ml": 0,
            "nri_af": 0,
            "nri_al": 0,
            "nri_mf": 0,
            "nri_ml": 0,
            "deleted_at": null,
            "active": true,
            "createdAt": "2025-04-08T07:44:42.395Z",
            "updatedAt": "2025-04-08T07:44:42.395Z"
          }
        ]
      },
      {
        "_id": "67f4d3ea481cc6db8125fcbf",
        "college_name": "rajaram college",
        "college_code": "co-100",
        "hospital_details": "pune",
        "bed": 400,
        "ug_courses": [
          ""
        ],
        "pg_courses": [
          ""
        ],
        "is_hostel": true,
        "established_year": "1970-01-01T00:00:01.995Z",
        "academic_year": "2025",
        "documents": [
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcad",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "hostel",
            "document_id": "67f4c65fe0924348ad346526",
            "_id": "67f4d3ea481cc6db8125fcae",
            "file": {
              "_id": "67f4c65fe0924348ad346526",
              "name": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "originalName": "download.jpg",
              "filePath": "upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/9119c5e9-0f40-41aa-aaf5-439bc2dd6aee.jpg",
              "fileType": "image/jpeg",
              "fileSize": 3069,
              "uploadDate": "2025-04-08T06:46:55.507Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:46:55.513Z",
              "updatedAt": "2025-04-08T06:46:55.513Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56a6f",
            "_id": "67f4d3ea481cc6db8125fcaf",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          },
          {
            "type": "college",
            "document_id": "67f4c30fee70a1569db56sdf",
            "_id": "67f4d3ea481cc6db8125fcb0",
            "file": {
              "_id": "67f4c30fee70a1569db56a6f",
              "name": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "originalName": "image.png",
              "filePath": "upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileUrl": "http://localhost:8000/api/users/download/upload/2025/04/e469194e-3be9-42d3-ad35-96a22b569ad6.png",
              "fileType": "image/png",
              "fileSize": 18183,
              "uploadDate": "2025-04-08T06:32:47.574Z",
              "active": true,
              "deleted_at": null,
              "author": "67ef884228d4159af1fb72c8",
              "createdAt": "2025-04-08T06:32:47.578Z",
              "updatedAt": "2025-04-08T06:32:47.578Z"
            }
          }
        ],
        "deleted_at": null,
        "active": true,
        "createdAt": "2025-04-08T07:44:42.380Z",
        "updatedAt": "2025-04-08T07:44:42.380Z",
        "cutoffs": [
          {
            "_id": "67f4d3ea481cc6db8125fcb2",
            "college_id": "67f4d3ea481cc6db8125fcac",
            "college_name": "rajaram College",
            "course_id": "67f0b955cba948127c5f605e",
            "course_name": "mbbs",
            "academic_year": "2025",
            "course_type": "ug",
            "sc_af": 100,
            "sc_al": 200,
            "sc_mf": 300,
            "sc_ml": 400,
            "st_af": 100,
            "st_al": 200,
            "st_mf": 300,
            "st_ml": 400,
            "vj_af": 0,
            "vj_al": 0,
            "vj_mf": 0,
            "vj_ml": 0,
            "nt1_af": 0,
            "nt1_al": 0,
            "nt1_mf": 0,
            "nt1_ml": 0,
            "nt2_af": 0,
            "nt2_al": 0,
            "nt2_mf": 0,
            "nt2_ml": 0,
            "nt3_af": 0,
            "nt3_al": 0,
            "nt3_mf": 0,
            "nt3_ml": 0,
            "obc_af": 0,
            "obc_al": 0,
            "obc_mf": 0,
            "obc_ml": 0,
            "ews_af": 0,
            "ews_al": 0,
            "ews_mf": 0,
            "ews_ml": 0,
            "open_af": 0,
            "open_al": 0,
            "open_mf": 0,
            "open_ml": 0,
            "d1_af": 0,
            "d1_al": 0,
            "d1_mf": 0,
            "d1_ml": 0,
            "d2_af": 0,
            "d2_al": 0,
            "d2_mf": 0,
            "d2_ml": 0,
            "d3_af": 0,
            "d3_al": 0,
            "d3_mf": 0,
            "d3_ml": 0,
            "pf_af": 0,
            "pf_al": 0,
            "pf_mf": 0,
            "pf_ml": 0,
            "mkb_af": 0,
            "mkb_al": 0,
            "mkb_mf": 0,
            "mkb_ml": 0,
            "nri_af": 0,
            "nri_al": 0,
            "nri_mf": 0,
            "nri_ml": 0,
            "deleted_at": null,
            "active": true,
            "createdAt": "2025-04-08T07:44:42.395Z",
            "updatedAt": "2025-04-08T07:44:42.395Z"
          }
        ]
      }
    ],
    "totalCount": 32,
    "paginationData": {
      "total_records": 32,
      "record_limit": 1,
      "current_page": 1
    }
  },
  "errors": [],
  "request": {
    "type": "collegeService",
    "action": "list",
    "payload": {
      "query": "",
      "limit": "1",
      "page": "1",
      "role_id": "",
      "location_id": "",
      "user_type": "",
      "sort_by": "name",
      "sort_order": "asc"
    },
    "demo": {}
  }
}
