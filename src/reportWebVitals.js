// Cette fonction reportWebVitals est utilisée pour enregistrer les mesures des Web Vitals
// Elle prend en paramètre une fonction onPerfEntry pour traiter les mesures enregistrées

const reportWebVitals = onPerfEntry => {
  // Vérifie si onPerfEntry est une fonction avant de procéder
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importe dynamiquement le module 'web-vitals' pour obtenir les différentes fonctions de mesure des Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Appelle chaque fonction de mesure des Web Vitals avec onPerfEntry comme argument pour enregistrer les mesures
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
