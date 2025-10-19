import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { flashcards } from '@/lib/mockData';
import { RotateCcw, ChevronLeft, ChevronRight, Brain, CheckCircle } from 'lucide-react';

export default function StudyTools() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const markAsAnswered = () => {
    setAnsweredCards(prev => new Set(prev).add(currentCardIndex));
    setTimeout(nextCard, 500);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setAnsweredCards(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#1E3A5F]">Interactive Flashcards</h3>
          <p className="text-[#3E4C59] mt-1">Test your knowledge with AI-generated flashcards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-[#2BBBAD] border-[#2BBBAD]">
            {answeredCards.size} / {flashcards.length} completed
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={resetSession}
            className="border-[#3E4C59] text-[#3E4C59]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-[#2BBBAD] h-2 rounded-full transition-all duration-300"
          style={{ width: `${(answeredCards.size / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Card className="h-80 cursor-pointer transition-transform duration-300 hover:scale-105">
            <CardContent 
              className="h-full flex flex-col justify-center items-center p-8 relative"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                  {currentCard.subject}
                </Badge>
              </div>
              
              {answeredCards.has(currentCardIndex) && (
                <div className="absolute top-4 left-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}
              
              <div className="text-center">
                <div className="mb-4">
                  <Brain className="w-8 h-8 text-[#2BBBAD] mx-auto mb-2" />
                  <p className="text-sm text-[#3E4C59] font-medium">
                    {isFlipped ? 'Answer' : 'Question'}
                  </p>
                </div>
                
                <div className="min-h-[120px] flex items-center justify-center">
                  <p className="text-lg text-[#222222] leading-relaxed">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                </div>
                
                <p className="text-sm text-[#3E4C59] mt-4">
                  Click to {isFlipped ? 'see question' : 'reveal answer'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="outline"
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className="border-[#3E4C59] text-[#3E4C59]"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center space-x-2 text-[#3E4C59]">
          <span className="text-sm">
            {currentCardIndex + 1} of {flashcards.length}
          </span>
        </div>
        
        <Button
          variant="outline"
          onClick={nextCard}
          disabled={currentCardIndex === flashcards.length - 1}
          className="border-[#3E4C59] text-[#3E4C59]"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsFlipped(false)}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Need More Practice
          </Button>
          <Button
            onClick={markAsAnswered}
            className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Got It Right!
          </Button>
        </div>
      )}

      {/* Quiz Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E3A5F]">Quick Quiz Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#2BBBAD]">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2BBBAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-[#2BBBAD]" />
                </div>
                <h4 className="font-medium text-[#222222] mb-2">Multiple Choice</h4>
                <p className="text-sm text-[#3E4C59]">Generate MC questions from your study materials</p>
              </div>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#2BBBAD]">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2BBBAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-[#2BBBAD]" />
                </div>
                <h4 className="font-medium text-[#222222] mb-2">Fill in the Blanks</h4>
                <p className="text-sm text-[#3E4C59]">Test your recall with completion exercises</p>
              </div>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#2BBBAD]">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#2BBBAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-[#2BBBAD]" />
                </div>
                <h4 className="font-medium text-[#222222] mb-2">True/False</h4>
                <p className="text-sm text-[#3E4C59]">Quick concept verification questions</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}