
  import { Route} from 'react-router-dom';
  import MangaPage from "@/pages/admin/MangaPage";
  import UserPage from '@/pages/admin/UserPage';
  import UserEditPage from '@/pages/admin/UserEditPage';
  import MangaEditPage from '@/pages/admin/MangaEditPage';
   const isAuthenticated = () => {
     // Replace with your authentication logic
     return !!localStorage.getItem('authToken');
   };
   const privateRoutes = [
      <Route path="manga" element={<MangaPage />} />,
      <Route path="users" element={<UserPage />} />,
      <Route path="users/edit/:id" element={<UserEditPage />} />,
      <Route path="manga/edit/:id" element={<MangaEditPage />} />
    ];
export default privateRoutes;