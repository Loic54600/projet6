//Permet au click du bouton d'appeller la modal //
document.getElementById('btn-modal').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('visible');
    document.getElementById('modal').classList.add('visible');
  });
//Permet au bouton modal de fermer la modal//
document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('visible');
    document.getElementById('modal').classList.remove('visible');
});







  
    
      
    
