import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Instance Axios (ajustez si votre application utilise une instance différente)
const mockedAxios = axios.create({
  baseURL: '/api' 
});

const mock = new MockAdapter(mockedAxios, { delayResponse: 500 }); 

const getCurrentDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toISOString();
};

// --- UTILISATEUR ---
// Règle: est_valider = false (par défaut à la création), mais nous incluons des utilisateurs validés pour le test.
let users = [
    { id_utilisateur: 1, id_groupe: 101, nom: 'Alice Martin', email: 'student@gmail.com', matricule: 'S001', role: 'student', est_valider: true, creation_utilisateur: getCurrentDate(10) },
    { id_utilisateur: 2,id_groupe: 101, nom: 'Bob Dupont', email: 'teacher@gmail.com', matricule: 'T001', role: 'teacher', est_valider: true, creation_utilisateur: getCurrentDate(15) },
    { id_utilisateur: 3, nom: 'Charlie Legrand', email: 'charlie.l@univ.fr', matricule: 'S002', role: 'student', est_valider: false, creation_utilisateur: getCurrentDate(8) },
    { id_utilisateur: 4, nom: 'Diane Petit', email: 'diane.p@univ.fr', matricule: 'T002', role: 'teacher', est_valider: true, creation_utilisateur: getCurrentDate(20) },
    { id_utilisateur: 5, nom: 'Eve Dubois', email: 'admin@gmail.com', matricule: 'S003', role: 'admin', est_valider: true, creation_utilisateur: getCurrentDate(5) },
];

// --- GROUPE ---
let groupes = [
    { id_groupe: 101, nom_groupe: 'L3 Informatique 2024', description: 'Cours de programmation avancée.', id_utilisateur: 2 }, // Bob est le créateur
    { id_groupe: 102, nom_groupe: 'Master 1 CyberSec', description: 'Sécurité et Réseaux.', id_utilisateur: 4 }, // Diane est la créatrice
    { id_groupe: 103, nom_groupe: 'Projet Final', description: 'Groupe pour le projet de fin d\'année.', id_utilisateur: 2 },
];

// --- TEST ---
// Règle: max_questions = 15, note_max = 20, status = 'En attente', date_declenchement = null (par défaut)
let tests = [
    // Test 1: En Cours
    { id_test: 1001, titre: 'Examen Final JS Avancé', status: 'En cours', id_groupe: 101, max_questions: 30, note_max: 50, date_declenchement: getCurrentDate(1) },
    // Test 2: Terminé (pour les statistiques)
    { id_test: 1002, titre: 'Quiz HTML/CSS Basique', status: 'Terminé', id_groupe: 101, max_questions: 15, note_max: 20, date_declenchement: getCurrentDate(7) },
    // Test 3: En Attente (valeurs par défaut)
    { id_test: 1003, titre: 'Contrôle Continû M1', status: 'En attente', id_groupe: 102, max_questions: 15, note_max: 20, date_declenchement: null },
    // Test 4: Terminé (plus de tentatives non notées)
    { id_test: 1004, titre: 'Examen Réseaux', status: 'Terminé', id_groupe: 102, max_questions: 20, note_max: 40, date_declenchement: getCurrentDate(3) },
];

