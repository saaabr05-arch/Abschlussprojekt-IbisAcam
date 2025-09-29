"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import BMWLayout from "@/components/bmw-layout";
import { User } from "@supabase/supabase-js";

interface UserProfile 
{
  //******* Typ Definition ********************************

  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  //Uhrzeit, wenn was erstellt wurde
  created_at: string;
  //Uhrzeit Update, wenn was verändert wird
  updated_at: string;
}


// ----------------Hauptkomponente => ProfilPage-------------------

export default function ProfilePage() 
{
  //******* Deklaration von State- Variablen in React *********
  // State- Variablen => in react => wenn sich Wert ändern soll ( => rendern)
  //******* Startwerte:

  //<User | null> (null) => user => kann user sein | null (kein User)
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  //  am Anfang ladet es
  const [loading, setLoading] = useState(true);
  //Profil bearbeiten => nein
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [highlightsCount, setHighlightsCount] = useState(0);

  //Supabaseverbindung
  const supabase = createClient();


  //----------- Authentifizierung -----------------------

  //useEffekt => für API Calls
  useEffect(() => 
  {
    //asynch = Funktion => (API-Aufruf zu Supabase) => um Infos über User zu holen
    const getUser = async () => 
    {
      // aktuellen User holen
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      //wenn user existiert 
      if (user) 
      {
        //holt die Daten vom Server
        await loadProfile(user.id);
        await loadHighlightsCount(user.id);
      }
      //damit Profilseite usw angezeigt werden können
      // wenn user nicht exisittiert => wird nich angezeigt
      setLoading(false);
    };

    // Profilausgabe (damit user geladen wird)
    getUser();

    //[supabase.auth] => Funktion läuft erneut 
    // => bei Änderungen der Authentifizierung 
  }, [supabase.auth]);


  //----------------- Highlights vom User ----------------------
  
  // durch aync => await verwendbar (wartet auf Antwort)
  const loadProfile = async (userId: string) => 
  {
    try 
    {
      //********** Supabase- Abfrage nach Profil **********
      //********** Ziel: Anzahl der Highlights / Profildaten des Users
      
      const { data, error } = await supabase
        //von Tabelle user_profiles => DB
        .from('user_profiles')
        // alles aufrufen
        .select('*')
        // nur vom aktuellen User => (Filter)
        .eq('id', userId)
        // ein Objekt, kein Array zurückgeben => Zugriff einfacher
        .single();

        
      //*********** kein Profil - Error => DB *************
      // wenn Error & kein Datensatz gefunden wurde
      if (error && error.code !== 'PGRST116') 
      {
        //error ausgeben & abbrechen 
        console.error('Error loading profile:', error);
        return;
      }

      //************ ein Profil: **************************
      if (data) 
      {
        setProfile(data);
        //vollen Namen oder null anzeigen 
        setFullName(data.full_name || "");
      } 
      //*********** kein Profil: **************************
      else
      {
        //********* neues Profil erstellen automatisch(Metadata..) *********
        const newProfile = 
        {
          id: userId,
          // wenn vorhanden 
          email: user?.email || "",
          // wenn user vorhanden => Name mit Metadata befüllen
          full_name: user?.user_metadata?.full_name || ""
        };


        //********* Profil in DB fügen => Supabaseabfrage *********

        // data: angeforderte Daten
        // error: Informationen über einen Fehler, falls einer aufgetreten ist
        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          //fügt in user_profile newProfile hinzu
          .insert(newProfile)
          //abrufen => als Objekt, kein array
          .select()
          .single();

        //******** Fehlerbehandlung  *************
        //wenn kein Fehler && Profil vorhanden
        if (!createError && createdProfile) 
        {
          // ---------- UI setzen ----------
          setProfile(createdProfile);
          //User Name in UI setzen
          setFullName(createdProfile.full_name || "");
        }
      }
    } 
    //Falls irgendwo unerwarteter Fehler auftaucht, was nicht von Supabase selbst kommt
    catch (error) 
    {
      console.error('Error loading profile:', error);
    }
  };


  //************* Highlightsanzahl *****************

  const loadHighlightsCount = async (userId: string) => 
  {
    try
    {
      //******** Supabase- Abfrage nach Highlights **
      const { count, error } = await supabase
        .from('user_highlights')
        //count: 'exact' => exakte Anzahl der Zeilen
        // head: true => keine Daten zurückgeben
        // nur die Anzahl => für Profilanzeige.....
        .select('*', { count: 'exact', head: true })
        //nach aktuellem User filtern
        .eq('user_id', userId);

      //******** kein Fehler bei Abfrage  **
      if (!error) 
      {
        // count, oder 0 falls count null/undefined ist
        setHighlightsCount(count || 0);
      }
    }
    //****** Fehler wie (Netwerk usw.) ****
    catch (error)
    {
      console.error('Error loading highlights count:', error);
    }
  };


  // -------------------- Profil updaten ----------------------
  
  const updateProfile = async () => 
  {
    // wenn kein user oder Prodil => Funktion beenden
    if (!user || !profile) return;

    setSaving(true);
    try
    {
      //*********** Datendank Update *************
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        // Filtert das alles nach aktuellem User
        .eq('id', user.id);

      // wenn Supabase - Response Fehler macht 
      if (error) 
      {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      } 
      else
      {
        // wenn profil schon existiert => full_name: fullName
        // sonst null
        setProfile(prev => prev ? { ...prev, full_name: fullName } : null);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } 
    //unerwarteten Fehler, die nichts mit Supabase zu tun
    // z.B. Internetverbindung
    catch (error) 
    {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } 
    // egal, ob erfolgreich or Fehler saving zurücksetzen
    finally 
    {
      setSaving(false);
    }
  };

  //----------------- Abmelden --------------------------------
  const handleSignOut = async () => 
  {
    await supabase.auth.signOut();
  };

  if (loading) 
  {
    return (
      <BMWLayout>
        <div className="start-main">
          <div className="text-gray-600">Loading profile...</div>
        </div>
      </BMWLayout>
    );
  }

  if (!user) 
  {
    return (
      <BMWLayout>
        <div className="start-main">
          <h1 className="main-title">Access Denied</h1>
          <p className="text-lg text-gray-600">Please log in to view your profile.</p>
        </div>
      </BMWLayout>
    );
  }

  return (
    <BMWLayout>
      <div className="start-main">
        <h1 className="main-title">Mein Profil</h1>

        <div style={{
          background: 'var(--bg-light)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-medium)',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--bmw-blue), var(--bmw-red))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '48px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {(profile?.full_name || profile?.email || 'U').charAt(0).toUpperCase()}
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '8px'
            }}>
              {profile?.full_name || 'BMW User'}
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'var(--text-medium)',
              marginBottom: '20px'
            }}>
              {profile?.email}
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'rgba(3, 15, 255, 0.1)',
                borderRadius: 'var(--radius-medium)',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--bmw-blue)',
                  marginBottom: '5px'
                }}>
                  {highlightsCount}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-medium)',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Favoriten
                </div>
              </div>

              <div style={{
                background: 'rgba(227, 26, 28, 0.1)',
                borderRadius: 'var(--radius-medium)',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'var(--bmw-red)',
                  marginBottom: '5px'
                }}>
                  {new Date(profile?.created_at || '').getFullYear()}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-medium)',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Mitglied seit
                </div>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div style={{
            borderTop: '2px solid rgba(0, 0, 0, 0.1)',
            paddingTop: '30px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-dark)',
              marginBottom: '20px'
            }}>
              Profil Einstellungen
            </h3>

            {editing ? (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  marginBottom: '8px'
                }}>
                  Vollständiger Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-medium)',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    marginBottom: '20px'
                  }}
                  placeholder="Ihr vollständiger Name"
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={updateProfile}
                    disabled={saving}
                    style={{
                      background: 'linear-gradient(135deg, var(--bmw-blue), #1E40AF)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: saving ? 0.7 : 1
                    }}
                  >
                    {saving ? 'Speichern...' : 'Speichern'}
                  </button>

                  <button
                    onClick={() => {
                      setEditing(false);
                      setFullName(profile?.full_name || "");
                    }}
                    style={{
                      background: 'transparent',
                      color: 'var(--text-medium)',
                      border: '2px solid rgba(0, 0, 0, 0.1)',
                      padding: '12px 24px',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: 'var(--radius-medium)',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-medium)',
                      marginBottom: '4px'
                    }}>
                      Name
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--text-dark)'
                    }}>
                      {profile?.full_name || 'Nicht angegeben'}
                    </div>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    style={{
                      background: 'var(--bmw-blue)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-small)',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Bearbeiten
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: 'var(--radius-medium)'
                }}>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-medium)',
                      marginBottom: '4px'
                    }}>
                      E-Mail
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--text-dark)'
                    }}>
                      {profile?.email}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-light)',
                    fontStyle: 'italic'
                  }}>
                    Nicht änderbar
                  </div>
                </div>
              </div>
            )}

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              style={{
                background: 'linear-gradient(135deg, var(--bmw-red), #FF4444)',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: 'var(--radius-medium)',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </BMWLayout>
  );
}