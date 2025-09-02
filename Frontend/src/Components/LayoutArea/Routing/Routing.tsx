import { Navigate, Route, Routes } from "react-router-dom";
import { ServerList } from "../../ServerArea/ServerList/ServerList";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";

export function Routing() {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<ServerList />} />
                <Route path="/list" element={<ServerList />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
