export type PulseState = "idle" | "staging" | "strike";

export interface PulseData {
    month: number;
    totalStaged: number;
    state: PulseState;
}

export function initializePulse(): PulseData {
    return {
        month: 1,
        totalStaged: 0,
        state: "staging",
    };
}

export function advancePulse(
    current: PulseData,
    monthlyStageAmount: number
): PulseData {
    if (current.state === "strike") {
        return initializePulse();
    }

    const newMonth = current.month + 1;
    const newTotal = current.totalStaged + monthlyStageAmount;

    if (newMonth > 3) {
        return {
            month: 3,
            totalStaged: newTotal,
            state: "strike",
        };
    }

    return {
        month: newMonth,
        totalStaged: newTotal,
        state: "staging",
    };
}
