import 'dart:convert';
import 'package:http/http.dart' as http;

class AIService {
  static const String _apiKey = "YOUR_GEMINI_API_KEY"; // Replace with your key
  static const String _url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$_apiKey";

  static Future<Map<String, dynamic>> runAllAgents({
    required double salary,
    required double riskLevel, // 0.0 to 1.0
    required List<String> holdings,
  }) async {
    final prompt = """
    Act as 4 collaborating AI Agents for a salary optimizer app:
    1. Risk Profiler: Analyze salary $salary and risk score $riskLevel.
    2. Portfolio Builder: Suggest 5 sustainable assets (India stocks/ETFs/Crypto).
    3. Tax Expert: Explain tax (LTCG/STCG) for these assets.
    4. Market News Forecaster: Predict next month's bull/bear run in %.

    Format the response as a JSON object with keys: 
    'split': {'spend': 40, 'save': 30, 'invest': 30},
    'portfolio': [{'name': 'Tata Solar', 'allocation': 25, 'reason': '...'}],
    'tax_advice': '...',
    'next_month_prediction': 8.5
    """;

    try {
      // Check if API key is set
      if (_apiKey == "YOUR_GEMINI_API_KEY" || _apiKey.isEmpty) {
        // Return mock data for demo/hackathon immediately if no key
        return _getMockData();
      }

      final response = await http.post(
        Uri.parse(_url),
        body: jsonEncode({
          "contents": [{"parts": [{"text": prompt}]}]
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['candidates'] != null && data['candidates'].isNotEmpty) {
           String textResponse = data['candidates'][0]['content']['parts'][0]['text'];
           // Clean JSON string if LLM adds markdown backticks
           textResponse = textResponse.replaceAll('```json', '').replaceAll('```', '');
           return jsonDecode(textResponse);
        }
      }
      
      print("AI API Failed: ${response.body}");
      return _getMockData(); // Fallback on failure
      
    } catch (e) {
      print("AI Service Error: $e");
      return _getMockData(); // Fallback on error
    }
  }

  static Map<String, dynamic> _getMockData() {
    // Mock response to ensure the app works for the jury without an API key
    return {
      'split': {'spend': 45, 'save': 25, 'invest': 30},
      'portfolio': [
        {'name': 'Tata Power', 'allocation': 20, 'reason': 'Strong renewable push'},
        {'name': 'Solana', 'allocation': 20, 'reason': 'High growth potential'},
        {'name': 'Gold Bees', 'allocation': 15, 'reason': 'Stability'},
      ],
      'tax_advice': 'Long Term Capital Gains (LTCG) above ₹1 Lakh on equity is taxed at 12.5% (new regime). Short term crypto gains are taxed flat 30%.',
      'next_month_prediction': 12.5
    };
  }
}
