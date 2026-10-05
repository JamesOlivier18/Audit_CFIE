// ════════════════════════════════════════════════════════════════
//  CONTENU DE L'APPLICATION — seul fichier à modifier pour changer les
//  catégories, les checklists, les rappels de pénalité et la cartouche Word.
//
//  RÈGLES pour ne rien casser :
//  • chaque point a un "id" unique DANS SA CATÉGORIE (ex. '01', '02'…)
//  • ne jamais renuméroter ni réutiliser l'id d'un point supprimé :
//    les visites déjà saisies s'appuient dessus
//  • pour ajouter un point : nouvel id (le suivant dans la catégorie)
//  • garder les virgules entre les éléments et les guillemets fermés
//  • "sub" est facultatif : précision affichée sous le titre du point
//  • "pen" désigne le modèle de rappel de pénalité (voir PENALITES)
// ════════════════════════════════════════════════════════════════

const CONFIG = {
  // ── Cartouche et rapport Word ──
  EMETTEUR: 'AREP - BET Environnement',            // case « Émetteur »
  AUTEUR: 'Olivier JAMES',                         // case « Établi par »
  DOC_TITLE: 'Compte rendu de visite chantier faible impact environnemental',
  VISIT_PREFIX: 'VIS',                             // « VIS » + n° de visite saisi dans l'appli → VIS01
  INDICE: 'A',                                     // indice du document
  FILE_PREFIX: 'AREP-ENV-CFIE',                    // nom du fichier : PREFIX-VIS01-A-SUFFIX.docx
  FILE_SUFFIX: 'CR Visite Chantier Faible Impact',
  FONT_TITLE: 'Lora',                              // titres (police à installer sur le poste qui ouvre le Word)
  FONT_BODY: 'Lato',                               // corps de texte
  ACCENT: '#000000',                               // couleur des bandeaux de catégorie dans le Word

  // ── Acteurs affichés sur la page de garde ──
  MOA: [
    { nom: 'SOGARIS HAROPA PORT LES AMARRES', adresse: 'Place de la Logistique - 94150 RUNGIS' },
  ],
  MOE: [
    { nom: 'ENCORE HEUREUX ARCHITECTES', adresse: "104 rue d'Aubervilliers - 75018 PARIS" },
    { nom: 'AREP Ingénierie - Architecture Recherche Engagement Post-carbone', adresse: "16 avenue d'Ivry - 75013 PARIS" },
    { nom: 'ECO+ CONSTRUIRE', adresse: '24 rue de Constantinople - 75008 PARIS' },
    { nom: 'REMIX', adresse: "104 rue d'Aubervilliers - 75019 PARIS" },
  ],

  // ── Travaux en cours (pastilles à cocher à la création d'une visite) ──
  TRAVAUX: ['Installation de chantier', 'Démolition / curage', 'Terrassement', 'Gros œuvre',
            'Second œuvre', 'VRD', 'Espaces verts'],

  // ── Rappels de pénalité proposés quand un point est « Non conforme » ──
  PENALITES: {
    '500_infraction': {
      p1: 'Doit être conforme à la prochaine visite sous peine de pénalité inscrite au CCAP (500€/infraction/jour calendaire)',
      p2: 'La non-conformité entraine une pénalité de 500€/infraction/jour calendaire',
    },
    '250_infraction': {
      p1: 'Doit être conforme à la prochaine visite sous peine de pénalité inscrite au CCAP (250€/infraction/jour calendaire)',
      p2: 'La non-conformité entraine une pénalité de 250€/infraction/jour calendaire',
    },
  },
};

