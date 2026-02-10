import 'dart:ui';
import 'package:flutter/material.dart';
import 'dashboard_page.dart';
import 'portfolio_page.dart';
import 'investing_complete_page.dart';
import 'price_service.dart';
import 'triple_guard_modal.dart';

void main() {
  runApp(const SalaryPilotApp());
}

class SalaryPilotApp extends StatelessWidget {
  const SalaryPilotApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Salary Pilot',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF050816),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF7C3AED),
          brightness: Brightness.dark,
        ),
        fontFamily: 'Roboto',
        useMaterial3: true,
      ),
      home: const SalarySplitPage(),
    );
  }
}

class SalarySplitPage extends StatefulWidget {
  const SalarySplitPage({super.key});

  @override
  State<SalarySplitPage> createState() => _SalarySplitPageState();
}

class _SalarySplitPageState extends State<SalarySplitPage> {
  double spending = 50;
  double savings = 20;
  double investing = 30;
  bool isStagingActive = false; // New State Variable
  final double salary = 50000;
  String selectedRiskProfile = "Balanced"; // Default Risk Profile

  @override
  void initState() {
    super.initState();
    // START GLOBAL LIVE UPDATES
    WidgetsBinding.instance.addPostFrameCallback((_) {
      PriceService().startGlobalUpdates();
    });
  }

  @override
  void dispose() {
    PriceService().stopUpdates();
    super.dispose();
  }

  void _normalize() {
    final total = spending + savings + investing;
    if (total == 0) return;
    setState(() {
      spending = (spending / total) * 100;
      savings = (savings / total) * 100;
      investing = (investing / total) * 100;
    });
  }

