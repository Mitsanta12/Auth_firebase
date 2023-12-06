import './verifyEmail.css';
import React, { useEffect } from 'react';
import { useAuthValue } from './AuthContext';
import { useState } from 'react';
import { auth } from './firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { currentUser, setTimeActive } = useAuthValue();
  const [time, setTime] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailVerified = async () => {
      try {
        await currentUser?.reload();
        if (currentUser?.emailVerified) {
          navigate('/');
        }
      } catch (err) {
        alert(err.message);
      }
    };

    const interval = setInterval(checkEmailVerified, 1000);

    return () => clearInterval(interval);
  }, [currentUser, navigate]);

  useEffect(() => {
    let interval = null;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong>
          <br />
          <span>{currentUser?.email}</span>
        </p>
        <span>Follow the instruction in the email to verify your account</span>
        <button onClick={resendEmailVerification} disabled={time > 0}>
          Resend Email {time > 0 && time}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
