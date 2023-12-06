import './App.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
<Router>
  {/* Fournit les informations d'authentification aux composants enfants */}
  <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
    <Routes>
      {/* Route pour la page d'accueil */}
      <Route exact path='/' element={
        /* Utilisation d'une route privée pour la page de profil */
        <PrivateRoute>
          {/* Composant de la page de profil */}
          <Profile/>
        </PrivateRoute>
      }/>
      {/* Route pour la page de connexion */}
      <Route path="/login" element={
        // Vérifie si l'utilisateur est connecté et a vérifié son email, sinon redirige vers la page d'accueil
        !currentUser?.emailVerified 
          ? <Login/> // Composant de la page de connexion
          : <Navigate to='/' replace/> // Redirection vers la page d'accueil
      } />
      {/* Route pour la page d'inscription */}
      <Route path="/register" element={
        // Vérifie si l'utilisateur est connecté et a vérifié son email, sinon redirige vers la page d'accueil
        !currentUser?.emailVerified 
          ? <Register/> // Composant de la page d'inscription
          : <Navigate to='/' replace/> // Redirection vers la page d'accueil
      } />
      {/* Route pour la page de vérification d'email */}
      <Route path='/verify-email' element={<VerifyEmail/>} /> 
    </Routes>  
  </AuthProvider>
</Router>

  );
}

export default App;
/**/