// --- QUESTION ---
// Règle: points=1 (QCM/Courte), points=2 (Dev), reponse_correcte=null (QCM/Dev)
let questions = [
    // TEST 1001 (JS Avancé) - 10 QCM, 5 Courtes, 5 Dev
    
    // QCM (points=1)
    { id_question: 1, id_test: 1001, texte_question: 'Quelle méthode crée un nouveau tableau avec les résultats de l\'appel d\'une fonction fournie sur chaque élément du tableau appelant ?', type_question: 'qcm', points: 1, reponse_correcte: 'map' },
    { id_question: 2, id_test: 1001, texte_question: 'Comment déclarer une constante en JavaScript ?', type_question: 'qcm', points: 1, reponse_correcte: 'const' },
    { id_question: 3, id_test: 1001, texte_question: 'Le "Hoisting" fonctionne-t-il avec `let` et `const` ?', type_question: 'qcm', points: 1, reponse_correcte: 'non' },
    { id_question: 4, id_test: 1001, texte_question: 'Quel est l\'équivalent de `==` mais qui compare aussi les types ?', type_question: 'qcm', points: 1, reponse_correcte: '===' },
    { id_question: 5, id_test: 1001, texte_question: 'Comment ajouter un élément à la fin d\'un tableau ?', type_question: 'qcm', points: 1, reponse_correcte: 'push' },
    { id_question: 6, id_test: 1001, texte_question: 'Quel est l\'opérateur de propagation (Spread Operator) ?', type_question: 'qcm', points: 1, reponse_correcte: '...' },
    { id_question: 7, id_test: 1001, texte_question: 'Quelle boucle est utilisée pour itérer sur les propriétés d\'un objet ?', type_question: 'qcm', points: 1, reponse_correcte: 'for...in' },
    { id_question: 8, id_test: 1001, texte_question: 'Le mot clé `this` est-il toujours statique dans une fonction fléchée ?', type_question: 'qcm', points: 1, reponse_correcte: 'oui' },
    { id_question: 9, id_test: 1001, texte_question: 'Quelle est la valeur de `typeof null` ?', type_question: 'qcm', points: 1, reponse_correcte: 'object' },
    { id_question: 10, id_test: 1001, texte_question: 'Que retourne la méthode `filter` si aucun élément ne correspond ?', type_question: 'qcm', points: 1, reponse_correcte: 'tableau_vide' },
    
    // Réponse Courte (points=1)
    { id_question: 11, id_test: 1001, texte_question: 'Quel est l\'acronyme pour XML?', type_question: 'reponse_courte', points: 1, reponse_correcte: 'eXtensible Markup Language' },
    { id_question: 12, id_test: 1001, texte_question: 'Quel port utilise le HTTPS?', type_question: 'reponse_courte', points: 1, reponse_correcte: '443' },
    { id_question: 13, id_test: 1001, texte_question: 'Nommez une structure de données FIFO.', type_question: 'reponse_courte', points: 1, reponse_correcte: 'Queue' },
    { id_question: 14, id_test: 1001, texte_question: 'Que signifie SQL?', type_question: 'reponse_courte', points: 1, reponse_correcte: 'Structured Query Language' },
    { id_question: 15, id_test: 1001, texte_question: 'Nommez le protocole de messagerie simple.', type_question: 'reponse_courte', points: 1, reponse_correcte: 'SMTP' },
    
    // Développement (points=2)
    { id_question: 16, id_test: 1001, texte_question: 'Décrivez les différences entre `var`, `let` et `const`.', type_question: 'developpement', points: 2, reponse_correcte: null },
    { id_question: 17, id_test: 1001, texte_question: 'Expliquez ce qu\'est une Promise en JavaScript.', type_question: 'developpement', points: 2, reponse_correcte: null },
    { id_question: 18, id_test: 1001, texte_question: 'Comment fonctionne l\'héritage prototypal?', type_question: 'developpement', points: 2, reponse_correcte: null },
    { id_question: 19, id_test: 1001, texte_question: 'Donnez un cas d\'utilisation de l\'opérateur Nullish Coalescing (??).', type_question: 'developpement', points: 2, reponse_correcte: null },
    { id_question: 20, id_test: 1001, texte_question: 'Décrivez le cycle de vie d\'un composant React (Hooks).', type_question: 'developpement', points: 2, reponse_correcte: null },

    // TEST 1002 (HTML/CSS Basique) - pour les réponses des tentatives
    { id_question: 21, id_test: 1002, texte_question: 'Quelle balise utilise-t-on pour lier un fichier CSS ?', type_question: 'reponse_courte', points: 1, reponse_correcte: 'link' },
    { id_question: 22, id_test: 1002, texte_question: 'Propriété CSS pour centrer un bloc.', type_question: 'reponse_courte', points: 1, reponse_correcte: 'margin: auto' },
];

// --- OPTION ---
let options = [
    // Options pour Q1
    { id_option: 1, id_question: 1, texte_option: 'forEach', est_correcte: false },
    { id_option: 2, id_question: 1, texte_option: 'filter', est_correcte: false },
    { id_option: 3, id_question: 1, texte_option: 'map', est_correcte: true },
    { id_option: 4, id_question: 1, texte_option: 'reduce', est_correcte: false },
    // Options pour Q2
    { id_option: 5, id_question: 2, texte_option: 'var', est_correcte: false },
    { id_option: 6, id_question: 2, texte_option: 'let', est_correcte: false },
    { id_option: 7, id_question: 2, texte_option: 'const', est_correcte: true },
];

// --- ANNONCE ---
// Règle: creation_annonce = date à l'instant (mais mockée ici)
let annonces = [
    // Annonces pour le Groupe 101
    { id_annonce: 1, id_utilisateur: 2, id_groupe: 101, titre_annonce: 'Rappel Examen', texte_annonce: 'L\'examen final aura lieu la semaine prochaine, révisez bien les Promises et Hoisting.', creation_annonce: getCurrentDate(2) },
    { id_annonce: 2, id_utilisateur: 2, id_groupe: 101, titre_annonce: 'Séance Questions-Réponses', texte_annonce: 'Je serai disponible en ligne demain à 14h pour vos questions.', creation_annonce: getCurrentDate(1) },
    { id_annonce: 3, id_utilisateur: 4, id_groupe: 101, titre_annonce: 'Changement de Salle', texte_annonce: 'La salle de TP a été déplacée en B304.', creation_annonce: getCurrentDate(0) }, // La plus récente
    
    // Annonces pour le Groupe 102
    { id_annonce: 4, id_utilisateur: 4, id_groupe: 102, titre_annonce: 'Bienvenue', texte_annonce: 'Début du module cryptographie. Lisez le chapitre 1.', creation_annonce: getCurrentDate(5) },
];

