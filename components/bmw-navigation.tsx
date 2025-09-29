"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/protected/highlights", label: "Highlights" },
];

export default function BMWNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <ul style={{
        backgroundColor: 'var(--bmw-red)',
        fontSize: '14px',
        fontFamily: 'Newsreader, serif',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: '10px var(--container-padding)',
        gap: 'var(--element-spacing)'
      }}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link block text-white no-underline px-2 py-1 rounded transition-all duration-300 
              ${
                pathname === item.href ? 'bg-white text-[var(--bmw-red)]' : 'hover:bg-white hover:text-[var(--bmw-red)]'
              }`}
              style={{
                padding: '3px 7px',
                borderRadius: 'var(--radius-small)',
                transition: 'var(--transition-medium)',
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}