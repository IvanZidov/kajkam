import { useState } from 'react';
import { Lightbulb, HelpCircle, CheckCircle, XCircle, PartyPopper } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';
import { DAILY_FACTS, DAILY_QUIZZES, getTodayIndex } from '../data/dailyFacts';

const FACT_READ_KEY = 'kajkam_last_fact_date';
const QUIZ_DONE_KEY = 'kajkam_last_quiz_date';
const QUIZ_RESULT_KEY = 'kajkam_last_quiz_result';

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function ZanimljivostiScreen() {
  const { user } = useAuth();
  const { t, language } = useTranslation();

  const todayStr = getTodayStr();
  const todayFact = DAILY_FACTS[getTodayIndex(DAILY_FACTS.length)];
  const todayQuiz = DAILY_QUIZZES[getTodayIndex(DAILY_QUIZZES.length)];

  const [factRead, setFactRead] = useState(() => localStorage.getItem(FACT_READ_KEY) === todayStr);
  const [quizDone, setQuizDone] = useState(() => localStorage.getItem(QUIZ_DONE_KEY) === todayStr);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(
    () => localStorage.getItem(QUIZ_DONE_KEY) === todayStr
      ? (localStorage.getItem(QUIZ_RESULT_KEY) as 'correct' | 'incorrect' | null)
      : null
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [factPointsShown, setFactPointsShown] = useState(false);
  const [quizPointsShown, setQuizPointsShown] = useState(false);

  const handleFactRead = () => {
    localStorage.setItem(FACT_READ_KEY, todayStr);
    setFactRead(true);
    setFactPointsShown(true);
    if (user) {
      supabase.rpc('increment_eko_bodovi', { points: 1 })
        .then(({ error }) => { if (error) console.error('fact points error:', error); });
    }
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === todayQuiz.correctIndex;
    localStorage.setItem(QUIZ_DONE_KEY, todayStr);
    localStorage.setItem(QUIZ_RESULT_KEY, isCorrect ? 'correct' : 'incorrect');
    setQuizDone(true);
    setQuizResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setQuizPointsShown(true);
      if (user) {
        supabase.rpc('increment_eko_bodovi', { points: 2 })
          .then(({ error }) => { if (error) console.error('quiz points error:', error); });
      }
    }
  };

  const allDone = factRead && quizDone;

  return (
    <div className="px-6 py-6 space-y-5">
      {/* Page Title */}
      <h1 className="text-xs font-bold tracking-[0.1em] text-primary uppercase">{t.facts.title}</h1>

      {/* Daily Fact Card */}
      <div className="bg-surface-container-lowest shield-motif p-6 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 shield-motif bg-primary-container">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase">
            {t.facts.dailyFact}
          </span>
        </div>

        <p className="text-sm text-on-surface leading-relaxed mb-5">
          {todayFact[language]}
        </p>

        {factPointsShown && (
          <div className="mb-3 text-center">
            <span className="text-xs font-bold text-primary">{t.facts.pointsEarned(1)}</span>
          </div>
        )}

        <button
          onClick={handleFactRead}
          disabled={factRead}
          className={`w-full py-2.5 font-bold text-xs tracking-widest uppercase shield-motif transition-all ${
            factRead
              ? 'bg-outline-variant/30 text-outline cursor-not-allowed'
              : 'bg-primary text-on-primary hover:bg-primary-container active:scale-95'
          }`}
        >
          {factRead ? t.facts.alreadyRead : t.facts.markAsRead}
        </button>
      </div>

      {/* Daily Quiz Card */}
      <div className="bg-surface-container-lowest shield-motif p-6 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 shield-motif bg-primary-container">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase">
            {t.facts.dailyQuiz}
          </span>
        </div>

        <p className="text-sm font-semibold text-on-surface mb-4">
          {todayQuiz.question[language]}
        </p>

        <div className="space-y-2 mb-5">
          {todayQuiz.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === todayQuiz.correctIndex;

            let optionStyle = 'border-outline-variant/40 bg-surface';
            if (quizDone) {
              if (isCorrectOption) {
                optionStyle = 'border-green-500 bg-green-50';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-red-400 bg-red-50';
              } else {
                optionStyle = 'border-outline-variant/20 bg-surface opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-primary bg-primary-container/10';
            }

            return (
              <button
                key={index}
                onClick={() => !quizDone && setSelectedOption(index)}
                disabled={quizDone}
                className={`w-full text-left p-3 border-2 shield-motif transition-all flex items-center gap-3 ${optionStyle} ${
                  quizDone ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <span className={`w-6 h-6 shrink-0 shield-motif border-2 flex items-center justify-center text-xs font-bold ${
                  quizDone && isCorrectOption
                    ? 'border-green-500 bg-green-500 text-white'
                    : quizDone && isSelected && !isCorrectOption
                      ? 'border-red-400 bg-red-400 text-white'
                      : isSelected
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-outline-variant text-outline'
                }`}>
                  {quizDone && isCorrectOption ? '✓' : quizDone && isSelected && !isCorrectOption ? '✗' : String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm text-on-surface">{option[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Quiz result feedback */}
        {quizDone && quizResult && (
          <div className={`flex items-center gap-2 mb-4 p-3 shield-motif ${
            quizResult === 'correct' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {quizResult === 'correct' ? (
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <span className={`text-sm font-semibold ${
              quizResult === 'correct' ? 'text-green-700' : 'text-red-600'
            }`}>
              {quizResult === 'correct' ? t.facts.correct : t.facts.incorrect}
            </span>
            {quizPointsShown && (
              <span className="text-xs font-bold text-primary ml-auto">{t.facts.pointsEarned(2)}</span>
            )}
          </div>
        )}

        {!quizDone && (
          <button
            onClick={handleQuizSubmit}
            disabled={selectedOption === null}
            className={`w-full py-2.5 font-bold text-xs tracking-widest uppercase shield-motif transition-all ${
              selectedOption === null
                ? 'bg-outline-variant/30 text-outline cursor-not-allowed'
                : 'bg-primary text-on-primary hover:bg-primary-container active:scale-95'
            }`}
          >
            {t.facts.submitAnswer}
          </button>
        )}

        {quizDone && (
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider text-center">
            {t.facts.alreadyAnswered}
          </p>
        )}
      </div>

      {/* Come back tomorrow message */}
      {allDone && (
        <div className="bg-surface-container-lowest shield-motif p-6 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] text-center">
          <PartyPopper className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold text-primary">{t.facts.comeBackTomorrow}</p>
        </div>
      )}
    </div>
  );
}
