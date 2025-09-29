import BMWHeader from "./bmw-header";
import BMWNavigation from "./bmw-navigation";
import BMWFooter from "./bmw-footer";

//Definiert die Eigenschaften(props),
// die Layout erwratet
interface BMWLayoutProps 
{
  //Alles, was zwischen <BMWLayout> ... </BMWLayout> steht, 
  // wird als Inhalt an children übergeben.
  children: React.ReactNode;
}

export default function BMWLayout(
{ 
  children 
}
: BMWLayoutProps) 
{
  return (
    //mindestens die volle Bildschirmhöhe
    //Flexbox mit Spaltenrichtung 
    // (alles wird vertikal gestapelt).

    // <BMWHeader /> & <BMWNavigation />
    // werden auf jeder Seite angezeigt
    //flex-1: Platz zwischen Header und Footer = einnehmen

    //{children} =>alles, was im Seiteninhalt is
    //wird über children gerendet 
    <div className="min-h-screen flex flex-col">
      <BMWHeader />
      <BMWNavigation />
      <main className="flex-1">
        {children}
      </main>
      <BMWFooter />
    </div>
  );
}