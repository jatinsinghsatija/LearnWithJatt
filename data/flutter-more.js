window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.flutter = (window.QA_BANK.flutter || []).concat([
  {
    "id": "flu-122",
    "category": "flutter",
    "level": "intermediate",
    "topic": "InheritedModel",
    "question": "How does InheritedModel improve on InheritedWidget?",
    "answer": "`InheritedWidget` notifies **all** dependents when `updateShouldNotify` is true. **InheritedModel** aspects let a descendant depend on a slice (`Theme.of(context).colorScheme` analogue) so unrelated aspects do not rebuild.\n\nUse it for large ambient objects. Provider’s `select` / Riverpod `ref.watch(provider.select)` solve the same problem at the state-library layer.",
    "pdfTopic": false,
    "tags": [
      "inherited"
    ]
  },
  {
    "id": "flu-123",
    "category": "flutter",
    "level": "intermediate",
    "topic": "AutomaticKeepAlive",
    "question": "Why do TabBarView / PageView children reset unless you use AutomaticKeepAlive?",
    "answer": "Offscreen tabs are disposed by default. Mixing in **AutomaticKeepAliveClientMixin** and calling `wantKeepAlive = true` keeps the State (scroll offset, form fields).\n\nCost: memory. Do not keep-alive a map of 50 heavy tabs. `PageStorageKey` restores scroll without keeping the State alive if you only need offset.",
    "pdfTopic": false,
    "tags": [
      "keepalive"
    ]
  },
  {
    "id": "flu-124",
    "category": "flutter",
    "level": "intermediate",
    "topic": "GestureArena",
    "question": "How does the gesture arena decide who wins a drag vs a tap?",
    "answer": "Pointers hit-test widgets; recognizers join an **arena**. They compete (`GestureRecognizer`) until one wins (e.g. horizontal drag vs vertical scroll). `Listener` is lower-level and bypasses much of this.\n\nNested scrollables fight here. `EagerGestureRecognizer` / `behavior: HitTestBehavior` / `ScrollConfiguration` are the knobs. This is why a carousel inside a ListView is hard.",
    "pdfTopic": false,
    "tags": [
      "gestures"
    ]
  },
  {
    "id": "flu-125",
    "category": "flutter",
    "level": "intermediate",
    "topic": "NotificationListener",
    "question": "What are Notifications (ScrollNotification) vs Streams?",
    "answer": "A **Notification** bubbles up the element tree (`dispatch`). `NotificationListener<ScrollNotification>` observes scroll without the child taking a callback parameter — useful in libraries.\n\nThey are not a state-management system. For app data, use Riverpod/BLoC. For “did this sliver overscroll?”, NotificationListener is idiomatic.",
    "pdfTopic": false,
    "tags": [
      "scroll"
    ]
  },
  {
    "id": "flu-126",
    "category": "flutter",
    "level": "intermediate",
    "topic": "NestedScrollView",
    "question": "When do you need NestedScrollView, and what breaks?",
    "answer": "When an outer collapse (SliverAppBar) and an inner scroll view must **share** scroll delta. Inner `PrimaryScrollController` coordination is easy to get wrong (double bounce, stuck header).\n\nNewer **SliverOverlapAbsorber/Injector** patterns fix overlap. Prefer a single `CustomScrollView` if you can. NestedScrollView is a senior layout question.",
    "pdfTopic": false,
    "tags": [
      "slivers"
    ]
  },
  {
    "id": "flu-127",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Focus and shortcuts",
    "question": "How do FocusNode, Shortcuts, and Actions work together?",
    "answer": "`FocusNode` tracks keyboard/accessibility focus. **Shortcuts** map key combos to **Intent**s; **Actions** handle those intents. `FocusTraversalGroup` defines tab order.\n\nDesktop/web Flutter interviews expect this. Mobile still needs it for TV DPAD and accessibility. Dispose FocusNodes.",
    "pdfTopic": false,
    "tags": [
      "focus"
    ]
  },
  {
    "id": "flu-128",
    "category": "flutter",
    "level": "intermediate",
    "topic": "go_router redirect",
    "question": "How do go_router redirects and refreshListenable interact with auth?",
    "answer": "`redirect` runs on navigation and when `refreshListenable` (e.g. a `ValueNotifier<Auth>`) changes. Return `null` to proceed, or `/login` / `/home` to bounce.\n\nAvoid redirect loops (login → home → login). Do async auth restoration **before** `runApp` or with a splash route. `ShellRoute` keeps a bottom nav scaffold while child routes swap.",
    "pdfTopic": false,
    "tags": [
      "go_router"
    ]
  },
  {
    "id": "flu-129",
    "category": "flutter",
    "level": "intermediate",
    "topic": "ShellRoute",
    "question": "What is a ShellRoute in go_router?",
    "answer": "A **ShellRoute** builds a persistent shell (drawer, bottom bar) and an inner `Navigator` for child routes. Back pops the inner stack first.\n\nStatefulShellRoute keeps **branch state** (each tab’s stack). This is the 2024–2026 answer to “bottom navigation plus deep links.”",
    "pdfTopic": false,
    "tags": [
      "go_router"
    ]
  },
  {
    "id": "flu-130",
    "category": "flutter",
    "level": "intermediate",
    "topic": "build_runner",
    "question": "When do you use build_runner, and what goes wrong in CI?",
    "answer": "Codegen (`json_serializable`, freezed, riverpod_generator, drift) runs via **`dart run build_runner build`**. CI must run it or commit generated files. Version mismatches cause “missing generated file” errors.\n\n`watch` is local. Conflicting builders and part files (`part 'foo.g.dart'`) are the usual footguns. Prefer committed gen for app stability or gen in CI with a cache.",
    "pdfTopic": false,
    "tags": [
      "codegen"
    ]
  },
  {
    "id": "flu-131",
    "category": "flutter",
    "level": "intermediate",
    "topic": "BLoC transformers",
    "question": "What is `EventTransformer` in BLoC (restartable, droppable, sequential)?",
    "answer": "It controls how incoming events overlap: **sequential** (queue), **droppable** (ignore while busy), **restartable** (cancel previous — search), concurrent.\n\nThis is `flatMap` vs `switchMap` vs `exhaustMap` from Rx. Wrong transformer = duplicate API calls or dropped submits.",
    "pdfTopic": false,
    "tags": [
      "bloc"
    ]
  },
  {
    "id": "flu-132",
    "category": "flutter",
    "level": "advanced",
    "topic": "Layer tree",
    "question": "What is the layer tree, and when does saveLayer hurt?",
    "answer": "After paint, Flutter builds a **layer tree** (Offset, Transform, Opacity, ImageFilter). **saveLayer** allocates an offscreen buffer (BackdropFilter, certain opacities, clips with shaders).\n\nToo many saveLayers jank on mid-tier GPUs. DevTools “performance overlay” / raster time diagnoses it. `RepaintBoundary` creates a layer to isolate repaint, not to magically speed layout.",
    "pdfTopic": false,
    "tags": [
      "rendering"
    ]
  },
  {
    "id": "flu-133",
    "category": "flutter",
    "level": "advanced",
    "topic": "RenderObject dirty flags",
    "question": "How do layout/paint dirty flags work on RenderObject?",
    "answer": "`markNeedsLayout` / `markNeedsPaint` / `markNeedsCompositingBitsUpdate` schedule the object. Parents may need relayout; children paint-only if size did not change.\n\nCalling `setState` high in the tree dirties a large Element subtree. A well-placed `RepaintBoundary` or const widgets reduces paint; it does not skip layout if constraints changed.",
    "pdfTopic": false,
    "tags": [
      "renderobject"
    ]
  },
  {
    "id": "flu-134",
    "category": "flutter",
    "level": "advanced",
    "topic": "Hit testing",
    "question": "How does hit testing work, and what is HitTestBehavior?",
    "answer": "From the root, RenderBoxes `hitTest` children front-to-back, then themselves. **opaque** (default for many) blocks pass-through; **translucent** still hits empty space; **deferToChild** only children.\n\n`IgnorePointer` / `AbsorbPointer` are the widgets. Gesture arenas run after hit test produces a path.",
    "pdfTopic": false,
    "tags": [
      "hittest"
    ]
  },
  {
    "id": "flu-135",
    "category": "flutter",
    "level": "advanced",
    "topic": "FFI structs",
    "question": "How do you pass structs across dart:ffi safely?",
    "answer": "Use `package:ffi` `Struct` / `Union`, allocate with `Arena` or `calloc`, set fields, call the native function, **free**. Isolate memory is not shared: you pass pointers, not Dart objects.\n\nABI alignment matters (`@Packed`). Do not keep pointers after free. Prefer `ffigen` over hand-written bindings. Native finalizers (`NativeFinalizer`) avoid leaks if Dart forgets to free.",
    "pdfTopic": false,
    "tags": [
      "ffi"
    ]
  },
  {
    "id": "flu-136",
    "category": "flutter",
    "level": "advanced",
    "topic": "Zones",
    "question": "What is a Dart Zone, and how does Flutter use it for errors?",
    "answer": "A **Zone** intercepts async callbacks (`scheduleMicrotask`, timers). `runZonedGuarded` catches uncaught async errors — Flutter’s `PlatformDispatcher.instance.onError` / `FlutterError.onError` are the app-level hooks.\n\nZones do not make code threaded. Overusing zones for DI is an anti-pattern (use Riverpod). Tests install their own zones.",
    "pdfTopic": false,
    "tags": [
      "zone",
      "errors"
    ]
  },
  {
    "id": "flu-137",
    "category": "flutter",
    "level": "advanced",
    "topic": "BinaryMessenger",
    "question": "What is BinaryMessenger in platform channels?",
    "answer": "The **BinaryMessenger** sends raw byte `ByteData` between Dart and the platform. `MethodChannel` is a codec (StandardMethodCodec) on top. You can plug a custom codec for performance (e.g. binary protobuf).\n\nMessages are copied. Giant payloads stall the UI isolate — use a background engine or FFI. Missing plugin registration = “MissingPluginException”.",
    "pdfTopic": false,
    "tags": [
      "platform-channels"
    ]
  },
  {
    "id": "flu-138",
    "category": "flutter",
    "level": "advanced",
    "topic": "Engine threading",
    "question": "Name the Flutter engine threads and what runs on each.",
    "answer": "- **UI isolate** (Dart) — build/layout/paint recording.\n- **Raster** — GPU / Impeller / Skia.\n- **Platform (main)** — Android/iOS UI, plugins unless they hop.\n- **IO** — image decode, some asset work.\n\nPlatform Views force extra synchronization. Blocking the platform thread ANRs Android. Blocking the UI isolate janks Dart.",
    "pdfTopic": false,
    "tags": [
      "engine"
    ]
  },
  {
    "id": "flu-139",
    "category": "flutter",
    "level": "intermediate",
    "topic": "ScrollPhysics",
    "question": "How do ScrollPhysics and BouncingScrollPhysics vs ClampingScrollPhysics differ?",
    "answer": "Physics describe **how** a scrollable moves (friction, bounce, parent absorption). iOS-style **Bouncing**, Android-style **Clamping**. `AlwaysScrollableScrollPhysics` enables scroll even if content is short (pull-to-refresh).\n\nCustom physics is a senior question. Nested scrollables override `parent` physics — a frequent source of “it doesn’t bounce on iOS.”",
    "pdfTopic": false,
    "tags": [
      "scroll"
    ]
  },
  {
    "id": "flu-140",
    "category": "flutter",
    "level": "advanced",
    "topic": "CustomPainter vs RenderObject",
    "question": "When is CustomPainter enough, and when do you need a RenderObject?",
    "answer": "`CustomPainter` / `CustomPaint` draws in a child box you do not lay out internally. A **custom RenderBox** participates in constraints, hit test, semantics, and child layout.\n\nCharts with no children: painter. A widget that sizes to text + icon + gesture: RenderObject. `LeafRenderObjectWidget` vs `MultiChildRenderObjectWidget`.",
    "pdfTopic": false,
    "tags": [
      "custom-paint"
    ]
  },
  {
    "id": "flu-141",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Semantics",
    "question": "How do you make a custom control accessible?",
    "answer": "Wrap with `Semantics` / `MergeSemantics`, set `label`, `button: true`, `onTap`. Exclude decorative images (`ExcludeSemantics`). Check **TalkBack/VoiceOver** traversal order (`sortKey`).\n\n`IgnorePointer` also kills semantics if misused. Golden tests do not catch a11y — use `matchesSemantics` in widget tests.",
    "pdfTopic": false,
    "tags": [
      "a11y"
    ]
  },
  {
    "id": "flu-142",
    "category": "flutter",
    "level": "advanced",
    "topic": "Impeller entities",
    "question": "How is Impeller’s architecture different from Skia for Flutter?",
    "answer": "Skia is a general 2D library; Flutter used it with runtime **shader compilation** (jank). Impeller is a Flutter-specific renderer: **precompiled pipelines**, an entity-graph, Metal/Vulkan backends.\n\nYou still can have expensive saveLayer-equivalents. Impeller does not remove need to virtualize lists. Know how to disable/debug (`--enable-impeller`).",
    "pdfTopic": false,
    "tags": [
      "impeller"
    ]
  },
  {
    "id": "flu-143",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Hydrated state",
    "question": "How do you persist BLoC/Riverpod state across restarts?",
    "answer": "BLoC: **hydrated_bloc** writes states to disk. Riverpod: `SharedPreferences`/`hive` in a notifier, or `persist` packages. Always version the schema and handle migration.\n\nDo not persist entire widget trees. Do not store tokens in hydrated JSON without encryption (`flutter_secure_storage`).",
    "pdfTopic": false,
    "tags": [
      "persistence"
    ]
  },
  {
    "id": "flu-144",
    "category": "flutter",
    "level": "advanced",
    "topic": "Deferred components",
    "question": "What are Android Play deferred components for Flutter?",
    "answer": "Play Feature Delivery can download **Dart deferred libraries** / asset packs after install (`deferred as` imports + Play config). First open of a rare flow pays a download cost.\n\nThis is not the same as Dart deferred imports on web. Interview: reduce initial download for large mini-games or ML models, handle `loadLibrary()` errors offline.",
    "pdfTopic": false,
    "tags": [
      "play",
      "deferred"
    ]
  }
]);
