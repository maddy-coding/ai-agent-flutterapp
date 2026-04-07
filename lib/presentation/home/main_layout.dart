import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../dashboard/dashboard_screen.dart';
import '../inbox/unified_inbox_screen.dart';
import '../integrations/account_integration_screen.dart';
import '../template_manager/template_manager_screen.dart';
import '../settings/agent_settings_screen.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(),
    const UnifiedInboxScreen(),
    const TemplateManagerScreen(),
    const AccountIntegrationScreen(),
    const AgentSettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              color: Colors.white.withOpacity(0.1),
              width: 1,
            ),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard_outlined),
              activeIcon: Icon(Icons.dashboard),
              label: 'Command',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.all_inbox_outlined),
              activeIcon: Icon(Icons.all_inbox),
              label: 'Inbox',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.auto_awesome_motion_outlined),
              activeIcon: Icon(Icons.auto_awesome_motion),
              label: 'Templates',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.link_outlined),
              activeIcon: Icon(Icons.link),
              label: 'Accounts',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings_outlined),
              activeIcon: Icon(Icons.settings),
              label: 'Agent',
            ),
          ],
        ),
      ),
    );
  }
}
