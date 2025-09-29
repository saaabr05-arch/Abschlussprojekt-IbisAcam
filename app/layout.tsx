import type { Metadata } from "next";
//für Google Fonts Einbindung über Next.js 
import { Geist } from "next/font/google";
//React- Komponente, verwaltet dark/light
import { ThemeProvider } from "next-themes";
//meine globale.css 
import "./globals.css";


//---------------- URL - sichere URL - <head> Metadaten ----------------

//************ URL **********************************
//Basis- Url, die man braucht für Metadaten
const defaultUrl = process.env.VERCEL_URL
  //wenn man eine URL live hat, ansonsten locale=> localhost:3000
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


//************ sichere URL + <head> Metadaten ********
//Objekt => NextJs => <head> - Metadaten erzeugen
//Metadata = Typ, dass beschreibt, wie ein Obejkt aussehen muss => Google usw
export const metadata: Metadata = 
{
  //Prüft, ob Metdata Title, Description usw. hat
  //metaDataBase => macht URL sauber & sicher 
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};


//---------------- Schrift -------------------------------------

const geistSans = Geist(
{
  variable: "--font-geist-sans",
  //schnlles Annzeigen der Seite
  display: "swap",
  //lädt nur benötigte Glyphen => spart Ladezeit
  subsets: ["latin"],
});


//---------------- Root Layout (Server-Komponente) -------------------------------------

// nimmt Children, gibt JSX zrk => returnt das fertige HTML-Skelett 
export default function RootLayout(
{
  //alle Komponenten usw z.B. cars/page.tsx => child
  children,
}
//darf nur gelesen, nt bearbeitet werden 
: Readonly<
{
  // children => Inhalt (Komponeneten) im Root Layout 
  // alles, was gerendert werden kann (HTM, Text, Komponenten)
  children: React.ReactNode;
}>) 
{
  //----------- Anzeige als Dark oder Light-Modus ----------------------------
  
  return (
    // suppressHydrationWarning => verhindert Fehlermeldungen, wenn beim Laden kurz 
    // Unterschied zwischen Client-HTML & Server-HTML

    //ThemeProvider => Komponente => gibt Einstellungen an alle Kinder weiter
    //hier: ThemeProvider => ob dark- or light-Modus
    //enableSystem => aktiviert die Funktion
    //disableTransitionOnChange => damit beim Wechsel 
    //zwischen dark/wight Modus nicht flackert
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
