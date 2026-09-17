window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.kotlin = (window.QA_BANK.kotlin || []).concat([
  {
    "id": "kot-118",
    "category": "kotlin",
    "level": "basic",
    "topic": "Kotlin history",
    "question": "Where did Kotlin come from, and how does it run on Android?",
    "answer": "JetBrains announced Kotlin in 2011; 1.0 shipped in 2016. Google made it a first-class Android language in 2017 and the preferred language later. `kotlinc` emits JVM bytecode; Android’s D8/R8 turn that into DEX, same as Java.\n\nKotlin/JS, Kotlin/Native, and **Kotlin Multiplatform** are other backends. Android UI still uses the JVM/ART backend.",
    "pdfTopic": false,
    "tags": [
      "history",
      "android"
    ]
  },
  {
    "id": "kot-119",
    "category": "kotlin",
    "level": "basic",
    "topic": "Primitives and macros",
    "question": "Does Kotlin have primitive types or macros?",
    "answer": "In **source**, you write `Int`, `Double`, not `int`. The compiler maps non-nullable `Int` to the JVM primitive `int` and `Int?` to `Integer`. There are no C-style **macros** — use inline functions, const vals, and compiler plugins instead.\n\n`IntArray` is a primitive array (`int[]`). `Array<Int>` is `Integer[]` and boxes. They are **not** interchangeable.",
    "pdfTopic": false,
    "tags": [
      "primitives",
      "arrays"
    ]
  },
  {
    "id": "kot-120",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "fold vs reduce",
    "question": "What is the difference between fold and reduce?",
    "answer": "`reduce` uses the first element as the starting accumulator; it throws on an empty collection. `fold` takes an **explicit initial value**, so empty collections are fine.\n\n`fold(0) { acc, n -> acc + n }` vs `reduce { acc, n -> acc + n }`. Use fold when the result type differs from the element type (fold a List<Item> into a Map).",
    "pdfTopic": false,
    "tags": [
      "collections"
    ]
  },
  {
    "id": "kot-121",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "JVM annotations",
    "question": "What are @JvmStatic, @JvmOverloads, and @JvmField for?",
    "answer": "They shape **Java interop**:\n- **@JvmStatic** — emit a real static method on the companion’s outer class.\n- **@JvmOverloads** — generate Java overloads for default parameters.\n- **@JvmField** — expose a property as a public field instead of getters.\n\nWithout them, Java callers write `Foo.Companion.getX()` and cannot see default args.",
    "pdfTopic": false,
    "tags": [
      "interop",
      "java"
    ]
  },
  {
    "id": "kot-122",
    "category": "kotlin",
    "level": "basic",
    "topic": "File extensions",
    "question": "Name some Kotlin extension helpers on java.io.File.",
    "answer": "The stdlib adds `File.readText()`, `readLines()`, `writeText()`, `forEachLine`, `copyTo`, `extension`, `nameWithoutExtension`, and `bufferedReader()`. They still use Java I/O underneath — close streams, watch encodings, and prefer `kotlinx.io` / Okio on Android for large files.\n\nThis question checks whether you know the **stdlib extensions** layer over JDK types.",
    "pdfTopic": false,
    "tags": [
      "stdlib",
      "io"
    ]
  },
  {
    "id": "kot-123",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Kotlin Native and KMP",
    "question": "What is Kotlin/Native vs Kotlin Multiplatform?",
    "answer": "**Kotlin/Native** compiles to native binaries via LLVM (iOS, Linux, Windows). **KMP** shares **common** Kotlin across JVM, Native, and JS with `expect`/`actual` for platform APIs.\n\nAndroid UI stays on the JVM. Shared domain/data layers are the usual KMP pitch. Kotlin/Native memory model is now an ordinary GC; the old frozen/worker model is historical.",
    "pdfTopic": false,
    "tags": [
      "kmp",
      "native"
    ]
  },
  {
    "id": "kot-124",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Lambda vs anonymous function",
    "question": "How does a lambda differ from an anonymous function?",
    "answer": "A lambda `{ x -> x + 1 }` has inferred return; a `return` inside a non-inline lambda returns from the lambda only if you use labels, and non-local return is reserved for **inline** lambdas. An **anonymous function** `fun(x: Int): Int { return x + 1 }` has an explicit return type and `return` always returns from that function.\n\nLambdas cannot specify a return type except via inference; anonymous functions can.",
    "pdfTopic": false,
    "tags": [
      "lambda"
    ]
  },
  {
    "id": "kot-125",
    "category": "kotlin",
    "level": "basic",
    "topic": "Type inference",
    "question": "What is type inference in Kotlin?",
    "answer": "The compiler infers types from the right-hand side (`val name = \"Ada\"` is `String`) and from lambda parameters when the target type is known. You still write types on **public APIs**, and when inference would pick something too wide (`Number`) or when the RHS is null without a type (`val x = null` is illegal without `val x: String? = null`).\n\n`kotlinc` is not a dynamic language — inference is compile-time only.",
    "pdfTopic": false,
    "tags": [
      "types"
    ]
  },
  {
    "id": "kot-126",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Thread vs coroutine",
    "question": "What is the difference between a thread and a coroutine?",
    "answer": "A **thread** is an OS/JVM scheduled stack with ~MB-scale cost. A **coroutine** is a compiler-transformed state machine that **suspends** without blocking the underlying thread. Many coroutines share a few threads (Dispatchers).\n\n`Thread.sleep` blocks a worker; `delay` suspends. You still need Dispatchers.IO for blocking APIs. Coroutines are not magic parallelism — CPU work still needs threads.",
    "pdfTopic": false,
    "tags": [
      "coroutines"
    ]
  },
  {
    "id": "kot-127",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Kotlin limitations",
    "question": "When would you not use Kotlin, or what limitations should you mention?",
    "answer": "Interop with some Java generics/wildcards is ugly. Annotation processing was historically slower (kapt). Compile times can exceed plain Java on huge modules. Kotlin/Native and KMP add toolchain complexity. Very old Android toolchains lagged.\n\nTeams still pick Kotlin because null safety, coroutines, and Android-first APIs outweigh those costs. “Never use Kotlin” is not a serious Android answer in 2026.",
    "pdfTopic": false,
    "tags": [
      "tradeoffs"
    ]
  },
  {
    "id": "kot-128",
    "category": "kotlin",
    "level": "basic",
    "topic": "Collection helpers",
    "question": "How do you sort, find, remove, group, and generate sequences in Kotlin?",
    "answer": "- Sort: `sorted()`, `sortedBy { }`, `sort()` on MutableList.\n- Find: `find`, `firstOrNull`, `singleOrNull`.\n- Remove: `filterNot`, `minus`, `removeAll` on mutable lists — prefer immutable copies in UI state.\n- Group: `groupBy { it.category }`.\n- Sequences: `generateSequence(0) { it + 1 }`, `sequence { yield(...) }` for lazy pipelines.\n\nKnow the difference between `list.filter` (eager) and `list.asSequence().filter` (lazy).",
    "pdfTopic": false,
    "tags": [
      "collections"
    ]
  },
  {
    "id": "kot-129",
    "category": "kotlin",
    "level": "basic",
    "topic": "Decompile Kotlin",
    "question": "How can you see the Java equivalent of Kotlin code?",
    "answer": "In IntelliJ/Android Studio: **Tools → Kotlin → Show Kotlin Bytecode → Decompile**. That is a teaching tool, not a shipping step. You do not convert `.kt` to maintain `.java` in production.\n\nUse it to explain default parameters (`$default` methods), `object` singletons (`INSTANCE`), and checked-exception wrappers (`@Throws`).",
    "pdfTopic": false,
    "tags": [
      "tooling",
      "interop"
    ]
  },
  {
    "id": "kot-130",
    "category": "kotlin",
    "level": "basic",
    "topic": "Paradigms",
    "question": "What programming styles does Kotlin support?",
    "answer": "Kotlin is a **pragmatic OOP + functional** language: classes and inheritance, plus higher-order functions, immutability by convention, and sealed hierarchies instead of visitor boilerplate. It is not a pure FP language (no built-in HKTs).\n\nAndroid code is typically OOP modules with functional collection/Flow pipelines inside.",
    "pdfTopic": false,
    "tags": [
      "oop",
      "fp"
    ]
  },
  {
    "id": "kot-131",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Reified and inline recap",
    "question": "Why can you write `inline fun <reified T>` but not a normal generic `T::class`?",
    "answer": "JVM generics are erased. An **inline** function is copied to the call site, so `T` can be **reified** and you can use `T::class`, `is T`, and `json.decodeFromString<T>()`.\n\nA non-inline `fun <T>` cannot. This is a favorite Kotlin interview trap.",
    "pdfTopic": false,
    "tags": [
      "reified",
      "inline"
    ]
  },
  {
    "id": "kot-132",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Delegation pattern",
    "question": "How does `by` class delegation work besides property delegates?",
    "answer": "`class LoggingList<T>(inner: MutableList<T>) : MutableList<T> by inner` forwards interface methods to `inner`. You override only what you need. This is the ** Delegation pattern** without wrapping twenty methods by hand.\n\nDifferent from `by lazy` (property delegate). Both use the `by` keyword.",
    "pdfTopic": false,
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "kot-133",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Context receivers and parameters",
    "question": "What are context parameters / receivers in Kotlin?",
    "answer": "They let you require a type to be **in scope** without passing it as a normal argument (evolving from experimental context receivers toward **context parameters**). Used in DSLs and Android Compose-like APIs.\n\nSay “experimental/evolving” in interviews and do not pretend every team uses them. Regular extension functions cover most needs.",
    "pdfTopic": false,
    "tags": [
      "language"
    ]
  }
]);