// --- TENTATIVE ---
// Règle: heure_debut = date à l'instant, heure_soumission = null, est_noter = false, note_obtenue = 0 (par défaut)
let tentatives = [
    // Tentative 1 (Alice sur Test 1002 - Terminé, Noté)
    { id_tentative: 1, id_utilisateur: 1, id_test: 1002, heure_debut: getCurrentDate(6), heure_soumission: getCurrentDate(6), note_obtenue: 15, est_noter: true },
    // Tentative 2 (Charlie sur Test 1002 - Terminé, Noté)
    { id_tentative: 2, id_utilisateur: 3, id_test: 1002, heure_debut: getCurrentDate(6), heure_soumission: getCurrentDate(6), note_obtenue: 5, est_noter: true },
    // Tentative 3 (Eve sur Test 1001 - En cours, Non soumise)
    { id_tentative: 3, id_utilisateur: 5, id_test: 1001, heure_debut: getCurrentDate(0), heure_soumission: null, note_obtenue: 0, est_noter: false },
    // Tentative 4 (Alice sur Test 1004 - Soumise, Non Notée)
    { id_tentative: 4, id_utilisateur: 1, id_test: 1004, heure_debut: getCurrentDate(2), heure_soumission: getCurrentDate(2), note_obtenue: 0, est_noter: false },
];

// --- REPONSE ---
// Règle: est_corriger=true et score_question calculé (QCM/Courte), est_corriger=false et score_question=0 (Dev)
const reponses = [
    // Réponses pour Tentative 1 (Alice, Test 1002) - Questions 21, 22
    // R21: Correct
    { id_reponse: 1, id_tentative: 1, id_question: 21, reponse_texte: 'link', score_question: 1, est_corriger: true },
    // R22: Incorrect (simulant un score manquant pour un total de 15/20)
    { id_reponse: 2, id_tentative: 1, id_question: 22, reponse_texte: 'text-align: center', score_question: 0, est_corriger: true },

    // Réponses pour Tentative 4 (Alice, Test 1004) - Tentative avec est_noter=false
    // R: Dev, non corrigée
    { id_reponse: 3, id_tentative: 4, id_question: 16, reponse_texte: 'var est globale, let/const sont locales...', score_question: 0, est_corriger: false }, 
    // R: Courte, auto-corrigée
    { id_reponse: 4, id_tentative: 4, id_question: 14, reponse_texte: 'Structured Query Language', score_question: 1, est_corriger: true }, 
];

// --- RESULTAT ---
// Règle: date_publication = date à l'instant (mais mockée ici)
let resultats = [
    { id_resultat: 1, id_utilisateur: 1, id_test: 1002, note_finale: 15, date_publication: getCurrentDate(5) },
    { id_resultat: 2, id_utilisateur: 3, id_test: 1002, note_finale: 5, date_publication: getCurrentDate(5) },
];
// ----------------------------------------------------
// FONCTIONS UTILITAIRES POUR LE MOCK
// ----------------------------------------------------


const findQuestion = (id: any) => questions.find(q => q.id_question === id);

// Fonction pour déterminer le score par défaut de la réponse
const calculateDefaultScoreAndCorrection = (question: any) => {
    let est_corriger;
    let score_question;

    if (question.type_question === 'qcm' || question.type_question === 'reponse_courte') {
        est_corriger = true;
        score_question = 0; // Sera calculé immédiatement après (dans le cas réel) ou lors de la modification.
    } else { // type_question === 'developpement'
        est_corriger = false;
        score_question = 0;
    }
    return { est_corriger, score_question };
};

// ----------------------------------------------------
// MOCK DES REQUÊTES (AJOUTS ET MODIFICATIONS)
// ----------------------------------------------------

// --- UTILISATEUR ---

// Inscription (Ajout des valeurs par défaut)
mock.onPost('/utilisateur/inscription').reply(config => {
  const newUser = JSON.parse(config.data);
  const newId = users.length + 1;
  const newUserData = {
    ...newUser,
    id_utilisateur: newId,
    role: 'student',
    est_valider: false, // Valeur par défaut
    creation_utilisateur: getCurrentDate() // Valeur par défaut
  };
  users.push(newUserData);
  return [201, newUserData];
});

// --- OPTION ---

// Créer une option (Règle spéciale de mise à jour de la question)
mock.onPost('/option').reply(config => {
    const newOption = JSON.parse(config.data);
    const newId = options.length + 1;
    const newOptionData = { ...newOption, id_option: newId };
    options.push(newOptionData);

    // Règle: si est_correcte = true, la reponse_correcte de la question est remplacée
    if (newOption.est_correcte) {
        const question = findQuestion(newOption.id_question);
        if (question) {
            // Dans un cas réel, vous utiliseriez l'ID de l'option ou le texte de l'option.
            // Ici, nous utilisons le texte de l'option comme valeur de reponse_correcte
            question.reponse_correcte = newOption.texte_option;
        }
    }
    return [201, newOptionData];
});

