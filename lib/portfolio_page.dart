import 'package:flutter/material.dart';
import 'price_service.dart';

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
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
        child: CustomScrollView(
          slivers: [
            const SliverAppBar(
              expandedHeight: 120,
              floating: false,
              pinned: true,
              backgroundColor: Color(0xFF050816),
              flexibleSpace: FlexibleSpaceBar(
                title: Text(
                  'Portfolio Details',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                ),
                centerTitle: false,
              ),
            ),
            
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Portfolio summary
                    _buildSummaryCard(),
                    const SizedBox(height: 20),
                    
                    // Asset list
                    const Text(
                      'Your Assets',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 16),
                    ..._buildAssetList(),
                    const SizedBox(height: 24),
                    
                    // Masumi Blockchain section
                    _buildBlockchainSection(),
                    const SizedBox(height: 24),
                    
                    // Rebalance button
                    _buildRebalanceButton(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: LinearGradient(
          colors: [const Color(0xFF22C55E).withOpacity(0.9), const Color(0xFF16A34A).withOpacity(0.9)],
        ),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 8))],
      ),
      child: const Column(
        children: [
          Row(
            children: [
              Icon(Icons.analytics, color: Colors.white, size: 24),
              SizedBox(width: 12),
              Text('Portfolio Performance', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
            ],
          ),
          SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Total Value', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  Text('₹16,980', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Monthly Return', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  Text('13.8%', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('CO₂ Saved', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  Text('0.9 tons', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  List<Widget> _buildAssetList() {
    return [
      StreamBuilder<Map<String, dynamic>>(
        stream: PriceService().priceStream,
        builder: (context, snapshot) {
          final prices = snapshot.data ?? PriceService().getCurrentPrices();
          final assets = [
            {'name': 'Reliance Green Energy', 'type': 'EQUITY'},
            {'name': 'Solana Green Lending', 'type': 'VDA'}, // Virtual Digital Asset
            {'name': 'Cardano ESG Pool', 'type': 'VDA'},
            {'name': 'SBI Magnum ESG', 'type': 'EQUITY'},
            {'name': 'Digital Gold', 'type': 'COMMODITY'},
          ];
          
          return Column(
            children: assets.map((asset) {
              final name = asset['name']!;
              final type = asset['type']!;
              final priceData = prices[name] ?? {'price': 0, 'change': '0'};
              
              // --- TAX PREVIEW LOGIC ---
              double estimatedProfit = (priceData['price'] as num) * 0.15; // Mock profit for demo
              String taxPreview = "";
              
              if (type == 'VDA') {
                 // 30% Tax on Profit + 1% TDS on Total Sale
                double tax = (estimatedProfit * 0.30) + (priceData['price'] * 0.01);
                taxPreview = "Tax: ₹${tax.round()} (30% + 1% TDS)";
              } else if (type == 'EQUITY') {
                // 12.5% LTCG (assuming > 1.25L threshold met for demo)
                double tax = estimatedProfit * 0.125;
                taxPreview = "Tax: ₹${tax.round()} (12.5% LTCG)";
              } else {
                taxPreview = "Tax: Slab Rates apply";
              }

              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  color: Colors.white.withOpacity(0.04),
                  border: Border.all(color: Colors.white.withOpacity(0.1)),
                ),
                child: Row(
                  children: [
                    Text(
                      name == 'Reliance Green Energy' ? '📈' : 
                      name == 'Solana Green Lending' ? '🌿' :
                      name == 'Cardano ESG Pool' ? '🔗' :
                      name == 'SBI Magnum ESG' ? '💰' : '🥇',
                      style: const TextStyle(fontSize: 20)
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                          Text(taxPreview, style: const TextStyle(fontSize: 11, color: Colors.orangeAccent)),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('₹${priceData['price']}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                        Text('${priceData['change']}%', style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: double.tryParse(priceData['change'].toString())?.isNegative == true 
                              ? const Color(0xFFF97316) 
                              : const Color(0xFF22C55E),
                        )),
                      ],
                    ),
                  ],
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
          children: [
            const Icon(Icons.link, color: Color(0xFF7C3AED), size: 20),
            const SizedBox(width: 8),
            const Text('Masumi Blockchain', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const Spacer(),
            TextButton(
              onPressed: () {},
              child: const Text('View Explorer', style: TextStyle(color: Color(0xFF7C3AED))),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              colors: [const Color(0xFF7C3AED).withOpacity(0.1), Colors.transparent],
            ),
            border: Border.all(color: const Color(0xFF7C3AED).withOpacity(0.3)),
          ),
          child: Column(
            children: [
              const Row(
                children: [
                  Icon(Icons.verified, color: Color(0xFF22C55E), size: 18),
                  SizedBox(width: 8),
                  Text('Live on Cardano Testnet', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Latest Tx', style: TextStyle(fontSize: 11, color: Colors.white60)),
                        const SizedBox(height: 4),
                        GestureDetector(
                          onTap: () {},
                          child: Text(
                            'cardano-scan.io/tx/abc123def456...',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: const Color(0xFF7C3AED),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        const Text('AI Agent Fees', style: TextStyle(fontSize: 11, color: Colors.white60)),
                        const SizedBox(height: 4),
                        const Text('₹45 (0.3%)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Colors.white)),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRebalanceButton() {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF22C55E),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          elevation: 8,
        ),
        icon: const Icon(Icons.refresh, color: Colors.white),
        label: const Text(
          'Rebalance to 14.1% APY Next Month',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('✅ Next month plan applied!'),
              backgroundColor: Color(0xFF22C55E),
              duration: Duration(seconds: 2),
            ),
          );
        },
      ),
    );
  }
}