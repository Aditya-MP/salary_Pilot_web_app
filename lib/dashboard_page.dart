import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'portfolio_page.dart';
import 'price_service.dart';
import 'learn_page.dart';
import 'news_page.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _selectedIndex = 0;
  
  // Pages for the navigation
  // Note: We use indexed stack or simple switching. 
  // PortfolioPage, NewsPage, LearnPage need to be imported.
  final List<Widget> _pages = [
    const DashboardHome(),
    const PortfolioPage(),
    const NewsPage(),
    const LearnPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF111827),
        selectedItemColor: const Color(0xFF7C3AED),
        unselectedItemColor: Colors.white38,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.pie_chart), label: 'Assets'),
          BottomNavigationBarItem(icon: Icon(Icons.newspaper), label: 'News'),
          BottomNavigationBarItem(icon: Icon(Icons.school), label: 'Learn'),
        ],
      ),
    );
  }
}



class DashboardHome extends StatefulWidget {
  const DashboardHome({super.key});

  @override
  State<DashboardHome> createState() => _DashboardHomeState();
}

class _DashboardHomeState extends State<DashboardHome> {
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
          child: SingleChildScrollView(
            child: Column(
              children: [
              // Top bar with back button
              Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [

                    const Expanded(
                      child: Text(
                        'Salary Pilot Dashboard',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        color: const Color(0xFF22C55E).withOpacity(0.2),
                        border: Border.all(color: const Color(0xFF22C55E), width: 1),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.flight_takeoff, size: 14, color: Color(0xFF22C55E)),
                          SizedBox(width: 4),
                          Text('ON', style: TextStyle(fontSize: 11, color: Color(0xFF22C55E))),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // LIVE Performance cards
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: StreamBuilder<Map<String, dynamic>>(
                  stream: PriceService().priceStream,
                  builder: (context, snapshot) {
                    final totalPrices = snapshot.data ?? PriceService().getCurrentPrices();
                    final totalValue = totalPrices.values.fold<double>(0, (sum, data) => sum + (data['price'] as num).toDouble());
                    final totalChange = totalPrices.values.fold<double>(0, (sum, data) => sum + (double.tryParse(data['change'].toString()) ?? 0));
                    
                    return Row(
                      children: [
                        Expanded(
                          child: _buildLivePerformanceCard(
                            title: 'Portfolio Value',
                            value: '₹${totalValue.round()}',
                            change: '+${(totalValue * 0.116).round()}',
                            changePercent: '+11.6%',
                            color: const Color(0xFF22C55E),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _buildLivePerformanceCard(
                            title: 'Monthly Return',
                            value: '${(11.8 + (totalChange / 5)).toStringAsFixed(1)}%',
                            change: '+0.4%',
                            changePercent: '+2.9%',
                            color: const Color(0xFFF97316),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),

              const SizedBox(height: 24),

              // Portfolio pie chart + Expandable investing details
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.white.withOpacity(0.03),
                    border: Border.all(color: Colors.white12),
                  ),
                  child: Column(
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.pie_chart, color: Color(0xFF7C3AED), size: 20),
                          SizedBox(width: 8),
                          Text(
                            'Current Allocation',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        height: 160,
                        child: PieChart(
                          PieChartData(
                            sections: [
                              PieChartSectionData(
                                color: const Color(0xFF22C55E),
                                value: 50,
                                radius: 55,
                                title: '50%',
                                titleStyle: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              PieChartSectionData(
                                color: const Color(0xFF0EA5E9),
                                value: 20,
                                radius: 55,
                                title: '20%',
                                titleStyle: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              PieChartSectionData(
                                color: const Color(0xFFF97316),
                                value: 30,
                                radius: 65,
                                title: '30%',
                                titleStyle: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                            centerSpaceRadius: 35,
                            sectionsSpace: 2,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        'Spending · Savings · Investing',
                        style: TextStyle(fontSize: 12, color: Colors.white60),
                      ),

                      const SizedBox(height: 16),

                      // Simple holdings growth chart
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Your invested growth',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white),
                            ),
                            const SizedBox(height: 8),
                            _buildHoldingsLineChart(),
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _buildLegendItem("Reliance +24%", const Color(0xFF22C55E)),
                                const SizedBox(width: 8),
                                _buildLegendItem("Solana +28.6%", const Color(0xFF0EA5E9)),
                                const SizedBox(width: 8),
                                _buildLegendItem("Cardano +14.3%", const Color(0xFF7C3AED)),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _buildLegendItem("SBI +7.5%", const Color(0xFFEC4899)),
                                const SizedBox(width: 8),
                                _buildLegendItem("Gold +6.7%", const Color(0xFFEAB308)),
                                const SizedBox(width: 8),
                                _buildLegendItem("Total +20.4%", const Color(0xFFF97316)),
                              ],
                            ),
                            const SizedBox(height: 4),
                            const Text(
                              'Investment performance from day invested to current: All assets showing positive returns',
                              style: TextStyle(fontSize: 11, color: Colors.white60),
                            ),
                          ],
                        ),
                      ),
                      
                      // REAL: Investing breakdown modal
                      const SizedBox(height: 16),
                      GestureDetector(
                        onTap: () => _showInvestingModal(context),
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            color: const Color(0xFFF97316).withOpacity(0.15),
                            border: Border.all(color: const Color(0xFFF97316).withOpacity(0.4)),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFF97316).withOpacity(0.1),
                                blurRadius: 8,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Row(
                                children: [
                                  Icon(Icons.trending_up, size: 16, color: Color(0xFFF97316)),
                                  SizedBox(width: 8),
                                  Text(
                                    '₹15,000 Investing (30%)',
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFFF97316),
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: [
                                  const Text('13.8% APY', style: TextStyle(fontSize: 13, color: Color(0xFFF97316))),
                                  const SizedBox(width: 8),
                                  const Icon(Icons.chevron_right, color: Color(0xFFF97316)),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // AI Recommendations + Notification
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    // AI Coach Alerts Section
                    const Padding(
                      padding: EdgeInsets.only(left: 4, bottom: 8),
                      child: Text(
                        "AI Coach Alerts",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    buildAICoachInsights(),

                    const SizedBox(height: 24),

                    // Next month rebalance
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: LinearGradient(
                          colors: [const Color(0xFF7C3AED).withOpacity(0.9), const Color(0xFFEC4899).withOpacity(0.9)],
                        ),
                      ),
                      child: Column(
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.insights, color: Colors.white, size: 20),
                              SizedBox(width: 8),
                              Text('Next Month Optimizer', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                            ],
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            '13.8% APY possible (+₹320 extra)',
                            style: TextStyle(fontSize: 14, color: Colors.white70),
                          ),
                          const SizedBox(height: 16),
                          SizedBox(
                            width: double.infinity,
                            height: 44,
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => const PortfolioPage()),
                                );
                              },
                              child: const Text(
                                'Apply Next Month Plan',
                                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF7C3AED)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),
            ],
          ),
        ),
        ),
      ),
    );
  }

  Widget _buildPerformanceCard({
    required String title,
    required String value,
    required String change,
    required String changePercent,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: Colors.white.withOpacity(0.03),
        border: Border.all(color: Colors.white12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, color: Colors.white60)),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.trending_up, size: 16, color: color),
              const SizedBox(width: 4),
              Text(change, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color)),
              const SizedBox(width: 8),
              Text(changePercent, style: TextStyle(fontSize: 12, color: Colors.white60)),
            ],
          ),
        ],
      ),
    );
  }

  void _showInvestingModal(BuildContext context) {
    final priceService = PriceService();
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => LiveInvestingModal(
        priceService: priceService,
      ),
    );
  }

  Widget _buildLivePerformanceCard({
    required String title,
    required String value,
    required String change,
    required String changePercent,
    required Color color,
  }) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: Colors.white.withOpacity(0.03),
        border: Border.all(color: Colors.white12),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 10)],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, color: Colors.white60)),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.trending_up, size: 16, color: color),
              const SizedBox(width: 4),
              Text(change, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color)),
              const SizedBox(width: 8),
              Text(changePercent, style: TextStyle(fontSize: 12, color: Colors.white60)),
            ],
          ),
        ],
      ),
    );
  }

  Widget buildAICoachInsights() {
    final insights = [
      {"icon": Icons.account_balance, "title": "Tax Tip", "desc": "Hold for 12m to save 7.5% tax (LTCG).", "color": const Color(0xFFF97316)},
      {"icon": Icons.gavel, "title": "SEBI Rule", "desc": "Diversification is mandatory for low-risk profiles.", "color": const Color(0xFF0EA5E9)},
      {"icon": Icons.warning, "title": "Risk Alert", "desc": "Reliance Green has high volatility this week.", "color": Colors.red},
    ];

    return SizedBox(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: insights.length,
        itemBuilder: (context, index) => Container(
          width: 200,
          margin: const EdgeInsets.only(right: 12),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: (insights[index]['color'] as Color).withOpacity(0.3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(insights[index]['icon'] as IconData, color: insights[index]['color'] as Color, size: 20),
              const SizedBox(height: 8),
              Text(insights[index]['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              Text(insights[index]['desc'] as String, style: const TextStyle(color: Colors.white60, fontSize: 11), maxLines: 2),
            ],
          ),
        ),
      ),
    );
  }

  Widget buildAISentimentBadge(String assetName) {
    // In a real app, this comes from AIService.getNewsImpact()
    bool isBullish = assetName.contains("Solar") || assetName.contains("Green") || assetName.contains("Reliance");
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isBullish ? const Color(0xFF22C55E).withOpacity(0.2) : Colors.red.withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: isBullish ? const Color(0xFF22C55E) : Colors.red, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(isBullish ? Icons.trending_up : Icons.trending_down, size: 12, color: isBullish ? const Color(0xFF22C55E) : Colors.red),
          const SizedBox(width: 4),
          Text(
            isBullish ? 'AI: BULLISH' : 'AI: BEARISH',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: isBullish ? const Color(0xFF22C55E) : Colors.red),
          ),
        ],
      ),
    );
  }

  Widget _buildHoldingsLineChart() {
    // Investment timeline: Day invested (0) to current (5 months)
    // Each asset starts from its actual investment day with real starting amounts
    final relianceSpots = [
      const FlSpot(0, 5000),  // Day invested: ₹5,000
      const FlSpot(1, 5100),  // Month 1: +2%
      const FlSpot(2, 5300),  // Month 2: +6%
      const FlSpot(3, 5600),  // Month 3: +12%
      const FlSpot(4, 5900),  // Month 4: +18%
      const FlSpot(5, 6200),  // Current: +24%
    ];
    
    final solanaSpots = [
      const FlSpot(0, 3500),  // Day invested: ₹3,500
      const FlSpot(1, 3600),  // Month 1: +2.9%
      const FlSpot(2, 3800),  // Month 2: +8.6%
      const FlSpot(3, 4000),  // Month 3: +14.3%
      const FlSpot(4, 4200),  // Month 4: +20%
      const FlSpot(5, 4500),  // Current: +28.6%
    ];
    
    final cardanoSpots = [
      const FlSpot(0, 2800),  // Day invested: ₹2,800
      const FlSpot(1, 2900),  // Month 1: +3.6%
      const FlSpot(2, 3000),  // Month 2: +7.1%
      const FlSpot(3, 3100),  // Month 3: +10.7%
      const FlSpot(4, 3150),  // Month 4: +12.5%
      const FlSpot(5, 3200),  // Current: +14.3%
    ];
    
    final sbiSpots = [
      const FlSpot(0, 2000),  // Day invested: ₹2,000
      const FlSpot(1, 2050),  // Month 1: +2.5%
      const FlSpot(2, 2080),  // Month 2: +4%
      const FlSpot(3, 2100),  // Month 3: +5%
      const FlSpot(4, 2120),  // Month 4: +6%
      const FlSpot(5, 2150),  // Current: +7.5%
    ];
    
    final goldSpots = [
      const FlSpot(0, 300),   // Day invested: ₹300
      const FlSpot(1, 305),   // Month 1: +1.7%
      const FlSpot(2, 310),   // Month 2: +3.3%
      const FlSpot(3, 315),   // Month 3: +5%
      const FlSpot(4, 318),   // Month 4: +6%
      const FlSpot(5, 320),   // Current: +6.7%
    ];
    
    final totalSpots = [
      const FlSpot(0, 13600), // Total invested: ₹13,600
      const FlSpot(1, 13955), // Month 1: +2.6%
      const FlSpot(2, 14490), // Month 2: +6.5%
      const FlSpot(3, 15115), // Month 3: +11.1%
      const FlSpot(4, 15688), // Month 4: +15.4%
      const FlSpot(5, 16370), // Current: +20.4%
    ];
    
    // Feature #9: Next Month Plan (Prediction)
    final predictionSpot = const FlSpot(6, 17500); // AI Predicted

    return SizedBox(
      height: 200,
      child: LineChart(
        LineChartData(
          minX: 0, maxX: 6, minY: 200, maxY: 18000,
          titlesData: FlTitlesData(
            leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 40, getTitlesWidget: (v, m) => Text('₹${v ~/ 1000}k', style: const TextStyle(fontSize: 10, color: Colors.white60)))),
            bottomTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, getTitlesWidget: (v, m) {
              const labels = ['Start', 'M1', 'M2', 'M3', 'M4', 'Now', 'Fut']; // Added 'Fut'
              if (v.toInt() >= labels.length) return const SizedBox();
              return Text(labels[v.toInt()], style: const TextStyle(fontSize: 10, color: Colors.white60));
            })),
            rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          ),
          gridData: FlGridData(show: true, drawVerticalLine: false, horizontalInterval: 2000, getDrawingHorizontalLine: (v) => FlLine(color: Colors.white12, strokeWidth: 1)),
          borderData: FlBorderData(show: true, border: const Border.fromBorderSide(BorderSide(color: Colors.white24))),
          lineBarsData: [
            LineChartBarData(spots: relianceSpots, isCurved: true, color: const Color(0xFF22C55E), barWidth: 2.5, dotData: const FlDotData(show: false)),
            LineChartBarData(spots: solanaSpots, isCurved: true, color: const Color(0xFF0EA5E9), barWidth: 2.5, dotData: const FlDotData(show: false)),
            LineChartBarData(spots: cardanoSpots, isCurved: true, color: const Color(0xFF7C3AED), barWidth: 2.5, dotData: const FlDotData(show: false)),
            LineChartBarData(spots: sbiSpots, isCurved: true, color: const Color(0xFFEC4899), barWidth: 2, dotData: const FlDotData(show: false)),
            LineChartBarData(spots: goldSpots, isCurved: true, color: const Color(0xFFEAB308), barWidth: 2, dotData: const FlDotData(show: false)),
            LineChartBarData(spots: totalSpots, isCurved: true, color: const Color(0xFFF97316), barWidth: 4, dotData: const FlDotData(show: true)),
            
            // Feature #9: Prediction Line (Dashed)
            LineChartBarData(
              spots: [totalSpots.last, predictionSpot],
              isCurved: true,
              color: const Color(0xFFF97316).withOpacity(0.6),
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(radius: 4, color: const Color(0xFFF97316), strokeWidth: 0)),
              dashArray: [5, 5], // Dashed line
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAssetRow(String name, String icon, String value, String change, String apy, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: Colors.white.withOpacity(0.04),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 20)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                Text('$value • $apy APY', style: const TextStyle(fontSize: 12, color: Colors.white60)),
                const SizedBox(height: 4),
                buildAISentimentBadge(name), // Feature #7: AI News Impact
              ],
            ),
          ),
          Text(
            change,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: change.contains('+') ? const Color(0xFF22C55E) : const Color(0xFFF97316),
            ),
          ),
        ],
      ),
    );
  }

  // Legend helper
  Widget _buildLegendItem(String label, Color color) => Row(
    children: [
      Container(width: 10, height: 10, color: color),
      const SizedBox(width: 4),
      Text(label, style: const TextStyle(fontSize: 10, color: Colors.white60)),
    ],
  );
}

