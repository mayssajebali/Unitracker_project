package com.dsi.projet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.dsi.projet.entities.Completion;
import com.dsi.projet.entities.CompletionId;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Tache;
import com.dsi.projet.repositories.CompletionRepository;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.TacheRepository;
import com.dsi.projet.services.CompletionService;
import com.dsi.projet.services.TacheServiceImpl;

@SpringBootTest
public class CompletionTest {
	    @Mock
	    private CompletionRepository comRep;

	    @Mock
	    private TacheRepository tacheRepo;
	    @Mock
	    private EtudiantRepository etudiantRepo;
	    

	    @InjectMocks
	    private CompletionService compserv; 
	    
	    @InjectMocks
	    private TacheServiceImpl tacheserv; 

	    @BeforeEach
	    public void setUp() {
	        MockitoAnnotations.openMocks(this);
	    }

	    @Test
	    public void testMarkSubTaskAsIncomplete() {
	        // Arrange - Initialisation des données de test

	        int tacheId = 1;          // ID de la sous-tâche
	        int etudiantId = 123;     // ID de l'étudiant
	        boolean isCompleted = false; // Marqueur indiquant si la sous-tâche est terminée ou non

	        // Création de l'identifiant composite `CompletionId` pour la sous-tâche de cet étudiant
	        CompletionId idCompletion = new CompletionId(tacheId, etudiantId);

	        // Création de l'objet Completion représentant la réalisation de la sous-tâche pour l'étudiant
	        Completion completion = new Completion();
	        completion.setMarquer(true);        // Indique que la sous-tâche est actuellement marquée comme terminée
	        completion.setProgression(1);       // Progression actuelle de la sous-tâche
	        when(comRep.findById(idCompletion)).thenReturn(Optional.of(completion)); // Mock du retour de `comRep.findById`

	        // Création de l'objet `Tache` représentant la sous-tâche
	        Tache subTask = new Tache();
	        subTask.setId_Tache(tacheId);

	        // Création de l'objet `Tache` représentant la tâche principale
	        Tache motherTask = new Tache();
	        motherTask.setId_Tache(2);                     // ID de la tâche principale
	        motherTask.setSousTaches(List.of(subTask));    // Ajout de la sous-tâche à la liste de ses sous-tâches

	        // Définition de `motherTask` comme tâche principale de `subTask`
	        subTask.setTachePrincipale(motherTask);

	        // Simulation du retour de `tacheRepo.findById` pour les tâches
	        when(tacheRepo.findById(tacheId)).thenReturn(Optional.of(subTask));
	        when(tacheRepo.findById(2)).thenReturn(Optional.of(motherTask));

	        // Création de l'identifiant composite pour la `Completion` de la tâche principale
	        CompletionId motherTaskCompletionId = new CompletionId(2, etudiantId);

	        // Création de l'objet `Completion` représentant la réalisation de la tâche principale
	        Completion motherTaskCompletion = new Completion();
	        motherTaskCompletion.setTotalSoustTaches(1);  // Total des sous-tâches (1 seule sous-tâche)
	        motherTaskCompletion.setProgression(1);       // Progression initiale (marquée comme terminée)
	        motherTaskCompletion.setMarquer(true);        // Marqueur indiquant que la tâche principale est terminée
	        when(comRep.findById(motherTaskCompletionId)).thenReturn(Optional.of(motherTaskCompletion));

	        // Act - Appel de la méthode `markSubTaskAsCompleted` pour marquer la sous-tâche comme incomplète
	        Completion result = compserv.markSubTaskAsCompleted(tacheId, etudiantId, isCompleted);

	        // Assert - Vérification des changements dans la progression de la tâche principale
	        // Vérifie que la progression de la tâche principale est mise à jour
	        assertEquals(0, motherTaskCompletion.getProgression());
	        
	        // Vérifie que la tâche principale n'est plus marquée comme terminée
	        assertFalse(motherTaskCompletion.isMarquer());
	        
	        // Vérifie que la méthode `save` est bien appelée pour sauvegarder l'état de la tâche principale
	        verify(comRep).save(motherTaskCompletion);
	    }

	    
	    @Test
	    void testAddSubTask() {
	        // Arrange - Initialisation des données de test
	        
	        int idEtudiant = 1;    // ID de l'étudiant qui va être associé à la sous-tâche
	        int idTacheP = 10;     // ID de la tâche principale

	        // Création d'une tâche `subTask` représentant la sous-tâche
	        Tache subTask = new Tache();
	        subTask.setId_Tache(20); // ID arbitraire pour la sous-tâche

	        // Création de la tâche principale `parentTask`
	        Tache parentTask = new Tache();
	        parentTask.setId_Tache(idTacheP); // ID de la tâche principale

	        // Création d'un étudiant fictif
	        Etudiant etudiant = new Etudiant();
	        etudiant.setId_Etudiant(idEtudiant); // Affectation de l'ID de l'étudiant
	        
	        // Ajout de l'étudiant à une liste d'étudiants fictifs
	        List<Etudiant> etudiants = new ArrayList<>();
	        etudiants.add(etudiant);

	        // Création d'un objet `Completion` représentant la réalisation de la tâche principale
	        Completion completion = new Completion();
	        completion.setTotalSoustTaches(2); // Supposons qu'il y ait déjà 2 sous-tâches existantes

	        // Définition du comportement des repositories pour retourner les objets mockés
	        when(etudiantRepo.findAll()).thenReturn(etudiants); // Retourne la liste des étudiants
	        when(tacheRepo.findById(idTacheP)).thenReturn(Optional.of(parentTask)); // Retourne la tâche principale
	        when(comRep.findById(new CompletionId(idTacheP, idEtudiant))).thenReturn(Optional.of(completion)); 
	        // Retourne la réalisation de la tâche principale
	        when(tacheRepo.save(subTask)).thenReturn(subTask); // Sauvegarde de la sous-tâche

	        // Act - Appel de la méthode `addSubTask` pour tester l'ajout d'une sous-tâche
	        Tache result = tacheserv.addSubTask(subTask, idEtudiant, idTacheP);

	        // Assert - Vérification des résultats du test

	        // Vérifie qu'une tâche principale est retournée
	        assertNotNull(result); 
	        
	        // Vérifie que la tâche principale retournée est bien celle attendue
	        assertEquals(parentTask, result);
	        
	        // Vérifie que la sous-tâche est bien associée à l'étudiant
	        assertTrue(subTask.getEtudiants().contains(etudiant));

	        // Vérifie que la tâche principale a bien été définie pour la sous-tâche
	        assertEquals(parentTask.getId_Tache(), subTask.getTachePrincipaleId());

	        // Vérifie que le compteur `totalSoustTaches` a bien été incrémenté de 1
	        assertEquals(3, completion.getTotalSoustTaches());

	        // Vérifie les interactions avec les repositories
	        verify(comRep).save(completion); // Vérifie que `Completion` a bien été sauvegardé
	        verify(tacheRepo).save(subTask); // Vérifie que la nouvelle sous-tâche a bien été sauvegardée
	    }

	
}
