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
function App() {
  return (
    <BrowserRouter>
      <>
        <div className='sm:hidden block'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/mood-assesment" element={<MoodAssesment />} />
            <Route path="/reading-corner" element={<ReadingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dear-diary" element={<DearDiary />} />
            <Route path="/add-diary" element={<AddDiary />} />
            <Route path="/public-diary" element={<PublicDiary />} />
            <Route path="/psikiater" element={<Psikiater />} />
            <Route path="/psikolog-history" element={<PsikologHistory />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/consultation" element={<ConsultationDetail />} />
            <Route path="/psikiater-profile" element={<PsikiaterProfile />} />
            <Route path="/chat-ai" element={<ChatAI active={true} />} />
            <Route path="/chat-doctor" element={<ChatDoctor />} />
          </Routes>
        </div>
        <div className='sm:block hidden'></div>
      </>
    </BrowserRouter>
  );
}

export default App