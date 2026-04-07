import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'presentation/home/main_layout.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Hive Initialization would go here if we were running it
  // await Hive.initFlutter();

  runApp(
    const ProviderScope(
      child: OmniReplyApp(),
    ),
  );
}

class OmniReplyApp extends StatelessWidget {
  const OmniReplyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Omni-Reply AI Agent',
      themeMode: ThemeMode.dark,
      darkTheme: AppTheme.darkTheme,
      home: const MainLayout(),
      debugShowCheckedModeBanner: false,
    );
  }
}
