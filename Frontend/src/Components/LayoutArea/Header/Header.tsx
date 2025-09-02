import "./Header.css";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export function Header({ title = "Server Master 🏁", subtitle = "📀 Fleet overview 📀" }: HeaderProps) {
  return (
    <header className="Header" role="banner" aria-label="App header">
      <div className="hdr-left">
        <h1 className="hdr-title" title={title}>{title}</h1>
        <p className="hdr-subtitle">{subtitle}</p>
      </div>
      <div className="hdr-right" />
    </header>
  );
}
