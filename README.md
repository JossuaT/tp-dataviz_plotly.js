# TP Data Visualization avec Plotly.js

## Introduction
Dans ce TP, nous allons utiliser Plotly.js, une bibliothèque graphique JavaScript, pour visualiser des données sismiques fournies par l’United States Geological Survey (USGS). Nous créerons une page HTML pour afficher des graphiques interactifs comprenant :

- Une carte mondiale des emplacements des séismes.
- Un histogramme des magnitudes des séismes.
- Une série temporelle des occurrences de séismes.
- Un graphique de dispersion liant la magnitude à la profondeur.

## Objectif
L'objectif de ce TP est de comprendre et de mettre en œuvre la récupération de données à partir d’une API en direct, de traiter les données en JavaScript et de les visualiser en utilisant différents graphiques avec Plotly.js.

## Instructions

### Le fichier HTML
Créer un fichier HTML nommé `index.html` avec la structure de base et inclure la bibliothèque Plotly.js.

### Récupérer les données sismiques
Dans le fichier `main.js`, écrire une fonction JavaScript pour récupérer les données sismiques de l’API de l’USGS en utilisant l’endpoint suivant :

`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`

### Traiter les données
Extraire les données nécessaires – latitude, longitude, magnitude, temps et profondeur à partir des données récupérées.

### Représenter les données
Implémenter les fonctions suivantes pour visualiser les données à l’aide de Plotly.js :

- **World Map** : Représentez une carte mondiale montrant les emplacements des séismes avec des cercles dimensionnés par la magnitude.
- **Histogramme des magnitudes** : Créez un histogramme pour afficher la distribution des magnitudes des séismes.
- **Analyse de série temporelle** : Générez un graphique en ligne montrant le nombre de séismes par jour au cours de la dernière semaine.
- **Graphique de dispersion Magnitude vs Profondeur** : Affichez un graphique de dispersion montrant la relation entre la magnitude des séismes et leur profondeur.

### Exécution du script
Appeler les fonctions de récupération et de traitement des données, puis les fonctions de visualisation.
