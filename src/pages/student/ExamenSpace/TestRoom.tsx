import StudentNavigation from "@/components/Navigation/StudentNavigation";
import ClokcTest from "@/components/Test/ClockTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mocktestquestions } from "@/constants/mock";
import { TOAST_TYPE } from "@/constants/ToastType";
import { useTest } from "@/context/TestContext";
import { QUESTION_TYPE } from "@/enum/question.enum";
import { useGetRandomQuestionByTestId } from "@/hooks/question/useGetRandomQuestionByTestId";
import { showToast } from "@/utils/Toast";
import { LoadingOutlined } from "@ant-design/icons";
import { AlertTriangleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TestRoom: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { data: questions } = useGetRandomQuestionByTestId(
    Id ? Number(Id) : 0,
  );  
  const id_utilisateur = 1;
  const id_tentative = 2;
  const { isFinished, updateIsFinished } = useTest();
  const navigate = useNavigate();
  const [studentResponse, setStudentResponse] = useState<any[]>([]);
  const [isSendindResponse, setIsSendingResponse] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!isFinished || isSendindResponse) {
                const message = "Attention ! Quitter cette page mettra fin à votre tentative de test. Êtes-vous sûr ?";
                event.returnValue = message; 
                return event.returnValue;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFinished]); 

  useEffect(() => {
    updateIsFinished(false);
    let focusViolations = 0;

    const handleVisibilityChange = () => {
        if (document.hidden) {
            focusViolations++;
            console.warn(`Violation de focus détectée ! Nombre : ${focusViolations}`);

            if (focusViolations >= 2) {
              updateIsFinished(true);
              finishTest();
            } else {
              alert(`ATTENTION ! Vous avez quitté l'onglet. Votre test sera soumis automatiquement si vous essayer encore de quitter l'onglet !`);
            }
        }
    };
          const handleRightClick = (e: MouseEvent) => {
          e.preventDefault();
          showToast({
            type: TOAST_TYPE.ERROR,
            message: "Le clic droit est désactivé pendant le test !", 
          })
      };

      document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
          document.removeEventListener('contextmenu', handleRightClick);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };

  }, []);

  const onInputResponseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id_question: string,
  ) => {
    setStudentResponse((prevReponses: any) => {
      const existingIndex = prevReponses.findIndex(
        (r: any) => r.id_question === id_question,
      );
      const newResponse = {
        id_utilisateur,
        id_tentative,
        id_question,
        reponse_texte: e.target.value,
      };

      if (existingIndex !== -1) {
        return prevReponses.map((r: any, index: any) =>
          index === existingIndex ? newResponse : r,
        );
      } else {
        return [...prevReponses, newResponse];
      }
    });
  };

  const onTimeUp = () => {
    updateIsFinished(true);
    finishTest();
    showToast({
      type: TOAST_TYPE.ERROR,
      message: "Soumission automatique des reponses suite au temps ecoulé !",
    });
  };

  const finishTest = () => {
    setIsSendingResponse(true);
    updateIsFinished(true);
    console.log(studentResponse);
    // setIsSendingResponse(false);
    // navigate("/student/test")
  };

  return (
    <div>
      <div className="z-50 fixed w-full opacity-5 h-16 px-4 top-0 left-0 flex justify-between items-center bg-red-500 text-center"></div>
      {(isFinished && isSendindResponse) && (
        <div className="bg-gray-50 opacity-95 h-screen w-screen fixed z-50">
          <div className="h-full w-full flex flex-col justify-center">
            <div className="w-max mx-auto text-center">
              <LoadingOutlined className="text-8xl" />
              <div className="text-xl my-10 font-medium">
                Soumission de vos reponses...
              </div>
              <div className="text-lg my-10 flex gap-2">
                <AlertTriangleIcon /> Ne fermez pas la navigateur pendant la
                soumission.
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed pt-14 w-full px-[12%]" onClick={() => console.log(questions)}>
        <div className="shadow p-4 bg-white flex justify-between items-center">
          <div className="font-bold text-lg">Test de HTML</div>
          <ClokcTest afterTimeOver={onTimeUp} />
          <div className="font-bold text-gray-800">Mr Andry</div>
        </div>
      </div>
      <div className="pt-32 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div className="">
          <div>
            {questions && questions.map((question: any, index: any) => {
              return (
                <Card className="mb-2 px-4">
                  <div>
                    <div className="text-xs text-gray-600 flex gap-2 items-center">
                      Question {index < 9 ? `0${index + 1}` : index + 1} |{" "}
                      <div className="uppercase">
                        {question.type_question}
                        {question.type_question === "simple" &&
                          "   (Reponse courte)"}
                      </div>
                    </div>
                    <div className="my-1">{question.texte_question}</div>
                    {question.type_question === QUESTION_TYPE.DEVELOPPEMENT ? (
                      <div className="w-64 mt-2">
                        <Label className="mb-1">Votre reponse :</Label>
                        <Input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onInputResponseChange(e, `${question.id_question}`)
                          }
                        />
                      </div>
                    ) : question.type_question === QUESTION_TYPE.REPONSE_COURTE ? (
                      <div className="w-64 mt-2">
                        <Label className="mb-1">Votre reponse :</Label>
                        <Input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onInputResponseChange(e, `${question.id_question}`)
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-auto mx-auto mt-2">
                        <Label className="mb-1">Votre reponse :</Label>
                        <div className="flex flex-col gap-4 my-4">
                          {question.options.map(
                            (option: any, index: number) => (
                              <Label
                                key={option.id_option}
                                className="font-normal"
                              >
                                <input
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) =>
                                    onInputResponseChange(
                                      e,
                                      `${question.id_question}`,
                                    )
                                  }
                                  type="radio"
                                  name={`q-${question.id_question}`}
                                  value={option.texte_option}
                                  required
                                />
                                Option {index + 1} : {option.texte_option}
                              </Label>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={() => finishTest()}>Soumettre</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRoom;
