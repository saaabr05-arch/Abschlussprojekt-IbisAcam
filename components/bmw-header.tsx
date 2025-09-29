"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";

export default function BMWHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  const getUserInitial = () => {
    if (!user) return 'U';
    return (user.email?.charAt(0) || user.user_metadata?.full_name?.charAt(0) || 'U').toUpperCase();
  };

  return (
    <header className="flex flex-col w-full">
      <div className="header-txt" style={{
        padding: '21px var(--container-padding)',
        color: 'var(--bmw-blue)',
        backgroundColor: 'var(--bg-white)',
        opacity: '0.65',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        listStyle: 'none',
        gap: '10px'
      }}>
        <div>BMW</div>
        <div>Bayerische Motorenwerke</div>

        {user ? (
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                backgroundColor: 'var(--bmw-blue)',
                opacity: '0.84',
                color: 'var(--text-white)',
                fontSize: '12px',
                borderRadius: '50%',
                padding: '8px',
                transition: 'var(--transition-medium)',
                border: 'none',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              {getUserInitial()}
            </button>

            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                minWidth: '200px',
                zIndex: 9999,
                overflow: 'hidden',
                opacity: 1
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#222222',
                    marginBottom: '2px'
                  }}>
                    {user.user_metadata?.full_name || 'BMW User'}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#555555'
                  }}>
                    {user.email}
                  </div>
                </div>

                <Link
                  href="/protected/profile"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#222222',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: '0.2s ease',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#7e1919ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  👤 Mein Profil
                </Link>

                <Link
                  href="/protected/highlights"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#222222',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: '0.2s ease',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#7e1919ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  ⭐ Meine Favoriten
                </Link>

                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#E31A1C',
                    textAlign: 'left',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: '0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#7e1919ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  🚪 Abmelden
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="log-in" style={{
            backgroundColor: 'var(--bmw-blue)',
            opacity: '0.84',
            color: 'var(--text-white)',
            fontSize: '12px',
            borderRadius: 'var(--radius-small)',
            padding: '3px 10px',
            transition: 'var(--transition-medium)'
          }}>
            <Link href="/auth/login" className="text-white no-underline">
              Log in
            </Link>
          </div>
        )}
      </div>
      <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
        <img
          className="img-header"
          src="/img/bmw.png"
          alt="BMW Header"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </header>
  );
}