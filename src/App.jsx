import React from 'react'
import SplashScreen from './pages/SplashScreen/index'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MoodTracker from './pages/MoodTracker'
import MoodAssesment from './pages/MoodPage'
import ReadingPage from './pages/ReadingCorner'
import Profile from './pages/Profile'
import ChatAI from './pages/ChatAI'
import DearDiary from './pages/DearDiary'
import PublicDiary from './pages/PublicDiary'
import AddDiary from './pages/AddDiary'
import Psikiater from './pages/Psikiater'
import PsikiaterProfile from './pages/PsikiaterProfile'
import PaymentPage from './pages/PaymentPage'
import ChatDoctor from './pages/ChatDoctor'
import PsikologHistory from './pages/PsikologHistory'
import ConsultationDetail from './pages/ConsultationDetail'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import RedirectIfAuthenticated from './RedirectIfAuthenticated'
import Register from './pages/Register/Register'
import ARScan from './pages/ARScan'
import PaymentCardPage from './pages/PaymentPage/PaymentCard'
import RulesPage from './pages/PaymentPage/Rules'
import PasienDiary from './pages/DearDiary/PasienDiary'
import MoodPasien from './components/Doctor/MoodPasien'
// import PaymentRulesPage from './pages/PaymentPage/PaymentRules'

function App() {
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <>
          <div className="sm:hidden block">
            <Routes>
              <Route
                path="/login"
                element={
                  <RedirectIfAuthenticated>
                    <Login />
                  </RedirectIfAuthenticated>
                }
              />
              <Route
                path="/landing"
                element={
                  <RedirectIfAuthenticated>
                    <LandingPage />
                  </RedirectIfAuthenticated>
                }
              />
              <Route
                path="/"
                element={
                  <RequireAuth loginPath="/landing">
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectIfAuthenticated>
                    <Register />
                  </RedirectIfAuthenticated>
                }
              />
              <Route
                path="/mood-tracker"
                element={
                  <RequireAuth loginPath="/landing">
                    <MoodTracker />
                  </RequireAuth>
                }
              />
              <Route
                path="/mood-assesment"
                element={
                  <RequireAuth loginPath="/landing">
                    <MoodAssesment />
                  </RequireAuth>
                }
              />
              <Route
                path="/reading-corner"
                element={
                  <RequireAuth loginPath="/landing">
                    <ReadingPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth loginPath="/landing">
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/dear-diary"
                element={
                  <RequireAuth loginPath="/landing">
                    <DearDiary />
                  </RequireAuth>
                }
              />
              <Route
                path="/add-diary"
                element={
                  <RequireAuth loginPath="/landing">
                    <AddDiary />
                  </RequireAuth>
                }
              />
              <Route
                path="/public-diary"
                element={
                  <RequireAuth loginPath="/landing">
                    <PublicDiary />
                  </RequireAuth>
                }
              />
              <Route
                path="/pasien-diary"
                element={
                  <RequireAuth loginPath="/landing">
                    <PasienDiary />
                  </RequireAuth>
                }
              />
              <Route
                path="/mood-pasien"
                element={
                  <RequireAuth loginPath="/landing">
                    <MoodPasien />
                  </RequireAuth>
                }
              />
              <Route
                path="/psikiater"
                element={
                  <RequireAuth loginPath="/landing">
                    <Psikiater />
                  </RequireAuth>
                }
              />
              <Route
                path="/psikolog-history"
                element={
                  <RequireAuth loginPath="/landing">
                    <PsikologHistory />
                  </RequireAuth>
                }
              />
              <Route
                path="/payment"
                element={
                  <RequireAuth loginPath="/landing">
                    <PaymentPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/payment-rules"
                element={
                  <RequireAuth loginPath="/landing">
                    <RulesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/payment-card"
                element={
                  <RequireAuth loginPath="/landing">
                    <PaymentCardPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/consultation"
                element={
                  <RequireAuth loginPath="/landing">
                    <ConsultationDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="/psikiater-profile"
                element={
                  <RequireAuth loginPath="/landing">
                    <PsikiaterProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat-ai"
                element={
                  <RequireAuth loginPath="/landing">
                    <ChatAI active={true} />
                  </RequireAuth>
                }
              />
              <Route
                path="/ar-scan"
                element={
                  <RequireAuth loginPath="/landing">
                    <ARScan />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat-doctor"
                element={
                  <RequireAuth loginPath="/landing">
                    <ChatDoctor />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
          <div className="sm:block hidden"></div>
        </>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App