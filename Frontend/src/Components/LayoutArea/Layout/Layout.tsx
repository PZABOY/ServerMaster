import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
  return (
    <div className="Layout">
      <div className="topbar">
        <Header />
      </div>

      <main className="layout-main">
        <Routing />
      </main>

      <div className="bottombar">
        <Footer />
      </div>
    </div>
  );
}
