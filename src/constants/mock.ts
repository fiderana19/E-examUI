// Données pour la table GROUPE avec noms de variables en minuscules
export const mock_groupes = [
  {
    id_groupe: 10,
    id_utilisateur: 1, 
    nom_groupe: "l3 informatique - a",
    description: "Groupe des étudiants de Licence 3, section A.",
  },
  {
    id_groupe: 11,
    id_utilisateur: 1, 
    nom_groupe: "m1 cybersécurité",
    description: "Étudiants de Master 1 spécialisés en sécurité des systèmes.",
  },
  {
    id_groupe: 12,
    id_utilisateur: 4, // Nouvel utilisateur (Professeur 2)
    nom_groupe: "l1 tronc commun",
    description: "Groupe commun pour tous les étudiants de première année.",
  },
  {
    id_groupe: 13,
    id_utilisateur: 1, 
    nom_groupe: "séminaire rdbms",
    description: "Groupe restreint pour le séminaire sur les SGBDR avancés.",
  },
  {
    id_groupe: 14,
    id_utilisateur: 4, 
    nom_groupe: "tutorat programmation",
    description: "Groupe de soutien pour les bases de la programmation.",
  }
];

// Données pour la table UTILISATEUR
export const mock_utilisateurs = [
  {
    id_utilisateur: 1,
    nom: "Dupont",
    email: "dupont@univ.fr",
    matricule: "P100",
    role: "PROFESSEUR",
    motdepasse: "$hash_prof_1", // Hachage simulé
    creation_utilisateur: "2024-01-15T09:00:00Z",
    est_valider: true,
  },
  {
    id_utilisateur: 4,
    nom: "Lemoine",
    email: "lemoine@univ.fr",
    matricule: "P101",
    role: "PROFESSEUR",
    motdepasse: "$hash_prof_4",
    creation_utilisateur: "2024-03-20T14:30:00Z",
    est_valider: true,
  },
  {
    id_utilisateur: 2,
    nom: "Martin",
    email: "martin@univ.fr",
    matricule: "E201",
    role: "ETUDIANT",
    motdepasse: "$hash_etu_2",
    creation_utilisateur: "2024-08-01T10:00:00Z",
    est_valider: true,
  },
  {
    id_utilisateur: 3,
    nom: "Lefevre",
    email: "lefevre@univ.fr",
    matricule: "E202",
    role: "ETUDIANT",
    motdepasse: "$hash_etu_3",
    creation_utilisateur: "2024-08-01T10:05:00Z",
    est_valider: true,
  },
  {
    id_utilisateur: 5,
    nom: "Garcia",
    email: "garcia@univ.fr",
    matricule: "E203",
    role: "ETUDIANT",
    motdepasse: "$hash_etu_5",
    creation_utilisateur: "2024-08-02T11:20:00Z",
    est_valider: true,
  },
  {
    id_utilisateur: 6,
    nom: "Chen",
    email: "chen@univ.fr",
    matricule: "E301",
    role: "ETUDIANT",
    motdepasse: "$hash_etu_6",
    creation_utilisateur: "2024-09-10T15:00:00Z",
    est_valider: false, // Exemple d'un utilisateur non validé
  }
];

// Données pour la table RESULTAT
export const mock_resultats = [
  {
    id_resultat: 400,
    id_utilisateur: 2, // Martin
    id_groupe: 10, // Groupe L3 Informatique - A
    titre_resultat: "Rapport final Quiz UML (Martin)",
    fichier_resultat: "/reports/quiz_uml_martin_200.pdf",
    date_publication: "2025-10-18",
  },
  {
    id_resultat: 401,
    id_utilisateur: 3, // Lefevre
    id_groupe: 10,
    titre_resultat: "Rapport final Quiz UML (Lefevre)",
    fichier_resultat: "/reports/quiz_uml_lefevre_201.pdf",
    date_publication: "2025-10-18",
  },
  {
    id_resultat: 402,
    id_utilisateur: null, // Résultat global ou statistique
    id_groupe: 10,
    titre_resultat: "Statistiques de groupe - L3 Informatique",
    fichier_resultat: "/reports/stats_l3_info_q1.xlsx",
    date_publication: "2025-10-20",
  },
  {
    id_resultat: 403,
    id_utilisateur: 5, // Garcia
    id_groupe: 12, // Groupe L1 tronc commun
    titre_resultat: "Synthèse des acquis T01 (Garcia)",
    fichier_resultat: "/reports/synthese_t01_garcia.docx",
    date_publication: "2025-11-05",
  }
];

