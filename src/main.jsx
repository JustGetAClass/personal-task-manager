import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initializeTaskStore } from "./store/taskStore.js";

const root = createRoot(document.getElementById("root"));

initializeTaskStore().then(() => {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
