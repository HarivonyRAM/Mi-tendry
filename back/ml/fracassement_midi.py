import mido
from mido import MidiFile, MidiTrack, Message
import os

class ModificateurMIDI:
    def __init__(self):
        self.notes_midi = {
            # Notes avec leurs valeurs MIDI
            'C4': 60, 'C#4': 61, 'D4': 62, 'D#4': 63, 'E4': 64, 'F4': 65,
            'F#4': 66, 'G4': 67, 'G#4': 68, 'A4': 69, 'A#4': 70, 'B4': 71,
            'C5': 72, 'C#5': 73, 'D5': 74, 'D#5': 75, 'E5': 76, 'F5': 77,
            'F#5': 78, 'G5': 79, 'G#5': 80, 'A5': 81, 'A#5': 82, 'B5': 83
        }
    
    def supprimer_notes_specifiques(self, fichier_entree, fichier_sortie, notes_a_supprimer):
        """Supprime complètement les notes spécifiées"""
        print(f"Chargement du fichier: {fichier_entree}")
        
        try:
            mid = MidiFile(fichier_entree)
            nouveau_mid = MidiFile(ticks_per_beat=mid.ticks_per_beat)
            
            notes_supprimees = 0
            total_notes = 0
            
            for i, track in enumerate(mid.tracks):
                print(f"Traitement de la piste {i + 1}...")
                nouveau_track = MidiTrack()
                nouveau_mid.tracks.append(nouveau_track)
                
                for msg in track:
                    if msg.type in ['note_on', 'note_off']:
                        total_notes += 1
                        if msg.note in notes_a_supprimer:
                            notes_supprimees += 1
                            continue  # Supprime la note
                    nouveau_track.append(msg)
            
            # Créer le dossier de sortie s'il n'existe pas
            os.makedirs(os.path.dirname(fichier_sortie), exist_ok=True)
            nouveau_mid.save(fichier_sortie)
            print(f"✓ Fichier sauvegardé: {fichier_sortie}")
            print(f"✓ Notes supprimées: {notes_supprimees} sur {total_notes} notes totales")
            
        except Exception as e:
            print(f"❌ Erreur: {e}")
    
    def analyser_fichier_midi(self, fichier_path):
        """Analyse le fichier MIDI pour afficher les notes utilisées"""
        print(f"\n=== ANALYSE DU FICHIER {fichier_path} ===")
        
        try:
            mid = MidiFile(fichier_path)
            notes_trouvees = set()
            total_notes = 0
            
            for i, track in enumerate(mid.tracks):
                print(f"Piste {i + 1}: {len(track)} messages")
                for msg in track:
                    if msg.type in ['note_on', 'note_off'] and hasattr(msg, 'note'):
                        notes_trouvees.add(msg.note)
                        total_notes += 1
            
            # Convertir en liste triée
            notes_trouvees = sorted(notes_trouvees)
            print(f"Notes trouvées dans le fichier: {notes_trouvees}")
            print(f"Total des notes: {total_notes}")
            
            # Afficher les noms des notes si possible
            print("\nCorrespondance des notes:")
            noms_notes_inverse = {v: k for k, v in self.notes_midi.items()}
            for note in notes_trouvees:
                nom_note = noms_notes_inverse.get(note, f"Inconnu({note})")
                print(f"  {note} = {nom_note}")
            
            return notes_trouvees
                
        except Exception as e:
            print(f"❌ Erreur lors de l'analyse: {e}")
            return []

def main():
    modificateur = ModificateurMIDI()
    
    print("=== MODIFICATEUR DE FICHIERS MIDI ===")
    print("Fichier cible: asset/amazing-grace.mid")
    
    # Vérifier si le fichier existe
    fichier_entree = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/asset/Hymne à la joie.mid"
    if not os.path.exists(fichier_entree):
        print(f"❌ Fichier non trouvé: {fichier_entree}")
        print("Assurez-vous que le fichier existe dans le dossier 'asset/'")
        return
    
    # Analyser le fichier MIDI d'abord
    notes_presentes = modificateur.analyser_fichier_midi(fichier_entree)
    
    # Définir les notes à supprimer (Mi, Fa#, Sol#)
    notes_a_supprimer = [64, 66, 68]  # E4, F#4, G#4
    
    print(f"\n=== SUPPRESSION AUTOMATIQUE DES NOTES ===")
    print("Notes à supprimer:")
    noms_notes = {64: "Mi (E4)", 66: "Fa# (F#4)", 68: "Sol# (G#4)"}
    for note in notes_a_supprimer:
        print(f"  - {noms_notes.get(note, note)}")
    
    # Vérifier quelles notes sont effectivement présentes dans le fichier
    notes_a_supprimer_presentes = [note for note in notes_a_supprimer if note in notes_presentes]
    notes_absentes = [note for note in notes_a_supprimer if note not in notes_presentes]
    
    if notes_absentes:
        print(f"\nNotes non trouvées dans le fichier (elles seront ignorées):")
        for note in notes_absentes:
            print(f"  - {noms_notes.get(note, note)}")
    
    if not notes_a_supprimer_presentes:
        print("\n❌ Aucune des notes à supprimer n'est présente dans le fichier.")
        return
    
    # Fichier de sortie
    fichier_sortie = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/asset_modified/Hymne_a_la_joie_sans-mi-fa#-sol#.mid"
    
    # Confirmation
    print(f"\nConfirmer la suppression de {len(notes_a_supprimer_presentes)} note(s)?")
    confirmation = input("(o/n): ").strip().lower()
    
    if confirmation != 'o':
        print("Opération annulée.")
        return
    
    # Application de la suppression
    modificateur.supprimer_notes_specifiques(fichier_entree, fichier_sortie, notes_a_supprimer)
    
    print("\n=== MODIFICATION TERMINÉE ===")
    print(f"Fichier original: {fichier_entree}")
    print(f"Fichier modifié: {fichier_sortie}")
    print("\nNotes supprimées: Mi (E4), Fa# (F#4), Sol# (G#4)")

if __name__ == "__main__":
    main()


