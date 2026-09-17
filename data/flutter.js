window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.flutter = [
  {
    "id": "flu-001",
    "category": "flutter",
    "level": "basic",
    "topic": "Flutter overview",
    "question": "What is Flutter, and how does it differ from native SDKs and hybrid WebView wrappers?",
    "answer": "Flutter is Google's **open-source UI toolkit** for building apps from a **single Dart codebase** that compile to iOS, Android, web, desktop, and embedded. It does **not** wrap OEM widgets in a WebView. Flutter owns pixels: a Dart framework describes a **widget tree**, the engine **lays out and paints** that tree (historically Skia, now **Impeller** on mobile), and a thin embedder talks to the OS.\n\nInterview contrast:\n- **Native (Kotlin/Swift UIKit/Compose):** best platform APIs and look-and-feel by default; two codebases.\n- **Hybrid (Cordova/Ionic):** HTML/CSS/JS inside a WebView; cheaper to start, weaker scrolling/jank control.\n- **React Native:** JavaScript describes UI; **native views** are the leaves. Flutter **skips OEM widgets** and draws its own.\n\nTrade-off: Flutter ships a **self-contained renderer**, so first-frame and binary size cost more than a thin native screen, but you get **consistent UI**, **hot reload**, and one layout model. Platform APIs still go through **plugins / platform channels / FFI**.",
    "pdfTopic": false,
    "tags": [
      "flutter",
      "architecture",
      "overview"
    ]
  },
  {
    "id": "flu-002",
    "category": "flutter",
    "level": "basic",
    "topic": "Dart language",
    "question": "Why did Flutter choose Dart, and what language features matter in interviews?",
    "answer": "Dart is an **object-oriented, garbage-collected** language with **sound null safety**, **async/await**, **isolates**, and **AOT + JIT** compilers. Flutter needed both: **JIT** for sub-second **hot reload** in debug, **AOT** native machine code for release (no VM warmup on the user's device).\n\nInterview talking points:\n- **Single-threaded isolate** by default — UI work stays on the **UI isolate**; heavy CPU goes to `compute` / `Isolate.run`.\n- **Sound null safety** (`String?` vs `String`) catches a huge class of NPEs at compile time.\n- **Everything is an object**, including functions; mixins, factories, and extension methods show up in widget APIs.\n- **No shared-memory threads.** Isolates message-pass. That is why Dart feels simpler than Java threads, and why you cannot block the UI isolate.\n\nDart is **not** a scripting layer sitting on top of Flutter. The framework **is** Dart; the engine is C++.",
    "pdfTopic": false,
    "tags": [
      "dart",
      "language",
      "aot",
      "jit"
    ]
  },
  {
    "id": "flu-003",
    "category": "flutter",
    "level": "basic",
    "topic": "Widget tree",
    "question": "What is the widget tree, and how does it relate to the element tree and render tree?",
    "answer": "A **widget** is an **immutable configuration**. `build()` returns a **new** widget subtree every time Flutter rebuilds. Flutter does **not** throw the on-screen objects away each frame. It keeps two longer-lived trees:\n\n- **Element tree** — the **instantiation** of widgets; holds State for `StatefulWidget`, walks children, decides inflate vs update.\n- **RenderObject tree** (layout/paint) — `RenderBox` objects that **measure, position, and paint**. Only `RenderObjectWidget`s (Padding, Column, CustomPaint, …) create render objects. `StatelessWidget` / `StatefulWidget` are **components**: they create elements but **no** RenderObject of their own.\n\nInterview one-liner: **Widget = config, Element = instance, RenderObject = layout+paint.** Rebuilds are cheap if you **reuse elements** (same `runtimeType` + `key`) and skip layout/paint when constraints and paint data did not change.",
    "code": "// Three trees, same identity when types+keys match:\n// Widget tree     Element tree          RenderObject tree\n// Padding    ->   SingleChildRender… -> RenderPadding\n// Text       ->   LeafRenderObject…  -> RenderParagraph\n// MyCard     ->   ComponentElement   -> (none — just children)",
    "pdfTopic": false,
    "tags": [
      "widgets",
      "element",
      "render-object"
    ]
  },
  {
    "id": "flu-004",
    "category": "flutter",
    "level": "basic",
    "topic": "Stateless vs Stateful",
    "question": "When do you use StatelessWidget vs StatefulWidget? What actually holds the state?",
    "answer": "`StatelessWidget` is a **pure function of its constructor arguments** (and inherited widgets). If the UI can be described entirely from props + InheritedWidget, stay stateless.\n\n`StatefulWidget` is **two classes**: the widget (immutable config) and a `State` object that **survives rebuilds** as long as the element is reused. Mutable fields, `AnimationController`s, `TextEditingController`s, and subscriptions live on **State**, never on the widget.\n\nInterview traps:\n- Making a widget Stateful just to call `setState` from a parent is usually wrong — **lift state up** or use a notifier.\n- `State` is **not** a ViewModel for the whole screen. Keep it local UI state; put app state in Provider/Riverpod/BLoC.\n- You cannot `setState` after `dispose`. Check `mounted` or, better, cancel work in `dispose`.",
    "code": "class Counter extends StatefulWidget {\n  const Counter({super.key});\n  @override\n  State<Counter> createState() => _CounterState();\n}\n\nclass _CounterState extends State<Counter> {\n  int _n = 0;\n  @override\n  Widget build(BuildContext context) => TextButton(\n        onPressed: () => setState(() => _n++),\n        child: Text('$_n'),\n      );\n}",
    "pdfTopic": false,
    "tags": [
      "stateless",
      "stateful",
      "setState"
    ]
  },
  {
    "id": "flu-005",
    "category": "flutter",
    "level": "basic",
    "topic": "BuildContext",
    "question": "What is BuildContext, and why does Theme.of(context) fail in the same build method that creates the widget?",
    "answer": "`BuildContext` is a handle to a **location in the element tree** (it **is** the `Element`). `Theme.of(context)`, `MediaQuery.of`, `Navigator.of` walk **ancestors** from that element.\n\nClassic bug: you `showDialog(context: context)` or `Theme.of(context)` using the context of a widget that **has not yet inserted** the `MaterialApp`/`Theme` **above** it — or you use the **builder's parent** context, which sits **above** the newly created `Scaffold`.\n\nFix patterns:\n- Use a **Builder** / split a child widget so its context is **under** the Scaffold.\n- For dialogs/snackbars, `ScaffoldMessenger.of(context)` needs a context **under** `ScaffoldMessenger` (MaterialApp provides one).\n- Do not store `BuildContext` across async gaps unless you check `mounted` (the element may be defunct).\n\n`context.findRenderObject()` and `context.size` are only valid **after layout** — not in `initState`.",
    "code": "Scaffold(\n  appBar: AppBar(title: const Text('Demo')),\n  body: Builder(\n    builder: (inner) => ElevatedButton(\n      onPressed: () => ScaffoldMessenger.of(inner).showSnackBar(\n        const SnackBar(content: Text('Uses the inner context')),\n      ),\n      child: const Text('Snack'),\n    ),\n  ),\n);",
    "pdfTopic": false,
    "tags": [
      "BuildContext",
      "InheritedWidget",
      "Theme"
    ]
  },
  {
    "id": "flu-006",
    "category": "flutter",
    "level": "basic",
    "topic": "setState",
    "question": "What does setState actually do, and what are the common misuses?",
    "answer": "`setState(fn)` runs `fn` synchronously, marks the **element dirty**, and schedules a **rebuild of that State’s widget**. It does **not** rebuild the whole app. Descendants rebuild if their parent rebuilt and they are not wrapped in something that **skips** (const widgets, `RepaintBoundary` does **not** skip rebuilds — it skips **repaint**).\n\nMisuses interviewers listen for:\n- Calling `setState` for data that **no widget reads** — wasted work.\n- Huge `build()` methods so every keystroke rebuilds a video player.\n- `setState` inside `build()` — infinite dirty loop (framework asserts in debug).\n- Updating state **without** `setState` — UI stale.\n- `setState` after `dispose` (async callback) — throws.\n\nBetter: split widgets, pass callbacks, or use `ListenableBuilder` / `ValueListenableBuilder` so only the leaf rebuilds.",
    "pdfTopic": false,
    "tags": [
      "setState",
      "rebuild",
      "performance"
    ]
  },
  {
    "id": "flu-007",
    "category": "flutter",
    "level": "basic",
    "topic": "const constructors",
    "question": "Why do Flutter style guides push const constructors, and when can you not use them?",
    "answer": "A `const` widget is a **canonicalized compile-time object**. Flutter can **skip rebuilding** a child if the parent passes the **same const instance** (identity equal). It also reduces allocations in `build()`.\n\nYou can only `const` a widget when **every argument is a compile-time constant** — no `Theme.of(context)`, no interpolated non-const strings, no `DateTime.now()`.\n\n`const` is **not** a silver bullet for jank: it does not skip layout of a RenderObject that still needs to relayout because constraints changed. It **does** help the element updater treat the configuration as unchanged.\n\nAlways declare `const MyWidget({super.key})` when possible so **callers** can write `const MyWidget()`.",
    "code": "class Label extends StatelessWidget {\n  const Label(this.text, {super.key});\n  final String text;\n  @override\n  Widget build(BuildContext context) => Text(text);\n}\n\n// Parent: const children are skipped when the parent rebuilds\nconst Row(children: [Label('OK'), Icon(Icons.check)]);",
    "pdfTopic": false,
    "tags": [
      "const",
      "performance",
      "widgets"
    ]
  },
  {
    "id": "flu-008",
    "category": "flutter",
    "level": "basic",
    "topic": "Material vs Cupertino",
    "question": "Material vs Cupertino: what does Flutter actually ship, and how do you pick?",
    "answer": "Flutter includes two first-party design languages:\n- **`material`** — Material 3 widgets (`FilledButton`, `NavigationBar`, `ThemeData.useMaterial3`). Default for most production apps.\n- **`cupertino`** — iOS-style widgets (`CupertinoPageScaffold`, `CupertinoNavigationBar`, `CupertinoSwitch`). They do **not** wrap UIKit; they are **painted by Flutter**.\n\n`MaterialApp` vs `CupertinoApp` choose **routing, theming, and localizations** adapters. You can mix: a `MaterialApp` can show a `CupertinoAlertDialog`. Mixing carelessly looks wrong (double back gestures, different page transitions).\n\nFor **adaptive** UI, prefer widgets with platform forks (`Switch.adaptive`, `showModalBottomSheet` vs Cupertino sheets) or packages like `flutter_platform_widgets`. Do not expect pixel-perfect UIKit chrome — Flutter’s Cupertino is a **faithful recreation**, not a platform view.",
    "pdfTopic": false,
    "tags": [
      "material",
      "cupertino",
      "adaptive"
    ]
  },
  {
    "id": "flu-009",
    "category": "flutter",
    "level": "basic",
    "topic": "pubspec.yaml",
    "question": "What belongs in pubspec.yaml, and how do version constraints and overrides work?",
    "answer": "`pubspec.yaml` is the **package manifest**: name, SDK constraint, dependencies, assets, fonts, and Flutter-specific flags (`uses-material-design`).\n\nVersioning uses **SemVer** with caret syntax: `^2.1.0` means `>=2.1.0 <3.0.0`. `flutter pub get` writes a **lockfile** (`pubspec.lock`) that pins exact versions for apps. **Publishable packages** should not commit lockfiles the same way apps do; apps **should**.\n\nInterview details:\n- `sdk: flutter` means “use the Flutter SDK’s bundled packages” (`flutter`, `flutter_test`).\n- `dependency_overrides` force a version — emergency only; hides incompatibilities.\n- Assets must be **declared** or they will not ship: `flutter: assets: - assets/logo.png` (or a directory).\n- `publish_to: none` for private apps.\n- Dev tools go in `dev_dependencies` (mockito, build_runner) so they are stripped from release.",
    "code": "name: shop\nenvironment:\n  sdk: '>=3.5.0 <4.0.0'\ndependencies:\n  flutter:\n    sdk: flutter\n  go_router: ^14.0.0\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\nflutter:\n  uses-material-design: true\n  assets:\n    - assets/images/",
    "pdfTopic": false,
    "tags": [
      "pubspec",
      "packages",
      "assets"
    ]
  },
  {
    "id": "flu-010",
    "category": "flutter",
    "level": "basic",
    "topic": "Hot reload vs hot restart",
    "question": "Hot reload vs hot restart vs full rebuild — what state survives, and when is reload impossible?",
    "answer": "**Hot reload** injects **updated Dart source** into the running **JIT** VM, then **rebuilds widgets** while **keeping State objects** (and static fields). Enums, `main()`, `initState` changes, and some global changes will **not** apply. That is why a toggle in `initState` looks stale after reload.\n\n**Hot restart** tears down the isolate, re-runs `main()`, **loses all Dart state**, but does **not** reinstall a new APK / IPA. Faster than a full rebuild.\n\n**Full rebuild** (stop + run, or release) recompiles kernel/AOT and relaunches the engine. Required for:\n- native plugin / Gradle / Podfile changes\n- asset additions sometimes need restart\n- **release/profile** (no JIT, so **no hot reload**)\n\nIf reload says “not quite”, hot restart. If a plugin’s Android code changed, rebuild.",
    "pdfTopic": false,
    "tags": [
      "hot-reload",
      "tooling",
      "debug"
    ]
  },
  {
    "id": "flu-011",
    "category": "flutter",
    "level": "basic",
    "topic": "Widget lifecycle",
    "question": "Walk through StatefulWidget lifecycle: createState, initState, didChangeDependencies, didUpdateWidget, build, deactivate, dispose.",
    "answer": "Order you should recite:\n\n1. `createState()` — framework creates the `State`.\n2. `initState()` — **once**. No `InheritedWidget` lookups that depend on `didChangeDependencies` yet (`of(context)` can be unsafe / incomplete). Set up controllers, listen to `widget` config.\n3. `didChangeDependencies()` — after `initState` and whenever an **InheritedWidget** you depend on changes (`ModalRoute`, `Theme`, `MediaQuery` if you called `of`).\n4. `build()` — as often as needed. Keep it **pure** and cheap.\n5. `didUpdateWidget(oldWidget)` — parent rebuilt with a **new widget instance** of the same type+key. Re-wire listeners if `widget.foo` identity changed.\n6. `deactivate()` — element unmounted but may be **reinserted** (GlobalKey moves). Rarely overridden.\n7. `dispose()` — **final**. Cancel timers, close streams, dispose controllers. After this, `mounted` is false.\n\n`setState` is legal from `initState`’s end through until `dispose`. Never after.",
    "code": "class _TickerBoxState extends State<TickerBox>\n    with SingleTickerProviderStateMixin {\n  late final AnimationController _c;\n  @override\n  void initState() {\n    super.initState();\n    _c = AnimationController(vsync: this, duration: widget.duration)..repeat();\n  }\n  @override\n  void didUpdateWidget(TickerBox old) {\n    super.didUpdateWidget(old);\n    if (old.duration != widget.duration) _c.duration = widget.duration;\n  }\n  @override\n  void dispose() {\n    _c.dispose();\n    super.dispose();\n  }\n}",
    "pdfTopic": false,
    "tags": [
      "lifecycle",
      "initState",
      "dispose",
      "didUpdateWidget"
    ]
  },
  {
    "id": "flu-012",
    "category": "flutter",
    "level": "basic",
    "topic": "App lifecycle",
    "question": "How do you observe app lifecycle in modern Flutter (AppLifecycleListener vs WidgetsBindingObserver)?",
    "answer": "The **process** moves through `AppLifecycleState`: `resumed`, `inactive`, `hidden`, `paused`, `detached`. Pause video / sockets on `hidden`/`paused`; resume on `resumed`.\n\nTwo APIs:\n- **`WidgetsBindingObserver`** — mixin on `State`, implement `didChangeAppLifecycleState`. Works everywhere, slightly more boilerplate.\n- **`AppLifecycleListener`** (Flutter 3.13+) — object with **named callbacks** (`onPause`, `onResume`, `onExitRequested`, `onDetach`). Prefer this in new code; you must **`dispose()`** the listener.\n\nNeither is a replacement for **Android activity** `onSaveInstanceState`. For UI state across process death use **restoration IDs** / `RestorationMixin`.\n\n`detached` means the engine is detaching (add-to-app, or process teardown) — do not assume you will `resume`.",
    "code": "late final AppLifecycleListener _listener;\n@override\nvoid initState() {\n  super.initState();\n  _listener = AppLifecycleListener(\n    onHide: () => _player.pause(),\n    onResume: () => _player.play(),\n  );\n}\n@override\nvoid dispose() {\n  _listener.dispose();\n  super.dispose();\n}",
    "pdfTopic": false,
    "tags": [
      "AppLifecycleListener",
      "WidgetsBindingObserver",
      "lifecycle"
    ]
  },
  {
    "id": "flu-013",
    "category": "flutter",
    "level": "basic",
    "topic": "Navigator push pop",
    "question": "How do Navigator.push and pop work, and what does the Future returned by push mean?",
    "answer": "`Navigator` is a **stack of Routes**. `Navigator.push(context, MaterialPageRoute(builder: …))` inserts a route; `pop` removes the top route and **completes** the `Future` that `push` returned with an optional result.\n\n```dart\nfinal id = await Navigator.push<int>(context, MaterialPageRoute(\n  builder: (_) => const PickerPage(),\n));\n// PickerPage: Navigator.pop(context, 42);\n```\n\n`pushReplacement` swaps the top route. `pushAndRemoveUntil` is how you **clear login** off the stack. Always `await` results only if the route **pops with a value**; a system back may pop `null`.\n\nNavigator **looks up** the nearest `Navigator` via context — a nested navigator (tabs, sheets) may not be the one you meant. `rootNavigator: true` on `showDialog` / `Navigator.of(context, rootNavigator: true)` escapes to the app-level stack.",
    "pdfTopic": false,
    "tags": [
      "navigator",
      "routes",
      "navigation"
    ]
  },
  {
    "id": "flu-014",
    "category": "flutter",
    "level": "basic",
    "topic": "Routes",
    "question": "What are Flutter routes, and how do onGenerateRoute and initialRoute interact?",
    "answer": "A **Route** is more than a widget: it owns **transition**, **lifecycle** (`RouteAware`), and **pop disposition**. `MaterialPageRoute` / `CupertinoPageRoute` are the usual pages.\n\n`MaterialApp(routes: {'/': …, '/detail': …})` is **imperative named routing**. `onGenerateRoute` handles **unknown names and arguments**:\n\n```dart\nonGenerateRoute: (settings) {\n  if (settings.name == '/detail') {\n    final id = settings.arguments as String;\n    return MaterialPageRoute(builder: (_) => Detail(id: id));\n  }\n  return null;\n}\n```\n\n`initialRoute` can be a **slash-separated path** (`/a/b`) which **pushes multiple routes**. That surprises people. Prefer `'/'` plus an explicit first navigation, or **go_router / Navigator 2.0** for deep links.\n\nNamed routes scale poorly (stringly-typed arguments). Interviews expect you to say when you would **leave** this API.",
    "pdfTopic": false,
    "tags": [
      "routes",
      "onGenerateRoute",
      "MaterialApp"
    ]
  },
  {
    "id": "flu-015",
    "category": "flutter",
    "level": "basic",
    "topic": "ListView vs GridView",
    "question": "ListView vs GridView: builders, slivers, and when the default constructor is a trap.",
    "answer": "Both are **scrollable boxes** that implement **lazy building** when you use `.builder` / `.separated` / `.custom`. The **default** `ListView(children: […])` builds **all children up front** — fine for 10 tiles, catastrophic for 10,000.\n\n- `ListView.builder` — 1D lazy list, `itemBuilder` + `itemCount`.\n- `ListView.separated` — inserts separators without nesting.\n- `GridView.builder` + `SliverGridDelegateWithFixedCrossAxisCount` — 2D lazy grid.\n- `GridView.count` / `.extent` — convenient, but still prefer **builder** for large data.\n\nUse **keys** on items whose identity moves (reorder, Dismissible). For mixed headers + lists + grids, don’t nest scrollables: use **`CustomScrollView` + slivers**.\n\n`shrinkWrap: true` inside another scroller is a **layout tax** (must measure all children). Prefer slivers.",
    "code": "ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, i) => ListTile(\n    key: ValueKey(items[i].id),\n    title: Text(items[i].title),\n  ),\n);",
    "pdfTopic": false,
    "tags": [
      "ListView",
      "GridView",
      "lazy"
    ]
  },
  {
    "id": "flu-016",
    "category": "flutter",
    "level": "basic",
    "topic": "Column Row Stack",
    "question": "How do Column, Row, and Stack layout their children, and what is the unbounded-height error?",
    "answer": "**Row** = horizontal `Flex`. **Column** = vertical `Flex`. They pass **tight/loose constraints** along the main axis based on `MainAxisSize` and whether they themselves got **bounded** constraints. **Stack** sizes to **non-positioned** children (or `fit: StackFit.expand`) and positions others with `Positioned` / `Align`.\n\nThe famous error `Vertical viewport was given unbounded height` is usually **Column inside ListView** (or ListView inside Column) where the inner flex/list is told **max height = infinity** and tries to be as big as its children.\n\nFixes:\n- Wrap the list in `Expanded` if the Column is in a **bounded** parent (Scaffold body).\n- Use `ListView` as the **outer** scroller, not a Column of lists.\n- `mainAxisSize: MainAxisSize.min` when the flex should shrink-wrap (still fails if a child wants infinite space).\n\n`CrossAxisAlignment.stretch` forces children to take the **cross-axis max**. `Spacer` is just `Expanded` with an empty child.",
    "pdfTopic": false,
    "tags": [
      "Column",
      "Row",
      "Stack",
      "constraints"
    ]
  },
  {
    "id": "flu-017",
    "category": "flutter",
    "level": "basic",
    "topic": "Expanded vs Flexible",
    "question": "Expanded vs Flexible vs Spacer — how does Flex fit leftover space?",
    "answer": "In a `Row`/`Column`/`Flex`, children with `FlexParentData` (`Expanded`, `Flexible`) share **leftover** space along the main axis **after** inflexible children are laid out.\n\n- `Flexible(fit: FlexFit.loose)` — child **may** be at most the allocated space; it can be smaller (`Text` that shortens).\n- `Expanded` = `Flexible(fit: FlexFit.tight)` — child **must** fill the allocated space.\n- `flex` is a **weight**. Two `Expanded` with flex 2 and 1 split leftover 2:1.\n- `Spacer(flex: 1)` — `Expanded` with `SizedBox.shrink()`.\n\nYou **cannot** put `Expanded` inside a ListView child without a bounded flex parent — same unbounded constraint bug. `Expanded` is **not** a percentage of the screen; it is leftover **inside that Flex**.",
    "code": "Row(\n  children: const [\n    Icon(Icons.star),\n    Expanded(child: Text('takes leftover', overflow: TextOverflow.ellipsis)),\n    Flexible(child: Text('can stay short')),\n  ],\n);",
    "pdfTopic": false,
    "tags": [
      "Expanded",
      "Flexible",
      "Flex"
    ]
  },
  {
    "id": "flu-018",
    "category": "flutter",
    "level": "basic",
    "topic": "Box constraints",
    "question": "Explain Flutter’s box constraint model. Why is a Center different from an Align inside a ListView?",
    "answer": "Every `RenderBox` is passed a `BoxConstraints` (**min/max width and height**) and **must** return a size within them. Parents **decide** constraints; children **decide** size (within those bounds). This is the **one-pass** (mostly) layout protocol.\n\nTight constraints: `min == max` (Scaffold body). Loose: `min = 0`, `max = finite` (`Align`). Unbounded: `max = infinity` (scroll **along the scroll axis**).\n\n`Center` is `Align` with loose constraints — the child can be its intrinsic size. In a vertical `ListView`, **cross-axis** is tight (full width) and **main-axis is unbounded**. A `Column` without `mainAxisSize: min` or an `Expanded` explodes because Expanded needs a **bounded** max.\n\n`SizedBox.expand` forces child to **max** constraints. `UnconstrainedBox` **hides** parent max (overflow warning). Interviewers love asking you to **read constraints** with `LayoutBuilder`.",
    "code": "LayoutBuilder(\n  builder: (context, c) {\n    final wide = c.maxWidth >= 600;\n    return wide ? const WideLayout() : const NarrowLayout();\n  },\n);",
    "pdfTopic": false,
    "tags": [
      "constraints",
      "layout",
      "LayoutBuilder"
    ]
  },
  {
    "id": "flu-019",
    "category": "flutter",
    "level": "basic",
    "topic": "SafeArea",
    "question": "What does SafeArea actually pad, and when should you use MediaQuery.padding / viewInsets instead?",
    "answer": "`SafeArea` consumes **`MediaQuery.padding`** (notches, status bar, home indicator, rounded corners) and **adds padding** so children sit in the “safe” rectangle. It can also consume `minimum` extra padding.\n\nIt does **not** automatically pad for the **keyboard**. Keyboard is `MediaQuery.viewInsets`. `Scaffold` already resizes `body` for `viewInsets` when `resizeToAvoidBottomInset: true` (default). Nesting `SafeArea` inside a Scaffold that already handles the status bar via `AppBar` often **double-pads**.\n\nUse `SafeArea` on screens **without** an AppBar, on full-bleed stacks, and around FABs that sit near the home indicator. For custom drawing, read `MediaQuery.paddingOf(context)` (prefer the `Of` APIs to avoid rebuilding on unrelated MediaQuery changes).",
    "pdfTopic": false,
    "tags": [
      "SafeArea",
      "MediaQuery",
      "insets"
    ]
  },
  {
    "id": "flu-020",
    "category": "flutter",
    "level": "basic",
    "topic": "Scaffold",
    "question": "What responsibilities does Scaffold have beyond drawing a material “page chrome”?",
    "answer": "`Scaffold` is the **Material layout coordinator**: `appBar`, `body`, `floatingActionButton` (+ location), `drawer` / `endDrawer`, `bottomNavigationBar`, `bottomSheet`, `snackBar` host (historically; now `ScaffoldMessenger`), and **keyboard inset** resizing.\n\nIt registers a `ScaffoldState` you can `of(context)` to `openDrawer()` or `showBottomSheet()`. Snackbars should go through **`ScaffoldMessenger`** so they **survive** route transitions.\n\nYou usually have **one Scaffold per route**, not nested Scaffolds (nested ones break snackbars, FABs, and drawers). `extendBody` / `extendBodyBehindAppBar` let body paint under bars. `persistentFooterButtons` stay above the keyboard.\n\nCupertino apps use `CupertinoPageScaffold` instead — different chrome, no drawers.",
    "pdfTopic": false,
    "tags": [
      "Scaffold",
      "Material",
      "ScaffoldMessenger"
    ]
  },
  {
    "id": "flu-021",
    "category": "flutter",
    "level": "basic",
    "topic": "Theme",
    "question": "How does theming work (ThemeData, ColorScheme, ThemeExtension), and how do you read it without over-rebuilding?",
    "answer": "`MaterialApp.theme` inserts a `Theme` **InheritedWidget**. `Theme.of(context)` (or `Theme.of`) subscribes the element to **all** theme changes. Material 3 centers on **`ColorScheme.fromSeed`** plus `TextTheme`.\n\nFor custom tokens, use **`ThemeExtension<T>`** rather than global statics — it **lerps** in animated theme switches.\n\nAvoid wrapping the whole tree in a theme that changes every frame. Prefer:\n- `ColorScheme.of(context)` / `TextTheme.of(context)` when you only need one slice (Flutter added dedicated InheritedModels).\n- Local `Theme(data: Theme.of(context).copyWith(…), child: …)` to **scope** overrides (a dark dialog on a light screen).\n\n`ThemeMode.system` follows platform brightness. Dark and light `ColorScheme`s should both be specified or contrast will fail accessibility.",
    "code": "MaterialApp(\n  theme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),\n    useMaterial3: true,\n  ),\n  darkTheme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(\n      seedColor: Colors.teal,\n      brightness: Brightness.dark,\n    ),\n  ),\n);",
    "pdfTopic": false,
    "tags": [
      "Theme",
      "ColorScheme",
      "Material3"
    ]
  },
  {
    "id": "flu-022",
    "category": "flutter",
    "level": "basic",
    "topic": "Assets and fonts",
    "question": "How do you ship images and fonts, and what is the difference between AssetImage and Image.network?",
    "answer": "Declare files under `flutter: assets:` and `fonts:` in **pubspec.yaml**. `Image.asset('assets/logo.png')` uses `AssetImage`, which understands **resolution variants**: `assets/2.0x/logo.png`, `3.0x`, plus eventual wide-gamut variants. The asset bundle is **compiled in**; missing pubspec entries fail at runtime.\n\nFonts: list a family and file; then `TextStyle(fontFamily: 'Inter')`. Use `google_fonts` only if you accept **runtime download** or declare the font so it is bundled.\n\n`Image.network` hits HTTP, uses the **image cache** (`ImageCache`), and needs error/loading builders. It is **not** an asset. For SVGs use `vector_graphics` / `flutter_svg` — they are not `ImageProvider`s by default.\n\n`rootBundle.loadString` reads JSON/text assets. Flavors can point at **different asset directories** via Gradle/Xcode + `--dart-define`.",
    "pdfTopic": false,
    "tags": [
      "assets",
      "fonts",
      "Image"
    ]
  },
  {
    "id": "flu-023",
    "category": "flutter",
    "level": "basic",
    "topic": "async await",
    "question": "How does async/await work in Dart, and why does it not start a new thread?",
    "answer": "`async` marks a function that **returns a Future immediately** and can `await` other futures. `await` **schedules the rest of the function** as a callback on the isolate’s **event loop**. No OS thread is spawned. While you `await` a network call, the UI isolate can paint frames — unless you **busy-loop** or call **synchronous** heavy work.\n\n```dart\nFuture<int> load() async {\n  final res = await http.get(uri); // yield\n  return jsonDecode(res.body)['n'] as int;\n}\n```\n\nRules:\n- Never `async` just to `return` a value — return `Future.value` or a non-async function.\n- `await` in `build()` is illegal. Use `FutureBuilder`, `StatefulWidget`, or a state manager.\n- Catch errors with `try/catch` around `await`, or `.catchError` / `unawaited` for fire-and-forget (and don’t leak).\n- `Future.delayed` is still the same isolate.",
    "pdfTopic": false,
    "tags": [
      "async",
      "await",
      "event-loop"
    ]
  },
  {
    "id": "flu-024",
    "category": "flutter",
    "level": "basic",
    "topic": "Future",
    "question": "What is a Future, and how do Future.value, Future.error, and Future.microtask differ?",
    "answer": "A `Future<T>` is a **one-shot** async result: completes with a value or an error. Listeners registered with `then` / `catchError` / `whenComplete` run on the event loop.\n\n- `Future.value(x)` — already complete (often in a **microtask** so `then` is not sync-reentrant).\n- `Future.error(e)` — already failed.\n- `Future.microtask(fn)` — runs `fn` as a **microtask**, then completes.\n- `Future(fn)` — schedules `fn` as an **event** (later than microtasks).\n- `Future.sync(fn)` — runs `fn` **now**; if it throws, the Future errors.\n\n`Future.wait` fails fast on first error unless `eagerError` / `wantResults` patterns (check current API). `Future.any` completes with the first. Chain rather than nesting callbacks — that is what `async`/`await` desugars to.",
    "pdfTopic": false,
    "tags": [
      "Future",
      "microtask",
      "Dart"
    ]
  },
  {
    "id": "flu-025",
    "category": "flutter",
    "level": "basic",
    "topic": "FutureBuilder",
    "question": "How does FutureBuilder work, and why is creating the Future in build() a bug?",
    "answer": "`FutureBuilder` subscribes to a `Future` and rebuilds on `ConnectionState` (`none`, `waiting`, `done`) plus `hasData` / `hasError`. It is a **thin adapter**, not a state manager.\n\n**The bug:** `FutureBuilder(future: fetch(), …)` inside `build()` starts a **new** HTTP call every rebuild. Cache the Future in `initState` (or in Riverpod/`FutureProvider`).\n\n```dart\nlate final Future<User> _user = repo.me();\n// build: FutureBuilder(future: _user, builder: …)\n```\n\nWhen `snapshot.connectionState != done`, show a spinner. When `hasError`, show retry. `snapshot.data` can be null if `T` is nullable — use `required` types + `hasData`.\n\nFor lists that refresh, a `StatefulWidget` + pull-to-refresh, or Riverpod `ref.refresh`, is clearer than stacking FutureBuilders.",
    "pdfTopic": false,
    "tags": [
      "FutureBuilder",
      "async",
      "widgets"
    ]
  },
  {
    "id": "flu-026",
    "category": "flutter",
    "level": "basic",
    "topic": "Stream and StreamBuilder",
    "question": "Stream vs Future, and how StreamBuilder should be wired?",
    "answer": "A **Future** is one result. A **Stream** is **zero or more** events, then optionally done/error. `StreamBuilder` rebuilds on each `AsyncSnapshot`. Same trap as FutureBuilder: **do not create the stream in `build()`**.\n\n```dart\nStreamBuilder<int>(\n  stream: ticker, // stored field / inherited\n  builder: (context, snap) {\n    if (!snap.hasData) return const CircularProgressIndicator();\n    return Text('${snap.data}');\n  },\n);\n```\n\nKnow `broadcast` vs **single-subscription** streams. `StreamController.broadcast` allows multiple listeners; regular controllers do not. Always **cancel** subscriptions in `dispose` if you listen manually (`StreamSubscription`).\n\n`await for` inside an `async*` generator produces another stream. Use `rxdart` only when you need operators; the SDK streams are enough for Firestore snapshots and `onValue`.",
    "pdfTopic": false,
    "tags": [
      "Stream",
      "StreamBuilder",
      "async"
    ]
  },
  {
    "id": "flu-027",
    "category": "flutter",
    "level": "basic",
    "topic": "Null safety",
    "question": "Explain Dart sound null safety: ?, !, late, required, and promotion.",
    "answer": "With **sound null safety**, `String` cannot be null; `String?` can. The type system **proves** safety so the compiler can omit checks in AOT.\n\n- `required this.name` on a named param — must be passed (unless nullable).\n- `late` — I will assign before read; **throws** `LateInitializationError` if not. `late final` is a single-assignment lazy field. Avoid `late` to silence the compiler.\n- `!` (bang) — “I know it’s non-null”. Code smell if used often.\n- `??` / `??=` / `?.` — defaults and short-circuit.\n- Promotion: after `if (x == null) return;`, `x` is `T` in that scope **only if `x` is a local**. Fields are **not** promoted (another isolate/thread could theoretically change them) — assign to a local.\n\n`Object?` vs `dynamic`: `dynamic` disables type checks; prefer `Object?` + pattern matching.",
    "code": "String greet(String? name) {\n  final n = name ?? 'friend';\n  return 'Hi $n';\n}",
    "pdfTopic": false,
    "tags": [
      "null-safety",
      "Dart",
      "late"
    ]
  },
  {
    "id": "flu-028",
    "category": "flutter",
    "level": "basic",
    "topic": "final vs const vs var",
    "question": "final vs const vs var vs late — what is frozen, and when?",
    "answer": "- **`var`** — type inferred, **reassignable**.\n- **`final`** — **single assignment**, runtime value. The object it points to can still be mutable (`final list = []` then `list.add`).\n- **`const`** — **compile-time constant**, deeply immutable, canonicalized. `const [1]` is the same instance everywhere.\n- **`late`** — delayed `final`/`var` with a crash if read early.\n\n`static const` is a class compile-time constant. Widget constructors: `const MyW({super.key})`. Local `const` helps canonicalization.\n\nInterview trick: `const duration = Duration(seconds: 1)` vs `final duration = Duration(seconds: 1)` — both fine; const is canonical. You cannot `const` a `DateTime.now()`.",
    "pdfTopic": false,
    "tags": [
      "final",
      "const",
      "var",
      "Dart"
    ]
  },
  {
    "id": "flu-029",
    "category": "flutter",
    "level": "basic",
    "topic": "Named constructors",
    "question": "What are named constructors in Dart, and how do they differ from factory constructors?",
    "answer": "A class can have **one unnamed** constructor and **many named** ones (`User.fromJson`, `EdgeInsets.only`). Named constructors can **redirect** (`const Padding.only({…}) : this(…);`) or have initializers.\n\nThey still **create a new instance** (unless you redirect to a factory). Use them for **alternate construction paths** that share the same type.\n\n```dart\nclass Point {\n  const Point(this.x, this.y);\n  const Point.origin() : x = 0, y = 0;\n  final double x, y;\n}\n```\n\nInitializer lists run **before** the constructor body, which is why `final` fields are assigned there. `super(...)` is now an unnamed or named super-constructor call, often as `super.key` in widgets.",
    "pdfTopic": false,
    "tags": [
      "constructors",
      "Dart",
      "named-constructor"
    ]
  },
  {
    "id": "flu-030",
    "category": "flutter",
    "level": "basic",
    "topic": "Factory constructors",
    "question": "When do you write a factory constructor instead of a generative one?",
    "answer": "`factory` constructors **do not** automatically create an instance. They **return** an instance — cached singleton, subtype, or parsed object.\n\n```dart\nclass Color {\n  factory Color.fromHex(String hex) {\n    return Color._(int.parse(hex, radix: 16));\n  }\n  const Color._(this.value);\n  final int value;\n}\n```\n\n`ThemeData` / `BorderRadius.circular` style APIs often hide caches. `factory User.fromJson` is the idiomatic parse entry (or a static `fromJson` — both are fine; factories can be `const` only in limited cases).\n\nA factory **cannot** access `this` to initialize fields; it **returns** an object that already exists. `Redirecting factory` (`factory A() = B;`) is how abstract classes expose constructors.",
    "pdfTopic": false,
    "tags": [
      "factory",
      "constructors",
      "Dart"
    ]
  },
  {
    "id": "flu-031",
    "category": "flutter",
    "level": "basic",
    "topic": "Keys",
    "question": "Why do widgets have keys, and what problem do they solve in a list of StatefulWidgets?",
    "answer": "When the parent rebuilds, Flutter **matches** old elements to new widgets by **`runtimeType` + `key`** (and slot). If you swap two `State`ful tiles **without keys**, Flutter **reuses the first element for the first slot** — **state sticks to position**, not to identity. That is the classic checkbox-in-a-list bug.\n\nGive items a **`ValueKey(id)`** (or `ObjectKey`) so the element **moves with the item**. Use keys also for:\n- `Hero` tags (related but separate)\n- forcing a **new State** when you need to reset a form (`Key('form-$id')`)\n- `PageStorageKey` to remember scroll offset\n\nDo **not** sprinkle `UniqueKey()` on every rebuild — that **throws away** State every frame (and kills animation). Keys are an **opt-in identity** mechanism, not a performance hack.",
    "code": "ListView(\n  children: items\n      .map((t) => TodoTile(key: ValueKey(t.id), todo: t))\n      .toList(),\n);",
    "pdfTopic": false,
    "tags": [
      "keys",
      "ValueKey",
      "state"
    ]
  },
  {
    "id": "flu-032",
    "category": "flutter",
    "level": "basic",
    "topic": "runApp and MaterialApp",
    "question": "What do runApp, WidgetsFlutterBinding, and MaterialApp each do at startup?",
    "answer": "`WidgetsFlutterBinding.ensureInitialized()` attaches the Dart framework to the **engine** (required before plugins, `SharedPreferences`, Firebase). `runApp(widget)` inflates `widget` as the **root**, attaches it to the **render view**, and schedules the first frame.\n\n`MaterialApp` (or `CupertinoApp` / `WidgetsApp`) is **not** required for pixels, but it wires:\n- a **Navigator** (or Router)\n- **DefaultTextStyle**, **Theme**, **Localizations**, **MediaQuery**\n- **shortcuts / actions** (keyboard)\n- **builder** overlay (typically `ScaffoldMessenger`)\n\nA raw `runApp(MyHome())` without `MediaQuery`/`Directionality` **throws**. Tests wrap with `MaterialApp` or `Directionality` + `MediaQuery`.\n\n`const MyApp()` as root is fine; the binding is still mutable engine state underneath.",
    "pdfTopic": false,
    "tags": [
      "runApp",
      "MaterialApp",
      "binding"
    ]
  },
  {
    "id": "flu-033",
    "category": "flutter",
    "level": "intermediate",
    "topic": "InheritedWidget",
    "question": "How does InheritedWidget propagate data, and what does updateShouldNotify control?",
    "answer": "`InheritedWidget` is the **framework primitive** for ambient data. Descendants call `dependOnInheritedWidgetOfExactType` (usually via `of(context)`). That **registers a dependency**: when the inherited widget updates and `updateShouldNotify` returns true, **only dependents rebuild**, not the whole subtree blindly.\n\n```dart\nclass CounterScope extends InheritedWidget {\n  const CounterScope({required this.n, required super.child, super.key});\n  final int n;\n  static int of(BuildContext c) =>\n      c.dependOnInheritedWidgetOfExactType<CounterScope>()!.n;\n  @override\n  bool updateShouldNotify(CounterScope old) => n != old.n;\n}\n```\n\n`Theme`, `MediaQuery`, `DefaultTextStyle`, `Directionality` are InheritedWidgets (or **InheritedModel**s). `InheritedModel` notifies **aspects** so a width-only reader does not rebuild on keyboard insets.\n\nDo not implement app state with a raw InheritedWidget at scale — you will reinvent Provider. Know the primitive so you can debug `of(context)` and write a small scope.",
    "pdfTopic": false,
    "tags": [
      "InheritedWidget",
      "of(context)",
      "rebuild"
    ]
  },
  {
    "id": "flu-034",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Provider",
    "question": "How does Provider work on top of InheritedWidget, and when is it still a reasonable choice?",
    "answer": "**Provider** is a thin, battle-tested wrapper: `Provider`, `ChangeNotifierProvider`, `Consumer`, `Selector`, `context.watch` / `read` / `select`. `ChangeNotifier` + `notifyListeners()` is the default state object. `Selector` / `select` avoid rebuilding when an **equality-checked slice** is unchanged.\n\nInterview stance in 2026:\n- Still **fine** for small/medium apps, especially if the team already uses it.\n- **No compile-time safety** for missing providers (runtime `ProviderNotFoundException`).\n- Easy to make **god ChangeNotifiers**.\n- `context.watch` in a huge `build` rebuilds too much — split or `select`.\n\n```dart\nChangeNotifierProvider(\n  create: (_) => CartModel(),\n  child: const ShopApp(),\n);\n// context.watch<CartModel>().count\n```\n\nDispose happens when the provider is **unmounted** if `create` was used. Passing `value:` does **not** dispose — you own the notifier.",
    "pdfTopic": false,
    "tags": [
      "Provider",
      "ChangeNotifier",
      "state"
    ]
  },
  {
    "id": "flu-035",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Riverpod",
    "question": "What problems does Riverpod solve compared with Provider, and what are the core provider types?",
    "answer": "**Riverpod** is a **compile-safe**, **context-free** reactive cache. Providers live on a `ProviderContainer` / `ProviderScope`, not in the widget tree, so you can **read in tests** without pumping widgets and you cannot “forget to wrap” (you still need `ProviderScope` at the root).\n\nCore types:\n- `Provider` — computed/cached value\n- `Notifier` / `AsyncNotifier` (codegen: `@riverpod`) — mutable state\n- `FutureProvider` / `StreamProvider` — async\n- `family` — parameterized (`userProvider(id)`)\n- `autoDispose` — cancel when no listeners\n\nWidgets use `ConsumerWidget` / `ref.watch`. **watch** subscribes; **read** is a one-shot (callbacks). Combine with `ref.listen` for side effects (snackbars).\n\nRiverpod 2/3 **codegen** (`riverpod_generator`) replaces string provider names with functions. Interviewers expect `ref.watch` vs `read` and why ProviderScope is required.",
    "code": "@riverpod\nclass Counter extends _$Counter {\n  @override\n  int build() => 0;\n  void inc() => state++;\n}",
    "pdfTopic": false,
    "tags": [
      "Riverpod",
      "ProviderScope",
      "state"
    ]
  },
  {
    "id": "flu-036",
    "category": "flutter",
    "level": "intermediate",
    "topic": "BLoC and Cubit",
    "question": "BLoC vs Cubit: events, states, and when the ceremony pays off?",
    "answer": "**Cubit** is a `Stream` of states with **functions** that `emit`. **BLoC** adds an **event sink**: UI dispatches events, `on<Event>` handlers (with transformers: `restartable`, `droppable`) emit states. Both are from `bloc` / `flutter_bloc`.\n\n```dart\nclass CounterCubit extends Cubit<int> {\n  CounterCubit() : super(0);\n  void inc() => emit(state + 1);\n}\n```\n\nUse **BlocBuilder** / **BlocSelector** / **BlocListener** (side effects). Equatable/freezed states prevent **spam rebuilds**.\n\nWhen BLoC wins: complex **event timing** (search debounce), **traceability** (every intent is an event), large teams that want a strict UI→event→state one-way street. When Cubit wins: simple forms and counters. When neither: Riverpod/Notifier for less boilerplate.\n\nDo not put **navigation** inside the bloc without a listener — blocs should be **testable without Flutter**.",
    "pdfTopic": false,
    "tags": [
      "BLoC",
      "Cubit",
      "flutter_bloc"
    ]
  },
  {
    "id": "flu-037",
    "category": "flutter",
    "level": "intermediate",
    "topic": "GetX",
    "question": "Where does GetX sit versus Provider, Riverpod, and BLoC? What do interviewers worry about?",
    "answer": "**GetX** bundles **state** (`Obx` / `GetxController`), **DI** (`Get.put`), and **routing** (`Get.to`) in one opinionated package. It is fast to write and popular in some codebases.\n\nInterview comparison (honest):\n- **Provider** — official-ish, explicit context, no magic routing.\n- **Riverpod** — testable, codegen, no context, currently the **most common senior choice**.\n- **BLoC** — event-driven, verbose, great for complex pipelines.\n- **GetX** — **least explicit**: `Get.find()` hides the graph; routing bypasses `Navigator` 2.0 / deep-link stacks; mixins encourage **god controllers**.\n\nYou can still ship production apps with GetX. Seniors should say: they value **traceable dependencies**, **Navigator 2.0 compatibility**, and **testability**. If the team is already on GetX, don’t rewrite mid-sprint — isolate it behind facades.",
    "pdfTopic": false,
    "tags": [
      "GetX",
      "state-management",
      "comparison"
    ]
  },
  {
    "id": "flu-038",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Navigator 2.0",
    "question": "What problem does Navigator 2.0 (Router API) solve that push/pop does not?",
    "answer": "**Navigator 1.0** is an **imperative stack**. The OS (web URL, Android intent, iOS universal link) can disagree with that stack. **Navigator 2.0** is **declarative**: app state → `RouteInformation` → a list of `Page`s → the Navigator **diffs** pages (like a widget tree).\n\nPieces:\n- `RouteInformationProvider` — system URL / intent\n- `RouteInformationParser<T>` — URL → typed config\n- `RouterDelegate<T>` — config → `Navigator(pages: …)`\n- `BackButtonDispatcher` — Android back / web pop\n\nYou rarely implement this raw. **go_router** (and similar) **is** a RouterDelegate implementation. Know that `pages:` uses **page keys**; popping is `onPopPage` / `onDidRemovePage` (API evolved — mention `Navigator.pop` still works inside).\n\nWeb **must** have a declarative router or the URL bar lies.",
    "pdfTopic": false,
    "tags": [
      "Navigator-2.0",
      "Router",
      "deep-links"
    ]
  },
  {
    "id": "flu-039",
    "category": "flutter",
    "level": "intermediate",
    "topic": "go_router",
    "question": "Named routes vs go_router: why did the community move, and what does a typical route table look like?",
    "answer": "Named routes (`Navigator.pushNamed`) are **string maps** with `arguments: Object?`. They do not parse **browser URLs**, nested navigators, or redirects well.\n\n**go_router** gives:\n- URL patterns (`/family/:id`)\n- **redirects** (auth gates)\n- nested `ShellRoute` (bottom nav that **keeps state**)\n- `GoRouter.of(context).go` (replace stack to match URL) vs `push` (extra stack entry)\n\n```dart\nGoRouter(\n  routes: [\n    GoRoute(\n      path: '/user/:id',\n      builder: (c, s) => UserPage(id: s.pathParameters['id']!),\n    ),\n  ],\n);\n```\n\n`go` is **declarative** (the URL is the source of truth). `push` is still imperative on top. Prefer typed extras (`extra`) carefully — they **do not** round-trip through the URL, so process death loses them unless you encode in the path/query.",
    "pdfTopic": false,
    "tags": [
      "go_router",
      "named-routes",
      "navigation"
    ]
  },
  {
    "id": "flu-040",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Forms and validation",
    "question": "How do Form, GlobalKey<FormState>, and TextFormField validation work together?",
    "answer": "Wrap fields in a `Form`. Each `TextFormField` has a `validator: (value) => errorStringOrNull`. `FormState.validate()` runs all validators; `save()` runs `onSaved`. A `GlobalKey<FormState>` is the usual handle:\n\n```dart\nfinal _key = GlobalKey<FormState>();\nonPressed: () {\n  if (_key.currentState?.validate() ?? false) {\n    _key.currentState!.save();\n  }\n}\n```\n\n`autovalidateMode: onUserInteraction` is better UX than validating only on submit. Controllers must be **disposed**. For complex forms, prefer **reactive** validation (Riverpod/freezed model) over a giant Form with 20 `onSaved` lambdas.\n\n`TextInputFormatter` filters input; validation **does not**. Distinguish **format** vs **validate**. Use `FocusNode` for field traversal. Avoid GlobalKey if you can call validate via a callback on a child — but FormState is the documented path.",
    "pdfTopic": false,
    "tags": [
      "Form",
      "validation",
      "TextFormField"
    ]
  },
  {
    "id": "flu-041",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Key types",
    "question": "ValueKey vs ObjectKey vs UniqueKey vs GlobalKey vs PageStorageKey — pick the right one.",
    "answer": "- **`ValueKey<T>`** — identity is `==` of a primitive/id. Default for list items (`ValueKey(user.id)`).\n- **`ObjectKey`** — identity is **`identical`** of an object. Use when you key by the model **instance**.\n- **`UniqueKey`** — new identity **every construction**. Forces a **new element**. Use to **reset** a subtree, never inside a `build` that runs often.\n- **`GlobalKey`** — globally unique; you can `currentState` / `currentContext` / `currentWidget`. **Expensive** and easy to misuse (one widget in the tree). Forms, NavigatorState, measuring a widget.\n- **`PageStorageKey`** — with `PageStorage` (tab views, list scroll) persists **scroll offset**.\n- **`LabeledGlobalKey`** — debug name only.\n\nMatching algorithm: if keys are non-null, they **must** match; type still must match. Two GlobalKeys of the same instance cannot be in the tree twice.",
    "pdfTopic": false,
    "tags": [
      "ValueKey",
      "GlobalKey",
      "UniqueKey",
      "ObjectKey"
    ]
  },
  {
    "id": "flu-042",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Widget Element RenderObject",
    "question": "Compare Widget, Element, and RenderObject responsibilities in one interview answer.",
    "answer": "**Widget** — immutable description, cheap to allocate, can be `const`. Holds **configuration** (padding value, child widget). `createElement()` picks the element type.\n\n**Element** — **mutable** lifecycle node. Owns `State` (`StatefulElement`), updates children via `updateChild`, holds the **slot**, manages **InheritedWidget** dependencies. `mount`, `update`, `unmount`.\n\n**RenderObject** — layout, paint, hit test, compositing. `RenderBox` uses **box constraints**. `performLayout`, `paint`, `hitTest`. Only created by `RenderObjectElement`s.\n\nComponent widgets (`StatelessWidget`) → `ComponentElement` → **no** RenderObject; they just inflate children. That is why wrapping in extra `Builder`s is cheap **if** they don’t introduce layout.\n\nInterview closer: **rebuild** walks widgets/elements; **relayout** walks render objects; **repaint** walks layers. Optimize the phase you are actually in.",
    "pdfTopic": false,
    "tags": [
      "Element",
      "RenderObject",
      "Widget"
    ]
  },
  {
    "id": "flu-043",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Build phases",
    "question": "What are Flutter’s frame build phases, and what is illegal in each?",
    "answer": "A frame roughly:\n1. **Build** — dirty elements `rebuild()`. You may **not** modify the element tree from certain callbacks; you **may** schedule `setState`. Calling `setState` during build of the **same** widget is illegal.\n2. **Layout** — dirty render objects `layout()`. Reading `size` / `globalPaintBounds` before layout throws. `LayoutBuilder` runs in this phase (parent lays out, child builds — nested build).\n3. **Compositing / paint** — produce **layers**. `CustomPainter.paint` must be side-effect free regarding layout.\n4. **Semantics** / **finalization**.\n\n`addPostFrameCallback` runs **after** the current frame — the right place to measure (`context.size`) or show a dialog that depends on size.\n\n`markNeedsBuild` vs `markNeedsLayout` vs `markNeedsPaint` — know which you trigger. `setState` → build. Changing scroll offset → layout/paint. `RepaintBoundary` isolates paint.",
    "pdfTopic": false,
    "tags": [
      "pipeline",
      "layout",
      "paint",
      "build"
    ]
  },
  {
    "id": "flu-044",
    "category": "flutter",
    "level": "intermediate",
    "topic": "RepaintBoundary",
    "question": "What does RepaintBoundary do, and what does it not do?",
    "answer": "`RepaintBoundary` creates a **separate compositing layer** (and picture). When a descendant animates, Flutter can **repaint that layer** without re-recording the parent’s picture. DevTools “Repaint rainbow” shows the benefit.\n\nIt does **not**:\n- skip **widget rebuilds** (`setState` still rebuilds)\n- skip **layout**\n- magically make a 60fps app if you rebuild a huge list every tick\n\nCost: **more layers** → more GPU memory and compositor work. Don’t wrap every widget. Wrap **independent animations** (spinners, progress) and **expensive static** subtrees next to cheap animated ones.\n\n`alwaysNeedsCompositing` and `isRepaintBoundary` on RenderObjects are the lower-level hooks. `Opacity` below 1.0, `ClipRRect` with some clips, and **platform views** also introduce layers.",
    "pdfTopic": false,
    "tags": [
      "RepaintBoundary",
      "layers",
      "performance"
    ]
  },
  {
    "id": "flu-045",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Slivers",
    "question": "What is a sliver, and why do slivers exist instead of nested ListViews?",
    "answer": "A **sliver** is a **portion of a scrollable area** that can **lazy-layout** along the scroll axis (`RenderSliver`). `ListView` is secretly `CustomScrollView` + `SliverList` + `Viewport`.\n\nYou need slivers when **one** scrollbar must include **heterogeneous** lazy sections: app bar that shrinks, a grid, a list, a sticky header.\n\nCommon slivers:\n- `SliverAppBar` (floating / pinned / snap)\n- `SliverList` / `SliverChildBuilderDelegate`\n- `SliverGrid`\n- `SliverToBoxAdapter` — one box child (use sparingly; not lazy)\n- `SliverFillRemaining`, `SliverPadding`, `SliverPersistentHeader`\n\nNesting `ListView` inside `ListView` with `shrinkWrap` is O(n) layout. One `CustomScrollView` is O(visible).",
    "pdfTopic": false,
    "tags": [
      "slivers",
      "scroll",
      "viewport"
    ]
  },
  {
    "id": "flu-046",
    "category": "flutter",
    "level": "intermediate",
    "topic": "CustomScrollView",
    "question": "How do you assemble a CustomScrollView, and how do you keep item identity correct?",
    "answer": "`CustomScrollView(slivers: […])` feeds slivers to a `Viewport`. Example: collapsing header + lazy list + footer.\n\n```dart\nCustomScrollView(\n  slivers: [\n    const SliverAppBar(pinned: true, expandedHeight: 160, flexibleSpace: FlexibleSpaceBar(title: Text('Shop'))),\n    SliverGrid.builder(\n      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),\n      itemBuilder: (_, i) => Tile(items[i]),\n      itemCount: items.length,\n    ),\n    SliverToBoxAdapter(child: Footer()),\n  ],\n);\n```\n\n`SliverChildBuilderDelegate` has `findChildIndexCallback` for **animated** diffs (like `ListView.builder` keys). Provide **keys** on children. `cacheExtent` controls how far off-screen you prebuild (memory vs smoothness).\n\n`NestedScrollView` is for **outer + inner** (tab bars). It is easy to get physics wrong — mention it only if you have used it.",
    "pdfTopic": false,
    "tags": [
      "CustomScrollView",
      "SliverAppBar",
      "SliverGrid"
    ]
  },
  {
    "id": "flu-047",
    "category": "flutter",
    "level": "intermediate",
    "topic": "AnimationController",
    "question": "How do AnimationController, Tween, and Animation<T> fit together?",
    "answer": "An `Animation<T>` is a **listenable value** over time. `AnimationController` is an `Animation<double>` from `0..1` (or unbounded) that needs a `Ticker` (`vsync: this` via `SingleTickerProviderStateMixin`).\n\n`Tween<T>(begin:, end:).animate(controller)` maps 0–1 to `T`. `CurvedAnimation(parent: controller, curve: Curves.easeOut)` inserts a curve. Drive with `controller.forward()` / `repeat()` / `fling()`.\n\n```dart\n_c = AnimationController(vsync: this, duration: const Duration(milliseconds: 300));\n_color = ColorTween(begin: Colors.grey, end: Colors.teal).animate(_c);\n```\n\nAlways `dispose` the controller. One mixin per ticker count (`TickerProviderStateMixin` for many). Listen with `AnimatedBuilder` / `ListenableBuilder` so you **don’t** `setState` on every tick at a high ancestor.\n\n`Tween` is **lazy** — it does not store the animation; `.animate` / `.chain` does.",
    "pdfTopic": false,
    "tags": [
      "AnimationController",
      "Tween",
      "vsync"
    ]
  },
  {
    "id": "flu-048",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Implicit vs explicit animation",
    "question": "Implicit vs explicit animations: AnimatedContainer vs AnimationController, and when to pick which?",
    "answer": "**Implicit** widgets (`AnimatedContainer`, `AnimatedOpacity`, `AnimatedAlign`, `TweenAnimationBuilder`) **animate whenever the target property changes**. Flutter owns the controller. Great for theme toggles, simple layout morphs.\n\n**Explicit** (`AnimationController` + `AnimatedBuilder` / `SlideTransition`) when you need:\n- a **single ticker** driving many properties\n- **status listeners** (run after complete)\n- **staggered** / shared sequences\n- physics (`SpringSimulation`)\n\n`AnimatedSwitcher` is implicit **between child identities** (keys matter). `Hero` is a **flight** across routes, not a local implicit widget.\n\nInterview rule: start implicit; graduate to explicit when you fight the API. Don’t mix two controllers on the same property.",
    "pdfTopic": false,
    "tags": [
      "implicit-animation",
      "explicit-animation",
      "AnimatedContainer"
    ]
  },
  {
    "id": "flu-049",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Hero",
    "question": "How does Hero animation work across routes, and what are the usual breakage reasons?",
    "answer": "A `Hero` wraps a widget with a **tag**. When a route transition runs, Flutter **lifts** matching heroes into the overlay and **tweens** their position/size (and uses `flightShuttleBuilder` if you customize). Tags must be **unique per navigator subtree** during the flight.\n\nBreakage:\n- **Duplicate tags** on the same navigator.\n- Destination hero **not in the tree** at push time (lazy list not built — use a placeholder hero or ensure the target is built).\n- `ListView` recycling: tag from a builder is fine if ids are unique.\n- Nested navigators: heroes only fly **within** the navigator that performs the route transition.\n\n`Hero` default uses `MaterialRectArcTween`. For images, wrap the **same** widget type both sides (both `Image`) to avoid a snap at the end.",
    "pdfTopic": false,
    "tags": [
      "Hero",
      "navigation",
      "animation"
    ]
  },
  {
    "id": "flu-050",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Isolates vs compute",
    "question": "When do you leave the UI isolate? Isolates vs compute at a high level.",
    "answer": "The **UI isolate** must produce a frame ~every 16ms. JSON decode of a 10 MB payload, image transforms, crypto — **move off**.\n\n`compute(fn, message)` (from `flutter/foundation`) **spawns** (or reuses, implementation-dependent historically) an isolate, **sends** the message, runs `fn`, **returns** the result. `fn` must be a **top-level or static** function (not a closure capturing UI objects) because it is the **entry** in the other isolate.\n\nIsolates **do not share memory**. You send **copies** (or transferable typed data). You cannot pass a `BuildContext` or a `Socket` you still use on the UI isolate.\n\nFor long-lived workers, keep an isolate warm with `Isolate.spawn` + `SendPort` instead of spawning per call. See also `Isolate.run` (Dart 2.19+) which is the language-level version of compute.",
    "code": "final parsed = await compute(jsonDecode, rawString);\n// jsonDecode must be top-level / tear-off, which it is.",
    "pdfTopic": false,
    "tags": [
      "isolates",
      "compute",
      "performance"
    ]
  },
  {
    "id": "flu-051",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Event loop and microtasks",
    "question": "Describe Dart’s event loop: events vs microtasks, and why Future.then can run before a Timer.",
    "answer": "Each isolate has:\n- a **microtask queue** (higher priority)\n- an **event queue** (I/O, timer, incoming ports, frame callbacks)\n\nAfter each event, Dart **drains all microtasks** before the next event. `scheduleMicrotask`, `Future.microtask`, and completing a Future typically enqueue **microtasks**. `Timer`, `Future.delayed`, I/O, and `Future(() => …)` enqueue **events**.\n\n```dart\nFuture(() => print('event'));\nscheduleMicrotask(() => print('micro'));\n// prints: micro, then event\n```\n\nJank: a **long microtask chain** (thousands of `then`s) **starves frames**. Break CPU work into chunks with `await Future<void>.delayed(Duration.zero)` or an isolate.\n\n`SynchronousFuture` / completing in the same sync call can surprise `then` listeners — the framework avoids sync re-entrancy for a reason.",
    "pdfTopic": false,
    "tags": [
      "event-loop",
      "microtask",
      "Future"
    ]
  },
  {
    "id": "flu-052",
    "category": "flutter",
    "level": "intermediate",
    "topic": "MethodChannel",
    "question": "How does a MethodChannel talk to Android/iOS, and what can you pass?",
    "answer": "A **MethodChannel** is a named **binary messenger** pipe. Dart `invokeMethod('getBattery')` encodes arguments with **StandardMessageCodec** (null, bool, int, double, String, Uint8List, List, Map) and the platform plugin’s handler returns a result or `PlatformException`.\n\n```dart\nconst ch = MethodChannel('shop.dev/battery');\nfinal level = await ch.invokeMethod<int>('getLevel');\n```\n\nAndroid: `MethodChannel` in Kotlin on a `FlutterPlugin` binding. iOS: Swift `FlutterMethodChannel`. The name **must match**.\n\nCodec limits: you cannot send an arbitrary Dart object. Write a **codec** or pass JSON strings. Calls are **asynchronous**. Heavy work on the **platform main thread** ANRs Android — hop to a background thread **on the native side**, then reply.\n\nMissing plugin registration (add-to-app) is a common production bug.",
    "pdfTopic": false,
    "tags": [
      "MethodChannel",
      "plugins",
      "platform"
    ]
  },
  {
    "id": "flu-053",
    "category": "flutter",
    "level": "intermediate",
    "topic": "EventChannel",
    "question": "When do you use EventChannel instead of MethodChannel?",
    "answer": "**EventChannel** is a **stream** of events from platform to Dart (`receiveBroadcastStream()`). Use it for **sensor ticks**, connectivity, charging state — anything that is **push**, not request/response.\n\n```dart\nEventChannel('shop.dev/connectivity')\n    .receiveBroadcastStream()\n    .map((e) => e as String);\n```\n\nNative side: `EventChannel.EventSink` `success` / `error` / `endOfStream`. Lifecycle: Dart subscription **listen/cancel** should start/stop native listeners or you leak sensors.\n\n**MethodChannel** can still **simulate** streams with repeated invokes — don’t. **BasicMessageChannel** is a lower-level duplex with a custom codec.\n\nCombine: method to **start** a native recorder, event channel for **buffers**.",
    "pdfTopic": false,
    "tags": [
      "EventChannel",
      "streams",
      "platform"
    ]
  },
  {
    "id": "flu-054",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Plugin vs package",
    "question": "Package vs plugin vs FFI package — what ships in each?",
    "answer": "- **Package** — Dart-only (`http`, `equatable`, `go_router`). Works everywhere the Dart SDK runs (with caveats for `dart:io` vs web).\n- **Plugin** — Dart **plus** platform implementations (`android/`, `ios/`, `macos/`, federated `*_android` packages). Uses channels or FFI. Declared with `flutter.plugin` in pubspec.\n- **FFI package** — Dart calls **C symbols** (`dart:ffi`) in a bundled `.so` / `.dylib` / `.dll`. No Java/Kotlin required if the native lib is portable.\n\nFederated plugins: a **app-facing** package + **platform** packages + **platform_interface**. That is how `path_provider` works.\n\nInterviewer: “Can a package use `dart:html`?” Only if it is web-conditional (`kIsWeb` + separate files with `stub` implementations). `universal_io` style shims have limits.",
    "pdfTopic": false,
    "tags": [
      "plugin",
      "package",
      "FFI",
      "federated"
    ]
  },
  {
    "id": "flu-055",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Flavors",
    "question": "How do you set up Android product flavors and iOS schemes for Flutter, and how do you switch Dart code?",
    "answer": "**Flavors** = multiple **branded binaries** (dev/staging/prod) with different **applicationId / bundle id**, icons, Firebase configs, and API bases.\n\nAndroid: `productFlavors` in `build.gradle` (`dev`, `prod`) + `--flavor dev`. iOS: **schemes + xcconfig** + `flutter run --flavor dev --target lib/main_dev.dart` (or one `main.dart` + `--dart-define=ENV=dev`).\n\nDart side:\n- **`--dart-define=API=https://…`** / `--dart-define-from-file`\n- separate `main_dev.dart` that calls `runApp` with a different `AppConfig`\n- `const bool.fromEnvironment('dart.vm.product')` is **release**, not flavor\n\nDo not rely on `kDebugMode` as a flavor. Debug **prod** is a thing. Keep flavor names **identical** across Android/iOS or CI will hurt.",
    "pdfTopic": false,
    "tags": [
      "flavors",
      "dart-define",
      "CI"
    ]
  },
  {
    "id": "flu-056",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Localization",
    "question": "How does Flutter localization (gen-l10n) work, and what must MaterialApp get?",
    "answer": "Official path: ARB files + `flutter gen-l10n` → `AppLocalizations`. Wire:\n\n```dart\nMaterialApp(\n  localizationsDelegates: AppLocalizations.localizationsDelegates,\n  supportedLocales: AppLocalizations.supportedLocales,\n);\n```\n\nThat includes **Material/Cupertino/Widgets** delegates so stock widgets (date picker, back tooltip) translate too. Access: `AppLocalizations.of(context)!.hello`.\n\nICU placeholders, plurals, genders live in ARB. `localeResolutionCallback` handles fallbacks. For runtime language switch, change `locale:` on `MaterialApp` (or a `Localizations.override`).\n\nDo not concatenate translated sentences. Do not use `toString()` on enums for user strings. Extract **early**; gen-l10n is cheap.",
    "pdfTopic": false,
    "tags": [
      "l10n",
      "ARB",
      "gen-l10n"
    ]
  },
  {
    "id": "flu-059",
    "category": "flutter",
    "level": "intermediate",
    "topic": "State restoration",
    "question": "How does Flutter state restoration work across process death?",
    "answer": "Android (and now more of the ecosystem) can **kill** the process while the user is in the recents list. `RestorationMixin` on `State` plus a **restorationId** on `MaterialApp` / `Navigator` / scrollables persists a **restoration bucket** (key-value, primitive-ish data).\n\n```dart\nclass _S extends State<W> with RestorationMixin {\n  final RestorableInt _tab = RestorableInt(0);\n  @override\n  String? get restorationId => 'home';\n  @override\n  void restoreState(RestorationBucket? old, bool initialRestore) {\n    registerForRestoration(_tab, 'tab');\n  }\n}\n```\n\nThis is **not** a database. Store **IDs and indices**, not whole user objects. `RestorableTextEditingController` exists. go_router can restore **location** if configured.\n\nHot restart is **not** process death. Test with “Don’t keep activities” on Android.",
    "pdfTopic": false,
    "tags": [
      "restoration",
      "RestorationMixin",
      "process-death"
    ]
  },
  {
    "id": "flu-060",
    "category": "flutter",
    "level": "intermediate",
    "topic": "get_it",
    "question": "How does get_it implement service location, and how is it different from constructor injection / Riverpod?",
    "answer": "**get_it** is a **service locator**: `GetIt.I.registerLazySingleton<Api>(() => Api());` then `GetIt.I<Api>()`. It is **not** a reactive state tool. It shines for **infrastructure** (logger, analytics, repositories) and for **BLoC** construction.\n\n```dart\nfinal getIt = GetIt.instance;\ngetIt.registerLazySingleton<AuthApi>(() => AuthApi(getIt()));\n```\n\nCompared with **constructor injection**, locator hides the graph — tests must **reset** GetIt. Compared with **Riverpod**, GetIt does not rebuild widgets; you still `notifyListeners` separately.\n\n`registerSingleton` vs `lazySingleton` vs `factory` (new instance each `get`). Call `unregister` / `reset` in tests. Avoid `GetIt` for **ephemeral UI state**.",
    "pdfTopic": false,
    "tags": [
      "get_it",
      "DI",
      "service-locator"
    ]
  },
  {
    "id": "flu-061",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Immutable state",
    "question": "Why do Flutter state libraries push immutable state, and how do you update a nested field?",
    "answer": "Immutable state + **new object identity** (or Equatable `==`) lets you **skip rebuilds** and reason about time (devtools timeline, undo, replay). Mutating a list in place and calling `notifyListeners` **without** a new reference is a classic “UI didn’t update” bug if a child compared the old list.\n\nPatterns:\n- `copyWith` on a class / **freezed**\n- `List.of(old)..add(x)` or collection `spread`\n- **sealed** unions for load/success/error instead of mutating flags\n\n```dart\nstate = state.copyWith(items: [...state.items, item]);\n```\n\nImmutability is **not** required by `setState` (you can mutate `_items` then `setState`). It **is** required for sound BLoC/Riverpod equality. Don’t deep-copy megabyte images; store IDs.",
    "pdfTopic": false,
    "tags": [
      "immutability",
      "copyWith",
      "state"
    ]
  },
  {
    "id": "flu-062",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Equatable",
    "question": "What does Equatable buy you, and where does it bite?",
    "answer": "`Equatable` implements `==` and `hashCode` from a `props` list so **value equality** works in BLoC, tests, and `Set`s.\n\n```dart\nclass User extends Equatable {\n  const User(this.id, this.name);\n  final String id, name;\n  @override\n  List<Object?> get props => [id, name];\n}\n```\n\nBites:\n- Forgetting a field in `props` → silent “equal” bugs.\n- Including a **mutable** list that you mutate in place → `==` still true, UI skips.\n- `stringify` in debug only.\n- **freezed** generates `==` for you; don’t double-wrap.\n\n`identical` is still faster; Equatable is for **model** types, not for widgets (`Widget` equality is not how Flutter diffs trees — **keys and types** are).",
    "pdfTopic": false,
    "tags": [
      "Equatable",
      "equality",
      "BLoC"
    ]
  },
  {
    "id": "flu-063",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Sealed classes",
    "question": "How do Dart 3 sealed classes change Flutter state modeling vs enums + optional fields?",
    "answer": "`sealed class` restricts subtypes to the **same library**, enabling **exhaustive `switch`**. That replaces `enum Status { loading, data, error }` plus nullable `data`/`error` fields.\n\n```dart\nsealed class AuthState {}\nclass AuthIdle extends AuthState {}\nclass AuthLoading extends AuthState {}\nclass AuthSession extends AuthState { AuthSession(this.user); final User user; }\nclass AuthError extends AuthState { AuthError(this.msg); final String msg; }\n```\n\n`switch (state) { AuthSession(:final user) => …, … }` — the compiler **errors** if you forget a variant. **freezed** still helps with `copyWith` and unions; language sealed classes are enough for many blocs.\n\n`final class` / `base` / `interface` modifiers (Dart 3) control whether outsiders `extend` or `implement`. Mention them if asked about API design.",
    "pdfTopic": false,
    "tags": [
      "sealed",
      "Dart-3",
      "pattern-matching"
    ]
  },
  {
    "id": "flu-064",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Mixins vs extends vs implements",
    "question": "extends vs implements vs with (mixins) — how does Flutter use all three?",
    "answer": "- **`extends`** — single **superclass**. You inherit implementation. `State<T> extends Diagnosticable`.\n- **`implements`** — you **promise the API**, inherit **no** code. `implements Exception`.\n- **`with Mixin`** — **linearized** mixin application. Mixins cannot have a constructor (historically; `mixin class` evolved). Flutter: `TickerProviderStateMixin`, `RestorationMixin`, `WidgetsBindingObserver`.\n\n`mixin on State<T>` **restricts** the host type so the mixin can call `setState`.\n\n```dart\nclass _S extends State<W> with SingleTickerProviderStateMixin, RestorationMixin\n```\n\nOrder is **rightmost wins** for colliding members (mixin linearization). Prefer mixins for **capability**; prefer composition for **business** logic. Don’t `extend Widget` — extend `StatelessWidget`/`StatefulWidget`.",
    "pdfTopic": false,
    "tags": [
      "mixin",
      "implements",
      "extends",
      "Dart"
    ]
  },
  {
    "id": "flu-065",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Extension methods",
    "question": "What are extension methods, and what are the Flutter-idiomatic uses vs abuses?",
    "answer": "Extensions add **static dispatch** methods/getters on a type **without** subclassing. Resolution is **compile-time** based on the **static** type, not runtime (unlike true instance methods).\n\n```dart\nextension on BuildContext {\n  ThemeData get theme => Theme.of(this);\n  void pop<T>([T? v]) => Navigator.of(this).pop(v);\n}\n```\n\nGood: `context.l10n`, padding helpers, `String?` emptiness. Bad: hiding **expensive** work in a cute getter; extensions on `dynamic`; **name clashes** across packages (you must hide/show in import).\n\nYou cannot add **fields** (no extra storage). `extension type` (Dart 3) is a different, **zero-cost wrapper** feature — mention only if asked.",
    "pdfTopic": false,
    "tags": [
      "extension",
      "BuildContext",
      "Dart"
    ]
  },
  {
    "id": "flu-066",
    "category": "flutter",
    "level": "intermediate",
    "topic": "typedef",
    "question": "What are typedefs in Dart, and where does Flutter’s API use them?",
    "answer": "A `typedef` names a **function type** (and, since Dart 2, any type alias).\n\n```dart\ntypedef ItemBuilder = Widget Function(BuildContext context, int index);\ntypedef Json = Map<String, dynamic>;\n```\n\nFlutter is full of them: `WidgetBuilder`, `ValueChanged<T>`, `FormFieldValidator<T>`, `RouteFactory`. They make **callback** parameters readable and allow `required WidgetBuilder builder`.\n\nGeneric typedefs: `typedef Parser<T> = T Function(String)`. Prefer a **real class** if the callback grows more than two arguments or needs a name in stack traces — but typedefs are idiomatic for UI callbacks.\n\n`Function` as a type is too wide; always typedef or write the function type inline.",
    "pdfTopic": false,
    "tags": [
      "typedef",
      "callbacks",
      "Dart"
    ]
  },
  {
    "id": "flu-067",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Cascade spread collections",
    "question": "Explain the cascade operator, spread, and collection if/for — interview snippets.",
    "answer": "**Cascade** `..` returns the **original** receiver so you can chain mutations:\n\n```dart\nfinal paint = Paint()\n  ..color = Colors.teal\n  ..strokeWidth = 2;\n```\n\n`?..` is null-aware cascade.\n\n**Spread** `...list` / `...?maybeList` inlines elements. **Collection if/for** are **not** statements; they are elements:\n\n```dart\nWidget build(BuildContext c) => Column(children: [\n  const Text('Header'),\n  if (loading) const CircularProgressIndicator(),\n  for (final item in items) ItemTile(item),\n  ...footerWidgets,\n]);\n```\n\nThese keep `build()` declarative. Don’t put **side effects** in collection-for. Cascades on widgets are rare (`List`/`Paint`/`Path` are the usual).",
    "pdfTopic": false,
    "tags": [
      "cascade",
      "spread",
      "collection-if"
    ]
  },
  {
    "id": "flu-068",
    "category": "flutter",
    "level": "intermediate",
    "topic": "ChangeNotifier",
    "question": "ChangeNotifier vs ValueNotifier vs ListenableBuilder — when is setState enough?",
    "answer": "`Listenable` is the contract. **`ChangeNotifier`** is a Listenable with `notifyListeners()`. **`ValueNotifier<T>`** is a ChangeNotifier that holds one value and notifies on **`value` set** (even if `==` — it notifies on **assignment**; know that).\n\n`ListenableBuilder` / `AnimatedBuilder` / `ValueListenableBuilder` rebuild **only their builder**, which is why they beat a fat `setState` at the page root.\n\n```dart\nfinal n = ValueNotifier(0);\nValueListenableBuilder(\n  valueListenable: n,\n  builder: (_, v, __) => Text('$v'),\n);\n```\n\n`setState` is enough for **truly local** ephemeral state (checkbox anim, password visibility). Lift to a notifier when **two widgets** need the same tick or when you want to **test** without pumping the whole page.\n\nDispose notifiers you **own**. Don’t dispose those provided from above.",
    "pdfTopic": false,
    "tags": [
      "ChangeNotifier",
      "ValueNotifier",
      "ListenableBuilder"
    ]
  },
  {
    "id": "flu-069",
    "category": "flutter",
    "level": "advanced",
    "topic": "Impeller vs Skia",
    "question": "Impeller vs Skia: what problem was Impeller built to solve, and how does the architecture differ?",
    "answer": "**Skia** is a general 2D engine. On mobile it often **compiled shaders at first use**, which caused **first-run jank** (especially iOS). **Impeller** is Flutter’s purpose-built renderer: it **precompiles** a smaller, known shader set ahead of time, uses a **modern HAL** (Metal, Vulkan, GLES where needed), and aims for **predictable frame times**.\n\nArchitecture: framework still produces a **layer/display list**; the engine’s renderer tessellates and records GPU commands. Impeller prefers **simpler, deeper pipelines** over Skia’s huge shader combinatorics.\n\nImpeller is **not** a Dart API change. You still write widgets. Differences show up in **blur, color filters, image sampling, and rare CustomPainter** edge cases. If a bug is renderer-specific, dual-boot with `--no-enable-impeller` for diagnosis (flag availability depends on version/platform).\n\nWeb still uses **CanvasKit (Skia WASM)** or **skwasm** — Impeller is a **mobile/desktop engine** story.",
    "pdfTopic": false,
    "tags": [
      "Impeller",
      "Skia",
      "rendering",
      "shaders"
    ]
  },
  {
    "id": "flu-070",
    "category": "flutter",
    "level": "advanced",
    "topic": "Impeller platform status",
    "question": "What is Impeller’s status on iOS vs Android, and how do you opt out or debug renderer issues?",
    "answer": "**iOS:** Impeller has been the **default** since Flutter 3.16 (late 2023). Skia on iOS is legacy. **Android:** Impeller became **default later** (3.27 era / Vulkan-capable devices); older GPUs may fall back. Always check the **current** release notes — this is a moving target interviewers like.\n\nOpt-out (when still supported):\n- Android: `io.flutter.embedding.android.EnableImpeller` meta-data `false`, or run flag `--no-enable-impeller`\n- iOS: Info.plist / engine flag similarly named (version-specific)\n\nDebug: DevTools **performance** + **shader compilation** events; `flutter run --enable-impeller` vs without; capture **frame raster** time vs UI time. If **only** the first animation janks, think shaders/PSO warmup even under Impeller (smaller set, not zero).\n\nNever tell a user “disable Impeller” as a product fix without a filed engine issue.",
    "pdfTopic": false,
    "tags": [
      "Impeller",
      "iOS",
      "Android",
      "flags"
    ]
  },
  {
    "id": "flu-071",
    "category": "flutter",
    "level": "advanced",
    "topic": "Jank and profiling",
    "question": "How do you diagnose Flutter jank? Separate UI isolate time, raster time, and build vs layout vs paint.",
    "answer": "A **jank** is a frame that misses vsync (~16ms at 60Hz, ~8ms at 120Hz). DevTools **Performance** view splits:\n- **UI thread (Dart)** — build + layout + record display list\n- **Raster thread (engine)** — GPU command generation / Impeller\n- **GPU** — actual GPU\n\nIf UI bar is long: too much `build`, JSON on UI isolate, `saveLayer` from clips/opacity. If raster is long: expensive layers, images, blurs, platform views. If GPU is long: fill rate, giant textures.\n\nTools:\n- `PerformanceOverlay` / `debugPrintRebuildDirtyWidgets`\n- Timeline **shader compilation**\n- `flutter run --profile` (not debug — debug is **not** representative; asserts + JIT)\n- DevTools memory for GC pauses\n\nFix the **phase** you measured. Wrapping everything in `RepaintBoundary` without a profile is cargo cult.",
    "pdfTopic": false,
    "tags": [
      "jank",
      "DevTools",
      "profile",
      "raster"
    ]
  },
  {
    "id": "flu-072",
    "category": "flutter",
    "level": "advanced",
    "topic": "Shader compilation",
    "question": "What is shader compilation jank, and what did Flutter do about it besides Impeller?",
    "answer": "A **shader** is GPU microcode for a specific **paint configuration** (blend + color filter + tile mode + …). Skia generated these **lazily**. The first time a blur or a new blend appeared, the **raster thread stalled**.\n\nMitigations historically:\n- **SkSL / precompiled shader bundles** (`flutter run --cache-sksl`, then `flutter build` with bundle) — awkward, device-specific\n- **Warm-up** frames in splash (hacky)\n- **Impeller** — finite PSO/shader library **at engine build time**\n\nInterview: Impeller **does not** eliminate all first-frame cost (pipeline state objects, texture uploads). It **eliminates combinatorial runtime Skia shader compilation** as the main iOS jank source.\n\n`saveLayer` and **ImageFilter.blur** are still expensive. Prefer **simple opacity animation** on a layer over animating `ColorFiltered` across a huge subtree.",
    "pdfTopic": false,
    "tags": [
      "shaders",
      "jank",
      "Impeller",
      "Skia"
    ]
  },
  {
    "id": "flu-073",
    "category": "flutter",
    "level": "advanced",
    "topic": "Tree shaking",
    "question": "How does Dart tree shaking work in Flutter release builds, and what keeps code alive?",
    "answer": "Release/AOT uses **tree shaking**: starting from `main`, the compiler **drops unreachable** libraries and classes. Icons: `Icons.foo` constant references keep only used **MaterialIcons** codepoints when using the tree-shaken icon font (`uses-material-design` + const IconData).\n\nWhat **defeats** shaking:\n- `dart:mirrors` (not in Flutter)\n- **reflective** `fromJson` via `jsonDecode` to `Map` is fine; `package:reflectable` is not typical\n- **`dynamic` invocations** can retain more\n- **deferred libraries** still shake **within** each load unit\n- native plugins: **ProGuard/R8 / iOS dead strip** is a **separate** pass — unused Kotlin might still ship if not minified\n\n`const` constructors help **canonicalization**, not shaking. `--split-debug-info` + obfuscation (`--obfuscate`) shrinks and hides names; retain mapping for crash symbolication.\n\nDebug/JIT **does not** tree-shake like release. Always measure **app size** on a release APK/IPA/AAB.",
    "pdfTopic": false,
    "tags": [
      "tree-shaking",
      "AOT",
      "app-size"
    ]
  },
  {
    "id": "flu-074",
    "category": "flutter",
    "level": "advanced",
    "topic": "AOT vs JIT",
    "question": "AOT vs JIT in Flutter: which mode uses which compiler, and why can you not hot-reload a release build?",
    "answer": "- **Debug:** **JIT** (mobile) or **DDC/dartdevc** (web). Kernel is compiled on device incrementally → **hot reload**. Extra checks, no tree shake, observatory.\n- **Profile:** **AOT** (like release) **with** service protocol / tracing. Use this for **performance** numbers.\n- **Release:** **AOT** to machine code (ARM/x64) or **dart2js / dart2wasm** on web. No JIT, no hot reload, asserts stripped (`kReleaseMode`).\n\nHot reload **patches** a running JIT heap. AOT has **no Dart VM compiler** on device (on mobile) — there is nothing to patch besides a full restart.\n\n`kDebugMode` / `kProfileMode` / `kReleaseMode` are **const** and tree-shaken, so debug-only branches vanish in release. Don’t put needed production logic in `assert`.",
    "pdfTopic": false,
    "tags": [
      "AOT",
      "JIT",
      "build-modes"
    ]
  },
  {
    "id": "flu-075",
    "category": "flutter",
    "level": "advanced",
    "topic": "Deferred loading",
    "question": "How does deferred loading (lazy Dart imports) work, and where is it actually useful?",
    "answer": "`import 'heavy.dart' deferred as heavy;` then `await heavy.loadLibrary();` downloads/loads a **separate** code unit. On **web**, this is a real **chunk** (smaller initial JS/Wasm). On **mobile AOT**, deferred loading support is **limited / historically incomplete** compared with web — interviewers expect “great for Flutter **web** code splitting; don’t assume APK feature modules.”\n\n```dart\nimport 'charts.dart' deferred as charts;\nFuture<void> openCharts() async {\n  await charts.loadLibrary();\n  runApp(charts.ChartsApp());\n}\n```\n\nConstants across deferred units have **identity caveats**. Types from a deferred library cannot be used in signatures until loaded. Combine with **routes** so a charting package isn’t in the first paint.\n\nFor mobile size, prefer **splitting features at the store** (on-demand Play modules — not first-class Flutter), shrinking assets, and R8 — not deferred Dart.",
    "pdfTopic": false,
    "tags": [
      "deferred",
      "code-splitting",
      "web"
    ]
  },
  {
    "id": "flu-076",
    "category": "flutter",
    "level": "advanced",
    "topic": "dart:ffi",
    "question": "When do you use dart:ffi instead of a MethodChannel, and what are the safety rules?",
    "answer": "**FFI** calls **C ABI** functions in-process: codecs, SQLite (Isar/Drift native), ML, crypto. It is **orders of magnitude faster** than channel hops for **tight loops**, and works **without** JNI if you ship a `.so`.\n\n```dart\nfinal dylib = DynamicLibrary.open('libnative.so');\nfinal add = dylib.lookupFunction<Int32 Function(Int32, Int32), int Function(int, int)>('add');\n```\n\nRules:\n- Match **ABI** (packing, 32/64-bit, calling convention).\n- Manage **memory** (`malloc`/`free`, `Arena` from `package:ffi`).\n- **Do not** block the UI isolate — run FFI in `Isolate.run` if the call is heavy.\n- **NativeCallable** / callbacks from native **into** Dart must target the right isolate.\n- iOS: static linking vs dylib; Android: `jniLibs`.\n\nChannels still win for **Activity** APIs, permissions, and AndroidX. FFI wins for **pure computation** already written in C++.",
    "pdfTopic": false,
    "tags": [
      "FFI",
      "native",
      "performance"
    ]
  },
  {
    "id": "flu-077",
    "category": "flutter",
    "level": "advanced",
    "topic": "Isolates memory model",
    "question": "Describe the isolate memory model: what is copied, what can be transferred, and what cannot be sent?",
    "answer": "Each isolate has its **own GC heap**. `SendPort.send` **copies** most messages (primitives, lists, maps, typed data **copy**). **Identity is not preserved** except for a few interned values.\n\n**TransferableTypedData** (and newer **transferable** APIs) move **ownership** of a byte buffer **without copy**. After transfer, the sender **must not** touch it.\n\nCannot send:\n- `ReceivePort` (you send the `SendPort`)\n- most `dart:io` sockets (use `SocketReference` patterns / reopen)\n- `BuildContext`, widgets, `EngineLayer`\n- closures that capture **the wrong isolate’s** objects (the closure itself may send if it is a tear-off of a **static** function)\n\n`IsolateNameServer` registers ports by name for plugins. Root isolate vs worker: **Flutter bindings exist only on the root** isolate — you cannot `setState` from a worker.",
    "pdfTopic": false,
    "tags": [
      "isolates",
      "SendPort",
      "memory"
    ]
  },
  {
    "id": "flu-078",
    "category": "flutter",
    "level": "advanced",
    "topic": "compute vs Isolate.run",
    "question": "compute vs Isolate.run vs a long-lived Isolate.spawn pool — which do you pick?",
    "answer": "- **`compute`**: Flutter helper. Sends one message, runs a **top-level** function, returns one result, **kills** the isolate. Extra **spawn cost** (~tens of ms + memory). Fine for occasional JSON.\n- **`Isolate.run`**: Dart SDK equivalent (`dart:isolate`). Same one-shot pattern, slightly more primitive, **no Flutter dependency** — preferred in Dart-only packages. Capturing **non-sendable** closures **throws**.\n- **`Isolate.spawn` + ports**: **reuse** a worker for a queue of jobs (image pipeline). You pay spawn once. Need an **error port** and a **kill** strategy.\n\n```dart\nfinal out = await Isolate.run(() => decodeHeavy(bytes));\n```\n\nDo not `compute` **per list item** in a builder. Batch. For **platform channels** from a worker isolate you need `BackgroundIsolateBinaryMessenger.ensureInitialized(token)` with the **root isolate token**.",
    "pdfTopic": false,
    "tags": [
      "Isolate.run",
      "compute",
      "BackgroundIsolateBinaryMessenger"
    ]
  },
  {
    "id": "flu-079",
    "category": "flutter",
    "level": "advanced",
    "topic": "Platform views",
    "question": "Why are platform views expensive in Flutter, and when are they justified?",
    "answer": "A **platform view** (`AndroidView` / `UiKitView` / `HtmlElementView`) embeds an **OEM view** (WebView, maps, camera preview, AdMob) into Flutter’s scene. Flutter must **composite** two rendering worlds: synchronize transforms, clips, touches, and often **split** the Flutter layer tree around the foreign surface.\n\nCost:\n- extra **GPU surfaces** / texture copies\n- **touch** arbitration\n- ** Impeller/Skia** cannot paint **into** the WebView\n- scrolling **competition** (nested scrollables feel wrong)\n\nJustified: Maps, WebView, some cameras, ads SDKs that **refuse** to draw to a texture. Prefer **Flutter-painted** equivalents (Google Maps via tile plugins, `webview_flutter` only when you truly need HTML).\n\nMinimize the **number** of simultaneous platform views. Animate **Flutter** widgets around them, not the platform view itself if you can.",
    "pdfTopic": false,
    "tags": [
      "platform-view",
      "AndroidView",
      "UiKitView"
    ]
  },
  {
    "id": "flu-080",
    "category": "flutter",
    "level": "advanced",
    "topic": "Hybrid composition vs virtual display",
    "question": "Android Hybrid Composition vs Virtual Display vs Texture Layer — what changed, and what should you say in 2026?",
    "answer": "Historically Flutter Android platform views had two modes:\n- **Virtual Display (VD):** the Android view rendered to a **virtual display**, copied to a **texture**. Good isolation, **bad** accessibility, **bad** keyboard, blurry on some devices, extra memory.\n- **Hybrid Composition (HC):** the Android view is in the **real** view hierarchy; Flutter draws **in holes** around it (or uses overlay windows). Better a11y/keyboard; **more** compositor complexity and **first-pixel** issues on older APIs.\n\nCurrent embedding **prefers Hybrid Composition** (and later **texture-layer** / “TLHC” hybrids depending on version) as default for `AndroidView`. `initExpensiveAndroidView` vs `initAndroidView` signaled the cheaper/expensive paths.\n\nInterview: name **VD vs HC**, say **HC is default**, VD is legacy, and **texture-based** composition is the ongoing engine work to paint the platform view onto a **texture** without VD’s a11y pain. Always test **keyboard + TalkBack + WebView** on a real device.",
    "pdfTopic": false,
    "tags": [
      "hybrid-composition",
      "virtual-display",
      "Android"
    ]
  },
  {
    "id": "flu-081",
    "category": "flutter",
    "level": "advanced",
    "topic": "Texture layer",
    "question": "What is a Flutter Texture / TextureRegistry, and how is it different from a platform view?",
    "answer": "A **Texture** is an engine object (`textureId`) that the rasterizer **samples like an image** in the layer tree (`TextureLayer`). Native code **pushes frames** into a `SurfaceTexture` / `TextureRegistry` (camera plugin, video player, offscreen Android surfaces).\n\nUnlike a platform view:\n- Flutter **fully owns** composition, clips, transforms, opacity\n- **No hole-punching** of the Android view hierarchy\n- You **lose** native child views / Android accessibility tree inside the texture (you must **mirror** a11y in Flutter semantics)\n- Typically **lower cost** if the producer already renders to a surface (ExoPlayer)\n\n`Texture` widget is the Dart side. Plugins register with `FlutterEngine.renderer` / `TextureRegistry`. This is the preferred path for **video** and **camera previews** when you don’t need Android widgets as children.",
    "pdfTopic": false,
    "tags": [
      "Texture",
      "TextureRegistry",
      "video"
    ]
  },
  {
    "id": "flu-082",
    "category": "flutter",
    "level": "advanced",
    "topic": "Custom RenderObject",
    "question": "When do you write a custom RenderObject, and what is the minimal pipeline?",
    "answer": "Write a `RenderObject` when **existing layout** cannot express the geometry (circular menus, custom flow, paragraph-like chips that wrap with custom rules) or you need **paint that participates in layout** (not just `CustomPaint` over a fixed size).\n\nMinimal path:\n1. `LeafRenderObjectWidget` / `MultiChildRenderObjectWidget`\n2. `RenderBox` subclass\n3. `performLayout` — `size = constraints.constrain(…)` and layout children\n4. `paint` — `context.paintChild` / `canvas`\n5. `hitTestSelf` / `hitTestChildren`\n6. Parent data class if children need **offset** (`ContainerBoxParentData`)\n\n`CustomPaint` is enough when **size is independent** of paint (a chart with a given aspect). If **height depends on width** of text you measured, you need `performLayout` + `computeDryLayout`.\n\nThis is **senior** territory. Mention `debugAssertDoesMeetConstraints`.",
    "code": "class RenderSquare extends RenderBox {\n  @override\n  void performLayout() {\n    final s = constraints.biggest.shortestSide;\n    size = Size(s, s);\n  }\n  @override\n  void paint(PaintingContext context, Offset offset) {\n    context.canvas.drawRect(offset & size, Paint()..color = const Color(0xFF00897B));\n  }\n}",
    "pdfTopic": false,
    "tags": [
      "RenderObject",
      "RenderBox",
      "custom-layout"
    ]
  },
  {
    "id": "flu-083",
    "category": "flutter",
    "level": "advanced",
    "topic": "RenderBox layout protocol",
    "question": "Explain the RenderBox layout protocol: constraints down, sizes up, offsets from parent, dry layout, and baseline.",
    "answer": "**Protocol:** parent calls `child.layout(constraints, parentUsesSize: true/false)`. Child **must** set `size` within constraints. Parent then **sets child offset** in parent data. Children **do not** position themselves except via that parent data.\n\nIf `parentUsesSize` is false, parent promises not to use child’s size (rare; allows some optimizations). **Intrinsics** (`getMaxIntrinsicWidth`) must be consistent with `performLayout` or you get janky text/inputs.\n\n**Dry layout** (`computeDryLayout`) is layout **without** mutating child state — used by `Wrap`/`ListView` to **measure**. Override it if you override `performLayout`.\n\n**Baseline:** `computeDistanceToActualBaseline` for text alignment in `Row(crossAxisAlignment: baseline)`.\n\nRelayout boundaries (`relayoutBoundary`) stop layout **propagation** upward when size didn’t change. `RenderPadding` is a typical boundary. This is why padding around an animating child can **isolate** layout.",
    "pdfTopic": false,
    "tags": [
      "RenderBox",
      "constraints",
      "dry-layout"
    ]
  },
  {
    "id": "flu-084",
    "category": "flutter",
    "level": "advanced",
    "topic": "Element updateChild",
    "question": "What does Element.updateChild do, and how do keys change the matching algorithm?",
    "answer": "`updateChild(oldChild, newWidget, slot)` is **the** inflator. Pseudologic:\n- If `newWidget` is null → **deactivate** old child.\n- If `oldChild` is null → **inflate** (`newWidget.createElement()`, `mount`).\n- If `Widget.canUpdate(old.widget, newWidget)` (`runtimeType` + `key` equal) → **`oldChild.update(newWidget)`** (reuse State).\n- Else → **unmount** old, inflate new.\n\nFor **multi-child** (`MultiChildRenderObjectElement`), Flutter runs a **keyed** diff: keyed widgets are **looked up** by key; unkeyed are matched **by position** among the unkeyed. That is why mixing keyed and unkeyed in one list is a footgun.\n\n`GlobalKey` elements can **reparent** (`deactivate` then `reattach`) instead of dispose — State **survives a move**. That is the magic and the cost.\n\nInterview: “rebuild” means producing new widgets; **updateChild** decides whether State lives.",
    "pdfTopic": false,
    "tags": [
      "updateChild",
      "Element",
      "canUpdate"
    ]
  },
  {
    "id": "flu-085",
    "category": "flutter",
    "level": "advanced",
    "topic": "GlobalKey pitfalls",
    "question": "Why are GlobalKeys considered a last resort? List the real failure modes.",
    "answer": "Failure modes:\n- **Duplicate GlobalKey** in one tree → hard assert. Easy when a list **reuses** a cached key object incorrectly, or a parent builds two forms with the same key.\n- **Reparenting** moves **State** (and its controllers) — surprising if you thought it was a new screen.\n- **O(N) lookups** and they **disable** some element slot optimizations; they force identity across the whole tree.\n- Holding `currentContext` after unmount.\n- Using GlobalKey to **reach into** a child (break encapsulation) instead of a callback / `ValueNotifier`.\n- Creating `GlobalKey()` in `build()` → **new key every rebuild** → **constant State loss** (same as UniqueKey).\n\nLegitimate uses: `FormState`, `NavigatorState`, measuring (`context.findRenderObject()`), overlay inserts, **one** `MaterialApp` navigator key for tests.\n\nPrefer `ValueKey` for lists. Prefer **callbacks** for talking to children.",
    "pdfTopic": false,
    "tags": [
      "GlobalKey",
      "pitfalls",
      "state"
    ]
  },
  {
    "id": "flu-086",
    "category": "flutter",
    "level": "advanced",
    "topic": "RouterDelegate",
    "question": "What must a custom RouterDelegate implement, and how does it cooperate with RouteInformationParser?",
    "answer": "`RouterDelegate<T>` is a `Listenable` (usually `ChangeNotifier`) that:\n- holds **app navigation state** of type `T`\n- `build` returns a `Navigator(pages: […], onDidRemovePage: …)` (or nested navigators)\n- `currentConfiguration` → `T?` so the **parser can serialize** to URL\n- `setNewRoutePath(T)` applies **OS-driven** URLs\n- `popRoute` handles **system back**\n\n`RouteInformationParser<T>`:\n- `parseRouteInformation` — URL → `T`\n- `restoreRouteInformation` — `T` → URL\n\nThe `Router` widget **glues** provider + parser + delegate. When delegate `notifyListeners()`, the URL bar updates.\n\nThis is how **go_router** works internally. Writing your own is justified for **unusual** stacks (multiple windows, desktop). Otherwise **don’t**.\n\nPages need **keys** so the Navigator diffs like a list.",
    "pdfTopic": false,
    "tags": [
      "RouterDelegate",
      "RouteInformationParser",
      "Navigator-2.0"
    ]
  },
  {
    "id": "flu-087",
    "category": "flutter",
    "level": "advanced",
    "topic": "Deep links",
    "question": "How do you implement deep links and universal links in Flutter without lying to the OS?",
    "answer": "Need **three** layers:\n1. **OS config** — Android `intent-filter` (https App Links + `assetlinks.json`), iOS Associated Domains + `apple-app-site-association`. Custom schemes (`myapp://`) are easy and **weak** (no verification).\n2. **Embedding** — Flutter’s `GoRouter` `redirect` / `platformDispatcher.defaultRouteName` / `RouteInformationProvider`. Incoming links must parse **cold start** (`getInitialLink`) **and** warm (`linkStream`).\n3. **Auth gating** — redirect `/checkout` → `/login?from=` without dropping the URI.\n\nPackages: `go_router`, `app_links` (successor thinking to uni_links). Test: Android `adb shell am start -a VIEW -d https://…`, iOS universal link from Notes.\n\nWeb: the **path is already** the route — hosting must **rewrite** to `index.html`.\n\nNever only handle links in a widget `initState`; you will miss **terminated** state.",
    "pdfTopic": false,
    "tags": [
      "deep-links",
      "App-Links",
      "universal-links"
    ]
  },
  {
    "id": "flu-088",
    "category": "flutter",
    "level": "advanced",
    "topic": "Flavors and CI",
    "question": "How do flavors interact with CI (Fastlane, Codemagic, GitHub Actions) and signing?",
    "answer": "CI must build **each** flavor as a **different identity**:\n- Android: `flutter build appbundle --flavor prod -t lib/main_prod.dart` with **flavor-specific** `signingConfig`. `applicationIdSuffix` for dev so prod and dev **coexist**.\n- iOS: scheme `prod`, xcconfig `PRODUCT_BUNDLE_IDENTIFIER`, separate **provisioning** profiles. Fastlane `match` per bundle id.\n- Store: Play **one** app per applicationId; TestFlight per bundle id. You cannot upload `com.app.dev` to the `com.app` listing.\n\nMatrix builds: `{flavor: [dev, staging, prod], mode: [profile, release]}`. Cache **SDK** + Gradle. Run **goldens** on a pinned OS.\n\nPass secrets as **CI encrypted vars**, not dart-define in logs. `--dart-define-from-file=env/prod.json` must **not** be committed if it has API secrets — prefer **runtime remote config** for non-public keys.\n\nFail the pipeline if **flavor name** ≠ Firebase `google-services.json` package name.",
    "pdfTopic": false,
    "tags": [
      "flavors",
      "CI",
      "signing"
    ]
  },
  {
    "id": "flu-089",
    "category": "flutter",
    "level": "advanced",
    "topic": "Code generation",
    "question": "freezed, json_serializable, and riverpod_generator — what belongs in codegen vs hand-written Dart?",
    "answer": "**json_serializable** — `fromJson`/`toJson` with `@JsonSerializable()`. Handles nested objects, `explicitToJson`, converters. Don’t hand-roll 40 DTO classes.\n\n**freezed** — immutable unions, `copyWith`, equality, optional json. Perfect for **BLoC states** and **API unions**. Cost: `build_runner` time, generated file noise.\n\n**riverpod_generator** — `@riverpod` functions/classes → typed providers, `ref.watch` codegen. Reduces string keys and boilerplate.\n\n```dart\n@JsonSerializable()\nclass User {\n  User({required this.id});\n  factory User.fromJson(Map<String, dynamic> j) => _$UserFromJson(j);\n  final String id;\n}\n```\n\nRun `dart run build_runner watch -d`. Commit generated files **or** generate in CI — pick one. Codegen is for **mechanical** equality/serialization, not for **business rules**.",
    "pdfTopic": false,
    "tags": [
      "freezed",
      "json_serializable",
      "riverpod_generator"
    ]
  },
  {
    "id": "flu-090",
    "category": "flutter",
    "level": "advanced",
    "topic": "Architecture",
    "question": "Clean architecture vs feature-first in Flutter: how do you structure a production app?",
    "answer": "**Layer-first (clean):** `data / domain / presentation` across the whole app. Domain has **entities + use cases**, no Flutter imports. Data has **DTOs, Dio, Drift**. Presentation has widgets + state. Good for **shared domain** and testing use cases. Risk: you **cross 6 folders** to add a button.\n\n**Feature-first:** `features/auth/{data,domain,ui}`, `features/shop/…`, plus `core/`. Most Flutter teams **scale better** this way. Each feature owns its providers. Shared widgets live in `core/ui`.\n\nRules that matter more than the diagram:\n- **No Dio in widgets**\n- **Immutable** view state\n- Navigation **policy** in one place (router)\n- Dependencies **inward** (UI → domain ← data)\n\nMVVM/MVI on top of Riverpod/BLoC is a **UI pattern**, not a substitute for module boundaries. Mention **melos** / Dart workspaces for multi-package repos.",
    "pdfTopic": false,
    "tags": [
      "clean-architecture",
      "feature-first",
      "structure"
    ]
  },
  {
    "id": "flu-091",
    "category": "flutter",
    "level": "advanced",
    "topic": "Background work",
    "question": "Workmanager plugin vs native WorkManager / BGTaskScheduler — what can Dart actually do in the background?",
    "answer": "The Dart **UI isolate is dead** when the process is killed. Background work must be **registered with the OS**:\n- **Android:** `WorkManager`, foreground service (with types), `AlarmManager` (restricted).\n- **iOS:** `BGTaskScheduler`, background fetch, VoIP/push exceptions — **strict**.\n\n`workmanager` Flutter plugin schedules OS jobs that **spin up a Dart VM headless** (`callbackDispatcher` as a **top-level** function). You get **minutes**, not a forever server. No guaranteed exact timing. You **cannot** update UI; you can hit a network and write to disk / local notifications.\n\nFor audio/location, you still need **native** foreground services / `UIBackgroundModes`. Don’t promise iOS “every 15 min sync” — Apple will not.\n\nInterview: Dart `Timer` is **not** background execution. Isolates **die** with the process.",
    "pdfTopic": false,
    "tags": [
      "Workmanager",
      "background",
      "BGTaskScheduler"
    ]
  },
  {
    "id": "flu-092",
    "category": "flutter",
    "level": "advanced",
    "topic": "Method channel thread safety",
    "question": "Which threads do MethodChannel handlers run on, and how do you avoid ANR / race crashes?",
    "answer": "**Dart:** `MethodCall` handlers run on the **UI isolate** (engine’s Dart executor). Do not parse 20 MB JSON there.\n\n**Android:** the default `MethodChannel` handler runs on the **main thread**. JNI/plugin work that touches `View` **must** be main; disk/network **must hop** (`Dispatchers.IO` / executor) and `activity.runOnUiThread` / `Handler` to **reply**. Replying twice or after detach **crashes**.\n\n**iOS:** similarly **main** for Flutter method calls unless you set a background binary messenger (uncommon). UIKit is main-thread only.\n\n**Headless isolates** need `BackgroundIsolateBinaryMessenger.ensureInitialized`. **Engine destroy** (activity detach in add-to-app) → cancel replies.\n\nNever hold `Activity` in a static plugin field. Use `ActivityAware`. Codec buffers are not thread-safe — build messages on one thread.",
    "pdfTopic": false,
    "tags": [
      "MethodChannel",
      "threads",
      "ANR",
      "plugins"
    ]
  },
  {
    "id": "flu-093",
    "category": "flutter",
    "level": "advanced",
    "topic": "Secure storage",
    "question": "How should a Flutter app store tokens? SharedPreferences vs flutter_secure_storage vs memory.",
    "answer": "`SharedPreferences` is **plaintext XML/plist** (plus backup caveats). **Never** store refresh tokens there.\n\n**flutter_secure_storage**:\n- Android: **EncryptedSharedPreferences** / Keystore (implementation has migrated over versions — know **Keystore + AES**)\n- iOS: **Keychain**\n- Still **device-local**; rooted/jailbroken devices can be extracted\n- **Backup:** Android Auto Backup can ship prefs off-device unless you exclude them; Keychain has accessibility attributes (`first_unlock`)\n\nIn-memory for **access tokens** with short TTL + refresh is a solid pattern. Biometric gate: `local_auth` then unlock Keychain item (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`).\n\nDo not log tokens. Certificate pinning is **orthogonal** (transport). Secure storage is **at rest**.",
    "pdfTopic": false,
    "tags": [
      "secure-storage",
      "Keychain",
      "Keystore"
    ]
  },
  {
    "id": "flu-094",
    "category": "flutter",
    "level": "advanced",
    "topic": "Certificate pinning",
    "question": "How do you implement certificate pinning with Dart HttpClient / Dio, and what are the operational risks?",
    "answer": "Pinning checks the **server cert / public key** against a baked-in SPKI hash so a rogue CA cannot MITM.\n\nDio: `IOHttpClientAdapter` + `HttpClient` `badCertificateCallback` is **not** pinning (that only toggles trust). Correct approach: **`SecurityContext`** with a pinned cert, or an adapter that inspects `cert.der` / `sha256` of **SPKI** (e.g. `http_certificate_pinning`, custom `onHttpClientCreate`).\n\n```dart\nclient.badCertificateCallback = (cert, host, port) => false; // still uses system CAs\n```\n\nRisks:\n- **Forgot rotation** → app **bricks** until force-update\n- Pin **leaf** vs **intermediate** — leaf rotates more\n- **Web** (`dart:html`) **cannot** pin like this\n- Debug proxies (Charles) **break** — use a debug-only bypass **never** in prod flavors\n\nPrefer **SPKI pins** with two backups. Combine with **HTTPS only** + `network_security_config` on Android for native stacks (OkHttp inside plugins).",
    "pdfTopic": false,
    "tags": [
      "pinning",
      "Dio",
      "TLS",
      "security"
    ]
  },
  {
    "id": "flu-095",
    "category": "flutter",
    "level": "advanced",
    "topic": "State management tradeoffs",
    "question": "Give a senior tradeoff table: setState, InheritedWidget, Provider, Riverpod, BLoC, Redux, GetX.",
    "answer": "- **setState** — local, zero deps. Dies at sharing and testability of business rules.\n- **InheritedWidget** — ambient config (theme), not a store.\n- **Provider** — simplest Inherited wrapper; runtime lookup; ChangeNotifier mutation model.\n- **Riverpod** — compile-safe, test overrides, codegen, works **without** BuildContext. Best **default** for new greenfield in many teams.\n- **BLoC** — events as audit log, transformers, huge community in enterprise. Verbosity is the tax.\n- **Redux / fish-redux** — time-travel; mostly **out of fashion** in Flutter (boilerplate).\n- **GetX** — velocity; magic routing/DI; harder to enforce architecture.\n\nSenior answer: **pick one primary**, don’t stack BLoC+GetX+Riverpod. Use **notifiers for ephemeral**, **Riverpod/BLoC for app state**. Measure rebuilds. Architecture > library.",
    "pdfTopic": false,
    "tags": [
      "state-management",
      "tradeoffs",
      "Riverpod",
      "BLoC"
    ]
  },
  {
    "id": "flu-096",
    "category": "flutter",
    "level": "advanced",
    "topic": "Accessibility",
    "question": "How do you make a Flutter UI accessible (TalkBack/VoiceOver), and what widgets fight you?",
    "answer": "Flutter builds a **Semantics tree**. `Semantics`, `MergeSemantics`, `ExcludeSemantics`, `IndexedSemantics` control it. Buttons already expose tap. Custom `GestureDetector` needs `Semantics(button: true, onTap: …)` or use `InkWell`.\n\nChecklist:\n- **tappable min size** 48dp (`minimumSize` / padding)\n- **labels** not only color (`ExcludeSemantics` on decorative icons)\n- **focus order** / `TraversalGroup`\n- **live regions** for errors\n- **font scaling:** don’t clip `Text` with tight `SizedBox` heights; test `textScaleFactor` 1.3–2.0\n- **Hide** password fields correctly (`obscureText` still needs labels)\n\nPlatform views often **break** a11y (VD especially). Custom canvas must **manually** publish semantics (`customSemanticsActions`, `SemanticsProperties`).\n\n`MediaQuery.boldText` / `highContrast` / `disableAnimations` (`TickerMode`, `animationDuration`). Automated: `tester.ensureSemantics()` + `matchesSemantics`.",
    "pdfTopic": false,
    "tags": [
      "accessibility",
      "Semantics",
      "TalkBack"
    ]
  },
  {
    "id": "flu-097",
    "category": "flutter",
    "level": "advanced",
    "topic": "RTL internationalization",
    "question": "What does Directionality change in Flutter, and how do you handle RTL without hard-coding EdgeInsets?",
    "answer": "`Directionality` (from `MaterialApp` locale) is an InheritedWidget. `Text` aligns, `Row` **reverses**, `Alignment.centerLeft` becomes **start**, `EdgeInsetsDirectional` and `BorderRadiusDirectional` flip.\n\nBugs:\n- `EdgeInsets.only(left: 16)` on a chat bubble — use **`start`/`end`**\n- `Positioned(left:)` in a `Stack` — `Positioned.directional`\n- Assets with **baked arrows** — provide RTL variants or `Transform`\n- `TextDirection.ltr` hard-code in `CustomPainter` text\n- **Mixed** bidirectional content: `Text` + Unicode isolates; `BidiFormatter`\n\n`canPop` back button already mirrors. Test with `locale: Locale('ar')` and `flutter_localizations`. **Pseudolocalization** catches truncation.\n\n`textDirection` on `TextField` may need **per-field** override for phone numbers that stay LTR.",
    "pdfTopic": false,
    "tags": [
      "RTL",
      "Directionality",
      "i18n"
    ]
  },
  {
    "id": "flu-098",
    "category": "flutter",
    "level": "advanced",
    "topic": "Flavor-specific Firebase",
    "question": "How do you wire Firebase per Flutter flavor without mixing google-services files?",
    "answer": "Each flavor is a **different Firebase app** (different `applicationId` / bundle id) with its own `google-services.json` / `GoogleService-Info.plist`.\n\nAndroid: put files in `android/app/src/dev/` and `src/prod/` (Gradle flavor source sets). iOS: separate plist per target/scheme, or a build phase that **copies** the right plist.\n\nDart: FlutterFire CLI generates **`firebase_options.dart`** with `DefaultFirebaseOptions.currentPlatform`. For flavors, generate **multiple** option files or switch:\n\n```dart\nawait Firebase.initializeApp(\n  options: flavor == Flavor.prod\n      ? ProdFirebaseOptions.currentPlatform\n      : DevFirebaseOptions.currentPlatform,\n);\n```\n\n`google-services` plugin **must** match the **applicationId** or you get a cryptic crash. FCM tokens are **per app id**. Analytics must not mix prod traffic into the dev project.\n\nNever ship **dev API keys** thinking they are secret — restrict them in Firebase console by package name + SHA-1.",
    "pdfTopic": false,
    "tags": [
      "Firebase",
      "flavors",
      "FlutterFire"
    ]
  },
  {
    "id": "flu-099",
    "category": "flutter",
    "level": "advanced",
    "topic": "Flutter web and Wasm",
    "question": "What are Flutter web’s renderer options and Wasm constraints compared with mobile?",
    "answer": "Web renderers (names evolved):\n- **HTML** (legacy) — DOM, poorer fidelity\n- **CanvasKit** — Skia compiled to **WASM**, heavy download, excellent fidelity\n- **skwasm** / **WasmGC** — newer pipeline, smaller/faster on supporting browsers\n\nConstraints:\n- **No dart:io** — use `http` / conditional imports\n- **No isolates as OS threads** in the same way historically; **workers** exist but plugin story differs\n- **Plugin** surface is JS-interop (`package:web`, `dart:js_interop`) not MethodChannel JNI\n- **Deferred imports** matter for **bundle size**\n- **SEO** is weak (canvas); need pre-render if marketing pages\n- **Primary** / **WasmGC** browser support matrix — have a CanvasKit fallback\n- **Hot reload** on web is improving but not identical to mobile JIT\n\nDon’t promise “one binary everywhere” for **file pickers, notifications, IAP** — web needs different plugins.",
    "pdfTopic": false,
    "tags": [
      "web",
      "Wasm",
      "CanvasKit",
      "skwasm"
    ]
  },
  {
    "id": "flu-100",
    "category": "flutter",
    "level": "advanced",
    "topic": "Add-to-app",
    "question": "How does add-to-app work, and what bites teams integrating Flutter into an existing Android/iOS app?",
    "answer": "Add-to-app embeds a **FlutterEngine** in a host app. Android: `FlutterActivity` / `FlutterFragment` / `FlutterView`. iOS: `FlutterViewController`. **`FlutterEngineGroup`** shares **AOT + GPU** resources across engines (cheaper than N cold engines).\n\nBites:\n- **Startup latency** — pre-warm engine on splash / idle\n- **Plugin registration** (`GeneratedPluginRegistrant`) must run on **that** engine\n- **Navigation** identity — two back stacks (Android fragments + Flutter Navigator)\n- **Themes / status bar** desync\n- **Memory** — Flutter is not a cheap WebView\n- **Build** — host Gradle/Pods versions vs Flutter’s\n- **Multiple engines** without a group **duplicate** the Dart heap\n\nCommunication: channels, or Pigeon. Don’t assume `shared_preferences` is the host’s NSUserDefaults without checking the plugin’s suite name.",
    "pdfTopic": false,
    "tags": [
      "add-to-app",
      "FlutterEngine",
      "FlutterEngineGroup"
    ]
  },
  {
    "id": "flu-101",
    "category": "flutter",
    "level": "advanced",
    "topic": "Build modes",
    "question": "Debug vs profile vs release: what is compiled out, and which mode do you use for which question?",
    "answer": "- **debug** — JIT, asserts on, no tree shake, service protocol on. Use for development and **hot reload**.\n- **profile** — AOT like release, asserts mostly off, tree-shaken, service protocol **on**. Use for **jank, memory, shaders**.\n- **release** — AOT, asserts off, tree shake, optional obfuscate, **no** service protocol. Use for the store.\n\n`assert` and `kDebugMode` blocks **vanish** in profile/release. A “bug only in release” is often an **assert-hidden** side effect or a **timing** race the JIT didn’t hit.\n\nObfuscation + split debug info: keep **symbols** on the server for Crashlytics. Profile **cannot** be uploaded to Play as production (debuggable tracing).\n\n`flutter build ipa --release` vs Xcode **Archive** — still release. `--debug` APKs are huge. Never performance-test debug.",
    "pdfTopic": false,
    "tags": [
      "debug",
      "profile",
      "release",
      "AOT"
    ]
  },
  {
    "id": "flu-102",
    "category": "flutter",
    "level": "advanced",
    "topic": "saveLayer and compositing",
    "question": "What is saveLayer, and which widgets silently trigger expensive offscreen compositing?",
    "answer": "`Canvas.saveLayer` allocates an **offscreen buffer**, paints into it, then composites (opacity, blend, filter). It is among the **most expensive** paint ops.\n\nWidgets that often cause it:\n- `Opacity` (especially animating opacity of a **huge** subtree) — prefer `FadeTransition` which can promote a **layer** instead of saveLayer-per-frame in some cases, still not free\n- `ColorFiltered`, `ShaderMask`, `ImageFilter.blur`\n- Some **clips** with anti-alias + elevation/shadow combos\n- `BackdropFilter` (blur the **content behind** — must snapshot)\n\nDevTools “performance overlay” / engine **checkerboard offscreen layers** (`debugDisableClipLayers` etc. in debug). Fix: **push opacity to a leaf**, rasterize once (`RepaintBoundary`), avoid blurring scrolling content.\n\nSenior signal: you **profile raster**, then hunt saveLayer, not “add more const”.",
    "pdfTopic": false,
    "tags": [
      "saveLayer",
      "compositing",
      "Opacity",
      "BackdropFilter"
    ]
  }
];
