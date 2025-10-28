# final_music_ocr.py
import torch
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image
import torchvision.transforms as transforms
import numpy as np

class FinalCTCCompatibleCRNN(nn.Module):
    def __init__(self, num_classes=13):
        super(FinalCTCCompatibleCRNN, self).__init__()
        
        # Architecture EXACTE de votre entraînement
        self.cnn = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(),
            nn.Conv2d(32, 32, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 512→256
            
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 256→128
            
            nn.Conv2d(64, 128, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 128→64
            
            nn.Conv2d(128, 256, 3, padding=1), nn.ReLU(),
            # Pas de dernier MaxPool
        )
        
        self.lstm = nn.LSTM(
            256 * 64,  # 256 channels * 64 height
            128,
            1,
            bidirectional=True,
            batch_first=True
        )
        
        self.fc = nn.Linear(128 * 2, num_classes)
    
    def forward(self, x):
        # Normalisation identique à l'entraînement
        x = (x - 0.5) / 0.5
        
        # CNN
        x = self.cnn(x)
        batch, ch, h, w = x.size()
        
        # Reshape pour LSTM
        x = x.permute(0, 3, 2, 1).contiguous()
        x = x.view(batch, w, ch * h)
        
        # LSTM
        x, _ = self.lstm(x)
        
        # Fully Connected
        x = self.fc(x)
        
        # Format CTC: (seq_len, batch, num_classes)
        return x.permute(1, 0, 2)

class FinalMusicOCR:
    def __init__(self, model_path='music_ocr_model_corrected.pth'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"🖥️  Device: {self.device}")
        
        # Charger le checkpoint corrigé
        checkpoint = torch.load(model_path, map_location=self.device)
        
        # Vocabulaire compatible (13 symboles)
        self.vocab = checkpoint['vocab']
        self.char_to_idx = checkpoint['char_to_idx']
        self.idx_to_char = checkpoint['idx_to_char']
        
        print(f"📊 Vocabulaire chargé: {self.vocab}")
        print(f"📊 Taille: {len(self.vocab)} symboles")
        
        # Créer et charger le modèle
        self.model = FinalCTCCompatibleCRNN(num_classes=len(self.vocab))
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.model.to(self.device)
        self.model.eval()
        
        print("✅ Modèle OCR chargé avec succès!")
        
        # Transformations identiques à l'entraînement
        self.transform = transforms.Compose([
            transforms.Resize((512, 512)),
            transforms.ToTensor(),
            transforms.Normalize(0.5, 0.5)
        ])
    
    def preprocess_image(self, image_path):
        """Prétraitement de l'image pour le modèle"""
        image = Image.open(image_path).convert('RGB')
        return self.transform(image).unsqueeze(0)  # Add batch dimension
    
    def decode_predictions(self, predictions):
        """Décodage CTC des prédictions"""
        # Convertir en probabilités
        probabilities = F.softmax(predictions, dim=2)
        
        # Prendre les indices max
        _, max_indices = torch.max(probabilities, dim=2)
        sequence = max_indices.squeeze(1).cpu().numpy()
        
        print(f"🔍 Séquence brute ({len(sequence)} pas de temps):")
        print(f"   Indices: {sequence}")
        print(f"   Symboles: {[self.idx_to_char.get(i, '?') for i in sequence]}")
        
        # Décodage CTC simple
        decoded_chars = []
        previous_char = None
        
        for idx in sequence:
            char = self.idx_to_char.get(idx, '')
            # Supprimer les répétitions et le caractère blank
            if char != '-' and char != previous_char:
                decoded_chars.append(char)
            previous_char = char
        
        return decoded_chars
    
    def convert_to_music_notation(self, symbols):
        """Convertit les symboles en notation musicale"""
        notation_map = {
            'C': 'Do', 'D': 'Ré', 'E': 'Mi', 'F': 'Fa', 'G': 'Sol',
            'A': 'La', 'B': 'Si', 'c': 'Do↑', 'd': 'Ré↑', 'e': 'Mi↑',
            '|': '|',   # Barre de mesure
            ' ': ' ',   # Espace
            '-': ''     # Ignorer les silences
        }
        
        notes = []
        for symbol in symbols:
            if symbol in notation_map and notation_map[symbol]:
                notes.append(notation_map[symbol])
        
        return notes
    
    def process_sheet_music(self, image_path):
        """Traite une image de partition et retourne la notation musicale"""
        print(f"\n🎵 TRAITEMENT: {image_path}")
        print("=" * 50)
        
        try:
            # Étape 1: Prétraitement
            print("🖼️  Prétraitement de l'image...")
            image_tensor = self.preprocess_image(image_path).to(self.device)
            print(f"   Input shape: {image_tensor.shape}")
            
            # Étape 2: Inference
            print("🧠 Reconnaissance OCR...")
            with torch.no_grad():
                outputs = self.model(image_tensor)
                print(f"   Output shape: {outputs.shape}")
                print(f"   Séquence length: {outputs.shape[0]} pas de temps")
                
                # Décodage
                symbols = self.decode_predictions(outputs)
                notes = self.convert_to_music_notation(symbols)
            
            # Résultats
            print(f"\n✅ RÉSULTATS:")
            print(f"   Symboles détectés: {' '.join(symbols)}")
            print(f"   Notation musicale: {' '.join(notes)}")
            print(f"   Statistiques: {len(symbols)} symboles → {len(notes)} notes")
            
            return {
                'success': True,
                'symbols': symbols,
                'notes': notes,
                'symbols_count': len(symbols),
                'notes_count': len(notes),
                'sequence_length': outputs.shape[0]
            }
            
        except Exception as e:
            print(f"❌ ERREUR: {e}")
            import traceback
            traceback.print_exc()
            
            return {
                'success': False,
                'error': str(e)
            }

def test_complete_pipeline():
    """Test complet du pipeline OCR"""
    print("🧪 TEST COMPLET DU PIPELINE OCR")
    print("=" * 60)
    
    # Initialiser l'OCR
    ocr = FinalMusicOCR('music_ocr_model_corrected.pth')
    
    # Test avec données factices
    print("\n🔍 Test d'architecture...")
    dummy_input = torch.randn(1, 3, 512, 512).to(ocr.device)
    
    with torch.no_grad():
        output = ocr.model(dummy_input)
    
    print(f"📊 Input: {dummy_input.shape}")
    print(f"📊 Output: {output.shape}")
    print(f"✅ Format CTC valide: (seq_len={output.shape[0]}, batch={output.shape[1]}, classes={output.shape[2]})")
    
    return ocr

if __name__ == "__main__":
    # Test complet
    ocr = test_complete_pipeline()
    
    # Test avec une vraie image
    test_images = ["test_partition.jpeg"]
    
    for test_image in test_images:
        import os
        if os.path.exists(test_image):
            print(f"\n🎵 TEST AVEC IMAGE RÉELLE: {test_image}")
            result = ocr.process_sheet_music(test_image)
            
            if result['success']:
                print(f"\n🎉 SUCCÈS!")
                print(f"   Fichier: {test_image}")
                print(f"   Symboles: {' '.join(result['symbols'])}")
                print(f"   Notes: {' '.join(result['notes'])}")
                print(f"   Longueur séquence: {result['sequence_length']} pas de temps")
                break
    else:
        print(f"\n📝 Aucune image de test trouvée.")
        print("🎯 Le modèle est prêt! Créez une image de test ou utilisez-le dans Django.")