// --- QUESTION ---

// Créer une question (Ajout des valeurs par défaut)
mock.onPost('/question').reply(config => {
    const newQuestion = JSON.parse(config.data);
    const newId = questions.length + 1;
    
    let points;
    let reponse_correcte;

    switch (newQuestion.type_question) {
        case 'qcm':
        case 'reponse_courte':
            points = 1;
            reponse_correcte = (newQuestion.type_question === 'qcm') ? null : newQuestion.reponse_correcte || null;
            break;
        case 'developpement':
            points = 2;
            reponse_correcte = null;
            break;
        default:
            points = 1;
            reponse_correcte = null;
    }

    const newQuestionData = {
        ...newQuestion,
        id_question: newId,
        points: points,
        reponse_correcte: reponse_correcte 
    };
    questions.push(newQuestionData);
    return [201, newQuestionData];
});

// Récupérer des questions aléatoires (Nouvelle Logique)
mock.onGet(/\/question\/test\/\d+\/aleatoire/).reply((config: any) => {
    const id_test = parseInt(config.url.split('/')[3]);
    const availableQuestions = questions.filter(q => q.id_test === id_test);
    
    // Filtres
    const qcm = availableQuestions.filter(q => q.type_question === 'qcm').sort(() => 0.5 - Math.random());
    const courte = availableQuestions.filter(q => q.type_question === 'reponse_courte').sort(() => 0.5 - Math.random());
    const dev = availableQuestions.filter(q => q.type_question === 'developpement').sort(() => 0.5 - Math.random());

    // Sélection (10 QCM, 5 Courtes, 5 Dev)
    const selectedQuestions = [
        ...qcm.slice(0, 10),
        ...courte.slice(0, 5),
        ...dev.slice(0, 5)
    ];

    return [200, selectedQuestions];
});

// --- ANNONCE ---

// Créer une annonce (Ajout des valeurs par défaut)
mock.onPost('/annonce').reply(config => {
    const newAnnonce = JSON.parse(config.data);
    const newId = annonces.length + 1;
    const newAnnonceData = { 
        ...newAnnonce, 
        id_annonce: newId, 
        creation_annonce: getCurrentDate() // Valeur par défaut
    };
    annonces.push(newAnnonceData);
    return [201, newAnnonceData];
});

// --- TENTATIVE ---

// Créer une tentative (Ajout des valeurs par défaut)
mock.onPost('/tentative').reply(config => {
    const newTentative = JSON.parse(config.data);
    const newId = tentatives.length + 1;
    const newTentativeData = { 
        ...newTentative, 
        id_tentative: newId, 
        heure_debut: getCurrentDate(), // Valeur par défaut
        heure_soumission: null, // Valeur par défaut
        est_noter: false, // Valeur par défaut
        note_obtenue: 0 // Valeur par défaut
    };
    tentatives.push(newTentativeData);
    return [201, newTentativeData];
});

// Terminer une tentative (Modification)
mock.onPut(/\/tentative\/\d+\/terminer/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const tentative = tentatives.find(t => t.id_tentative === id);

    if (tentative) {
        // Règle: heure_soumission = date à l'instant
        tentative.heure_soumission = getCurrentDate();
        
        // Règle: note_obtenue = somme des score_question des réponses de l'étudiant
        const tentativeReponses = reponses.filter(r => r.id_tentative === id);
        tentative.note_obtenue = tentativeReponses.reduce((sum, r) => sum + r.score_question, 0);

        return [200, tentative];
    }
    return [404, { message: 'Tentative non trouvée.' }];
});

// --- RESULTAT ---

// Créer un resultat (Ajout des valeurs par défaut)
mock.onPost('/resultat').reply(config => {
    const newResultat = JSON.parse(config.data);
    const newId = resultats.length + 1;
    const newResultatData = {
        ...newResultat,
        id_resultat: newId,
        date_publication: getCurrentDate() // Valeur par défaut
    };
    resultats.push(newResultatData);
    return [201, newResultatData];
});

// --- REPONSE ---

// Créer une reponse (Ajout des valeurs par défaut)
mock.onPost('/reponse').reply(config => {
    const newReponse = JSON.parse(config.data);
    const question = findQuestion(newReponse.id_question);

    if (!question) return [404, { message: 'Question non trouvée.' }];

    const { est_corriger, score_question } = calculateDefaultScoreAndCorrection(question);

    const newId = reponses.length + 1;
    const newReponseData = {
        ...newReponse,
        id_reponse: newId,
        est_corriger: est_corriger,
        score_question: score_question
    };
    
    // Logique de scoring immédiat pour QCM/Courte (si `reponse_texte` est fourni)
    if (newReponseData.est_corriger && newReponse.reponse_texte && question.reponse_correcte) {
        if (newReponse.reponse_texte === question.reponse_correcte) {
            newReponseData.score_question = question.points;
        }
    }
    
    reponses.push(newReponseData);
    return [201, newReponseData];
});

