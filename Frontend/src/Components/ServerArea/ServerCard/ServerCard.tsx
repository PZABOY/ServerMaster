import { useState } from "react";
import "./ServerCard.css";
import type { ServerModel } from "../../../Models/ServerModel";
import { serverService } from "../../../Services/ServeService";

type Props = { server: ServerModel };

export function ServerCard({ server }: Props) {
  const [isSaving, setIsSaving] = useState(false);

  const ch: any = server.companyHostingId as any;
  const companyName: string | undefined = ch && typeof ch === "object" ? ch.name : undefined;
  const companyId: string = ch && typeof ch === "object" ? ch._id : (ch || "");

  const isActive = server.status === "active";

  async function onToggleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const desired: "active" | "inactive" = e.target.checked ? "active" : "inactive";
    try {
      setIsSaving(true);
      await serverService.updateServerStatus(server._id!, desired);
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || "Failed to update server status.");
      e.target.checked = isActive; 
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="ServerCard" aria-busy={isSaving}>
      <header className="sc-head">
        <h3 className="sc-name" title={server.name}>{server.name}</h3>
        <span className={`sc-badge ${isActive ? "online" : "offline"}`}>
          {isActive ? "Online" : "Offline"}
        </span>
      </header>

      <div className="sc-body">
        <div className="sc-row">
          <span className="sc-label">IP</span>
          <span className="sc-value">{server.ip}</span>
        </div>

        {companyName ? (
          <div className="sc-row">
            <span className="sc-label">Company</span>
            <span className="sc-value">{companyName}</span>
          </div>
        ) : (
          <div className="sc-row">
            <span className="sc-label">Company Id</span>
            <span className="sc-value mono">{companyId}</span>
          </div>
        )}

        <div className="sc-row">
          <span className="sc-label">Created</span>
          <time className="sc-value">
            {server.createdAt ? new Date(String(server.createdAt)).toLocaleString() : ""}
          </time>
        </div>
      </div>

      <div className="sc-footer">
        <label className={`ios-switch ${isSaving ? "is-saving" : ""}`}>
          <input
            type="checkbox"
            role="switch"
            aria-label={`Toggle ${server.name} status`}
            checked={isActive}
            onChange={onToggleChange}
            disabled={isSaving}
          />
          <span className="track" aria-hidden="true" />
          <span className="switch-text">{isActive ? "Online" : "Offline"}</span>
        </label>
      </div>
    </article>
  );
}
