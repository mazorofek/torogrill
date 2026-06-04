import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeVisitSource } from "@/lib/visitSource";

initializeVisitSource();
createRoot(document.getElementById("root")!).render(<App />);