// Modifier le reponse_texte d'une reponse (Logique de mise à jour)
mock.onPut(/\/reponse\/\d+\/text/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const { reponse_texte } = JSON.parse(config.data);
    const reponse = reponses.find(r => r.id_reponse === id);
    const question = reponse ? findQuestion(reponse.id_question) : null;

    if (reponse && question) {
        reponse.reponse_texte = reponse_texte;
        
        // Règle: si la repose_texte = reponse_correcte du question, mettre à jour score_question = points du questions
        if (question.type_question !== 'developpement') {
            if (reponse_texte === question.reponse_correcte) {
                reponse.score_question = question.points;
            } else {
                reponse.score_question = 0;
            }
        }
        return [200, reponse];
    }
    return [404, { message: 'Réponse ou Question non trouvée.' }];
});

// Modifier le score_question et mettre en true le est_corriger d'une reponse (Logique de mise à jour)
mock.onPut(/\/reponse\/\d+\/score/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const { score_question } = JSON.parse(config.data);
    const reponse = reponses.find(r => r.id_reponse === id);

    if (reponse) {
        reponse.score_question = score_question;
        reponse.est_corriger = true;
        
        // Règle: Mettre à jour la note de la tentative associée
        const tentative = tentatives.find(t => t.id_tentative === reponse.id_tentative);
        if (tentative) {
            const tentativeReponses = reponses.filter(r => r.id_tentative === tentative.id_tentative);
            tentative.note_obtenue = tentativeReponses.reduce((sum, r) => sum + r.score_question, 0);
        }
        
        return [200, reponse];
    }
    return [404, { message: 'Réponse non trouvée.' }];
});

// --- TEST ---

// Créer un test (Ajout des valeurs par défaut)
mock.onPost('/test').reply(config => {
    const newTest = JSON.parse(config.data);
    const newId = tests.length + 1001;
    const newTestData = {
        ...newTest,
        id_test: newId,
        max_questions: newTest.max_questions || 15, // Valeur par défaut
        note_max: newTest.note_max || 20, // Valeur par défaut
        status: 'En attente', // Valeur par défaut
        date_declenchement: null // Valeur par défaut
    };
    tests.push(newTestData);
    return [201, newTestData];
});

// Terminer le test par son id (Modification)
mock.onPut(/\/test\/\d+\/terminer/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const test = tests.find(t => t.id_test === id);

    if (test) {
        // Règle: status = Terminé
        test.status = 'Terminé';
        return [200, test];
    }
    return [404, { message: 'Test non trouvé.' }];
});

// Modification de l'heure de déclenchement d'un test (Logique de mise à jour)
mock.onPut(/\/test\/\d+\/declenchement/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const test = tests.find(t => t.id_test === id);

    if (test) {
        // Règle: date_declenchement = date à l'instant
        test.date_declenchement = getCurrentDate();
        // Règle: status = En cours
        test.status = 'En cours';
        return [200, test];
    }
    return [404, { message: 'Test non trouvé.' }];
});

// ... Autres mocks non modifiés (Connexion, Récupération d'utilisateurs, Groupes, Annonces, etc.)

// ----------------------------------------------------
// FONCTIONS UTILITAIRES 
// ----------------------------------------------------

const findUser = (id: any) => users.find(u => u.id_utilisateur === id);
const findGroup = (id: any) => groupes.find(g => g.id_groupe === id);
const findTest = (id: any) => tests.find(t => t.id_test === id);
const findAnnonce = (id: any) => annonces.find(a => a.id_annonce === id);
const findTentative = (id: any) => tentatives.find(t => t.id_tentative === id);
const findReponse = (id: any) => reponses.find(r => r.id_reponse === id);

// ----------------------------------------------------
// MOCK DES REQUÊTES (COMPLET)
// ----------------------------------------------------

// --- UTILISATEUR ---

// Connexion (authentification)
mock.onPost('/utilisateur/connexion').reply(config => {
  const { email } = JSON.parse(config.data);
  const user = users.find(u => u.email === email);
  if (user) {
    // Simuler un token JWT 
    const token = `${user.id_utilisateur}/${user.role}`;
    return [200, { token: token }];
  }
  return [401, { message: 'Email ou mot de passe incorrect.' }];
});

// Inscription (avec valeurs par défaut)
mock.onPost('/utilisateur/inscription').reply(config => {
  const newUser = JSON.parse(config.data);
  const newId = users.length + 1;
  const newUserData = {
    ...newUser,
    id_utilisateur: newId,
    role: 'student',
    est_valider: false,
    creation_utilisateur: getCurrentDate()
  };
  users.push(newUserData);
  return [201, newUserData];
});