// Données pour la table ANNONCE
export const mock_annonces = [
  {
    id_annonce: 500,
    id_utilisateur: "Dupont (ID 1)", // Nom pour la lecture des données de test
    titre_annonce: "Début des tests de BD",
    texte_annonce: "Les tests sur les bases de données (UML/Merise) sont ouverts à partir d'aujourd'hui. Concerne le groupe L3 Informatique (ID 10).",
    creation_annonce: "2025-10-17T08:00:00Z",
  },
  {
    id_annonce: 501,
    id_utilisateur: "Lemoine (ID 4)", 
    titre_annonce: "Réunion de Tutorat",
    texte_annonce: "Le tutorat de programmation aura lieu lundi à 14h en salle C-101. Concerne le groupe Tutorat Programmation (ID 14).",
    creation_annonce: "2025-10-15T15:30:00Z",
  },
  {
    id_annonce: 502,
    id_utilisateur: "Dupont (ID 1)", 
    titre_annonce: "Cours reporté",
    texte_annonce: "Le cours de Master 1 Cybersécurité (ID 11) est reporté à la semaine prochaine.",
    creation_annonce: "2025-10-16T17:00:00Z",
  },
  {
    id_annonce: 503,
    id_utilisateur: "Lemoine (ID 4)", 
    titre_annonce: "Bienvenue aux L1",
    texte_annonce: "Message général de bienvenue à tous les nouveaux étudiants de L1 Tronc Commun (ID 12).",
    creation_annonce: "2024-09-01T09:00:00Z",
  }
];

// Données pour la table TEST (avec noms d'utilisateurs et de groupes)
export const mock_tests = [
  {
    id_test: 100,
    id_utilisateur: "Dupont (Professeur)", 
    id_groupe: "L3 Informatique - A", 
    titre: "Quiz Merise et UML",
    description: "Évaluation sur les concepts de modélisation de données (MCD et MLD).",
    duree_minutes: 30,
    max_questions: 5,
    note_max: 20,
    date_declenchement: "2025-10-17T10:00:00Z",
    status: "Terminé", 
  },
  {
    id_test: 101,
    id_utilisateur: "Lemoine (Professeur)", 
    id_groupe: "L1 Tronc Commun", 
    titre: "Examen Final Programmation I",
    description: "Évaluation des bases de la programmation, conditions et boucles.",
    duree_minutes: 90,
    max_questions: 15,
    note_max: 50,
    date_declenchement: "2025-12-15T09:00:00Z",
    status: "En attente", 
  },
  {
    id_test: 102,
    id_utilisateur: "Dupont (Professeur)", 
    id_groupe: "M1 Cybersécurité", 
    titre: "Quiz Sécurité des Réseaux",
    description: "Questions sur les protocoles sécurisés et les attaques courantes.",
    duree_minutes: 45,
    max_questions: 10,
    note_max: 40,
    date_declenchement: "2025-11-05T14:00:00Z",
    status: "En attente", 
  },
  {
    id_test: 103,
    id_utilisateur: "Lemoine (Professeur)", 
    id_groupe: "Tutorat Programmation", 
    titre: "Petit Test Algorithmique",
    description: "Vérification des acquis du tutorat.",
    duree_minutes: 15,
    max_questions: 5,
    note_max: 10,
    date_declenchement: "2025-10-17T15:00:00Z",
    status: "En cours", 
  }
];

