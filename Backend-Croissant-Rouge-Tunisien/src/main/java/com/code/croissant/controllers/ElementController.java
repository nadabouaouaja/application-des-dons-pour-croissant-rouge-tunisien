// src/main/java/com/code/croissant/controllers/ElementController.java
package com.code.croissant.controllers;

import com.code.croissant.model.Element;
import com.code.croissant.repositories.ElementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/elements")
public class ElementController {

    @Autowired
    private ElementRepository repo;

    // GET : tous les éléments
    @GetMapping("")
    public List<Element> getAll() {
        return repo.findAll();
    }

    // POST : ajouter
    @PostMapping("")
    public Element add(@RequestBody Element el) {

        // on force type à null si rien n'est envoyé
        if (el.getType() == null || el.getType().isBlank()) {
            el.setType(null);
        }

        el.setCreated_at(LocalDateTime.now().toString());
        el.setUpdated_at(LocalDateTime.now().toString());
        return repo.save(el);
    }

    // PUT : modifier
    @PutMapping("/{id}")
    public Element update(@PathVariable Long id, @RequestBody Element el) {

        Element existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Élément introuvable : " + id));

        existing.setLabel(el.getLabel());
        existing.setDescription(el.getDescription());
        existing.setImage(el.getImage());

        if (el.getType() == null || el.getType().isBlank()) {
            existing.setType(null);
        } else {
            existing.setType(el.getType());
        }

        existing.setUpdated_at(LocalDateTime.now().toString());
        return repo.save(existing);
    }

    // DELETE : supprimer
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
