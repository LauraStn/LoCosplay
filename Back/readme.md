location de cosplay !
by Santin Laura

## Fonctionnalités rendues

CRUD user (sauf update et delete non implémentées en front, fonctionnelles en back)
CRUD cosplay
CRUD rental
middlewares validator
requêtes préparées

2 triggers en BDD:
-le 1e qui décrémente le stock de -1 du produit choisi au moment de la location
-le 2e qui incrémente le stock de +1 lorsque la location est rendue

## gestion des roles

## USER:

dashboard:
-affichage des locations du user en cours
-locations passées de l'utilisateur et un bouton delete sur une location terminée(affiché dans cette catégorie après "returned" par l'admin seulement)

cosplay:
-affichage de tous les cosplay sur une page avec une fonction de recherche par nom
-un bouton pour louer le produit (qui marche seulement une fois les dates choisies) un message "out of stock" est envoyé si le stock du produit est à 0

## ADMIN

dashboard: affichage de:

-tous les produits, avec des boutons update et delete(un produit ne peut pas être supprimé si une location est en cours avec le produit)
-tous les produits loués par aucun user
-toutes les locations en cours avec un bouton "returned" pour valider qu'un user a rendue sa loc
(is_active dans la table 'rental' passe a false une fois la location rendue)
-toutes les locations passées (qui peuvent ensuite être supprimées par le user)
-formulaire de création d'un produit
-une recherche de produit par son nom
