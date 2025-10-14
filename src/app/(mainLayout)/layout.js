import "../globals.css";
import Hotbar from '../../components/Sidebar'
import PrivateRoute from "../../components/PrivateRoute";

export default function RootLayout({ children }) {
  return (
    <PrivateRoute> 
      <div className="flex min-h-screen">
        <Hotbar />
        <main className="flex-1 pt-[70px] overflow-y-auto">
          <div className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 max-md:py-4 pt-4">
            {children}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}