// Récupération de tous les utilisateurs (student ou teacher), ordre décroissant par date
mock.onGet('/utilisateur').reply(200, 
  users
    .filter(u => u.role === 'student' || u.role === 'teacher')
    .sort((a, b) => new Date(b.creation_utilisateur).getTime() - new Date(a.creation_utilisateur).getTime())
);

// Récupération d'un utilisateur par son id
mock.onGet(/\/utilisateur\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const user = findUser(id);
    if (user) return [200, user];
    return [404, { message: 'Utilisateur non trouvé.' }];
});

// Modification de la validation
mock.onPut(/\/utilisateur\/\d+\/validation/).reply((config: any) => {
    const id = parseInt(config.url.split('/')[2]);
    const { est_valider } = JSON.parse(config.data);
    const user = findUser(id);
    if (user) {
        user.est_valider = est_valider;
        return [200, user];
    }
    return [404, { message: 'Utilisateur non trouvé.' }];
});

// ----------------------------------------------------
// --- GROUPE --- (Mocks non modifiés)
// ----------------------------------------------------

// Créer une groupe
mock.onPost('/groupe').reply(config => {
    const newGroup = JSON.parse(config.data);
    const newId = groupes.reduce((max, g) => Math.max(max, g.id_groupe), 100) + 1;
    const newGroupData = { ...newGroup, id_groupe: newId };
    groupes.push(newGroupData);
    return [201, newGroupData];
});

// Récupérer tous les groupes
mock.onGet('/groupe').reply(200, groupes);

// Récupérer une groupe par son id
mock.onGet(/\/groupe\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const group = findGroup(id);
    if (group) return [200, group];
    return [404, { message: 'Groupe non trouvé.' }];
});

// Modifier une groupe
mock.onPut(/\/groupe\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const updates = JSON.parse(config.data);
    const group = findGroup(id);
    if (group) {
        Object.assign(group, updates);
        return [200, group];
    }
    return [404, { message: 'Groupe non trouvé.' }];
});

// Supprimer une groupe
mock.onDelete(/\/groupe\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = groupes.length;
    groupes = groupes.filter(g => g.id_groupe !== id);
    if (groupes.length < initialLength) return [204]; // Succès sans contenu
    return [404, { message: 'Groupe non trouvé.' }];
});

// ----------------------------------------------------
// --- OPTION --- (Mocks non modifiés)
// ----------------------------------------------------

// Créer une option (avec logique de question.reponse_correcte)
mock.onPost('/option').reply((config: any) => {
    const newOption = JSON.parse(config.data);
    const newId = options.reduce((max, o) => Math.max(max, o.id_option), 0) + 1;
    const newOptionData = { ...newOption, id_option: newId };
    options.push(newOptionData);

    if (newOption.est_correcte) {
        const question = findQuestion(newOption.id_question);
        if (question) question.reponse_correcte = newOption.texte_option;
    }
    return [201, newOptionData];
});

// Récupérer une option par l'id du question
mock.onGet(/\/option\/question\/\d+/).reply((config: any) => {
    const id_question = parseInt(config.url.split('/').pop());
    const filteredOptions = options.filter(o => o.id_question === id_question);
    return [200, filteredOptions];
});

// Supprimer une option
mock.onDelete(/\/option\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = options.length;
    options = options.filter(o => o.id_option !== id);
    if (options.length < initialLength) return [204];
    return [404, { message: 'Option non trouvée.' }];
});

// ----------------------------------------------------
// --- QUESTION ---
// ----------------------------------------------------

// Créer une question (avec valeurs par défaut)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Modifier une question
mock.onPut(/\/question\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const updates = JSON.parse(config.data);
    const question = findQuestion(id);
    if (question) {
        Object.assign(question, updates);
        return [200, question];
    }
    return [404, { message: 'Question non trouvée.' }];
});

// Supprimer une question
mock.onDelete(/\/question\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = questions.length;
    questions = questions.filter(q => q.id_question !== id);
    if (questions.length < initialLength) return [204];
    return [404, { message: 'Question non trouvée.' }];
});

// Récupérer les questions par l'id du test
mock.onGet(/\/question\/test\/\d+/).reply((config: any) => {
    const id_test = parseInt(config.url.split('/').pop());
    const filteredQuestions = questions.filter(q => q.id_test === id_test);
    return [200, filteredQuestions];
});

// Récupérer des questions aléatoires (Logique de 10 QCM, 5 Courtes, 5 Dev)
// ... (Logique déjà définie dans le mock ajusté précédent)

// ----------------------------------------------------
// --- ANNONCE ---
// ----------------------------------------------------

// Créer une annonce (avec valeur par défaut)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Récupérer les annonces par l'id du groupe
mock.onGet(/\/annonce\/groupe\/\d+$/).reply((config: any) => {
    const id_groupe = parseInt(config.url.split('/').pop());
    const groupAnnonces = annonces;
    return [200, annonces];
});

