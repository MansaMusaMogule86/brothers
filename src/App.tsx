import React, { useState, useEffect } from 'react';
import { PageId, DnaProfile } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BrothersDNA } from './components/BrothersDNA';
import { DnaPassportCard } from './components/DnaPassportCard';
import { BrothersDayBuilder } from './components/BrothersDayBuilder';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { BrothersConcierge } from './components/BrothersConcierge';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [customProfile, setCustomProfile] = useState<DnaProfile | null>(null);
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationService, setConsultationService] = useState<string>('Private Consultation');
  const [conciergeOpen, setConciergeOpen] = useState<boolean>(false);

  // Smooth scroll to top on page navigation
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setConsultationService(serviceTitle);
    }
    setConsultationOpen(true);
  };

  const handleDnaComplete = (profile: DnaProfile) => {
    setCustomProfile(profile);
  };

  const handleScheduleItinerary = (summary: string) => {
    setConsultationService(summary);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#101110] text-[#F1EEE8] flex flex-col font-sans selection:bg-[#B9A17B] selection:text-[#101110]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenConsultation={() => handleOpenConsultation('Private Sanctuary Admission')}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'experiences' && (
          <ExperiencesPage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {(currentPage === 'private-training' ||
          currentPage === 'pilates' ||
          currentPage === 'boxing' ||
          currentPage === 'movement' ||
          currentPage === 'recovery') && (
          <ServiceDetailPage
            pageId={currentPage}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'dna' && (
          <div className="py-12">
            <BrothersDNA
              onComplete={handleDnaComplete}
              onOpenConsultation={(protocol) => handleOpenConsultation(`Brothers DNA Protocol: ${protocol}`)}
              onNavigateToPassport={() => navigateTo('passport')}
            />
          </div>
        )}

        {currentPage === 'passport' && (
          <div className="py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block mb-2">
                MEMBER CREDENTIAL DEMONSTRATION
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8]">
                Digital Member Passport
              </h1>
              <p className="text-xs sm:text-sm text-[#969892] mt-2">
                This credential concept reflects active biomechanical protocols, sanctuary rhythm, and access privileges.
              </p>
            </div>
            <DnaPassportCard
              customProfile={customProfile}
              onOpenConsultation={handleOpenConsultation}
            />
          </div>
        )}

        {currentPage === 'brothers-day' && (
          <div className="py-8">
            <BrothersDayBuilder onScheduleItinerary={handleScheduleItinerary} />
          </div>
        )}

        {currentPage === 'membership' && (
          <MembershipPage
            onOpenConsultation={(tierName) => handleOpenConsultation(tierName || 'Private Membership')}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'consultation' && (
          <div className="py-16 px-6">
            <ConsultationModal
              isOpen={true}
              onClose={() => navigateTo('home')}
              initialProtocol="General Private Consultation"
              onNavigateToDna={() => navigateTo('dna')}
            />
          </div>
        )}

        {currentPage === 'contact' && (
          <ContactPage onOpenConsultation={() => handleOpenConsultation('Sanctuary Visit')} />
        )}

        {currentPage === 'privacy' && <PrivacyPage />}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenConsultation={() => handleOpenConsultation('General Inquiry')}
      />

      {/* Global Modals & Drawers */}
      <BrothersConcierge
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        onNavigate={(p) => navigateTo(p as PageId)}
        onOpenConsultation={() => {
          setConciergeOpen(false);
          handleOpenConsultation('Concierge Referral');
        }}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialProtocol={consultationService}
        onNavigateToDna={() => navigateTo('dna')}
      />
    </div>
  );
}
