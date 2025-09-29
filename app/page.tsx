//-------------- Benutzeroberfläache ----------------------------

//Client-Komponente => Erstellung von UI & Nutzung von React-Hooks
"use client";


//-------------- React Hooks --------------------------------------

// useRef => rendert einzelne Elemente 
// useEffect => macht Nebeneffekte (z.B. EventListener) möglich
import {useEffect, useRef } from "react";
import BMWLayout from "@/components/bmw-layout";
//Objekt mit BMW-Modellen 
import { bmwModels } from "@/lib/bmw-data";
//Next.js Bild-Komponente => "next/image" => aus Supabase 
import Image from "next/image";


//-------------- Hauptkomponente ----------------------------------

//export => Freigabe -> Import -> automatische Übernahme -> NextJs
export default function HomePage() 
{

  //-------------- Bmw Karten  ----------------------------------

  //containerRefs => Array => speichert <div>-Elemente (card-scroll-container => BMW- Karten)
  //useRef => für auto-scroll -> Zugriff auf DOM-Elemente(<div>..)
  //null => Startwert => Array anfangs leer
  //letzte Klammer => ([]) => Startwert => leeres Array
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  //-------------- Automatisches Scrollen -------------------------

  //useEffekt => braucht DOM- Elemente zum hinzufügen von EventListener
  useEffect(() => 
  {
    //Funktion zum Scrollen durch Ketegorien
    //container => card-scroll-container ,
    //index = Position in card-scroll-container => Kategorien
    const handleMouseMove = (container: HTMLDivElement, index: number) => 
    {
      //Speicher von Timer + Startwert = null
      //NodeJS.Timeout => TypeScript-Typ 
      // NodeJS.Timeout | null = null => kann entweder TimerHandle sein or null
      let scrollInterval: NodeJS.Timeout | null = null;

      //bei Bewegung durchs Container
      //MouseEvent = TypeScript-Typ-Annotation
      //e: Kurzform für Event
      const onMouseMove = (e: MouseEvent) => 
      {
        //------ Containerangaben pro sichtbarer Teil des Bildschirm -------- 
        
        //getBoundingClientRect() => exakte Position & Breite => Container
        const rect = container.getBoundingClientRect();

        //--------------Mauspositionsberechnung-----------------

        //Mausposition (links, rechts = width) - linke Kante => Bildschirmrand
        //=> welcher Teil des Containers (mittlere, rechter, linker)
        const x = e.clientX - rect.left;
        //Containerbreite = Containerbreite in pixeln
        const width = rect.width;


        //-------------- Bedingung beim Timer zum Scrollen ----------------

        //scrollInterval => nur ein Timer pro Container => kein gleichzeitiges Scrollen möglich
        if (scrollInterval) 
        {
          //neuer Mouse Move => alter Timer wird entfernt 
          clearInterval(scrollInterval);
          scrollInterval = null;
        }

        //-------------- Scrollen mit Timer (400 Pixel pro sec) ----------------

        //Berechnung: 4 * ( 1000ms/10 [weil 1000ms - 1 sec =]) = 400px/sec
        // DOM-Eigenschaft zum Scrollen => scrollLeft

        // Scroll Positionsverschiebung um 4 Pixel (Größe/Position) pro Timer-Schritt
        const speed = 4;
        //wenn linkes Drittel => - => links scrollen
        if (x < width / 3) 
        {
          scrollInterval = setInterval(() => 
          {
            container.scrollLeft -= speed;
            if (container.scrollLeft <= 0) 
            {
              if (scrollInterval) clearInterval(scrollInterval);
            }
          }, 10); //alle 10 millisec => 1 Schritt 
        } 
        //wenn rechtes Drittel => + => rechts scrollen
        else if (x > width * 2 / 3) 
        {
          scrollInterval = setInterval(() =>
          {
            container.scrollLeft += speed;
            //maxScroll => Berechnung vom maximalen scrollLeft, ab da ist an rechts
            //scrollWidth = gesamte Breite aller inneren Inhalte (z. B. alle Karten nebeneinander).
            //clientWidth = sichtbare Breite des Containers (wie breitman das Fenster siehst).
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScroll) 
            {
              if (scrollInterval) clearInterval(scrollInterval);
            }
          }, 10);
        }
      };

      //Maus verlässt Container => Timer Stop => Scrollen bendet
      const onMouseLeave = () => 
      {
        if (scrollInterval)
        {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
      };
      //mousemove, mouseleave => Event-Namen
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);

      return () => 
      {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
        if (scrollInterval) clearInterval(scrollInterval);
      };
    };

    //---------------- CleanUp ---------------------

    const cleanupFunctions: (() => void)[] = [];

    containerRefs.current.forEach((container, index) => 
    {
      if (container) 
      {
        cleanupFunctions.push(handleMouseMove(container, index));
      }
    });

    return () => 
    {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  //---------------- Bmw Karten Erzeugung  ---------------------

  //model = Pfeilfuntion => erzeugt Karte + Bild + Text
  const createCards = (model: any) => 
  {
    //erstellt ein <div> mit diesen Dtaen: 
    return (
      <div key={model.name} className="bmw-card">
        <Image
          src={model.bild}
          alt={`BMW ${model.name}`}
          width={200}
          height={140}
          className="bmw-image"
        />
        <div className="bmw-content">
          <h3 className="bmw-title">BMW {model.name}</h3>
          <br />
          <p className="bmw-location">Typ: {model.typ} – {model.bes}</p>
        </div>
      </div>
    );
  };

  return (
    //ref => Callback-Funktion => useRef => containerRefs.current => useEffekt => EvenListener
    // Object.entries(bmwModels) => geht alle Kategorien durch
    // createCards => erzeugt Bmw-Karten horizontal 
    <BMWLayout>
      <div className="bmw-m-stripes">
        <main>
          <div id="car-grid">
            {Object.entries(bmwModels).map(([category, models], categoryIndex) => (
              <section key={category} className="category-block">
                <h2 className="category-title">{category}</h2>
                <div
                  className="card-scroll-container"
                  ref={(el) => {containerRefs.current[categoryIndex] = el}}
                >
                  <div className="card-grid-horizontal">
                    {models.map((model) => createCards(model))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </BMWLayout>
  );
}
