import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mock_tests } from "@/constants/mock";
import { useAuth } from "@/context/AuthContext";
import { useTest } from "@/context/TestContext";
import { useDeleteTest } from "@/hooks/test/useDeleteTest";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { useLaunchTest } from "@/hooks/test/useLaunchTest";
import {
  ClockCircleOutlined,
  CloseOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  CalendarClock,
  Check,
  Edit,
  Filter,
  History,
  Plus,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherTest: React.FC = () => {
  const navigate = useNavigate();
  const { updateIsFinished, updateSecondsLeft } = useTest();
  const { token } = useAuth();
  const { data: tests, refetch } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { mutateAsync: launchTest } = useLaunchTest({
    action() {
      refetch();
    },
  });
  const { mutateAsync: deleteTest } = useDeleteTest({
    action() {
      refetch();
    },
  });
  const [filtereds, setFiltereds] = useState<any[]>([]);
  const [filterText, setFilterText] = useState<string>("Tout");
  const [filterRef, setFilterRef] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<number>(0);

  async function filterData(filter: string) {
    setFilterRef(true);
    setFilterText(filter);
    const acc = mock_tests.filter(
      (accounts: any) => accounts.status === filter,
    );
    setFiltereds(acc);
  }

  const launchConfirm = async (data: any) => {
    await launchTest(data.id_test);
    updateIsFinished(false);
    updateSecondsLeft(Number(data.duree_minutes) * 60);

    navigate(`/teacher/test/launched/view/${data.id_test}`);
  };

  const deleteConfirm = async () => {
    await deleteTest(selectedTest);
  };

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-10">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <CalendarClock /> Vos tests
          </div>
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Filter /> {filterText}{" "}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto mr-14">
                <div className="mb-2 text-gray-700 font-medium">
                  Fitrer par :
                </div>
                <div className="w-40 text-left">
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => {
                      setFilterRef(false);
                      setFilterText("Tout");
                    }}
                  >
                    <CalendarClock /> Tous les tests
                  </Button>
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => filterData("En attente")}
                  >
                    <HourglassOutlined /> En attente
                  </Button>
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => filterData("En cours")}
                  >
                    <History /> En cours
                  </Button>
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => filterData("Terminé")}
                  >
                    <Check /> Terminé
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => navigate("/teacher/test/create")}>
              <Plus /> Nouveau test
            </Button>
          </div>
        </div>
        {tests && tests.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600 my-10">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Vous avez créé aucun test</div>
          </div>
        )}
        <div className="">
          {filterRef && tests
            ? filtereds.map((test: any, index: any) => {
                return (
                  <div key={index} className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="font-bold text-lg">
                            {" "}
                            {test.titre}{" "}
                          </div>
                          <div className="border rounded-full px-2 bg-gray-400 text-white">
                            <ClockCircleOutlined /> {test.duree_minutes}:00
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          {" "}
                          {test.nom_groupe}{" "}
                        </div>
                        {test.status === "Terminé" ? (
                          <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>Terminé</div>
                          </div>
                        ) : test.status === "En cours" ? (
                          <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>En cours</div>
                          </div>
                        ) : (
                          <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>En attente</div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between my-1">
                        <div className="flex gap-4">
                          <div className="font-bold text-lg text-gray-600">
                            {test.max_questions} questions max
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          Note maximum : {test.note_max}
                        </div>
                      </div>
                      <div className="text-gray-700"> {test.description} </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      {test.status === "En attente" && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              onClick={() => setSelectedTest(test.id_test)}
                            >
                              <History /> Lancer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Lancement d'un test
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Proceder au lancement du test ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <Button onClick={() => launchConfirm(test)}>
                                Confirmer
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      {test.status === "En attente" && (
                        <Button
                          onClick={() =>
                            navigate(`/teacher/test/edit/${test.id_test}`)
                          }
                          variant={"secondary"}
                        >
                          <Edit /> Modifier
                        </Button>
                      )}
                      <Button
                        onClick={() =>
                          navigate(`/teacher/test/view/${test.id_test}`)
                        }
                        variant={"secondary"}
                      >
                        <QuestionCircleOutlined /> Voir les questions
                      </Button>
                      {test.status === "En attente" && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              onClick={() => setSelectedTest(test.id_test)}
                              variant={"destructive"}
                            >
                              <Trash /> Supprimer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Suppression d'un test
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Voulez-vous vraiment supprimer ce test ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <Button
                                onClick={() => deleteConfirm()}
                                variant={"destructive"}
                              >
                                Supprimer
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                );
              })
            : tests &&
              tests.map((test: any, index: any) => {
                return (
                  <div key={index} className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="font-bold text-lg">
                            {" "}
                            {test.titre}{" "}
                          </div>
                          <div className="border rounded-full px-2 bg-gray-400 text-white">
                            <ClockCircleOutlined /> {test.duree_minutes}:00
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          {" "}
                          {test.nom_groupe}{" "}
                        </div>
                        {test.status === "Terminé" ? (
                          <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>Terminé</div>
                          </div>
                        ) : test.status === "En cours" ? (
                          <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>En cours</div>
                          </div>
                        ) : (
                          <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                            <HourglassOutlined /> <div>En attente</div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between my-1">
                        <div className="flex gap-4">
                          <div className="font-bold text-lg text-gray-600">
                            {test.max_questions} questions max
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          Note maximum : {test.note_max}
                        </div>
                      </div>
                      <div className="text-gray-700"> {test.description} </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      {test.status === "En attente" && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              onClick={() => setSelectedTest(test.id_test)}
                            >
                              <History /> Lancer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Lancement d'un test
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Proceder au lancement du test ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <Button onClick={() => launchConfirm(test)}>
                                Confirmer
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      {test.status === "En attente" && (
                        <Button
                          onClick={() =>
                            navigate(`/teacher/test/edit/${test.id_test}`)
                          }
                          variant={"secondary"}
                        >
                          <Edit /> Modifier
                        </Button>
                      )}
                      <Button
                        onClick={() =>
                          navigate(`/teacher/test/view/${test.id_test}`)
                        }
                        variant={"secondary"}
                      >
                        <QuestionCircleOutlined /> Voir les questions
                      </Button>
                      {test.status === "En attente" && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              onClick={() => setSelectedTest(test.id_test)}
                              variant={"destructive"}
                            >
                              <Trash /> Supprimer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Suppression d'un test
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Voulez-vous vraiment supprimer ce test ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <Button
                                onClick={() => deleteConfirm()}
                                variant={"destructive"}
                              >
                                Supprimer
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default TeacherTest;
