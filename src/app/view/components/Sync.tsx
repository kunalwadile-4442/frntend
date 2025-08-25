import React, { useEffect, useState } from "react";
import { useUiReducer } from "../../redux/getdata/useUiReducer";
import { getData } from "../../api/rest/fetchData";
import { WarnFormSetFunctions } from "../../redux/actions/action";
import { App_url } from "../../utils/constants/static";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import { useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
import { useWebSocket } from "../../api/websocket/WebSocketContext";

interface ISyncTypes {
  type: string;
}
const Sync: React.FC<ISyncTypes> = (prop) => {
  const [SyncReq, setSyncReq] = useState({
    type: "distribution",
    page: 0,
    limit: 0,
    totalCounts: 0,
  });

  const [SyncReq1, setSyncReq1] = useState({
    type: "shop",
    page: 0,
    limit: 0,
    totalCounts: 0,
  });
  const { warnForm } = useUiReducer();
  const { user_data } = usePosterReducers();
  const { send } = useWebSocket();
  const dispatch = useDispatch();

  function callList() {
    let payload = {
      type: "shopService",
      action: "list",
      payload: {
        query: "",
        limit: "50",
        page: "1",
        status: "DELIVERED",
        sort_by: "updated_at",
        sort_order: "desc",
      },
    };
    if (prop?.type === "distribution") {
      payload.type = "inquirySaleService";
    }
    send(payload);
  }

  function calculateProgress(page, limit, totalCounts) {
    if (totalCounts === 0) return 0; // Avoid division by zero
    const progress = ((page * limit) / totalCounts) * 100;
    return progress > 100 ? 100 : progress.toFixed(0); // Ensuring it doesn't exceed 100%
  }

  async function callBackCustomButton(req, setReq, type, callback?: Function) {
    let page = req?.page;
    let limit = req?.limit;
    if (req?.page !== 0) {
      getData(
        `${App_url.link.ENDPOINT_LINKS.SYNC_INVOICE_URL}/${type}/${req?.page}/${req?.limit}`,
        user_data?.accessToken
      ).then((data: any) => {
        const paid_counts = data?.paid_counts ?? 0;
        const totalCounts = data?.total_counts ?? 0;

        if (paid_counts > 0) {
          if (paid_counts < limit / 2) {
            limit = limit - paid_counts;
            page++;
          }
        } else {
          page++;
        }

        let total_page =
          Math.ceil(totalCounts / limit) === Infinity
            ? 0
            : Math.ceil(totalCounts / limit);
        if (page <= total_page) {
          setReq((prev) => ({ ...prev, limit, page, totalCounts }));
        } else {
          if (type === "shop") {
            callList();
            dispatch(WarnFormSetFunctions({ status: "hide" }));
            setSyncReq1((prev) => ({
              type: "shop",
              page: 0,
              limit: 0,
              totalCounts: 100,
            }));
            setSyncReq((prev) => ({
              type: "distribution",
              page: 0,
              limit: 0,
              totalCounts: 100,
            }));
            return;
          }
          setSyncReq1((prev) => ({
            type: "shop",
            page: 1,
            limit: 10,
            totalCounts: 100,
          }));
        }
      });
    }
  }

  useEffect(() => {
    if (warnForm?.status === "view" && warnForm.name === "Sync Invoice") {
      setSyncReq({
        type: "distribution",
        page: 1,
        limit: 10,
        totalCounts: 100,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warnForm]);

  useEffect(() => {
    if (warnForm?.status === "view" && warnForm.name === "Sync Invoice") {
      callBackCustomButton(SyncReq, setSyncReq, "distribution");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SyncReq]);

  useEffect(() => {
    if (warnForm?.status === "view" && warnForm.name === "Sync Invoice") {
      callBackCustomButton(SyncReq1, setSyncReq1, "shop");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SyncReq1]);

  const progress1 = calculateProgress(
    SyncReq?.page,
    SyncReq?.limit,
    SyncReq?.totalCounts
  )?.toString();
  const progress2 = calculateProgress(
    SyncReq1?.page,
    SyncReq1?.limit,
    SyncReq1?.totalCounts
  )?.toString();

  return (
    <>
      {warnForm.status !== "hide" && warnForm.name === "Sync Invoice" && (
        <div
          id="default-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-lg ">
            <div className="relative  bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4  md:p-4 rounded-t">
                <div className="w-full text-center py-2">
                  <div className=" border-b">
                    <h3 className="text-lg text-gray-700 ">
                      Invoice Sync in Progress. . .
                    </h3>
                  </div>
                  <p className="my-2 mt-4">Distribution Invoice Syncing</p>
                  <ProgressBar progress={progress1} />
                  <p className="my-2 mt-4 ">Shop Supply Invoice Syncing</p>
                  <ProgressBar progress={progress2} />
                </div>
              </div>
              <div className="mx-2"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sync;
