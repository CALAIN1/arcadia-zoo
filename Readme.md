# Zoo Arcadia
Ce site est un site d'entreprise pour les employés et un site vitrine pour les visiteurs du zoo. Projet réalisé dans le cadre de ma formation dwwm et sert d'ecf (évaluation en cours de formation).

- Lien Trello : https://trello.com/invite/b/669c2749a6d3f363f8a012e5/ATTIa7800dfbb19432b7f4e4588904d075b49F21D99B/arcadia

- Lien du site déployé: https://calain.alwaysdata.net


## Liste des technos et ressources utilisées:

| Technologie | Version |
|--- | :-: |
| Html | 5 |
| Css | 3 |
| Js | ES6 |
| Php | 8.2.18 |
| Git |  2.38.1  |
| MySQL | 8.3.0 |
| NodeJs | 18.12.1 |
| Apache |2.4.59 |
| PhpMyAdmin | 5.2.1 |



## Installation

Afin d'installer ce projet localement sur votre poste, il faut:
- Clôner le projet avec git (``` git clone https://github.com/CALAIN1/arcadia-zoo.git```)
- Se positionner à l'intérieur du dossier que vous venez de clôner (``` cd arcadia-zoo```)
- Si vous utilisez un serveur de type wamp, mamp, faites pointer le document root de votre serveur http afin de servir le projet arcadia-zoo (_a adapter selon votre configuration_) 
- Ouvrez votre navigateur et accéder à `http://localhost/arcadia-zoo`

## WAMP

Télécharger et installer WAMP :
- Rendez-vous sur le site officiel de WAMP (https://www.wampserver.com) et téléchargez la dernière version compatible avec votre système d'exploitation.
- Suivez les instructions d'installation fournies par WAMP.
- Ouvrez un terminal et clonez le projet en utilisant Git :
            git clone https://github.com/CALAIN1/arcadia-zoo.git
- Déplacez-vous dans le dossier du projet :
            cd arcadia-zoo
- Placez le dossier du projet dans le répertoire www de WAMP (généralement situé dans C:/wamp64/www).
- Ouvrez WAMP et lancez les services Apache et MySQL.
- Accédez à phpMyAdmin en tapant http://localhost/phpmyadmin dans votre navigateur.
- Créez une nouvelle base de données avec le nom arcadia_zoo.
- Importez le fichier SQL qui se trouve dans le dossier /db du projet pour configurer la structure de la base de données.
- Assurez-vous que les fichiers de configuration de la base de données sont correctement configurés dans le projet (fichier includes/db.php).
- Vous pouvez ajuster les paramètres de connexion à MySQL (username, password, etc.) selon votre configuration locale WAMP.
- Ouvrez votre navigateur et accédez à http://localhost/arcadia-zoo.
- Vous devriez maintenant voir la page d'accueil du site Arcadia Zoo.



## Identifiants de connexion à l'espaace admin :

| Rôle | Identifiant | password | Accès
|--- | :-: |  :-: |  :-: | 
|Administrateur | jose@gmail.com | 12345 | admin/accounts
|               |                 |       | admin/zone
|               |                 |       | admin/animal
|Vétérinaire | jul@gmail.com | 12345 | véto/rapport
|               |                 |       | véto/etat
|Employé | henri@gmail.com | 12345 | employé/avis
|               |                 |       | employé/food
                                            




