window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.android = [
  {
    "id": "and-001",
    "category": "android",
    "level": "basic",
    "topic": "Android basics",
    "question": "What is Android, and what makes it different from a generic Linux OS?",
    "answer": "**Android** is a mobile operating system built on a Linux kernel, with a Java/Kotlin application framework, a dedicated runtime (historically Dalvik, now **ART**), and a set of system apps. Google ships it as an open-source stack (AOSP) plus proprietary services (Play, Firebase, Play Services).\n\nInterviewers want more than “it’s Linux for phones”:\n\n- Apps run in **isolated processes** with a unique Linux UID (sandbox).\n- UI is activity/fragment/compose based, not a desktop window manager.\n- The framework exposes **ActivityManager, PackageManager, WindowManager, NotificationManager**, and so on.\n- Distribution is via APK/AAB, signed, with a permission model.\n\nSay you write apps against the **SDK**; the kernel, drivers, and runtime are the platform. That split shows up in almost every later question (services, IPC, permissions, ART).",
    "pdfTopic": false,
    "tags": [
      "android",
      "os",
      "basics"
    ]
  },
  {
    "id": "and-002",
    "category": "android",
    "level": "basic",
    "topic": "Android architecture",
    "question": "Walk through the five layers of Android architecture.",
    "answer": "The PDF lists Android as a **five-layer stack**. From the top down:\n\n- **Applications** — preinstalled apps (Home, Contacts, Camera, Gallery) and Play Store apps. They run on the runtime and call framework APIs.\n- **Application Framework** — reusable services and classes used to build apps: Activity Manager, Notification Manager, View system, Package Manager, resource and hardware abstractions.\n- **Android Runtime** — core libraries plus a VM. Older devices used **DVM (Dalvik)**; from **Android 5.0 (Lollipop)** onward the runtime is **ART**, which compiles bytecode to native code (AOT, later mixed AOT/JIT with profiles).\n- **Platform Libraries** — C/C++ and Java libraries: Media, SurfaceFlinger/Surface Manager, OpenGL/SGL, **SQLite**, **FreeType**, **WebKit**, **SSL**.\n- **Linux Kernel** — drivers, process/memory/power, networking, and the security model. It is the abstraction over hardware.\n\nA strong answer also mentions **Zygote**: a pre-forked ART process that warms common classes so every app start is a `fork()` plus specialization, not a cold VM boot.",
    "pdfTopic": true,
    "tags": [
      "architecture",
      "layers",
      "pdf"
    ],
    "image": "assets/android-architecture.png"
  },
  {
    "id": "and-003",
    "category": "android",
    "level": "basic",
    "topic": "Applications layer",
    "question": "What lives in the Applications layer of Android architecture?",
    "answer": "The **Applications** layer is the top of the stack. Two families of apps sit here:\n\n- **System/preinstalled** apps: Home/Launcher, Contacts, Camera, Gallery, Settings, Phone, and OEM variants.\n- **Third-party** apps installed from Play Store or sideload: chat, games, banking, and your own APK.\n\nThey do **not** talk to drivers directly. They run inside the Android runtime and reach hardware and system state through the **Application Framework** (Intents, ContentResolvers, managers). In an interview, tie this to sandboxing: each app is a separate Linux process/UID, so even two apps on this layer cannot read each other’s files unless they use a public contract (ContentProvider, FileProvider, sharedUserId legacy, or explicit IPC).",
    "pdfTopic": true,
    "tags": [
      "architecture",
      "applications",
      "pdf"
    ],
    "image": "assets/applications-layer.png"
  },
  {
    "id": "and-004",
    "category": "android",
    "level": "basic",
    "topic": "Application Framework",
    "question": "What is the Application Framework layer, and which services should you name?",
    "answer": "The **Application Framework** is the Java/Kotlin API surface you actually program against. The PDF describes it as a **generic abstraction for hardware access** plus UI and resource management. It exposes managers so you write an Activity, not a kernel client.\n\nName these services:\n\n- **Activity Manager** — task stacks, process importance, lifecycle dispatch.\n- **Notification Manager** — status bar / heads-up / channels.\n- **View system** — widgets, layouts, window tokens.\n- **Package Manager** — installed packages, permissions, components.\n- **Resource Manager / Content Providers / Location / Telephony / WindowManager** as extras if they push.\n\nFramework classes are shared; your app process still has its own heap. When you say “Android framework,” this layer is usually what interviewers mean, not ART itself.",
    "pdfTopic": true,
    "tags": [
      "architecture",
      "framework",
      "pdf"
    ]
  },
  {
    "id": "and-005",
    "category": "android",
    "level": "basic",
    "topic": "Android Runtime",
    "question": "Explain Android Runtime: DVM vs ART, core libraries, and Zygote.",
    "answer": "**Android Runtime** hosts your bytecode and the core libraries that implement the Java/Kotlin standard APIs plus Android types.\n\n**Dalvik (DVM)** was a **register-based** VM (unlike classic stack-based JVM). It was tuned so a phone could run **many VM instances**. It depended on the Linux kernel for threads and low-level memory. Apps shipped as `.dex`.\n\nFrom **Android 5.0**, **ART** replaced Dalvik as the default. ART compiles dex bytecode to native code. Early ART was mostly **ahead-of-time (AOT)** at install; modern ART mixes **AOT + JIT + profile-guided compilation** (Cloud Profiles / Baseline Profiles). Same dex input, better startup and battery.\n\n**Zygote** is the process that starts at boot, loads ART and common classes, then **forks** for each new app. Forking a warm process is why Android app start is not “launch a JVM from scratch.” Core libraries let you write apps in **Java or Kotlin**; they are not a full desktop JDK.",
    "pdfTopic": true,
    "tags": [
      "ART",
      "Dalvik",
      "Zygote",
      "pdf"
    ],
    "image": "assets/android-runtime.png"
  },
  {
    "id": "and-006",
    "category": "android",
    "level": "basic",
    "topic": "Platform Libraries",
    "question": "Which platform libraries sit under the Android framework, and what does each one do?",
    "answer": "**Platform libraries** are native (C/C++) and Java libraries that framework and apps lean on. The PDF set you should recite:\n\n- **Media** — playback and recording of audio/video formats.\n- **Surface Manager (SurfaceFlinger)** — arbitrates access to the display subsystem; compositing surfaces from windows.\n- **SGL and OpenGL** — 2D and 3D graphics APIs, cross-language / cross-platform.\n- **SQLite** — on-device relational database.\n- **FreeType** — font rasterization.\n- **WebKit** — engine used historically for WebView page load and rendering (modern Android WebView is Chromium-based, but the PDF still names WebKit).\n- **SSL** — encrypted links between client and server (TLS in practice).\n\nThese are **not** Jetpack. They are the C/Java substrate. NDK code can call some of them directly; most app code goes through framework wrappers (MediaPlayer, SQLiteDatabase/Room, WebView, SSLSocket/OkHttp).",
    "pdfTopic": true,
    "tags": [
      "libraries",
      "OpenGL",
      "SQLite",
      "WebKit",
      "pdf"
    ],
    "image": "assets/platform-libraries.png"
  },
  {
    "id": "and-007",
    "category": "android",
    "level": "basic",
    "topic": "Linux Kernel",
    "question": "Why is the Linux kernel the heart of Android architecture?",
    "answer": "The **Linux Kernel** is the bottom layer: hardware abstraction plus OS services. Android’s kernel is Linux with Android-specific patches (binder, ashmem/ION historically, wakelocks/wakeup, lowmemorykiller/LMK or modern equivalents).\n\nThe PDF’s kernel feature list is the interview checklist:\n\n- **Security** — UID sandbox, permissions enforced with kernel + SELinux.\n- **Memory management** — virtual memory, sharing pages via Zygote, LMK under pressure.\n- **Process management** — scheduling, process groups, cgroup importance (foreground vs cached).\n- **Network stack** — sockets, routing, firewall (netd / iptables / bpf).\n- **Driver model** — display, camera, Bluetooth, audio, binder. OEMs ship drivers in their kernel build.\n\nApps never open `/dev` camera nodes themselves; CameraX/framework talks down through HAL to these drivers. Mentioning **Binder** as the IPC driver is a plus even though the PDF lists it only indirectly via process/security.",
    "pdfTopic": true,
    "tags": [
      "kernel",
      "drivers",
      "security",
      "pdf"
    ]
  },
  {
    "id": "and-008",
    "category": "android",
    "level": "basic",
    "topic": "Android framework",
    "question": "What do interviewers mean by 'Android framework'?",
    "answer": "**Android framework** is the SDK-facing layer of managers, components, and UI toolkit that sit on top of the runtime. You use it every time you subclass `Activity`, inflate a `View`, query `PackageManager`, or send a `Notification`.\n\nContrast three terms so you do not mix them:\n\n- **Linux kernel** — processes, drivers, Binder.\n- **Android Runtime (ART)** — executes dex, GC, JIT/AOT.\n- **Android framework** — ActivityManager, View system, resources, content providers, notifications.\n\nThe **SDK** is the developer distribution of this framework (android.jar, build tools). The **NDK** bypasses most of it for native code. In interviews, “framework” questions often lead into component model: Activity, Service, BroadcastReceiver, ContentProvider — the four building blocks registered in the manifest and scheduled by the framework.",
    "pdfTopic": true,
    "tags": [
      "framework",
      "SDK",
      "pdf"
    ]
  },
  {
    "id": "and-009",
    "category": "android",
    "level": "intermediate",
    "topic": "NDK vs SDK",
    "question": "What is the difference between the Android NDK and the Android SDK?",
    "answer": "The PDF one-liner is accurate: **NDK** lets you write **native C/C++** for an Android app using **JNI**. **SDK** is the heart of app development — the Java/Kotlin APIs and tools used to **write and build** an Android app.\n\nExpand it:\n\n- **SDK** — `compileSdk`, AndroidX, Gradle plugin, `aapt2`, `d8`/`r8`, emulator, platform APIs. Almost every app is SDK-only.\n- **NDK** — `CMake`/`ndk-build`, `.so` libraries, JNI bridges (`external fun` in Kotlin / `native` in Java). Use it for codecs, game engines, crypto, existing C++ codebases.\n- JNI has a cost: marshalling, thread attach (`AttachCurrentThread`), and crash risk (no GC safety net for use-after-free).\n\nYou still **package** NDK code inside an SDK-built APK/AAB. NDK does not replace Activities or the manifest.",
    "pdfTopic": true,
    "tags": [
      "NDK",
      "SDK",
      "JNI",
      "pdf"
    ]
  },
  {
    "id": "and-010",
    "category": "android",
    "level": "basic",
    "topic": "File vs class vs activity",
    "question": "How do you distinguish a file, a class, and an Activity in Android?",
    "answer": "They live at different levels of the language and the framework:\n\n- A **file** is a compilation unit on disk (`MainActivity.kt`, `activity_main.xml`). Kotlin allows multiple classes per file; Java typically maps one public class to one file name.\n- A **class** is a JVM type. It may be an Activity, a helper, a data class, or an object. Most classes are **not** Android components.\n- An **Activity** is a **framework component**: a subclass of `android.app.Activity` (or `ComponentActivity` / `AppCompatActivity`) that is **declared in the manifest**, given a window, and driven by the activity lifecycle. The system can instantiate it via a no-arg constructor.\n\nInterview trap: `class Foo` inside `MainActivity.kt` is not an Activity. `class SettingsActivity : AppCompatActivity()` is a class **and** a component only after the `<activity>` tag exists. Launching requires an Intent that resolves to that component, not “calling the file.”",
    "pdfTopic": true,
    "tags": [
      "activity",
      "class",
      "source",
      "pdf"
    ]
  },
  {
    "id": "and-011",
    "category": "android",
    "level": "basic",
    "topic": "DDMS AAPT ADB",
    "question": "What are DDMS, AAPT, and ADB used for?",
    "answer": "These are classic Android toolchain names; interviewers still ask them even though DDMS is folded into Android Studio profilers.\n\n- **AAPT (Android Asset Packaging Tool)** — build tool that views, creates, and updates ZIP-compatible archives (**zip, jar, apk**). It **parses, indexes, and compiles resources** into a binary format optimized for Android. Modern builds use **AAPT2**, same job with incremental compile.\n- **ADB (Android Debug Bridge)** — command-line bridge to a device or emulator. Install/run apps, `adb shell`, logcat, port reverse, push/pull files. The PDF calls it a way to **execute remote shell commands** on an emulator instance.\n- **DDMS (Dalvik Debug Monitor Server)** — debugging monitor. PDF feature list: **port forwarding**, **thread and heap info**, **logcat**, **screen capture**, **network traffic tracking**, **incoming call and SMS spoofing**, **location spoofing**.\n\nToday you get the DDMS capabilities via **Logcat, Profiler, Layout Inspector, emulator extended controls**. Naming the original tool still scores.",
    "pdfTopic": true,
    "tags": [
      "ADB",
      "AAPT",
      "DDMS",
      "tools",
      "pdf"
    ]
  },
  {
    "id": "and-012",
    "category": "android",
    "level": "basic",
    "topic": "Activity lifecycle",
    "question": "Explain the Activity lifecycle callbacks in order.",
    "answer": "An Activity is a windowed screen whose lifecycle is owned by the system. The PDF callback set is:\n\n- **onCreate** — first creation. Inflate UI, restore `savedInstanceState`, obtain ViewModel. Heavy one-time setup.\n- **onStart** — Activity is visible, not necessarily interactive (may be behind a dialog/theme).\n- **onResume** — **foreground, interactive**. Start cameras, exclusive resources.\n- **onPause** — losing foreground. Persist ephemeral UI, stop animations. Must be fast; the next Activity cannot resume until you return.\n- **onStop** — no longer visible. Release sensors, stop heavy work that is UI-only.\n- **onRestart** — coming back from **onStop** without destroy (user returns to the task). Then **onStart** again.\n- **onDestroy** — finishing or process death after stop. Release anything not tied to a ViewModel.\n\nRotation: **destroy + create** a new Activity instance; a **ViewModel** scoped to the owner survives. `finish()` walks pause/stop/destroy and the ViewModel is cleared. Process death: callbacks may be skipped; you must restore from **savedInstanceState** and persistent storage.",
    "pdfTopic": true,
    "tags": [
      "activity",
      "lifecycle",
      "pdf"
    ],
    "image": "assets/activity-lifecycle.png"
  },
  {
    "id": "and-013",
    "category": "android",
    "level": "basic",
    "topic": "Fragment lifecycle",
    "question": "Walk through Fragment lifecycle from onAttach to onDetach.",
    "answer": "A Fragment is a reusable UI host **inside an Activity** (or another Fragment). The PDF order:\n\n- **onAttach** — bound to a context/Activity. Safe to use `requireContext()`.\n- **onCreate** — fragment instance created; restore state; init ViewModel. **No view yet.**\n- **onCreateView** — inflate or compose the hierarchy; return the root View (or null).\n- **onViewCreated** — view exists; bind adapters, collect flows, set click listeners.\n- **onStart / onResume / onPause / onStop** — aligned with the host’s visibility, with extra cases for `FragmentTransaction` hide/show and the back stack.\n- **onDestroyView** — view torn down (back stack, `replace`). Clear view bindings here or you leak the old hierarchy.\n- **onDestroy** — fragment instance going away.\n- **onDetach** — no longer attached to the host.\n\nInterview detail: putting a Fragment on the **back stack** calls **onDestroyView** but **not** onDestroy. Returning pops the stack and recreates the view (`onCreateView` again) on the **same** fragment instance.",
    "pdfTopic": true,
    "tags": [
      "fragment",
      "lifecycle",
      "pdf"
    ],
    "image": "assets/fragment-lifecycle.png"
  },
  {
    "id": "and-014",
    "category": "android",
    "level": "intermediate",
    "topic": "ViewModel lifecycle",
    "question": "How does ViewModel lifecycle differ from Activity or Fragment lifecycle?",
    "answer": "A **ViewModel** is scoped to a `ViewModelStoreOwner` (Activity, Fragment, or Navigation back-stack entry). The store is retained across **configuration changes**.\n\n- Survives **rotation** and other config changes: the new Activity/Fragment is a new UI object, same ViewModel instance.\n- **onCleared()** runs when the owner **finishes for good** — user backs out, `finish()`, fragment removed without back stack — or the process is reclaiming that store. Tear down coroutines (`viewModelScope` cancels automatically), close subscriptions.\n\nDo **not** hold an Activity/View Context in a ViewModel; that is a leak across rotation. Use `AndroidViewModel` only for **application** context. LiveData/StateFlow in the ViewModel outlive the view; the UI re-subscribes in `onStart`/`repeatOnLifecycle`.\n\nViewModel does **not** survive process death. Persist with `SavedStateHandle`, DataStore, or Room if the user should see the same screen after a kill.",
    "pdfTopic": true,
    "tags": [
      "ViewModel",
      "lifecycle",
      "configuration change",
      "pdf"
    ],
    "image": "assets/viewmodel-lifecycle.png"
  },
  {
    "id": "and-015",
    "category": "android",
    "level": "intermediate",
    "topic": "View lifecycle",
    "question": "Explain the View drawing pipeline: measure, layout, draw, and invalidate vs requestLayout.",
    "answer": "Every `View` is laid out in a three-phase pass driven by the framework:\n\n- **measure / onMeasure** — parent offers **MeasureSpecs** (EXACTLY, AT_MOST, UNSPECIFIED). The view reports a measured width/height, including children for ViewGroups.\n- **layout / onLayout** — parent assigns actual **left/top/right/bottom**. ViewGroups position children here.\n- **draw / onDraw** — records drawing commands (background, content, children, decorations, overlays). Hardware accelerated via a display list.\n\nInvalidation:\n\n- **invalidate()** — marks the view dirty for **redraw**. Does **not** remeasure. Use when color/text/animation frames change but size is unchanged.\n- **requestLayout()** — marks the tree for a **full measure + layout + draw**. Use when size/position might change (new text wrapping, added child).\n\nAvoid `requestLayout()` in `onDraw`. Over-measure is a common jank source; ConstraintLayout in XML and Compose’s measurables are both about reducing extra passes.",
    "pdfTopic": true,
    "tags": [
      "view",
      "measure",
      "layout",
      "draw",
      "pdf"
    ],
    "image": "assets/view-lifecycle.png"
  },
  {
    "id": "and-016",
    "category": "android",
    "level": "intermediate",
    "topic": "App Lifecycle Observer",
    "question": "How do you observe the application (process) lifecycle in Android?",
    "answer": "Activity lifecycle is per-screen. **App/process** lifecycle answers “is *any* activity started/resumed?” Use Jetpack **Lifecycle**:\n\n- **`ProcessLifecycleOwner.get()`** — a process-wide `LifecycleOwner`. `ON_START`/`ON_RESUME` when the app goes to foreground, `ON_PAUSE`/`ON_STOP` after a delay when the last activity leaves (the delay avoids flickering on Activity transitions).\n- Implement **`DefaultLifecycleObserver`** (or `LifecycleEventObserver`) and `processLifecycle.lifecycle.addObserver(this)` from `Application.onCreate`.\n\n```kotlin\nclass AppWatcher : DefaultLifecycleObserver {\n    override fun onStart(owner: LifecycleOwner) { /* app foreground */ }\n    override fun onStop(owner: LifecycleOwner) { /* app background */ }\n}\n```\n\nUse this for analytics session start, pausing players, reconnecting sockets — **not** for saving unsaved form fields (that belongs on the Activity). Do not confuse with `ActivityLifecycleCallbacks`, which fires for every Activity instance.",
    "pdfTopic": true,
    "tags": [
      "ProcessLifecycleOwner",
      "DefaultLifecycleObserver",
      "pdf"
    ]
  },
  {
    "id": "and-017",
    "category": "android",
    "level": "intermediate",
    "topic": "Fragment without Activity",
    "question": "Can you launch a Fragment without an Activity?",
    "answer": "**No.** That is the PDF answer, and it is still the right interview answer for classic Android.\n\nA Fragment is **not** a Context, has **no window**, and cannot be started by `startActivity`. The `FragmentManager` that adds it lives on a `FragmentActivity` / `ComponentActivity`. Even a headless fragment used as a retained worker is still **attached** to an Activity (or, in rare tests, to a `FragmentController` harness that simulates one).\n\nNuance you can add after the “No”:\n\n- **Compose** screens are not Fragments; they still need an Activity (`ComponentActivity.setContent`).\n- **DialogFragment** still needs a host.\n- Instrumented tests use `FragmentScenario` which **creates a host Activity** for you.\n\nIf someone asks “why?”, say: the window, lifecycle dispatcher, and back stack are Activity (or Navigation-host Activity) responsibilities.",
    "pdfTopic": true,
    "tags": [
      "fragment",
      "activity",
      "pdf"
    ]
  },
  {
    "id": "and-018",
    "category": "android",
    "level": "basic",
    "topic": "Intents",
    "question": "What is an Intent, and what are the types of Intents?",
    "answer": "An **Intent** is a messaging object the framework uses to request an action from a component — start an Activity, start/stop a Service, deliver a broadcast.\n\n- **Explicit** — you name the component (`Intent(this, DetailActivity::class.java)`). Used inside your app.\n- **Implicit** — you declare an **action**, **data URI**, and **category**; PackageManager resolves matching **intent filters**. Example: `ACTION_VIEW` + `https://…`.\n- **PendingIntent** — a token another process (Notification Manager, AlarmManager) can fire **on your behalf** with your app’s identity.\n\nAlso mention **Intent extras** (Bundle), **flags** (`FLAG_ACTIVITY_NEW_TASK`, `CLEAR_TOP`), and that implicit intents to a custom action should be **explicit on Android 8+ broadcasts** and **package-restricted** for mutability/security. `intent.resolveActivity(packageManager)` before starting avoids ActivityNotFound crashes.",
    "pdfTopic": false,
    "tags": [
      "intent",
      "explicit",
      "implicit"
    ]
  },
  {
    "id": "and-019",
    "category": "android",
    "level": "basic",
    "topic": "Intent Filter",
    "question": "What is an Intent Filter and how does matching work?",
    "answer": "An **Intent Filter** is an XML (or `registerReceiver`) declaration that advertises what **implicit** Intents a component can handle. It lives on `<activity>`, `<receiver>`, or `<service>` in the manifest.\n\nMatching uses three tests; **all that are specified must pass**:\n\n- **Action** — Intent action must match one listed `<action>`.\n- **Category** — every category on the Intent must be in the filter. Activities launched from launcher need `CATEGORY_LAUNCHER` plus `ACTION_MAIN`. `startActivity` also adds `CATEGORY_DEFAULT`; forgetting `DEFAULT` is a classic “implicit intent never resolves” bug.\n- **Data** — scheme, host, port, path, MIME type. `content://` vs `https://` vs `geo:`.\n\nExported components with filters are an **attack surface**. On modern Android, activities with filters default to `android:exported=\"true\"` if a filter exists — you must set exported explicitly. Prefer **App Links** (verified https) over catch-all schemes.",
    "pdfTopic": true,
    "tags": [
      "intent-filter",
      "manifest",
      "pdf"
    ]
  },
  {
    "id": "and-020",
    "category": "android",
    "level": "basic",
    "topic": "Broadcast Receiver",
    "question": "What is a BroadcastReceiver and how should you register one today?",
    "answer": "A **BroadcastReceiver** is a component that runs a short callback (`onReceive`) when an Intent is broadcast. It is one of the four manifest building blocks.\n\nTwo registration styles:\n\n- **Manifest-registered** — can wake a stopped app, but **implicit broadcasts are heavily limited since Oreo**. Use for a small allow-list (`BOOT_COMPLETED` with restrictions, `MY_PACKAGE_REPLACED`, carrier events).\n- **Context-registered** — `registerReceiver` in `onStart`, unregister in `onStop`. Required for most implicit system events (connectivity — actually even that moved to callbacks). On API 33+ you must pass `RECEIVER_EXPORTED` or `RECEIVER_NOT_EXPORTED`.\n\n`onReceive` runs on the **main thread** and is **not a long-lived process**. Work must finish quickly or be handed to **WorkManager / foreground service / goAsync()** (still time-capped). Ordered vs normal broadcasts, and **LocalBroadcastManager** (deprecated — use LiveData, Flow, or EventBus alternatives in-process) are common follow-ups.",
    "pdfTopic": true,
    "tags": [
      "BroadcastReceiver",
      "implicit broadcast",
      "pdf"
    ]
  },
  {
    "id": "and-021",
    "category": "android",
    "level": "intermediate",
    "topic": "Content Provider",
    "question": "What is a ContentProvider and when would you implement one?",
    "answer": "A **ContentProvider** is a primary Android building block that **manages access to a central data repository**. The PDF wording: it is a **standard interface that connects data in one process with code in another**, so it can **share data between applications**. It **encapsulates data** and defines **security**. You subclass `ContentProvider` and implement the CRUD APIs (`query`, `insert`, `update`, `delete`, `getType`).\n\nCallers use a **content URI** (`content://authority/table/id`) through `ContentResolver`. Permissions (`readPermission`/`writePermission`, URI grants via `FLAG_GRANT_READ_URI_PERMISSION`) are the security model. **FileProvider** is the common specialized provider for sharing files with other apps.\n\nUse a provider when: another app must read your data (contacts-style), you need **sync adapters**, or you want **granular URI permission grants**. Inside one app, Room + repository is simpler; you do not need a provider just to use SQLite.",
    "pdfTopic": true,
    "tags": [
      "ContentProvider",
      "IPC",
      "CRUD",
      "pdf"
    ]
  },
  {
    "id": "and-022",
    "category": "android",
    "level": "basic",
    "topic": "Metadata",
    "question": "What is manifest meta-data in Android?",
    "answer": "**Metadata** in Android usually means `<meta-data>` tags in **AndroidManifest.xml**, attached to `<application>` or a component. They are **static key/value (or resource) pairs** the system and libraries read without your custom code running first.\n\nTypical uses:\n\n- Google Maps / Firebase / AdMob **API keys** (better: Gradle manifest placeholders, still not a secrets vault).\n- FileProvider `android.support.FILE_PROVIDER_PATHS` resource pointer.\n- WorkManager / App Startup initializers historically.\n- Feature flags baked at build time.\n\nRead them via `PackageManager.getApplicationInfo(..., GET_META_DATA).metaData.getString(\"key\")`. They are **not** a replacement for Remote Config or DataStore. Do not put private secrets here — they are trivial to extract from the APK.",
    "pdfTopic": true,
    "tags": [
      "meta-data",
      "manifest",
      "pdf"
    ]
  },
  {
    "id": "and-023",
    "category": "android",
    "level": "basic",
    "topic": "AndroidManifest",
    "question": "What is the AndroidManifest.xml and what must it declare?",
    "answer": "The **manifest** is the app’s contract with the OS. The package manager parses it at install time.\n\nMust-know entries:\n\n- **Package / application** identity, icon, label, backup, `usesCleartextTraffic`, `networkSecurityConfig`.\n- **Components** — every Activity, Service, Receiver, Provider you want the system to start (plus `exported`, intent filters, process, permission).\n- **Permissions** — `uses-permission` and runtime permission groups.\n- **SDK** — `minSdk`, `targetSdk` (Gradle merges these).\n- **Queries** (Android 11 package visibility), **features** (`required=\"false\"` for camera).\n\nMerge conflicts from libraries are a common bug (`tools:node`, `tools:replace`). Interviewers may ask how the **launcher Activity** is declared: `MAIN` + `LAUNCHER`.",
    "pdfTopic": false,
    "tags": [
      "manifest",
      "components",
      "permissions"
    ]
  },
  {
    "id": "and-024",
    "category": "android",
    "level": "basic",
    "topic": "Application class",
    "question": "What is the Application class and when should you use it?",
    "answer": "`android.app.Application` is a **process-wide singleton** created before any Activity/Service. You subclass it, register with `android:name` in the manifest, and get `onCreate`, `onTrimMemory`, `onConfigurationChanged`.\n\nGood uses: start **Hilt**, **App Startup**, logging, process lifecycle observer, StrictMode in debug. Bad uses: dumping the entire object graph, holding Activity references, doing heavy disk/network on `onCreate` (it delays **every** entry point, including receivers).\n\nThere can be **multiple processes** (`android:process`) — each has its **own** Application instance. Never assume a static in Application is global across `:push` and default process. Prefer DI (`@HiltAndroidApp`) over home-grown statics.",
    "pdfTopic": false,
    "tags": [
      "Application",
      "singleton",
      "onCreate"
    ]
  },
  {
    "id": "and-025",
    "category": "android",
    "level": "basic",
    "topic": "Context",
    "question": "What are the different types of Context in Android?",
    "answer": "**Context** is the handle to app environment: resources, package name, startActivity, system services.\n\nMain flavors:\n\n- **Application Context** — process-scoped, lives for the process. Safe for singletons, Room, Retrofit. **Cannot** show a dialog that needs a window token; theme may not be the Activity theme.\n- **Activity Context** — tied to the Activity instance. Needed for UI (inflate with activity theme, startActivity with transitions, Dialogs). **Leaks** if stored in a static, ViewModel, or long-lived listener past `onDestroy`.\n- **ContextThemeWrapper / Service / BroadcastReceiver context** — receiver context is **short-lived**; `goAsync` or start a job instead of parking it.\n\n`context.applicationContext` is not always the Application subclass (can be a wrapper). Use `ContextCompat` and never hide an Activity as “just a Context” in a helper that outlives the screen.",
    "pdfTopic": false,
    "tags": [
      "Context",
      "Application",
      "Activity"
    ]
  },
  {
    "id": "and-026",
    "category": "android",
    "level": "intermediate",
    "topic": "Facade pattern",
    "question": "What is the Facade pattern, and how does Retrofit illustrate it on Android?",
    "answer": "**Facade** is a **structural** pattern: a **higher-level interface that makes a set of other interfaces easier to use**. Clients talk to one simplified API instead of many subsystems (OkHttp, JSON converters, interceptors, URL building).\n\nThe PDF uses **Square’s Retrofit** as the Android example. You declare an interface; Retrofit generates the facade that turns that interface into HTTP:\n\n```kotlin\ninterface BooksApi {\n    @GET(\"books\")\n    fun listBooks(): Call<List<Book>>\n}\n```\n\nBehind `listBooks()` sit converters, OkHttp call factory, adapters (Call / suspend / Rx). Your repository depends on `BooksApi`, not on those moving parts. That is Facade, not Adapter (Adapter converts incompatible interfaces) and not Proxy (Proxy controls access to the same interface).\n\nInterview add-on: a well-shaped **Repository** is often a second facade over Retrofit + Room.",
    "pdfTopic": true,
    "tags": [
      "facade",
      "Retrofit",
      "design pattern",
      "pdf"
    ]
  },
  {
    "id": "and-027",
    "category": "android",
    "level": "intermediate",
    "topic": "Adapter pattern",
    "question": "What is the Adapter pattern, and where do you see it in Android UI?",
    "answer": "**Adapter** (GoF) **bridges two incompatible interfaces**. One class translates calls so a client can work with a class that does not share its API. The PDF’s real-world picture is a **card reader** between a memory card and a laptop.\n\nOn Android the name is overloaded:\n\n- **GoF Adapter** — wrap a third-party SDK with your domain interface; `CursorAdapter`-style mapping.\n- **`ArrayAdapter` / `RecyclerView.Adapter`** — not a perfect GoF clone, but they **adapt a data set into Views** the widget can display. `onCreateViewHolder` / `onBindViewHolder` convert `List<T>` into a recycling view hierarchy.\n\nSay both in an interview: the list widget cannot talk to your models directly; the adapter is the bridge. Pair with **DiffUtil** for incremental updates. Keep it brief if a Java round already covered the GoF class diagram.",
    "pdfTopic": true,
    "tags": [
      "adapter",
      "RecyclerView",
      "ArrayAdapter",
      "pdf"
    ]
  },
  {
    "id": "and-028",
    "category": "android",
    "level": "intermediate",
    "topic": "Observer vs Observable",
    "question": "What is the difference between Observer and Observable?",
    "answer": "In the classic Observer pattern:\n\n- **Observable** (subject) — holds state and a list of dependents; **notifies** them when it changes.\n- **Observer** — registers, then **reacts** (`update` / lambda).\n\nJava’s `java.util.Observable` / `Observer` are **deprecated**. On Android you use:\n\n- **LiveData** — observable data holder; observers are **lifecycle-aware**.\n- **Flow / StateFlow** — cold/hot streams; collectors are observers.\n- **RxJava** `Observable` / `Observer` — push streams with operators.\n- Compose **Snapshot** state — the compiler/runtime observes reads during composition.\n\nKey points: one-to-many, loose coupling, risk of **leaks** if you forget to unregister (hence LiveData’s auto-remove, `repeatOnLifecycle`, `DisposableEffect`). Observable is **not** the same as a database “observer” (`ContentObserver`, `InvalidationTracker`) but the idea matches.",
    "pdfTopic": true,
    "tags": [
      "observer",
      "observable",
      "LiveData",
      "pdf"
    ]
  },
  {
    "id": "and-029",
    "category": "android",
    "level": "intermediate",
    "topic": "MVC MVP MVVM MVI",
    "question": "Compare MVC, MVP, MVVM, and MVI on Android.",
    "answer": "The PDF lists four acronyms and **mis-labels MVI as “Model View Interface.”** The industry name is **Model–View–Intent**. Mention the slip, then define them correctly.\n\n- **MVC (Model–View–Controller)** — Controller handles input and updates Model; View renders Model. In early Android, Activities became “god controllers.” Hard to test.\n- **MVP (Model–View–Presenter)** — Presenter is a POJO talking to a **View interface**. Activity implements the view; unit-test presenters with fakes. Verbose contracts.\n- **MVVM (Model–View–ViewModel)** — ViewModel exposes observable state (LiveData/StateFlow). View (Activity/Compose) **observes**; no View interface. Jetpack’s default.\n- **MVI (Model–View–Intent)** — unidirectional: user **Intents** (events) in, **reducer** produces a new **immutable state**, View renders that one state. Easy to reason about, more boilerplate (sealed events). Not “Interface.”\n\nModern Android: **MVVM + unidirectional data flow** (or full MVI) on top of a data layer. Choose by team size, not fashion.",
    "pdfTopic": true,
    "tags": [
      "MVVM",
      "MVI",
      "MVP",
      "architecture",
      "pdf"
    ]
  },
  {
    "id": "and-030",
    "category": "android",
    "level": "intermediate",
    "topic": "Dependency Injection",
    "question": "What is dependency injection in Android, and how does constructor injection work?",
    "answer": "The PDF analogy: DI is **moving into a furnished apartment** — you do not assemble the furniture. In code, **required objects are provided** when you create an object; the object does **not** construct them itself.\n\nWithout DI, `Car` builds `Engine()` internally (hard to fake, hidden graph). With **constructor injection**:\n\n```kotlin\nclass Car(private val engine: Engine) {\n    fun start() { engine.start() }\n}\n\nfun main() {\n    val engine = Engine()\n    val car = Car(engine)\n    car.start()\n}\n```\n\nOn Android you inject **network clients, image loaders, SharedPreferences** into Activities/Fragments instead of reaching into singletons. Constructor injection is preferred over field injection: dependencies are **visible, final, and testable**. Framework types without your constructor (Activities) need an **injector** (Hilt `@AndroidEntryPoint`) that fills them after `super.onCreate`.",
    "pdfTopic": true,
    "tags": [
      "DI",
      "constructor injection",
      "Hilt",
      "pdf"
    ],
    "code": "class Car(private val engine: Engine) {\n    fun start() { engine.start() }\n}\n\nfun main() {\n    val engine = Engine()\n    val car = Car(engine)\n    car.start()\n}\n"
  },
  {
    "id": "and-031",
    "category": "android",
    "level": "advanced",
    "topic": "Dagger 2 and Hilt",
    "question": "How do Dagger 2 and Hilt work on Android?",
    "answer": "**Dagger 2** is a **compile-time** DI framework: annotation processors generate factories. You write `@Module` / `@Provides` or `@Binds`, `@Component` graphs, `@Inject` constructors. No reflection at runtime (unlike Guice). Pain on Android: **you** must build Activity/Fragment components, retain them across rotation, and define scopes.\n\n**Hilt** is the official Android layer on Dagger:\n\n- `@HiltAndroidApp` on Application generates the root **SingletonComponent**.\n- `@AndroidEntryPoint` on Activity/Fragment/View/Service/Receiver.\n- `@HiltViewModel` + `@Inject constructor` for ViewModels (`ViewModelComponent`).\n- Standard components: Singleton, ActivityRetained, Activity, ViewModel, Fragment, View, Service.\n- `@InstallIn(SingletonModule::class)` modules; `@Binds` for interfaces; `@Provides` for third-party types.\n- Qualifiers (`@Named`, custom) distinguish two OkHttp clients.\n\nHilt still **is** Dagger — errors are Dagger graph errors. “Hilt internals” answer: Gradle aggregator modules, `HiltViewModelFactory`, and **component hierarchies** matching Android lifecycles so a ViewModel cannot depend on an Activity-scoped type.",
    "pdfTopic": true,
    "tags": [
      "Dagger",
      "Hilt",
      "components",
      "pdf"
    ]
  },
  {
    "id": "and-032",
    "category": "android",
    "level": "basic",
    "topic": "View Binding vs Data Binding",
    "question": "What is the difference between View Binding and Data Binding?",
    "answer": "The PDF split is the one to memorize:\n\n- **View Binding** — **only binding views to code** (type-safe `ActivityMainBinding.inflate`).\n- **Data Binding** — **binding data from code to views** **plus** view binding.\n\nDifferences they list:\n\n1. With view binding, layouts do **not** need a `<layout>` tag.\n2. You **cannot** use view binding to bind data in XML: **no binding expressions, no Binding Adapters, no two-way binding**.\n3. View Binding’s main advantages are **speed and efficiency** — **shorter build time** because it avoids Data Binding’s **annotation processor** overhead.\n\nView Binding also generates `null`-safe bindings for `<merge>` and is **on by default** in new templates. Data Binding still makes sense for large XML codebases with adapters; new UI is usually **Compose** or View Binding + code.",
    "pdfTopic": true,
    "tags": [
      "ViewBinding",
      "DataBinding",
      "build speed",
      "pdf"
    ],
    "image": "assets/view-binding.png"
  },
  {
    "id": "and-033",
    "category": "android",
    "level": "intermediate",
    "topic": "Data Binding",
    "question": "How does Jetpack Data Binding work in XML layouts?",
    "answer": "**Data Binding** is the Jetpack library that wraps your layout in a `<layout>` root, generates a `Binding` class, and lets XML **observe** data.\n\n- Variables in `<data>` (`<variable name=\"vm\" type=\"...\"/>`).\n- Expressions `@{}` (one-way) and `@={}` (**two-way** for `EditText` etc.).\n- **Binding adapters** (`@BindingAdapter(\"imageUrl\")`) extend attributes.\n- Can bind **LiveData** if you set `lifecycleOwner` on the binding so expressions are lifecycle-aware.\n\nIt is **not** used by Compose. Cost: kapt/KSP, harder diffs in XML, cryptic build errors. Interviewers contrast it with View Binding (no expressions) and Compose (state in Kotlin). Enable `buildFeatures { dataBinding true }` and call `DataBindingUtil.setContentView` or generated `inflate`.",
    "pdfTopic": true,
    "tags": [
      "DataBinding",
      "binding adapters",
      "Jetpack",
      "pdf"
    ]
  },
  {
    "id": "and-034",
    "category": "android",
    "level": "intermediate",
    "topic": "Jetpack",
    "question": "What are Android Jetpack components, and which ones should you be ready to discuss?",
    "answer": "**Jetpack** is a suite of libraries (mostly AndroidX) that fill gaps in the platform: backward-compatible, testable, recommended architecture.\n\nThe PDF list — each is a common interview topic:\n\n- **Room** — SQLite object mapping.\n- **WorkManager** — deferrable, guaranteed background work.\n- **Lifecycle** — `LifecycleOwner` / observers.\n- **ViewModel** — UI-related state that survives rotation.\n- **LiveData** — lifecycle-aware observables.\n- **Navigation** — in-app destinations, back stack, Safe Args.\n- **Paging** — incremental list loading.\n- **Data Binding** — XML bound to data.\n- Plus the PDF snippet of **Coroutines `Dispatchers.IO`** for I/O off the main thread.\n\nJetpack is **not** a single library. Say “AndroidX + architecture components + Compose” if they ask what you actually add in Gradle.",
    "pdfTopic": true,
    "tags": [
      "Jetpack",
      "Architecture Components",
      "pdf"
    ]
  },
  {
    "id": "and-035",
    "category": "android",
    "level": "intermediate",
    "topic": "Room",
    "question": "What is Room and how do Entity, DAO, and Database fit together?",
    "answer": "**Room** is Jetpack’s SQLite abstraction. You describe schema with annotations; it generates implementation code and **checks SQL at compile time**.\n\n- **`@Entity`** — table. Primary key, indices, `foreignKeys`.\n- **`@Dao`** — queries: `@Query`, `@Insert`, `@Update`, `@Delete`, `@Transaction`. Return `suspend`, `Flow`, or `LiveData`.\n- **`@Database`** — version, entity list, `Room.databaseBuilder`. **Migrations** (`Migration(1, 2)`) or `fallbackToDestructiveMigration()` (data loss).\n\nRoom sits on **SQLite**; you still think in SQL (joins, `EXPLAIN`). Use a **single-thread executor / coroutines** — never hit the DB on the main thread (`allowMainThreadQueries` is a test-only escape). InvalidationTracker makes `Flow` emit on table changes.",
    "pdfTopic": true,
    "tags": [
      "Room",
      "SQLite",
      "DAO",
      "pdf"
    ]
  },
  {
    "id": "and-036",
    "category": "android",
    "level": "intermediate",
    "topic": "SQLite vs Room",
    "question": "How does SQLite compare with Room on Android?",
    "answer": "**SQLite** is the platform C library and `android.database.sqlite.SQLiteDatabase` / `SQLiteOpenHelper` API. You write raw SQL, manage versions in `onUpgrade`, and map `Cursor` columns by hand.\n\n**Room** is a library **on top of SQLite**:\n\n- Compile-time SQL verification vs runtime `SQLiteException`.\n- Mapping to data classes vs Cursor boilerplate.\n- Coroutines/Flow vs you wrapping threads.\n- Migration objects vs ad-hoc `execSQL` in `onUpgrade`.\n- Test in-memory databases easily.\n\nWhen to skip Room: extremely dynamic SQL, existing huge `SQLiteOpenHelper` code, or tiny key-value (use **DataStore**). When they ask “is Room a different database?” — **No**, same file, same engine, better API.",
    "pdfTopic": true,
    "tags": [
      "SQLite",
      "Room",
      "database",
      "pdf"
    ]
  },
  {
    "id": "and-037",
    "category": "android",
    "level": "intermediate",
    "topic": "WorkManager",
    "question": "What is WorkManager and when should you use it?",
    "answer": "**WorkManager** is the Jetpack API for **deferrable, guaranteed** work that must run even if the app exits or the device restarts. It chooses **JobScheduler, AlarmManager + BroadcastReceiver, or a combination** depending on API level, and respects **Doze**.\n\nUse it for uploads, sync, cleanup — **not** for sub-second UI work and **not** as a replacement for a **foreground service** that must run now (media playback).\n\nPieces: `Worker` / `CoroutineWorker`, `OneTimeWorkRequest` / `PeriodicWorkRequest` (min ~15 min), **constraints** (network, charging, battery not low, idle), **backoff**, **chaining** (`then`), **unique work** (`ExistingWorkPolicy`). Observe with `WorkInfo` LiveData/Flow. Expedited/foreground workers exist for user-visible urgent tasks within quota.",
    "pdfTopic": true,
    "tags": [
      "WorkManager",
      "background",
      "Jetpack",
      "pdf"
    ]
  },
  {
    "id": "and-038",
    "category": "android",
    "level": "intermediate",
    "topic": "Lifecycle",
    "question": "What is the Jetpack Lifecycle component?",
    "answer": "**Lifecycle** is a Jetpack class that represents Android lifecycle **as a state machine** (`INITIALIZED`, `CREATED`, `STARTED`, `RESUMED`, `DESTROYED`) plus events (`ON_CREATE`, …). `Activity`/`Fragment` are **`LifecycleOwner`s**.\n\nYou write **`LifecycleObserver`** / `DefaultLifecycleObserver` instead of copying `onStart`/`onStop` into every screen. `LifecycleRegistry` is what custom owners (process, retained components) use.\n\nIt is the foundation for **LiveData**, **ProcessLifecycleOwner**, **repeatOnLifecycle**, **lifecycleScope**. Interview contrast: raw Activity callbacks vs observers that **automatically unsubscribe**, which cuts leaks. Always collect UI flows with `repeatOnLifecycle(STARTED)` rather than `launchWhenStarted` (deprecated-ish / easy to pile jobs).",
    "pdfTopic": true,
    "tags": [
      "Lifecycle",
      "LifecycleOwner",
      "observer",
      "pdf"
    ]
  },
  {
    "id": "and-039",
    "category": "android",
    "level": "intermediate",
    "topic": "ViewModel",
    "question": "What is a ViewModel in Jetpack, and why not store UI state in the Activity?",
    "answer": "**ViewModel** holds **UI-related data** that must survive configuration changes. The Activity/Fragment becomes a renderer: it observes state and sends events.\n\nWhy not Activity fields? Rotation **destroys** the Activity. Loaders were the old answer; ViewModel is the modern one, created via `ViewModelProvider` / `by viewModels()` and stored in a `ViewModelStore`.\n\nRules:\n\n- No references to Views or leaking Contexts.\n- Expose **immutable** UI state (`StateFlow` / LiveData).\n- Use **`viewModelScope`** for coroutines; cancelled in `onCleared`.\n- Combine with **SavedStateHandle** for process death of small state.\n\nViewModel is **not** a complete architecture. Business logic often lives in use cases/repositories; ViewModel orchestrates.",
    "pdfTopic": true,
    "tags": [
      "ViewModel",
      "state",
      "Jetpack",
      "pdf"
    ]
  },
  {
    "id": "and-040",
    "category": "android",
    "level": "intermediate",
    "topic": "LiveData",
    "question": "What is LiveData and what does lifecycle-aware mean?",
    "answer": "**LiveData** is a **data holder** that **notifies observers when the value changes**. The PDF emphasis: it is **lifecycle-aware**. Updates go only to observers whose owner is in an **active** state (`STARTED` or `RESUMED`). If an owner is stopped, it does not get callbacks; when it becomes active again, it receives the **latest** value. You do **not** manually sync lifecycle to avoid crashes or leaks from that observer.\n\n- `MutableLiveData` vs `LiveData` (encapsulate mutability in ViewModel).\n- `switchMap`, `map`, `MediatorLiveData`.\n- `observe(owner)` vs `observeForever` (you must remove the latter).\n\nLimitations vs Flow: LiveData is **sticky on the main thread**, no backpressure, awkward for streams of events (use **SingleLiveEvent hacks** or SharedFlow). Many teams keep LiveData at the UI boundary or replace it with `StateFlow` + `repeatOnLifecycle`.",
    "pdfTopic": true,
    "tags": [
      "LiveData",
      "lifecycle-aware",
      "observer",
      "pdf"
    ]
  },
  {
    "id": "and-041",
    "category": "android",
    "level": "intermediate",
    "topic": "Navigation",
    "question": "How does the Jetpack Navigation component work?",
    "answer": "**Navigation Component** graphs destinations (Fragments, Activities, Compose composables, dialogs) in XML or Kotlin DSL. A **`NavHost`** hosts the current destination; **`NavController`** navigates and owns the **back stack**.\n\n- **Safe Args** — generated type-safe `Directions` and args (`NavArgs`).\n- **Actions** with animations, popUpTo, singleTop.\n- **Deep links** — `navDeepLink` / `<deepLink uri=\"https://…\"/>` plus intent filters; `handleDeepLink`.\n- Up vs Back: `AppBarConfiguration` ties the toolbar to the graph.\n\nWhy it exists: manual `FragmentTransaction` back stacks get out of sync with the toolbar. Navigation is the single source of truth. Multi-module **nested graphs** and **feature modules** (`dynamic navigation`) are senior-level follow-ups.",
    "pdfTopic": true,
    "tags": [
      "Navigation",
      "NavController",
      "back stack",
      "pdf"
    ]
  },
  {
    "id": "and-042",
    "category": "android",
    "level": "intermediate",
    "topic": "Paging",
    "question": "What is Jetpack Paging and how does Paging 3 load lists?",
    "answer": "**Paging** loads **chunks** of a large list so you do not query thousands of rows or keep them all in memory.\n\n**Paging 3** core types:\n\n- **`PagingSource`** — how to fetch a page (`LoadParams` / `LoadResult`) from network or DB.\n- **`Pager`** + **`PagingConfig`** (page size, prefetch).\n- **`PagingData`** — the stream you collect as `Flow`.\n- **`PagingDataAdapter`** (RecyclerView) or Compose **`LazyPagingItems`**.\n- **RemoteMediator** — network + Room as source of truth.\n\nHandle **LoadState** (spinner, retry). Distinct from `DiffUtil` (DiffUtil compares two snapshots; Paging **produces** snapshots over time). Key set must be stable; placeholders optional.",
    "pdfTopic": true,
    "tags": [
      "Paging",
      "PagingData",
      "RecyclerView",
      "pdf"
    ]
  },
  {
    "id": "and-043",
    "category": "android",
    "level": "intermediate",
    "topic": "OkHttp Interceptors",
    "question": "What are OkHttp interceptors and how do you use them?",
    "answer": "An **interceptor** is an OkHttp hook that sees and can rewrite **requests and responses**. You implement `Interceptor` and add it to `OkHttpClient.Builder`.\n\nTwo families:\n\n- **Application interceptors** (`addInterceptor`) — run once, even for cache hits; good for **headers** (auth token), logging the app-level request, retry at business level.\n- **Network interceptors** (`addNetworkInterceptor`) — run for the actual network call, see **wire-level** redirects and tracing; cannot run if served from cache.\n\n```kotlin\nclass AuthInterceptor(private val token: () -> String) : Interceptor {\n    override fun intercept(chain: Interceptor.Chain): Response {\n        val req = chain.request().newBuilder()\n            .header(\"Authorization\", \"Bearer ${token()}\")\n            .build()\n        return chain.proceed(req)\n    }\n}\n```\n\nChain order matters. Do not log secrets. **Chucker** / HttpLoggingInterceptor belong in debug only. SSL pinning is often a **CertificatePinner**, not an interceptor, but a network interceptor can still inspect certs for diagnostics.",
    "pdfTopic": true,
    "tags": [
      "OkHttp",
      "interceptor",
      "networking",
      "pdf"
    ]
  },
  {
    "id": "and-044",
    "category": "android",
    "level": "intermediate",
    "topic": "A/B Testing",
    "question": "What is A/B testing in a mobile app, and what capabilities does it give you?",
    "answer": "The PDF dashboard story is the one to tell: you want a **new Material dashboard with animation**, but you will not risk all users. You show the **new UI to a subset**, the **old UI to the rest**, collect feedback, then **ship to everyone** or iterate without burning the whole base.\n\n**Key capabilities** from the PDF:\n\n- Test and **improve product experience**.\n- Re-engage users (they mention **Notifications composer** in the Firebase ecosystem).\n- **Safely roll out** new features.\n- Target **predicted** user groups.\n\nOn Android this is usually **Firebase A/B Testing** on top of **Remote Config** (and Analytics). Guard UI with a parameter, keep both code paths short-lived, and do not A/B security or legal text carelessly. Sample size and **sticky assignment** (same user keeps the same variant) matter as much as the SDK call.",
    "pdfTopic": true,
    "tags": [
      "A/B testing",
      "Remote Config",
      "experiments",
      "pdf"
    ]
  },
  {
    "id": "and-045",
    "category": "android",
    "level": "intermediate",
    "topic": "Firebase Remote Config",
    "question": "How does Firebase Remote Config work, and what is fetchAndActivate?",
    "answer": "**Remote Config** serves key/value parameters from Firebase so you can change behavior **without a Play release**. You set **in-app defaults**, fetch server values, then **activate** them for the next reads.\n\nThe PDF snippet is the standard setup: `Firebase.remoteConfig`, `remoteConfigSettings { minimumFetchIntervalInSeconds = 3600 }`, `setDefaultsAsync(R.xml.remote_config_defaults)`, then **`fetchAndActivate()`** with an `addOnCompleteListener`. `task.result` is a Boolean **whether params were updated**. Toasts: “Fetch and activate succeeded” vs “Fetch failed”.\n\n```kotlin\nremoteConfig.fetchAndActivate().addOnCompleteListener { task ->\n    if (task.isSuccessful) {\n        val updated = task.result\n        Log.d(TAG, \"Config params updated: $updated\")\n    }\n}\n```\n\n`minimumFetchInterval` is **12 hours in production** by default; 3600s is a debug-friendly value. **Activate** is separate from fetch so you can apply values on next cold start to avoid UI flicker. Combine with A/B experiments.",
    "pdfTopic": true,
    "tags": [
      "Remote Config",
      "Firebase",
      "fetchAndActivate",
      "pdf"
    ],
    "code": "remoteConfig = Firebase.remoteConfig\nval configSettings = remoteConfigSettings {\n    minimumFetchIntervalInSeconds = 3600\n}\nremoteConfig.setConfigSettingsAsync(configSettings)\nremoteConfig.setDefaultsAsync(R.xml.remote_config_defaults)\nremoteConfig.fetchAndActivate()\n    .addOnCompleteListener(this) { task ->\n        if (task.isSuccessful) {\n            val updated = task.result\n            Log.d(TAG, \"Config params updated: $updated\")\n            Toast.makeText(this, \"Fetch and activate succeeded\", Toast.LENGTH_SHORT).show()\n        } else {\n            Toast.makeText(this, \"Fetch failed\", Toast.LENGTH_SHORT).show()\n        }\n    }\n"
  },
  {
    "id": "and-047",
    "category": "android",
    "level": "intermediate",
    "topic": "CI/CD",
    "question": "What is CI/CD for an Android project?",
    "answer": "The PDF writes **CI (Continuous Integration) / CD (Continuous Development)**. Standard industry terms are **Continuous Delivery** or **Continuous Deployment**; “Development” is a slip — mention it, then use the real meaning.\n\n- **CI** — every commit builds on a server (GitHub Actions, GitLab, Bitrise, Jenkins): `./gradlew assembleDebug test lint`. Catch merge breaks early, run unit tests, maybe Firebase Test Lab.\n- **CD** — automatically ship **AAB** to **internal testing / Play** (Fastlane `supply`, Play Developer API), or to Firebase App Distribution. Continuous *Deployment* to production needs trust + staged rollouts.\n\nAndroid specifics: Gradle cache, **ABI splits**, signing secrets in the CI vault, **R8 mapping** upload for Crashlytics, emulator availability, and **detekt/ktlint**. CD is not just a script; it is also version codes, changelog, and a rollback story (Play staged rollout).",
    "pdfTopic": true,
    "tags": [
      "CI",
      "CD",
      "Gradle",
      "Play Console",
      "pdf"
    ]
  },
  {
    "id": "and-048",
    "category": "android",
    "level": "advanced",
    "topic": "ConstraintLayout in Compose",
    "question": "How does ConstraintLayout work in Jetpack Compose?",
    "answer": "XML **ConstraintLayout** solved nested-weight performance. In Compose, most screens use **Column/Row/Box** plus `Modifier.weight` / `align`. When you need **flat, constraint-based** positioning (guidelines, barriers, chains), use **`ConstraintLayout` from `constraintlayout-compose`**.\n\n```kotlin\nConstraintLayout(Modifier.fillMaxSize()) {\n    val (title, image, button) = createRefs()\n    Text(\"Hello\", Modifier.constrainAs(title) {\n        top.linkTo(parent.top)\n        start.linkTo(parent.start)\n    })\n}\n```\n\nYou create **refs**, `constrainAs`, `createGuidelineFromStart`, `createBarrier`, **chains**. Constraints are described in a DSL, not XML. Prefer simpler layouts when they suffice — ConstraintLayout is not the default the way it became in XML. Compose still **measures** children; over-constraining can hurt readability more than performance.",
    "pdfTopic": true,
    "tags": [
      "Compose",
      "ConstraintLayout",
      "constraintlayout-compose",
      "pdf"
    ]
  },
  {
    "id": "and-049",
    "category": "android",
    "level": "advanced",
    "topic": "Lazy Compose",
    "question": "What are LazyColumn and LazyRow, and how do they differ from Column?",
    "answer": "**Lazy** composables (`LazyColumn`, `LazyRow`, `LazyGrid`, `LazyStaggeredGrid`) are Compose’s RecyclerView: they **compose and layout only visible items** (plus a small prefetch window), then dispose off-screen items.\n\n- **`Column(Modifier.verticalScroll())`** composes **all** children — fine for short forms, fatal for thousands of items.\n- **`LazyColumn { items(list) { ... } }`** — `item`, `items`, `itemsIndexed`, `stickyHeader`. Keys via `key = { it.id }` so identity survives reordering.\n- Nested scroll, `contentPadding`, `rememberLazyListState`, `animateItem()`.\n\nInterview extras: avoid `nested` LazyColumn inside LazyColumn without a defined height; do not wrap LazyColumn in `verticalScroll`; prefer **stable keys**; large `item` lambdas that capture unstable objects cause extra recomposition. **Paging** uses `items(lazyPagingItems)`.",
    "pdfTopic": true,
    "tags": [
      "LazyColumn",
      "LazyRow",
      "Compose",
      "pdf"
    ]
  },
  {
    "id": "and-050",
    "category": "android",
    "level": "advanced",
    "topic": "Databinding in Compose",
    "question": "Does Jetpack Compose use XML Data Binding? How do you bind data instead?",
    "answer": "**Compose does not use XML Data Binding.** There is no `<layout>` tag, no `@{}` expressions, and no `BR` class. UI is a function of **state**. Data flows **down**; events flow **up** (**unidirectional data flow**).\n\n- Hold state in a **ViewModel** (`StateFlow` / `LiveData` collected as Compose `State`).\n- Pass immutable values into composables; pass lambdas for clicks (`onClick: () -> Unit`) — **state hoisting**.\n- `remember` / `mutableStateOf` for purely UI state; `rememberSaveable` for process-light persistence.\n\n**Interop:** if a screen is still XML Data Binding, host it with **`AndroidViewBinding`** or `AndroidView`. If Compose sits inside XML, `ComposeView.setContent`. Do not try to “bind” a Compose node with `@BindingAdapter`; wrap the composable as a custom view or migrate the screen.",
    "pdfTopic": true,
    "tags": [
      "Compose",
      "state",
      "unidirectional",
      "AndroidView",
      "pdf"
    ]
  },
  {
    "id": "and-051",
    "category": "android",
    "level": "advanced",
    "topic": "LaunchedEffect",
    "question": "What is LaunchedEffect in Jetpack Compose?",
    "answer": "The PDF: **LaunchedEffect** triggers **side effects that should run when a key changes**. It launches work in a **coroutine scope** so you can do **async** work without blocking UI: network, disk I/O, anything keyed off a dependency. The coroutine is **tied to the composition**; it is **cancelled** when the composable leaves or the key changes, then restarted.\n\n```kotlin\nLaunchedEffect(userId) {\n    val profile = repo.load(userId)\n    snackbarHost.showSnackbar(profile.name)\n}\n```\n\nIt is **not** independent of composition in the sense of “fire and forget forever” — cancellation is the point. Do not use it to start work that must outlive the screen (use ViewModel). Avoid `LaunchedEffect(Unit)` for business loads you already do in `viewModelScope`; it is great for **one-shot UI effects** (scroll to item, show snackbar once).",
    "pdfTopic": true,
    "tags": [
      "LaunchedEffect",
      "side effects",
      "Compose",
      "pdf"
    ]
  },
  {
    "id": "and-052",
    "category": "android",
    "level": "advanced",
    "topic": "DisposableEffect",
    "question": "What is DisposableEffect and how does it differ from LaunchedEffect?",
    "answer": "**DisposableEffect** is for **resources you acquire and must release** when the composable leaves composition or the **key** changes. The PDF: the effect runs when the composable is first composed; if the key changes it **disposes the previous resource** then runs again. Examples: **register/unregister listeners**, `LifecycleObserver`, callback flows, sensor listeners.\n\n```kotlin\nDisposableEffect(lifecycleOwner) {\n    val observer = LifecycleEventObserver { _, event -> /* ... */ }\n    lifecycleOwner.lifecycle.addObserver(observer)\n    onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }\n}\n```\n\nThe PDF also says the side effect “is executed every time the composable is recomposed.” Be precise in the interview: **it does not re-run on every recomposition** — only on **first enter and key change**. Recomposition without key change keeps the same effect. That is the opposite of a naïve `LaunchedEffect` misconception. Use `onDispose` always; leaking a listener is the bug this API exists to prevent.",
    "pdfTopic": true,
    "tags": [
      "DisposableEffect",
      "side effects",
      "Compose",
      "pdf"
    ]
  },
  {
    "id": "and-053",
    "category": "android",
    "level": "advanced",
    "topic": "Recomposition",
    "question": "What is recomposition in Jetpack Compose, and how does skipping work?",
    "answer": "**Recomposition** is Compose **calling your composable again** when **state it read** changes. It is not `invalidate()` of a whole Activity; the runtime invalidates only the **restart scopes** that read that snapshot state.\n\nTo stay fast, Compose **skips** a composable if parameters are **equal** and **stable**:\n\n- **Stable** types: primitives, `String`, `@Stable` / `@Immutable` data classes whose properties are stable, `ImmutableList`.\n- **Unstable**: `List`, `Set`, most interfaces, lambdas that capture unstable types — they can force **recompose every parent pass**.\n- **Strong skipping** (newer compiler): skips even with unstable params if they compared equal; lambdas compared by identity unless `remember`ed.\n\nTips: mark models `@Immutable`, use `kotlinx.collections.immutable`, `remember(lambda deps)`, extract lambdas, avoid reading frequent state high in the tree (pass down, or `derivedStateOf`). Layout Inspector / Compose compiler reports help prove skipping.",
    "pdfTopic": true,
    "tags": [
      "recomposition",
      "stability",
      "skipping",
      "pdf"
    ]
  },
  {
    "id": "and-054",
    "category": "android",
    "level": "advanced",
    "topic": "SSL Pinning",
    "question": "What is SSL pinning on Android and how do you implement it?",
    "answer": "**SSL/TLS pinning** means the app trusts **only specific certificates or public keys**, not just any chain the device CA list would accept. It raises the bar against rogue CAs, some MITM proxies, and user-installed certs (depending on network security config).\n\nCommon implementation with OkHttp:\n\n```kotlin\nval client = OkHttpClient.Builder()\n    .certificatePinner(\n        CertificatePinner.Builder()\n            .add(\"api.example.com\", \"sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\")\n            .build()\n    )\n    .build()\n```\n\nYou can also pin in **network security config** XML (`<pin-set>`). Always ship **backup pins**, rotate before expiry, and have a **remote kill / app update** story — a bad pin **bricks** networking until users update. Debug builds should disable pinning so Charles/Proxyman work. Pin **SPKI** hashes, not the whole leaf, unless you control rotation tightly. Pair with **cleartext traffic disabled**.",
    "pdfTopic": true,
    "tags": [
      "SSL pinning",
      "CertificatePinner",
      "security",
      "pdf"
    ]
  },
  {
    "id": "and-055",
    "category": "android",
    "level": "advanced",
    "topic": "AES Encryption",
    "question": "How should you use AES encryption in an Android app?",
    "answer": "**AES** is a symmetric cipher: one key encrypts and decrypts. On Android you should **not** hardcode keys or store them in SharedPreferences as plaintext.\n\nPractical recipe:\n\n- Algorithm: **AES/GCM/NoPadding** (authenticated encryption). Avoid ECB; CBC needs a MAC.\n- Keys: **AndroidKeyStore** (`KeyGenParameterSpec` with `PURPOSE_ENCRYPT or PURPOSE_DECRYPT`, `setBlockModes(GCM)`, `setRandomizedEncryptionRequired(true)`). Optionally user authentication / StrongBox.\n- IV: GCM IV must be **unique per encryption**; store IV + ciphertext together.\n- Large files: encrypt streams in chunks; do not load entire files.\n\n```kotlin\nval cipher = Cipher.getInstance(\"AES/GCM/NoPadding\")\ncipher.init(Cipher.ENCRYPT_MODE, secretKey)\nval iv = cipher.iv\nval encrypted = cipher.doFinal(plaintext)\n```\n\nKeystore keys are **non-exportable**. For syncing ciphertext across devices you need a wrapped key strategy, not a raw Keystore key dump. This is **not** a substitute for HTTPS; it protects **data at rest**.",
    "pdfTopic": true,
    "tags": [
      "AES",
      "AndroidKeyStore",
      "GCM",
      "pdf"
    ]
  },
  {
    "id": "and-056",
    "category": "android",
    "level": "intermediate",
    "topic": "ProGuard vs R8",
    "question": "What is the difference between ProGuard and R8?",
    "answer": "**ProGuard** is a Java tool that: **removes unused classes/methods**, **obfuscates** names to hinder reverse engineering, and **reduces APK size**.\n\n**R8** converts Java bytecode into **optimized DEX**. It also strips unused code and uses **the same ProGuard keep rules** to adjust default behavior.\n\nPDF differences to quote:\n\n- R8 has **more Kotlin support**.\n- R8 is **faster** (shorter builds).\n- R8 gives **better output**.\n- Size: R8 ~**10%** vs ProGuard ~**8.5%** in their comparison.\n- **Android Gradle Plugin 3.4.0+** uses **R8 by default**, still consuming ProGuard rules.\n\nR8 **full mode** (default in recent AGP) is more aggressive (`assumevalues`, missing `@Keep` breaks reflection). Always test release builds. Mapping files belong in Crashlytics. `minifyEnabled true` + `shrinkResources true` is the usual pair.",
    "pdfTopic": true,
    "tags": [
      "ProGuard",
      "R8",
      "shrinking",
      "obfuscation",
      "pdf"
    ]
  },
  {
    "id": "and-057",
    "category": "android",
    "level": "intermediate",
    "topic": "Thread vs Service vs Runnable",
    "question": "What is the difference between a Thread, a Service, and a Runnable?",
    "answer": "These three are often mashed together; they solve different problems.\n\n- **Runnable** — a **task** (`run()`). It is not a thread. You pass it to a `Thread`, `Executor`, or `Handler`.\n- **Thread** — an **OS thread**. Use it so **heavy work is not on the main UI thread** (network bytes, decoding). It is **not** an Android component; if the component that started it dies, **you must stop it** or it leaks.\n- **Service** — an Android **component** that can run **independently of any Activity** (background presence). The PDF stress point: a **started Service still runs on the main thread** by default. For network or heavy load you still need a **Thread / coroutine / Executor** inside it.\n\n`IntentService` (deprecated) was a Service with a worker queue. Today: **WorkManager**, **coroutines in a foreground Service**, or `Executor`. Never start raw `Thread()` without a lifecycle cleanup plan.",
    "pdfTopic": true,
    "tags": [
      "Thread",
      "Service",
      "Runnable",
      "main thread",
      "pdf"
    ]
  },
  {
    "id": "and-058",
    "category": "android",
    "level": "intermediate",
    "topic": "JobScheduler vs WorkManager vs AlarmManager",
    "question": "When do you use JobScheduler, WorkManager, or AlarmManager?",
    "answer": "All three schedule future work; they are not interchangeable.\n\n- **AlarmManager** — **clock-based** alarms (RTC / elapsed). Exact alarms are **restricted** (`SCHEDULE_EXACT_ALARM` / `USE_EXACT_ALARM`). Good for user-visible alarms (alarm clock). Doze will delay inexact alarms.\n- **JobScheduler** (API 21+) — OS job queue with **constraints** (charging, idle, network). Batching-friendly. You implement `JobService`.\n- **WorkManager** — **Jetpack wrapper** that uses JobScheduler (and other impls) and adds **backward compatibility, chaining, unique work, persist across reboot**. Default choice for deferrable background work.\n\nRule: if the work **must complete eventually** and can wait, **WorkManager**. If it is a **user alarm at 7:00**, AlarmManager (or `Clock` APIs). You rarely use JobScheduler directly unless avoiding Jetpack.",
    "pdfTopic": true,
    "tags": [
      "JobScheduler",
      "WorkManager",
      "AlarmManager",
      "pdf"
    ]
  },
  {
    "id": "and-059",
    "category": "android",
    "level": "advanced",
    "topic": "Reduce app size",
    "question": "What tricks reduce Android app size?",
    "answer": "Size is Play ranking and conversion. A practical checklist:\n\n- Ship **AAB** (Play generates split APKs per ABI/density/language).\n- **R8 minify** + **resource shrinking**; strip unused languages (`resConfigs`).\n- **ABI filters** / NDK `abiFilters` — do not ship every `.so`.\n- **Vector drawables** over many PNG densities; **WebP/AVIF**.\n- Avoid **duplicate libraries**; inspect APK Analyzer.\n- **Dynamic feature modules** for large optional features.\n- Replace bulky SDKs; watch **Play services** vs **Play KTX** modularization.\n- **Native libs**: `android:extractNativeLibs`, uncompressed lib in APK.\n- Remove unused **Compose debug** / leak canary from release.\n\nOn-device: **Android App Bundle + Play Feature Delivery**. Interviewers love APK Analyzer numbers more than slogans.",
    "pdfTopic": true,
    "tags": [
      "APK size",
      "R8",
      "App Bundle",
      "pdf"
    ]
  },
  {
    "id": "and-060",
    "category": "android",
    "level": "advanced",
    "topic": "Enums and APK size",
    "question": "How do Java/Kotlin enums affect APK size? (PDF: Occurrence / Enums)",
    "answer": "The PDF clusters **“Occurrence”** and **“Enums”** near app-size tricks. The interview fact: **enums are not free**. Each enum constant is an object plus a **String name**, `values()` arrays, and extra DEX methods (`valueOf`). That shows up in **DEX size** and runtime.\n\nMitigations:\n\n- **R8** can optimize some enum usage, but reflection/`when` exhaustiveness still keep them.\n- Prefer **`@IntDef` / `@StringDef`**, **inline value classes**, or plain constants for large sets (network error codes, view types).\n- Do not use enums as **RecyclerView view types** in hot lists if you can use ints.\n- Keep enums where they **buy safety** (small sealed domains).\n\n“Occurrence: Enums” is also a reminder that **ANR occurrence** is a separate heading in that PDF section — do not mix “enums cause ANRs”; they cause **size**, not jank by themselves.",
    "pdfTopic": true,
    "tags": [
      "enum",
      "APK size",
      "ProGuard",
      "pdf"
    ]
  },
  {
    "id": "and-061",
    "category": "android",
    "level": "intermediate",
    "topic": "ANR",
    "question": "What is an ANR and what causes it? (PDF heading: Occurrence)",
    "answer": "**ANR (Application Not Responding)** is the system dialog when the **main thread** is blocked too long. Typical thresholds: **~5s** for input dispatch, **~10s** for BroadcastReceiver `onReceive`, **~20s** for Service.\n\nThe PDF labels this section **“Occurence”** next to size/enums — treat it as **when ANRs occur**.\n\nCauses: disk I/O, SQLite on main, lock contention, heavy `onDraw`/`onBindViewHolder`, waiting on a network call, deadlock with a worker that needs main, too much work in `onCreate`.\n\nDebug: **ANR traces** (`/data/anr/traces.txt`), Play Console ANR reports, StrictMode, systrace. Fix: move work off main (**Dispatchers.IO**, WorkManager), split startup, use **baseline profiles**. Never `Thread.sleep` on main. `runBlocking` on main is an ANR waiting to happen.",
    "pdfTopic": true,
    "tags": [
      "ANR",
      "main thread",
      "pdf"
    ]
  },
  {
    "id": "and-062",
    "category": "android",
    "level": "intermediate",
    "topic": "Launch modes",
    "question": "What are the four Activity launch modes, and how does the back stack change?",
    "answer": "`android:launchMode` (or Intent flags) controls **instances and tasks**. The PDF’s four modes and **stack examples**:\n\n- **standard** — always a **new instance** in the task that started it. Stack `A → B → C`, launch B: **`A → B → C → B`**.\n- **singleTop** — if an instance is **already on top**, reuse it and call **`onNewIntent()`**. Stack `A → B → C`, launch B: **`A → B → C → B`**. Stack `A → B → C`, launch C: stays **`A → B → C`**.\n- **singleTask** — one instance in the task; if it exists, it is **brought to front** and activities above it are **cleared**. Stack `A → B → C → D`, launch B: **`A → B`** (C and D destroyed; old B gets `onNewIntent`).\n- **singleInstance** — like singleTask but the **task holds only that Activity**. Stack `A → B → C`, launch D as singleInstance: **Task1 `A → B → C`** and **Task2 `D`**. Launch E (standard): **`A → B → C → E`** and **`D`**. Launch D again: same D, `onNewIntent()`.\n\nAlso know **`taskAffinity`**, `FLAG_ACTIVITY_CLEAR_TOP`, and `documentLaunchMode`. Prefer Navigation + default `standard` unless you have a real task requirement (e.g. incoming call screen).",
    "pdfTopic": true,
    "tags": [
      "launchMode",
      "task",
      "back stack",
      "pdf"
    ]
  },
  {
    "id": "and-063",
    "category": "android",
    "level": "intermediate",
    "topic": "standard launch mode",
    "question": "How does launchMode=standard work?",
    "answer": "**standard** is the default. Every `startActivity` that resolves to that class **creates a new instance** and pushes it on the **current task** (unless flags say otherwise).\n\nPDF properties:\n\n- New instance in the **task from which it originated**.\n- **Several instances** of the same Activity are allowed.\n- Example: current stack **A → B → C**; launch B again → **A → B → C → B**. Two B instances, two lifecycles.\n\nThat is why deep linking into a `standard` screen can stack duplicates. Combine with `FLAG_ACTIVITY_SINGLE_TOP` or Navigation `launchSingleTop` when you want reuse. `standard` is correct for most forms and details screens.",
    "pdfTopic": true,
    "tags": [
      "standard",
      "launchMode",
      "pdf"
    ]
  },
  {
    "id": "and-064",
    "category": "android",
    "level": "intermediate",
    "topic": "singleTop",
    "question": "How does launchMode=singleTop work?",
    "answer": "**singleTop** is **standard unless the same Activity is already on top** of the stack. If it is on top, **no new instance**; the Intent is delivered to **`onNewIntent()`**. If it is in the stack but **not on top**, you still **push a new instance**.\n\nPDF examples:\n\n- Stack **A → B → C**, launch **B** singleTop → **A → B → C → B** (B was not top).\n- Stack **A → B → C**, launch **C** singleTop → **A → B → C** unchanged, `onNewIntent` on C.\n\nYou must **handle `onNewIntent`** (and usually `setIntent`) or the screen keeps showing the old extras. Search screens and launchers often use this. Intent flag `FLAG_ACTIVITY_SINGLE_TOP` is the per-call equivalent.",
    "pdfTopic": true,
    "tags": [
      "singleTop",
      "onNewIntent",
      "pdf"
    ]
  },
  {
    "id": "and-065",
    "category": "android",
    "level": "intermediate",
    "topic": "singleTask",
    "question": "How does launchMode=singleTask work?",
    "answer": "**singleTask** means a **single instance** is the **root of a task** (with affinity). If the instance already exists, the system **routes the Intent to it** and **destroys everything above it**.\n\nPDF example: stack **A → B → C → D**. Launch **B** with singleTask → new stack **A → B**. **C and D are destroyed**; the **old B** receives a callback (`onNewIntent`).\n\nSide effects: surprising **onDestroy** of screens “above” B; users lose those UIs. Used for **main/hub** Activities (launcher-like). Combined with `CLEAR_TASK` flags it can reset an app. Always consider whether Navigation `popUpTo` inclusive is a clearer, in-graph version of the same idea.",
    "pdfTopic": true,
    "tags": [
      "singleTask",
      "taskAffinity",
      "pdf"
    ]
  },
  {
    "id": "and-066",
    "category": "android",
    "level": "intermediate",
    "topic": "singleInstance",
    "question": "How does launchMode=singleInstance work?",
    "answer": "**singleInstance** is **singleTask plus isolation**: **no other Activity is launched into that task**. Anything new goes to a **different task**.\n\nPDF stacks:\n\n- Current **A → B → C**. Launch **D** (`singleInstance`) → two tasks: **`A → B → C`** and **`D`**.\n- Then launch **E** → **`A → B → C → E`** and **`D`** still alone.\n- Launch **D** again → the **same D**, Intent to **`onNewIntent()`**.\n\nUse cases: **incoming call**, **alarm ring**, **PiP-like** dedicated tasks. Recents may show **two** app entries if affinities differ. This mode is easy to get wrong (users “lose” the Activity when switching tasks). Prefer default modes unless product UX is a separate task.",
    "pdfTopic": true,
    "tags": [
      "singleInstance",
      "tasks",
      "pdf"
    ]
  },
  {
    "id": "and-067",
    "category": "android",
    "level": "intermediate",
    "topic": "Service vs IntentService",
    "question": "What is the difference between Service and IntentService?",
    "answer": "A **Service** is a component without a UI. `onStartCommand` / `onBind` run on the **main thread**. You manage threading and stopping (`stopSelf`).\n\n**IntentService** (deprecated) was a helper Service with:\n\n- A **worker thread** and a **work queue**.\n- `onHandleIntent` off main.\n- **Stops itself** when the queue is empty.\n\nWhy deprecated: background execution limits; the system can stop it; no foreground notification story. Replacements: **WorkManager** for deferrable work, **JobIntentService** (also legacy), or a **foreground Service** + coroutine for user-visible ongoing work.\n\nIf they ask “which runs in background thread?” — **IntentService yes, Service no (unless you make it so).**",
    "pdfTopic": true,
    "tags": [
      "Service",
      "IntentService",
      "background",
      "pdf"
    ]
  },
  {
    "id": "and-068",
    "category": "android",
    "level": "advanced",
    "topic": "Restart Service when destroyed",
    "question": "How do you restart a Service if the system destroys it?",
    "answer": "The system kills Services under memory pressure. Restart policy is **`onStartCommand`’s return value**:\n\n- **`START_STICKY`** — recreate the Service with a **null Intent** when possible. You re-initialize state.\n- **`START_NOT_STICKY`** — do not restart unless there are pending Intents.\n- **`START_REDELIVER_INTENT`** — restart and **redeliver the last Intent** (useful for file downloads).\n\nThat is not enough on modern Android. Background Services are **limited (Oreo+)**. For work that must continue:\n\n- Promote to a **foreground Service** with a notification and the correct **foregroundServiceType**.\n- Persist work in **WorkManager** so a reboot or kill still completes the job.\n- `onDestroy` is **not guaranteed** (process kill). Persist incrementally, not only in `onDestroy`.\n\nNever rely on an infinite `while(true)` Service without foreground + sticky if the user expects continuity.",
    "pdfTopic": true,
    "tags": [
      "START_STICKY",
      "foreground service",
      "pdf"
    ]
  },
  {
    "id": "and-069",
    "category": "android",
    "level": "intermediate",
    "topic": "Service on another thread",
    "question": "How do you run a Service’s work on another thread?",
    "answer": "The PDF topic is **“normal services in another thread.”** A vanilla Service does **not** give you a worker thread. You create one.\n\nOptions:\n\n- **`HandlerThread` + Handler** — classic, quit in `onDestroy`.\n- **`ExecutorService`** (`Executors.newSingleThreadExecutor()`).\n- **Coroutines** — `CoroutineScope(SupervisorJob() + Dispatchers.IO)` cancelled in `onDestroy`, or `lifecycleScope` if you use `LifecycleService`.\n- **`IntentService` / `JobIntentService`** — built-in worker queue (legacy).\n- **`CoroutineWorker`** — if it should have been WorkManager all along.\n\n```kotlin\nclass DownloadService : Service() {\n    private val job = SupervisorJob()\n    private val scope = CoroutineScope(job + Dispatchers.IO)\n    override fun onStartCommand(i: Intent?, f: Int, id: Int): Int {\n        scope.launch { doDownload(); stopSelf(id) }\n        return START_REDELIVER_INTENT\n    }\n    override fun onDestroy() { job.cancel(); super.onDestroy() }\n}\n```\n\nDo not `Thread { }.start()` without tracking it for cancellation.",
    "pdfTopic": true,
    "tags": [
      "Service",
      "thread",
      "coroutines",
      "pdf"
    ]
  },
  {
    "id": "and-070",
    "category": "android",
    "level": "intermediate",
    "topic": "DiffUtil",
    "question": "What is DiffUtil (diffConfig) in RecyclerView?",
    "answer": "**DiffUtil** computes the **minimal set of notify** calls between two lists (insert, remove, move, change). The PDF heading **diffConfig** is the config object you pass: a **`DiffUtil.ItemCallback<T>`** (or `Callback` for two snapshots).\n\nYou implement:\n\n- **`areItemsTheSame`** — identity (same `id`).\n- **`areContentsTheSame`** — equality of fields that affect UI.\n- Optional **`getChangePayload`** for partial bind (e.g. only like-count).\n\nRun it **off the main thread** via **`AsyncListDiffer` / `ListAdapter`**. Doing `DiffUtil.calculateDiff` on main with 5k items is an ANR.\n\nCompose Lazy lists replace this with **keys** + positional memoization; RecyclerView interviews still expect `ListAdapter.submitList`.",
    "pdfTopic": true,
    "tags": [
      "DiffUtil",
      "RecyclerView",
      "AsyncListDiffer",
      "pdf"
    ]
  },
  {
    "id": "and-071",
    "category": "android",
    "level": "intermediate",
    "topic": "Dispatchers.IO",
    "question": "Why does the PDF show Coroutines Dispatchers.IO with withContext(Main)?",
    "answer": "The PDF Jetpack section includes:\n\n```kotlin\nCoroutines(Dispatchers.IO).launch {\n    println(\"print\")\n    withContext(Dispatchers.Main) { }\n}\n```\n\nThe idea (despite the pseudo-syntax): **do blocking I/O on `Dispatchers.IO`**, then **hop to Main** to touch Views. `Dispatchers.IO` is a shared pool sized for blocking disk/network. `withContext(Main)` is a **suspend** bridge — it does not leak the IO thread.\n\nPrefer **`viewModelScope.launch`** + `withContext(IO)` inside a repository over launching unstructured on IO. `Dispatchers.Default` is for CPU work; `Main.immediate` for already-on-main UI. Do not use `Dispatchers.IO` for tight CPU loops (starves the IO pool).",
    "pdfTopic": true,
    "tags": [
      "Dispatchers.IO",
      "withContext",
      "coroutines",
      "pdf"
    ]
  },
  {
    "id": "and-072",
    "category": "android",
    "level": "intermediate",
    "topic": "lifecycleScope",
    "question": "What is lifecycleScope?",
    "answer": "**`lifecycleScope`** is a `CoroutineScope` tied to a **`LifecycleOwner`** (Activity/Fragment). It is cancelled when the lifecycle hits **`DESTROYED`**, so you do not leak coroutines past the owner.\n\nUse it for UI-layer jobs: collecting a flow (better: `repeatOnLifecycle`), running a one-off animation, calling a suspend function that should die with the screen.\n\nDo **not** use it for work that must outlive rotation (rotation destroys the Activity → scope cancels). That belongs in **`viewModelScope`**. `lifecycle.coroutineScope` and `lifecycleScope` are the same idea; `lifecycle.repeatOnLifecycle(STARTED)` is the correct collector pattern to avoid collecting in `STOPPED`.",
    "pdfTopic": true,
    "tags": [
      "lifecycleScope",
      "coroutines",
      "pdf"
    ]
  },
  {
    "id": "and-073",
    "category": "android",
    "level": "intermediate",
    "topic": "viewModelScope",
    "question": "What is viewModelScope?",
    "answer": "**`viewModelScope`** is a `CoroutineScope` on **`ViewModel`**, cancelled in **`onCleared()`**. Jobs survive **configuration changes** because the ViewModel does.\n\n```kotlin\nclass FeedViewModel(repo: FeedRepo) : ViewModel() {\n    val state = repo.feed().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())\n}\n```\n\nDefault dispatcher is **Main.immediate**; switch with `withContext(IO)` for blocking calls. Structured concurrency: children cancel with the parent. Prefer this over `GlobalScope` in Android UI code. Combine with **`SupervisorJob`** (already used internally) so one child failure does not cancel siblings unless you launch without a handler.",
    "pdfTopic": true,
    "tags": [
      "viewModelScope",
      "ViewModel",
      "coroutines",
      "pdf"
    ]
  },
  {
    "id": "and-074",
    "category": "android",
    "level": "intermediate",
    "topic": "Parcelable vs Serializable",
    "question": "Why is Parcelable preferred over Serializable on Android?",
    "answer": "You often pass objects in **Intents/Bundles**. They must be **Parcelable or Serializable**.\n\n**Serializable** (Java): mark the class, JVM uses **reflection**, creates many temporary objects, **GC pressure**, slower. Easy to write.\n\n**Parcelable** (Android): **you** write `writeToParcel` / `createFromParcel` (or **`@Parcelize`**). **No reflection**, less garbage, **optimized for Binder**. The PDF: far more efficient, faster, better on Android.\n\n```kotlin\n@Parcelize\ndata class User(val id: String, val name: String) : Parcelable\n```\n\nCaveats: Parcelable is **not** a persistence format (no versioning). Do not put huge objects in Intents (TransactionTooLargeException, ~1MB Binder limit). For process death, keep Bundles small; use a database for the rest.",
    "pdfTopic": true,
    "tags": [
      "Parcelable",
      "Serializable",
      "IPC",
      "pdf"
    ]
  },
  {
    "id": "and-075",
    "category": "android",
    "level": "basic",
    "topic": "Jetpack Compose basics",
    "question": "What is Jetpack Compose, and what is a @Composable function?",
    "answer": "The PDF’s blue **Jetpack Compose Basic Interview Questions Reference for Study** link lost its URL on export. This is the core of that bank.\n\n**Compose** is Android’s declarative UI toolkit. You describe UI as functions annotated `@Composable`. The runtime calls them, builds a UI tree, and **recomposes** only functions whose snapshot state changed. Composables must be **side-effect free** except through effect APIs (`LaunchedEffect`, `DisposableEffect`, `SideEffect`). The compiler/runtime may call them in any order, in parallel, or skip them.",
    "pdfTopic": true,
    "tags": [
      "Compose",
      "Composable",
      "pdf",
      "study-reference"
    ]
  },
  {
    "id": "and-076",
    "category": "android",
    "level": "basic",
    "topic": "dp vs sp vs px",
    "question": "What is the difference between dp, sp, and px?",
    "answer": "**px** is a raw pixel. **dp** (density-independent pixel) scales with screen density so a control is a similar physical size. **sp** is like dp but also follows the **user font scale** — use sp for text, dp for layout.",
    "pdfTopic": false,
    "tags": [
      "resources",
      "density",
      "study-reference"
    ]
  },
  {
    "id": "and-077",
    "category": "android",
    "level": "basic",
    "topic": "Gradle",
    "question": "How does Gradle fit into an Android project?",
    "answer": "**Gradle** is the build system. The **Android Gradle Plugin (AGP)** adds `android {}` DSL, variants (`debug`/`release`, flavors), and tasks (`assemble`, `bundle`, `lint`, `test`).\n\nKnow the files: `settings.gradle` (modules), root and module `build.gradle(.kts)`, `gradle/libs.versions.toml`. **compileSdk** vs **minSdk** vs **targetSdk**. Product flavors and build types combine into **variants**.\n\nInterview extras: **KSP vs kapt**, configuration cache, version catalogs, why `implementation` vs `api`, and that **R8/resource shrinking** are Gradle switches. Gradle is not the Play Store — it produces APK/AAB for you to upload.",
    "pdfTopic": false,
    "tags": [
      "Gradle",
      "AGP",
      "build"
    ]
  },
  {
    "id": "and-078",
    "category": "android",
    "level": "basic",
    "topic": "Permissions",
    "question": "How do Android permissions work, including runtime permissions?",
    "answer": "Permissions protect user privacy. **Install-time** (`normal`) are granted at install. **Dangerous** permissions (location, camera, storage, SMS, contacts) need **runtime** requests on API 23+.\n\nFlow: declare in manifest → `ContextCompat.checkSelfPermission` → `ActivityResultContracts.RequestPermission` → handle deny / “don’t ask again” (send to Settings).\n\nSpecials: **notification** permission (API 33), **exact alarm**, **full-screen intent**, **background location** (two-step), **READ_MEDIA_*** instead of broad storage, **photo picker**. `targetSdk` changes the rules you are held to. Never assume grant; always degrade UI.",
    "pdfTopic": false,
    "tags": [
      "permissions",
      "runtime",
      "dangerous"
    ]
  },
  {
    "id": "and-079",
    "category": "android",
    "level": "intermediate",
    "topic": "RecyclerView vs ListView",
    "question": "Why is RecyclerView preferred over ListView?",
    "answer": "**ListView** recycled views but did **not require** a ViewHolder; people skipped it and janked. Layouts were vertical-only; animating diffs was manual.\n\n**RecyclerView** is a flexible `ViewGroup`:\n\n- Mandatory **ViewHolder**.\n- **LayoutManager** (linear, grid, staggered).\n- **ItemDecoration**, **ItemAnimator**.\n- **ListAdapter + DiffUtil** for partial updates.\n- Horizontal, nested, concatenated adapters.\n\nUse RecyclerView (or LazyColumn) for lists. ListView still exists for legacy. Mention **setHasFixedSize**, stable IDs, and not wrapping RecyclerView in ScrollView.",
    "pdfTopic": false,
    "tags": [
      "RecyclerView",
      "ListView",
      "ViewHolder"
    ]
  },
  {
    "id": "and-080",
    "category": "android",
    "level": "basic",
    "topic": "ConstraintLayout XML",
    "question": "What is ConstraintLayout in XML and why did it replace nested LinearLayouts?",
    "answer": "**ConstraintLayout** positions children relative to parent, siblings, **guidelines, barriers, chains, ratios** in a **mostly flat** tree. Nested `LinearLayout` weights trigger **double measure** passes; a deep tree is expensive.\n\nYou describe constraints (`app:layout_constraintTop_toBottomOf`). `0dp` means “match constraint.” Chains spread/pack/weighted. Guidelines are percentage or dp anchors.\n\nCompose analog is `ConstraintLayout` composable — but XML ConstraintLayout is still the default for many View-system screens. It is **not** magically faster if you nest three ConstraintLayouts; flat is the point.",
    "pdfTopic": false,
    "tags": [
      "ConstraintLayout",
      "XML",
      "performance"
    ]
  },
  {
    "id": "and-081",
    "category": "android",
    "level": "intermediate",
    "topic": "Handler and Looper",
    "question": "How do Handler, Looper, and MessageQueue work?",
    "answer": "The **main thread** runs a **Looper** that pulls **Messages** from a **MessageQueue**. A **Handler** bound to that Looper **enqueues** work (`post`, `sendMessage`, `postDelayed`).\n\n- `Looper.prepare()` + `loop()` on a `HandlerThread`.\n- `Handler(Looper.getMainLooper())` to hop to UI.\n- Each Message has `what`, `obj`, callback.\n\nThis is the backbone under `View.post`, older `AsyncTask`, and part of the framework. Today coroutines hide it, but interviewers still want the picture. Leaks: a **non-static Handler** inner class holding Activity; use weak refs or `Handler(Looper)` on a component that you `removeCallbacksAndMessages(null)` in `onDestroy`.",
    "pdfTopic": false,
    "tags": [
      "Handler",
      "Looper",
      "MessageQueue"
    ]
  },
  {
    "id": "and-082",
    "category": "android",
    "level": "basic",
    "topic": "SharedPreferences",
    "question": "What are SharedPreferences and when should you use DataStore instead?",
    "answer": "**SharedPreferences** is a small **key-value XML** file, typically accessed via `getSharedPreferences`. `commit()` is synchronous; `apply()` is async. Reads historically hit disk on first load; **not** type-safe; **not** coroutine-first; **apply** can ANR on backup/flush edge cases.\n\n**Jetpack DataStore** (`Preferences` or **Proto**) is the replacement: coroutine/Flow API, transactional updates, fewer corruption cases. Use DataStore for new flags and settings. Use **Room** for structured lists. Do not store secrets in either — use **EncryptedSharedPreferences** / Keystore if you must.",
    "pdfTopic": false,
    "tags": [
      "SharedPreferences",
      "DataStore"
    ]
  },
  {
    "id": "and-083",
    "category": "android",
    "level": "intermediate",
    "topic": "Notifications",
    "question": "How do Android notifications work with channels and PendingIntent?",
    "answer": "Notifications are posted through **NotificationManager** with a **NotificationCompat.Builder**. From API 26 you **must** create a **NotificationChannel** (importance, sound, DND bypass).\n\nTap actions use a **PendingIntent** wrapping an Intent to your Activity/Service/Broadcast. On API 31+ PendingIntents need **mutability** (`FLAG_IMMUTABLE` default-safe). Foreground services **require** a live notification.\n\nAlso: runtime **POST_NOTIFICATIONS** (API 33), notification groups, bubbles, and **styles** (MessagingStyle, BigText). Do not start a foreground Service without a real user-visible notification — the system will crash or delay you.",
    "pdfTopic": false,
    "tags": [
      "Notification",
      "channel",
      "PendingIntent"
    ]
  },
  {
    "id": "and-084",
    "category": "android",
    "level": "intermediate",
    "topic": "PendingIntent",
    "question": "What is a PendingIntent and why does mutability matter?",
    "answer": "A **PendingIntent** is a **token** you hand to another process (Notification Manager, App Widget, AlarmManager, GCM) so it can fire an Intent **as your app**. The system fills it in later.\n\nCreate with `PendingIntent.getActivity/getBroadcast/getService/getForegroundService`. Request codes + Intent extras identify uniqueness (`FLAG_UPDATE_CURRENT`).\n\n**Mutability:** `FLAG_MUTABLE` lets the holder add extras (needed for some inline replies); **`FLAG_IMMUTABLE`** is safer against Intent injection. Prefer immutable unless an API requires mutation. Always **explicit** component Intents inside PendingIntents to avoid hijack.",
    "pdfTopic": false,
    "tags": [
      "PendingIntent",
      "security",
      "alarms"
    ]
  },
  {
    "id": "and-085",
    "category": "android",
    "level": "intermediate",
    "topic": "Service types",
    "question": "What is the difference between started, bound, and foreground Services?",
    "answer": "Three usage modes (can overlap):\n\n- **Started** — `startService` / `startForegroundService`. Runs until `stopSelf`. Independent of the starter.\n- **Bound** — `bindService`; clients get an `IBinder`. Lifecycle tied to bindings (plus started if also started).\n- **Foreground** — a started Service that calls **`startForeground(id, notification)`** and declares **`foregroundServiceType`** (camera, microphone, location, mediaPlayback, dataSync, connectedDevice, …). Required for user-visible ongoing work on modern APIs.\n\nBackground **started** services are nearly unusable from the background after Oreo. Bound services still work in-process for IPC with a running app. AIDL binders are how other processes talk to a bound Service.",
    "pdfTopic": false,
    "tags": [
      "Service",
      "foreground",
      "bindService"
    ]
  },
  {
    "id": "and-086",
    "category": "android",
    "level": "advanced",
    "topic": "AIDL and IPC",
    "question": "How does IPC work on Android, and what is AIDL?",
    "answer": "Apps are **separate processes**. Cross-process calls go through **Binder** (kernel driver). **AIDL** (Android Interface Definition Language) describes a Binder interface; the toolchain generates `Stub`/`Proxy`.\n\n```java\ninterface IPayment {\n    int charge(in String sku);\n}\n```\n\nAlso IPC: **Intents** (one-shot), **Messenger** (Handler over Binder), **ContentProvider**, **Broadcast**. Binder payloads must be **Parcelable**; there is a **transaction size limit**.\n\nUse AIDL for **multi-app** or **multi-process** APIs (media, wear, companion). In-process, a local Binder or DI is enough. `android:process=\":remote\"` doubles Application objects — be explicit why you need it.",
    "pdfTopic": false,
    "tags": [
      "AIDL",
      "Binder",
      "IPC"
    ]
  },
  {
    "id": "and-087",
    "category": "android",
    "level": "advanced",
    "topic": "Memory leaks",
    "question": "What causes memory leaks on Android and how do you prevent them?",
    "answer": "A **leak** is an object that should be gone (Activity after rotate) still **reachable**. GC cannot collect it; you grow toward OOM.\n\nClassic sources:\n\n- Static reference to Activity/View.\n- Non-static inner **Thread/AsyncTask/Handler/Listener**.\n- Registered **BroadcastReceiver / LocationListener** not unregistered.\n- **Rx/Flow** subscriptions without `dispose` / `repeatOnLifecycle`.\n- **WebView** / **Bitmap** caches.\n- Singletons holding Context.\n\nFix: application context for singletons, `viewModelScope`, `onDestroyView` null-out (View Binding `_binding = null`), weak listeners. Tooling: **LeakCanary**, Profiler heap dump, `adb shell dumpsys meminfo`.",
    "pdfTopic": false,
    "tags": [
      "leaks",
      "Context",
      "static"
    ]
  },
  {
    "id": "and-088",
    "category": "android",
    "level": "intermediate",
    "topic": "LeakCanary",
    "question": "What is LeakCanary and how do you use it?",
    "answer": "**LeakCanary** is Square’s **debug** library that watches destroyed Activities/Fragments/ViewModels and **dumps the heap** if they are still reachable. It shows a **leaktrace** (path to GC root) in a notification.\n\nAdd `debugImplementation` only. Do not ship it in release. It teaches you the **real** reference path, not a guess. After a leak, fix the root (static map, Rx, singleton). `AppWatcher` can watch custom objects. Combine with **StrictMode** for a two-layer debug net.",
    "pdfTopic": false,
    "tags": [
      "LeakCanary",
      "debug",
      "memory"
    ]
  },
  {
    "id": "and-089",
    "category": "android",
    "level": "intermediate",
    "topic": "StrictMode",
    "question": "What is StrictMode?",
    "answer": "**StrictMode** is a developer tool that flags **accidental disk/network on the main thread**, leaked closable objects, and some VM policy violations (file URI exposure).\n\nEnable in debug `Application.onCreate`:\n\n```kotlin\nStrictMode.setThreadPolicy(\n    StrictMode.ThreadPolicy.Builder().detectAll().penaltyLog().build()\n)\n```\n\nPenalties: log, death, dialog. It will not catch every ANR cause (CPU loops), but it catches “I queried Room on main.” Keep it **off** in release or users see crashes you chose as `penaltyDeath`.",
    "pdfTopic": false,
    "tags": [
      "StrictMode",
      "disk",
      "main thread"
    ]
  },
  {
    "id": "and-090",
    "category": "android",
    "level": "basic",
    "topic": "AndroidX",
    "question": "What is AndroidX?",
    "answer": "**AndroidX** is the **Jetpack** namespace that replaced the old **Support Library** (`android.support.*`). Packages like `androidx.appcompat`, `androidx.fragment`, `androidx.lifecycle` version independently from the platform.\n\n`android.enableJetifier` rewrote old support artifacts; new projects are AndroidX-only. `androidx.core` backports APIs (`ContextCompat`). Interview: AndroidX ≠ Compose, but Compose lives under `androidx.compose`. Always use AndroidX artifacts, not Support Library.",
    "pdfTopic": false,
    "tags": [
      "AndroidX",
      "Support Library"
    ]
  },
  {
    "id": "and-091",
    "category": "android",
    "level": "intermediate",
    "topic": "APK vs AAB",
    "question": "What is the difference between APK and AAB?",
    "answer": "**APK** is the installable package (zip of dex, resources, native libs, manifest). Sideload and many stores still use it.\n\n**AAB (Android App Bundle)** is an **upload format** for Play: Play generates **split APKs** per ABI, density, language. Users download only what they need. Play also handles **signing** (Play App Signing) and **feature modules**.\n\nYou cannot install an AAB directly; `bundletool` builds APKs from it. Universal APKs are larger. Interview: AAB is required for new Play apps; size wins come from splits, not magic compression alone.",
    "pdfTopic": false,
    "tags": [
      "APK",
      "AAB",
      "Play Store"
    ]
  },
  {
    "id": "and-092",
    "category": "android",
    "level": "intermediate",
    "topic": "Multidex",
    "question": "What is the 64K method limit and multidex?",
    "answer": "A single DEX file can reference at most **65,536 methods** (16-bit). Big apps + libraries overflow → **multi-DEX**: `classes.dex`, `classes2.dex`, …\n\nOn modern ART (API 21+) multidex is native. Below 21 you needed `MultiDexApplication`. **R8 shrinking** often removes the need. If you still hit it: enable `multiDexEnabled true`, inspect method counts (APK Analyzer), drop unused libs.\n\nDalvik linearAlloc issues on ancient APIs are historical. Today the interview point is **R8 vs “just enable multidex”**.",
    "pdfTopic": false,
    "tags": [
      "multidex",
      "DEX",
      "64k"
    ]
  },
  {
    "id": "and-093",
    "category": "android",
    "level": "basic",
    "topic": "Dalvik vs ART",
    "question": "How does Dalvik differ from ART?",
    "answer": "**Dalvik** ran `.dex` with a **JIT** (later) register machine; install was fast, runtime compiled hot methods. **ART** (default since **Lollipop**) uses **AOT** (and later **profile-guided JIT + AOT**) for better runtime performance and battery.\n\nBoth execute **DEX bytecode**; ART is not a JVM. **Zygote** forks either. Garbage collectors differ (CMS vs Concurrent Copying, generational). For interviews: “Dalvik vs ART” is the runtime chapter of architecture — ART won; Dalvik is history except for old-device trivia.",
    "pdfTopic": false,
    "tags": [
      "Dalvik",
      "ART",
      "AOT",
      "JIT"
    ]
  },
  {
    "id": "and-094",
    "category": "android",
    "level": "intermediate",
    "topic": "WebView",
    "question": "What should you know about WebView in interviews?",
    "answer": "**WebView** embeds web content (Chromium-based today). You load URLs/HTML, can inject **JS bridges** (`@JavascriptInterface`).\n\nSecurity: never `addJavascriptInterface` on untrusted content on old APIs; **HTTPS** only; disable file access if unused; `shouldOverrideUrlLoading` for your domain. Cookies and third-party cookies have platform policies.\n\nWebView is a **separate provider** (Chrome/WebView APK) that updates independently. Heavy: memory, not a full browser. For OAuth/custom tabs prefer **Chrome Custom Tabs / Auth Tab**. Evaluate **Trusted Web Activity** for mostly-web apps.",
    "pdfTopic": false,
    "tags": [
      "WebView",
      "JavaScriptInterface",
      "security"
    ]
  },
  {
    "id": "and-095",
    "category": "android",
    "level": "intermediate",
    "topic": "Process importance",
    "question": "How does Android rank process importance when reclaiming memory?",
    "answer": "The kernel **kills processes** under memory pressure. Importance (high to low, simplified):\n\n- **Foreground** — on-screen Activity or foreground Service.\n- **Visible** — not foreground but visible (dialog overlay, PIP-ish).\n- **Service** — running Service (background services are weaker now).\n- **Cached / empty** — no components running; LRU of previous screens.\n\n`onTrimMemory` / `onLowMemory` let you drop caches before death. A **bound** Service from a foreground UI raises importance. Do not try to be unkillable; that is why **foreground Service + notification** exists for music. `startForeground` abuse gets Play policy strikes.",
    "pdfTopic": false,
    "tags": [
      "process",
      "LMK",
      "oom_adj"
    ]
  },
  {
    "id": "and-096",
    "category": "android",
    "level": "intermediate",
    "topic": "Configuration changes",
    "question": "What happens on a configuration change, and how do you handle it?",
    "answer": "Rotation, locale, dark mode, foldable size — **configuration change**. Default: Activity is **destroyed and recreated**. `onSaveInstanceState` runs; a new instance `onCreate(bundle)`.\n\nSurvive:\n\n- **ViewModel** for UI state in memory.\n- **savedInstanceState / SavedStateHandle** for small process-death-safe state.\n- **Resource qualifiers** (`layout-land`, `values-night`).\n\n`android:configChanges` to **block** recreate is a last resort (games, camera preview) — you must handle `onConfigurationChanged` yourself. Do not use it to “fix” ViewModels you have not learned.",
    "pdfTopic": false,
    "tags": [
      "rotation",
      "configChanges",
      "ViewModel"
    ]
  },
  {
    "id": "and-097",
    "category": "android",
    "level": "basic",
    "topic": "savedInstanceState",
    "question": "What is savedInstanceState and what belongs in it?",
    "answer": "**`onSaveInstanceState(Bundle)`** is the framework’s **transient UI snapshot** for recreation and **process death**. You put **Parcelables/primitives**: scroll position, current tab, draft text.\n\nIt is **small** (Binder limits). Not for bitmaps or lists of thousands. Restore in `onCreate`/`onViewStateRestored`. View state (`android:id` on widgets) is saved automatically if they have IDs.\n\nViewModel does **not** replace this for process death unless you use **SavedStateHandle**. Pair: ViewModel for rotation, SavedState/Room for kill.",
    "pdfTopic": false,
    "tags": [
      "savedInstanceState",
      "Bundle",
      "process death"
    ]
  },
  {
    "id": "and-098",
    "category": "android",
    "level": "intermediate",
    "topic": "Fragment back stack",
    "question": "How does the Fragment back stack work?",
    "answer": "`FragmentManager` transactions (`add`/`replace`/`hide`) can **`addToBackStack(name)`**. The system Back button **pops** the last transaction, reversing it.\n\nReplace + back stack: the outgoing fragment gets **onDestroyView** but may **keep the instance**. Pop: **onCreateView** again. Without back stack, replace **destroys** the old fragment.\n\n`popBackStack(name, POP_BACK_STACK_INCLUSIVE)`, child vs parent managers, and **Navigation Component** owning the stack are follow-ups. Multiple back stacks (bottom nav) need `NavController` per tab or manual tags — a famous footgun.",
    "pdfTopic": false,
    "tags": [
      "FragmentManager",
      "back stack",
      "transactions"
    ]
  },
  {
    "id": "and-099",
    "category": "android",
    "level": "intermediate",
    "topic": "Navigation deep links",
    "question": "How do deep links work with the Navigation component?",
    "answer": "A **deep link** opens a destination from outside (URL, notification). In Navigation you declare `<deepLink app:uri=\"https://shop.example.com/product/{id}\"/>` and matching **intent filters** (`VIEW`, `BROWSABLE`, `https`).\n\n**App Links** (verified Digital Asset Links) skip the disambiguation sheet. `navController.handleDeepLink(intent)` in `onCreate`/`onNewIntent`. Arguments parse from path/query into Safe Args.\n\nPendingIntent from a notification should use **explicit** `NavDeepLinkBuilder` so you synthesize the **back stack** (home → detail) instead of stranding the user with an empty Back. `launchSingleTop` avoids duplicate destinations.",
    "pdfTopic": false,
    "tags": [
      "deep link",
      "Navigation",
      "App Links"
    ]
  },
  {
    "id": "and-100",
    "category": "android",
    "level": "intermediate",
    "topic": "WorkManager constraints",
    "question": "Which WorkManager constraints can you set?",
    "answer": "`Constraints.Builder` gates when a `Worker` runs:\n\n- **Network** — `CONNECTED`, `UNMETERED`, `NOT_ROAMING`, `METERED`.\n- **Battery** — `setRequiresBatteryNotLow`, `setRequiresCharging`.\n- **Idle** — `setRequiresDeviceIdle` (Doze-friendly, API 23+).\n- **Storage** — `setRequiresStorageNotLow`.\n\nIf constraints are unmet, work **waits**. Periodic work still has a **~15 min** floor. Combine with **backoff** and **expedited** (quota) for user-initiated sync. Testing: `WorkManagerTestInitHelper`. Constraints are why WorkManager beats a raw thread after the user turns on airplane mode.",
    "pdfTopic": false,
    "tags": [
      "WorkManager",
      "Constraints",
      "network"
    ]
  },
  {
    "id": "and-101",
    "category": "android",
    "level": "intermediate",
    "topic": "Room migrations",
    "question": "How do Room entities, DAOs, and migrations work in practice?",
    "answer": "Beyond the PDF Room intro, interviews drill **migrations**. Bump `@Database(version = 2)`, add a `Migration(1, 2)` with `execSQL(\"ALTER TABLE …\")`. Export schema JSON in CI (`exportSchema = true`) so you never guess.\n\nDestructive fallback wipes user data — unacceptable in production apps. Test migrations with `MigrationTestHelper`. `@TypeConverter` for enums/dates. `@Relation` / `@Embedded` vs flattening. **Foreign keys** need `PRAGMA foreign_keys`. Destructive vs incremental is a product decision; say it out loud.",
    "pdfTopic": false,
    "tags": [
      "Room",
      "Migration",
      "schema"
    ]
  },
  {
    "id": "and-102",
    "category": "android",
    "level": "intermediate",
    "topic": "Paging 3",
    "question": "How would you implement Paging 3 end to end?",
    "answer": "End-to-end Paging 3:\n\n1. **PagingSource** from Room (`dao.pagingSource()`) or network (`nextKey` from page).\n2. **RemoteMediator** if network + DB: on `REFRESH`/`APPEND` fetch API, write Room, return `Success(endOfPaginationReached)`.\n3. ViewModel: `Pager(PagingConfig(pageSize = 30)) { … }.flow.cachedIn(viewModelScope)`.\n4. UI: `PagingDataAdapter` or Compose `collectAsLazyPagingItems()`.\n5. Headers/footers from `LoadState`.\n\nErrors: retry via `adapter.retry()`. Distinct keys. Don’t wrap PagingData in LiveData unnecessarily; Flow is native.",
    "pdfTopic": false,
    "tags": [
      "Paging 3",
      "RemoteMediator",
      "Flow"
    ]
  },
  {
    "id": "and-103",
    "category": "android",
    "level": "intermediate",
    "topic": "CameraX",
    "question": "What is CameraX at a high level?",
    "answer": "**CameraX** is a Jetpack wrapper over Camera2 with a **lifecycle-aware** API and device compatibility quirks handled for you.\n\nUse cases (bind to `LifecycleOwner`):\n\n- **Preview** — surface for Compose/`PreviewView`.\n- **ImageCapture** — stills with flash, rotation.\n- **ImageAnalysis** — YUV frames for ML Kit.\n- **VideoCapture**.\n\nYou select a **camera selector** (front/back) and bind a **UseCase group**. Permissions (`CAMERA`) still apply. Prefer CameraX over raw Camera2 unless you need a missing advanced control.",
    "pdfTopic": false,
    "tags": [
      "CameraX",
      "Preview",
      "ImageCapture"
    ]
  },
  {
    "id": "and-104",
    "category": "android",
    "level": "basic",
    "topic": "Compose vs XML",
    "question": "How does Jetpack Compose compare with the XML View system?",
    "answer": "**XML Views** are a mutable tree you inflate and **mutate** (`setText`). **Compose** is a **declarative** function of state: you emit UI, the runtime **diffs** and applies changes.\n\nCompose: less boilerplate adapters, first-class animation, Kotlin-only, compiler plugin. XML: mature tooling, ConstraintLayout visual editor, huge widget ecosystem.\n\nInterop is first-class (`AndroidView`, `ComposeView`). Migration is screen-by-screen. Performance models differ: View invalidate vs **recomposition skipping**. Both can be fast; both can be slow if you measure poorly.",
    "pdfTopic": false,
    "tags": [
      "Compose",
      "XML",
      "UI"
    ]
  },
  {
    "id": "and-105",
    "category": "android",
    "level": "intermediate",
    "topic": "Compose state",
    "question": "Explain remember, rememberSaveable, mutableStateOf, and state hoisting.",
    "answer": "Compose state is **snapshot state**. `mutableStateOf` creates an observable. Reading it during composition **subscribes** that scope.\n\n- **`remember { }`** — keep the value across **recomposition**, lose it when the composable **leaves** (and on process death / rotation unless the remember is in a surviving owner).\n- **`rememberSaveable`** — also writes to a **Bundle** (primitives, Parcelable, `Saver`) so rotation/process death of the Activity can restore.\n- **State hoisting** — move state **up**; children receive `value` + `onValueChange`. Makes the child stateless and reusable.\n\nDo not `remember` a value that should live in a **ViewModel**. `remember` is for UI-only (animation, scroll state, derived UI). `rememberSaveable` is not a database.",
    "pdfTopic": false,
    "tags": [
      "remember",
      "rememberSaveable",
      "state hoisting"
    ]
  },
  {
    "id": "and-106",
    "category": "android",
    "level": "intermediate",
    "topic": "Modifier",
    "question": "What is Modifier in Jetpack Compose?",
    "answer": "**`Modifier`** is an ordered, immutable **decorator chain** for size, padding, clicks, graphics, semantics. Order **matters**: `padding` then `clickable` vs the reverse changes the hit box.\n\nPass modifiers in as a parameter (`modifier: Modifier = Modifier`) and apply to the **root** of the composable so callers control layout. Do not use multiple competing `fillMaxSize` randomly. Custom modifiers use `composed` or `Modifier.Node` (newer). Semantics modifiers (`contentDescription`) are your accessibility story.",
    "pdfTopic": false,
    "tags": [
      "Modifier",
      "Compose"
    ]
  },
  {
    "id": "and-107",
    "category": "android",
    "level": "intermediate",
    "topic": "CompositionLocal",
    "question": "What is CompositionLocal?",
    "answer": "**CompositionLocal** is implicit dependency passing down the tree (`LocalContext`, `LocalLifecycleOwner`, `MaterialTheme.colors` via locals). Provide with `CompositionLocalProvider`.\n\nUse for **theme, spacing, analytics**, not for a ViewModel of a screen (that hides dependencies and breaks previews). `compositionLocalOf` vs `staticCompositionLocalOf` (the latter skips subscribers on change — for truly stable things). Overuse recreates “Android globals.” Prefer parameters for business data.",
    "pdfTopic": false,
    "tags": [
      "CompositionLocal",
      "implicit passing"
    ]
  },
  {
    "id": "and-108",
    "category": "android",
    "level": "advanced",
    "topic": "SideEffect",
    "question": "When do you use SideEffect versus LaunchedEffect?",
    "answer": "**`SideEffect`** runs **after every successful composition**, on the **main thread**, **non-suspend**. Use it to **publish Compose state to non-Compose** objects (update an analytics object, write to a callback the parent still uses).\n\n**`LaunchedEffect`** is for **coroutines** and **keyed** one-shot/restartable suspend work. **`DisposableEffect`** is for subscribe/unsubscribe.\n\nIf you call a non-Compose setter during composition (not in SideEffect), you can do it **too early** or **too often** (including cancelled compositions). SideEffect waits until the composition **committed**. Do not do I/O in SideEffect.\n\nAlso know **`rememberUpdatedState`**: keep the latest lambda inside a long-lived `LaunchedEffect`/`DisposableEffect` so the effect does not restart when a callback identity changes.",
    "pdfTopic": false,
    "tags": [
      "SideEffect",
      "Compose"
    ]
  },
  {
    "id": "and-109",
    "category": "android",
    "level": "intermediate",
    "topic": "Compose Navigation",
    "question": "How does navigation work in Jetpack Compose?",
    "answer": "**Navigation-Compose** uses a `NavHost` + `NavController` with **string/type-safe routes**. Destinations are composables; the back stack is still a NavController.\n\n```kotlin\nNavHost(nav, startDestination = \"home\") {\n    composable(\"home\") { Home(onOpen = { nav.navigate(\"detail/$it\") }) }\n    composable(\"detail/{id}\", arguments = listOf(navArgument(\"id\") { type = NavType.StringType })) {\n        Detail(it.arguments?.getString(\"id\")!!)\n    }\n}\n```\n\nType-safe Kotlin DSL (`navigation-compose` + Serialization) is replacing raw strings. **SavedStateHandle** in ViewModels per back-stack entry. Nested graphs for bottom nav. Deep links as on Fragments. Avoid nesting multiple NavHosts without a reason.",
    "pdfTopic": false,
    "tags": [
      "NavHost",
      "Compose",
      "routes"
    ]
  },
  {
    "id": "and-110",
    "category": "android",
    "level": "advanced",
    "topic": "Compose stability",
    "question": "What are unstable types and @Stable / @Immutable in Compose?",
    "answer": "The compiler infers **stability**. A type is **stable** if the runtime can skip a composable when params **equal**.\n\n- **`@Immutable`** — you promise no mutation after creation (data class of vals, immutable collections).\n- **`@Stable`** — may mutate but **notifies** Compose (snapshot state inside).\n- **Unstable** — `List`, mutable Java beans, interfaces. Parents recompose children even when data “looks” the same.\n\nFix: immutable collections, copy data classes, `remember` lambdas, extract composables, compiler reports (`composeCompiler { reportsDestination }`). Lying with `@Immutable` on a mutable list causes **stale UI**, not just extra skips.",
    "pdfTopic": false,
    "tags": [
      "@Stable",
      "@Immutable",
      "compiler"
    ]
  },
  {
    "id": "and-111",
    "category": "android",
    "level": "intermediate",
    "topic": "rememberCoroutineScope",
    "question": "What is rememberCoroutineScope used for?",
    "answer": "**`rememberCoroutineScope()`** gives a `CoroutineScope` **tied to the composition**. Cancelled when the composable leaves. Use it to launch from **event callbacks** (button click) where you are not in a composable restart scope.\n\n```kotlin\nval scope = rememberCoroutineScope()\nButton(onClick = { scope.launch { snackbarHost.showSnackbar(\"Saved\") } }) { Text(\"Save\") }\n```\n\nDo **not** replace `LaunchedEffect` with it for load-on-enter (you would have to remember to launch once). Do **not** use it for ViewModel business work. It is the Compose analog of `lifecycleScope.launch` from a click listener.",
    "pdfTopic": false,
    "tags": [
      "rememberCoroutineScope",
      "Compose"
    ]
  },
  {
    "id": "and-112",
    "category": "android",
    "level": "advanced",
    "topic": "produceState",
    "question": "What does produceState do?",
    "answer": "**`produceState`** launches a coroutine (like LaunchedEffect) and **exposes a `State<T>`**. Useful when you have a suspend/callback API and want Compose state without a ViewModel for small UI.\n\n```kotlin\nval image by produceState<ImageBitmap?>(null, url) {\n    value = repo.loadBitmap(url)\n}\n```\n\nCancellation on leave/key change is built in. Prefer ViewModel for screen-level data so configuration changes do not refetch unless you want that. `produceState` is an adapter, not an architecture.",
    "pdfTopic": false,
    "tags": [
      "produceState",
      "Compose"
    ]
  },
  {
    "id": "and-113",
    "category": "android",
    "level": "advanced",
    "topic": "derivedStateOf",
    "question": "When should you use derivedStateOf?",
    "answer": "**`derivedStateOf`** caches a **computed value** and only invalidates readers when the **result** changes, even if inputs change more often.\n\nClassic: `listState.firstVisibleItemIndex > 0` to show a “scroll to top” FAB. The index changes every item, but the boolean flips rarely. Without `derivedStateOf`, every scroll frame recomposes the FAB’s parents.\n\nDo not wrap everything; it has bookkeeping cost. Use when a **high-frequency** state is reduced to a **low-frequency** snapshot. Combine with `remember`.",
    "pdfTopic": false,
    "tags": [
      "derivedStateOf",
      "Compose"
    ]
  },
  {
    "id": "and-114",
    "category": "android",
    "level": "advanced",
    "topic": "snapshotFlow",
    "question": "What is snapshotFlow?",
    "answer": "**`snapshotFlow { }`** turns **snapshot state reads** into a **cold Flow**. Each time those states change, it emits. You collect it in `LaunchedEffect`.\n\nUse cases: debounce scroll position to analytics, `snapshotFlow { pagerState.currentPage }.collect { vm.onPage(it) }` without recomposing a collector composable every frame.\n\nIt is the bridge **Compose state → coroutines**. Distinct until changed is often applied. Do not confuse with `callbackFlow` (callback APIs) or `Flow` from repositories (already flows).",
    "pdfTopic": false,
    "tags": [
      "snapshotFlow",
      "Compose"
    ]
  },
  {
    "id": "and-115",
    "category": "android",
    "level": "intermediate",
    "topic": "AndroidView interop",
    "question": "How do you mix Views and Compose (AndroidView)?",
    "answer": "**View → Compose:** `ComposeView.setContent { }` in XML/`Activity`. Use `DisposeOnViewTreeLifecycleDestroyed` strategy.\n\n**Compose → View:** **`AndroidView(factory = { ctx -> MapView(ctx) }, update = { it.overlay = ... })`**. Factory runs once; **update** runs on recomposition. Release in `onRelease` / `DisposableEffect` for MapView `onPause`/`onDestroy`.\n\n**`AndroidViewBinding`** inflates View Binding layouts. Data Binding XML can sit inside `AndroidView` but you still set variables in `update`. Interop is how you adopt Compose incrementally; measure because wrapping a heavy MapView in recomposing parents is costly.",
    "pdfTopic": false,
    "tags": [
      "AndroidView",
      "interop",
      "ComposeView"
    ]
  },
  {
    "id": "and-117",
    "category": "android",
    "level": "advanced",
    "topic": "Clean architecture",
    "question": "How do you modularize an Android app (clean architecture)?",
    "answer": "Typical layers:\n\n- **UI** (app/feature modules) — Compose/Activities, ViewModels.\n- **Domain** — use cases, pure Kotlin, no Android deps.\n- **Data** — repositories implementing domain ports, Retrofit, Room.\n\nGradle modules: `:app`, `:feature:feed`, `:core:ui`, `:core:model`, `:core:network`. **API vs impl** modules hide Retrofit. Features must not depend on each other; they depend on core.\n\nBenefits: compile times, clear ownership, replace data sources in tests. Over-modularizing a 4-screen app is ceremony. Interview: dependency **arrows point inward** toward domain.",
    "pdfTopic": false,
    "tags": [
      "modularization",
      "clean architecture",
      "layers"
    ]
  },
  {
    "id": "and-118",
    "category": "android",
    "level": "intermediate",
    "topic": "WorkManager vs coroutines",
    "question": "When do you use WorkManager versus a coroutine?",
    "answer": "**Coroutines** (`viewModelScope`, `lifecycleScope`) are for work **tied to an in-memory owner**. If the process dies, the job dies.\n\n**WorkManager** **persists** the request, survives process death and reboot (with constraints), and is visible to the OS job scheduler.\n\nUse coroutines for: fetch this screen’s data, debounce search. Use WorkManager for: upload a video after the user leaves, periodic sync, retry tomorrow. A **foreground Service + coroutine** is for **right now, user visible**. Do not wrap every `launch` in a Worker.",
    "pdfTopic": false,
    "tags": [
      "WorkManager",
      "coroutines",
      "background"
    ]
  },
  {
    "id": "and-119",
    "category": "android",
    "level": "advanced",
    "topic": "Foreground service types",
    "question": "What are foreground service types and why do they matter?",
    "answer": "From recent APIs, a foreground Service must declare **`android:foregroundServiceType`** in the manifest and pass types to `startForeground`. Types include **camera, microphone, location, connectedDevice, mediaPlayback, mediaProjection, phoneCall, health, remoteMessaging, shortService, specialUse, systemExempted, dataSync**.\n\nWrong type or missing type → **crash or blocked**. Play policy audits background location and microphone. `dataSync` and `mediaProcessing` have **time limits** on newer OS versions. `shortService` is a brief burst.\n\nInterview: “just startForeground” is no longer enough — **type + permission + notification** is the triad.",
    "pdfTopic": false,
    "tags": [
      "foregroundServiceType",
      "FGS",
      "Play policy"
    ]
  },
  {
    "id": "and-120",
    "category": "android",
    "level": "advanced",
    "topic": "Exact alarms",
    "question": "How do exact alarms work after Android 12+",
    "answer": "**Exact alarms** (`setExactAndAllowWhileIdle`) wake the device at a precise time. Abuse kills battery, so API 31+ requires **`SCHEDULE_EXACT_ALARM`** (or calendar/alarm clock **`USE_EXACT_ALARM`** for core clock apps).\n\nUsers can revoke the special access. Always **check** `canScheduleExactAlarms()` and fall back to **inexact** or **WorkManager**. Clock apps get a break; chat apps should not. Doze still exists — `setAndAllowWhileIdle` is not a license to poll every minute. Pair with a **BroadcastReceiver** that is **exported=false**.",
    "pdfTopic": false,
    "tags": [
      "AlarmManager",
      "SCHEDULE_EXACT_ALARM"
    ]
  },
  {
    "id": "and-121",
    "category": "android",
    "level": "advanced",
    "topic": "Background execution limits",
    "question": "What background execution limits should you know for interviews?",
    "answer": "Since **Oreo**, implicit broadcasts are limited and **background Services** cannot freely `startService` from the background — you must use **`startForegroundService`** and actually go foreground, or **JobScheduler/WorkManager**.\n\n**Doze** and **App Standby** delay jobs and networking. **Battery optimization** (OEM killers) can still stop you — be honest about that. **App hibernation** resets permissions. **Bounded foreground service durations** on Android 14+ for data sync/media processing.\n\nThe modern toolbox: FGS (typed), WorkManager, FCM high-priority (sparingly), exact alarms (privileged). “A sticky Service that never dies” is a 2014 answer.",
    "pdfTopic": false,
    "tags": [
      "Oreo",
      "Doze",
      "background"
    ]
  },
  {
    "id": "and-122",
    "category": "android",
    "level": "intermediate",
    "topic": "App Startup",
    "question": "What is the Jetpack App Startup library?",
    "answer": "**App Startup** lets libraries (and you) declare **`Initializer<T>`** in the manifest. A single **ContentProvider** runs them in **dependency order**, replacing each library’s own provider (which slows cold start).\n\n```kotlin\nclass LoggerInitializer : Initializer<Logger> {\n    override fun create(c: Context) = Logger.install(c)\n    override fun dependencies() = emptyList<Class<out Initializer<*>>>()\n}\n```\n\nDisable automatic init with manifest merge if you need lazy init. Measure **cold start** (`reportFullyDrawn`) before adding more work to `Application.onCreate` or initializers.",
    "pdfTopic": false,
    "tags": [
      "App Startup",
      "Initializer"
    ]
  },
  {
    "id": "and-123",
    "category": "android",
    "level": "advanced",
    "topic": "Baseline Profiles",
    "question": "What are Baseline Profiles and why do they matter?",
    "answer": "**Baseline Profiles** are ART profiles you **ship in the APK/AAB** listing hot methods (app startup, first frames, critical journeys). ART **AOT-compiles** those methods on install/cloud, so the first run is closer to a warmed JIT.\n\nGenerate with **Macrobenchmark** + `BaselineProfileRule`, put `baseline-prof.txt` in `src/main`. Play **Cloud Profiles** also gather real-user profiles. Pair with **R8** (keep names for measured methods) and **App Startup** hygiene.\n\nThis is the senior-level answer to “how do you make first frame faster besides shrinking XML.”",
    "pdfTopic": false,
    "tags": [
      "Baseline Profile",
      "ART",
      "startup"
    ]
  },
  {
    "id": "and-124",
    "category": "android",
    "level": "advanced",
    "topic": "R8 full mode",
    "question": "What is R8 full mode?",
    "answer": "**R8 full mode** (default in current AGP) applies **more aggressive** optimizations than “compat” ProGuard-like mode: additional inlining, assumption of no unknown reflection, more Kotlin metadata stripping.\n\nBreakage: Gson/Moshi without **`@Keep` / keep rules**, enum `valueOf`, Service loaders, navigation Safe Args, Retrofit interfaces if rules missing. `android.enableR8.fullMode=false` is a temporary escape, not a strategy.\n\nAlways **test minified release**. Keep rules belong next to the library that needs them. Full mode is why “it works in debug” is not a release test.",
    "pdfTopic": false,
    "tags": [
      "R8",
      "fullMode",
      "shrinking"
    ]
  },
  {
    "id": "and-125",
    "category": "android",
    "level": "advanced",
    "topic": "Network security config",
    "question": "What is network security config?",
    "answer": "**Network security config** is an XML resource (`res/xml/network_security_config.xml`) referenced from the manifest. It controls **cleartext**, **custom CAs**, **debug-only overrides**, and **certificate pinning**.\n\n```xml\n<network-security-config>\n  <base-config cleartextTrafficPermitted=\"false\" />\n  <debug-overrides>\n    <trust-anchors><certificates src=\"user\" /></trust-anchors>\n  </debug-overrides>\n</network-security-config>\n```\n\nUse debug-overrides so Charles works only on **debuggable** builds. Pin with `<pin-set>` + backup pins. This is the XML counterpart to OkHttp `CertificatePinner`. `usesCleartextTraffic` on `<application>` is the coarse switch; config is finer (per-domain).",
    "pdfTopic": false,
    "tags": [
      "networkSecurityConfig",
      "cleartext",
      "pinning"
    ]
  },
  {
    "id": "and-126",
    "category": "android",
    "level": "basic",
    "topic": "Android components",
    "question": "What are the four main Android application components?",
    "answer": "The framework building blocks declared in the manifest:\n\n- **Activity** — UI screen with a window.\n- **Service** — background work without a UI (or foreground with a notification).\n- **BroadcastReceiver** — short-lived reaction to system or app events.\n- **ContentProvider** — shared data API via URIs.\n\nAll can be started by the system via Intents (providers via ContentResolver). All have lifecycles and permission/export rules. Compose did not remove them; it lives **inside** an Activity (or a `ComposeView` in a fragment).",
    "pdfTopic": false,
    "tags": [
      "Activity",
      "Service",
      "BroadcastReceiver",
      "ContentProvider"
    ]
  },
  {
    "id": "and-127",
    "category": "android",
    "level": "intermediate",
    "topic": "Gradle flavors",
    "question": "What are build types and product flavors?",
    "answer": "**Build types** (`debug`, `release`) typically change minify, signing, `debuggable`. **Product flavors** (free/paid, staging/prod) change applicationId suffix, resources, endpoints.\n\nA **variant** is flavor × build type (`paidRelease`). `BuildConfig` fields and source sets (`src/paid/java`) overlay. Use flavors for **environment**, not for hiding unused code that R8 could strip — too many flavors explode CI time. Prefer **dimension** names (`env`, `store`).",
    "pdfTopic": false,
    "tags": [
      "buildTypes",
      "productFlavors",
      "variants"
    ]
  },
  {
    "id": "and-129",
    "category": "android",
    "level": "intermediate",
    "topic": "DataStore",
    "question": "How does Jetpack DataStore compare with SharedPreferences?",
    "answer": "**DataStore** writes are **transactional** (`edit { }`), exposed as **`Flow`**, and avoid many SharedPreferences **ANR/corruption** stories. Two flavors: **Preferences DataStore** (keys) and **Proto DataStore** (typed schema, migrations).\n\nIt is still **not encrypted by default**. Use it for flags, last-sync timestamps, user prefs. Combine with Remote Config (remote) vs DataStore (local cache). Coroutines make it trivial to collect in a ViewModel. One DataStore file per type; do not create the instance twice (`Singleton`).",
    "pdfTopic": false,
    "tags": [
      "DataStore",
      "Proto",
      "Flow"
    ]
  },
  {
    "id": "and-130",
    "category": "android",
    "level": "advanced",
    "topic": "Compose compiler reports",
    "question": "How do you diagnose unexpected recomposition?",
    "answer": "Three tools:\n\n- **Layout Inspector** (recompositions counts, skips).\n- **Compose compiler metrics** (`reportsDestination`, `stabilityConfigurationPath`) — which classes are unstable.\n- **`enableDebugTracing` / Logcat** with `RecomposeHighlighter` in debug.\n\nTypical bugs: **unstable lambdas** (`onClick = { vm.foo() }` capturing unstable vm), **new list every compose** (`list.filter` without remember), reading **Animatable** too high in the tree. Fix with `remember`, `derivedStateOf`, splitting composables, immutable models. This is the practical follow-up to the PDF recomposition question.",
    "pdfTopic": false,
    "tags": [
      "recomposition",
      "Layout Inspector",
      "compiler reports"
    ]
  },
  {
    "id": "and-131",
    "category": "android",
    "level": "basic",
    "topic": "Resources",
    "question": "How do Android resources and configuration qualifiers work?",
    "answer": "Resources (`res/layout`, `values`, `drawable`, `mipmap`) are compiled by **AAPT2** into **`R` ids** and binary XML. **Qualifiers** (`-land`, `-w600dp`, `-night`, `-hdpi`, `-en`) pick the best match at runtime.\n\n`strings.xml` for localization; never hardcode user-facing text. `dp` vs `sp` (fonts scale). `ViewBinding` uses these ids. Compose still uses resource wrappers (`stringResource`, `painterResource`) for the same files. Density buckets vs vectors is a size-vs-quality trade.",
    "pdfTopic": false,
    "tags": [
      "resources",
      "qualifiers",
      "R class"
    ]
  },
  {
    "id": "and-132",
    "category": "android",
    "level": "intermediate",
    "topic": "WindowInsets",
    "question": "How do you handle status bar, IME, and display cutouts?",
    "answer": "Modern apps draw **edge-to-edge**. **WindowInsets** describe system bars, IME, cutouts, nav gestures. In Views: `WindowCompat.setDecorFitsSystemWindows(window, false)` + `ViewCompat.setOnApplyWindowInsetsListener` or padding helpers. In Compose: `WindowInsets`, `Modifier.windowInsetsPadding`, `imePadding()`, `enableEdgeToEdge()`.\n\nIgnoring insets puts buttons under the nav bar. IME: `WindowInsets.ime` and `imeNestedScroll` for chat lists. Cutouts: `safeDrawing`. This is a frequent “why is my toolbar overlapping the camera hole?” interview.",
    "pdfTopic": false,
    "tags": [
      "WindowInsets",
      "edge-to-edge",
      "IME"
    ]
  },
  {
    "id": "and-133",
    "category": "android",
    "level": "advanced",
    "topic": "Play App Signing",
    "question": "What is Play App Signing and how does it relate to upload keys?",
    "answer": "With **Play App Signing**, Google holds the **app signing key** that users’ devices trust. You sign uploads with an **upload key**. If the upload key leaks, you **reset** it in Play Console; the **app signing key** stays stable so updates continue.\n\nKeep `keystore.jks` out of git; CI uses a secret. `signingConfig` in release must match. App Bundles **require** Play signing for Play distribution. Losing the **signing** key without Play App Signing means you **cannot update** the listing — that is the horror story they want.",
    "pdfTopic": false,
    "tags": [
      "signing",
      "Play",
      "upload key"
    ]
  }
];
