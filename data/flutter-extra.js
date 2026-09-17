window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.flutter = (window.QA_BANK.flutter || []).concat([
  {
    "id": "flu-103",
    "category": "flutter",
    "level": "basic",
    "topic": "Learn Dart",
    "question": "Do you need to learn Dart before Flutter?",
    "answer": "Yes enough Dart to be dangerous: null safety, `async`/`await`, collections, classes, mixins, and the widget constructor style. You do not need every language spec corner first.\n\nFlutter is not a Dart tutorial with extra steps — widgets, constraints, and rebuilds are the real skill. But you cannot skip Dart syntax.",
    "pdfTopic": false,
    "tags": [
      "dart"
    ]
  },
  {
    "id": "flu-104",
    "category": "flutter",
    "level": "basic",
    "topic": "Flutter vs React Native",
    "question": "How does Flutter compare with React Native?",
    "answer": "Flutter **paints its own pixels** with Impeller/Skia and ships a consistent UI. React Native uses **native views** plus a JS bridge (or JSI/Fabric). Flutter’s hot reload is typically faster and layouts are one system. RN may look more “platform native” out of the box and shares JS talent.\n\nNeither is universally “better.” Mention startup size, platform-view cost, and team skills.",
    "pdfTopic": false,
    "tags": [
      "react-native"
    ]
  },
  {
    "id": "flu-105",
    "category": "flutter",
    "level": "basic",
    "topic": "First build time",
    "question": "Why is the first Flutter build slow, and what are the android/ and ios/ folders?",
    "answer": "The first run downloads artifacts, compiles the engine, and compiles Kotlin/Swift host apps. Later **hot reload** is fast because it patches the Dart VM (debug JIT).\n\n`android/` and `ios/` are the **host projects** (Gradle/Xcode) that embed the Flutter engine. You edit them for permissions, flavors, icons, and native plugins. They are not optional on mobile.",
    "pdfTopic": false,
    "tags": [
      "tooling"
    ]
  },
  {
    "id": "flu-106",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Tween and physics",
    "question": "What is a Tween, and which animation represents real-world physics?",
    "answer": "A **Tween<T>** maps 0..1 to a begin/end value (Color, Offset, Size). Driven by an `AnimationController` (ticker). **Physics / spring simulations** (`SpringSimulation`, `BouncingScrollPhysics`) model real-world motion; tweens are just interpolation.\n\nImplicit widgets (`AnimatedContainer`) hide the controller. Explicit animations need a `TickerProvider` (`SingleTickerProviderStateMixin`).",
    "pdfTopic": false,
    "tags": [
      "animation",
      "tween"
    ]
  },
  {
    "id": "flu-107",
    "category": "flutter",
    "level": "basic",
    "topic": "main vs runApp",
    "question": "What is the difference between main() and runApp()?",
    "answer": "`main()` is the Dart **entry point**. `runApp(widget)` inflates the given widget as the root of the widget tree and attaches it to the screen (after `WidgetsFlutterBinding.ensureInitialized()` if you need plugins before runApp).\n\nYou can do async setup in `main` before `runApp`. `runApp` can be called again to replace the tree, but that is uncommon.",
    "pdfTopic": false,
    "tags": [
      "startup"
    ]
  },
  {
    "id": "flu-108",
    "category": "flutter",
    "level": "basic",
    "topic": "Axis alignment",
    "question": "When do you use mainAxisAlignment vs crossAxisAlignment?",
    "answer": "In a **Row**, main axis is horizontal; in a **Column**, main axis is vertical. `mainAxisAlignment` distributes children along that axis (`spaceBetween`, `center`). `crossAxisAlignment` aligns on the perpendicular axis (`stretch`, `start`).\n\n`MainAxisSize.min` vs `max` decides whether the flex widget takes all leftover space on the main axis. Unbounded constraints + `stretch` is a common error.",
    "pdfTopic": false,
    "tags": [
      "layout"
    ]
  },
  {
    "id": "flu-109",
    "category": "flutter",
    "level": "basic",
    "topic": "SizedBox vs Container",
    "question": "What is the difference between SizedBox and Container?",
    "answer": "`SizedBox` is a simple box with width/height (or a spacer). `Container` is a convenience combo: padding, margin, alignment, decoration, constraints, transform. If you only need size, **SizedBox is cheaper and clearer**.\n\n`Container` with no child and no size tries to be as big as possible — a classic layout surprise.",
    "pdfTopic": false,
    "tags": [
      "layout"
    ]
  },
  {
    "id": "flu-110",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Stream types",
    "question": "What are the two kinds of Dart Streams?",
    "answer": "**Single-subscription** streams allow one listener (file I/O, many controllers by default). **Broadcast** streams allow multiple listeners (`asBroadcastStream`, `StreamController.broadcast`).\n\nListening twice to a single-subscription stream throws. UI that has many subscribers (GoRouter refresh, auth) needs broadcast or a change-notifier instead.",
    "pdfTopic": false,
    "tags": [
      "streams"
    ]
  },
  {
    "id": "flu-111",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Why build is on State",
    "question": "Why is build() on State, not on StatefulWidget?",
    "answer": "The **widget** is immutable configuration and may be recreated every parent build. **State** is the long-lived object that holds fields and is `build`ing. If `build` lived on the widget, it would not see mutable state after the widget instance was replaced.\n\n`StatefulWidget.createState()` is called once; `State.build` is called many times.",
    "pdfTopic": false,
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "flu-112",
    "category": "flutter",
    "level": "basic",
    "topic": "Null-aware operators",
    "question": "What is the difference between `?`, `??`, and `?.` in Dart?",
    "answer": "- `T?` — nullable type.\n- `?.` — call/getter only if the receiver is non-null.\n- `??` — if-null: `a ?? b` uses `b` when `a` is null.\n- `??=` — assign if null.\n- `!` — promote, throw if null.\n\n`?` on types is not the same as the ternary `cond ? a : b`. Flutter interviews often mix these with widget `child:` optionals.",
    "pdfTopic": false,
    "tags": [
      "dart",
      "null"
    ]
  },
  {
    "id": "flu-113",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Ticker",
    "question": "Why does Flutter need a Ticker?",
    "answer": "A **Ticker** fires once per frame (vsync) so animations can advance with the display refresh. `AnimationController` requires a `TickerProvider`. `SingleTickerProviderStateMixin` on State is the usual source.\n\nWithout vsync, animations waste battery and can drift. Dispose the controller or you leak tickers.",
    "pdfTopic": false,
    "tags": [
      "animation"
    ]
  },
  {
    "id": "flu-114",
    "category": "flutter",
    "level": "basic",
    "topic": "kDebugMode",
    "question": "How do you run code only in debug, profile, or release?",
    "answer": "Use `kDebugMode`, `kProfileMode`, `kReleaseMode` from `foundation.dart`, or `assert(() { …; return true; }())` which is stripped from release. Do not rely on `assert` for security checks — they vanish in release.\n\n`debugPrint` throttles. `print` in release still costs. Tree shaking drops unused debug-only branches when they are compile-time constants.",
    "pdfTopic": false,
    "tags": [
      "debug"
    ]
  },
  {
    "id": "flu-115",
    "category": "flutter",
    "level": "basic",
    "topic": "WidgetsApp vs MaterialApp",
    "question": "What is the difference between WidgetsApp and MaterialApp?",
    "answer": "`WidgetsApp` is the low-level app widget: routing, text, locale, performance overlay — no Material chrome. **MaterialApp** (and **CupertinoApp**) wrap WidgetsApp with theme, navigator, default Material/Cupertino widgets, and scaffold-friendly routing.\n\nAlmost every production app uses MaterialApp or CupertinoApp (or both via a builder). Custom design systems may start from WidgetsApp.",
    "pdfTopic": false,
    "tags": [
      "app"
    ]
  },
  {
    "id": "flu-116",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Local databases",
    "question": "Which local database packages come up in Flutter interviews?",
    "answer": "- **sqflite** — SQLite FFI/plugin, SQL you write.\n- **drift** (Moor) — typed SQL, generators.\n- **hive / isar** — NoSQL, fast key-value (Isar is the usual successor story).\n- **shared_preferences** — not a database, small settings only.\n\nPick based on queries vs blobs. For server-shaped data, often Drift or sqflite plus a repository. Remember isolates for heavy decrypt/parse.",
    "pdfTopic": false,
    "tags": [
      "database"
    ]
  },
  {
    "id": "flu-117",
    "category": "flutter",
    "level": "basic",
    "topic": "Flutter advantages",
    "question": "What advantages of Flutter should you list — without sounding like a brochure?",
    "answer": "One codebase for mobile (and optionally web/desktop), fast debug-cycle hot reload, a consistent rendering pipeline, strong layout/animation APIs, and a large package ecosystem.\n\nBalance it: large AOT binaries, platform-view cost, some OS UI that still needs channels, and web/SEO limits. Interviewers prefer this over “Flutter is Google so it is best.”",
    "pdfTopic": false,
    "tags": [
      "overview"
    ]
  },
  {
    "id": "flu-118",
    "category": "flutter",
    "level": "basic",
    "topic": "Fat arrow",
    "question": "How does Dart’s fat-arrow syntax work for functions and getters?",
    "answer": "`=>` is a **single-expression** function body: `int get mango => 1;` or `int add(int a, int b) => a + b;`. It is not a special Flutter widget API.\n\nUse a block `{ return …; }` when you need multiple statements. Getters cannot take arguments; methods can.",
    "pdfTopic": false,
    "tags": [
      "dart",
      "syntax"
    ]
  },
  {
    "id": "flu-119",
    "category": "flutter",
    "level": "intermediate",
    "topic": "DevTools",
    "question": "What is Flutter DevTools used for?",
    "answer": "Browser/IDE tooling for **widget inspector**, rebuild counts, CPU/memory, network, logging, and the performance overlay (`DebugPaint`, timeline). You diagnose jank here before guessing.\n\nPair with `debugPrintRebuildDirtyWidgets` and the Performance overlay (`p` in the terminal) during interviews about slow lists.",
    "pdfTopic": false,
    "tags": [
      "devtools",
      "performance"
    ]
  },
  {
    "id": "flu-120",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Navigation 1.0 vs 2.0 recap",
    "question": "When is Navigator.push enough, and when do you need go_router / Router?",
    "answer": "`Navigator.push` is fine for small apps and dialogs. You need **declarative routing** (go_router, AutoRoute, Navigator 2.0) when URLs, web, deep links, and nested navigators must stay in sync with app state (auth gates).\n\nDo not rewrite a three-screen app to Navigator 2.0 for fashion. Do not keep a 40-screen app on anonymous push-only stacks.",
    "pdfTopic": false,
    "tags": [
      "navigation"
    ]
  },
  {
    "id": "flu-121",
    "category": "flutter",
    "level": "advanced",
    "topic": "Impeller recap extras",
    "question": "What should you say about Impeller in a 2026 Flutter interview?",
    "answer": "Impeller is the **modern renderer** meant to remove runtime shader compilation jank by precompiling pipelines. Default on iOS for several releases; Android has been catching up as the default depending on version.\n\nIf a device shows artifacts, teams still know the Skia fallback flag. Talk about this with profiling, not slogans.",
    "pdfTopic": false,
    "tags": [
      "impeller"
    ]
  }
]);
