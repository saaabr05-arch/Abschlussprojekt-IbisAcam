"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { BMWCar } from "@/lib/bmw-data";
import Image from "next/image";
import { User } from "@supabase/supabase-js";

interface UserHighlight extends BMWCar 
{
  id: string;
  user_id: string;
  score?: number;
  created_at: string;
}

export default function BMWHighlights() 
{

  //----------------------- State- Variablen Startwerte:-------------------------------------------------------------------

  const [highlights, setHighlights] = useState<UserHighlight[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();


  //-----------------------------  aktuelle Userdaten holen ----------------------------------------------------------------
  useEffect(() => 
  {
    const getUser = async () => 
    {
      //Daten Abruf vom aktuellem User
      const { data: { user } } = await supabase.auth.getUser();
      // User setzen (speichern)
      setUser(user);

      //*********** Highlights laden ***************

      //wenn User eingeloggt
      if (user) 
      {
        // seine Highlights laden
        await loadHighlights(user.id);
      }
      //egal, ob da oder nicht, loading beenden
      // => damit man eine Oberfläche sehen kann
      setLoading(false);
    };

    //Funktionsaufruf
    getUser();

    //---------------------- Auth Status => Veränderung -------------------------

    // Auth-Änderungen beachten => supabase.auth.onAuthStateChange(...)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
    
    // event => beschirebt die Änderung => "SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"
    // session => aktueller User oder is null
    (event, session) => 
    {
      // User setzen => user || null
      setUser(session?.user ?? null);
      // wenn User (=> login)
      if (session?.user) 
      {
        //Highlights anzeigen vom aktuellen User
        loadHighlights(session.user.id);
      } 
      else 
      {
        //ansonten wenn logout => Highlights leer
        setHighlights([]);
      }
    }
    );
    // Cleanup-Funktion ( meldet ab => EventListener)
    return () => subscription.unsubscribe();

  //wenn sich was an Authentifiezierung ändert => neuer Funktionsdurchlauf 
  }, [supabase.auth]);


  //------------------ Top 3 ---------------------------------------

 // nur Top 3 anzeigen & absteigend sortieren & setzen
  const loadHighlights = async (userId: string) => 
  {
    //die ersten 3 Highlights vom aktuellen user
    // absteigend aufrufen 
    try {
      const { data, error } = await supabase
        .from('user_highlights')
        .select('*')
        .eq('user_id', userId)
        .order('score', { ascending: false })
        .limit(3);

      // Fehlermeldung => return
      if (error) 
      {
        console.error('Error loading highlights:', error);
        return;
      }

      // Highlights setzen => speichern (true) - leeres Array (false)
      setHighlights(data || []);
    } 
    catch (error) 
    {
      console.error('Error loading highlights:', error);
    }
  };
  

  //--------------- Highlights entfernen ------------------------------
 
  const removeHighlight = async (highlightId: string) => 
  {
    //kein User => return
    if (!user) return;

    try {
      //Highlights nur löschen, wenn aktueller User
      const { error } = await supabase
        .from('user_highlights')
        .delete()
        .eq('id', highlightId)
        .eq('user_id', user.id);

      if (error) 
      {
        console.error('Error removing highlight:', error);
        return;
      }

      // Highlights aktualisieren (entfernen vom gelöschten Highlight)
      setHighlights(prev => prev.filter(h => h.id !== highlightId));
    } 
    catch (error) 
    {
      console.error('Error removing highlight:', error);
    }
  };
  

  // --------------------- Ladezustand --------------------------------

  if (loading) 
  {
    return (
      <div className="main-content">
        <div className="highlights-wrapper" style={{
          position: 'relative',
          borderRadius: 'var(--radius-large)',
          overflow: 'hidden',
          margin: 'var(--element-spacing) 0',
          minHeight: '400px'
        }}>
          <div className="highlights-container text-center p-8">
            <div className="text-gray-600">Loading your highlights...</div>
          </div>
        </div>
      </div>
    );
  }

  // kein User 
  if (!user) 
  {
    return (
      <div className="main-content">
        <div className="highlights-wrapper" style={{
          position: 'relative',
          borderRadius: 'var(--radius-large)',
          overflow: 'hidden',
          margin: 'var(--element-spacing) 0',
          minHeight: '400px'
        }}>
          <div className="highlights-container text-center p-8">
            <h3 className="text-2xl text-gray-600 mb-5">Please log in to view your highlights</h3>
            <p className="text-lg text-gray-500">Sign in to save and view your favorite BMW models!</p>
          </div>
        </div>
      </div>
    );
  }

  //Anzeige Top 3
  return (
    <div className="highlights-wrapper">
      <div className="stripe left-stripe"></div>
      <div className="highlights-container">
        {highlights.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ fontSize: '24px', color: '#666', marginBottom: '20px' }}>
              Keine Favoriten ausgewählt
            </h3>
            <p style={{ fontSize: '18px', color: '#888', marginBottom: '30px' }}>
              Mache das Quiz und like deine Lieblings-BMWs!
            </p>
            <a
              href="/quiz"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--bmw-blue)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: 'var(--radius-medium)',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'var(--transition-medium)'
              }}
            >
              Zum Quiz
            </a>
          </div>
        ) : (
          highlights.map((highlight, index) => {
            const medal = ['🥇', '🥈', '🥉'][index];

            return (
              <div key={highlight.id} className="highlights-item">
                <div className="medal">{medal}</div>
                <Image
                  src={highlight.image}
                  alt={highlight.name}
                  width={300}
                  height={200}
                />
                <div className="highlights-content">
                  <h3>{highlight.name}</h3>
                  {highlight.score && (
                    <p className="match-score">Match-Score: {highlight.score} Punkte</p>
                  )}
                  <p className="category">Kategorie: {highlight.category}</p>
                  <p className="subclass">{highlight.why}</p>
                  <button
                    onClick={() => removeHighlight(highlight.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginTop: '10px',
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-small)',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#fee2e2';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="stripe right-stripe"></div>
    </div>
  );
}