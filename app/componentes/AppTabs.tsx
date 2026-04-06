"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB_ITEMS = [
  { href: "/", label: "Inicio", exact: true },
  {
    href: "/roles-fijos/americanas-abril/resultados",
    label: "Tabla general",
    exact: true,
  },
  {
    href: "/roles-fijos/americanas-abril",
    label: "Rol fijo",
    exact: true,
  },
  {
    href: "/roles-fijos/americanas-abril/terminados",
    label: "Terminados",
    exact: true,
  },
];

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <div className="app-tabs-wrap">
      <div className="nav nav-tabs app-tabs">
        {TAB_ITEMS.map((tab) => {
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

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
