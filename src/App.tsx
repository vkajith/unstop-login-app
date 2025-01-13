import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.context';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/login';
import Home from './pages/home';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="h-screen w-screen">
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
