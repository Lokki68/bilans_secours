import {
  BilanCirconstanciel,
  BilanComplet,
  BilanPrimaire,
  BilanSecondaireABCDE,
} from "../types/bilan.types";

const SESSION_KEY = "bilan_session";
const SESSION_ID_KEY = "bilan_session_id";

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const initialCirconstanciel: BilanCirconstanciel = {
  dateHeure: new Date(),
  address: "",
  nombreVictimes: 1,
  mecanismeAccident: "",
  contexte: "",
  dangerPersistants: false,
  dangerPersistantsDetails: "",
  antecedents: "",
};

export const initialPrimaire: BilanPrimaire = {
  conscience: "",
  scoreGlasgow: null,
  ventillation: "",
  frequenceRespiratoire: null,
  pouls: "",
  frequenceCardiaque: null,
  tension: "",
  hemorragie: false,
  hemorragieDetails: "",
  actionRealisees: [],
};

export const initialSecondaire: BilanSecondaireABCDE = {
  A: { permeabilite: "", corpsEtranger: false, details: "" },
  B: {
    frequence: null,
    saturation: null,
    rythme: "",
    murmures: "",
    detresse: false,
    details: "",
  },
  C: {
    frequenceCardiaque: null,
    tension: "",
    poulsPeripherique: "",
    trc: "",
    teintPeau: "",
    details: "",
  },
  D: {
    conscience: "",
    glasgow: null,
    pupilles: "",
    deficit_moteur: false,
    glycemie: null,
    details: "",
  },
  E: {
    temperature: null,
    lesionsVisibles: "",
    douleur: null,
    contexteEnvironnement: "",
    details: "",
  },
};

const createInitialBilan = (): BilanComplet => ({
  id: Date.now().toString(),
  circonstanciel: { ...initialCirconstanciel, dateHeure: new Date() },
  primaire: { ...initialPrimaire },
  secondaire: { ...initialSecondaire },
  statut: "en cours",
});
