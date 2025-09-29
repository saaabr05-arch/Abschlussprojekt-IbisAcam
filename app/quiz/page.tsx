//Clientkomponente => Läuft im Browser, nicht Server
// => React Hooks, Browser-APIs(Events, next/image)
"use client";

//React Hook => rerendert 
import { useState } from "react";
//Komponenternübernahme => Nav, Footer usw
import BMWLayout from "@/components/bmw-layout";
import { quizQuestions, bmwCars, BMWCar } from "@/lib/bmw-data";
//Supabase -Client, um Likes in DB zu speichern / Auth
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";


//--------------- Vererbung von BMWCar (Daten) in Quizresults ----------

//interface = TypeScript (definiert einen Typ (Schnittstelle für Objekte))
//QuizResults => alle Felder von BMWCar
interface QuizResult extends BMWCar 
{
  // Datenerweiterung (score) von QuizResults
  //score = Nummer (Punkte)
  score: number;
}


//----------------- Hauptkomponente (QuizPage)--------------------

export default function QuizPage() 
{
  //aktueller Wert, Funktion(ändert) = Reakt - Hook (rendern)
  //useState(false) => Startwert => kein re-rendern
  //useState(0) => Startwert => wenn 0 , 1te Frage anzeigen

  //********* Anzeigen (sichtbar [*rendern*] or nt) ****
  const [showQuizOverlay, setShowQuizOverlay] = useState(false);
  const [showResultsOverlay, setShowResultsOverlay] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //********* Speicher ****
  const [userTags, setUserTags] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [likedCars, setLikedCars] = useState<QuizResult[]>([]);


  //-------------------- Quiz starten ----------------------------
 
  //alles zrksetzen & Quiz anzeigen 
  const startQuiz = () => 
  { 
    //0 => 1te Frage 
    setCurrentQuestion(0);
    setUserTags([]);
    setQuizResults([]);
    // falls Ergebnisoverlay offen => schließen (unsichtbar machen)
    setShowResultsOverlay(false);
    //true => rendern => Quiz wird angezeigt
    setShowQuizOverlay(true);
  };


  //-------------------- Quiz beantworten ---------------------------

  //answerIndex: number => Index der angeklickten Antwort
  const selectAnswer = (answerIndex: number) => 
  {
    //Aktuelle Frage = alle Quizfragen[index aktuelle Fage]
    const question = quizQuestions[currentQuestion];
    // wenn es keine Fragen gibt, 
    if (!question) return;

    //****** Antwortdaten speichern  ****
    //  question.answers = bmw - data 
    const selectedAnswer = question.answers[answerIndex];

    //******* Tag speichern *************
    // [... ] => Kopie der bisherigen Tags & des aktuellen (neuen)
    // selectedAnswer.tags = aus der gewählten Antwort, die tags 
    const newTags = [...userTags, ...selectedAnswer.tags];
    setUserTags(newTags);

    //Fragen durchlaufen => letzte Frage => Ergebnisse brechenen durch Tags
    //aktuelle Frage +1 ( bei 0) < letzte Frage
    if (currentQuestion + 1 < quizQuestions.length) 
    {
      //set => nächte Frage anzeigen
      setCurrentQuestion(currentQuestion + 1);
    } 
    else 
    {
      calculateResults(newTags);
    }
  };


  //-------------------- Ergebnissberechnung ---------------------------
  
  //finalTgags => Array mit allen gesammelten Tags, während Quiz
  const calculateResults = (finalTags: string[]) => 
  {
    console.log('Calculating results with tags:', finalTags);

    //Speicher der bewerteten Autos
    // carScores = neues Array vom Typ QuizResult [] also soll Aufbau nach QuizResult haben
    // bmwCars => Objekte durchlaufen einzeln => in car gespeichert
    const carScores: QuizResult[] = bmwCars.map(car => 
    {
      //*********** Tags Durchlauf *******************
      //Startwert 
      let score = 0;
      car.tags.forEach(tag => 
      {
        //finalTags.filter => filtert 
        //.length zählt Übereinstimmungen zwischen den Tags, die es gibt & von mir gewählten Tags
        //tagCount = Anzahl der Übereinstimmungen für genau ein Tag / Auto
        const tagCount = finalTags.filter(userTag => userTag === tag).length;
        
        //Gemsamtscore:
        score += tagCount;
      });
      return { ...car, score };
    });

    //sotiert nach Punkten absteigend
    carScores.sort((a, b) => b.score - a.score);
    //ersten 3 Elemente rausnehmen
    const top3 = carScores.slice(0, 3);
    console.log('Top 3 results:', top3);

    setQuizResults(top3);
    setShowQuizOverlay(false);
    setShowResultsOverlay(true);
  };


  //-------------------- Quiz wiederholen ---------------------------
  //Werte zrksetzen
  const restartQuiz = () => 
  {
    //ausblenden 
    setShowResultsOverlay(false);
    setShowQuizOverlay(false);
    //zrksetzen
    setCurrentQuestion(0);
    setUserTags([]);
    setQuizResults([]);
  };


  //--------------------- LIKEN -----------------------------------------
  
  //async => weil an Supabase Daten geschickt werden später => API - Aufruf
  const toggleLike = async (carIndex: number) => 
  {
    //angeklicktes Auto => aus QuizResults (Array) holen durch carIndex 
    const car = quizResults[carIndex];

      //************************** Datenbank- Zugriff ********************* */
      try 
      {
        // createClient() => Supabaseverbing
        const supabase = createClient();
        //aktuell angemelden Benutzer holen
        //getUser() => asynchrone Funktion (API-Aufruf zu Supabase) => um Infos über User zu holen
        const { data: { user } } = await supabase.auth.getUser();


      //alle bisherigen + alte reinkopierne
      //prev ist der aktuelle Wert des States => durch React von useState übergeben
      setLikedCars(prev => [...prev, car]);


      //Auto in die Datenbank einfügen
      //wenn user eingeloggt ist
      if (user) 
      {
        await supabase
          //aus Tabelle user_highlighlights von Supabase
          .from('user_highlights')
          //Daten hinzufügen
          .insert({
            user_id: user.id,
            name: car.name,
            category: car.category,
            why: car.why,
            tags: car.tags,
            image: car.image,
            score: car.score
          });
      }
    } 
    //Fehlerbehandlung, wenn nicht gelikte => keine Highlights
    catch (error) 
    {
      console.error('Error saving highlight:', error);
    }
  };


  //------------------------------ bei Klick -----------------------------
  
  //React.MouseEvent => Infos über Mausposition, gedrückte Taste usw.
  //overlayType: 'quiz' | 'results' => nur 'quiz' oder 'results' erlaubt => auf HTML => text dazu
  const handleOverlayClick = (e: React.MouseEvent, overlayType: 'quiz' | 'results') => 
  {
    //e.target => das angeklickte Element
    // e.currentTarget => Overlay

    //wenn aufs Overlay geklickt wurde => Overlay schließen
    // wenn der User = OverlY KLICKT 
    if (e.target === e.currentTarget) 
    {
      if (overlayType === 'quiz') 
      {
        setShowQuizOverlay(false);
      } 
      else 
      {
        setShowResultsOverlay(false);
      }
    }
  };

  //Progess in Prozent => (currentQuestion + 1) -> damit kein / 0
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  //aktuelle Frage
  const question = quizQuestions[currentQuestion];
  const ranks = ['🥇', '🥈', '🥉'];
  const rankClasses = ['gold', 'silver', 'bronze'];

  console.log('Current question index:', currentQuestion);
  console.log('Total questions:', quizQuestions.length);
  console.log('Current question:', question);

  return (
    <BMWLayout>
      {/* Start Seite */}
      <div className="start-main">
        <h1 className="main-title">Welcher BMW passt zu dir am besten?</h1>
        <button className="start-quiz-btn" onClick={startQuiz}>
          <span className="start-quiz-text">Starte Quiz</span>
        </button>
      </div>

      {/* Quiz Overlay */}
      {showQuizOverlay && (
        <div
          className="quiz-overlay"
          //erstellete Funktion => handleOverlayClick => wenn Klick aufs Overlay
          // => das Wort quiz übergeben 
          onClick={(e) => handleOverlayClick(e, 'quiz')}

        //style={{ width: `${progress}%` } => setzt die Breite des Balkens je nach Wert
        >
          <div className="quiz-container">
            <div className="quiz-header">
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="question-counter">
                Frage {currentQuestion + 1} von {quizQuestions.length}
              </div>
            </div>

            <div className="quiz-body">
              <div className="question-text">
                {question?.question}
              </div>
              <div className="answers-grid">
                {question?.answers.map((answer, index) => (
                  //{question?.question} = wenn Question existiert
                  //{question?.answers = wenn Question existiert, antworten durchlaufen
                  <div
                    key={index}
                    className="answer-option"
                    onClick= {() => 
                    {
                      console.log('Clicked answer:', index, answer.text);
                      //Funktionsaufruf => fügt Tag zu userTags hinzu
                      selectAnswer(index);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {answer.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Overlay */}
      {showResultsOverlay && (
        <div
          className="results-overlay"
          onClick={(e) => handleOverlayClick(e, 'results')}
        >
          <div className="results-container">
            <div className="results-header">
              <div className="results-title">Ihre Top 3</div>
            </div>
            <div className="results-content">
              <div>
                {quizResults.map((car, index) =>
                {
                  const isLiked = likedCars.some(likedCar => likedCar.name === car.name);

                  return (
                    <div key={index} className={`result-item ${rankClasses[index]}`}>
                      <div className="rank-stripe"></div>
                      <div className="result-content">
                        <div className="car-image-container">
                          <Image
                            src={car.image}
                            alt={car.name}
                            width={120}
                            height={80}
                            className="car-image"
                          />
                          <div className="heart-overlay">
                            <button
                            //${isLiked ? 'liked' : '' => boolean => true (liked), false(leer)
                              className={`heart-btn ${isLiked ? 'liked' : ''}`}
                              onClick={() => toggleLike(index)}
                            >
                              ♥
                            </button>
                          </div>
                        </div>
                        <div className="car-details">
                          <div className="car-rank">{ranks[index]}</div>
                          <div className="car-info">
                            <div className="car-name">{car.name}</div>
                            <div className="car-category">Kategorie: {car.category}</div>
                            <div className="car-why">{car.why}</div>
                            <div className="car-score">Match-Score: {car.score} Punkte</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="try-again-btn" onClick={restartQuiz}>
                Quiz wiederholen
              </button>
            </div>
          </div>
        </div>
      )}
    </BMWLayout>
  );
}
