package com.code.croissant.controllers;

import com.code.croissant.model.Don;
import com.code.croissant.model.Donnateur;
import com.code.croissant.model.Element;
import com.code.croissant.repositories.DonRepository;
import com.code.croissant.repositories.DonnateurRepository;
import com.code.croissant.repositories.ElementRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dons")
@CrossOrigin("*")
public class DonController {

    @Autowired
    private DonRepository donRepository;

    @Autowired
    private DonnateurRepository donnateurRepository;

    @Autowired
    private ElementRepository elementRepository;

    @PostMapping("/{donnateurId}/{elementId}")
   public ResponseEntity<?> createDon(
        @PathVariable Long donnateurId,
        @PathVariable Long elementId,
        @RequestBody Don donRequest) {

    // Vérifier existence du donateur
    Donnateur d = donnateurRepository.findById(donnateurId).orElse(null);
    if (d == null) {
        return ResponseEntity.badRequest().body("❌ Donateur introuvable");
    }

    // Vérifier existence de l'élément
    Element e = elementRepository.findById(elementId).orElse(null);
    if (e == null) {
        return ResponseEntity.badRequest().body("❌ Élément introuvable");
    }

    // Créer le don
    Don don = new Don();
    don.setElement(e);
    don.setDescription(donRequest.getDescription());
    don.setMontant(donRequest.getMontant());
    don.setTypeDon(donRequest.getTypeDon());
    don.setDateDon(LocalDate.now());

    // Sauvegarde
    donRepository.save(don);

    return ResponseEntity.ok("✅ Don ajouté avec succès");
}


}