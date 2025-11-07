import os
from mido import MidiFile, MidiTrack, Message, MetaMessage

# === CONFIGURATION ===
INPUT_DIR = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/ml/asset"
OUTPUT_DIR = os.path.join(INPUT_DIR, "_jazzified")
SWING_RATIO = 1.2      # swing : >1 = plus de swing
TEMPO_FACTOR = 1.15    # ralentir un peu le tempo
VELOCITY_HUMANIZE = 0.3  # +/- 30% de variation de vélocité

# Instrument Piano Jazz (Acoustic Grand Piano)
PIANO_JAZZ_PROGRAM = 0  # Program 0 = Acoustic Grand Piano (General MIDI)

# Créer le dossier de sortie
os.makedirs(OUTPUT_DIR, exist_ok=True)

def jazzify_midi(file_path, output_path):
    mid = MidiFile(file_path)
    new_mid = MidiFile(type=1)

    for i, track in enumerate(mid.tracks):
        new_track = MidiTrack()
        new_mid.tracks.append(new_track)

        for msg in track:
            if msg.type == 'program_change':
                # force le piano acoustique
                msg = msg.copy(program=PIANO_JAZZ_PROGRAM)
                new_track.append(msg)

            elif msg.type in ['note_on', 'note_off']:
                # swing léger : retarde les notes sur les temps pairs
                time = msg.time
                if time > 0 and (time % 480) > 240:
                    time = int(time * SWING_RATIO)

                # humaniser la vélocité (attaque)
                if msg.type == 'note_on' and msg.velocity > 0:
                    import random
                    change = 1 + random.uniform(-VELOCITY_HUMANIZE, VELOCITY_HUMANIZE)
                    msg = msg.copy(velocity=max(1, min(127, int(msg.velocity * change))))

                msg = msg.copy(time=time)
                new_track.append(msg)

            elif msg.type == 'set_tempo':
                # détendre le tempo pour un feeling jazz
                new_tempo = int(msg.tempo * TEMPO_FACTOR)
                new_track.append(MetaMessage('set_tempo', tempo=new_tempo))
            else:
                new_track.append(msg)

    new_mid.save(output_path)

# === TRAITEMENT GLOBAL ===
count = 0
for root, _, files in os.walk(INPUT_DIR):
    for f in files:
        if f.lower().endswith(".mid") or f.lower().endswith(".midi"):
            input_path = os.path.join(root, f)
            output_path = os.path.join(OUTPUT_DIR, f)
            print(f"🎹 Jazzification de : {f}")
            try:
                jazzify_midi(input_path, output_path)
                print(f"✅ Sauvegardé : {output_path}")
                count += 1
            except Exception as e:
                print(f" Erreur sur {f} : {e}")

print(f"\n✨ Terminé ! {count} fichiers jazzifiés dans : {OUTPUT_DIR}")
