import React, { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SliderComponent from './components/Slider';
import PresetsPage from './components/presets'; // Ensure correct import path
import AboutUs from './components/AboutUs';
import LoginComponent from './components/login'; // Ensure correct import path
import RegisterComponent from './components/Register';
import AdminDashboard from './Admin/AdminDashboard'; // Ensure correct import path
import Magic from './components/magic';
import ContactForm from './components/ContactUS';

function App() {
  const contactRef = useRef(null);

  // Function to scroll to the Contact section
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes that include Header and Contact */}
          <Route
            path="/"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <SliderComponent />
                <Contact ref={contactRef} />
              </>
            }
          />
          <Route
            path="/presets"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <PresetsPage />
                <Contact ref={contactRef} />
              </>
            }
          />
          <Route
            path="/magic"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <Magic />
                <Contact ref={contactRef} />
              </>
            }
          />
                <Route
            path="/contact"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <ContactForm/>
                <Contact ref={contactRef} />
              </>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <AboutUs />
                <Contact ref={contactRef} />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <LoginComponent />
                <Contact ref={contactRef} />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header scrollToContact={scrollToContact} />
                <RegisterComponent />
                <Contact ref={contactRef} />
              </>
            }
          />

          {/* Admin Dashboard Route without Header and Contact */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
