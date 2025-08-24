import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { WebSocketProvider } from "./app/api/websocket/WebSocketContext";

const App  = React.lazy(()=>import("./App"));
const PageLoad = React.lazy(()=>import("./app/view/components/PageLoad"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Suspense fallback={<React.Fragment/>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <WebSocketProvider>
            <App />
            <PageLoad/>
          </WebSocketProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
