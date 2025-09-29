import BMWLayout from "@/components/bmw-layout";
import BMWHighlights from "@/components/bmw-highlights";

export default function HighlightsPage() 
{
  return (
    <BMWLayout>
      <h1 style={{
        color: '#8D0015',
        fontSize: 'clamp(20px, 4vw, 32px)',
        fontFamily: 'Ibarra Real Nova, serif',
        fontWeight: '600',
        padding: 'var(--section-spacing) 0',
        textAlign: 'center'
      }}>
        Deine Favouriten:
      </h1>
      <BMWHighlights />
    </BMWLayout>
  );
}
