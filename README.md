# Suivi Chantier Faible Impact Environnemental

Application mobile de suivi environnemental de chantier, conçue pour les visites terrain. Elle permet de renseigner des points de contrôle par catégorie, d'associer des photos à chaque point et de générer un compte-rendu exportable (page de garde et en-tête inclus).

Adaptée de l'outil [Audits_Environnementaux](https://github.com/LouisArep/Audits_Environnementaux) (LouisArep), développé avec l'assistance de Claude (Anthropic).

**Tester l'application : https://jamesolivier18.github.io/Audit_CFIE/**

---

## Fonctionnalités

- Checklist structurée en 9 catégories : Communication externe, Communication interne, Gestion des déchets, Gestion du risque inondation, Nuisances acoustiques, Nuisances boues et poussières, Nuisances visuelles, Pollution eau et sol, Pollutions : prescriptions générales (34 points de contrôle « sur site »)
- 5 statuts par point : Conforme, À améliorer, Non conforme, Non vérifié, Non concerné
- Photos depuis l'appareil photo ou la galerie, associées à chaque point
- Champ de remarques et choix de l'entreprise responsable par point
- Pour les points « Non conforme » : vignettes **Rappel pénalité 1** / **Rappel pénalité 2** (ou aucune) ; la phrase correspondante est ajoutée au compte-rendu Word
- Récapitulatif de visite avec avancement par catégorie
- Export du compte-rendu en **Word (.docx)** (page de garde, en-tête avec n° de visite, date, semaine et pagination) et en **HTML** (avec photos intégrées)
- Données stockées localement sur l'appareil, aucun envoi sur internet

---

## Compatibilité

**Android** et **PC/Mac**, avec **Chrome ou Edge**. Non compatible avec Firefox, Samsung Internet ou Safari iOS.

---

## Installation sur Android

1. Ouvrir Chrome sur le téléphone
2. Accéder à l'adresse de l'application (lien ci-dessus)
3. Menu (trois points en haut à droite) > « Installer l'application » ou « Ajouter à l'écran d'accueil »

---

## Première utilisation

Au premier lancement, choisir un dossier de travail sur l'appareil (ex. `Documents/Suivi_Chantier`) : les visites et les photos y sont enregistrées. À chaque réouverture, le navigateur demande de confirmer l'accès au même dossier.

Créer ensuite une visite : nom du chantier (titre de la page de garde), adresse, n° de visite (saisir `1` donne `VIS01`), date, auditeur, météo, travaux en cours. Ces informations alimentent la page de garde et l'en-tête du Word.

---

## Modifier les catégories et les checklists

Tout le contenu est dans le fichier **`checklist.js`** ; `index.html` n'a pas besoin d'être touché. Les images du Word (logo, image de couverture) sont dans **`assets.js`**.

| Pour… | Modifier dans `checklist.js` |
|---|---|
| Ajouter / retirer / renommer un point | la liste `items` de la catégorie |
| Ajouter une catégorie | un nouveau bloc `{ id, label, abbr, color, items }` dans `CATS` |
| Changer l'émetteur, l'auteur (« Établi par »), le titre du document, l'indice, le nom du fichier, les polices, les acteurs MOA / MOE de la page de garde | le bloc `CONFIG` en haut du fichier |
| Modifier les phrases de rappel de pénalité (montants) | `CONFIG.PENALITES` ; chaque point y renvoie via `pen: '500_infraction'` |
| Changer les pastilles « Travaux en cours » | `CONFIG.TRAVAUX` |

**À respecter :** chaque point a un `id` unique dans sa catégorie. Ne jamais renuméroter ni réutiliser l'`id` d'un point supprimé, sinon les visites déjà saisies seraient décalées. Pour un nouveau point, prendre l'`id` suivant.

Sur GitHub : ouvrir `checklist.js` > icône crayon > modifier > « Commit changes ». La version en ligne est mise à jour en une à deux minutes (recharger l'application pour la voir). Tester sur une branche `dev` avant de fusionner dans `main` évite de casser la version emportée sur le terrain.

---

## Export du compte-rendu

### Word (.docx)
Généré directement et téléchargé sur l'appareil. Il contient une page de garde au format cartouche AREP (émetteur, n° de document `VIS01`, indice, MOA / MOE), un en-tête avec logo et un pied de page « référence / Page X/Y » sur chaque page, puis les points renseignés par catégorie avec statuts, remarques et photos (compressées automatiquement). Le fichier s'appelle par exemple `AREP-ENV-CFIE-VIS01-A-CR Visite Chantier Faible Impact.docx`. Les polices `Lora` (titres) et `Lato` (corps) doivent être installées sur le poste qui ouvre le fichier, sinon Word les remplace : voir `CONFIG` pour choisir d'autres polices.
L'export nécessite internet au premier usage (chargement de la librairie docx.js).

### HTML (avec photos)
Sauvegardé dans le dossier de travail ; ouvrable dans Word puis enregistrable en `.docx` ou PDF. Sa présentation reste celle de l'outil d'origine.

---

## Points d'attention

- Exporter le compte-rendu à la fin de chaque visite : c'est la sauvegarde principale des données structurées
- En cas de changement de téléphone, sauvegarder le dossier de travail (OneDrive) avant la migration
- Les fichiers `index.html`, `checklist.js` et `assets.js` doivent toujours rester dans le même dossier du dépôt
