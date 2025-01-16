import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

/**
 * The entry point for the React application.
 * It sets up the app with routing, Redux state management, and rendering.
 *
 * @returns {JSX.Element} The root element for the app, wrapped in necessary providers.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
