// ════════════════════════════════════════════════════════════════
//  CONTENU DE L'APPLICATION — c'est le seul fichier à modifier pour
//  changer les catégories, les checklists et l'apparence du rapport Word.
//
//  RÈGLES pour ne rien casser :
//  • chaque point a un "id" unique DANS SA CATÉGORIE (ex. '01', '02'…)
//  • ne jamais renuméroter ni réutiliser l'id d'un point supprimé :
//    les visites déjà saisies s'appuient dessus
//  • pour ajouter un point : nouvel id (le suivant dans la catégorie)
//  • garder les virgules entre les éléments et les guillemets fermés
//  • "sub" est facultatif : précision affichée sous le titre du point
// ════════════════════════════════════════════════════════════════

const CONFIG = {
  // ── Rapport Word ──
  FIRM: "NOM DU BUREAU D'ÉTUDES",                 // ligne 1 de l'en-tête (à personnaliser)
  DOC_TITLE: ['COMPTE-RENDU DE VISITE', 'CHANTIER FAIBLE IMPACT ENVIRONNEMENTAL'], // titre page de garde
  NUM_PREFIX: 'VIS ',                             // préfixe du n° de visite (page de garde)
  FONT_TITLE: 'Oswald',                           // titres (remplacer par 'Arial Narrow' si la police n'est pas installée)
  FONT_BODY: 'IBM Plex Sans',                     // texte (remplacer par 'Arial' si la police n'est pas installée)
  ACCENT: '#000000',                              // couleur des bandeaux de catégorie dans le Word

  // ── Travaux en cours (pastilles à cocher à la création d'une visite) ──
  TRAVAUX: ['Installation de chantier', 'Démolition / curage', 'Terrassement', 'Gros œuvre',
            'Second œuvre', 'VRD', 'Espaces verts'],
};

