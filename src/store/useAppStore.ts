import { create } from "zustand";
import { type PulseData, initializePulse, advancePulse as engineAdvancePulse } from "../engine/pulseEngine";
import { type RiskType } from "../types";

interface AppState {
    salary: number | null;
    risk: RiskType | null;
    pulse: PulseData;
    streakActive: boolean;

    setSalary: (val: number) => void;
    setRisk: (val: RiskType) => void;
    advancePulse: (amount: number) => void;
    resetPulse: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    salary: null,
    risk: null,
    pulse: initializePulse(),
    streakActive: true,

    setSalary: (val) => set({ salary: val }),

    setRisk: (val) => set({ risk: val }),

    advancePulse: (amount) => {
        const current = get().pulse;
        const updated = engineAdvancePulse(current, amount);
        set({ pulse: updated });
    },

    resetPulse: () => set({ pulse: initializePulse() }),
}));
