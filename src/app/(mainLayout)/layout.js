import "../globals.css";
import Hotbar from '../../components/Hotbar'

export default function RootLayout({ children }) {
  return (
    <main> 
        <Hotbar />
        {children} 
    </main>
  );
}