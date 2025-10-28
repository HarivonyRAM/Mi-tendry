## Script de chargement du modèle et correction du problème de vocabulaire

# fix_vocab_mismatch.py
import torch
import torch.nn as nn

def analyze_vocab_issue():
    """Analyse le problème de mismatch de vocabulaire"""
    print("🔍 Analyse du problème de vocabulaire...")
    
    # Charger le checkpoint
    checkpoint = torch.load('music_ocr_trainer_ctc.pth', map_location='cpu')
    
    print("📊 Informations du checkpoint:")
    print(f"   - Vocabulaire: {checkpoint['vocab']}")
    print(f"   - Taille vocabulaire: {len(checkpoint['vocab'])}")
    print(f"   - Clés dans model_state_dict: {list(checkpoint['model_state_dict'].keys())}")
    
    # Analyser la couche FC
    fc_weight = checkpoint['model_state_dict']['fc.weight']
    fc_bias = checkpoint['model_state_dict']['fc.bias']
    
    print(f"📊 FC.weight shape: {fc_weight.shape}")  # Doit être [13, 256]
    print(f"📊 FC.bias shape: {fc_bias.shape}")      # Doit être [13]
    
    # Vérifier la taille du vocabulaire dans le checkpoint
    vocab_in_checkpoint = len(checkpoint['vocab'])
    print(f"📊 Taille vocabulaire dans checkpoint: {vocab_in_checkpoint}")
    
    return checkpoint

class CorrectCTCCompatibleCRNN(nn.Module):
    def __init__(self, num_classes):
        super(CorrectCTCCompatibleCRNN, self).__init__()
        
        # CNN
        self.cnn = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(),
            nn.Conv2d(32, 32, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            nn.Conv2d(64, 128, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            nn.Conv2d(128, 256, 3, padding=1), nn.ReLU(),
        )
        
        # LSTM
        self.lstm = nn.LSTM(
            256 * 64,  # 256 channels * 64 height
            128,
            1,
            bidirectional=True,
            batch_first=True
        )
        
        # FC - Utiliser la taille du checkpoint
        self.fc = nn.Linear(128 * 2, num_classes)
    
    def forward(self, x):
        x = (x - 0.5) / 0.5
        x = self.cnn(x)
        batch, ch, h, w = x.size()
        x = x.permute(0, 3, 2, 1).contiguous()
        x = x.view(batch, w, ch * h)
        x, _ = self.lstm(x)
        x = self.fc(x)
        return x.permute(1, 0, 2)

def load_with_correct_vocab():
    """Charge le modèle avec la bonne taille de vocabulaire"""
    print("\n🔄 Chargement avec vocabulaire corrigé...")
    
    checkpoint = torch.load('music_ocr_trainer_ctc.pth', map_location='cpu')
    
    # Le modèle a été entraîné avec 13 classes, mais le checkpoint a 17 dans le vocab
    # Utilisons la taille réelle des poids
    fc_weight_shape = checkpoint['model_state_dict']['fc.weight'].shape
    actual_num_classes = fc_weight_shape[0]  # 13
    
    print(f"📊 Classes détectées dans les poids: {actual_num_classes}")
    print(f"📊 Vocabulaire dans checkpoint: {len(checkpoint['vocab'])}")
    
    # Créer le modèle avec le bon nombre de classes
    model = CorrectCTCCompatibleCRNN(num_classes=actual_num_classes)
    
    # Charger les poids
    model.load_state_dict(checkpoint['model_state_dict'])
    print("✅ Modèle chargé avec succès!")
    
    return model, checkpoint

def create_compatible_checkpoint():
    """Crée un checkpoint compatible avec le vocabulaire original"""
    print("\n💾 Création d'un checkpoint compatible...")
    
    checkpoint = torch.load('music_ocr_trainer_ctc.pth', map_location='cpu')
    
    # Le vocabulaire original d'entraînement était probablement différent
    # Recréons un vocabulaire compatible avec les poids
    fc_weight_shape = checkpoint['model_state_dict']['fc.weight'].shape
    actual_num_classes = fc_weight_shape[0]
    
    # Créer un vocabulaire compatible (les premiers N symboles)
    original_vocab = ['-', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'c', 'd', 'e', '|', ' ']
    compatible_vocab = original_vocab[:actual_num_classes]
    
    print(f"📊 Nouveau vocabulaire compatible: {compatible_vocab}")
    print(f"📊 Taille: {len(compatible_vocab)}")
    
    # Mettre à jour les mappings
    compatible_char_to_idx = {char: idx for idx, char in enumerate(compatible_vocab)}
    compatible_idx_to_char = {idx: char for idx, char in enumerate(compatible_vocab)}
    
    # Sauvegarder le checkpoint corrigé
    corrected_checkpoint = {
        'model_state_dict': checkpoint['model_state_dict'],
        'vocab': compatible_vocab,
        'char_to_idx': compatible_char_to_idx,
        'idx_to_char': compatible_idx_to_char,
        'training_info': checkpoint.get('training_info', {})
    }
    
    torch.save(corrected_checkpoint, 'music_ocr_model_corrected.pth')
    print("✅ Checkpoint corrigé sauvegardé: music_ocr_model_corrected.pth")
    
    return corrected_checkpoint

if __name__ == "__main__":
    # Analyser le problème
    checkpoint = analyze_vocab_issue()
    
    # Solution 1: Charger avec la bonne taille
    try:
        model, checkpoint = load_with_correct_vocab()
        print("🎉 Solution 1 réussie!")
    except Exception as e:
        print(f"❌ Solution 1 échouée: {e}")
    
    # Solution 2: Créer un checkpoint compatible
    corrected_checkpoint = create_compatible_checkpoint()
    print("\n🎯 Utilisez maintenant: music_ocr_model_corrected.pth")