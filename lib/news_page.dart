import 'package:flutter/material.dart';

class NewsPage extends StatefulWidget {
  const NewsPage({super.key});

  @override
  State<NewsPage> createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> {
  // Centralized News Data prioritized by Portfolio Impact
  final List<Map<String, dynamic>> _portfolioNews = [
    {
      "title": "Govt Announces 20% Solar Subsidy",
      "asset": "Tata Power Solar",
      "status": "BULLISH",
      "impact": "+8.5%",
      "color": Colors.green,
      "desc": "Directly boosts Tata Power Solar margins. Portfolio expected to gain +₹1,240."
    },
    {
      "title": "Solana Green Lending Liquidity Surge",
      "asset": "Solana",
      "status": "BULLISH",
      "impact": "+12.0%",
      "color": Colors.green,
      "desc": "Institutional inflow detected in sustainable DeFi protocols, boosting Solana's TVL."
    },
    {
      "title": "RBI Crypto Guidelines Update",
      "asset": "Crypto Assets",
      "status": "NEUTRAL",
      "impact": "-0.5%",
      "color": Colors.orange,
      "desc": "New framework for VDA (Virtual Digital Assets) introduces 1% TDS clarity."
    }
  ];

  final List<Map<String, dynamic>> _globalNews = [
    {"title": "US Fed Interest Rates Steady", "status": "NEUTRAL", "impact": "0.0%", "color": Colors.orange, "source": "Reuters"},
    {"title": "India GDP Growth Forecast at 7.2%", "status": "BULLISH", "impact": "+1.2%", "color": Colors.green, "source": "Bloomberg"},
    {"title": "Global Tech Sell-off in US", "status": "BEARISH", "impact": "-2.1%", "color": Colors.red, "source": "CNBC"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: CustomScrollView(
        slivers: [
          const SliverAppBar(
            backgroundColor: Color(0xFF050816),
            floating: true,
            title: Text("AI News Forecaster", style: TextStyle(fontWeight: FontWeight.bold)),
          ),

          // 1. PRIMARY FOCUS: PORTFOLIO IMPACT
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text("Your Portfolio Impact", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  // Top Hero Impact Story
                  _buildHeroNewsCard(_portfolioNews.first),
                ],
              ),
            ),
          ),

          // 2. OTHER PORTFOLIO ASSET ALERTS
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => _buildCompactPortfolioTile(_portfolioNews[index + 1]),
              childCount: _portfolioNews.length - 1,
            ),
          ),

          // 3. SECONDARY FOCUS: GLOBAL NEWS
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 32, 20, 16),
              child: const Text("Global Market Pulse", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
          ),

          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => _buildGlobalNewsTile(_globalNews[index]),
              childCount: _globalNews.length,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 40)),
        ],
      ),
    );
  }

  // --- UI COMPONENTS ---

  Widget _buildHeroNewsCard(Map<String, dynamic> item) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: (item['color'] as Color).withOpacity(0.3)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildSentimentChip(item['status'], item['color']),
                Text(item['asset'], style: const TextStyle(color: Colors.white38, fontSize: 12, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            Text(item['title'], style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(item['desc'], style: const TextStyle(color: Colors.white60)),
            const Divider(height: 32, color: Colors.white10),
            Row(
              children: [
                const Text("Est. Portfolio Gain: ", style: TextStyle(color: Colors.white60)),
                Text(item['impact'], style: TextStyle(color: item['color'], fontWeight: FontWeight.bold, fontSize: 18)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCompactPortfolioTile(Map<String, dynamic> item) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white.withOpacity(0.03), borderRadius: BorderRadius.circular(16)),
      child: Row(
        children: [
          _buildMiniSentimentIcon(item['status'], item['color']),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item['title'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              Text(item['asset'], style: const TextStyle(color: Colors.white38, fontSize: 11)),
            ]),
          ),
          Text(item['impact'], style: TextStyle(color: item['color'], fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildGlobalNewsTile(Map<String, dynamic> item) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      padding: const EdgeInsets.all(12),
      child: Row(
        children: [
          Container(width: 4, height: 30, color: (item['color'] as Color).withOpacity(0.5)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item['title'], style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
              Text(item['source'], style: const TextStyle(color: Colors.white24, fontSize: 10)),
            ]),
          ),
          Text(item['impact'], style: TextStyle(color: item['color'], fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildSentimentChip(String label, Color color) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: color.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
    child: Text(label, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 10)),
  );

  Widget _buildMiniSentimentIcon(String status, Color color) => Icon(
    status == "BULLISH" ? Icons.trending_up : Icons.trending_down,
    color: color,
    size: 20,
  );
}