  Widget _buildRiskProfileChip(String label, Color color) {
    final isSelected = selectedRiskProfile == label;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => selectedRiskProfile = label),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? color.withOpacity(0.2) : Colors.white.withOpacity(0.05),
            border: Border.all(color: isSelected ? color : Colors.white12),
            borderRadius: BorderRadius.circular(8),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              color: isSelected ? color : Colors.white60,
              fontWeight: FontWeight.w600,
              fontSize: 12,
            ),
          ),
        ),
      ),
    );
  }

  Future<void> callRealAIAgents() async {
    // Show Loading
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const Center(child: CircularProgressIndicator(color: Color(0xFF22C55E))),
    );

    try {
      // Quick Mock Enhancement (as requested)
      // Simulating AI Agents based on Risk Profile
      await Future.delayed(const Duration(seconds: 2));

      final Map<String, dynamic> result = {
        'split': selectedRiskProfile == "Aggressive"
            ? {'spend': 30, 'save': 20, 'invest': 50}
            : (selectedRiskProfile == "Conservative" ? {'spend': 50, 'save': 40, 'invest': 10} : {'spend': 40, 'save': 30, 'invest': 30}),
        'portfolio': [
          {'name': 'Tata Solar', 'alloc': 25, 'news': 'Bullish 8%', 'sentiment': 'bullish'},
          {'name': 'Reliance Green', 'alloc': 20, 'tax': 'LTCG 12.5%', 'sentiment': 'neutral'},
          {'name': 'ESG Leaders ETF', 'alloc': 15, 'news': 'Sustainable', 'sentiment': 'bullish'}
        ],
        'next_month': selectedRiskProfile == "Aggressive" ? '12.4% growth predicted (High Volatility)' : '8.5% growth predicted (Stable)',
        'tax_advice': 'Long Term Capital Gains (LTCG) > ₹1.25L taxed at 12.5%. Tax harvesting recommended.',
        'sustainability_score': 88, // Feature #5
        'market_signal': 'Accumulate', // Feature #4
      };

      Navigator.pop(context); // Close loading

      if (mounted) {
        setState(() {
          spending = (result['split']['spend'] as num).toDouble();
          savings = (result['split']['save'] as num).toDouble();
          investing = (result['split']['invest'] as num).toDouble();
        });
        _normalize(); // Ensure they sum to 100 visually

        // Feature #7 & #8: Show the AI Forecaster Result (Updated SnackBar)
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("AI Agents Complete: ${result['next_month']}"),
            backgroundColor: const Color(0xFF22C55E),
            duration: const Duration(seconds: 4),
            action: SnackBarAction(
              label: "VIEW TAX",
              textColor: Colors.white,
              onPressed: () => showTaxAdvice(result['tax_advice'] as String)
            ),
          ),
        );
      }
    } catch (e) {
      Navigator.pop(context); // Ensure loading is closed
      print("Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("AI Connection Failed: $e")),
      );
    }
  }

  void showTaxAdvice(String advice) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF111827),
        title: const Row(
          children: [
            Icon(Icons.gavel, color: Color(0xFFF97316)),
            SizedBox(width: 10),
            Text("AI Tax Compliance", style: TextStyle(color: Colors.white, fontSize: 18)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "CRITICAL COMPLIANCE ALERT:",
              style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold, fontSize: 12),
            ),
            const SizedBox(height: 8),
            const Text(
              "• 30% flat tax applies to all VDA gains.\n"
              "• 1% TDS deducted at source for every trade.\n"
              "• Losses from one crypto cannot offset gains in another.\n"
              "• Reporting in 'Schedule VDA' is mandatory for ITR-2026.",
              style: TextStyle(color: Colors.white70, fontSize: 13),
            ),
            const Divider(color: Colors.white10, height: 24),
            Text(advice, style: const TextStyle(color: Colors.white, fontSize: 14)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("I UNDERSTAND", style: TextStyle(color: Color(0xFF7C3AED))),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final spendingAmt = (salary * spending / 100).round();
    final savingsAmt = (salary * savings / 100).round();
    final investingAmt = (salary * investing / 100).round();

    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          // Ambient Background
          Positioned(top: -100, right: -100, child: _buildBgCircle(const Color(0xFF7C3AED), 300)),
          Positioned(top: 200, left: -50, child: _buildBgCircle(const Color(0xFFEC4899), 250)),

          SafeArea(
            child: Column(
              children: [
              // Top bar
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Salary Pilot',
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        color: Colors.white.withOpacity(0.06),
                        border: Border.all(color: Colors.white24),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.flight_takeoff, size: 16, color: Colors.amber),
                          SizedBox(width: 6),
                          Text(
                            'Autopilot: OFF',
                            style: TextStyle(fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Salary card
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    gradient: LinearGradient(
                      colors: [
                        const Color(0xFF7C3AED).withOpacity(0.9),
                        const Color(0xFFEC4899).withOpacity(0.9),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.5),
                        blurRadius: 24,
                        offset: const Offset(0, 12),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'This month salary detected',
                        style: TextStyle(fontSize: 13, color: Colors.white70),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '₹${salary.toStringAsFixed(0)}',
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          const Icon(Icons.eco, size: 16, color: Colors.white),
                          const SizedBox(width: 6),
                          Text(
                            'Aim for sustainable growth this month',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.white.withOpacity(0.85),
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // Risk Profiler Agent (Feature #2)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("Risk Profile (AI Agent)", style: TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w600)),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                         _buildRiskProfileChip("Conservative", Colors.blue),
                         const SizedBox(width: 8),
                         _buildRiskProfileChip("Balanced", Colors.green),
                         const SizedBox(width: 8),
                         _buildRiskProfileChip("Aggressive", Colors.orange),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Quarterly Pulse (Staging) Toggle
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    color: isStagingActive ? const Color(0xFF7C3AED).withOpacity(0.1) : Colors.white.withOpacity(0.05),
                    border: Border.all(color: isStagingActive ? const Color(0xFF7C3AED) : Colors.white12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.timer_outlined, color: Color(0xFF7C3AED)),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Quarterly Pulse (Staging)", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                            Text("Save for 3 months, invest in bulk.", style: TextStyle(color: Colors.white54, fontSize: 11)),
                          ],
                        ),
                      ),
                      Switch(
                        value: isStagingActive,
                        activeColor: const Color(0xFF7C3AED),
                        onChanged: (val) => setState(() => isStagingActive = val),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // Splits
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: ListView(
                    children: [
                      _buildSplitCard(
                        label: 'Spending',
                        color: const Color(0xFF22C55E),
                        icon: Icons.credit_card,
                        percentage: spending,
                        amount: spendingAmt,
                        onChanged: (v) {
                          setState(() => spending = v);
                          _normalize();
                        },
                      ),
                      const SizedBox(height: 14),
                      _buildSplitCard(
                        label: 'Savings',
                        color: const Color(0xFF0EA5E9),
                        icon: Icons.savings,
                        percentage: savings,
                        amount: savingsAmt,
                        onChanged: (v) {
                          setState(() => savings = v);
                          _normalize();
                        },
                      ),
                      const SizedBox(height: 14),
                      _buildSplitCard(
                        label: 'Investing',
                        color: const Color(0xFFF97316),
                        icon: Icons.trending_up,
                        percentage: investing,
                        amount: investingAmt,
                        onChanged: (v) {
                          setState(() => investing = v);
                          _normalize();
                        },
                      ),
                    ],
                  ),
                ),
              ),

              // Approve button
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                child: SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF7C3AED),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
                      ),
                    ),
                    onPressed: () {
                      // Show Triple Guard Modal before proceeding
                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        backgroundColor: Colors.transparent,
                        builder: (context) => TripleGuardModal(isStagingActive: isStagingActive),
                      );
                    },
                    child: const Text(
                      'Approve & Let Pilot Plan',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        ],
      ),
    );
  }

  Widget _buildBgCircle(Color color, double size) {
    return ImageFiltered(
      imageFilter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
      child: Container(
        width: size, height: size,
        decoration: BoxDecoration(
          color: color.withOpacity(0.15),
          shape: BoxShape.circle,
        ),
      ),
    );
  }

  Widget _buildSplitCard({
    required String label,
    required Color color,
    required IconData icon,
    required double percentage,
    required int amount,
    required ValueChanged<double> onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        color: Colors.white.withOpacity(0.03),
        border: Border.all(color: Colors.white12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 18, color: color),
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
              ),
              const Spacer(),
              Text(
                '${percentage.toStringAsFixed(0)}%  ·  ₹$amount',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.white.withOpacity(0.8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              trackHeight: 3,
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
              overlayShape: const RoundSliderOverlayShape(overlayRadius: 10),
              thumbColor: color,
              activeTrackColor: color,
              inactiveTrackColor: Colors.white12,
            ),
            child: Slider(
              value: percentage,
              min: 0,
              max: 100,
              divisions: 100,
              onChanged: onChanged,
            ),
          ),
        ],
      ),
    );
  }
}