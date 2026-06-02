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
          Group Members: Navpreet Singh, Rajandeep Kaur, Jarone Guese
        </p>
      </footer>
    </div>
  );
}
