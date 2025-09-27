import "../globals.css";
import Hotbar from '../../components/Hotbar'
import PrivateRoute from "../../components/PrivateRoute";

export default function RootLayout({ children }) {
  return (
    <PrivateRoute> 
      <main>
        <Hotbar />
          {children}
      </main>
    </PrivateRoute>
  );
}