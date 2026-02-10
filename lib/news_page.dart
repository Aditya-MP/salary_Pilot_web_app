import 'dart:ui';
import 'package:flutter/material.dart';

class NewsPage extends StatefulWidget {
  const NewsPage({super.key});

  @override
  State<NewsPage> createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> with TickerProviderStateMixin {
  final List<Map<String, dynamic>> _portfolioNews = [
    {
      "title": "Govt Announces 20% Solar Subsidy",
      "asset": "Tata Power Solar",
      "status": "BULLISH",
      "impact": "+8.5%",
      "color": const Color(0xFF22C55E),
      "desc": "Directly boosts Tata Power Solar margins. Portfolio expected to gain +₹1,240 this quarter.",
      "time": "2h ago",
      "category": "Energy"
    },
    {
      "title": "Solana Green Lending Liquidity Surge",
      "asset": "Solana",
      "status": "BULLISH",
      "impact": "+12.0%",
      "color": const Color(0xFF22C55E),
      "desc": "Institutional inflow detected in sustainable DeFi protocols.",
      "time": "4h ago",
      "category": "DeFi"
    },
    {
      "title": "RBI Crypto Guidelines Update",
      "asset": "Crypto Assets",
      "status": "NEUTRAL",
      "impact": "-0.5%",
      "color": const Color(0xFFF97316),
      "desc": "New framework for VDA (Virtual Digital Assets) introduces 1% TDS clarity.",
      "time": "6h ago",
      "category": "Regulation"
    }
  ];

  final List<Map<String, dynamic>> _globalNews = [
    {"title": "US Fed Interest Rates Steady", "status": "NEUTRAL", "impact": "0.0%", "color": const Color(0xFFF97316), "source": "Reuters", "time": "1h ago", "category": "Policy"},
    {"title": "India GDP Growth Forecast 7.2%", "status": "BULLISH", "impact": "+1.2%", "color": const Color(0xFF22C55E), "source": "Bloomberg", "time": "3h ago", "category": "Economy"},
    {"title": "Global Tech Sell-off in US", "status": "BEARISH", "impact": "-2.1%", "color": const Color(0xEFF4335), "source": "CNBC", "time": "5h ago", "category": "Markets"},
  ];

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
          Positioned(top: -150, right: -100, child: _buildBgCircle(const Color(0xFF4F46E5), 400, -30)),
          Positioned(top: 200, left: -100, child: _buildBgCircle(const Color(0xFF0EA5E9), 300, 30)),
          
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              _buildAppBar(),
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                sliver: SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 10),
                    _buildBoxTitle("PORTFOLIO IMPACT", Icons.pie_chart_outline),
                    const SizedBox(height: 20),
                    FadeTransition(
                      opacity: _heroAnimation,
                      child: _buildModernHeroCard(_portfolioNews.first),
                    ),
                    const SizedBox(height: 24),
                  ]),
                ),
              ),
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) => _buildModernNewsTile(_portfolioNews[index + 1], index),
                  childCount: _portfolioNews.length - 1,
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 40, 20, 16),
                sliver: SliverToBoxAdapter(child: _buildBoxTitle("GLOBAL MARKETS", Icons.public)),
              ),
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) => _buildGlobalTickerTile(_globalNews[index], index),
                  childCount: _globalNews.length,
                ),
              ),
              const SliverToBoxAdapter(child: SizedBox(height: 80)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAppBar() {
    return SliverAppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      centerTitle: false,
      expandedHeight: 80,
      floating: true,
      flexibleSpace: FlexibleSpaceBar(
        titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withOpacity(0.1)),
              ),
              child: const Icon(Icons.newspaper, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            const Text(
              "Financial Brief",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.5),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBgCircle(Color color, double size, double offset) {
    return AnimatedBuilder(
      animation: _heroAnimationController,
      builder: (context, child) => Transform.translate(
        offset: Offset(offset * (1 - _heroAnimation.value), 0),
        child: Opacity(
          opacity: 0.15 * _heroAnimation.value,
          child: ImageFiltered(
            imageFilter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
            child: Container(
              width: size, height: size,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBoxTitle(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, size: 16, color: const Color(0xFF7C3AED)),
        const SizedBox(width: 8),
        Text(
          title, 
          style: const TextStyle(
            fontSize: 13, 
            fontWeight: FontWeight.w800, 
            color: Colors.white70, 
            letterSpacing: 1.1
          )
        ),
        const SizedBox(width: 12),
        Expanded(child: Container(height: 1, color: Colors.white.withOpacity(0.1))),
      ],
    );
  }

  Widget _buildModernHeroCard(Map<String, dynamic> item) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24), // Global standard
        gradient: LinearGradient(
          colors: [
            const Color(0xFF1E1B4B).withOpacity(0.9),
            const Color(0xFF312E81).withOpacity(0.6),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF312E81).withOpacity(0.3),
            blurRadius: 20, // Reduced blur
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Padding(
            padding: const EdgeInsets.all(16), // Reduced padding (24->16)
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), // Reduced padding
                      decoration: BoxDecoration(
                        color: const Color(0xFF4F46E5),
                        borderRadius: BorderRadius.circular(6),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF4F46E5).withOpacity(0.4),
                            blurRadius: 8,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      child: const Text("TOP STORY", style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
                    ),
                    Text(item['time'], style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12, fontWeight: FontWeight.w500)),
                  ],
                ),
                const SizedBox(height: 12), // Reduced spacing (20->12)
                Text(
                  item['title'],
                  style: const TextStyle(
                    fontSize: 22, // Reduced font (26->22)
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    height: 1.1,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 8), // Reduced spacing (12->8)
                Text(
                  item['desc'],
                  style: TextStyle(
                    fontSize: 13, // Reduced font (15->13)
                    color: Colors.white.withOpacity(0.8),
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 16), // Reduced spacing (24->16)
                Container(
                  padding: const EdgeInsets.all(12), // Reduced padding (16->12)
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white.withOpacity(0.1)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8), // Reduced padding
                        decoration: BoxDecoration(
                          color: item['color'].withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(Icons.insights, color: item['color'], size: 18),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Portfolio Impact", style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 11)),
                            const SizedBox(height: 2),
                            Text(
                              item['impact'],
                              style: TextStyle(
                                color: item['color'],
                                fontSize: 18, // Reduced font (20->18)
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Text("Read Analysis", style: TextStyle(color: Colors.black, fontSize: 12, fontWeight: FontWeight.bold)),
                      ),
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

  Widget _buildModernNewsTile(Map<String, dynamic> item, int index) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 8), // Adjusted margin
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(20), // Global standard
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(16), // Reduced padding (20->16)
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: item['color'].withOpacity(0.15),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              item['category'].toUpperCase(),
                              style: TextStyle(color: item['color'], fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(item['time'], style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 11)),
                        ],
                      ),
                      const SizedBox(height: 8), // Reduced spacing
                      Text(
                        item['title'],
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.white, height: 1.3), // Reduced font
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item['asset'],
                        style: TextStyle(fontSize: 12, color: Colors.white.withOpacity(0.6)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      item['impact'],
                      style: TextStyle(
                        fontSize: 16, // Reduced font
                        fontWeight: FontWeight.w700,
                        color: item['color'],
                      ),
                    ),
                    const SizedBox(height: 4),
                    Icon(
                      item['status'] == "BULLISH" ? Icons.trending_up : Icons.trending_down,
                      color: item['color'].withOpacity(0.5),
                      size: 18,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGlobalTickerTile(Map<String, dynamic> item, int index) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 4), // Reduced margin
      padding: const EdgeInsets.all(12), // Reduced padding
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.02),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: item['color'], width: 4)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item['source'].toUpperCase(),
                  style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1),
                ),
                const SizedBox(height: 4),
                Text(
                  item['title'],
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: item['color'].withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              item['impact'],
              style: TextStyle(color: item['color'], fontSize: 13, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