const CATS = [
  { id: 'comext', label: 'Communication externe', abbr: 'CE', color: '#546e7a', items: [
    { id: '01', t: 'Présence de dispositifs de communication riverains', sub: 'Panneaux avec contact, boîte aux lettres, etc.', pen: '500_infraction' },
  ]},
  { id: 'comint', label: 'Communication interne', abbr: 'CI', color: '#1565c0', items: [
    { id: '01', t: 'Signalétique en base-vie indiquant les pratiques de réduction des consommations et de tri des déchets', sub: "Extinction de l'éclairage, fermeture des portes si locaux chauffés, modération des températures de chauffe, extinction des radiateurs le soir, etc.", pen: '500_infraction' },
    { id: '02', t: "Signalétique chantier indiquant les zones de tri des déchets, l'aire de lavage et les kits anti-pollution", pen: '500_infraction' },
    { id: '03', t: "Livret d'accueil complet et mis à disposition du personnel", sub: "Informations générales sur le chantier et l'accessibilité, rappel des objectifs CCFN, PIC simplifié et fonctionnel, bonnes pratiques pour la réduction des impacts environnementaux, des pollutions et des nuisances, etc. Contrôle des bordereaux (signés lors de la réunion d'accueil HSE)", pen: '500_infraction' },
  ]},
  { id: 'dechets', label: 'Gestion des déchets', abbr: 'DE', color: '#4e342e', items: [
    { id: '01', t: 'Propreté générale de la zone de tri des déchets', pen: '250_infraction' },
    { id: '02', t: "Bennes à déchets couvertes si risque d'envol", pen: '500_infraction' },
    { id: '03', t: 'Tri à la source des déchets selon 8 flux : plastique', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '04', t: 'Tri à la source des déchets selon 8 flux : papier/carton', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '05', t: 'Tri à la source des déchets selon 8 flux : bois', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '06', t: 'Tri à la source des déchets selon 8 flux : verre', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '07', t: 'Tri à la source des déchets selon 8 flux : fraction minérale', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '08', t: 'Tri à la source des déchets selon 8 flux : plâtre', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '09', t: 'Tri à la source des déchets selon 8 flux : métal', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '11', t: 'Tri à la source des déchets selon 8 flux : textile', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.', pen: '500_infraction' },
    { id: '10', t: 'Déchets de la base-vie : tri des déchets alimentaires, du verre et des emballages', sub: 'Contenant adapté, signalétique, respect du tri, etc.', pen: '500_infraction' },
  ]},
  { id: 'inond', label: 'Gestion du risque inondation', abbr: 'IN', color: '#0277bd', items: [
    { id: '01', t: 'Cohérence des procédures de crue mises en place avec le plan de gestion', sub: 'Voir les procédures du plan de gestion de crue', pen: '500_infraction' },
    { id: '02', t: "Absence de stockage nocturne ou weekend des déchets amiantés et plombés en zone d'emport du Rez de Seine", sub: 'Stockage non autorisé', pen: '500_infraction' },
  ]},
  { id: 'acou', label: 'Nuisances acoustiques', abbr: 'AC', color: '#6a1b9a', items: [
    { id: '01', t: 'Marquage CE et puissance acoustique associée sur les engins', sub: 'Présent, visible', pen: '500_infraction' },
  ]},
  { id: 'boues', label: 'Nuisances boues et poussières', abbr: 'BP', color: '#e65100', items: [
    { id: '01', t: 'Points de lavage pour les roues des camions et pour les goulottes de toupies', sub: 'Lavage adapté (système de décantation et rétention des eaux souillées, etc.)', pen: '250_infraction' },
    { id: '02', t: "Humidification par buse brumisatrice en cas d'opération de démolition", sub: "En cas d'opération très émettrice de poussières", pen: '250_infraction' },
    { id: '03', t: "Aspiration à la source en cas d'opérations de sciage ou de ponçage", sub: "En cas d'opération très émettrice de poussières", pen: '250_infraction' },
    { id: '04', t: 'Bâches pour le transport des produits pouvant se disperser', pen: '250_infraction' },
    { id: '05', t: 'Lave-bottes, gratte-boues et paillassons en place dans la base-vie', pen: '250_infraction' },
  ]},
  { id: 'visuel', label: 'Nuisances visuelles', abbr: 'VI', color: '#00838f', items: [
    { id: '01', t: 'Présence de barrières ou de palissades permettant de limiter les nuisances visuelles', sub: "Le type de barrière (pleine, grillagée), voire la protection visuelle (bâche en trompe-l'œil) lorsque nécessaire, est adéquat", pen: '250_infraction' },
    { id: '02', t: 'Bon état / nettoyage des palissades, des abords, de la voie publique, etc.', pen: '250_infraction' },
  ]},
  { id: 'eau', label: 'Pollution eau et sol', abbr: 'PE', color: '#2e7d32', items: [
    { id: '01', t: "Présence d'un dispositif de drainage et de filtration des eaux de ruissellement avant rejet", sub: 'Drainage de type périphérique par tranchée reliée à un puisard ou équivalent', pen: '500_infraction' },
    { id: '02', t: "Présence d'un bassin de rétention d'eau pluviale avec filtre avant rejet", pen: '500_infraction' },
    { id: '03', t: 'Bâches et barrières flottantes pour éviter la dispersion de sédiments dans la Seine', sub: 'Lors de travaux en surplomb / proximité de la seine', pen: '500_infraction' },
    { id: '04', t: 'Produits polluants ou dangereux disposés sur aire étanche', sub: "État de la surface, présence d'un aménagement de récupération des fuites (bordure, caniveau, etc.), étiquetage et présence des FDS", pen: '500_infraction' },
    { id: '05', t: 'Réserves de carburant (type citerne) équipées de bacs de rétention', sub: "État (absence d'eau de pluie accumulée, etc.), stabilité, etc.", pen: '500_infraction' },
    { id: '06', t: 'Liquides dangereux placés dans des conteneurs étanches sur des bacs de rétention', sub: 'État, conteneur fermé, étiqueté, étanche, etc.', pen: '500_infraction' },
    { id: '07', t: 'Zéro rejet polluant vers la Seine', sub: 'Pas de laitance, hydrocarbures, solvants, eaux chargées de sédiments etc.', pen: '500_infraction' },
    { id: '08', t: 'Disponibilité de kits anti-pollution', sub: 'Disponibilité, localisations pertinentes (près des sources : réserves carburant, sur engins etc.), état, nombre, typologies (absorption (ex. boudins), confinement (barrages, bâches étanches pour sol, etc.), récupération (pelles, racloirs, fûts, sacs))', pen: '500_infraction' },
  ]},
  { id: 'fds', label: 'Pollutions : prescriptions générales', abbr: 'PG', color: '#c62828', items: [
    { id: '01', t: 'Respect des prescriptions indiquées sur les FDS', sub: 'Voir prescriptions indiquées dans les FDS', pen: '500_infraction' },
  ]},
];
