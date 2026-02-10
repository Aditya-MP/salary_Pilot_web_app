import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';
import 'investing_complete_page.dart';

class TripleGuardModal extends StatefulWidget {
  final bool isStagingActive;
  final double monthlyInvestAmount;

  const TripleGuardModal({
    super.key, 
    this.isStagingActive = false,
    this.monthlyInvestAmount = 0,
  });

  @override
  State<TripleGuardModal> createState() => _TripleGuardModalState();
}

class _TripleGuardModalState extends State<TripleGuardModal> {
  int step = 1;
  int countdown = 15;
  Timer? _timer;
  bool isCoolingDown = false;

  late String randomPeerData;

  @override
  void initState() {
    super.initState();
    _generateRandomPeerData();
  }

  void _generateRandomPeerData() {
    final List<String> scenarios = [
      "72% of 'Wealth Builders' in your segment are locking this ESG split today. Success-path mapping shows 2.1% higher stability in this cohort.",
      "85% of investors with your risk profile held their position during similar volatility. They outperformed panic-sellers by 14% annually.",
      "Top 10% of 'Green Growth' portolios are accumulating this asset right now. You are following the 'Smart Money' flow.",
      "Your peer group 'Aggressive Savers' has increased allocation to this sector by 12% this week. This aligns with market sentiment.",
      "68% of users with >5 month streaks are buying this dip. History suggests this maximizes long-term compounding by 3.4x."
    ];
    setState(() {
      randomPeerData = scenarios[Random().nextInt(scenarios.length)];
    });
  }

  void startTimer() {
    setState(() => isCoolingDown = true);
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (countdown > 0) {
        setState(() => countdown--);
      } else {
        setState(() {
          isCoolingDown = false;
          step = 2; // Auto-advance to Peer Guard after cooling
          _generateRandomPeerData(); // Refresh data on step change
        });
        t.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: Color(0xFF111827),
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildProgressHeader(),
          const SizedBox(height: 32),

          if (step == 1) _buildEmotionalGuard(),
          if (step == 2) _buildPeerGuard(),
          if (step == 3) _buildStreakGuard(),

          const SizedBox(height: 32),
          _buildActionButton(),
        ],
      ),
    );
  }

  Widget _buildEmotionalGuard() {
    return Column(
      children: [
        const Icon(Icons.health_and_safety_rounded, size: 48, color: Colors.orangeAccent),
        const SizedBox(height: 16),
        const Text("Future of Work: Mental Safeguard", // Themed Title
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 12),
        Text(
          widget.isStagingActive 
              ? "You are about to deploy a 3-month bulk sum (₹${(widget.monthlyInvestAmount * 3).toStringAsFixed(0)}). This high-stakes monitoring is active."
              : "Protecting your hard-earned salary from decision-fatigue and workplace stress[cite: 22].",
          textAlign: TextAlign.center, style: const TextStyle(color: Colors.white60, fontSize: 13),
        ),
        const SizedBox(height: 20),
        if (!isCoolingDown) ...[
          const Text("How are you feeling about your finances today?", style: TextStyle(color: Colors.white70)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _vibeButton("😫 Stressed", Colors.red, true),
              _vibeButton("🧘 Calm", Colors.green, false),
              _vibeButton("🚀 FOMO", Colors.orange, true),
            ],
          ),
        ] else ...[
          const CircularProgressIndicator(color: Colors.orangeAccent),
          const SizedBox(height: 16),
          Text("Mindful Friction Active: ${countdown}s",
            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.orangeAccent)),
          const Text("Taking a pause to ensure rational choice...",
            style: TextStyle(fontSize: 12, color: Colors.white38)),
        ]
      ],
    );
  }

  Widget _buildPeerGuard() {
    return Column(
      children: [
        const Icon(Icons.groups_3, size: 48, color: Colors.blueAccent),
        const SizedBox(height: 16),
        const Text("2. Peer Benchmark Guard",
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.blue.withAlpha(26), borderRadius: BorderRadius.circular(16)),
          child: Text(
            randomPeerData,
            textAlign: TextAlign.center, style: const TextStyle(color: Colors.blueAccent, fontWeight: FontWeight.w600),
          ),
        ),
      ],
    );
  }

  Widget _buildStreakGuard() {
    return Column(
      children: [
        const Icon(Icons.eco, size: 48, color: Colors.green),
        const SizedBox(height: 16),
        const Text("3. Bio-Financial Streak Protector",
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 12),
        Text(
          widget.isStagingActive
              ? "Completing this Quarterly Pulse awards you the 'Diamond Streak'. You are 1 of 5 peers attempting this."
              : "You have a 5-month Gold Streak. Breaking this split voids your 0.9 ton CO₂ offset contribution for this year.",
          textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70),
        ),
        const SizedBox(height: 12),
        Text(widget.isStagingActive ? "💎 DIAMOND TIER IMMINENT" : "🔥 DON'T BREAK THE HABIT",
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: widget.isStagingActive ? Colors.cyanAccent : Colors.green)),
      ],
    );
  }

  // Helper UI methods
  Widget _vibeButton(String label, Color color, bool needsTimer) => ElevatedButton(
    onPressed: () {
       if(needsTimer) {
         startTimer();
       } else {
         setState(() {
           step = 2;
           _generateRandomPeerData();
         });
       }
    },
    style: ElevatedButton.styleFrom(backgroundColor: color.withAlpha(51)),
    child: Text(label, style: TextStyle(color: color, fontSize: 12)),
  );

  Widget _buildProgressHeader() => Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: List.generate(3, (i) => Container(
      margin: const EdgeInsets.symmetric(horizontal: 4),
      width: 40, height: 4,
      decoration: BoxDecoration(color: step > i ? const Color(0xFF7C3AED) : Colors.white12, borderRadius: BorderRadius.circular(2)),
    )),
  );

  Widget _buildActionButton() => SizedBox(
    width: double.infinity, height: 56,
    child: ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF7C3AED),
        disabledBackgroundColor: Colors.white12,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      onPressed: isCoolingDown ? null : () {
        if (step < 3) {
          setState(() => step++);
        } else {
          Navigator.pop(context);
          Navigator.push(context, MaterialPageRoute(builder: (context) => InvestingCompletePage(
            isStagingActive: widget.isStagingActive,
            monthlyInvestAmount: widget.monthlyInvestAmount,
          )));
        }
      },
      child: Text(isCoolingDown ? "Wait for Clarity..." : (step < 3 ? "Analyze Next Guard" : (widget.isStagingActive ? "Verify Bulk Execution" : "Secure Sustainable Wealth")),
      style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
    ),
  );
}