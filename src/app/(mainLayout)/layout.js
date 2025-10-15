import "../globals.css";
import Hotbar from '../../components/Sidebar'
import PrivateRoute from "../../components/PrivateRoute";

export default function RootLayout({ children }) {
  return (
    <PrivateRoute> 
      <div className="flex min-h-screen">
        <Hotbar />
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle,_#0077FF39,_#F3F5F729)]">
          <div className="h-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 max-md:py-4">
            {children}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}