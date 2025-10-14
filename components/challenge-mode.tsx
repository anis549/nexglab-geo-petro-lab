"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Trophy, Clock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { initialRocks } from "@/data/rock-samples"

interface ChallengeProps {
  onComplete: (score: number, totalQuestions: number) => void
}

export default function ChallengeMode({ onComplete }: ChallengeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Generate questions from rock samples
  const questions = [
    {
      id: 1,
      rockId: "limestone-1",
      question: "Quelle est la réaction à l'acide de ce calcaire fossilifère?",
      options: [
        { id: "a", text: "Aucune réaction" },
        { id: "b", text: "Faible effervescence" },
        { id: "c", text: "Forte effervescence" },
      ],
      correctAnswer: "c",
      explanation:
        "Le calcaire est composé principalement de carbonate de calcium (CaCO3) qui réagit fortement avec l'acide chlorhydrique.",
    },
    {
      id: 2,
      rockId: "sandstone-1",
      question: "Quelle est la taille des grains caractéristique du grès?",
      options: [
        { id: "a", text: "Argile (< 0.004 mm)" },
        { id: "b", text: "Silt (0.004 - 0.063 mm)" },
        { id: "c", text: "Sable (0.063 - 2 mm)" },
      ],
      correctAnswer: "c",
      explanation: "Le grès est une roche sédimentaire composée principalement de grains de sable consolidés.",
    },
    {
      id: 3,
      rockId: "clay-1",
      question: "Quelle est la texture caractéristique de l'argile?",
      options: [
        { id: "a", text: "Rugueuse" },
        { id: "b", text: "Lisse" },
        { id: "c", text: "Granuleuse" },
      ],
      correctAnswer: "b",
      explanation: "L'argile a une texture lisse en raison de la très petite taille de ses particules.",
    },
    {
      id: 4,
      rockId: "dolomite-1",
      question: "Comment la dolomie réagit-elle à l'acide chlorhydrique à froid?",
      options: [
        { id: "a", text: "Aucune réaction" },
        { id: "b", text: "Faible effervescence" },
        { id: "c", text: "Forte effervescence" },
      ],
      correctAnswer: "b",
      explanation:
        "La dolomie (CaMg(CO3)2) réagit faiblement avec l'acide chlorhydrique à froid, contrairement au calcaire.",
    },
    {
      id: 5,
      rockId: "conglomerate-1",
      question: "Comment appelle-t-on un conglomérat à galets arrondis?",
      options: [
        { id: "a", text: "Brèche" },
        { id: "b", text: "Poudingue" },
        { id: "c", text: "Arkose" },
      ],
      correctAnswer: "b",
      explanation:
        "Un conglomérat à galets arrondis est appelé poudingue, tandis qu'un conglomérat à fragments anguleux est appelé brèche.",
    },
  ]

  // Find the rock sample for the current question
  const currentRock = initialRocks.find((rock) => rock.id === questions[currentQuestion]?.rockId)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endChallenge()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startChallenge = () => {
    setIsActive(true)
  }

  const endChallenge = () => {
    setIsActive(false)
    setIsCompleted(true)
    onComplete(score, questions.length)
  }

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const checkAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      endChallenge()
    }
  }

  if (!isActive && !isCompleted) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-geology-iron" />
            Mode Défi
          </CardTitle>
          <CardDescription>
            Testez vos connaissances en pétrographie en identifiant correctement les roches sédimentaires.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Ce défi comporte {questions.length} questions. Vous avez 60 secondes pour répondre à toutes les questions.
          </p>
          <p>Chaque bonne réponse vous rapporte 1 point. Essayez d'obtenir le score maximum!</p>
        </CardContent>
        <CardFooter>
          <Button onClick={startChallenge} className="w-full bg-primary hover:bg-geology-iron">
            Commencer le Défi
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (isCompleted) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Défi Terminé
          </CardTitle>
          <CardDescription>Voici vos résultats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold">
              Score: {score}/{questions.length}
            </h3>
            <p className="text-muted-foreground mt-2">
              {score === questions.length
                ? "Parfait! Vous êtes un expert en pétrographie!"
                : score >= questions.length / 2
                  ? "Bon travail! Continuez à pratiquer pour améliorer vos connaissances."
                  : "Continuez à étudier les roches sédimentaires pour améliorer vos connaissances."}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setScore(0)
              setSelectedAnswer(null)
              setTimeLeft(60)
              setIsActive(false)
              setIsCompleted(false)
            }}
            className="w-full"
          >
            Recommencer
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Question {currentQuestion + 1}/{questions.length}
          </CardTitle>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className={`font-mono ${timeLeft <= 10 ? "text-red-500" : ""}`}>{timeLeft}s</span>
          </div>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentRock && (
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-muted rounded-md overflow-hidden">
              <img
                src={currentRock.thumbnailPath || "/placeholder.svg"}
                alt={currentRock.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

          <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswer}>
            {questions[currentQuestion].options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {selectedAnswer && (
          <Alert
            className={
              selectedAnswer === questions[currentQuestion].correctAnswer ? "bg-accent/50" : "bg-geology-iron/20"
            }
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
            </AlertTitle>
            <AlertDescription>{questions[currentQuestion].explanation}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkAnswer} disabled={!selectedAnswer} className="w-full">
          {currentQuestion < questions.length - 1 ? "Question Suivante" : "Terminer le Défi"}
        </Button>
      </CardFooter>
    </Card>
  )
}