class LiveInvestingModal extends StatefulWidget {
  final PriceService priceService;
  const LiveInvestingModal({super.key, required this.priceService});

  @override
  State<LiveInvestingModal> createState() => _LiveInvestingModalState();
}

class _LiveInvestingModalState extends State<LiveInvestingModal> {
  Map<String, dynamic> currentPrices = {};

  @override
  void initState() {
    super.initState();
    widget.priceService.priceStream.listen((prices) {
      if (mounted) {
        setState(() {
          currentPrices = prices;
        });
      }
    });
    currentPrices = widget.priceService.getCurrentPrices();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      decoration: const BoxDecoration(
        color: Color(0xFF050816),
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(2),
              color: Colors.white30,
            ),
          ),
          
          // LIVE Header
          Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Stack(
                  children: [
                    const Icon(Icons.analytics, color: Color(0xFFF97316), size: 28),
                    Positioned(
                      right: 0,
                      bottom: 0,
                      child: Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: Color(0xFF22C55E),
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 12),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('LIVE Investing Breakdown', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                    Text('Prices updating...', style: TextStyle(fontSize: 12, color: Colors.white60)),
                  ],
                ),
                const Spacer(),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close, color: Colors.white60),
                ),
              ],
            ),
          ),
          
          // LIVE Performance
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 20),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              gradient: LinearGradient(
                colors: [const Color(0xFFF97316).withOpacity(0.9), const Color(0xFFEAB308).withOpacity(0.9)],
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    const Text('₹15,000', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                    const Text('Invested', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  ],
                ),
                Column(
                  children: [
                    const Text('13.8%', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                    const Text('APY', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  ],
                ),
                Column(
                  children: [
                    const Text('₹1,980', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                    const Text('Profit', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  ],
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 20),
          
          // LIVE Asset list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              itemCount: 5,
              itemBuilder: (context, index) {
                final assets = [
                  {'name': 'Reliance Green Energy', 'icon': '📈'},
                  {'name': 'Solana Green Lending', 'icon': '🌿'},
                  {'name': 'Cardano ESG Pool', 'icon': '🔗'},
                  {'name': 'SBI Magnum ESG', 'icon': '💰'},
                  {'name': 'Digital Gold', 'icon': '🥇'},
                ];
                
                final asset = assets[index];
                final name = asset['name']!;
                final priceData = currentPrices[name] ?? {'price': 0, 'change': '0'};
                
                final isPositive = double.tryParse(priceData['change'])?.isNegative != true;
                final color = isPositive ? const Color(0xFF22C55E) : const Color(0xFFF97316);
                
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    color: Colors.white.withOpacity(0.04),
                    border: Border.all(color: color.withOpacity(0.2)),
                  ),
                  child: Row(
                    children: [
                      Text(asset['icon']!, style: const TextStyle(fontSize: 20)),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                            Text(
                              '₹${priceData['price']} • 13.8% APY',
                              style: const TextStyle(fontSize: 12, color: Colors.white60),
                            ),
                            const SizedBox(height: 4),
                            Builder(
                              builder: (context) {
                                String typeLabel;
                                Color typeColor;
                                
                                if (name.contains('Reliance') || name.contains('Tata')) {
                                  typeLabel = 'STOCK · India';
                                  typeColor = const Color(0xFF0EA5E9); // blue
                                } else if (name.contains('Solana') || name.contains('Cardano')) {
                                  typeLabel = 'CRYPTO · DeFi';
                                  typeColor = const Color(0xFF7C3AED); // purple
                                } else if (name.contains('SBI') || name.contains('ESG')) {
                                  typeLabel = 'FUND · ESG';
                                  typeColor = const Color(0xFF22C55E); // green
                                } else if (name.contains('Gold')) {
                                  typeLabel = 'GOLD · Safe';
                                  typeColor = const Color(0xFFEAB308); // yellow
                                } else {
                                  typeLabel = 'ASSET';
                                  typeColor = Colors.white54;
                                }
                                
                                return Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: typeColor.withOpacity(0.15),
                                  ),
                                  child: Text(
                                    typeLabel,
                                    style: TextStyle(fontSize: 11, color: typeColor, fontWeight: FontWeight.w600),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                      Text(
                        '${priceData['change']}%',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: color,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}