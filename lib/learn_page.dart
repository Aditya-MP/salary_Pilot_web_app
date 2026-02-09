import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class LearnPage extends StatelessWidget {
  const LearnPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          // Background Elements
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                color: const Color(0xFF7C3AED).withOpacity(0.2),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF7C3AED).withOpacity(0.4),
                    blurRadius: 100,
                    spreadRadius: 20,
                  ),
                ],
              ),
            ),
          ),
          
          SafeArea(
            child: Column(
              children: [
                _buildHeader(context),
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    children: [
                      _buildHeroCard(),
                      const SizedBox(height: 32),
                      const Text(
                        "Personalized for You", 
                        style: TextStyle(
                          color: Colors.white, 
                          fontSize: 16, 
                          fontWeight: FontWeight.bold,
                          letterSpacing: -0.5,
                        )
                      ),
                      const SizedBox(height: 16),
                      _buildLessonCard(
                        "Understanding LTCG Tax",
                        "New 2024 Rules: 12.5% on gains > ₹1.25L",
                        Icons.account_balance,
                        const Color(0xFFF97316),
                      ),
                      _buildLessonCard(
                        "ESG Investing 101",
                        "How Tata & Reliance are leading green energy.",
                        Icons.eco,
                        const Color(0xFF22C55E),
                      ),
                      _buildLessonCard(
                        "Crypto Safety",
                        "Self-custody vs Exchange wallets.",
                        Icons.lock,
                        const Color(0xFF7C3AED),
                      ),
                    ],
                  ),
                ),
                _buildAskCoachInput(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          IconButton(
            onPressed: () => Navigator.pop(context),
            style: IconButton.styleFrom(
              backgroundColor: Colors.white.withOpacity(0.05),
              padding: const EdgeInsets.all(12),
            ),
            icon: const Icon(Icons.arrow_back, color: Colors.white, size: 20),
          ),
          const Text(
            "AI Wealth Coach", 
            style: TextStyle(
              color: Colors.white, 
              fontSize: 18, 
              fontWeight: FontWeight.bold
            )
          ),
          IconButton(
            onPressed: () {},
            style: IconButton.styleFrom(
              backgroundColor: Colors.white.withOpacity(0.05),
              padding: const EdgeInsets.all(12),
            ),
            icon: const Icon(Icons.history, color: Colors.white, size: 20),
          ),
        ],
      ),
    );
  }

  Widget _buildAskCoachInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A).withOpacity(0.9),
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF7C3AED).withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.auto_awesome, color: Color(0xFF7C3AED), size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.white.withOpacity(0.1)),
              ),
              child: const Text(
                "Ask about share prices...",
                style: TextStyle(color: Colors.white38, fontSize: 13),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              color: Color(0xFF7C3AED),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroCard() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF7C3AED), Color(0xFF4F46E5)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF7C3AED).withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.school_rounded, color: Colors.white, size: 20),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Text("PRO", style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Text(
            "Master the Market", 
            style: TextStyle(
              color: Colors.white, 
              fontSize: 22, 
              fontWeight: FontWeight.bold,
              height: 1.1,
            )
          ),
          const SizedBox(height: 8),
          Text(
            "AI-curated lessons based on your portfolio and risk profile.", 
            style: TextStyle(
              color: Colors.white.withOpacity(0.8),
              fontSize: 13,
              height: 1.4,
            )
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              const Text("3 New Lessons", style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
              const Spacer(),
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.play_arrow_rounded, color: Color(0xFF4F46E5), size: 18),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLessonCard(String title, String subtitle, IconData icon, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15), 
              borderRadius: BorderRadius.circular(14)
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title, 
                  style: const TextStyle(
                    color: Colors.white, 
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  )
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle, 
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5), 
                    fontSize: 11,
                    height: 1.3,
                  )
                ),
              ],
            ),
          ),
          Icon(Icons.arrow_forward_ios_rounded, color: Colors.white.withOpacity(0.1), size: 14),
        ],
      ),
    );
  }
}
