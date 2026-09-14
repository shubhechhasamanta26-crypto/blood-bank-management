"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    ["/", "Home"],
    ["/inventory", "Blood Stock"],
    ["/donor", "Become a Donor"],
    ["/request", "Request Blood"],
    ["/admin", "Admin"]
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">♥</span>
          <span>LifeDrop</span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/login" className="nav-login" onClick={() => setOpen(false)}>Login</Link>
        </nav>
      </div>
    </header>
  );
}
