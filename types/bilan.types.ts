export interface BilanCirconstanciel {
  dateHeure: Date;
  address: string;
  nombreVictimes: number;
  mecanismeAccident: string;
  contexte: "medical" | "traumatique" | "mixte" | "";
  dangerPersistants: boolean;
  dangerPersistantsDetails: string;
  antecedents: string;
}

export interface BilanPrimaire {
  conscience: "conscient" | "inconscient" | "";
  scoreGlasgow: number | null;

  ventillation: "normal" | "anormal" | "absente" | "";
  frequenceRespiratoire: number | null;

  pouls: "present" | "absent" | "";
  frequenceCardiaque: number | null;
  tension: string;

  hemorragie: boolean;
  hemorragieDetails: string;

  actionRealisees: string[];
}

export interface BilanSecondaireABCDE {
  A: {
    permeabilite: "libre" | "obstruee" | "maintenue" | "";
    corpsEtranger: boolean;
    details: string;
  };

  B: {
    frequence: number | null;
    saturation: number | null;
    rythme: "regulier" | "irregulier" | "";
    murmures: "present" | "diminues" | "absent" | "";
    detresse: boolean;
    details: string;
  };

  C: {
    frequenceCardiaque: number | null;
    tension: string;
    poulsPeripherique: "present" | "absent" | "faible" | "";
    trc: "normal" | "allonge" | ""; // Temps de recoloration cutanée
    teintPeau: "normal" | "pale" | "rouge" | "cyanique" | "";
    details: string;
  };

  D: {
    conscience: "alerte" | "voix" | "douleur" | "inconscient" | ""; // AVPU
    glasgow: number | null;
    pupilles: "isocores" | "anisocores" | "myosis" | "mydriase" | "";
    deficit_moteur: boolean;
    glycemie: number | null;
    details: string;
  };

  E: {
    temperature: number | null;
    lesionsVisibles: string;
    douleur: number | null; // EVA 0-10
    contexteEnvironnement: string;
    details: string;
  };
}

export interface BilanComplet {
  id: string;
  circonstanciel: BilanCirconstanciel;
  primaire: BilanPrimaire;
  secondaire: BilanSecondaireABCDE;
  statut: "en cours" | "complet";
}

export interface BilanStore {
  bilan: BilanComplet;
  sessionId: string;
  isSessionValid: boolean;
  updateCirconstanciel: (data: Partial<BilanCirconstanciel>) => void;
  updatePrimaire: (data: Partial<BilanPrimaire>) => void;
  updateSecondaire: (data: Partial<BilanSecondaireABCDE>) => void;
  resetBilan: () => void;
  clearSession: () => Promise<void>;
  validateSession: () => Promise<boolean>
}



