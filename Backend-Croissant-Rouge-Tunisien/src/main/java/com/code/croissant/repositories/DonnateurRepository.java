package com.code.croissant.repositories;


import com.code.croissant.model.Donnateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DonnateurRepository extends JpaRepository<Donnateur, Long> {
    Optional<Donnateur> findByEmail(String email);
}
/*👉 Sert à parler avec la base de données pour les utilisateurs (donnateurs).
👉 Il permet :
d’enregistrer un utilisateur
de le chercher
de le supprimer
et spécialement ici : chercher un utilisateur par email pour le login.
🟢 Utilisé dans l’authentification. */