package com.code.croissant.controllers;

import com.code.croissant.model.Donnateur;
import com.code.croissant.model.Don;
import com.code.croissant.model.Element;
import com.code.croissant.repositories.DonRepository;
import com.code.croissant.repositories.DonnateurRepository;
import com.code.croissant.repositories.ElementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Controller pour gérer les opérations liées aux Donnateurs et leurs Dons.
 * Toutes les routes sont préfixées par /api/donnateurs/{donateurId}.
 */
@CrossOrigin(origins = "http://localhost:4200") // Autoriser les requêtes depuis Angular (front-end)
@RestController
@RequestMapping("/api/donnateurs/{donateurId}")
public class DonnateurController {

    // Injection automatique des repositories pour accéder à la base de données
    @Autowired
    private DonnateurRepository donnateurRepository;

    @Autowired
    private DonRepository donRepository;

    @Autowired
    private ElementRepository elementRepository;


    /**
     * Récupère tous les éléments possibles pour faire un don.
     * GET /api/donnateurs/{donateurId}
     */
    @GetMapping("")
    public List<Element> getElement() {
        return elementRepository.findAll(); // Renvoie la liste de tous les éléments disponibles
    }

    /**
     * Récupère tous les dons d’un donateur spécifique.
     * GET /api/donnateurs/{donateurId}/dons
     *
     * @param donateurId ID du donateur
     * @return liste des dons
     */
    @GetMapping("/dons")
    public List<Don> getDonsByDonateur(@PathVariable Long donateurId) {
        return donRepository.findByDonateur_Id(donateurId);
    }

    /**
     * Supprime un don spécifique.
     * DELETE /api/donnateurs/{donateurId}/dons/{donId}
     *
     * @param donId ID du don à supprimer
     */
    @DeleteMapping("/dons/{donId}")
    public void deleteDon(@PathVariable Long donId) {
        donRepository.deleteById(donId); // Supprime le don de la base
    }

    /**
     * Crée un nouveau don pour un élément donné par un donateur spécifique.
     * POST /api/donnateurs/{donateurId}/dons?elementId=...
     *
     * @param donateurId ID du donateur
     * @param elementId  ID de l’élément à donner
     * @param donRequest Objet Don envoyé depuis le front-end (JSON)
     * @return le don sauvegardé
     */
    @PostMapping("/dons")
    public Don createDon(
            @PathVariable Long donateurId,
            @RequestParam Long elementId,
            @RequestBody Don donRequest) {

        // Vérifier que le donateur existe, sinon lancer une exception
        Donnateur donnateur = donnateurRepository.findById(donateurId)
                .orElseThrow(() -> new RuntimeException("Donnateur non trouvé avec ID : " + donateurId));

        // Vérifier que l’élément existe, sinon lancer une exception
        Element element = elementRepository.findById(elementId)
                .orElseThrow(() -> new RuntimeException("Élément non trouvé avec ID : " + elementId));

        // Lier le don au donateur et à l’élément
        donRequest.setDonateur(donnateur);
        donRequest.setElement(element);

        // Ajouter automatiquement la date du don
        donRequest.setDateDon(LocalDate.now());

        // Sauvegarder le don dans la base de données et le retourner
        return donRepository.save(donRequest);
    }


    // GET d’un don par id
@GetMapping("/dons/{donId}")
public Don getDonById(@PathVariable Long donateurId, @PathVariable Long donId) {
    return donRepository.findById(donId)
            .orElseThrow(() -> new RuntimeException("Don non trouvé avec ID : " + donId));
}

// UPDATE d’un don
@PutMapping("/dons/{donId}")
public Don updateDon(
        @PathVariable Long donateurId,
        @PathVariable Long donId,
        @RequestBody Don donRequest) {

    Don existing = donRepository.findById(donId)
            .orElseThrow(() -> new RuntimeException("Don non trouvé avec ID : " + donId));

    existing.setTypeDon(donRequest.getTypeDon());
    existing.setMontant(donRequest.getMontant());
    existing.setDescription(donRequest.getDescription());

    return donRepository.save(existing);
}

}
