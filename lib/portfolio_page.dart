import 'dart:ui';
import 'package:flutter/material.dart';
import 'price_service.dart';

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> with TickerProviderStateMixin {
  late AnimationController _cardAnimationController;
  late Animation<double> _cardAnimation;

  @override
  void initState() {
    super.initState();
    _cardAnimationController = AnimationController(duration: const Duration(milliseconds: 800), vsync: this);
    _cardAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _cardAnimationController, curve: Curves.easeOutExpo));
    Future.delayed(const Duration(milliseconds: 200), () => _cardAnimationController.forward());
  }

  @override
  void dispose() {
    _cardAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          // Ambient Background
          Positioned(top: -100, right: -50, child: _buildBgCircle(const Color(0xFF22C55E), 300)),
          Positioned(top: 200, left: -50, child: _buildBgCircle(const Color(0xFF0EA5E9), 200)),

          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              const SliverAppBar(
                expandedHeight: 100,
                floating: false,
                pinned: true,
                backgroundColor: Color(0xFF050816),
                flexibleSpace: FlexibleSpaceBar(
                  titlePadding: EdgeInsets.only(left: 20, bottom: 16),
                  title: Text(
                    'Portfolio Details',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: -0.5),
                  ),
                  centerTitle: false,
                ),
              ),
              
              SliverPadding(
                padding: const EdgeInsets.all(20),
                sliver: SliverList(
                  delegate: SliverChildListDelegate([
                    FadeTransition(
                      opacity: _cardAnimation,
                      child: _buildModernSummaryCard(),
                    ),
                    const SizedBox(height: 32),
                     _buildSectionHeader("YOUR ASSETS"),
                    const SizedBox(height: 16),
                    ..._buildModernAssetList(),
                    const SizedBox(height: 32),
                    _buildSectionHeader("BLOCKCHAIN VERIFICATION"),
                    const SizedBox(height: 16),
                    _buildBlockchainSection(),
                    const SizedBox(height: 32),
                    _buildModernRebalanceButton(),
                    const SizedBox(height: 40),
                  ]),
                ),
              ),
            ],
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
   // Helper for background circle with proper blur
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


  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.white54, letterSpacing: 1.2),
    );
  }

  Widget _buildModernSummaryCard() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          colors: [const Color(0xFF22C55E).withOpacity(0.9), const Color(0xFF15803D).withOpacity(0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(color: const Color(0xFF15803D).withOpacity(0.4), blurRadius: 20, offset: const Offset(0, 10)),
        ],
        border: Border.all(color: Colors.white.withOpacity(0.2)),
      ),
      child: Stack(
        children: [
          Positioned(
            right: -20, top: -20,
            child: Icon(Icons.show_chart, size: 150, color: Colors.white.withOpacity(0.1)),
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),
                      child: const Icon(Icons.wallet, color: Colors.white, size: 20),
                    ),
                    const SizedBox(width: 12),
                    const Text('Total Net Worth', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white70)),
                  ],
                ),
                const SizedBox(height: 24),
                const Text('₹16,980.50', style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Colors.white, height: 1.0)),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(20)),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.trending_up, color: Colors.white, size: 16),
                      SizedBox(width: 4),
                      Text('+13.8% this month', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildSummaryStat("Daily P&L", "+₹450.20"),
                    _buildSummaryStat("CO₂ Offset", "0.9 tons"),
                    _buildSummaryStat("Risk Score", "Low"),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryStat(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: Colors.white60)),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
      ],
    );
  }

  List<Widget> _buildModernAssetList() {
    return [
      StreamBuilder<Map<String, dynamic>>(
        stream: PriceService().priceStream,
        builder: (context, snapshot) {
          final prices = snapshot.data ?? PriceService().getCurrentPrices();
          final assets = [
            {'name': 'Reliance Green Energy', 'type': 'EQUITY', 'symbol': 'RELIANCE'},
            {'name': 'Solana Green Lending', 'type': 'VDA', 'symbol': 'SOL'},
            {'name': 'Cardano ESG Pool', 'type': 'VDA', 'symbol': 'ADA'},
            {'name': 'SBI Magnum ESG', 'type': 'EQUITY', 'symbol': 'SBI'},
            {'name': 'Digital Gold', 'type': 'COMMODITY', 'symbol': 'GOLD'},
          ];
          
          return Column(
            children: assets.map((asset) {
              final name = asset['name']!;
              final type = asset['type']!;
              final symbol = asset['symbol']!;
              final priceData = prices[name] ?? {'price': 0, 'change': '0'};
              
              // --- TAX PREVIEW LOGIC ---
              double estimatedProfit = (priceData['price'] as num) * 0.15;
              String taxLabel = "";
              Color taxColor = Colors.grey;
              
              if (type == 'VDA') {
                 // 30% Tax on Profit + 1% TDS on Total Sale
                double tax = (estimatedProfit * 0.30) + (priceData['price'] * 0.01);
                taxLabel = "Tax: ₹${tax.round()} (30% VDA)";
                taxColor = const Color(0xFFF97316);
              } else if (type == 'EQUITY') {
                // 12.5% LTCG
                double tax = estimatedProfit * 0.125;
                taxLabel = "Tax: ₹${tax.round()} (12.5% LTCG)";
                taxColor = const Color(0xFF3B82F6);
              } else {
                taxLabel = "Tax: Slab";
                taxColor = Colors.white54;
              }

              final isPositive = double.tryParse(priceData['change'].toString())?.isNegative != true;
              final changeColor = isPositive ? const Color(0xFF22C55E) : const Color(0xFFEF4444);

              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.03),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 44, height: 44,
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.05),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          symbol.substring(0, 1),
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white)),
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(color: taxColor.withOpacity(0.15), borderRadius: BorderRadius.circular(4)),
                              child: Text(taxLabel, style: TextStyle(fontSize: 10, color: taxColor, fontWeight: FontWeight.bold)),
                            ),
                          ],
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('₹${priceData['price']}', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
                          const SizedBox(height: 2),
                          Text('${priceData['change']}%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: changeColor)),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          );
        },
      ),
    ];
  }

  Widget _buildBlockchainSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Row(
              children: [
                Icon(Icons.verified_user_rounded, color: Color(0xFF22C55E), size: 20), // Trust icon
                SizedBox(width: 8),
                Text('Institutional Security', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
              ],
            ),
            // Change "Live Testnet" to "Bank-Grade Encryption"
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFF22C55E).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF22C55E).withOpacity(0.3)),
              ),
              child: const Text('SECURE LINK', style: TextStyle(fontSize: 10, color: Color(0xFF22C55E), fontWeight: FontWeight.bold)),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const Text(
          "Your assets are recorded on the Masumi Network for full transparency and zero-broker interference[cite: 21].",
          style: TextStyle(fontSize: 11, color: Colors.white38),
        ),
      ],
    );
  }

  Widget _buildTerminalRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: Colors.white.withOpacity(0.4), fontFamily: 'monospace', fontSize: 11)),
        Text(value, style: const TextStyle(color: Colors.white, fontFamily: 'monospace', fontSize: 12)),
      ],
    );
  }

  Widget _buildModernRebalanceButton() {
    return Container(
      width: double.infinity,
      height: 56,
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [Color(0xFF22C55E), Color(0xFF16A34A)]),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [BoxShadow(color: const Color(0xFF22C55E).withOpacity(0.4), blurRadius: 16, offset: const Offset(0, 4))],
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('✅ Next month plan applied!'), backgroundColor: Color(0xFF22C55E)),
          );
        },
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.auto_graph, color: Colors.white),
            SizedBox(width: 12),
            Text('Auto-Rebalance Portfolio', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
      ),
    );
  }
}