import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ForumsComponent } from '../components/ForumsComponent';

export const Forums = () => {
  // CHECK FOR COOKIE
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }
  
  return (
    <>
        <Navbar />
        <Header txt="Find a forum" />
        <ForumsComponent />
        <Footer />
    </>
  )
}
