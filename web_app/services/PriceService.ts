import { useState, useEffect } from 'react';

const INITIAL_PRICES = {
    'Reliance Green Energy': { price: 6720.0, change: 18.0 },
    'Solana Green Lending': { price: 4650.0, change: 3.2 },
    'Cardano ESG Pool': { price: 3200.0, change: 1.5 },
    'SBI Magnum ESG': { price: 2100.0, change: -0.8 },
    'Digital Gold': { price: 320.0, change: 0.9 },
};

export function usePriceStream() {
    const [prices, setPrices] = useState(INITIAL_PRICES);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices((prev) => {
                const next = { ...prev };
                Object.keys(next).forEach((key) => {
                    const change = (Math.random() - 0.5) * 3;
                    const current = next[key as keyof typeof INITIAL_PRICES];
                    next[key as keyof typeof INITIAL_PRICES] = {
                        price: current.price * (1 + change / 1000), // Slower movement
                        change: current.change + change,
                    };
                });
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return prices;
}
