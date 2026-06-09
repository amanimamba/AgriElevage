import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, QuizQuestion } from '../types';
import { 
  GraduationCap, 
  Video, 
  FileText, 
  Award, 
  CheckCircle, 
  X, 
  Play, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Share2,
  Lock,
  Download
} from 'lucide-react';

interface EducationHubProps {
  onOpenAuth: () => void;
}

export const EducationHub: React.FC<EducationHubProps> = ({ onOpenAuth }) => {
  const { courses, currentUser, passedQuizzes, setPassedQuizzes } = useApp();
  
  // Selection
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Tous');
  
  // Video player modal
  const [playingCourse, setPlayingCourse] = useState<Course | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  // Quiz interactive state
  const [activeQuizCourse, setActiveQuizCourse] = useState<Course | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // Certificate Modal view
  const [viewingCertificateCourse, setViewingCertificateCourse] = useState<Course | null>(null);

  const categories = ['Tous', 'Bovins', 'Volailles', 'Ovins'];

  const filteredCourses = courses.filter(c => {
    return activeTab === 'Tous' || c.category === activeTab;
  });

  const handleStartQuiz = (course: Course) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setActiveQuizCourse(course);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !activeQuizCourse) return;

    const question = activeQuizCourse.quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswerIndex;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 < activeQuizCourse.quizQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Finished!
      setQuizDone(true);
      const finalScore = isCorrect ? quizScore + 1 : quizScore;
      // Need 4/5 (80%) to pass!
      if (finalScore >= 4) {
        if (!passedQuizzes.includes(activeQuizCourse.id)) {
          setPassedQuizzes([...passedQuizzes, activeQuizCourse.id]);
        }
      }
    }
  };

  // Simulates downloading PDF guide
  const handleDownloadPDF = (e: React.MouseEvent, course: Course) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    alert(`⬇️ Téléchargement lancé : ${course.pdfUrl}\nCe guide technique d'AgriElevage Connect a été sauvegardé localement.`);
  };

  const handlePlayVideo = (course: Course) => {
    setPlayingCourse(course);
    setVideoProgress(35); // mock initial starting video progress
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#012520] via-[#011915] to-[#000e0c] text-stone-100 pb-20">
      
      {/* Premium Header */}
      <section className="bg-[#001714] border-b border-[#033a30] py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gradient-to-b from-[#00f2c3]/10 to-transparent blur-2xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <div className="inline-flex p-2.5 rounded-full bg-[#023129] border border-[#035547] text-[#00f2c3]">
            <GraduationCap className="w-8 h-8 animate-bounce" />
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Centre de Formation <span className="bg-gradient-to-r from-[#00f2c3] to-[#00f7a6] bg-clip-text text-transparent">AgriElevage</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Formez-vous aux meilleures pratiques agricoles modernes auprès de docteurs vétérinaires. Passez les mini-examens officiels et téléchargez vos attestations de réussite agréées !
          </p>

          {/* Quick tab switcher by category */}
          <div className="flex items-center justify-center pt-6">
            <div className="flex bg-[#001b18] p-1.5 rounded-full border border-[#033a30] space-x-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`py-1.5 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === cat 
                      ? 'bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold shadow-lg' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {cat === 'Tous' ? 'Tous les Élevages' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const hasPassed = passedQuizzes.includes(course.id);
            return (
              <div 
                key={course.id}
                className="group bg-[#012d26]/40 backdrop-blur-sm border border-[#034438] hover:border-[#00f2c3]/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Visual Header */}
                <div className="relative aspect-video bg-[#001714] overflow-hidden">
                  <img 
                    src={course.videoPoster} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button 
                      onClick={() => handlePlayVideo(course)}
                      className="w-12 h-12 rounded-full bg-[#00f2c3]/90 hover:bg-[#00f2c3] text-[#001714] flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-[#00f2c3] font-bold">
                    {course.category}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#012520]/80 text-[10px] font-semibold text-stone-200">
                    ⏱️ {course.duration}
                  </span>
                </div>

                {/* Course core info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#00b59c] font-bold">
                      Niveau {course.level}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-snug hover:text-[#00f2c3] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-2 pt-2">
                    
                    {/* Guide download button */}
                    <button 
                      onClick={(e) => handleDownloadPDF(e, course)}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#001e1a] border border-[#034d3f] text-stone-300 hover:text-white hover:border-[#00f2c3]/40 transition-all text-xs"
                    >
                      <span className="inline-flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-[#00b59c]" />
                        <span>Fiche Technique PDF</span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {/* Certifications / Quiz status box */}
                    {hasPassed ? (
                      <button
                        onClick={() => setViewingCertificateCourse(course)}
                        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500 text-[#00f7a6] text-xs font-bold uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                      >
                        <Award className="w-4.5 h-4.5 text-white animate-bounce" />
                        <span>Voir mon Attestation QR</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartQuiz(course)}
                        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(0,242,195,0.4)] transition-all cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Passer le mini-Quiz</span>
                      </button>
                    )}

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* 1. MOCK VIDEO PLAYER MODAL */}
      {playingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#012520] border border-[#034d3f] rounded-3xl p-6 relative">
            <button 
              onClick={() => setPlayingCourse(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-base text-white pr-8 mb-4">{playingCourse.title}</h3>
            
            {/* Dark mock video player */}
            <div className="aspect-video w-full rounded-2xl bg-black border border-[#034438] overflow-hidden relative flex flex-col items-center justify-center">
              <span className="text-[#00f2c3] text-5xl animate-spin mb-4">🎬</span>
              <p className="text-xs text-stone-300 font-mono">Lecture en cours du module AgriElevage Connect...</p>
              <p className="text-[10px] text-stone-500 mt-1 font-mono">Qualité: HD 1080p</p>

              {/* Progress slider bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-300">
                  <span>02:14</span>
                  <span>14:35</span>
                </div>
                <div className="relative h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 bg-[#00f2c3] h-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#001714] border border-[#033a30] mt-4 flex items-start gap-3">
              <span className="text-lg">👩‍⚕️</span>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                <strong>Conseil de l'expert :</strong> Prenez des notes détaillées sur le dosage et le calendrier d'engraissement accéléré. Les questions du quiz portent sur ces données chiffrées !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE QUIZ MODAL */}
      {activeQuizCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#01221b] border-2 border-[#035547] rounded-3xl p-6 relative shadow-2xl">
            <button 
              onClick={() => setActiveQuizCourse(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#ff4a5a] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!quizDone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#034538] pb-3">
                  <span className="text-[10px] bg-[#024034] text-[#00f2c3] py-1 px-3 rounded-full uppercase tracking-wider font-bold">
                    Question {currentQuestionIndex + 1} sur {activeQuizCourse.quizQuestions.length}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Minimum 80% pour valider</span>
                </div>

                <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                  {activeQuizCourse.quizQuestions[currentQuestionIndex].question}
                </h4>

                {/* Option buttons */}
                <div className="space-y-2 pt-2">
                  {activeQuizCourse.quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full p-3.5 rounded-xl text-xs text-left transition-all flex items-center justify-between cursor-pointer border ${
                        selectedAnswer === idx 
                          ? 'bg-[#024436]/60 text-white border-[#00f2c3] font-bold' 
                          : 'bg-[#001714] text-stone-300 border-[#033a30] hover:bg-[#02211c]'
                      }`}
                    >
                      <span>{option}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAnswer === idx ? 'border-[#00f2c3] bg-[#00f2c3]' : 'border-stone-600'
                      }`}>
                        {selectedAnswer === idx && <div className="w-1.5 h-1.5 bg-[#001714] rounded-full" />}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00b59c] to-[#00f7a6] text-[#001714] font-bold text-xs uppercase tracking-wide disabled:from-stone-800 disabled:to-stone-800 disabled:text-stone-500 cursor-pointer transition-all"
                >
                  Valider et continuer &rarr;
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-[#033a30] text-[#00f2c3] mb-2">
                  <Award className="w-10 h-10 animate-bounce" />
                </div>
                
                <h3 className="text-xl font-bold text-white">Quiz Terminé !</h3>
                <p className="text-2xl font-mono font-extrabold text-[#00f7a6]">
                  {quizScore} / {activeQuizCourse.quizQuestions.length} correct
                </p>

                {quizScore >= 4 ? (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-300 max-w-sm mx-auto">
                      🎉 Félicitations ! Vous avez réussi avec brio ! Votre attestation certifiée avec signature et QR-code de validation est maintenant activée et disponible.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingCertificateCourse(activeQuizCourse);
                          setActiveQuizCourse(null);
                        }}
                        className="flex-1 py-3 bg-[#00f2c3] text-[#001714] font-bold text-xs rounded-xl uppercase tracking-wider hover:shadow-lg"
                      >
                        Voir mon Attestation 📜
                      </button>
                      <button
                        onClick={() => setActiveQuizCourse(null)}
                        className="flex-1 py-3 bg-stone-800 text-stone-300 font-bold text-xs rounded-xl uppercase hover:bg-stone-700"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-orange-400">
                      ⚠️ Oups ! Vous avez obtenu {quizScore * 20}%. Il vous faut au moins 80% (4 réponses correctes) pour valider la formation et acquérir l'attestation.
                    </p>
                    <button
                      onClick={() => handleStartQuiz(activeQuizCourse)}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider"
                    >
                      Recommencer l'épreuve 🔄
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. CERTIFICATE GENERATOR MODAL */}
      {viewingCertificateCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
          <div className="w-full max-w-2xl bg-[#001714] border-2 border-stone-700 rounded-3xl p-6 relative text-center">
            <button 
              onClick={() => setViewingCertificateCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-stone-800 bg-[#001714] text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-extrabold text-stone-300 text-xs uppercase font-mono tracking-widest mb-4">
              🎓 Aperçu de votre Attestation de Réussite Officielle
            </h3>

            {/* Simulated Beautiful Traditional Certificate Style Container */}
            <div className="bg-gradient-to-b from-[#182a25] to-[#041511] border-[6px] border-double border-[#00f2c3]/40 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-[#00f2c3]/30 text-xs">◆</div>
              <div className="absolute top-2 right-2 text-[#00f2c3]/30 text-xs">◆</div>
              <div className="absolute bottom-2 left-2 text-[#00f2c3]/30 text-xs">◆</div>
              <div className="absolute bottom-2 right-2 text-[#00f2c3]/30 text-xs">◆</div>

              <div className="space-y-6 relative z-10 text-center">
                <span className="text-3xl text-yellow-500">🏆</span>

                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#00f2c3] tracking-wide">
                    ATTESTATION DE RÉUSSITE
                  </h4>
                  <p className="text-[10px] font-mono tracking-widest text-[#00b59c] uppercase">
                    AGRIELEVAGE CONNECT &bull; ÉCOLE VÉTÉRINAIRE SÉNÉGAL
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-stone-400 italic">Cette attestation d'aptitude technique est décernée à :</p>
                  <p className="text-xl sm:text-2xl font-display font-extrabold text-white underline decoration-dashed decoration-[#00f2c3]">
                    {currentUser?.name || "Éleveur Invité"}
                  </p>
                  <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed pt-2">
                    Pour avoir validé avec succès l'examen final de connaissances théoriques et pratiques sur le module de formation intitulé :
                  </p>
                  <p className="text-sm font-extrabold text-[#00f7a6] italic">
                    « {viewingCertificateCourse.title} »
                  </p>
                </div>

                {/* Validation signatures and QR code */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#034d3f] pt-6 items-center">
                  
                  {/* Left Signature */}
                  <div className="text-center">
                    <p className="text-[9px] font-mono text-[#00b59c] uppercase">Validateur</p>
                    <p className="text-xs text-white font-serif italic mt-1.5 border-b border-[#034d3f] pb-1">Dr. S. Diop</p>
                    <p className="text-[8px] text-stone-500 mt-0.5">Comité Scientifique</p>
                  </div>

                  {/* Center QR Code using text/CSS */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 bg-white p-1 rounded-lg flex flex-col justify-between items-center shadow-md relative group">
                      {/* Fake design blocks for QR */}
                      <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-transparent" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-transparent" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-transparent" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-transparent" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                        <div className="bg-black rounded-sm" />
                      </div>
                    </div>
                    <span className="text-[7px] text-[#00f2c3] font-mono mt-1 tracking-wider uppercase">ID ACC-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>

                  {/* Right Signature */}
                  <div className="text-center">
                    <p className="text-[9px] font-mono text-[#00b59c] uppercase">Directeur</p>
                    <p className="text-xs text-white font-serif italic mt-1.5 border-b border-[#034d3f] pb-1">AgriElevage Sn</p>
                    <p className="text-[8px] text-stone-500 mt-0.5">Sceau Officiel</p>
                  </div>

                </div>

              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between items-center bg-[#011e1a] p-3 rounded-2xl border border-[#033c32]">
              <div className="text-left">
                <span className="text-[10px] text-emerald-400 font-bold block">✓ CERTIFICAT SÉCURISÉ</span>
                <span className="text-[9px] text-stone-400 leading-none">Code QR lisible pour vérification d'authenticité.</span>
              </div>
              
              <button 
                onClick={() => alert('📥 Téléchargement PDF de votre diplôme officiel lancé avec succès.')}
                className="py-1 px-4 text-xs font-bold text-[#001714] bg-[#00f2c3] rounded-xl flex items-center space-x-1.5 shadow hover:bg-white transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger l'Attestation</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
