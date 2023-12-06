import React from 'react';
import './profile.css';
import { useAuthValue } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <div className='center'>
      <div className='profile'>
        <h1>Profile</h1>
        <div className='profile-info'>
          {/* Affichage de l'email */}
          <div className='profile-item'>
            <strong>Email:</strong> {currentUser?.email}
          </div>
          {/* Affichage du nom d'affichage */}
          <div className='profile-item'>
            <strong>Display Name:</strong> {currentUser?.displayName || 'N/A'}
          </div>
          {/* Affichage du numéro de téléphone */}
          <div className='profile-item'>
            <strong>Phone Number:</strong> {currentUser?.phoneNumber || 'N/A'}
          </div>
          {/* Affichage de la photo */}
          <div className='profile-item'>
            <strong>Photo:</strong>{' '}
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt='User' className='profile-photo' />
            ) : (
              'N/A'
            )}
          </div>
          {/* Affichage de la vérification de l'email */}
          <div className='profile-item'>
            <strong>Email verified:</strong> {`${currentUser?.emailVerified}`}
          </div>
        </div>
        {/* Bouton de déconnexion */}
        <button className='sign-out-btn' onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
