import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/glass_container.dart';

class AgentSettingsScreen extends StatefulWidget {
  const AgentSettingsScreen({super.key});

  @override
  State<AgentSettingsScreen> createState() => _AgentSettingsScreenState();
}

class _AgentSettingsScreenState extends State<AgentSettingsScreen> {
  bool _ghostModeEnabled = false;
  bool _sentimentGuardEnabled = true;
  bool _batchProcessing = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Agent Settings'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Text(
            'Configure how the Omni-Reply Agent behaves.',
            style: TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 24),
          _buildToggleSetting(
            title: '"Ghost Mode" Automation',
            subtitle: 'AI replies to safe contacts automatically without asking.',
            icon: Icons.auto_awesome_motion,
            value: _ghostModeEnabled,
            onChanged: (v) => setState(() => _ghostModeEnabled = v),
          ),
          const SizedBox(height: 16),
          _buildToggleSetting(
            title: 'Sentiment Guard',
            subtitle: 'Highlight angry or dissatisfied messages for manual review.',
            icon: Icons.shield,
            value: _sentimentGuardEnabled,
            onChanged: (v) => setState(() => _sentimentGuardEnabled = v),
            iconColor: Colors.orangeAccent,
          ),
          const SizedBox(height: 16),
          _buildToggleSetting(
            title: 'Batch Processing',
            subtitle: 'Summarize emails in batches at scheduled times.',
            icon: Icons.layers,
            value: _batchProcessing,
            onChanged: (v) => setState(() => _batchProcessing = v),
          ),
          const SizedBox(height: 32),
          GlassContainer(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Local Context Model',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Using Custom MCP Bridge (Android)',
                  style: TextStyle(color: AppTheme.textSecondary, fontSize: 14),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: () {},
                    child: const Text('Configure MCP Connection'),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildToggleSetting({
    required String title,
    required String subtitle,
    required IconData icon,
    required bool value,
    required ValueChanged<bool> onChanged,
    Color iconColor = AppTheme.primary,
  }) {
    return GlassContainer(
      child: Row(
        children: [
          Icon(icon, color: iconColor),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: AppTheme.primary,
          ),
        ],
      ),
    );
  }
}
