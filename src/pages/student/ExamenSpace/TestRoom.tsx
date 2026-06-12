import StudentNavigation from "@/components/Navigation/StudentNavigation";
import ClokcTest from "@/components/Test/ClockTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpStatus } from "@/constants/Http_status";
import { TOAST_TYPE } from "@/constants/ToastType";
import { useAuth } from "@/context/AuthContext";
import { useTest } from "@/context/TestContext";
import { QUESTION_TYPE } from "@/enum/question.enum";
import { useGetRandomQuestionByTestId } from "@/hooks/question/useGetRandomQuestionByTestId";
import { usePostReponse } from "@/hooks/reponse/usePostReponse";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { CreateResponseInterface, ResponseInterface } from "@/interfaces/response.interface";
import { showToast } from "@/utils/Toast";
import { CheatWarningBanner, CheatWarningModal } from "@/components/Test/CheatWarning";
import { AlertTriangle, Loader2, Send, Clock, HelpCircle } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TestRoom: React.FC = () => {
  const req = useParams();
  const TestId = req.testId;
  const TentativeId = req.tentativeId;
  const { data: questions, isLoading } = useGetRandomQuestionByTestId(TestId ? Number(TestId) : 0);
  const { data: test } = useGetTestById(TestId ? Number(TestId) : 0);
  const { mutateAsync: creerResponse } = usePostReponse({ action() {} });
  const { isFinished, updateIsFinished } = useTest();
  const navigate = useNavigate();
  const [studentResponse, setStudentResponse] = useState<ResponseInterface[]>([]);
  const [isSendindResponse, setIsSendingResponse] = useState<boolean>(false);
  const [showCheatWarning, setShowCheatWarning] = useState(false);
  const [focusViolations, setFocusViolations] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isFinished || isSendindResponse) {
        const message = "Attention ! Quitter cette page mettra fin à votre tentative de test. Êtes-vous sûr ?";
        event.returnValue = message;
        return event.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFinished]);

  const focusViolationsRef = useRef(0);

  const handleCheatAcknowledged = () => {
    setShowCheatWarning(false);
  };

  useEffect(() => {
    updateIsFinished(false);
    focusViolationsRef.current = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        focusViolationsRef.current += 1;
        setFocusViolations(focusViolationsRef.current);
        if (focusViolationsRef.current >= 2) {
          updateIsFinished(true);
          finishTest();
        } else {
          setShowCheatWarning(true);
        }
      }
    };
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      showToast({ type: TOAST_TYPE.ERROR, message: "Le clic droit est désactivé pendant le test !" });
    };

    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const onInputResponseChange = (e: React.ChangeEvent<HTMLInputElement>, id_question: string) => {
    setStudentResponse((prevReponses: any) => {
      const existingIndex = prevReponses.findIndex((r: any) => r.id_question === id_question);
      const newResponse = {
        id_tentative: String(TentativeId),
        id_question,
        reponse_texte: e.target.value,
      };
      if (existingIndex !== -1) {
        return prevReponses.map((r: any, index: any) => index === existingIndex ? newResponse : r);
      } else {
        return [...prevReponses, newResponse];
      }
    });
  };

  const onTimeUp = async () => {
    updateIsFinished(true);
    await finishTest();
    showToast({ type: TOAST_TYPE.ERROR, message: "Soumission automatique des reponses suite au temps ecoulé !" });
  };

  const finishTest = async () => {
    setIsSendingResponse(true);
    updateIsFinished(true);
    const details: CreateResponseInterface = {
      id_test: TestId ?? "",
      id_tentative: TentativeId ?? "",
      reponses: studentResponse,
    };
    const res = await creerResponse(details);
    if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED) {
      setIsSendingResponse(false);
      navigate("/student/home");
    }
  };

  return (
    <div>
      {isFinished && isSendindResponse && (
        <div className="bg-background/95 backdrop-blur h-screen w-screen fixed z-50">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary-custom" />
            <div className="text-xl my-6 font-medium text-foreground">
              Soumission de vos réponses...
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Ne fermez pas le navigateur pendant la soumission.
            </div>
          </div>
        </div>
      )}

      <CheatWarningModal
        open={showCheatWarning}
        violationCount={focusViolations}
        onAcknowledge={handleCheatAcknowledged}
      />

      {test && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary-custom" />
              <span className="font-semibold text-sm sm:text-base truncate">{test.titre ?? ""}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-primary-custom bg-primary-custom/10 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4" />
                <ClokcTest afterTimeOver={onTimeUp} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-20 pb-10 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen bg-background">
        <StudentNavigation />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : questions?.length > 0 ? (
          <div className="space-y-4 mt-4">
            <CheatWarningBanner />
            {questions.map((question: any, index: number) => (
              <Card key={question.id_question ?? index} className="border-border overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="bg-muted px-2 py-0.5 rounded font-medium">
                      Question {index < 9 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="bg-primary-custom/10 text-primary-custom px-2 py-0.5 rounded font-medium uppercase">
                      {question.type_question}
                      {question.type_question === "simple" && " (Réponse courte)"}
                    </span>
                  </div>

                  <p className="font-medium mb-4">{question.texte_question ?? ""}</p>

                  {question.type_question === QUESTION_TYPE.DEVELOPPEMENT || question.type_question === QUESTION_TYPE.REPONSE_COURTE ? (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Votre réponse :</Label>
                      <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onInputResponseChange(e, `${question.id_question}`)
                        }
                        placeholder="Écrivez votre réponse ici..."
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label className="text-sm text-muted-foreground">Votre réponse :</Label>
                      <div className="space-y-2">
                        {question.options?.map((option: any) => (
                          <label
                            key={option.id_option}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <input
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                onInputResponseChange(e, `${question.id_question}`)
                              }
                              type="radio"
                              name={`q-${question.id_question}`}
                              value={option.texte_option}
                              required
                              className="accent-primary-custom"
                            />
                            <span className="text-sm">{option.texte_option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            <div className="flex justify-center pt-6 pb-4">
              <Button onClick={finishTest} size="lg" className="px-10">
                <Send className="w-4 h-4" /> Soumettre
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRoom;
