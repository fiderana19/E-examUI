import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { QUESTION_TYPE } from "@/enum/question.enum";
import { useGetAllQuestionByTestId } from "@/hooks/question/useGetAllQuestionByTestId";
import { useGetQuestionById } from "@/hooks/question/useGetQuestionById";
import { usePatchQuestion } from "@/hooks/question/usePatchQuestion";
import { QuestionEditInterface } from "@/interfaces/question.interface";
import { QuestionEditValidation } from "@/validation/question.validation";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherQuestionEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data: question } = useGetQuestionById(Id ? Number(Id) : 0);
  const { refetch } = useGetAllQuestionByTestId(
    question ? question.id_test : 0,
  );
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<QuestionEditInterface>({
    resolver: yupResolver(QuestionEditValidation),
  });
  const { mutateAsync: modifierQuestion } = usePatchQuestion({
    action() {
      refetch()
    },
  });

  useEffect(() => {
    setValue("id_question", Id ? Id : "");
    setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
  }, []);

  const handleSubmit = async (data: QuestionEditInterface) => {
    const response = await modifierQuestion(data);
    if (response?.status === HttpStatus.OK) {
      navigate(-1);
    }
  };

  return (
    <div className="pl-64 pr-[4%] py-10 flex flex-col justify-center">
      <TeacherNavigation />
      <div>
        <div className="w-1/3 mx-auto">
        {
          question && <Card className="px-4 py-10">
            <div>
              <div className="text-xl uppercase font-bold text-center mb-4 flex items-center gap-2">
                <QuestionCircleOutlined /> Modifier une question
              </div>
              <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                <Label className="mb-1">Question :</Label>
                <Controller
                  control={control}
                  name="texte_question"
                  defaultValue={question.texte_question}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      className={`${errors?.texte_question && "border border-red-500 text-red-500 rounded"}`}
                    />
                  )}
                />
                {errors?.texte_question && (
                  <div className="text-xs w-full text-red-500 text-left">
                    {errors?.texte_question.message}
                  </div>
                )}
                <Label className="mb-1 mt-4">Type :</Label>
                <Controller
                  control={control}
                  name="type_question"
                  defaultValue={question.type_question}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled
                      value={value}
                      onChange={onChange}
                      className={`${errors?.type_question && "border border-red-500 text-red-500 rounded"}`}
                    />
                  )}
                />
                {errors?.type_question && (
                  <div className="text-xs w-full text-red-500 text-left">
                    {errors?.type_question.message}
                  </div>
                )}
                <Label className="mb-1 mt-4">Reponse correcte :</Label>
                <Controller
                  control={control}
                  name="reponse_correcte"
                  defaultValue={question.reponse_correcte}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled={question.type_question === QUESTION_TYPE.REPONSE_COURTE ? false : true}
                      value={value}
                      onChange={onChange}
                      className={`${errors?.reponse_correcte && "border border-red-500 text-red-500 rounded"}`}
                    />
                  )}
                />
                {errors?.reponse_correcte && (
                  <div className="text-xs w-full text-red-500 text-left">
                    {errors?.reponse_correcte.message}
                  </div>
                )}
                <div className="flex justify-center mt-4">
                  <Button type="submit">Modifier</Button>
                </div>
              </form>
            </div>
          </Card>
        }
        </div>
      </div>
    </div>
  );
};

export default TeacherQuestionEdit;
