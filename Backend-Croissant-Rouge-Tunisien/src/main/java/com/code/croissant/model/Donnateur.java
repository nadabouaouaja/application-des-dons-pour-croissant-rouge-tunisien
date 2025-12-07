package com.code.croissant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donnateur")
public class Donnateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String groupe_sanguin;
    private String ville;
    private String telephone;

    private String password; // mot de passe chiffré

    // ✅ NOUVEAUX CHAMPS DE SÉCURITÉ
    private int failedAttempts = 0;
    private boolean locked = false;

    // getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGroupe_sanguin() { return groupe_sanguin; }
    public void setGroupe_sanguin(String groupe_sanguin) { this.groupe_sanguin = groupe_sanguin; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // ✅ GETTERS / SETTERS SÉCURITÉ
    public int getFailedAttempts() { return failedAttempts; }
    public void setFailedAttempts(int failedAttempts) { this.failedAttempts = failedAttempts; }

    public boolean isLocked() { return locked; }
    public void setLocked(boolean locked) { this.locked = locked; }
}

/*
✅ Ce que contient un donnateur :
id → numéro unique
nom → nom de famille
prenom → prénom
email → email de connexion
groupe_sanguin → groupe sanguin
ville → ville
telephone → numéro de téléphone
password → mot de passe pour se connecter

✅ À quoi sert ce fichier :

Il crée la table donnateur dans la base de données
Il stocke les informations des utilisateurs
Il est utilisé pour :
- l’inscription
- la connexion
- la gestion des dons

✅ En une phrase très simple :
Cette classe décrit un utilisateur avec ses informations personnelles et son mot de passe. ✅
*/