const CATS = [
  { id: 'comext', label: 'Communication externe', abbr: 'CE', color: '#546e7a', items: [
    { id: '01', t: 'Présence de dispositifs de communication riverains', sub: "Lettres aux riverains, panneaux avec contact, boîte aux lettres, réunion d'information, etc." },
  ]},
  { id: 'comint', label: 'Communication interne', abbr: 'CI', color: '#1565c0', items: [
    { id: '01', t: 'Signalétique en base-vie indiquant les pratiques de réduction des consommations et de tri des déchets', sub: "Extinction de l'éclairage, fermeture des portes si locaux chauffés, modération des températures de chauffe, extinction des radiateurs le soir, etc." },
    { id: '02', t: "Signalétique chantier indiquant les zones de tri des déchets, l'aire de lavage et les kits anti-pollution" },
    { id: '03', t: "Livret d'accueil complet et mis à disposition du personnel", sub: "Informations générales sur le chantier et l'accessibilité, rappel des objectifs CCFN, PIC simplifié et fonctionnel, bonnes pratiques pour la réduction des impacts environnementaux, des pollutions et des nuisances, etc." },
  ]},
  { id: 'dechets', label: 'Gestion des déchets', abbr: 'DE', color: '#4e342e', items: [
    { id: '01', t: 'Propreté générale de la zone de tri des déchets' },
    { id: '02', t: 'Bennes à déchets couvertes' },
    { id: '03', t: 'Tri à la source des déchets selon 7 flux : plastique', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '04', t: 'Tri à la source des déchets selon 7 flux : papier/carton', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '05', t: 'Tri à la source des déchets selon 7 flux : bois', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '06', t: 'Tri à la source des déchets selon 7 flux : verre', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '07', t: 'Tri à la source des déchets selon 7 flux : fraction minérale', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '08', t: 'Tri à la source des déchets selon 7 flux : plâtre', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '09', t: 'Tri à la source des déchets selon 7 flux : métal', sub: 'Contenant adapté, signalétique, accès, absence de surcharge, respect du tri, etc.' },
    { id: '10', t: 'Déchets de la base-vie : tri des déchets alimentaires, du verre et des emballages', sub: 'Contenant adapté, signalétique, respect du tri, etc.' },
  ]},
  { id: 'inond', label: 'Gestion du risque inondation', abbr: 'IN', color: '#0277bd', items: [
    { id: '01', t: 'Cohérence des procédures de crue mises en place avec le plan de gestion', sub: 'Voir les procédures du plan de gestion de crue' },
    { id: '02', t: "Absence de stockage nocturne ou weekend des déchets amiantés et plombés en zone d'emport du Rez de Seine", sub: 'Stockage non autorisé' },
  ]},
  { id: 'acou', label: 'Nuisances acoustiques', abbr: 'AC', color: '#6a1b9a', items: [
    { id: '01', t: 'Marquage CE et puissance acoustique associée sur les engins', sub: 'Présent, visible' },
  ]},
  { id: 'boues', label: 'Nuisances boues et poussières', abbr: 'BP', color: '#e65100', items: [
    { id: '01', t: 'Points de lavage pour les roues des camions et pour les goulottes de toupies', sub: 'Lavage adapté (système de décantation et rétention des eaux souillées, etc.)' },
    { id: '02', t: "Humidification par buse brumisatrice en cas d'opération de démolition", sub: "En cas d'opération très émettrice de poussières" },
    { id: '03', t: "Aspiration à la source en cas d'opérations de sciage ou de ponçage", sub: "En cas d'opération très émettrice de poussières" },
    { id: '04', t: 'Bâches pour le transport des produits pouvant se disperser' },
    { id: '05', t: 'Lave-bottes, gratte-boues et paillassons en place dans la base-vie' },
  ]},
  { id: 'visuel', label: 'Nuisances visuelles', abbr: 'VI', color: '#00838f', items: [
    { id: '01', t: 'Présence de barrières ou de palissades permettant de limiter les nuisances visuelles', sub: "Le type de barrière (pleine, grillagée), voire la protection visuelle (bâche en trompe-l'œil), est adéquat" },
    { id: '02', t: 'Bon état / nettoyage des palissades, des abords, de la voie publique, etc.' },
  ]},
  { id: 'eau', label: 'Pollution eau et sol', abbr: 'PE', color: '#2e7d32', items: [
    { id: '01', t: "Présence d'un dispositif de drainage et de filtration des eaux de ruissellement avant rejet", sub: 'Drainage de type périphérique par tranchée reliée à un puisard ou équivalent' },
    { id: '02', t: "Présence d'un bassin de rétention d'eau pluviale avec filtre avant rejet" },
    { id: '03', t: 'Bâches et barrières flottantes pour éviter la dispersion de sédiments dans la Seine' },
    { id: '04', t: 'Produits polluants ou dangereux disposés sur aire étanche', sub: "État de la surface, présence d'un aménagement de récupération des fuites (bordure, caniveau, etc.), étiquetage et présence des FDS" },
    { id: '05', t: 'Réserves de carburant (type citerne) équipées de bacs de rétention', sub: "État (absence d'eau de pluie accumulée, etc.), stabilité, etc." },
    { id: '06', t: 'Liquides dangereux placés dans des conteneurs étanches sur des bacs de rétention', sub: 'État, conteneur fermé, étiqueté, étanche, etc.' },
    { id: '07', t: 'Zéro rejet polluant vers la Seine (laitance, hydrocarbures, solvants, eaux chargées de sédiments)' },
    { id: '08', t: 'Disponibilité de kits anti-pollution : absorption (ex. boudins), confinement (barrages, bâches étanches pour sol, etc.), récupération (pelles, racloirs, fûts, sacs)', sub: 'Disponibilité, état, nombre' },
  ]},
  { id: 'fds', label: 'Pollutions : prescriptions générales', abbr: 'PG', color: '#c62828', items: [
    { id: '01', t: 'Respect des prescriptions indiquées sur les FDS', sub: 'Voir prescriptions indiquées dans les FDS' },
  ]},
];
