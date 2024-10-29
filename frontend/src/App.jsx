// App.jsx
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WelcomeScreen from './pages/Public/WelcomeScreen';
import SignInScreen from './pages/GestionUsuarios/Public/SignInScreen';
import SignUpScreen from './pages/GestionUsuarios/Public/SignUpScreen';
import AdminUsersScreen from './pages/GestionUsuarios/Admin/AdminUsersScreen';
import UsersScreen from './pages/GestionUsuarios/User/UsersScreen';
import EditUserScreen from './pages/GestionUsuarios/User/EditUserScreen';
import ChangeEmail from './pages/GestionUsuarios/User/ChangeEmail';
import ChangePassword from './pages/GestionUsuarios/User/ChangePassword';
import Unauthorized from './pages/GestionUsuarios/Public/Unauthorized';
import UserHomeScreen from './pages/Home/UserHomeScreen';
import UserBooksScreen from './pages/GestionLibros/User/UserBooksScreen';
import AddBookScreen from './pages/GestionLibros/User/AddBookScreen';
import EditBookScreen from './pages/GestionLibros/User/EditBookScreen';
import AdminBooksScreen from './pages/GestionLibros/Admin/AdminBooksScreen';
import UserInventoryScreen from './pages/GestionCompras/User/UserInventoryScreen';
import UserInventoryAdd from './pages/GestionCompras/User/UserInventoryAdd';
import UserOrderScreen from './pages/GestionCompras/User/UserOrderScreen';
import UserShoppingCartScreen from './pages/GestionCompras/User/UserShoppingCartScreen';
import UserCheckoutScreen from './pages/GestionCompras/User/UserCheckoutScreen';
import { UserProtected } from './pages/GestionUsuarios/User/UserProtected';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Importa ThemeProvider
import InventoryBooks from './pages/GestionCompras/User/InventoryBooks';
import UserInventoryEdit from './pages/GestionCompras/User/UserInventoryEdit';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <WelcomeScreen /> },
    { path: "/home", element: <UserProtected><UserHomeScreen /></UserProtected> },
    { path: "/signin", element: <SignInScreen /> },
    { path: "/signup", element: <SignUpScreen /> },
    { path: "/admin-users", element: <UserProtected requiredRole="admin"><AdminUsersScreen /></UserProtected> },
    { path: "/users", element: <UserProtected><UsersScreen /></UserProtected> },
    { path: "/users/:userId/edit", element: <UserProtected><EditUserScreen /></UserProtected> },
    { path: "/users/:userId/edit/email", element: <UserProtected><ChangeEmail /></UserProtected> },
    { path: "/users/:userId/edit/password", element: <UserProtected><ChangePassword /></UserProtected> },
    { path: "/admin-books", element: <UserProtected requiredRole="admin"><AdminBooksScreen /></UserProtected> },
    { path: "/books", element: <UserProtected><UserBooksScreen/></UserProtected> },
    { path: "/books/add", element: <UserProtected requiredRole="admin"><AddBookScreen/></UserProtected> },
    { path: "/books/:bookId/edit", element: <UserProtected requiredRole="admin"><EditBookScreen/></UserProtected> },
    { path: "/inventory", element: <UserProtected><UserInventoryScreen /></UserProtected> },
    { path: "/inventory/books/:bookId/add", element: <UserProtected><UserInventoryAdd /></UserProtected> },
    { path: "/inventory/:bookId/edit", element: <UserProtected><UserInventoryEdit /></UserProtected> },
    { path: "/inventory/books", element: <UserProtected><InventoryBooks/></UserProtected> },
    { path: "/cart", element: <UserProtected><UserShoppingCartScreen /></UserProtected> },
    { path: "/checkout", element: <UserProtected><UserCheckoutScreen /></UserProtected> },
    { path: "/order/:orderId", element: <UserProtected><UserOrderScreen /></UserProtected> },
    { path: "/unauthorized", element: <Unauthorized /> }
  ]);

  return (
    <ThemeProvider> {/* Envolver la app en ThemeProvider */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
