import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { AppState } from "../../../Redux/Store";
import { ServerModel } from "../../../Models/ServerModel";
import { notify } from "../../../Utils/Notify";
import { ServerCard } from "../ServerCard/ServerCard";
import "./ServerList.css";
import { serverService } from "../../../Services/ServeService";

export function ServerList() {

  const servers = useSelector((s: AppState) => s.servers);
  const [onlyActive, setOnlyActive] = useState(false);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  useEffect(() => {
    if (servers.length > 0) return;
    serverService.getAllServers().catch(err => notify.error(err));
  }, [servers.length]);

  const visibleServers: ServerModel[] = useMemo(() => {
    let list = [...servers];
    if (onlyActive) list = list.filter(s => s.status === "active");
    if (sortNewestFirst) {
      const ts = (d: any) => new Date(String(d)).getTime() || 0;
      list.sort((a, b) => ts(b.createdAt) - ts(a.createdAt));
    }
    return list;
  }, [servers, onlyActive, sortNewestFirst]);

  return (
    <section className="ServerList">
      <div className="sl-toolbar" role="group" aria-label="Filters and sorting">
        <label className="sl-check">
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
          <span>Active only</span>
        </label>

        <div className="sl-segmented">
          <button
            className={`seg-btn ${sortNewestFirst ? "active" : ""}`}
            onClick={() => setSortNewestFirst(true)}
            aria-pressed={sortNewestFirst}
          >
            Newest
          </button>
          <button
            className={`seg-btn ${!sortNewestFirst ? "active" : ""}`}
            onClick={() => setSortNewestFirst(false)}
            aria-pressed={!sortNewestFirst}
          >
            Default
          </button>
        </div>
      </div>

      <div className="sl-grid">
        {visibleServers.map(s => <ServerCard key={s._id} server={s} />)}
      </div>
    </section>
  );
}
