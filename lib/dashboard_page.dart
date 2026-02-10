import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'portfolio_page.dart';
import 'price_service.dart';
import 'learn_page.dart';
import 'news_page.dart';

class DashboardPage extends StatefulWidget {
  final bool isStagingActive;
  const DashboardPage({super.key, this.isStagingActive = false});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _selectedIndex = 0;
  
  // Pages for the navigation
  // Note: We use indexed stack or simple switching. 
  // PortfolioPage, NewsPage, LearnPage need to be imported.
  // Pages for the navigation
  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _pages = [
      DashboardHome(isStagingActive: widget.isStagingActive),
      const PortfolioPage(),
      const NewsPage(),
      const LearnPage(),
    ];
  }

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
  final bool isStagingActive;
  const DashboardHome({super.key, this.isStagingActive = false});

  @override
  State<DashboardHome> createState() => _DashboardHomeState();
}

class _DashboardHomeState extends State<DashboardHome> {
  @override
  int _selectedTimePeriod = 1; // 0: 1Y, 1: 3Y, 2: 5Y, 3: 10Y

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          // Ambient Background
          Positioned(top: -100, right: -50, child: _buildBgCircle(const Color(0xFF7C3AED), 300)),
          Positioned(top: 200, left: -50, child: _buildBgCircle(const Color(0xFF0EA5E9), 200)),

          SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Column(
                children: [
              // Top bar with back button
              // Top bar with back button
              Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    const Expanded(
                      child: Text(
                        'Salary Pilot Dashboard',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          letterSpacing: -0.5,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        color: const Color(0xFF22C55E).withOpacity(0.15),
                        border: Border.all(color: const Color(0xFF22C55E).withOpacity(0.5), width: 1),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.flight_takeoff, size: 14, color: Color(0xFF22C55E)),
                          SizedBox(width: 6),
                          Text('ON', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF22C55E))),
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
                  padding: const EdgeInsets.all(20), // Reduced from 24
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(24),
                    color: Colors.white.withOpacity(0.03),
                    border: Border.all(color: Colors.white.withOpacity(0.05)),
                  ),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: const Color(0xFF7C3AED).withOpacity(0.15),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Icon(Icons.pie_chart, color: Color(0xFF7C3AED), size: 20),
                          ),
                          const SizedBox(width: 12),
                          const Text(
                            'CURRENT ALLOCATION',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: 1.1, color: Colors.white70),
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildLegendItem('Spending', const Color(0xFF22C55E)),
                          const SizedBox(width: 12),
                          _buildLegendItem('Savings', const Color(0xFF0EA5E9)),
                          const SizedBox(width: 12),
                          _buildLegendItem('Investing', const Color(0xFFF97316)),
                        ],
                      ),

                      const SizedBox(height: 16),

                      // Simple holdings growth chart
                      // Comparison Bar Chart Section
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _buildTimePeriodToggle(),
                            const SizedBox(height: 16),
                            const Text(
                              'Salary Pilot: AI-Optimized Growth Projection',
                              style: TextStyle(fontSize: 13, color: Colors.white70),
                            ),
                            const SizedBox(height: 16),
                            _buildComparisonBarChart(),
                            const SizedBox(height: 16),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _buildLegendItem("Invested", const Color(0xFFEAB308)),
                                const SizedBox(width: 16),
                                _buildLegendItem("Profit", const Color(0xFF22C55E)),
                                const SizedBox(width: 16),
                                _buildLegendItem("Loss", const Color(0xFFF97316)),
                              ],
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
                          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            color: const Color(0xFFF97316).withOpacity(0.1),
                            border: Border.all(color: const Color(0xFFF97316).withOpacity(0.3)),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              // Left side: Icon + Text
                              Flexible(
                                child: Row(
                                  children: [
                                    const Icon(Icons.trending_up, size: 16, color: Color(0xFFF97316)),
                                    const SizedBox(width: 8),
                                    Flexible(
                                      child: Text(
                                        '₹15,000 Investing (30%)',
                                        style: const TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w600,
                                          color: Color(0xFFF97316),
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              // Right side: APY + Arrow
                              Row(
                                children: [
                                  const Text('13.8% APY', style: TextStyle(fontSize: 12, color: Color(0xFFF97316))),
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
                      padding: EdgeInsets.only(left: 4, bottom: 12),
                      child: Text(
                        "AI COACH ALERTS",
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.1,
                          color: Colors.white54,
                        ),
                      ),
                    ),
                    buildAICoachInsights(),

                    const SizedBox(height: 24),

                    // Quarterly Pulse (Staging) Progress
                    if (widget.isStagingActive) ...[
                      _buildStagingProgressCard(),
                      const SizedBox(height: 24),
                    ],

                    // Next month rebalance
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(24),
                        gradient: LinearGradient(
                          colors: [const Color(0xFF7C3AED).withOpacity(0.9), const Color(0xFFEC4899).withOpacity(0.9)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        boxShadow: [BoxShadow(color: const Color(0xFF7C3AED).withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))],
                      ),
                      child: Column(
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.insights, color: Colors.white, size: 24),
                              SizedBox(width: 12),
                              Text('Next Month Optimizer', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white)),
                            ],
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            '13.8% APY possible (+₹320 extra)',
                            style: TextStyle(fontSize: 15, color: Colors.white70),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            height: 50,
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                elevation: 0,
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => const PortfolioPage()),
                                );
                              },
                              child: const Text(
                                'Apply Next Month Plan',
                                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Color(0xFF7C3AED)),
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

  Widget _buildStagingProgressCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF0EA5E9).withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF0EA5E9).withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("QUARTERLY PULSE PROGRESS", style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0EA5E9))),
              Text("66% Done", style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: const Color(0xFF0EA5E9).withOpacity(0.8))),
            ],
          ),
          const SizedBox(height: 12),
          LinearProgressIndicator(
            value: 0.66, // Simulated Month 2 of 3
            backgroundColor: Colors.white10,
            color: const Color(0xFF0EA5E9),
            minHeight: 6,
            borderRadius: BorderRadius.circular(3),
          ),
          const SizedBox(height: 12),
          const Text("NPU Suggestion: Keep staging. Target bulk split in 14 days.", style: TextStyle(fontSize: 12, color: Colors.white70)),
        ],
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
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        color: Colors.white.withOpacity(0.03),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 20)],
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

  Widget _buildTimePeriodToggle() {
    final periods = ['1M', '2M', '3M', '4M'];
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(periods.length, (index) {
        final isSelected = _selectedTimePeriod == index;
        return GestureDetector(
          onTap: () => setState(() => _selectedTimePeriod = index),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 4),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: isSelected ? const Color(0xFF7C3AED) : Colors.transparent,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: isSelected ? const Color(0xFF7C3AED) : Colors.white24),
            ),
            child: Text(
              periods[index],
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: isSelected ? Colors.white : Colors.white60,
              ),
            ),
          ),
        );
      }),
    );
  }

  Widget _buildComparisonBarChart() {
    // Mock Data based on Time Period for User Assets
    // Assets: Reliance (Rel), Solana (Sol), Cardano (Ada), SBI (SBI), Gold (Gold)
    // Base Invested Amounts:
    // Rel: 5000, Sol: 3500, Ada: 2800, SBI: 2000, Gold: 300
    
    // Multipliers for different time periods (Mocked for demo - Monthly)
    // 1M: Rel 1.02, Sol 1.04, Ada 1.03, SBI 1.01, Gold 1.005
    // 2M: Rel 1.05, Sol 1.10, Ada 1.08, SBI 1.03, Gold 1.01
    // 3M: Rel 1.12, Sol 1.18, Ada 1.14, SBI 1.05, Gold 1.02
    // 4M: Rel 1.24, Sol 1.28, Ada 1.20, SBI 1.07, Gold 1.05 (Current)

    List<double> multipliers;
    switch (_selectedTimePeriod) {
      case 0: multipliers = [1.02, 1.04, 1.03, 1.01, 1.005]; break; // 1M
      case 1: multipliers = [1.05, 1.10, 1.08, 1.03, 1.01]; break; // 2M
      case 2: multipliers = [1.12, 1.18, 1.14, 1.05, 1.02]; break; // 3M
      case 3: default: multipliers = [1.24, 1.28, 1.20, 1.075, 1.05]; break; // 4M
    }

    final investedAmounts = [5000.0, 3500.0, 2800.0, 2000.0, 300.0];
    final titles = ['Rel', 'Sol', 'Ada', 'SBI', 'Gold'];
    
    // Calculate max Y for scaling
    double maxY = 0;
    for (int i = 0; i < 5; i++) {
      double currentVal = investedAmounts[i] * multipliers[i];
      if (currentVal > maxY) maxY = currentVal;
    }

    return SizedBox(
      height: 220,
      child: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: maxY * 1.3, // Extra space for labels
          barTouchData: BarTouchData(enabled: false), // Disable touch for cleaner look
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  if (value.toInt() >= titles.length) return const SizedBox();
                  int index = value.toInt();
                  double currentVal = investedAmounts[index] * multipliers[index];
                  double profitPercent = (multipliers[index] - 1) * 100;
                  
                  return Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Column(
                      children: [
                        Text(titles[index], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                        const SizedBox(height: 2),
                        Text('₹${currentVal.round()}', style: const TextStyle(color: Colors.white70, fontSize: 10)),
                        Text('+${profitPercent.toStringAsFixed(1)}%', style: const TextStyle(color: Color(0xFF22C55E), fontSize: 10, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  );
                },
                reservedSize: 60,
              ),
            ),
            leftTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          ),
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: maxY / 4, // Dynamic grid lines
            getDrawingHorizontalLine: (value) => FlLine(color: Colors.white10, strokeWidth: 1),
          ),
          borderData: FlBorderData(show: false),
          barGroups: List.generate(5, (index) {
             double invested = investedAmounts[index];
             double profit = invested * (multipliers[index] - 1);
             return _buildBarGroup(index, invested, profit);
          }),
        ),
      ),
    );
  }

  BarChartGroupData _buildBarGroup(int x, double invested, double profit) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: invested + profit,
          width: 20, // Slightly thinner bars to fit 5 items
          color: const Color(0xFF22C55E), // Profit color (Green)
          rodStackItems: [
            BarChartRodStackItem(0, invested, const Color(0xFFEAB308)), // Invested color (Yellow)
            BarChartRodStackItem(invested, invested + profit, const Color(0xFF22C55E)), // Profit
          ],
          borderRadius: BorderRadius.circular(4),
        ),
      ],
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
                                
                                return Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(10),
                                        color: typeColor.withOpacity(0.15),
                                      ),
                                      child: Text(
                                        typeLabel,
                                        style: TextStyle(fontSize: 11, color: typeColor, fontWeight: FontWeight.w600),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(10),
                                        color: Colors.orange.withOpacity(0.15),
                                      ),
                                      child: Text(
                                        name.contains('Solana') || name.contains('Cardano') ? 'Tax: 30% + 1% TDS' : 'Tax: 12.5% LTCG',
                                        style: const TextStyle(fontSize: 10, color: Colors.orange, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ],
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