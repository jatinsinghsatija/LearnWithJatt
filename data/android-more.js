window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.android = (window.QA_BANK.android || []).concat([
  {
    "id": "and-174",
    "category": "android",
    "level": "intermediate",
    "topic": "HandlerThread",
    "question": "When do you use HandlerThread instead of a thread pool or coroutines?",
    "answer": "A **HandlerThread** is a Thread with a Looper. You post Messages/Runnables that run **serially** on that thread — useful for camera callbacks, Bluetooth, or a dedicated encoder pipeline where order matters and you already live in Handler APIs.\n\nA pool (`Dispatchers.IO`) is better for independent I/O. Coroutines are better for structured work tied to a lifecycle. Do not spin a HandlerThread for every network call.",
    "pdfTopic": false,
    "tags": [
      "threading",
      "handler"
    ]
  },
  {
    "id": "and-175",
    "category": "android",
    "level": "intermediate",
    "topic": "SavedStateHandle",
    "question": "What is SavedStateHandle and how does it work with ViewModel?",
    "answer": "`SavedStateHandle` is a **map that survives process death**, injected into a ViewModel (by default via the Saved State module / Hilt `@HiltViewModel`). You store primitives and Parcelables; Navigation also writes route args into it.\n\nIt is not for large objects. Pair it with `stateIn` / `MutableStateFlow` so UI state is both reactive and restorable. `rememberSaveable` is the Compose equivalent at the composable level.",
    "pdfTopic": false,
    "tags": [
      "viewmodel",
      "state"
    ]
  },
  {
    "id": "and-176",
    "category": "android",
    "level": "intermediate",
    "topic": "Navigation popUpTo",
    "question": "How do popUpTo, inclusive, and singleTop work in Navigation?",
    "answer": "`popUpTo` pops the back stack until a destination. **inclusive=true** also pops that destination (login → home should pop login). **saveState/restoreState** keep a bottom-tab stack. **singleTop** avoids stacking the same destination twice.\n\nWrong popUpTo is why users press Back and land on a checkout they already finished. Draw the graph in the interview.",
    "pdfTopic": false,
    "tags": [
      "navigation"
    ]
  },
  {
    "id": "and-177",
    "category": "android",
    "level": "intermediate",
    "topic": "Unique WorkManager",
    "question": "What is unique work in WorkManager, and which ExistingWorkPolicy do you pick?",
    "answer": "`enqueueUniqueWork(name, policy, request)` ensures one logical job.\n- **KEEP** — ignore the new request if one exists.\n- **REPLACE** — cancel and start new (new input).\n- **APPEND** / **APPEND_OR_REPLACE** — chain.\n\nUse unique names for sync, upload, and periodic work. Periodic work is already unique per name. Constraints (network, charging) still apply.",
    "pdfTopic": false,
    "tags": [
      "workmanager"
    ]
  },
  {
    "id": "and-178",
    "category": "android",
    "level": "intermediate",
    "topic": "Bound services",
    "question": "How does a bound Service work, and when is Messenger enough vs AIDL?",
    "answer": "Clients call `bindService`; you return an `IBinder` from `onBind`. Same-process: a local Binder object. Cross-process **Messenger** is a simple Handler over Binder. **AIDL** is for typed multi-thread IPC with multiple methods.\n\nUnbind in `onStop`/`onDestroy` or you leak the Service. `BIND_AUTO_CREATE` starts the service for the bind lifetime.",
    "pdfTopic": false,
    "tags": [
      "service",
      "ipc"
    ]
  },
  {
    "id": "and-179",
    "category": "android",
    "level": "intermediate",
    "topic": "Notification channels",
    "question": "How do notification channels and importance affect delivery?",
    "answer": "From Android 8, every notification needs a **channel**. Importance (`HIGH` heads-up, `LOW` silent shade, `MIN` collapsed) is chosen **at channel creation**; the user can later lower it, you cannot silently raise it.\n\nGroup channels, provide a channel UI in settings, and use categories (alarm, transport). Foreground services must post a valid notification tied to a channel.",
    "pdfTopic": false,
    "tags": [
      "notifications"
    ]
  },
  {
    "id": "and-180",
    "category": "android",
    "level": "intermediate",
    "topic": "Permission flow",
    "question": "Walk through a modern runtime permission request.",
    "answer": "Check `ContextCompat.checkSelfPermission`. If denied, optionally `shouldShowRequestPermissionRationale` then `requestPermissions` / Activity Result API. If permanently denied, send the user to Settings.\n\nAndroid 12+ Bluetooth, 13+ notifications, 14+ selected photos (`READ_MEDIA_VISUAL_USER_SELECTED`) change the graph. Never ask every permission on first launch. Special permissions (exact alarm, overlay, all-files) use different intents.",
    "pdfTopic": false,
    "tags": [
      "permissions"
    ]
  },
  {
    "id": "and-181",
    "category": "android",
    "level": "intermediate",
    "topic": "Paging RemoteMediator",
    "question": "How does Paging 3 RemoteMediator fit with Room?",
    "answer": "`Pager` + **PagingSource** (Room) shows the local DB. **RemoteMediator** loads a network page when the user reaches the edge, writes into Room, then Paging invalidates. That is the single-source-of-truth pattern.\n\nHandle `LoadType.REFRESH/PREPEND/APPEND`, store remote keys, and map errors to `MediatorResult.Error`. UI uses `LazyPagingItems` in Compose or `PagingDataAdapter`.",
    "pdfTopic": false,
    "tags": [
      "paging",
      "room"
    ]
  },
  {
    "id": "and-182",
    "category": "android",
    "level": "intermediate",
    "topic": "Hilt ViewModels",
    "question": "How do you inject a ViewModel with Hilt, including Assisted + SavedStateHandle?",
    "answer": "`@HiltViewModel class FooViewModel @Inject constructor(private val repo: Repo, private val saved: SavedStateHandle)`. Obtain with `hiltViewModel()` in Compose or `by viewModels()` in a `@AndroidEntryPoint` Activity/Fragment.\n\nAssisted injection (`@AssistedInject`) is for runtime ids not in SavedState. Do not construct ViewModels with `new` — you lose `onCleared` and SavedState.",
    "pdfTopic": false,
    "tags": [
      "hilt",
      "viewmodel"
    ]
  },
  {
    "id": "and-183",
    "category": "android",
    "level": "intermediate",
    "topic": "RecyclerView payloads",
    "question": "What are DiffUtil payloads, and why not notifyDataSetChanged?",
    "answer": "`notifyDataSetChanged` rebinds everything and loses animation. DiffUtil computes inserts/moves. A **payload** in `getChangePayload` lets `onBindViewHolder(holder, pos, payloads)` update only a progress bar or like-count without rebinding the image.\n\nStable **item ids** plus payloads are how chat apps stay smooth.",
    "pdfTopic": false,
    "tags": [
      "recyclerview"
    ]
  },
  {
    "id": "and-184",
    "category": "android",
    "level": "intermediate",
    "topic": "ConstraintLayout chains",
    "question": "What are ConstraintLayout chains, barriers, and guidelines?",
    "answer": "**Guidelines** are invisible anchors (percent or dp). **Barriers** move to the most extreme of several widgets (useful for i18n). **Chains** (spread, spread_inside, packed) distribute a set of views along an axis with weights.\n\nThese replace nested LinearLayouts. In Compose, `ConstraintLayout` exists but Rows/Columns/Box plus custom layout are often simpler.",
    "pdfTopic": false,
    "tags": [
      "constraintlayout"
    ]
  },
  {
    "id": "and-185",
    "category": "android",
    "level": "intermediate",
    "topic": "ProGuard keep rules",
    "question": "How do you write R8/ProGuard keep rules without disabling shrinking?",
    "answer": "Keep what reflection needs: Retrofit interfaces, Gson models, JNI, enum `valueOf`, Parcelable `CREATOR`. Prefer **`-keepclassmembers`** over `-keep class **`. Use consumer ProGuard files in libraries.\n\nR8 full mode is stricter (default in recent AGP). Reproduce with `./gradlew assembleRelease` and mapping.txt for retrace. `-dontobfuscate` is not a strategy.",
    "pdfTopic": false,
    "tags": [
      "r8"
    ]
  },
  {
    "id": "and-188",
    "category": "android",
    "level": "intermediate",
    "topic": "DataStore migrations",
    "question": "How do you migrate SharedPreferences to DataStore safely?",
    "answer": "Use `SharedPreferencesMigration` in `PreferenceDataStoreFactory` / `DataStoreFactory`. It runs once, copies keys, then you stop writing SharedPreferences.\n\nProto DataStore needs a **serializer** and schema migrations for field numbers. Never block the UI thread on `runBlocking { data.first() }` in production — expose Flow.",
    "pdfTopic": false,
    "tags": [
      "datastore"
    ]
  },
  {
    "id": "and-189",
    "category": "android",
    "level": "advanced",
    "topic": "Binder internals",
    "question": "How does Binder IPC actually work?",
    "answer": "Binder is a kernel driver. Objects implementing `IBinder` can be passed across processes. Transactions copy a **Parcel** (with a size limit). AIDL generates `Stub`/`Proxy`. The system identifies callers via UID.\n\nDeath recipients (`linkToDeath`) notify when the remote process dies. Shared memory (`ashmem` / `SharedMemory`) is for large payloads you must not Parcel. ContentProviders and system services are Binder underneath.",
    "pdfTopic": false,
    "tags": [
      "binder",
      "ipc"
    ]
  },
  {
    "id": "and-190",
    "category": "android",
    "level": "advanced",
    "topic": "ART GC",
    "question": "What should you know about ART garbage collection in interviews?",
    "answer": "ART uses a **generational, mostly concurrent** collector (with a compacting collector on newer versions). Allocations on the Java heap; JNI global refs pin objects. Large bitmaps used to punish GC — now `HardwareBuffer` / GPU.\n\nJank from GC is rarer than UI-thread work, but allocation storms in `onDraw` or Compose still show in traces. Use the Memory Profiler, not folklore about “GC pauses kill Android.”",
    "pdfTopic": false,
    "tags": [
      "art",
      "gc"
    ]
  },
  {
    "id": "and-191",
    "category": "android",
    "level": "advanced",
    "topic": "Baseline Profiles",
    "question": "How do you generate and ship Baseline Profiles?",
    "answer": "Write a **Macrobenchmark** / Baseline Profile generator that walks critical user journeys. AGP packages `baseline-prof.txt` into the AAB. ART then **AOT-compiles** those methods after install (Cloud Profiles help too).\n\nMeasure with Macrobenchmark startup and frame timing. Profiles that do not exercise the real path are cargo cult.",
    "pdfTopic": false,
    "tags": [
      "performance",
      "baseline-profiles"
    ]
  },
  {
    "id": "and-192",
    "category": "android",
    "level": "advanced",
    "topic": "Choreographer and jank",
    "question": "What is Choreographer, and how do you prove a jank bug?",
    "answer": "**Choreographer** schedules work for the next vsync (`FrameCallback`). If UI work exceeds the frame budget (~16 ms at 60 Hz, ~8 ms at 120 Hz), you drop frames.\n\n**Perfetto** shows `Choreographer#doFrame`, binder, and Compose recomposition. `FrameMetricsAggregator` / JankStats library quantify it in production. Guessing “overdraw” without a trace is weak.",
    "pdfTopic": false,
    "tags": [
      "jank",
      "choreographer"
    ]
  },
  {
    "id": "and-193",
    "category": "android",
    "level": "advanced",
    "topic": "Compose snapshot system",
    "question": "How does the Compose snapshot / State system work?",
    "answer": "Compose state (`mutableStateOf`) is a **snapshot-based** MVCC store. Reads during composition subscribe the composable. Writes invalidate those scopes. Snapshots isolate mutations (side effects vs composition).\n\nThis is why reading state in composition is tracked, and why writing state during composition is illegal (recompose loops). `Snapshot.sendApplyNotifications()` is the engine under `setValue`.",
    "pdfTopic": false,
    "tags": [
      "compose",
      "state"
    ]
  },
  {
    "id": "and-194",
    "category": "android",
    "level": "advanced",
    "topic": "Compose stability",
    "question": "How does Compose decide a parameter is stable, and how do you fix extra recomposition?",
    "answer": "A type is **stable** if Compose can skip when `equals` says unchanged: primitives, `@Immutable`/`@Stable` classes with stable properties, some collections. Unstable lambdas and `List` from Java often force recompose.\n\nFixes: `remember` lambdas, immutable models, `@Immutable`, strong skipping mode (newer compiler), compiler reports (`-Pandroidx.compose.compiler...`). Layout Inspector / Compose metrics confirm, not anecdotes.",
    "pdfTopic": false,
    "tags": [
      "compose",
      "recomposition"
    ]
  },
  {
    "id": "and-195",
    "category": "android",
    "level": "advanced",
    "topic": "SubcomposeLayout",
    "question": "What is SubcomposeLayout for?",
    "answer": "Most layouts measure children that already exist. **SubcomposeLayout** composes children **during measure** based on incoming constraints (`LazyColumn`, `BoxWithConstraints`, `Scaffold` slots).\n\nIt is expensive and easy to misuse. Prefer regular `Layout` unless the child tree truly depends on measured size. Interviewers use this to separate seniors from people who only call `BoxWithConstraints` everywhere.",
    "pdfTopic": false,
    "tags": [
      "compose",
      "layout"
    ]
  },
  {
    "id": "and-196",
    "category": "android",
    "level": "advanced",
    "topic": "Predictive back and embedding",
    "question": "What are predictive back and activity embedding?",
    "answer": "**Predictive back** (Android 14+) animates the previous destination as the gesture happens; enable `enableOnBackInvokedCallback` and handle `OnBackPressedDispatcher` / Compose `BackHandler` correctly.\n\n**Activity embedding** / Jetpack WindowManager splits two activities on large screens (list-detail) without rewriting as Fragments. Foldables make this a senior-level UI question.",
    "pdfTopic": false,
    "tags": [
      "back",
      "large-screen"
    ]
  },
  {
    "id": "and-197",
    "category": "android",
    "level": "advanced",
    "topic": "Credential Manager",
    "question": "What is Credential Manager, and how does it relate to Smart Lock / Autofill?",
    "answer": "**Credential Manager** is the current API for passwords, passkeys, and Sign in with Google, replacing much of Smart Lock. It coordinates with Autofill and Play services.\n\nPasskeys (WebAuthn) store public-key credentials in the password manager / hardware. Server verification still matters — client-only checks are not auth.",
    "pdfTopic": false,
    "tags": [
      "identity",
      "passkeys"
    ]
  },
  {
    "id": "and-198",
    "category": "android",
    "level": "advanced",
    "topic": "JNI pitfalls",
    "question": "What JNI mistakes show up in Android NDK interviews?",
    "answer": "Local refs explode in loops (`DeleteLocalRef` or `PushLocalFrame`). Exceptions from Java must be `ExceptionCheck`ed. UTF-8 `GetStringUTFChars` is not true UTF-8. Do not hold `JNIEnv*` across threads — attach with `AttachCurrentThread`.\n\nFindClass from a native thread without the app ClassLoader fails. Prefer `RegisterNatives`. Leak a global ref and ART cannot collect the object.",
    "pdfTopic": false,
    "tags": [
      "ndk",
      "jni"
    ]
  },
  {
    "id": "and-199",
    "category": "android",
    "level": "advanced",
    "topic": "Network security config",
    "question": "How do you allow a debug proxy without shipping cleartext to production?",
    "answer": "Use `network_security_config.xml` with a **debug-overrides** block (`res/xml`, `android:debuggable` only) that trusts user CAs for Charles/mitmproxy. Production config: no cleartext, pin leaves if you pin, and never pin only intermediates you do not control.\n\n`usesCleartextTraffic=true` globally is a finding in security reviews.",
    "pdfTopic": false,
    "tags": [
      "security",
      "network"
    ]
  },
  {
    "id": "and-200",
    "category": "android",
    "level": "advanced",
    "topic": "Direct Boot",
    "question": "What is Direct Boot and device-protected storage?",
    "answer": "After reboot and **before unlock**, apps in Direct Boot can run (alarm, SMS). Use `createDeviceProtectedStorageContext()` for data that must be available then; default credential-encrypted storage is locked.\n\nMark components `directBootAware`. Mixing the two storage contexts is a common crash (`IllegalStateException`). Most apps should not be Direct Boot aware.",
    "pdfTopic": false,
    "tags": [
      "directboot",
      "security"
    ]
  },
  {
    "id": "and-201",
    "category": "android",
    "level": "intermediate",
    "topic": "Lint",
    "question": "How does Android Lint fit a CI pipeline?",
    "answer": "Lint is a static analyzer (XML, Gradle, Kotlin via UAST). `lintVitalRelease` can fail the build. Baseline XML lets you freeze old issues while blocking new ones.\n\nTreat `NewApi`, `UnusedResources`, and `HardcodedText` as real. Do not `-Xlint:none` the whole module to ship.",
    "pdfTopic": false,
    "tags": [
      "lint",
      "ci"
    ]
  },
  {
    "id": "and-202",
    "category": "android",
    "level": "advanced",
    "topic": "RenderThread",
    "question": "What is RenderThread vs the UI thread?",
    "answer": "The **UI thread** runs layout/input/Compose composition. **RenderThread** (and GPU) executes display lists / RenderNode animations (ripple, circular reveal) so some animations continue if UI is busy.\n\nYou cannot touch Views from RenderThread. Compose draws through its own pipeline (including Impeller on some paths). Traces show both — jank can be GPU-bound or CPU-bound.",
    "pdfTopic": false,
    "tags": [
      "graphics"
    ]
  },
  {
    "id": "and-203",
    "category": "android",
    "level": "intermediate",
    "topic": "AppCompat vs Material",
    "question": "What is the difference between AppCompat and Material Components?",
    "answer": "**AppCompat** backports theme/widget behavior (Toolbar as ActionBar, vector, night). **Material Components** (`com.google.android.material`) adds Material widgets (TextInputLayout, MaterialButton, motion).\n\nThemes inherit `Theme.Material3.DayNight` today. Mixing `Theme.AppCompat` with Material widgets causes color overlay bugs. Compose Material3 is a parallel stack.",
    "pdfTopic": false,
    "tags": [
      "material",
      "appcompat"
    ]
  }
]);
