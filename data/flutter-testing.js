window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.flutter = (window.QA_BANK.flutter || []).concat([
  {
    "id": "flu-145",
    "category": "flutter",
    "level": "basic",
    "topic": "Test types",
    "question": "What are unit, widget, and integration tests in Flutter?",
    "answer": "- **Unit** (`flutter test`): Dart only, no rendering. Blocs, parsers, validators. Fast.\n- **Widget** (`testWidgets`): `WidgetTester` pumps widgets with a fake binding. `find.text`, `enterText`, `tap`. No real device, no real plugins.\n- **Integration** (`integration_test`): runs on device/emulator/web with real plugins and navigation.\n\nPyramid: many unit, some widget, few integration. Goldens are a kind of widget test that diffs pixels.",
    "pdfTopic": false,
    "tags": [
      "testing",
      "unit-test"
    ]
  },
  {
    "id": "flu-146",
    "category": "flutter",
    "level": "basic",
    "topic": "flutter_test",
    "question": "What does the `flutter_test` package give you?",
    "answer": "`flutter_test` (SDK) provides `test()`, `testWidgets()`, `expect()`, `find`, `WidgetTester`, `setUp`/`tearDown`, `group`, `matchesGoldenFile`, and the test binding.\n\nIt is a `dev_dependency`. Production app code must not import it. `flutter test` is the runner (not `dart test` if you need the Flutter binding).",
    "pdfTopic": false,
    "tags": [
      "flutter_test"
    ]
  },
  {
    "id": "flu-147",
    "category": "flutter",
    "level": "intermediate",
    "topic": "WidgetTester",
    "question": "How do pump, pumpAndSettle, and pumpWidget differ?",
    "answer": "`pumpWidget` attaches the tree once. **`pump`** advances a frame (optional duration for animations). **`pumpAndSettle`** pumps until idle — hangs if an infinite animation runs.\n\nAfter `tap`, you must `pump` to rebuild. Fake time: `tester.binding.delayed` / `pump(Duration)`. Never `Future.delayed` in widget tests if `pump` can do it.",
    "pdfTopic": false,
    "tags": [
      "widget-test"
    ]
  },
  {
    "id": "flu-148",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Finders",
    "question": "How do you find widgets in a Flutter widget test?",
    "answer": "`find.text`, `find.byType`, `find.byKey`, `find.byIcon`, `find.descendant`. `expect(find.text(\"Hi\"), findsOneWidget)` / `findsNothing` / `findsNWidgets(2)`.\n\nPrefer **Keys** on lists and duplicate text. `find.byTooltip` for a11y. Avoid matching by implementation type of a library widget that might change.",
    "pdfTopic": false,
    "tags": [
      "widget-test"
    ]
  },
  {
    "id": "flu-149",
    "category": "flutter",
    "level": "intermediate",
    "topic": "mockito and mocktail",
    "question": "How do mockito and mocktail show up in Flutter unit tests?",
    "answer": "**mockito** generates mocks (`@GenerateNiceMocks`). **mocktail** uses `when(() => repo.me()).thenAnswer((_) async => user)` without codegen.\n\nInject via constructor or `ProviderScope(overrides: [...])`. `verify(() => repo.save(any())).called(1)`. Reset mocks in `tearDown`. Prefer a **FakeRepo** implementing the interface when you own it.",
    "pdfTopic": false,
    "tags": [
      "mockito",
      "mocktail"
    ]
  },
  {
    "id": "flu-150",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Golden tests",
    "question": "What are golden tests, and why do they flake?",
    "answer": "`await expectLater(find.byType(Card), matchesGoldenFile('card.png'))` compares pixels to a checked-in image.\n\nFlakes: fonts not loaded (`loadAppFonts`), locale, Impeller vs Skia, OS version, text scaling. Run goldens on a **pinned CI image**. Golden **atoms** (buttons, empty states), not the whole app. Network images must be mocked.",
    "pdfTopic": false,
    "tags": [
      "golden"
    ]
  },
  {
    "id": "flu-151",
    "category": "flutter",
    "level": "intermediate",
    "topic": "bloc_test",
    "question": "How do you unit-test a BLoC?",
    "answer": "`blocTest<LoginBloc, LoginState>(build: () => LoginBloc(fakeAuth), act: (b) => b.add(Submitted()), expect: () => [LoginLoading(), LoginSuccess()])`.\n\nSet `setUp` fakes. Use `wait` for async. `verify` on a mock use case. Do not `testWidgets` a BLoC — that is a unit test of the bloc, not the UI.",
    "pdfTopic": false,
    "tags": [
      "bloc",
      "unit-test"
    ]
  },
  {
    "id": "flu-152",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Riverpod overrides",
    "question": "How do you unit-test / widget-test with Riverpod?",
    "answer": "Wrap with `ProviderScope(overrides: [userRepoProvider.overrideWithValue(FakeRepo())])`. For unit tests of a notifier, `ProviderContainer(overrides: [...])` then `container.read(provider)` and `listen`.\n\nDispose the container. Do not use a global `ProviderContainer` across tests. `overrideWith` for code-gen providers follows the same idea.",
    "pdfTopic": false,
    "tags": [
      "riverpod",
      "testing"
    ]
  },
  {
    "id": "flu-153",
    "category": "flutter",
    "level": "advanced",
    "topic": "FakeAsync",
    "question": "How do you test timers and debounce without waiting?",
    "answer": "`fake_async` / `tester.binding` fake the clock. `bloc_test` `wait`. For `Timer`/`Future.delayed` in unit tests, wrap with `FakeAsync().run((async) { ... async.elapse(Duration(seconds: 1)); })`.\n\nWidget tests: `await tester.pump(const Duration(milliseconds: 300))` after a debounce. Real `sleep` makes CI slow and flake.",
    "pdfTopic": false,
    "tags": [
      "fake-async"
    ]
  },
  {
    "id": "flu-154",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Integration tests",
    "question": "How does `integration_test` differ from `testWidgets`?",
    "answer": "Integration tests use **`IntegrationTestWidgetsFlutterBinding`**, run as an app on a device, can take screenshots, and hit real (or staged) backends unless you still fake them.\n\nDrive with `flutter test integration_test/app_test.dart` or Firebase Test Lab. They are e2e-ish. Keep a short smoke path (login → home). Do not duplicate every widget test.",
    "pdfTopic": false,
    "tags": [
      "integration-test"
    ]
  },
  {
    "id": "flu-155",
    "category": "flutter",
    "level": "basic",
    "topic": "expect and matchers",
    "question": "How do expect() and matchers work in Dart unit tests?",
    "answer": "`expect(actual, matcher)`: `equals`, `isTrue`, `isNull`, `throwsA(isA<FormatException>())`, `completion` for futures, `emitsInOrder` for streams.\n\n`expectLater` for async matchers (goldens, streams). Failure prints expected vs actual. Do not `if (x) throw` instead of `expect`.",
    "pdfTopic": false,
    "tags": [
      "unit-test"
    ]
  },
  {
    "id": "flu-156",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Http mocking",
    "question": "How do you unit-test Dart HTTP code?",
    "answer": "`package:http` `MockClient((req) async => Response('{}', 200))`. Dio: `DioAdapter` / `http_mock_adapter`. Inject the client into the API class.\n\nDo not `HttpOverrides` globally unless you must (and reset). Assert the request URL and method in the mock callback.",
    "pdfTopic": false,
    "tags": [
      "http",
      "unit-test"
    ]
  },
  {
    "id": "flu-157",
    "category": "flutter",
    "level": "advanced",
    "topic": "Plugin mocks",
    "question": "How do you unit-test code that uses path_provider or other plugins?",
    "answer": "Plugins fail in unit tests (`MissingPluginException`). Use **`TestDefaultBinaryMessengerBinding`** / official `path_provider_platform_interface` fakes, or wrap plugins behind your own interface and fake that.\n\n`TestWidgetsFlutterBinding.ensureInitialized()` is required before using some bindings. For widget tests, `setMockMethodCallHandler` on the channel.",
    "pdfTopic": false,
    "tags": [
      "plugins",
      "testing"
    ]
  },
  {
    "id": "flu-158",
    "category": "flutter",
    "level": "intermediate",
    "topic": "setUp tearDown group",
    "question": "How should you organize Flutter unit tests?",
    "answer": "`group('LoginValidator', () { setUp(() {}); tearDown(() {}); test('empty email', () {}); });`\n\n`setUpAll` is once per file — do not leak sockets. Each `test` should be independent. `addTearDown` on a container you created in the test body.",
    "pdfTopic": false,
    "tags": [
      "style"
    ]
  },
  {
    "id": "flu-159",
    "category": "flutter",
    "level": "advanced",
    "topic": "Golden CI",
    "question": "How do you run goldens in CI without flakes?",
    "answer": "Pin OS + Flutter version + fonts (`google_fonts` runtime download will flake — bundle fonts). Same renderer (Skia/Impeller). `updateGoldens` only locally on purpose.\n\nStore PNGs in git LFS if large. Fail the PR on diff; reviewers inspect the image. Local macOS vs Linux CI is a classic mismatch — generate goldens **on CI** or in Docker.",
    "pdfTopic": false,
    "tags": [
      "golden",
      "ci"
    ]
  },
  {
    "id": "flu-160",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Widget test MaterialApp",
    "question": "Why must you wrap widgets in MaterialApp / Directionality in tests?",
    "answer": "Many Material widgets need `Directionality`, `MediaQuery`, overlay, and theme. `pumpWidget(MyButton())` throws. Use `pumpWidget(const MaterialApp(home: MyButton()))` or `wrapWithMaterial` helpers.\n\nFor a pure `Text` with a locale, `Directionality` is enough. Missing `Localizations` causes `of(context)` null errors — the widget test is telling you production needs the same ancestors.",
    "pdfTopic": false,
    "tags": [
      "widget-test"
    ]
  },
  {
    "id": "flu-161",
    "category": "flutter",
    "level": "advanced",
    "topic": "Coverage in Flutter",
    "question": "How do you measure unit-test coverage in Flutter?",
    "answer": "`flutter test --coverage` writes `coverage/lcov.info`. `genhtml` or lcov comments on PRs. Exclude generated files (`*.g.dart`, `*.freezed.dart`) in `lCOV` ignore.\n\nDo not chase 100%. Exclude UI glue if you widget-test it. Fail CI on coverage drop of domain packages.",
    "pdfTopic": false,
    "tags": [
      "coverage"
    ]
  },
  {
    "id": "flu-162",
    "category": "flutter",
    "level": "intermediate",
    "topic": "TDD in Flutter",
    "question": "How does TDD look for a Flutter feature?",
    "answer": "Red: unit-test the notifier/cubit (`emits loading then data`). Green: implement. Widget test: given fake repo, tap button, `findsOneWidget` success text. Then a thin integration smoke if needed.\n\nYou rarely TDD CustomPaint pixels first — golden after the widget exists. TDD the **state machine**, not `setState` lines.",
    "pdfTopic": false,
    "tags": [
      "tdd"
    ]
  },
  {
    "id": "flu-163",
    "category": "flutter",
    "level": "advanced",
    "topic": "Semantics in tests",
    "question": "How do you assert accessibility in widget tests?",
    "answer": "`expect(tester.getSemantics(find.byType(SaveButton)), matchesSemantics(label: 'Save', isButton: true))`.\n\nGoldens do not catch missing labels. `testWidgets` with `SemanticsHandle`. TalkBack still needs a device pass. `IgnorePointer` can strip semantics — assert that you did not.",
    "pdfTopic": false,
    "tags": [
      "a11y",
      "widget-test"
    ]
  },
  {
    "id": "flu-164",
    "category": "flutter",
    "level": "intermediate",
    "topic": "Network image tests",
    "question": "How do you keep Image.network out of widget/golden tests?",
    "answer": "Use `HttpOverrides` / `overrideHttp` with a fake that returns a 1×1 PNG, or inject `ImageProvider`. `flutter_test` has patterns for this; packages like `network_image_mock` exist.\n\nUnmocked network goldens download and flake. Prefer `AssetImage` in test wrappers.",
    "pdfTopic": false,
    "tags": [
      "golden",
      "widget-test"
    ]
  }
]);
