import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/glass_container.dart';

class AccountIntegrationScreen extends StatefulWidget {
  const AccountIntegrationScreen({super.key});

  @override
  State<AccountIntegrationScreen> createState() => _AccountIntegrationScreenState();
}

class _AccountIntegrationScreenState extends State<AccountIntegrationScreen> {
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _authenticate();
  }

  Future<void> _authenticate() async {
    // Stub for local_auth (Biometrics)
    await Future.delayed(const Duration(milliseconds: 500));
    setState(() {
      _isAuthenticated = true; // In reality, depends on biometric result
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isAuthenticated) {
      return const Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.fingerprint, size: 80, color: AppTheme.primary),
              SizedBox(height: 16),
              Text('Unlock to view accounts'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Account Integrations'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Text(
            'Connect your channels for Omni-Reply to monitor and triage.',
            style: TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 24),
          _buildIntegrationCard('Gmail', Icons.email, Colors.red, true),
          const SizedBox(height: 16),
          _buildIntegrationCard('WhatsApp Business', Icons.chat, Colors.green, false),
          const SizedBox(height: 16),
          _buildIntegrationCard('X (Twitter) DMs', Icons.alternate_email, Colors.lightBlue, false),
          const SizedBox(height: 16),
          _buildIntegrationCard('Messenger', Icons.message, Colors.blueAccent, true),
        ],
      ),
    );
  }

  Widget _buildIntegrationCard(String title, IconData icon, Color color, bool isConnected) {
    return GlassContainer(
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: color.withOpacity(0.2),
            child: Icon(icon, color: color),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: isConnected ? Colors.transparent : AppTheme.primary,
              elevation: isConnected ? 0 : 2,
              side: isConnected ? BorderSide(color: Colors.white.withOpacity(0.2)) : null,
            ),
            child: Text(isConnected ? 'Connected' : 'Connect'),
          )
        ],
      ),
    );
  }
}
