import "../globals.css"; // Você pode importar os mesmos estilos globais

export default function RootLayout({  children }) {
  return (
    <main>
        {children}
    </main>
  );
}