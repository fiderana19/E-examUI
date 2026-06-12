import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import {
  AlertDialog,
  AlertDialogAction,
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
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useTest } from "@/context/TestContext";
import { useDeleteTest } from "@/hooks/test/useDeleteTest";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { useLaunchTest } from "@/hooks/test/useLaunchTest";
import {
  Loader2,
  CalendarClock,
  Clock,
  Filter,
  Plus,
  Trash,
  Eye,
  Edit,
  Play,
  HelpCircle,
  FileText,
  Timer,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherTest: React.FC = () => {
  const navigate = useNavigate();
  const { updateIsFinished, updateSecondsLeft } = useTest();
  const { token } = useAuth();
  const { data: tests, refetch, isLoading } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { mutateAsync: launchTest, isPending: launchLoading } = useLaunchTest({
    action() { refetch(); },
  });
  const { mutateAsync: deleteTest, isPending: deleteLoading } = useDeleteTest({
    action() { refetch(); },
  });
  const [filterStatus, setFilterStatus] = useState<string>("Tout");
  const [selectedTest, setSelectedTest] = useState<number>(0);

  useEffect(() => { refetch(); }, []);

  const launchConfirm = async (data: any) => {
    await launchTest(data.id_test);
    updateIsFinished(false);
    const min = Number(data.duree_minutes) * 60;
    updateSecondsLeft(min + 10);
    navigate(`/teacher/test/launched/view/${data.id_test}`);
  };

  const deleteConfirm = async () => {
    await deleteTest(selectedTest);
  };

  const filteredTests = tests?.data?.filter((test: any) =>
    filterStatus === "Tout" ? true : test.status === filterStatus
  );

  const renderTestCard = (test: any) => (
    <div key={test.id_test} className="bg-card border border-border rounded-xl p-6 card-hover">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className="text-lg font-semibold truncate">{test.titre ?? ""}</h3>
            <StatusBadge status={test.status} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{test.description ?? ""}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-medium text-muted-foreground">{test?.nom_groupe ?? ""}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <Timer className="w-4 h-4" />
          <span>{test.duree_minutes ?? "?"} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>{test.max_questions ?? "?"} questions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>Note max: {test.note_max ?? "?"}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
        {test.status === "En attente" && (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm">
                  <Play className="w-4 h-4" /> Lancer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Lancement d'un test</AlertDialogTitle>
                  <AlertDialogDescription>
                    Procéder au lancement du test ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="p-0">
                    <Button disabled={launchLoading} onClick={() => launchConfirm(test)}>
                      {launchLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Confirmer
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/teacher/test/edit/${test.id_test}`)}
            >
              <Edit className="w-4 h-4" /> Modifier
            </Button>
          </>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/teacher/test/view/${test.id_test}`)}
        >
          <Eye className="w-4 h-4" /> Questions
        </Button>
        {test.status === "En attente" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash className="w-4 h-4" /> Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression d'un test</AlertDialogTitle>
                <AlertDialogDescription>
                  Voulez-vous vraiment supprimer ce test ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="p-0">
                  <Button
                    disabled={deleteLoading}
                    onClick={() => deleteConfirm()}
                    variant="destructive"
                  >
                    {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Supprimer
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {test.status === "Terminé" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/teacher/result/view/${test.id_test}`)}
          >
            <FileText className="w-4 h-4" /> Résultats
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vos tests</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez vos examens et questionnaires
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4" /> {filterStatus}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2" align="end">
                <div className="space-y-1">
                  {["Tout", "En attente", "En cours", "Terminé"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filterStatus === s
                          ? "bg-primary-custom/10 text-primary-custom font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => navigate("/teacher/test/create")}>
              <Plus className="w-4 h-4" /> Nouveau test
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !filteredTests?.length ? (
          <div className="text-center py-20">
            <CalendarClock className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {filterStatus === "Tout" ? "Vous n'avez créé aucun test" : "Aucun test avec ce statut"}
            </h3>
            <p className="text-sm text-muted-foreground/60 mb-6">
              Créez votre premier test pour commencer
            </p>
            {filterStatus === "Tout" && (
              <Button onClick={() => navigate("/teacher/test/create")}>
                <Plus className="w-4 h-4" /> Créer un test
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTests.map((test: any) => renderTestCard(test))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTest;
