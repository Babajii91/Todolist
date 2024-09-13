class Perso {
    constructor(force, pv, vitesse) {
      this.force = force;
      this.pv = pv;
      this.vitesse = vitesse;
    }
  
    attaquer(adversaire) {
      adversaire.pv -= this.force;
    }
  
    ResteVivant() {
      return this.pv > 0;
    }
  }
  
  function combat(Perso_A, Perso_B) {
    while (Perso_A.ResteVivant() && Perso_B.ResteVivant()) {
      if (Perso_A.vitesse >= Perso_B.vitesse) {
        Perso_A.attaquer(Perso_B);
        if (Perso_B.ResteVivant()) {
          Perso_B.attaquer(Perso_A);
        }
      } else {
        Perso_B.attaquer(Perso_A);
        if (Perso_A.ResteVivant()) {
          Perso_A.attaquer(Perso_B);
        }
      }
    }
  
    
    if (Perso_A.ResteVivant()) {
      console.log('Perso_A a gagné !!');
      console.log(Perso_A);
      return Perso_A;
    } else {
      console.log(Perso_B,'a gagné !!!!');
      return Perso_B;
    }
  }
  
  const Perso_A = new Perso(90, 10, 100);
  const Perso_B = new Perso(60, 20, 20);
  const Perso_C = new Perso(80, 120, 50);
  
 
  const gagnantPremierCombat = combat(Perso_A, Perso_B);
  
  if (gagnantPremierCombat.ResteVivant()) {
    console.log("Le gagnant affronte un nouvel ennemi, Perso_C !");
    const gagnantSecondCombat = combat(gagnantPremierCombat, Perso_C);
  
    if (gagnantSecondCombat === Perso_C) {
      console.log('Perso_C a gagné le deuxième combat !');
    } else {
      console.log('Le gagnant du premier combat a gagné contre Perso_C !');
    }
  }
  