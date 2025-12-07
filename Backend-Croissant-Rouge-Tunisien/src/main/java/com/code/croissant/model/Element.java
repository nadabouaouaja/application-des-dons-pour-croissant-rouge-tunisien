package com.code.croissant.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Element {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String image;
    private String label;
    private String type;  

    private String created_at;
    private String updated_at;

    // Correct setters & getters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; } 

    public String getCreated_at() { return created_at; }
    public void setCreated_at(String created_at) { this.created_at = created_at; }

    public String getUpdated_at() { return updated_at; }
    public void setUpdated_at(String updated_at) { this.updated_at = updated_at; }
}



/*
Ce code représente un élément que l’on peut donner (dans la base de données).

✅ Ce que contient un élément :
id → numéro unique de l’élément
description → description de l’élément
image → image de l’élément
label → nom ou titre de l’élément

✅ À quoi sert ce fichier :
Il crée la table Element dans la base de données
Il sert à afficher les choses qu’on peut donner dans l’application
Il est utilisé quand un utilisateur crée un don

✅ En une phrase très simple :
Cette classe décrit un objet que l’on peut donner. ✅
*/