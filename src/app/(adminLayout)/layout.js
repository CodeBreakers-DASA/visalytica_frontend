import "../globals.css";
import Hotbar from '../../components/Sidebar'
import PrivateRoute from "../../components/PrivateRoute";

export default function RootLayout({ children }) {
  return (
    <PrivateRoute> 
      <div className="flex min-h-screen">
        <Hotbar />
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle,_#0077FF39,_#F3F5F729)]">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}