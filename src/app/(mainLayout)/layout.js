import "../globals.css";
import Hotbar from '../../components/Hotbar'
import PrivateRoute from "../../components/PrivateRoute";

export default function RootLayout({ children }) {
  return (
    <PrivateRoute> 
      <div className="flex flex-col min-h-screen">
        <Hotbar />
        <main className="flex-1 pt-[101px] max-h-full pb-6 overflow-y-auto">
          <div>
            {children}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}