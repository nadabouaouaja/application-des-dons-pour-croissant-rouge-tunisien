package com.code.croissant.controllers;

import com.code.croissant.model.LoginRequest;
import com.code.croissant.model.LoginResponse;
import com.code.croissant.model.Donnateur;
import com.code.croissant.repositories.DonnateurRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final DonnateurRepository repository;

    public AuthController(DonnateurRepository repository) {
        this.repository = repository;
    }

    // ⭐ LOGIN UNIQUE ET CORRIGÉ
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return repository.findByEmail(request.getEmail())
                .map(d -> {
                    if (d.getPassword().equals(request.getPassword())) {

                        // 🔥 Retourne l'ID du donnateur pour Angular
                        return new LoginResponse(
                                true,
                                "Connexion réussie ✅",
                                d.getId()
                        );
                    } else {
                        return new LoginResponse(false, "Mot de passe incorrect ❌", null);
                    }
                })
                .orElseGet(() -> new LoginResponse(false, "Email inconnu ❌", null));
    }

    // ⭐ REGISTER
    @PostMapping("/register")
    public ResponseEntity<Map<String, Boolean>> register(@RequestBody Donnateur donnateur) {
        Map<String, Boolean> response = new HashMap<>();

        if (repository.findByEmail(donnateur.getEmail()).isPresent()) {
            response.put("success", false);
            return ResponseEntity.ok(response);
        }

        repository.save(donnateur);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}

//Le serveur :
//vérifie si l’email existe déjà
//s’il existe → échec
//sinon → enregistre l’utilisateur dans la base