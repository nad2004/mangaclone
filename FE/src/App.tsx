import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './components/context/theme/theme';
import { ThemeProviderCustom, useThemeMode } from './components/context/ThemeContext';
import Layout from './components/layouts/layout';
import publicRoutes from './routes/PublicRoutes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { Switch, FormControlLabel } from '@mui/material';
import privateRoutes from './routes/PrivateRoutes';
import AdminLayout from "@/components/layouts/AdminLayout";
const AppContent: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="default"
                />
              }
              label={`${mode === 'light' ? 'Dark' : 'Light'} Mode`}
              className="fixed z-50 top-4 right-40 "
            />

        <Router>
          <Routes>
            <Route path="/admin/*" element={ <AdminLayout>
              <Routes>
                {privateRoutes.map((route) => route)}
              </Routes>
            </AdminLayout>}></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Layout />}>{publicRoutes}</Route>
          </Routes>

        </Router>
      </Box>
    </ThemeProvider>
  );
};

/**
 * App chính – khởi tạo theme từ localStorage và bọc context toàn cục.
 */
function App() {
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  );
}

export default App;
