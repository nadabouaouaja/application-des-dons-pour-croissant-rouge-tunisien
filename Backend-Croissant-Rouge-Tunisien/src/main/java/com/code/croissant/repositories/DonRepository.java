package com.code.croissant.repositories;

import com.code.croissant.model.Don;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonRepository extends JpaRepository<Don, Long> {

    // Optionnel : récupérer tous les dons d'un donateur spécifique
    List<Don> findByDonateur_Id(Long donateurId);
}
/*
👉 Sert à gérer les dons dans la base de données.
👉 Il permet :
ajouter un don
supprimer un don
afficher les dons
👉 Et ici, il peut récupérer les dons d’un utilisateur précis.
🟢 Utilisé dans la gestion des dons. */