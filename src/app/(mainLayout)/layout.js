import "../globals.css";

export default function RootLayout({  children }) {
  return (
    <main> 
        <h2>HOTBAR</h2>
        {children} 
    </main>
  );
}