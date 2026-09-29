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
    { id: '01', t: 'Communication externe', sub: "Lettres aux riverains, panneaux avec contact, boîte aux lettres, réunion d'information, etc." },
  ]},
  { id: 'comint', label: 'Communication interne', abbr: 'CI', color: '#1565c0', items: [
    { id: '01', t: 'Signalétique base vie indiquant pratiques de réduction des consommations et de tri des déchets' },
    { id: '02', t: 'Signalétique chantier indiquant zones tri de déchets, aire de lavage, kits anti-pollution' },
    { id: '03', t: "Livret d'accueil complet mis à disposition du personnel" },
  ]},
  { id: 'dechets', label: 'Gestion des déchets', abbr: 'DE', color: '#4e342e', items: [
    { id: '01', t: 'Propreté générale de la zone de tri des déchets' },
    { id: '02', t: 'Bennes à déchets couvertes' },
    { id: '03', t: 'Tri à la source des déchets selon 7 flux : plastique' },
    { id: '04', t: 'Tri à la source des déchets selon 7 flux : carton' },
    { id: '05', t: 'Tri à la source des déchets selon 7 flux : bois' },
    { id: '06', t: 'Tri à la source des déchets selon 7 flux : verre' },
    { id: '07', t: 'Tri à la source des déchets selon 7 flux : fraction minérale' },
    { id: '08', t: 'Tri à la source des déchets selon 7 flux : plâtre' },
    { id: '09', t: 'Tri à la source des déchets selon 7 flux : métal' },
    { id: '10', t: 'Déchets base vie : tri selon déchets alimentaires, verre et emballages' },
  ]},
  { id: 'inond', label: "Gestion du risque inondation", abbr: 'IN', color: '#0277bd', items: [
    { id: '01', t: 'Cohérence des procédures crues mises en place avec le plan de gestion' },
    { id: '02', t: "Stockage nocturne ou weekend des déchets amiantés et plombés non autorisé en zone d'emport du Rez de Seine" },
  ]},
  { id: 'acou', label: 'Nuisances acoustiques', abbr: 'AC', color: '#6a1b9a', items: [
    { id: '01', t: 'Marquage CE acoustique et puissance acoustique sur engins' },
  ]},
  { id: 'boues', label: 'Nuisances boues et poussières', abbr: 'BP', color: '#e65100', items: [
    { id: '01', t: "Points de lavage pour roues camions (dont système de décantation et rétention d'eau souillée) et goulottes toupies" },
    { id: '02', t: 'Humidification par buse brumisatrice si opération très émettrice de poussière (démolitions)' },
    { id: '03', t: 'Aspiration à la source si opérations de sciage ou ponçage émettrices de poussières' },
    { id: '04', t: 'Bâches pour le transport ou le stockage des produits pouvant se disperser' },
    { id: '05', t: 'Lave-bottes, gratte-boues et paillassons en place dans la base-vie' },
  ]},
  { id: 'visuel', label: 'Nuisances visuelles', abbr: 'VI', color: '#00838f', items: [
    { id: '01', t: 'Type de barrière, protections visuelles type bâche' },
    { id: '02', t: 'Bon état / nettoyage des palissades, abords, voie publique, etc.' },
  ]},
  { id: 'eau', label: 'Pollution eau et sol', abbr: 'PE', color: '#2e7d32', items: [
    { id: '01', t: "Présence d'un dispositif de drainage et de filtration des eaux de ruissellement avant rejet" },
    { id: '02', t: "Présence d'un bassin de rétention d'eau pluviale avec filtre avant rejet" },
    { id: '03', t: 'Bâches et barrières flottantes pour éviter la dispersion de sédiments dans la Seine' },
    { id: '04', t: 'Produits polluants ou dangereux disposés sur aire étanche' },
    { id: '05', t: 'Réserves de carburant (type citerne) équipées de bacs de rétention' },
    { id: '06', t: 'Liquides dangereux placés dans des conteneurs étanches sur bacs de rétention' },
    { id: '07', t: 'Zéro rejet polluant vers la Seine', sub: 'Laitance, hydrocarbures, solvants, eaux chargées de sédiments' },
    { id: '08', t: 'Disponibilité de kits anti-pollution', sub: 'Absorption (ex. boudins), confinement (barrages, bâches étanches pour sol, etc.), récupération (pelles, racloirs, fûts, sacs)' },
  ]},
  { id: 'fds', label: 'Pollutions : prescriptions générales', abbr: 'PG', color: '#c62828', items: [
    { id: '01', t: 'Respect des prescriptions indiquées sur les FDS', sub: 'Fiches de données de sécurité' },
  ]},
];
