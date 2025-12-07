package com.code.croissant.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Don {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant; // ← nullable

    private LocalDate dateDon;
    private String typeDon;
    private String description;

    @ManyToOne
    @JoinColumn(name = "donnateur_id")
    private Donnateur donateur;

    @ManyToOne
    private Element element;
}
/*
✅ Ce que signifie ce fichier : Il crée une table Don avec ces informations :

id → numéro du don (généré automatiquement)
montant → la somme donnée
dateDon → la date du don
typeDon → type du don
description → description du don

✅ Les relations :

@ManyToOne Donnateur
→ Un don appartient à un seul donnateur.
@ManyToOne Element
→ Un don correspond à un seul élément.


✅ Les annotations Lombok :
@Data → crée automatiquement getters, setters, toString…
@NoArgsConstructor → constructeur vide
@AllArgsConstructor → constructeur avec tous les champs

✅ En une phrase très simple :
Cette classe décrit un don (argent ou objet) et l’enregistre dans la base avec son utilisateur et son élément. ✅
 */