package com.code.croissant.controllers;

import com.code.croissant.model.Don;
import com.code.croissant.repositories.DonRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private DonRepository donRepository;

    @GetMapping("/dons")
public List<Don> getAllDons() {
    return donRepository.findAll();
}
}
//Cette classe permet à l’administrateur de :
//✅ Récupérer toute la liste des dons
//✅ Depuis l’URL :
//http://localhost:8080/api/admin/dons
//✅ Pour les afficher côté Angular