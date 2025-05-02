const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Supprimer la classe active de tous les liens
      navLinks.forEach(l => l.classList.remove('active'));

      // Ajouter la classe active au lien cliqué
      this.classList.add('active');
    });
  });