
  import { Route} from 'react-router-dom';
  import MangaPage from "@/pages/admin/MangaPage";
  import UserPage from '@/pages/admin/UserPage';
   const isAuthenticated = () => {
     // Replace with your authentication logic
     return !!localStorage.getItem('authToken');
   };
   const privateRoutes = [
      <Route path="manga" element={<MangaPage />} />,
      <Route path="users" element={<UserPage />} />
    ];
export default privateRoutes;