// Récupérer une annonce par son id
mock.onGet(/\/annonce\/\d+$/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const annonce = findAnnonce(id);
    if (annonce) return [200, annonce];
    return [404, { message: 'Annonce non trouvée.' }];
});

// Récupérer les 3 dernières annonces par l'id du groupe
mock.onGet(/\/annonce\/groupe\/\d+\/dernieres/).reply((config: any) => {
    const id_groupe = parseInt(config.url.split('/')[2]);
    const groupAnnonces = annonces
        .filter(a => a.id_groupe === id_groupe)
        .sort((a, b) => new Date(b.creation_annonce).getTime() - new Date(a.creation_annonce).getTime())
        .slice(0, 3);
    return [200, groupAnnonces];
});

// Récupérer les 3 dernières annonces par l'id d'un utilisateur
mock.onGet(/\/annonce\/utilisateur\/\d+\/dernieres/).reply((config: any) => {
    const id_utilisateur = parseInt(config.url.split('/')[2]);
    const userAnnonces = annonces
        .filter(a => a.id_utilisateur === id_utilisateur)
        .sort((a, b) => new Date(b.creation_annonce).getTime() - new Date(a.creation_annonce).getTime())
        .slice(0, 3);
    return [200, userAnnonces];
});

// Modifier une annonce
mock.onPut(/\/annonce\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const updates = JSON.parse(config.data);
    const annonce = findAnnonce(id);
    if (annonce) {
        Object.assign(annonce, updates);
        return [200, annonce];
    }
    return [404, { message: 'Annonce non trouvée.' }];
});

// Supprimer une annonce
mock.onDelete(/\/annonce\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = annonces.length;
    annonces = annonces.filter(a => a.id_annonce !== id);
    if (annonces.length < initialLength) return [204];
    return [404, { message: 'Annonce non trouvée.' }];
});

// ----------------------------------------------------
// --- TENTATIVE ---
// ----------------------------------------------------

// Créer une tentative (avec valeurs par défaut)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Modifier une tentative (simple modification, l'opération Terminer est une route différente)
mock.onPut(/\/tentative\/\d+$/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const updates = JSON.parse(config.data);
    const tentative = findTentative(id);
    if (tentative) {
        Object.assign(tentative, updates);
        return [200, tentative];
    }
    return [404, { message: 'Tentative non trouvée.' }];
});

// Récupérer toutes les tentatives par l'id du test (avec nom, matricule)
mock.onGet(/\/tentative\/test\/\d+/).reply((config: any) => {
    const id_test = parseInt(config.url.split('/').pop());
    const testTentatives = tentatives
        .filter(t => t.id_test === id_test)
        .map(t => {
            const user = findUser(t.id_utilisateur);
            return {
                ...t,
                nom_utilisateur: user ? user.nom : 'Inconnu',
                matricule_utilisateur: user ? user.matricule : 'N/A',
            };
        });
    return [200, testTentatives];
});

// Terminer une tentative (Logique de mise à jour)
// ... (Logique déjà définie dans le mock ajusté précédent)

// ----------------------------------------------------
// --- RESULTAT ---
// ----------------------------------------------------

// Créer un resultat (avec valeur par défaut)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Récupérer les resultats par l'id du groupe
mock.onGet(/\/resultat\/groupe\/\d+/).reply((config: any) => {
    const id_groupe = parseInt(config.url.split('/').pop());
    const testsDuGroupe = tests.filter(t => t.id_groupe === id_groupe).map(t => t.id_test);
    const filteredResults = resultats.filter(r => testsDuGroupe.includes(r.id_test));
    return [200, filteredResults];
});

// Récupérer touts les resultats
mock.onGet('/resultat').reply(200, resultats);

// Supprimer un resultat
mock.onDelete(/\/resultat\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = resultats.length;
    resultats = resultats.filter(r => r.id_resultat !== id);
    if (resultats.length < initialLength) return [204];
    return [404, { message: 'Resultat non trouvé.' }];
});

// ----------------------------------------------------
// --- REPONSE ---
// ----------------------------------------------------

// Créer une reponse (avec valeurs par défaut et auto-scoring)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Modifier le reponse_texte d'une reponse (Logique de mise à jour)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Modifier le score_question et mettre en true le est_corriger d'une reponse (Logique de mise à jour)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Récupérer les reponses par l'id du test lié au tentative de la reponse avec le texte du question lié et le points du questions
mock.onGet(/\/reponse\/test\/\d+\/tentative\/\d+/).reply((config: any) => {
    const parts = config.url.split('/');
    const id_test = parseInt(parts[2]);
    const id_tentative = parseInt(parts[4]);

    const tentativeReponses = reponses
        .filter(r => r.id_tentative === id_tentative)
        .map(r => {
            const question = findQuestion(r.id_question);
            return {
                ...r,
                texte_question: question ? question.texte_question : 'Question non trouvée',
                points_question: question ? question.points : 0
            };
        });
    
    // Vérification supplémentaire pour le test ID (bien que redondant si les données sont cohérentes)
    // Seules les questions liées au bon test devraient être dans la réponse.
    return [200, tentativeReponses.filter(r => findQuestion(r.id_question)?.id_test === id_test)];
});

