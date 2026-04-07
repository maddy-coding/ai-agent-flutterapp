import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/glass_container.dart';

class TemplateManagerScreen extends StatelessWidget {
  const TemplateManagerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Smart Templates'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {},
          )
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Text(
            'Templates help the AI agent respond with your personal tone.',
            style: TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 24),
          _buildTemplateCard(
            'Out of Office (Short)',
            'Hi {{sender_name}}, I am out of the office today. I will review this tomorrow.',
            ['{{sender_name}}'],
          ),
          const SizedBox(height: 16),
          _buildTemplateCard(
            'Follow-up Request',
            'Thanks for reaching out! Could you please provide more context regarding {{subject}} so I can look into it?',
            ['{{subject}}'],
          ),
        ],
      ),
    );
  }

  Widget _buildTemplateCard(String title, String content, List<String> variables) {
    return GlassContainer(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              IconButton(onPressed: () {}, icon: const Icon(Icons.edit, size: 20))
            ],
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: TextStyle(color: AppTheme.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            children: variables.map((v) => Chip(
              label: Text(v, style: const TextStyle(fontSize: 12)),
              backgroundColor: AppTheme.primary.withOpacity(0.2),
              side: BorderSide.none,
            )).toList(),
          )
        ],
      ),
    );
  }
}
