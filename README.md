# Suivi Chantier Faible Impact Environnemental

Application mobile de suivi environnemental de chantier, conçue pour les visites terrain. Elle permet de renseigner des points de contrôle par catégorie, d'associer des photos à chaque point et de générer un compte-rendu exportable (page de garde et en-tête inclus).

Adaptée de l'outil [Audits_Environnementaux](https://github.com/LouisArep/Audits_Environnementaux) (LouisArep), développé avec l'assistance de Claude (Anthropic).

**Tester l'application : https://jamesolivier18.github.io/Audit_CFIE/**

---

## Fonctionnalités

- Checklist structurée en 10 catégories : Communication externe, Communication interne, Gestion des déchets, Gestion du risque inondation, Nuisances acoustiques, Nuisances boues et poussières, Nuisances visuelles, Pollution eau et sol, Biodiversité, Pollutions : prescriptions générales (39 points de contrôle, plus un point « Autre remarque » par catégorie)
- 5 statuts : Conforme, À améliorer, Non conforme, Non vérifié, Non concerné ; le statut est choisi **pour chaque remarque** (un point peut avoir une remarque Conforme et une autre À améliorer)
- Photos depuis l'appareil photo ou la galerie, associées à chaque point
- Choix de l'entreprise responsable par point
- **Plusieurs remarques par point**, chacune avec son propre statut et son propre champ **Créé le** : par défaut la date de la visite (observation du présent CR) ; une autre date indique une observation d'un CR précédent, toujours pas corrigée
- Bouton **Marquer urgent** sur chaque remarque : exportée en **rouge** dans le Word, et reprise dans l'encadré rouge du récapitulatif
- L'avancement et les compteurs (non conformes, à améliorer) utilisent, pour chaque point, le statut le plus défavorable de ses remarques
- Rappels de pénalité (vignettes **Rappel pénalité 1** / **2** sur les points « Non conforme ») : fonction **désactivée pour le moment** ; pour la réactiver, ajouter `PENALITES_ACTIVES: true` dans `CONFIG` (`checklist.js`)
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

Créer ensuite une visite : nom du chantier (titre de la page de garde), adresse, n° de visite (saisir `1` donne `VIS01`), date, auditeur. Le nom du chantier, l'adresse et l'auditeur sont préremplis (valeurs modifiables dans `CONFIG.DEFAULTS`) et restent modifiables à chaque visite. Ces informations alimentent la page de garde et l'en-tête du Word.

---

## Observations du présent CR et des CR précédents

Chaque remarque d'un point (bouton **+ Ajouter une remarque**) a son statut et son champ **Créé le** :

- **date de la visite (par défaut)** : observation du présent CR, exportée en **bleu** ;
- **autre date** (celle d'un CR précédent) : la remarque et la date sont exportées en **noir** ;
- **remarque urgente** : exportée en **rouge** (remarque et date), quelle que soit la date.

L'application affiche « CR actuel : exporté en bleu », « CR précédent : exporté en noir » ou « URGENT : exporté en rouge » sous le champ. Remettre la date de la visite rétablit la valeur par défaut. Le bouton **Supprimer** retire une remarque. Les visites déjà saisies restent lisibles : l'ancienne remarque unique d'un point (avec sa date et son statut) devient la première remarque ; le statut d'un point sans remarque est conservé.

### Synthèse des remarques urgentes
Le récapitulatif contient un encadré rouge qui liste les remarques urgentes, une par ligne, au format : `Catégorie : Remarque. (remarque créée le AAAA-MM-JJ).` Le bouton **Copier** place la liste (à puces) dans le presse-papiers, prête à coller dans un mail.

---

## Modifier les catégories et les checklists

Tout le contenu est dans le fichier **`checklist.js`** ; `index.html` n'a pas besoin d'être touché. Les images du Word (logo, image de couverture) sont dans **`assets.js`**.

| Pour… | Modifier dans `checklist.js` |
|---|---|
| Ajouter / retirer / renommer un point | la liste `items` de la catégorie |
| Ajouter une catégorie | un nouveau bloc `{ id, label, abbr, color, items }` dans `CATS` |
| Changer l'émetteur, l'auteur (« Établi par »), le titre du document, l'indice, le nom du fichier, les polices, les acteurs MOA / MOE de la page de garde | le bloc `CONFIG` en haut du fichier |
| Modifier les phrases de rappel de pénalité (montants) | `CONFIG.PENALITES` ; chaque point y renvoie via `pen: '500_infraction'` |
| Changer les valeurs préremplies à la création d'une visite | `CONFIG.DEFAULTS` |

**À respecter :** chaque point a un `id` unique dans sa catégorie. Ne jamais renuméroter ni réutiliser l'`id` d'un point supprimé, sinon les visites déjà saisies seraient décalées. Pour un nouveau point, prendre l'`id` suivant.

Sur GitHub : ouvrir `checklist.js` > icône crayon > modifier > « Commit changes ». La version en ligne est mise à jour en une à deux minutes (recharger l'application pour la voir). Tester sur une branche `dev` avant de fusionner dans `main` évite de casser la version emportée sur le terrain.

---

## Export du compte-rendu

### Word (.docx)
Généré directement et téléchargé sur l'appareil. Il contient une page de garde au format cartouche AREP (émetteur, n° de document `VIS01`, indice, MOA / MOE), un en-tête avec logo et un pied de page « référence / Page X/Y » sur chaque page, puis une légende (« Noir : observations intégrées dans CR précédents. Bleu : observations intégrées dans le présent CR. Rouge : observations à prendre en compte urgemment. ») et les points renseignés par catégorie, dans un tableau par catégorie. Pour chaque point, une ligne grisée sur toute la largeur porte le titre et les entreprises ; en dessous, chaque remarque occupe sa ligne avec, en colonnes, son **statut** (cellule colorée) et sa date **Créé le**, et les photos du point se suivent dans la colonne de droite. Cette colonne **Photos** a toujours au moins la largeur d'une photo portrait, même sans photo, et s'élargit pour les photos paysage. Les séparateurs internes sont en gris très clair. Les photos sont compressées automatiquement. Le fichier s'appelle par exemple `AREP-ENV-CFIE-VIS01-A-CR Visite Chantier Faible Impact.docx`. La police `Lato` doit être installée sur le poste qui ouvre le fichier, sinon Word la remplace : voir `CONFIG` pour choisir une autre police. Les couleurs bleu / noir peuvent être changées en ajoutant `COULEUR_NOUVEAU: '#0070C0'` et `COULEUR_ANCIEN: '#000000'` dans `CONFIG` (valeurs par défaut sinon).
L'export nécessite internet au premier usage (chargement de la librairie docx.js).

### HTML (avec photos)
Sauvegardé dans le dossier de travail ; ouvrable dans Word puis enregistrable en `.docx` ou PDF. Sa présentation reste celle de l'outil d'origine.

---

## Points d'attention

- Exporter le compte-rendu à la fin de chaque visite : c'est la sauvegarde principale des données structurées
- En cas de changement de téléphone, sauvegarder le dossier de travail (OneDrive) avant la migration
- Les fichiers `index.html`, `checklist.js` et `assets.js` doivent toujours rester dans le même dossier du dépôt
