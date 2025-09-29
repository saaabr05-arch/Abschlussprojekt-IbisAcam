"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import BMWLayout from "@/components/bmw-layout";
import { User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() 
{
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [highlightsCount, setHighlightsCount] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        await loadProfile(user.id);
        await loadHighlightsCount(user.id);
      }
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          id: userId,
          email: user?.email || "",
          full_name: user?.user_metadata?.full_name || ""
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert(newProfile)
          .select()
          .single();

        if (!createError && createdProfile) {
          setProfile(createdProfile);
          setFullName(createdProfile.full_name || "");
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadHighlightsCount = async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('user_highlights')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (!error) {
        setHighlightsCount(count || 0);
      }
    } catch (error) {
      console.error('Error loading highlights count:', error);
    }
  };

  const updateProfile = async () => {
    if (!user || !profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      } else {
        setProfile(prev => prev ? { ...prev, full_name: fullName } : null);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <BMWLayout>
        <div className="start-main">
          <div className="text-gray-600">Loading profile...</div>
        </div>
      </BMWLayout>
    );
  }

  if (!user) {
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