window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.kotlin = (window.QA_BANK.kotlin || []).concat([
  {
    "id": "kot-134",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Mutex vs actor",
    "question": "How do you protect shared mutable state: Mutex, actor, or confine to a thread?",
    "answer": "**Confine** state to one coroutine/thread (simplest). **Mutex** (`kotlinx.coroutines.sync`) is a non-blocking lock for coroutines — never combine with `synchronized` on the same path casually. **Actor** (obsolete-ish) / a single coroutine looping on a Channel serializes events.\n\nOn Android, a `ViewModel` + `MutableStateFlow` updates on one dispatcher is usually enough. Mutex around Room is usually the wrong layer (Room already serializes DAOs you configure).",
    "pdfTopic": false,
    "tags": [
      "coroutines",
      "mutex"
    ]
  },
  {
    "id": "kot-135",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Flow sharing",
    "question": "Compare `shareIn` vs `stateIn` vs `callbackFlow` sharing mistakes.",
    "answer": "`callbackFlow` is **cold** — each collector starts a new callback. `shareIn` makes a **hot SharedFlow** with a start policy (`WhileSubscribed`, `Eagerly`, `Lazily`). `stateIn` is SharedFlow + replay=1 + a current value (`StateFlow`).\n\n`WhileSubscribed(5000)` avoids restarting upstream on config change. Sharing a cold network Flow with `Eagerly` in a ViewModel that outlives the screen wastes battery.",
    "pdfTopic": false,
    "tags": [
      "flow"
    ]
  },
  {
    "id": "kot-136",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Flow operators timing",
    "question": "When do you use debounce, sample, conflate, and collectLatest?",
    "answer": "- **debounce** — wait until the user paused typing.\n- **sample** — emit the latest every T.\n- **conflate** — skip intermediate values if collector is slow.\n- **collectLatest** — cancel the previous collector block when a new item arrives.\n\nSearch boxes: debounce + `flatMapLatest`. UI state: `collectLatest` or `stateIn`. Misusing `map` instead of `flatMapLatest` stacks overlapping requests.",
    "pdfTopic": false,
    "tags": [
      "flow"
    ]
  },
  {
    "id": "kot-137",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Continuation interceptor",
    "question": "What is a ContinuationInterceptor and how do dispatchers use it?",
    "answer": "Dispatchers implement **ContinuationInterceptor** in the `CoroutineContext`. On suspend, the continuation is intercepted and **resumed** on the right thread. That is thread shifting.\n\n`withContext` installs another interceptor for a block. `Dispatchers.Unconfined` resumes on whatever thread the suspend function used — dangerous on Android if that was a binder thread.",
    "pdfTopic": false,
    "tags": [
      "coroutines"
    ]
  },
  {
    "id": "kot-138",
    "category": "kotlin",
    "level": "advanced",
    "topic": "NonCancellable",
    "question": "When do you need `withContext(NonCancellable)`?",
    "answer": "During cancellation, suspend functions abort. Cleanup that must **complete** (close a socket, ack a message) runs in `NonCancellable` so `delay`/`finally` actually run.\n\nOveruse ignores cancellation and hangs shutdown. Prefer `finally` plus closing APIs that are cancellation-safe.",
    "pdfTopic": false,
    "tags": [
      "cancellation"
    ]
  },
  {
    "id": "kot-139",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "runCatching",
    "question": "How do `runCatching` and `Result` compare with exceptions?",
    "answer": "`runCatching { }` returns `Result<T>` instead of throwing. Useful at API boundaries. Do not wrap **everything** — you lose structured tracing and coroutine cancellation (`CancellationException` must be rethrown).\n\nAlways `result.onFailure { if (it is CancellationException) throw it }`. This is a common coroutine bug.",
    "pdfTopic": false,
    "tags": [
      "result"
    ]
  },
  {
    "id": "kot-140",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Sealed interfaces",
    "question": "When is a sealed interface better than a sealed class?",
    "answer": "A **sealed interface** can be implemented by objects, classes, and even existing types in the same module (with limits). Use it for a union of types that already have a hierarchy (`sealed interface UiState` with data objects).\n\nSealed **class** when you need shared constructor state. Both give exhaustive `when`.",
    "pdfTopic": false,
    "tags": [
      "sealed"
    ]
  },
  {
    "id": "kot-141",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Property delegates map",
    "question": "How do map delegates and `observable`/`vetoable` work?",
    "answer": "`var name: String by map` reads/writes a `MutableMap`. `Delegates.observable` fires after change; **vetoable** can reject. Custom `ReadWriteProperty` implements `getValue`/`setValue` with an `operator`.\n\nAndroid: `by viewModels()`, `by extra()`, `by navArgs()` are property delegates. They are not magic fields — they cache in getters.",
    "pdfTopic": false,
    "tags": [
      "delegates"
    ]
  },
  {
    "id": "kot-142",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Value class boxing",
    "question": "When do value classes box, and why does it matter on Android?",
    "answer": "`@JvmInline value class UserId(val raw: String)` avoids a wrapper at many call sites. It **boxes** when used as a generic `List<UserId>`, nullable `UserId?`, or a non-inlined generic parameter.\n\nOveruse can increase allocations (the opposite of the goal) and hurt identity (`===`). Measure. Good for units (meters, ids) on hot paths that stay non-generic.",
    "pdfTopic": false,
    "tags": [
      "value-class"
    ]
  },
  {
    "id": "kot-143",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Contracts",
    "question": "What are Kotlin contracts?",
    "answer": "`contract { returns() implies (x != null) }` teaches the compiler smart-casts for library functions (`require`, `check`, `isNullOrEmpty`). They are **experimental-ish/internal** for most app code.\n\nYou rarely write contracts; you benefit from them. Do not claim you need them to write an app.",
    "pdfTopic": false,
    "tags": [
      "compiler"
    ]
  },
  {
    "id": "kot-144",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "expect actual",
    "question": "How do expect/actual work in Kotlin Multiplatform?",
    "answer": "`expect fun hash(bytes: ByteArray): String` in common code; **actual** implementations per platform (Android MessageDigest, iOS CommonCrypto). Types, annotations, and classes can be expect/actual.\n\nKeep expects small. If common code is full of expects, you have not designed a real shared layer.",
    "pdfTopic": false,
    "tags": [
      "kmp"
    ]
  },
  {
    "id": "kot-145",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Serialization polymorphism",
    "question": "How does kotlinx.serialization handle polymorphic types?",
    "answer": "Register subclasses with `@Serializable` + `SerializersModule { polymorphic(Base::class) { subclass(A::class) } }` or sealed class (which is closed and generates a discriminator).\n\nJSON needs a class discriminator field. Forgetting the module yields “polymorphic serializer not found.” Prefer sealed hierarchies for API DTOs.",
    "pdfTopic": false,
    "tags": [
      "serialization"
    ]
  },
  {
    "id": "kot-146",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "limitedParallelism",
    "question": "What does `Dispatchers.IO.limitedParallelism(n)` do?",
    "answer": "It creates a **view** of IO with at most n concurrent tasks, without building a new thread pool. Use it to bound calls to a fragile backend or a disk bottleneck.\n\nIt is not a replacement for a well-sized OkHttp dispatcher. Nested `withContext(IO)` still uses the same underlying pool.",
    "pdfTopic": false,
    "tags": [
      "dispatchers"
    ]
  },
  {
    "id": "kot-147",
    "category": "kotlin",
    "level": "advanced",
    "topic": "select expression",
    "question": "What is `select` in kotlinx.coroutines?",
    "answer": "`select` waits on **the first** of several clauses: channel `onReceive`, `onSend`, `onTimeout`, deferred `onAwait`. It is how you race requests or implement fan-in.\n\nEasy to leak if you do not cancel losers. Often `coroutineScope` + `async` + cancel is clearer. Know it exists for senior coroutine rounds.",
    "pdfTopic": false,
    "tags": [
      "select",
      "channels"
    ]
  },
  {
    "id": "kot-148",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Sequence builders",
    "question": "How does `sequence { yield() }` differ from Flow?",
    "answer": "A **sequence** is synchronous and lazy on the **caller thread**. `yield` does not suspend across threads. **Flow** can suspend, change dispatchers, and handle backpressure-ish collection.\n\nUse sequences for CPU list pipelines. Use Flow for async streams. Calling `delay` inside `sequence {}` is a smell (you would use `sequence` incorrectly).",
    "pdfTopic": false,
    "tags": [
      "sequence",
      "flow"
    ]
  },
  {
    "id": "kot-149",
    "category": "kotlin",
    "level": "advanced",
    "topic": "IR compiler",
    "question": "What is the Kotlin IR compiler backend, and why did Android care?",
    "answer": "The **IR** (intermediate representation) backend replaced the old class-file backend. It enables Compose compiler plugins, better inlining, and K2. Compose **requires** the IR/plugin pipeline.\n\nK2 is the new frontend (faster, new type inference). Interview answer: “Compose compiler plugin sits on Kotlin IR; version alignment between Kotlin and Compose BOM matters.”",
    "pdfTopic": false,
    "tags": [
      "compiler",
      "compose"
    ]
  },
  {
    "id": "kot-150",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Backing fields",
    "question": "What is a backing field, and when do you use `_state` vs `field`?",
    "answer": "Inside a property accessor, **`field`** is the generated storage. Custom getters without `field` are computed properties. For encapsulated MutableStateFlow: `private val _ui = MutableStateFlow(...); val ui: StateFlow = _ui`.\n\nDo not expose `MutableStateFlow` to the UI. That is the Kotlin version of “don’t expose mutable public fields.”",
    "pdfTopic": false,
    "tags": [
      "properties"
    ]
  },
  {
    "id": "kot-151",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Coroutine cancellation traps",
    "question": "Name cancellation traps besides forgetting to rethrow CancellationException.",
    "answer": "`try/catch (Exception)` swallows cancellation. `withContext(NonCancellable)` too wide. CPU loops without `ensureActive()`. Callback APIs that ignore `invokeOnCancellation`. `Flow.catch` that hides upstream cancel.\n\n`suspendCancellableCoroutine` must `cont.invokeOnCancellation { unregister() }`. Otherwise you leak listeners and resume twice.",
    "pdfTopic": false,
    "tags": [
      "cancellation"
    ]
  },
  {
    "id": "kot-152",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Collection builders",
    "question": "What are `buildList` / `buildMap` and why are they safer than mutating then exposing?",
    "answer": "`buildList { add(...) }` constructs then returns an **opaque list** (read-only view). You mutate only inside the builder. That prevents leaking a `MutableList` you later `add` from a background thread.\n\nPrefer this over `apply { add }` on a `mutableListOf` you return as `List` (still mutable underneath if you return the same instance).",
    "pdfTopic": false,
    "tags": [
      "collections"
    ]
  },
  {
    "id": "kot-153",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Dispatchers.Main.immediate",
    "question": "What is `Dispatchers.Main.immediate`?",
    "answer": "If you are **already** on the main thread, `immediate` runs the continuation **now** without posting to the looper. `Dispatchers.Main` always posts, which can add a frame of delay.\n\nCompose and Android KTX often use immediate to avoid extra hops. Using it from a background thread still hops to main. Nested immediate calls can surprise reentrancy.",
    "pdfTopic": false,
    "tags": [
      "dispatchers",
      "android"
    ]
  }
]);
