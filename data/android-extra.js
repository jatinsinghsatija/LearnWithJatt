window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.android = (window.QA_BANK.android || []).concat([
  {
    "id": "and-134",
    "category": "android",
    "level": "basic",
    "topic": "Android history",
    "question": "Who created Android, and how did Google get involved?",
    "answer": "Android Inc. was founded in 2003 by **Andy Rubin**, Rich Miner, Nick Sears, and Chris White, originally aiming at cameras and then phones. **Google acquired Android Inc. in 2005**. The first public Android phone (T-Mobile G1 / HTC Dream) shipped in 2008 with Android 1.0.\n\nIn interviews, add: Google open-sourced the stack as **AOSP**, while Play Services, Play Store, and GMS stay proprietary. OEMs ship AOSP plus their skins (One UI, OxygenOS, etc.).",
    "pdfTopic": false,
    "tags": [
      "history",
      "google"
    ]
  },
  {
    "id": "and-135",
    "category": "android",
    "level": "basic",
    "topic": "Android versions",
    "question": "What are Android version code names, and do they still matter?",
    "answer": "From 1.5 through 9, each release had a dessert name (Cupcake, Donut, Eclair, Froyo, Gingerbread, Honeycomb, Ice Cream Sandwich, Jelly Bean, KitKat, Lollipop, Marshmallow, Nougat, Oreo, Pie). From **Android 10** onward Google dropped public dessert names and uses the API number (API 29, 30, …).\n\nYou still need **API levels** in interviews: `minSdk`, `targetSdk`, `compileSdk`. Behavior changes (scoped storage, exported components, exact alarms, photo picker) are tied to **targetSdk**, not the dessert nickname.",
    "pdfTopic": false,
    "tags": [
      "versions",
      "api-level"
    ]
  },
  {
    "id": "and-136",
    "category": "android",
    "level": "basic",
    "topic": "Android advantages",
    "question": "What advantages of Android do interviewers expect?",
    "answer": "- Open-source AOSP and a huge device ecosystem.\n- Java/Kotlin SDK plus NDK when you need C/C++.\n- Rich IPC (Intents, Binder, ContentProviders) and a mature Play distribution model.\n- Jetpack + Compose for modern UI; backward libraries via AndroidX.\n\nBe honest about costs: fragmentation, OEM delays, background-execution limits, and Play policy. A strong answer is not a marketing list.",
    "pdfTopic": false,
    "tags": [
      "basics"
    ]
  },
  {
    "id": "and-137",
    "category": "android",
    "level": "basic",
    "topic": "Languages on Android",
    "question": "Does Android support languages other than Java?",
    "answer": "Yes. **Kotlin is the preferred language**. Java is fully supported. The **NDK** lets you write C/C++ (games, codecs, crypto). Other JVM languages can compile to bytecode, but you still package **DEX**. Cross-platform stacks (Flutter/Dart, React Native/JS, KMP) talk to Android through the same runtime or platform channels.\n\nJava `.class` files do **not** run as-is; `d8`/`r8` turn them into DEX that ART executes.",
    "pdfTopic": false,
    "tags": [
      "kotlin",
      "ndk",
      "dex"
    ]
  },
  {
    "id": "and-138",
    "category": "android",
    "level": "basic",
    "topic": "findViewById",
    "question": "How are view elements identified in an Android program?",
    "answer": "XML views get an `android:id`. The build generates `R.id.*`. Historically you called `findViewById(R.id.name)` and cast the result. That is error-prone (wrong type, missing id, NPEs).\n\nModern apps use **View Binding** (`binding.title.text = …`) or **Jetpack Compose** (no XML ids). Data Binding can also bind ids. In interviews, say ids are **integers in R**, not strings, and `ViewBinding` is the default replacement for `findViewById`.",
    "pdfTopic": false,
    "tags": [
      "views",
      "R.id"
    ]
  },
  {
    "id": "and-139",
    "category": "android",
    "level": "basic",
    "topic": "Toast and Snackbar",
    "question": "What is a Toast, and how does it differ from a Snackbar?",
    "answer": "A **Toast** is a small, unobtrusive system popup. It does not take focus and cannot hold an action button in the modern API. A **Snackbar** (Material) sits in the CoordinatorLayout/Scaffold, can include an action (Undo), and respects Material motion.\n\nUse Toast for fire-and-forget status. Use Snackbar when the user might undo a delete. Neither replaces a dialog for decisions that need a choice.",
    "pdfTopic": false,
    "tags": [
      "ui",
      "toast"
    ]
  },
  {
    "id": "and-140",
    "category": "android",
    "level": "basic",
    "topic": "Project structure",
    "question": "What are the important folders in an Android project?",
    "answer": "- `app/src/main/java` or `kotlin` — source.\n- `app/src/main/res` — `layout`, `drawable`, `mipmap`, `values` (strings, colors, themes), `xml`, `raw`, `font`.\n- `app/src/main/AndroidManifest.xml`.\n- `app/build.gradle.kts` — module Gradle; root `settings.gradle.kts` / version catalogs.\n- `app/src/test` (JVM unit) and `app/src/androidTest` (instrumented).\n- Optional `assets/` for files you read by path.\n\nGenerated code lives under `build/` (R, binding classes). Do not edit it.",
    "pdfTopic": false,
    "tags": [
      "gradle",
      "res"
    ]
  },
  {
    "id": "and-141",
    "category": "android",
    "level": "basic",
    "topic": "Bundle",
    "question": "What is a Bundle in Android and when do you use it?",
    "answer": "A **Bundle** is a type-safe map of primitives and Parcelables used to pass data across process-friendly boundaries: Intent extras, Fragment arguments, `savedInstanceState`, and Activity results.\n\nRules: keep it **small** (Binder transaction limit is about 1 MB, but you should stay far below). Do not put bitmaps or large lists in extras — pass an id and load from disk/DB. Use `by navArgs()` / Safe Args rather than raw string keys when you can.",
    "pdfTopic": false,
    "tags": [
      "intent",
      "state"
    ]
  },
  {
    "id": "and-142",
    "category": "android",
    "level": "basic",
    "topic": "Resources and R",
    "question": "What is an application resource file, and what is the R class?",
    "answer": "Resources are XML/binary files under `res/` compiled by **AAPT2**. You reference them as `@string/app_name` in XML and `R.string.app_name` in code. Configuration qualifiers (`-land`, `-night`, `-w600dp`, `-hdpi`) pick the right file at runtime.\n\nThe **R class** is generated: each resource gets a stable int id. Never hard-code those ints. `values/strings.xml`, `colors.xml`, `themes.xml` are the files interviewers mean by “resource files.”",
    "pdfTopic": false,
    "tags": [
      "resources"
    ]
  },
  {
    "id": "and-143",
    "category": "android",
    "level": "basic",
    "topic": "Linux UID",
    "question": "What is the Linux UID used for in Android?",
    "answer": "Each app is assigned a unique **Linux UID** (and usually its own process). The kernel enforces that one app cannot read another app’s private data directory. Shared UID (`android:sharedUserId`) is **legacy and discouraged**.\n\nPermissions, SELinux, and the UID sandbox are why ContentProviders, FileProvider, and Intents exist as official sharing APIs.",
    "pdfTopic": false,
    "tags": [
      "security",
      "sandbox"
    ]
  },
  {
    "id": "and-144",
    "category": "android",
    "level": "basic",
    "topic": "DEX vs Java bytecode",
    "question": "Can Java bytecode run on Android as-is?",
    "answer": "No. `javac`/`kotlinc` emit JVM `.class` files. Android’s **D8** converts them to **DEX** (Dalvik Executable). **R8** also shrinks and obfuscates while converting. ART then runs DEX (AOT/JIT).\n\nSo “Android runs Java” means the **language** and much of the library shape, not a desktop JVM class file dropped onto a phone.",
    "pdfTopic": false,
    "tags": [
      "dex",
      "art"
    ]
  },
  {
    "id": "and-145",
    "category": "android",
    "level": "basic",
    "topic": "Storage options",
    "question": "What storage options does Android provide?",
    "answer": "- **App-specific internal storage** (`context.filesDir`) — private, deleted on uninstall.\n- **App-specific external** (`getExternalFilesDir`) — may be visible to the user, still app-owned.\n- **Shared storage** — MediaStore, SAF, photo picker (scoped storage from Android 10).\n- **Preferences** — DataStore (or legacy SharedPreferences).\n- **Databases** — Room on top of SQLite.\n- **Cache** — `cacheDir`, okay to evict.\n\nSay “scoped storage” in any modern interview: you no longer get broad `READ_EXTERNAL_STORAGE` for free.",
    "pdfTopic": false,
    "tags": [
      "storage",
      "room"
    ]
  },
  {
    "id": "and-146",
    "category": "android",
    "level": "basic",
    "topic": "Fragment",
    "question": "What is a Fragment in Android?",
    "answer": "A **Fragment** is a reusable, lifecycle-aware piece of UI hosted by an Activity (or another Fragment). It has its own view, arguments, and back-stack entry via `FragmentManager`.\n\nUse fragments for pane layouts, Navigation Component destinations, and dialogs (`DialogFragment`). Compose-first apps often skip XML fragments and use composable destinations instead. You still cannot show a Fragment without a host Activity/FragmentManager.",
    "pdfTopic": false,
    "tags": [
      "fragment"
    ]
  },
  {
    "id": "and-147",
    "category": "android",
    "level": "basic",
    "topic": "APK format",
    "question": "What is an APK, and what is inside it?",
    "answer": "An **APK** is a signed ZIP. Typical contents: `AndroidManifest.xml` (binary), `classes.dex` (one or more), `resources.arsc`, `res/`, `assets/`, `lib/` ABI `.so` files, and `META-INF` signatures.\n\nPlay prefers **AAB** (Android App Bundle); Play generates split APKs per ABI, density, and language. Sideload and debug still use APK.",
    "pdfTopic": false,
    "tags": [
      "apk",
      "packaging"
    ]
  },
  {
    "id": "and-148",
    "category": "android",
    "level": "basic",
    "topic": "View and ViewGroup",
    "question": "What is a ViewGroup in Android?",
    "answer": "A **View** is a rectangular UI widget (TextView, ImageView). A **ViewGroup** is a View that contains children and implements layout (LinearLayout, ConstraintLayout, RecyclerView, FrameLayout).\n\nMeasure/layout/draw walk the tree. Deep nested ViewGroups are expensive; ConstraintLayout or Compose exists to flatten that. Adapters bind data into child views inside a ViewGroup like RecyclerView.",
    "pdfTopic": false,
    "tags": [
      "view",
      "layout"
    ]
  },
  {
    "id": "and-149",
    "category": "android",
    "level": "basic",
    "topic": "Nine-patch",
    "question": "What is a nine-patch image in Android?",
    "answer": "A **.9.png** is a PNG with a 1-pixel border that marks **stretchable** regions (top/left) and **content padding** (bottom/right). The system scales buttons and backgrounds without smearing corners.\n\nVector drawables and Material ShapeAppearance replace many nine-patches today, but the question still appears. Name the file suffix `.9.png` and the stretch vs padding black lines.",
    "pdfTopic": false,
    "tags": [
      "drawable",
      "ui"
    ]
  },
  {
    "id": "and-150",
    "category": "android",
    "level": "intermediate",
    "topic": "App widgets",
    "question": "What are home-screen App Widgets on Android?",
    "answer": "App Widgets are glanceable UI hosted by the launcher, updated via `AppWidgetProvider` (a BroadcastReceiver) and RemoteViews. They cannot run arbitrary view hierarchies — only a documented RemoteViews subset.\n\nAndroid 12+ added **rounded corners, state-based layouts, and Glance** (Compose for widgets). Updates are rate-limited; do work in a WorkManager job, then `updateAppWidget`.",
    "pdfTopic": false,
    "tags": [
      "widgets"
    ]
  },
  {
    "id": "and-151",
    "category": "android",
    "level": "basic",
    "topic": "Drawable folder",
    "question": "What belongs in the drawable folder?",
    "answer": "`res/drawable` holds bitmaps, XML shapes, selectors, vector drawables, and layer-lists. Density-specific bitmaps go in `drawable-hdpi`, `drawable-xhdpi`, etc. Launcher icons usually live in `mipmap-*` because mipmap is not stripped the same way.\n\nNight variants use `drawable-night`. Do not put random JPGs in `mipmap`.",
    "pdfTopic": false,
    "tags": [
      "resources",
      "drawable"
    ]
  },
  {
    "id": "and-152",
    "category": "android",
    "level": "basic",
    "topic": "Dialogs",
    "question": "Which dialog types does Android commonly support?",
    "answer": "- **AlertDialog** — title, message, actions.\n- **DatePickerDialog / TimePickerDialog**.\n- **Progress** — avoid blocking modal spinners; prefer inline indicators.\n- **Bottom sheet** (Material) for menus.\n- **DialogFragment** — the lifecycle-safe way to host any of the above.\n- **Compose** `AlertDialog` / `ModalBottomSheet`.\n\nNever show a dialog from a background thread. After rotation, DialogFragment restores; a raw `AlertDialog.show()` from an Activity often leaks.",
    "pdfTopic": false,
    "tags": [
      "dialog",
      "ui"
    ]
  },
  {
    "id": "and-153",
    "category": "android",
    "level": "intermediate",
    "topic": "Doze and App Standby",
    "question": "What is sleep / Doze mode, and how does it affect background work?",
    "answer": "When the device is unused, **Doze** batches network and defers jobs. **App Standby** buckets (active → rare) restrict apps the user does not open. `JobScheduler`/`WorkManager` are Doze-aware; a raw Thread in a Service is not a workaround.\n\nExemptions: high-priority FCM, exact alarms (restricted), foreground services with the right type. Battery optimization settings can put you in a worse bucket — do not tell users to whitelist you as the first answer.",
    "pdfTopic": false,
    "tags": [
      "doze",
      "background"
    ]
  },
  {
    "id": "and-154",
    "category": "android",
    "level": "intermediate",
    "topic": "List adapters",
    "question": "What is an Adapter in Android UI (not the GoF pattern)?",
    "answer": "An **Adapter** binds a data set to a ViewGroup: `ArrayAdapter`, `CursorAdapter`, `RecyclerView.Adapter`. `getItemCount` / `onCreateViewHolder` / `onBindViewHolder` are the RecyclerView trio. Use **DiffUtil** so you do not `notifyDataSetChanged()` the whole list.\n\nListView adapters are legacy. Compose `LazyColumn` items replace adapters entirely.",
    "pdfTopic": false,
    "tags": [
      "recyclerview",
      "adapter"
    ]
  },
  {
    "id": "and-155",
    "category": "android",
    "level": "intermediate",
    "topic": "AsyncTask",
    "question": "What was AsyncTask, and why is it gone?",
    "answer": "`AsyncTask` ran `doInBackground` on a thread pool and `onPostExecute` on the UI thread. It had no lifecycle awareness, leaked Activities, was serial or poorly documented parallel, and broke across configuration changes.\n\nReplacements: **Kotlin coroutines** (`viewModelScope.launch`), **WorkManager** for deferrable work, **Executors** with LiveData/Flow. Mentioning AsyncTask as current practice is a red flag.",
    "pdfTopic": false,
    "tags": [
      "legacy",
      "threading"
    ]
  },
  {
    "id": "and-156",
    "category": "android",
    "level": "intermediate",
    "topic": "Networking libraries",
    "question": "How do OkHttp, Retrofit, and Volley compare?",
    "answer": "**OkHttp** is the HTTP client (connections, interceptors, HTTP/2). **Retrofit** is a typed API layer on OkHttp (interfaces + converters). **Volley** is an older Google library for small request queues; few new apps pick it.\n\nInterview default: Retrofit + OkHttp + kotlinx.serialization or Moshi, plus an interceptor for auth and logging. Pin certificates at the OkHttp layer.",
    "pdfTopic": false,
    "tags": [
      "retrofit",
      "okhttp"
    ]
  },
  {
    "id": "and-157",
    "category": "android",
    "level": "intermediate",
    "topic": "Image loading",
    "question": "How do Glide, Coil, and Picasso differ?",
    "answer": "All three load, cache, and transform images off the UI thread.\n- **Glide** — long-time Android default, GIFs, generated API.\n- **Coil** — Kotlin-first, coroutines, lighter, common in Compose (`AsyncImage`).\n- **Picasso** — simpler, less active.\n\nTalk about memory: downsampling, `cacheInMemory`, and not decoding a 12 MP bitmap into an ImageView. Compose apps usually pick Coil.",
    "pdfTopic": false,
    "tags": [
      "glide",
      "coil"
    ]
  },
  {
    "id": "and-158",
    "category": "android",
    "level": "intermediate",
    "topic": "Scoped storage and FileProvider",
    "question": "What is scoped storage, and why do you need FileProvider?",
    "answer": "From Android 10, apps no longer see the whole shared storage. Media goes through **MediaStore**; user-picked files through **SAF** or the photo picker. To hand a file to another app (camera capture, share sheet) you expose a **content://** URI via **FileProvider** and `FLAG_GRANT_READ_URI_PERMISSION`.\n\n`file://` URIs between apps are blocked (`FileUriExposedException`).",
    "pdfTopic": false,
    "tags": [
      "storage",
      "fileprovider"
    ]
  },
  {
    "id": "and-159",
    "category": "android",
    "level": "intermediate",
    "topic": "App Links",
    "question": "What is the difference between deep links and Android App Links?",
    "answer": "A **deep link** is any Intent URI that opens a screen (`myapp://profile/1` or https). **App Links** are https links verified with a **Digital Asset Links** JSON on your domain, so the system opens your app without the disambiguation dialog.\n\nNavigation Component `navDeepLink` + `android:autoVerify=\"true\"` is the usual setup. Also know Play **App Indexing** vs App Links — different products.",
    "pdfTopic": false,
    "tags": [
      "deeplink",
      "applinks"
    ]
  },
  {
    "id": "and-160",
    "category": "android",
    "level": "advanced",
    "topic": "Keystore and biometrics",
    "question": "How do you store secrets and unlock them with biometrics on Android?",
    "answer": "Use the **Android Keystore** so keys never leave the TEE/StrongBox. Wrap tokens with AES/GCM. **EncryptedSharedPreferences** / Tink sit on Keystore. For unlock, **BiometricPrompt** with a `CryptoObject` so a fingerprint is bound to the cipher, not a boolean `if (ok) decrypt()`.\n\nDo not store passwords in SharedPreferences plaintext. PIN/pattern is the device credential; it is not your app password.",
    "pdfTopic": false,
    "tags": [
      "security",
      "keystore"
    ]
  },
  {
    "id": "and-161",
    "category": "android",
    "level": "advanced",
    "topic": "Play Integrity",
    "question": "What replaced SafetyNet Attestation?",
    "answer": "**Play Integrity API** replaced SafetyNet Attestation. The app requests a token; your **server** talks to Google to learn device integrity, app integrity, and licensing. Never make the only check on-device — a rooted client can lie locally.\n\nUse it for abuse-sensitive actions (login, payments), not every HTTP call.",
    "pdfTopic": false,
    "tags": [
      "security",
      "play"
    ]
  },
  {
    "id": "and-163",
    "category": "android",
    "level": "intermediate",
    "topic": "KSP vs kapt",
    "question": "What is the difference between kapt and KSP?",
    "answer": "**kapt** runs Java annotation processors on Kotlin stubs — slow, stub-imperfect. **KSP** (Kotlin Symbol Processing) reads Kotlin directly and is the path for Room, Moshi, Dagger/Hilt, and Compose compilers going forward.\n\nIn Gradle you prefer `ksp(...)` over `kapt(...)`. Interviewers use this to see if you have touched a modern build.",
    "pdfTopic": false,
    "tags": [
      "gradle",
      "ksp"
    ]
  },
  {
    "id": "and-164",
    "category": "android",
    "level": "intermediate",
    "topic": "MotionLayout",
    "question": "What is MotionLayout?",
    "answer": "**MotionLayout** is a ConstraintLayout subclass that animates between ConstraintSets using a MotionScene XML (keyframes, swipe handlers). It is the XML-world answer to coordinated motion.\n\nCompose uses `animate*AsState`, `updateTransition`, and `AnimatedVisibility` instead. Know both if the team still has XML screens.",
    "pdfTopic": false,
    "tags": [
      "animation",
      "constraintlayout"
    ]
  },
  {
    "id": "and-165",
    "category": "android",
    "level": "intermediate",
    "topic": "Multi-window and PiP",
    "question": "How do multi-window and Picture-in-Picture work?",
    "answer": "Apps must handle **size configuration changes** (and often `smallestScreenWidth`). `resizeableActivity` defaults to true on modern SDKs. **PiP** (`enterPictureInPictureMode`) is for video/navigation; you supply a `PictureInPictureParams` aspect ratio and hide full-screen chrome in `onPictureInPictureModeChanged`.\n\nFoldables add `WindowInfoTracker` / Jetpack WindowManager hinge features. Do not assume a single fixed portrait layout.",
    "pdfTopic": false,
    "tags": [
      "pip",
      "foldables"
    ]
  },
  {
    "id": "and-166",
    "category": "android",
    "level": "intermediate",
    "topic": "Profiling tools",
    "question": "Which tools do you use to debug performance and crashes?",
    "answer": "- **Logcat** with tags and `adb logcat`.\n- **Android Studio Profiler** — CPU, memory, allocations.\n- **Perfetto / System Trace** — frame times, binder, scheduling (Systrace’s successor).\n- **Layout Inspector** / Compose inspector.\n- **LeakCanary**, StrictMode, Macrobenchmark, Baseline Profiles.\n\nName jank as **slow frames** (UI thread / Compose recomposition / overdraw), not “the phone is slow.”",
    "pdfTopic": false,
    "tags": [
      "perfetto",
      "logcat"
    ]
  },
  {
    "id": "and-167",
    "category": "android",
    "level": "intermediate",
    "topic": "Themes and night mode",
    "question": "How do themes, styles, and night mode work?",
    "answer": "A **style** is a set of attributes. A **theme** is a style applied to a Context (Activity/Application) so widgets pick colors/typography from it. Material3 uses `Theme.Material3.*` and color roles.\n\nNight mode: `values-night/`, `AppCompatDelegate.setDefaultNightMode`, and `uiMode` configuration. Compose uses `isSystemInDarkTheme()` and a `colorScheme`. Force-light in XML is `android:forceDarkAllowed=\"false\"` plus a light theme — the system dark setting does not have to restyle your app.",
    "pdfTopic": false,
    "tags": [
      "theme",
      "night"
    ]
  },
  {
    "id": "and-168",
    "category": "android",
    "level": "advanced",
    "topic": "Custom View",
    "question": "How do you write a custom View?",
    "answer": "Subclass `View` or `ViewGroup`. Implement constructors (inflate attrs). Override `onMeasure` (respect `MeasureSpec`), `onSizeChanged`, `onDraw` (use preallocated Paints, no allocations per frame), and optionally `onTouchEvent` / `performClick` for accessibility.\n\nFor children, `onLayout` positions them. Prefer **Compose custom layout** or existing widgets unless you need a control the framework lacks. Mention hardware bitmaps and `contentDescription`.",
    "pdfTopic": false,
    "tags": [
      "custom-view"
    ]
  },
  {
    "id": "and-169",
    "category": "android",
    "level": "basic",
    "topic": "Vector and adaptive icons",
    "question": "What are vector drawables and adaptive icons?",
    "answer": "**Vector drawables** (`<vector>` XML) scale without extra densities. They are not a full SVG implementation. **Adaptive icons** (`mipmap-anydpi-v26/ic_launcher.xml`) split foreground/background so launchers mask to circles/squircles.\n\nKeep vectors simple (no huge path lists) or they cost more than a PNG at runtime.",
    "pdfTopic": false,
    "tags": [
      "icons",
      "vector"
    ]
  },
  {
    "id": "and-170",
    "category": "android",
    "level": "advanced",
    "topic": "Exported components",
    "question": "Why does android:exported matter?",
    "answer": "If a component has an Intent Filter, it must set `android:exported` explicitly (Android 12+). `exported=true` means **other apps can start it**. Activities with filters are often exported; that is an attack surface (intent injection).\n\nDefault-deny: exported false, permission-protect ContentProviders, validate extras, and do not export debug Activities.",
    "pdfTopic": false,
    "tags": [
      "security",
      "manifest"
    ]
  },
  {
    "id": "and-171",
    "category": "android",
    "level": "intermediate",
    "topic": "Task affinity",
    "question": "What is task affinity?",
    "answer": "`android:taskAffinity` names which task an Activity prefers. Combined with `allowTaskReparenting` and launch modes, it explains “why did this screen open in a different Recents entry?”\n\nDefault affinity is the package name. Launchers and `singleInstance` create extra tasks. Most apps should not set custom affinity unless they are building a true multi-task product.",
    "pdfTopic": false,
    "tags": [
      "tasks",
      "launch-mode"
    ]
  },
  {
    "id": "and-172",
    "category": "android",
    "level": "intermediate",
    "topic": "Serialization libraries",
    "question": "How do Gson, Moshi, and kotlinx.serialization compare on Android?",
    "answer": "**Gson** — reflection, easy, slower, ProGuard keep rules. **Moshi** — Kotlin support via codegen/KSP, fewer surprises. **kotlinx.serialization** — compiler plugin, multiplatform, first choice for KMP.\n\nPair with Retrofit converters. Never serialize secrets into logs. Prefer codegen over reflection for R8.",
    "pdfTopic": false,
    "tags": [
      "json",
      "network"
    ]
  },
  {
    "id": "and-173",
    "category": "android",
    "level": "advanced",
    "topic": "RxJava vs coroutines",
    "question": "When would you still see RxJava on Android vs Kotlin coroutines/Flow?",
    "answer": "RxJava was the standard for composing async streams (Observables, schedulers, backpressure). New Kotlin code uses **coroutines + Flow** (simpler cancellation, structured concurrency, first-party Android KTX).\n\nYou still need to read Rx in older modules: `subscribeOn`/`observeOn` map to `flowOn`/`withContext`. Do not mix two stacks in one feature without a bridge (`asFlow()` / `asObservable()`).",
    "pdfTopic": false,
    "tags": [
      "rxjava",
      "coroutines"
    ]
  }
]);
