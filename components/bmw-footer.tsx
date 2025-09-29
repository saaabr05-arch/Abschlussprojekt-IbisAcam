import Link from "next/link";

export default function BMWFooter() {
  return (
    <footer style={{
      background: 'linear-gradient(145deg, var(--bmw-red) 0%, var(--bmw-red-dark) 50%, var(--bmw-red-darker) 100%)',
      color: 'var(--text-white)',
      marginTop: 'var(--section-spacing)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--section-spacing) var(--container-padding) 20px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '25px',
          borderRadius: 'var(--radius-xl)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: 'var(--text-white)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Navigation
          </h4>
          <ul style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '25px',
            background: 'none',
            padding: '0',
            listStyle: 'none'
          }}>
            <li>
              <Link href="/" style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                padding: '8px 16px',
                transition: 'var(--transition-medium)',
                borderRadius: 'var(--radius-small)'
              }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/quiz" style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                padding: '8px 16px',
                transition: 'var(--transition-medium)',
                borderRadius: 'var(--radius-small)'
              }}>
                Quiz
              </Link>
            </li>
            <li>
              <Link href="/protected/highlights" style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                padding: '8px 16px',
                transition: 'var(--transition-medium)',
                borderRadius: 'var(--radius-small)'
              }}>
                Highlights
              </Link>
            </li>
            <li>
              <Link href="/protected/profile" style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                padding: '8px 16px',
                transition: 'var(--transition-medium)',
                borderRadius: 'var(--radius-small)'
              }}>
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '50px',
          alignItems: 'start'
        }} className="footer-content">
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '25px',
            borderRadius: 'var(--radius-xl)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--text-white)',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Bayerische Motorenwerke AG
            </p>
            <p style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: '1.8',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-large)',
              borderLeft: '4px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              Freude am Fahren seit 1916. BMW steht für innovative Technologie,
              außergewöhnliches Design und nachhaltiger Mobilität für die Zukunft.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '25px',
            borderRadius: 'var(--radius-xl)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'var(--text-white)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Kontakt
            </h4>
            <div style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              <p>Email: <a href="mailto:info@bmw.com" style={{ color: 'var(--text-white)', textDecoration: 'none' }}>info@bmw.com</a></p>
              <p>Tel: <a href="tel:+4989382-0" style={{ color: 'var(--text-white)', textDecoration: 'none' }}>+49 89 382-0</a></p>
              <p>BMW AG<br />Petuelring 130<br />80788 München</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '400',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.5px'
          }}>
            © 2025 BMW – Alle Rechte vorbehalten
          </p>
          <div style={{
            display: 'flex',
            gap: '25px',
            flexWrap: 'wrap'
          }}>
            <a href="https://www.bmw.com/de/footer/imprint.html" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'var(--transition-medium)',
              padding: '5px 10px',
              borderRadius: 'var(--radius-small)'
            }}>
              Impressum
            </a>
            <a href="https://www.bmw.de/de/footer/metanavigation/data-privacy.html" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'var(--transition-medium)',
              padding: '5px 10px',
              borderRadius: 'var(--radius-small)'
            }}>
              Datenschutz
            </a>
            <a href="https://www.bmw-mann.at/agb" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'var(--transition-medium)',
              padding: '5px 10px',
              borderRadius: 'var(--radius-small)'
            }}>
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}