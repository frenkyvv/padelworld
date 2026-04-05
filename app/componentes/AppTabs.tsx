"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB_ITEMS = [
  { href: "/", label: "Main" },
  { href: "/resultados", label: "Tabla general" },
  { href: "/rol", label: "Rol por juegos" },
];

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <div className="app-tabs-wrap">
      <div className="nav nav-tabs app-tabs">
        {TAB_ITEMS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