// Données pour la table QUESTION
export const mock_questions = [
  // Questions pour le Test 100 (Quiz Merise et UML - Terminé)
  {
    id_question: 1000,
    id_test: 100, 
    texte_question: "Qu'est-ce qu'une clé primaire ?",
    type_question: "qcm",
    points: 4,
    reponse_correcte: "A", // Référence à l'option A
    date_creation: "2025-10-10",
  },
  {
    id_question: 1001,
    id_test: 100, 
    texte_question: "Définissez brièvement le rôle de l'entité-type dans le MCD.",
    type_question: "simple",
    points: 6,
    reponse_correcte: "Représenter un objet concret ou abstrait du domaine.", 
    date_creation: "2025-10-10",
  },
  {
    id_question: 1002,
    id_test: 100, 
    texte_question: "Quel type de lien associe deux entités dans Merise ?",
    type_question: "qcm",
    points: 4,
    reponse_correcte: "C", // Référence à l'option C
    date_creation: "2025-10-11",
  },
  {
    id_question: 1003,
    id_test: 100, 
    texte_question: "Expliquez la différence entre une agrégation et une composition en UML.",
    type_question: "dev",
    points: 6,
    reponse_correcte: "L'agrégation est une relation 'has-a' faible ; la composition est une relation 'has-a' forte où la partie ne survit pas au tout.", 
    date_creation: "2025-10-11",
  },
  
  // Questions pour le Test 103 (Petit Test Algorithmique - En cours)
  {
    id_question: 1004,
    id_test: 103, 
    texte_question: "Quelle est la valeur de Y après ces opérations : X=5; Y=X+2; X=10; ?",
    type_question: "simple",
    points: 2,
    reponse_correcte: "7", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1005,
    id_test: 103, 
    texte_question: "Dans un algorithme, que représente une boucle 'tant que' ?",
    type_question: "dev",
    points: 4,
    reponse_correcte: "Une structure itérative permettant d'exécuter un bloc d'instructions tant qu'une condition reste vraie.", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  },
  {
    id_question: 1006,
    id_test: 103, 
    texte_question: "Le langage Python est-il compilé ou interprété ?",
    type_question: "qcm",
    points: 2,
    reponse_correcte: "B", 
    date_creation: "2025-10-15",
  }
];

// Données pour la table OPTIONSQCM
export const mock_optionsqcm = [
  // Options pour Q1000 (Qu'est-ce qu'une clé primaire ?) - Correcte: A
  {
    id_option: "A", 
    id_question: 1000,
    texte_option: "Un attribut ou un ensemble d'attributs qui identifie de manière unique une occurrence d'entité.",
    est_correcte: true,
  },
  {
    id_option: "B",
    id_question: 1000,
    texte_option: "Un attribut servant uniquement à lier deux tables dans le MLD.",
    est_correcte: false,
  },
  {
    id_option: "C",
    id_question: 1000,
    texte_option: "Une contrainte d'intégrité référentielle.",
    est_correcte: false,
  },
];

// Données pour la table REPONSEETUDIANTS (filtrées pour est_corriger = false)
export const mock_reponseetudiants_a_corriger = [
  // --- TENTATIVE 200 (Martin, Test 100) ---
  {
    id_reponseetudiants: 3003,
    id_question: "Expliquez la différence entre une agrégation et une composition en UML.",
    id_tentative: 200,
    reponse_texte: "La composition est plus forte, la partie dépend du tout. L'agrégation est un lien plus lâche où les deux peuvent exister séparément.",
    score_question: 0,
    est_corriger: false, // À CORRIGER (6 points max)
  },

  // --- TENTATIVE 201 (Lefevre, Test 103) ---
  {
    id_reponseetudiants: 3005,
    id_question: "Dans un algorithme, que représente une boucle 'tant que' ?",
    id_tentative: 201,
    reponse_texte: "Une boucle qui continue tant que la condition est vraie.",
    score_question: 0,
    est_corriger: false, // À CORRIGER (4 points max)
  },

  // --- TENTATIVE 202 (Garcia, Test 101) ---
  {
    id_reponseetudiants: 3007,
    // (Question DEV du Test 101)
    id_question: "Décrivez les trois piliers de la Programmation Orientée Objet (POO).",
    id_tentative: 202,
    reponse_texte: "Encapsulation, Héritage, Polymorphisme.",
    score_question: 0,
    est_corriger: false, // À CORRIGER (10 points max)
  },
  {
    id_reponseetudiants: 3008,
    // (Autre Question DEV du Test 101)
    id_question: "Écrivez une fonction en pseudo-code pour calculer la factorielle d'un nombre N.",
    id_tentative: 202,
    reponse_texte: "Fonction Factorielle(N):\n  Si N=0 alors retourner 1\n  Sinon retourner N * Factorielle(N-1)",
    score_question: 0,
    est_corriger: false, // À CORRIGER (15 points max)
  },
  {
    id_reponseetudiants: 3009,
    // (Question Simple du Test 101, laissée en false par erreur de l'étudiant ou du système)
    id_question: "Quel mot-clé est utilisé pour une condition alternative ?",
    id_tentative: 202,
    reponse_texte: "Else",
    score_question: 0,
    est_corriger: false, // À CORRIGER (Bien que simple, elle pourrait avoir été marquée manuellement)
  },

  // --- TENTATIVE 203 (Martin, Test 102) ---
  {
    id_reponseetudiants: 3010,
    // (Question DEV du Test 102)
    id_question: "Expliquez le principe du Handshake à trois voies (Three-Way Handshake) de TCP.",
    id_tentative: 203,
    reponse_texte: "SYN -> SYN/ACK -> ACK. Permet d'établir une connexion fiable entre deux hôtes.",
    score_question: 0,
    est_corriger: false, // À CORRIGER (10 points max)
  }
];

   export const mockResultData = {
      participants: 319,
      auDessusDeMoyenne: 233,
      enDessousDeMoyenne: 233,
      resultats: [
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 10, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 11, heureSoumission: '15:22' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
        { matricule: '9999 H-F', nomPrenom: 'LOREM Ipsum', note: 15, heureSoumission: '15:24' },
      ],
    };