// Récupérer une reponse par son id
mock.onGet(/\/reponse\/\d+$/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const reponse = findReponse(id);
    if (reponse) return [200, reponse];
    return [404, { message: 'Réponse non trouvée.' }];
});

// Récupérer tous les reponses avec est_corriger egal a false
mock.onGet('/reponse/non-corriger').reply(200, 
    reponses.filter(r => r.est_corriger === false)
);

// ----------------------------------------------------
// --- TEST ---
// ----------------------------------------------------

// Récupérer les tests avec des status en cours par l'id du groupe
mock.onGet(/\/test\/groupe\/\d+\/encours/).reply((config: any) => {
    const id_groupe = parseInt(config.url.split('/')[3]);
    const filteredTests = tests.filter(t => t.id_groupe === id_groupe && t.status === 'En cours');
    return [200, filteredTests];
});

// Récupérer un test par son id
mock.onGet(/\/test\/\d+$/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const test = findTest(id);
    if (test) return [200, test];
    return [404, { message: 'Test non trouvé.' }];
});

// Récupérer un test par l'id de l'utilisateur
mock.onGet(/\/test\/utilisateur\/\d+/).reply((config: any) => {
    const id_utilisateur = parseInt(config.url.split('/').pop());
    // Logique: Récupère les tests liés aux groupes de cet utilisateur (simplifié pour le mock)
    const userGroups = groupes.filter(g => g.id_utilisateur === id_utilisateur).map(g => g.id_groupe);
    const userTests = tests.filter(t => userGroups.includes(t.id_groupe));
    return [200, userTests];
});

// Récupérer tous les tests dont il existe encore des tentatives avec est_noter egal a false
mock.onGet('/test/a-noter').reply(200, 
    tests.filter(t => tentatives.some(tt => tt.id_test === t.id_test && tt.est_noter === false))
);

// Logique pour les statistiques des tests notés
const calculateTestStats = (testId: any) => {
    const testTentatives = tentatives.filter(t => t.id_test === testId && t.est_noter === true);
    const totalTentatives = testTentatives.length;
    if (totalTentatives === 0) return null;

    const test = findTest(testId);
    const moyenne = test.note_max / 2;
    
    const reussite = testTentatives.filter(t => t.note_obtenue >= moyenne).length;
    const echec = totalTentatives - reussite;

    return {
        id_test: testId,
        titre: test.titre,
        total_tentatives: totalTentatives,
        total_reussite: reussite,
        total_echec: echec,
        note_max: test.note_max
    };
};

// Récupérer tous les tests dont touts les tentatives avec est_noter egal a true, renvoyer avec les statistiques du test
mock.onGet('/test/statistiques').reply(200, 
    tests
        .filter(t => t.status === 'Terminé' && tentatives.every(tt => tt.id_test !== t.id_test || tt.est_noter === true))
        .map(t => calculateTestStats(t.id_test))
        .filter(stat => stat !== null)
);

// Récupérer tous les tests dont touts les tentatives avec est_noter egal a true par l'id de l'utilisateur
mock.onGet(/\/test\/statistiques\/utilisateur\/\d+/).reply((config: any) => {
    const id_utilisateur = parseInt(config.url.split('/').pop());
    const testsDeLUtilisateur = tentatives
        .filter(t => t.id_utilisateur === id_utilisateur && t.est_noter === true)
        .map(t => t.id_test);

    // Retourne les stats uniquement pour les tests que l'utilisateur a notés
    return [200, 
        Array.from(new Set(testsDeLUtilisateur))
            .map(testId => calculateTestStats(testId))
            .filter(stat => stat !== null)
    ];
});

// Supprimer un test
mock.onDelete(/\/test\/\d+/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = tests.length;
    tests = tests.filter(t => t.id_test !== id);
    if (tests.length < initialLength) return [204];
    return [404, { message: 'Test non trouvé.' }];
});

// Modification de l'heure de declenchement d'un test (Logique de mise à jour)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Creer un test (avec valeurs par défaut)
// ... (Logique déjà définie dans le mock ajusté précédent)

// Modifier un test
mock.onPut(/\/test\/\d+$/).reply((config: any) => {
    const id = parseInt(config.url.split('/').pop());
    const updates = JSON.parse(config.data);
    const test = findTest(id);
    if (test) {
        Object.assign(test, updates);
        return [200, test];
    }
    return [404, { message: 'Test non trouvé.' }];
});

// Terminer le test par son id (Modification du status)
// ... (Logique déjà définie dans le mock ajusté précédent)


// Exportez l'instance axios mockée pour l'utiliser dans votre application
export default mockedAxios;

// Fonction pour initialiser le mock 
export const initMockAdapter = () => {
  console.log('Axios Mock Adapter Initialisé avec les nouvelles règles.');
};