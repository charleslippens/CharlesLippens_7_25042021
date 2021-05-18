// Permet de vérifier que l'utilisateur dispose bien d'un token pour accéder à la page demandée
export default function admin (to, from, next) {
    if (!localStorage.getItem('isAdmin')) {
      next({ name: 'Post' });
      return false
    }
    return next()
}