// src/data/questions.ts


export const mocktestquestions = [
  // --- Modélisation (Merise/UML) et Bases de Données (BDD) ---

  // Q1 (QCM) : BDD
  { id_question: 1, texte_question: "Quel est l'objectif principal de la 3ème Forme Normale (3NF) ?", type_question: "qcm", points: 4, options: [
    { id_option: "A", texte_option: "Éliminer les dépendances fonctionnelles partielles." }, 
    { id_option: "B", texte_option: "Éliminer les dépendances fonctionnelles transitives." },
    { id_option: "C", texte_option: "Éliminer les attributs multivalués." }
  ]},

  // Q2 (SIMPLE) : Merise
  { id_question: 2, texte_question: "Quel sigle représente le Modèle Logique de Données dans la méthode Merise ?", type_question: "simple", points: 2, options: null },

  // Q3 (DEV) : UML
  { id_question: 3, texte_question: "Expliquez brièvement la différence de sémantique entre l'agrégation et la composition dans les diagrammes de classes UML.", type_question: "dev", points: 8, options: null },

  // Q4 (QCM) : BDD
  { id_question: 4, texte_question: "Dans le modèle relationnel, à quoi sert une Clé Étrangère (Foreign Key) ?", type_question: "qcm", points: 3, options: [
    { id_option: "A", texte_option: "À identifier uniquement chaque ligne d'une table." }, 
    { id_option: "B", texte_option: "À faire respecter l'intégrité référentielle entre deux tables." },
    { id_option: "C", texte_option: "À accélérer les requêtes de sélection (SELECT)." }
  ]},

  // Q5 (SIMPLE) : Merise
  { id_question: 5, texte_question: "Qu'est-ce qu'une cardinalité minimale de 0 dans une relation Merise ?", type_question: "simple", points: 3, options: null },

  // Q6 (QCM) : UML
  { id_question: 6, texte_question: "Quel diagramme UML est principalement utilisé pour modéliser le flux de travail ou les étapes d'un processus ?", type_question: "qcm", points: 4, options: [
    { id_option: "A", texte_option: "Diagramme de Classes." }, 
    { id_option: "B", texte_option: "Diagramme de Séquence." },
    { id_option: "C", texte_option: "Diagramme d'Activités." }
  ]},

  // Q7 (DEV) : BDD/SQL
  { id_question: 7, texte_question: "Écrivez une requête SQL permettant de sélectionner les noms de tous les 'Utilisateurs' qui ont le rôle 'ETUDIANT'.", type_question: "dev", points: 5, options: null },

  // Q8 (SIMPLE) : BDD
  { id_question: 8, texte_question: "Quel est le SGBD open source le plus populaire ?", type_question: "simple", points: 2, options: null },

  // Q9 (QCM) : Merise
  { id_question: 9, texte_question: "Quel niveau d'abstraction Merise est le plus proche de l'implémentation physique (fichiers, index, stockage) ?", type_question: "qcm", points: 3, options: [
    { id_option: "A", texte_option: "Conceptuel." }, 
    { id_option: "B", texte_option: "Logique." },
    { id_option: "C", texte_option: "Physique." }
  ]},
  
  // Q10 (DEV) : UML
  { id_question: 10, texte_question: "Modélisez l'héritage d'une 'Personne' vers une 'Client' et un 'Fournisseur' en notation de Diagramme de Classes UML (décrivez seulement les classes et la relation).", type_question: "dev", points: 7, options: null },

  // --- Algorithmique et Logique ---

  // Q11 (QCM) : Algorithmique
  { id_question: 11, texte_question: "Quelle structure algorithmique permet de répéter un bloc d'instructions un nombre défini de fois ?", type_question: "qcm", points: 3, options: [
    { id_option: "A", texte_option: "La boucle TANT QUE (While)." }, 
    { id_option: "B", texte_option: "La boucle POUR (For)." },
    { id_option: "C", texte_option: "La condition SI (If)." }
  ]},

  // Q12 (DEV) : Algorithmique
  { id_question: 12, texte_question: "Écrivez le pseudo-code de l'algorithme qui calcule le factoriel d'un nombre entier N.", type_question: "dev", points: 10, options: null },

  // Q13 (SIMPLE) : Logique
  { id_question: 13, texte_question: "Quelle est la valeur de la variable 'res' après l'exécution : $res = 10$; $res = res / 2 + 1$; $res = res * 3$;", type_question: "simple", points: 4, options: null },

  // Q14 (QCM) : Algorithmique
  { id_question: 14, texte_question: "Quelle est la complexité algorithmique d'une recherche dichotomique sur un tableau trié de taille N ?", type_question: "qcm", points: 4, options: [
    { id_option: "A", texte_option: "$O(N)$ (Linéaire)." }, 
    { id_option: "B", texte_option: "$O(1)$ (Constante)." },
    { id_option: "C", texte_option: "$O(\log N)$ (Logarithmique)." }
  ]},

  // Q15 (SIMPLE) : Logique
  { id_question: 15, texte_question: "Dans une condition, si 'A' est VRAI et 'B' est FAUX, que vaut 'NON (A OU B)' ?", type_question: "simple", points: 3, options: null },
  
  // Q16 (DEV) : Algorithmique
  { id_question: 16, texte_question: "Décrivez les étapes de tri par sélection (Selection Sort).", type_question: "dev", points: 6, options: null },

  // --- Questions Mixtes/Synthèse ---
  
  // Q17 (QCM) : BDD/SQL
  { id_question: 17, texte_question: "Quel mot-clé SQL est utilisé pour combiner les résultats de deux requêtes SELECT ?", type_question: "qcm", points: 3, options: [
    { id_option: "A", texte_option: "JOIN." }, 
    { id_option: "B", texte_option: "UNION." },
    { id_option: "C", texte_option: "GROUP BY." }
  ]},

  // Q18 (SIMPLE) : Merise
  { id_question: 18, texte_question: "À quel niveau d'abstraction (Merise) correspond le Modèle Entité-Relation (MER) ?", type_question: "simple", points: 2, options: null },

  // Q19 (DEV) : Synthèse
  { id_question: 19, texte_question: "Pourquoi est-il crucial de modéliser les données avant de commencer à coder l'application (justifiez en termes de coûts et d'erreurs) ?", type_question: "dev", points: 5, options: null },

  // Q20 (QCM) : Algorithmique
  { id_question: 20, texte_question: "Une variable locale dans une fonction existe :", type_question: "qcm", points: 3, options: [
    { id_option: "A", texte_option: "Pendant toute l'exécution du programme." }, 
    { id_option: "B", texte_option: "Uniquement pendant l'exécution de cette fonction." },
    { id_option: "C", texte_option: "Uniquement dans le bloc conditionnel où elle est déclarée." }
  ]}
];