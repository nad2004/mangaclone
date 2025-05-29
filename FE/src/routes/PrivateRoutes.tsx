   // src/routes/PrivateRoutes.tsx
   import React from 'react';
   import { Route, Routes, Navigate } from 'react-router-dom';
//    import Dashboard from '../pages/Dashboard';

   const isAuthenticated = () => {
     // Replace with your authentication logic
     return !!localStorage.getItem('authToken');
   };

   const PrivateRoutes = () => {
     return (
       <Routes>
         {/* <Route
           path="/dashboard"
           element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
         /> */}
       </Routes>
     );
   };

   export default PrivateRoutes;