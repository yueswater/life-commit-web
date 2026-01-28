import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AppRouter from './routers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-base-200 transition-colors duration-200">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
