import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class LearnPage extends StatefulWidget {
  const LearnPage({super.key});

  @override
  State<LearnPage> createState() => _LearnPageState();
}

class _LearnPageState extends State<LearnPage> with TickerProviderStateMixin {
  late AnimationController _heroAnimationController;
  late Animation<double> _heroAnimation;
  
  @override
  void initState() {
    super.initState();
    _heroAnimationController = AnimationController(duration: const Duration(milliseconds: 1000), vsync: this);
    _heroAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _heroAnimationController, curve: Curves.easeOutExpo));
    Future.delayed(const Duration(milliseconds: 200), () => _heroAnimationController.forward());
  }
  
  @override
  void dispose() {
    _heroAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          // Ambient Background
          Positioned(top: -100, right: -100, child: _buildBlurCircle(const Color(0xFF7C3AED), 300)),
          Positioned(top: 200, left: -50, child: _buildBlurCircle(const Color(0xFF0EA5E9), 250)),

          SafeArea(
            child: Column(
              children: [
                Expanded(
                  child: CustomScrollView(
                    physics: const BouncingScrollPhysics(),
                    slivers: [
                      _buildAppBar(context),
                      SliverPadding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        sliver: SliverList(
                          delegate: SliverChildListDelegate([
                            const SizedBox(height: 10),
                            FadeTransition(
                              opacity: _heroAnimation,
                              child: _buildModernHeroCard(),
                            ),
                            const SizedBox(height: 32),
                            _buildSectionHeader("RECOMMENDED FOR YOU"),
                            const SizedBox(height: 16),
                            _buildModernLessonCard(
                              "Understanding LTCG Tax",
                              "New 2024 Rules: 12.5% on gains > ₹1.25L",
                              Icons.account_balance, const Color(0xFFF97316), "Beginner", "5 min"
                            ),
                            _buildModernLessonCard(
                              "ESG Investing 101",
                              "Why Tata & Reliance are betting on Green Energy",
                              Icons.eco, const Color(0xFF22C55E), "Media", "8 min" // Media = Intermediate
                            ),
                            _buildModernLessonCard(
                              "Crypto Safety Guide",
                              "Self-custody wallets vs. Exchange risks",
                              Icons.lock, const Color(0xFF7C3AED), "Pro", "12 min" // Pro = Advanced
                            ),
                            const SizedBox(height: 24),
                            _buildSectionHeader("POPULAR TOPICS"),
                             const SizedBox(height: 16),
                            _buildModernLessonCard(
                              "Stock Market Basics", "Candlesticks & Technical Analysis",
                              Icons.bar_chart, const Color(0xFFEC4899), "Beginner", "15 min"
                            ),
                            _buildModernLessonCard(
                              "Mutual Funds Guide", "SIPs vs Lumpsum investing",
                              Icons.account_balance_wallet, const Color(0xFF8B5CF6), "Beginner", "10 min"
                            ),
                             const SizedBox(height: 100), // Space for floating input
                          ]),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            bottom: 0, left: 0, right: 0,
            child: _buildModernAskInput(),
          ),
        ],
      ),
    );
  }

  Widget _buildBlurCircle(Color color, double size) {
     return ImageFiltered(
      imageFilter: ImageFilter.blur(sigmaX: 60, sigmaY: 60),
      child: Container(
        width: size, height: size,
        decoration: BoxDecoration(
          color: color.withOpacity(0.15),
          shape: BoxShape.circle,
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context) {
    return SliverAppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      centerTitle: false,
       floating: true,
      title: const Text("Learning Hub", style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
      actions: [
        Container(
          margin: const EdgeInsets.only(right: 20),
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), shape: BoxShape.circle),
          child: const Icon(Icons.bookmark_border, color: Colors.white, size: 20),
        ),
      ],
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white70, letterSpacing: 1.1),
    );
  }

  Widget _buildModernAskInput() {
    return ClipRRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
          decoration: BoxDecoration(
            color: const Color(0xFF050816).withOpacity(0.8),
            border: Border(top: BorderSide(color: Colors.white.withOpacity(0.1))),
          ),
          child: Row(
            children: [
              Expanded(
                child: Container(
                  height: 52,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.1)),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.auto_awesome, color: const Color(0xFF7C3AED).withOpacity(0.8), size: 20),
                      const SizedBox(width: 12),
                      const Text("Ask AI Wealth Coach...", style: TextStyle(color: Colors.white38, fontSize: 15)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Container(
                height: 52, width: 52,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF6D28D9)]),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [BoxShadow(color: const Color(0xFF7C3AED).withOpacity(0.4), blurRadius: 10, offset: const Offset(0, 4))],
                ),
                child: const Icon(Icons.arrow_forward, color: Colors.white),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildModernHeroCard() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
           colors: [const Color(0xFF4F46E5), const Color(0xFF4338CA).withOpacity(0.8)],
           begin: Alignment.topLeft,
           end: Alignment.bottomRight,
        ),
        boxShadow: [BoxShadow(color: const Color(0xFF4F46E5).withOpacity(0.4), blurRadius: 20, offset: const Offset(0, 10))],
      ),
      child: Stack(
        children: [
          Positioned(right: -20, bottom: -20, child: Icon(Icons.school, size: 140, color: Colors.white.withOpacity(0.1))),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                  child: const Text("FEATURED COURSE", style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
                ),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Master Financial Markets", style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold, height: 1.1)),
                    SizedBox(height: 6),
                    Text("Understanding risk, tax, and assets.", style: TextStyle(color: Colors.white70, fontSize: 13)),
                  ],
                ),
                Row(
                  children: [
                    Container(
                      height: 4, width: 100,
                      decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(2)),
                      child: FractionallySizedBox(widthFactor: 0.3, child: Container(decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(2)))),
                    ),
                    const SizedBox(width: 12),
                    const Text("3/12 Lessons", style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                  ],
                )
              ],
            ),
          ),
          Positioned(
            right: 24, bottom: 24,
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle, boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 10)]),
              child: const Icon(Icons.play_arrow, color: Color(0xFF4F46E5), size: 24),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildModernLessonCard(String title, String subtitle, IconData icon, Color color, String level, String duration) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () {},
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(icon, color: color, size: 24),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 16)),
                      const SizedBox(height: 4),
                      Text(subtitle, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12)),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Icon(Icons.schedule, size: 12, color: Colors.white38),
                          const SizedBox(width: 4),
                          Text(duration, style: const TextStyle(color: Colors.white38, fontSize: 11)),
                          const SizedBox(width: 12),
                          Container(width: 3, height: 3, decoration: const BoxDecoration(color: Colors.white38, shape: BoxShape.circle)),
                          const SizedBox(width: 12),
                          Text(level, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
                        ],
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
