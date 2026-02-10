import 'package:flutter/material.dart';
import 'dart:async';
import 'dashboard_page.dart';

class InvestingCompletePage extends StatefulWidget {
  final bool isStagingActive;
  final double monthlyInvestAmount;

  const InvestingCompletePage({
    super.key, 
    this.isStagingActive = false,
    this.monthlyInvestAmount = 0,
  });

  @override
  State<InvestingCompletePage> createState() => _InvestingCompletePageState();
}

class _InvestingCompletePageState extends State<InvestingCompletePage> {
  @override
  void initState() {
    super.initState();
    // Auto-navigate to dashboard after 3 seconds
    Timer(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => DashboardPage(
          isStagingActive: widget.isStagingActive,
          monthlyInvestAmount: widget.monthlyInvestAmount,
        )),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF050816), Color(0xFF111827)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Success animation container
              Container(
                padding: const EdgeInsets.all(40),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [const Color(0xFF22C55E), const Color(0xFF16A34A)],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF22C55E).withOpacity(0.4),
                      blurRadius: 40,
                      spreadRadius: 0,
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.check_circle,
                  size: 80,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 32),
              
              const Text(
                'Investing Complete!',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                '₹${widget.monthlyInvestAmount.round()} invested across 5 assets',
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.white70,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              const Text(
                'Expected: 13.8% APY + 0.9 tons CO₂ saved',
                style: TextStyle(
                  fontSize: 14,
                  color: Color(0xFF22C55E),
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              // NEW: Sustainability Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF22C55E).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  "玄 SUSTAINABILITY SCORE: 92/100",
                  style: TextStyle(fontSize: 11, color: Color(0xFF22C55E), fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 40),
              
              // Live transaction cards
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Column(
                  children: [
                    _buildTxCard(
                      'Cardano Testnet',
                      'ESG Pool',
                      '₹6,000',
                      const Color(0xFF7C3AED),
                      taxInfo: 'Tax: 30% VDA',
                    ),
                    const SizedBox(height: 12),
                    _buildTxCard(
                      'Masumi Network',
                      'AI Agent Fees',
                      '₹45',
                      const Color(0xFFF97316),
                      taxInfo: 'GST: 18% Included',
                    ),
                    const SizedBox(height: 12),
                    _buildTxCard(
                      'Solana DeFi',
                      'Green Lending',
                      '₹4,650',
                      const Color(0xFF0EA5E9),
                      taxInfo: 'Tax: 30% VDA',
                    ),
                  ],
                ),
              ),
              const Spacer(),
              
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    const Text(
                      'Redirecting to Dashboard...',
                      style: TextStyle(fontSize: 14, color: Colors.white60),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF22C55E),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => DashboardPage(
                              isStagingActive: widget.isStagingActive,
                              monthlyInvestAmount: widget.monthlyInvestAmount,
                            )),
                          );
                        },
                        child: const Text(
                          'Go to Dashboard',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTxCard(String network, String action, String amount, Color color, {String? taxInfo}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: Colors.white.withOpacity(0.06),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(Icons.link, size: 20, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(network, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                Text(action, style: TextStyle(fontSize: 12, color: Colors.white60)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                amount,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: color),
              ),
              if (taxInfo != null) ...[
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    taxInfo,
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color.withOpacity(0.9)),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}