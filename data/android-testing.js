window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.android = (window.QA_BANK.android || []).concat([
  {
    "id": "and-204",
    "category": "android",
    "level": "basic",
    "topic": "Test pyramid",
    "question": "What is the testing pyramid on Android, and which tests live where?",
    "answer": "A typical Android pyramid:\n\n- **Unit tests** (`app/src/test`) — JVM, JUnit, fakes/mocks. ViewModels, mappers, use cases. Fast, run on every commit.\n- **Instrumented / device tests** (`app/src/androidTest`) — need an emulator or device, full Android framework. Room with a real SQLite, DataStore, some platform APIs.\n- **UI tests** — Espresso or Compose UI. Slowest, fewest, cover critical user journeys.\n\nDo not put ViewModel logic only in Espresso. Do not mock the database in a “unit test” of a DAO if you actually need SQL. Robolectric sits in the middle: JVM with Android shadows.",
    "pdfTopic": false,
    "tags": [
      "testing",
      "junit"
    ]
  },
  {
    "id": "and-205",
    "category": "android",
    "level": "basic",
    "topic": "Unit vs instrumented",
    "question": "How do `src/test` and `src/androidTest` differ?",
    "answer": "`src/test` runs on the **local JVM** (`./gradlew test`). No real Looper, no real Context unless Robolectric. `src/androidTest` is an **APK** installed on a device (`./gradlew connectedAndroidTest`).\n\nAndroid APIs in unit tests throw if you touch them without Robolectric. Use unit tests by default; instrumented when you need SQLite, sensors, or real Views.",
    "pdfTopic": false,
    "tags": [
      "testing",
      "gradle"
    ]
  },
  {
    "id": "and-206",
    "category": "android",
    "level": "intermediate",
    "topic": "JUnit on Android",
    "question": "What JUnit features should you know for Android unit tests?",
    "answer": "JUnit 4 is still common (`@RunWith`, `@Before`, `@Test`, `@Rule`). JUnit 5 (`junit-jupiter`) uses `@BeforeEach`, `@ExtendWith`, `@ParameterizedTest` and needs the Android Gradle plugin setup for unit tests (instrumented JUnit 5 is extra work).\n\nKnow: `assertEquals`, `assertThrows`, `@Ignore`/`@Disabled`, parameterized tests, and that **order is not guaranteed** unless you force it. Name tests after behavior (`login_invalidPassword_showsError`), not `test1`.",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "and-207",
    "category": "android",
    "level": "intermediate",
    "topic": "Robolectric",
    "question": "What is Robolectric, and when is it better than an emulator test?",
    "answer": "**Robolectric** runs Android framework **shadows** on the JVM so you can create an Activity, inflate XML, and read a `TextView` without a device. Annotate `@RunWith(RobolectricTestRunner::class)` / `@Config(sdk = [34])`.\n\nUse it for Fragment/Activity plumbing and resources. Do not treat it as a pixel-perfect UI test. Shadows can lag real platform behavior — if a bug is OEM-specific, you still need a device.",
    "pdfTopic": false,
    "tags": [
      "robolectric"
    ]
  },
  {
    "id": "and-208",
    "category": "android",
    "level": "intermediate",
    "topic": "Espresso",
    "question": "How does Espresso work, and what is onView/perform/check?",
    "answer": "Espresso finds a View (`onView(withId(R.id.login))`), **performs** (`click()`, `typeText()`), and **checks** (`matches(isDisplayed())`). It synchronizes with the UI thread and IdlingRegistry.\n\nUse `ActivityScenario` / `FragmentScenario` to launch. Prefer `withId` over `withText` when text is localized. Espresso cannot easily leave your app — that is **UI Automator**.",
    "pdfTopic": false,
    "tags": [
      "espresso",
      "ui-test"
    ]
  },
  {
    "id": "and-209",
    "category": "android",
    "level": "intermediate",
    "topic": "IdlingResource",
    "question": "What is an IdlingResource and why do Espresso tests flake without one?",
    "answer": "Espresso waits for the UI thread and registered idle signals. **OkHttp, coroutines, WorkManager** are invisible, so tests tap before data arrives. An **IdlingResource** (or OkHttp Idling interceptor, Compose `waitUntil`) tells Espresso the app is busy.\n\nMany teams prefer **fakes that complete synchronously** instead of shipping IdlingResource in production. Either way, `Thread.sleep` is not an IdlingResource.",
    "pdfTopic": false,
    "tags": [
      "espresso",
      "idling"
    ]
  },
  {
    "id": "and-210",
    "category": "android",
    "level": "intermediate",
    "topic": "Compose UI tests",
    "question": "How do you write Jetpack Compose UI tests?",
    "answer": "Use `createComposeRule()` / `createAndroidComposeRule()`. `setContent { MyScreen() }`, then `onNodeWithText(\"Save\")`, `onNodeWithTag(\"email\")`, `assertIsDisplayed()`, `performClick()`, `performTextInput()`.\n\nSemantics are the API: `Modifier.testTag`, content descriptions. Use `mainClock` for animations. Keep ViewModel tests on the JVM; Compose tests assert **what the user sees**, not `remember` internals.",
    "pdfTopic": false,
    "tags": [
      "compose",
      "testing"
    ]
  },
  {
    "id": "and-211",
    "category": "android",
    "level": "intermediate",
    "topic": "UI Automator",
    "question": "When do you use UI Automator instead of Espresso?",
    "answer": "**UI Automator** sees the whole device: other apps, system dialogs, permission sheets, launchers. Espresso stays inside your process.\n\nUse it for “grant permission then continue” or multi-app flows. It is slower and more brittle (resource ids on system UI change). Do not use it for every screen.",
    "pdfTopic": false,
    "tags": [
      "uiautomator"
    ]
  },
  {
    "id": "and-212",
    "category": "android",
    "level": "intermediate",
    "topic": "Mocks fakes stubs",
    "question": "What is the difference between a dummy, stub, fake, spy, and mock?",
    "answer": "- **Dummy** — unused parameter.\n- **Stub** — returns canned data.\n- **Fake** — working lightweight implementation (in-memory repo).\n- **Spy** — real object, some methods stubbed.\n- **Mock** — interaction-verified (Mockito `verify`).\n\nPrefer **fakes** for repositories you own. Mocks for types you do not want to construct. Spies hide too much real behavior — use sparingly.",
    "pdfTopic": false,
    "tags": [
      "mockito",
      "test-doubles"
    ]
  },
  {
    "id": "and-213",
    "category": "android",
    "level": "intermediate",
    "topic": "Mockito and MockK",
    "question": "How do Mockito and MockK differ on Android/Kotlin?",
    "answer": "**Mockito** is the Java default (`when(repo.user()).thenReturn(u)`, `verify(repo).save(any())`). Kotlin `final` classes need mockito-inline or MockK.\n\n**MockK** is Kotlin-first: `every { repo.user() } returns u`, `coEvery` for suspend, `slot()` for capture, `relaxUnitFun`. For coroutines, MockK + `runTest` is smoother than Mockito’s `thenAnswer`.\n\nDo not mock types you own if a fake is ten lines.",
    "pdfTopic": false,
    "tags": [
      "mockito",
      "mockk"
    ]
  },
  {
    "id": "and-214",
    "category": "android",
    "level": "intermediate",
    "topic": "Hilt testing",
    "question": "How do you replace Hilt bindings in tests?",
    "answer": "`@HiltAndroidTest`, `HiltAndroidRule`, and a test Application. Swap modules with **`@TestInstallIn(replaces = [NetworkModule::class])`** or `@UninstallModules` plus a module that `@Binds` fakes.\n\nActivities/Fragments still need `@AndroidEntryPoint`. For a pure ViewModel unit test, **construct it with fakes** — do not boot Hilt for a reducer. Keep `@Singleton` fakes from leaking state across methods (`@UninstallModules` + new fake each test).",
    "pdfTopic": false,
    "tags": [
      "hilt",
      "testing"
    ]
  },
  {
    "id": "and-215",
    "category": "android",
    "level": "intermediate",
    "topic": "MockWebServer",
    "question": "How do you unit-test Retrofit/OkHttp without the network?",
    "answer": "**MockWebServer** queues responses and exposes a localhost URL you pass as Retrofit `baseUrl`. Assert the recorded request method, path, headers, and body.\n\nPair with `runTest` so coroutines are deterministic. Do not hit staging from CI. For a repository unit test, a **fake API interface** is even simpler than MockWebServer.",
    "pdfTopic": false,
    "tags": [
      "okhttp",
      "testing"
    ]
  },
  {
    "id": "and-216",
    "category": "android",
    "level": "intermediate",
    "topic": "LiveData unit tests",
    "question": "How do you unit-test LiveData in a ViewModel?",
    "answer": "LiveData observers need a **main looper**. Use `InstantTaskExecutorRule` (Architecture Components test) so `setValue`/`observeForever` run inline on the JVM.\n\nObserve with `observeForever`, assert values, then `removeObserver`. Prefer Flow/`Turbine` in new code. Never `Thread.sleep` waiting for LiveData.",
    "pdfTopic": false,
    "tags": [
      "livedata",
      "junit"
    ]
  },
  {
    "id": "and-217",
    "category": "android",
    "level": "intermediate",
    "topic": "Coroutine test dispatchers",
    "question": "How do you unit-test ViewModels that use coroutines and Flow?",
    "answer": "`kotlinx-coroutines-test`: `runTest` (virtual time), `StandardTestDispatcher` / `UnconfinedTestDispatcher`, `advanceUntilIdle()`, `Dispatchers.setMain` via `MainDispatcherRule`.\n\nInject dispatchers (`DispatcherProvider`) so production is `IO` and tests are the test dispatcher. **Turbine** (`test { awaitItem() }`) asserts Flow emissions. Re-throw `CancellationException`. Never `runBlocking { delay(1000) }` in unit tests.",
    "pdfTopic": false,
    "tags": [
      "coroutines",
      "turbine"
    ]
  },
  {
    "id": "and-218",
    "category": "android",
    "level": "intermediate",
    "topic": "Room tests",
    "question": "How should you test Room DAOs?",
    "answer": "Use an **in-memory database** (`Room.inMemoryDatabaseBuilder`) in instrumented tests, or Robolectric with the same builder. Allow main thread only in tests (`allowMainThreadQueries`).\n\nAssert queries, transactions, and **migrations** (`MigrationTestHelper`). Do not mock DAO interfaces if the question is “does this SQL work?” Mock DAOs only when testing a ViewModel.",
    "pdfTopic": false,
    "tags": [
      "room",
      "testing"
    ]
  },
  {
    "id": "and-219",
    "category": "android",
    "level": "intermediate",
    "topic": "WorkManager tests",
    "question": "How do you unit-test WorkManager?",
    "answer": "`WorkManagerTestInitHelper` plus a `SynchronousExecutor` so work runs inline. Enqueue a `OneTimeWorkRequest`, then `getWorkInfoById` and assert `SUCCEEDED` / output Data.\n\nDo not rely on real constraints (network) in unit tests — use `setAllConstraintsMet`. For workers that call Retrofit, inject a fake.",
    "pdfTopic": false,
    "tags": [
      "workmanager",
      "testing"
    ]
  },
  {
    "id": "and-220",
    "category": "android",
    "level": "intermediate",
    "topic": "ActivityScenario",
    "question": "What are ActivityScenario and FragmentScenario?",
    "answer": "They **launch** an Activity/Fragment in a controlled lifecycle (`moveToState(State.STARTED)`), replacing `ActivityTestRule`. Use with Espresso or to assert `savedInstanceState` recreation (`recreate()`).\n\n`launchFragmentInContainer` needs a theme. Always `close()` the scenario (try-with-resources / `use`) or tests leak.",
    "pdfTopic": false,
    "tags": [
      "espresso",
      "fragment"
    ]
  },
  {
    "id": "and-221",
    "category": "android",
    "level": "advanced",
    "topic": "TDD BDD ATDD",
    "question": "What is the difference between TDD, BDD, and ATDD on Android?",
    "answer": "**TDD** — write a failing unit test, then production code, then refactor. Best for ViewModels and domain. **BDD** — behavior in domain language (Given/When/Then); Spek, Kotest, or Cucumber-style layers. **ATDD** — customers/QA/devs agree acceptance tests first; those tests are done-when-green.\n\nAndroid practice: TDD the ViewModel; BDD/ATDD a few Compose/Espresso journeys. TDD is not “write tests after QA files a bug.”",
    "pdfTopic": false,
    "tags": [
      "tdd",
      "bdd"
    ]
  },
  {
    "id": "and-222",
    "category": "android",
    "level": "advanced",
    "topic": "Flaky tests",
    "question": "What makes Android UI tests flake, and how do you fix them?",
    "answer": "Causes: animations, real network, unregistered Idling, `Thread.sleep`, shared singleton state, emulator load, system dialogs, clock, locale.\n\nFixes: fakes, test dispatcher, disable animations (`ANIMATOR_DURATION_SCALE=0`), `AndroidTestOrchestrator` (process per test), retry only as a last resort, pin emulator images in CI. A flake you “retry 3 times” is still a bug.",
    "pdfTopic": false,
    "tags": [
      "flaky",
      "ci"
    ]
  },
  {
    "id": "and-223",
    "category": "android",
    "level": "advanced",
    "topic": "Coverage and Orchestrator",
    "question": "What should you know about JaCoCo coverage and Android Test Orchestrator?",
    "answer": "**JaCoCo** measures line/branch coverage on JVM unit tests; instrumented coverage is heavier. Coverage is a **signal**, not a goal of 100%.\n\n**Android Test Orchestrator** runs each instrumented test in a new process so static state cannot leak. Slower, but kills “passes alone, fails in suite.” Use it when Espresso suites share Application singletons.",
    "pdfTopic": false,
    "tags": [
      "coverage",
      "orchestrator"
    ]
  },
  {
    "id": "and-224",
    "category": "android",
    "level": "advanced",
    "topic": "Screenshot tests",
    "question": "How do screenshot / paparazzi / Roborazzi tests work on Android?",
    "answer": "They render a View or Composable to a PNG and **diff against a golden**. Paparazzi (JVM) and Roborazzi (Robolectric) avoid a device. Compose screenshot testing is catching up in AndroidX.\n\nPin locale, font scale, and SDK. Review diffs in PR, do not blindly regenerate. They catch padding/theme regressions Espresso will miss.",
    "pdfTopic": false,
    "tags": [
      "screenshot",
      "compose"
    ]
  },
  {
    "id": "and-225",
    "category": "android",
    "level": "intermediate",
    "topic": "Truth and assertions",
    "question": "Why do Android teams use Google Truth or AssertJ instead of raw JUnit asserts?",
    "answer": "`assertThat(user.name).isEqualTo(\"Ada\")` reads as English and gives better failure messages than `assertEquals`. Truth is common in Google/AndroidX samples; AssertJ is popular in Java shops.\n\nHamcrest `assertThat(x, is(y))` still appears in Espresso matchers. Pick one assertion library per module and stay consistent.",
    "pdfTopic": false,
    "tags": [
      "assertions"
    ]
  },
  {
    "id": "and-226",
    "category": "android",
    "level": "advanced",
    "topic": "Testing Navigation",
    "question": "How do you unit-test Navigation Component / Compose Navigation?",
    "answer": "For Fragments, use `TestNavHostController` and assert `currentDestination`. For Compose, `runTest` + `NavHost` with a test graph, or extract navigation to a lambda/`Navigator` fake you verify.\n\nDo not Espresso-click through five screens to assert a ViewModel. Assert the **NavController** or a fake navigator from the ViewModel test.",
    "pdfTopic": false,
    "tags": [
      "navigation",
      "testing"
    ]
  },
  {
    "id": "and-227",
    "category": "android",
    "level": "intermediate",
    "topic": "Given When Then",
    "question": "How should you structure an Android unit test method?",
    "answer": "**Arrange / Given** — fakes, ViewModel, seed state. **Act / When** — call the function (`viewModel.onLogin()`). **Assert / Then** — `assertEquals` / Turbine items / `verify`.\n\nOne behavior per test. Name: `givenEmptyEmail_whenSubmit_thenShowsValidationError`. Do not share mutable fakes across tests without reset.",
    "pdfTopic": false,
    "tags": [
      "junit",
      "style"
    ]
  },
  {
    "id": "and-228",
    "category": "android",
    "level": "advanced",
    "topic": "Firebase Test Lab",
    "question": "What is Firebase Test Lab used for?",
    "answer": "Cloud farm of **real devices and emulators** that run your instrumented APK (Espresso, UI Automator, game loop, Robo). CI uploads the test APK; you get logs, videos, and coverage.\n\nIt does not replace local JVM unit tests. Use it for a small smoke suite across API levels, not 400 Espresso cases on 20 devices (cost and flakes).",
    "pdfTopic": false,
    "tags": [
      "ci",
      "test-lab"
    ]
  }
]);
