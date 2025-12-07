package com.code.croissant.repositories;
import com.code.croissant.model.Element;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ElementRepository extends JpaRepository<Element, Long> {
    Optional<Element> findById(Long Id);
    List<Element> findAll();
}
/*
👉 Sert à gérer les éléments (objets à donner) dans la base.
👉 Il permet :
ajouter des éléments
afficher les éléments
chercher un élément par ID
🟢 Utilisé quand un utilisateur crée un don. */