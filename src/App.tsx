import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LessonsCatalogView } from './components/LessonsCatalogView';
import { LessonPlayerView } from './components/LessonPlayerView';
import { LessonResultView } from './components/LessonResultView';
import { HandbookView } from './components/HandbookView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { ProgramsView, ProgramType } from './components/ProgramsView';
import { GuestLandingView } from './components/GuestLandingView';
import { AuthModal } from './components/AuthModal';
import { EmailVerificationScreen } from './components/EmailVerificationScreen';
import { LESSONS_DATA } from './data/lessonsData';
import { Lesson } from './types';

function MainAppContent() {
  const { user, loading, isEmailVerified, saveProgress } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedProgram, setSelectedProgram] = useState<ProgramType>('au-pair');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Lesson player state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lastResult, setLastResult] = useState<{
    lesson: Lesson;
    scorePercent: number;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin"></div>
          <span className="text-xs uppercase tracking-widest text-zinc-600">Загрузка платформы Delfi...</span>
        </div>
      </div>
    );
  }

  // If not logged in, show guest landing page
  if (!user) {
    return (
      <>
        <GuestLandingView
          onOpenAuth={(mode) => {
            setAuthModalMode(mode);
            setAuthModalOpen(true);
          }}
          onOpenDemoLesson={() => {
            setAuthModalMode('signup');
            setAuthModalOpen(true);
          }}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />
      </>
    );
  }

  // Mandatory Email Verification Gate: Blocks access completely until confirmed
  if (!isEmailVerified) {
    return <EmailVerificationScreen />;
  }

  // Active Lesson Player Screen
  if (activeLesson) {
    return (
      <LessonPlayerView
        lesson={activeLesson}
        onExit={() => setActiveLesson(null)}
        onFinish={async (scorePercent, correctAnswers, totalQuestions) => {
          await saveProgress(
            activeLesson.id,
            scorePercent,
            correctAnswers,
            totalQuestions,
            activeLesson.passThreshold
          );
          setLastResult({
            lesson: activeLesson,
            scorePercent,
            correctAnswers,
            totalQuestions,
          });
          setActiveLesson(null);
        }}
      />
    );
  }

  // Active Lesson Result Screen
  if (lastResult) {
    return (
      <LessonResultView
        lesson={lastResult.lesson}
        scorePercent={lastResult.scorePercent}
        correctAnswers={lastResult.correctAnswers}
        totalQuestions={lastResult.totalQuestions}
        onRetry={() => {
          const l = lastResult.lesson;
          setLastResult(null);
          setActiveLesson(l);
        }}
        onNextLesson={(nextLessonId) => {
          const next = LESSONS_DATA.find((l) => l.id === nextLessonId);
          setLastResult(null);
          if (next) {
            setActiveLesson(next);
          } else {
            setActiveTab('lessons');
          }
        }}
        onGoToCatalog={() => {
          setLastResult(null);
          setActiveTab('lessons');
        }}
      />
    );
  }

  const handleStartLesson = (lessonId: string) => {
    const lesson = LESSONS_DATA.find((l) => l.id === lessonId);
    if (lesson && !lesson.isComingSoon) {
      setActiveLesson(lesson);
    }
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'au-pair') {
      setSelectedProgram('au-pair');
      setActiveTab('programs');
    } else if (tab === 'ausbildung') {
      setSelectedProgram('ausbildung');
      setActiveTab('programs');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] text-slate-900 font-sans">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto max-h-screen flex flex-col">
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              onStartLesson={handleStartLesson}
              onNavigateTab={handleSelectTab}
            />
          )}
          {activeTab === 'lessons' && (
            <LessonsCatalogView onStartLesson={handleStartLesson} />
          )}
          {(activeTab === 'programs' || activeTab === 'au-pair' || activeTab === 'ausbildung') && (
            <ProgramsView initialProgram={selectedProgram} />
          )}
          {activeTab === 'handbook' && (
            <HandbookView onStartLesson={handleStartLesson} />
          )}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'admin' && <AdminView />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
