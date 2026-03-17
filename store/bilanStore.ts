import {
  BilanCirconstanciel,
  BilanComplet,
  BilanPrimaire,
  BilanSecondaireABCDE, BilanStore,
} from "../types/bilan.types";
import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState, AppStateStatus} from "react-native";

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

export const useBilanStore = create<BilanStore>()(
    persist(
        (set, get) => ({
          bilan: createInitialBilan(),
          sessionId: generateSessionId(),
          isSessionValid: true,

          updateCirconstanciel: (data) =>
              set((state) => ({
                bilan: {
                  ...state.bilan,
                  circonstanciel: { ...state.bilan.circonstanciel, ...data },
                },
              })),

          updatePrimaire: (data) =>
              set((state) => ({
                bilan: {
                  ...state.bilan,
                  primaire: { ...state.bilan.primaire, ...data },
                },
              })),

          updateSecondaire: (data) =>
              set((state) => ({
                bilan: {
                  ...state.bilan,
                  secondaire: { ...state.bilan.secondaire, ...data },
                },
              })),

          resetBilan: () =>
              set({
                bilan: createInitialBilan(),
                sessionId: generateSessionId(),
              }),

          // ── Purge complète de l'AsyncStorage ──
          clearSession: async () => {
            try {
              await AsyncStorage.multiRemove([SESSION_KEY, SESSION_ID_KEY]);
              set({
                bilan: createInitialBilan(),
                sessionId: generateSessionId(),
                isSessionValid: false,
              });
            } catch (error) {
              console.error('Erreur clearSession:', error);
            }
          },

          // ── Vérifie si la session est encore valide ──
          validateSession: async () => {
            try {
              const storedId = await AsyncStorage.getItem(SESSION_ID_KEY);
              const currentId = get().sessionId;
              const isValid = storedId === currentId;

              if (!isValid) {
                // Session expirée ou nouvelle instance → reset
                set({
                  bilan: createInitialBilan(),
                  sessionId: generateSessionId(),
                  isSessionValid: false,
                });
                await AsyncStorage.multiRemove([SESSION_KEY, SESSION_ID_KEY]);
              }

              return isValid;
            } catch {
              return false;
            }
          },
        }),
        {
          name: SESSION_KEY,
          storage: createJSONStorage(() => AsyncStorage),
          // On ne persiste que le strict nécessaire
          partialize: (state) => ({
            bilan: state.bilan,
            sessionId: state.sessionId,
          }),
        }
    )
);