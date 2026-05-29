import { ReactNode } from "react";
import Nav from "../nav/Nav";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
  watchlistCount: number;
}

export default function Layout({ children, watchlistCount }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout__header">
        <Nav watchlistCount={watchlistCount} />
      </header>
      <main className="layout__main">{children}</main>
      <footer className="layout__footer">
        <p className="layout__footer-text">
          CineLog &copy; 2025 &mdash; Navpreet Singh &bull; Jarone Guese &bull; Rajandeep Kaur
        </p>
      </footer>
    </div>
  );
}
