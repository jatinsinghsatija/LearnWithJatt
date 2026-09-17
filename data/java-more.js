window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.java = (window.QA_BANK.java || []).concat([
  {
    "id": "jav-115",
    "category": "java",
    "level": "intermediate",
    "topic": "HashMap internals",
    "question": "How does HashMap resize and treeify?",
    "answer": "Buckets are an array of nodes. Colliding keys chain (then **treeify** at 8 nodes if the table is large enough, untreeify at 6). Load factor 0.75 triggers **resize** to 2× capacity, rehashing bits.\n\nJava 8+ trees are red-black on hash+comparable. Bad `hashCode` (everything collides) degrades to O(n). Null key lives in bucket 0. Capacity is always a power of two.",
    "pdfTopic": false,
    "tags": [
      "hashmap"
    ]
  },
  {
    "id": "jav-116",
    "category": "java",
    "level": "intermediate",
    "topic": "ConcurrentHashMap bins",
    "question": "How does ConcurrentHashMap avoid locking the whole table?",
    "answer": "It uses **CAS** on bins plus lock-per-bin for lists/trees. Size is estimated with base + counter cells (LongAdder style). Iterators are weakly consistent, not fail-fast.\n\nNull keys/values are forbidden (unlike HashMap) because null is ambiguous under concurrency. `compute`/`merge` are atomic per key.",
    "pdfTopic": false,
    "tags": [
      "concurrency",
      "map"
    ]
  },
  {
    "id": "jav-117",
    "category": "java",
    "level": "intermediate",
    "topic": "CopyOnWriteArrayList",
    "question": "When is CopyOnWriteArrayList the right List?",
    "answer": "Every mutation **copies the array**. Iterators see a snapshot and never throw CME. Great for few writes, many reads (listener lists). Terrible for heavy writes.\n\nDo not use it as a default thread-safe ArrayList — a synchronized list or concurrent queue is often cheaper.",
    "pdfTopic": false,
    "tags": [
      "collections",
      "concurrency"
    ]
  },
  {
    "id": "jav-118",
    "category": "java",
    "level": "intermediate",
    "topic": "Synchronizers",
    "question": "Compare CountDownLatch, CyclicBarrier, Semaphore, and Phaser.",
    "answer": "- **CountDownLatch** — one-shot wait for N events.\n- **CyclicBarrier** — N threads wait, then trip, reusable.\n- **Semaphore** — N permits (rate limit, pool).\n- **Phaser** — dynamic party count, phases.\n\nLatch cannot reset. Barrier `await` throws `BrokenBarrierException` if a party fails. Prefer these over wait/notify for structured coordination.",
    "pdfTopic": false,
    "tags": [
      "concurrency"
    ]
  },
  {
    "id": "jav-119",
    "category": "java",
    "level": "intermediate",
    "topic": "ForkJoinPool",
    "question": "What is ForkJoinPool and work stealing?",
    "answer": "A pool of worker threads each with a deque. Tasks `fork` subtasks; idle workers **steal** from others. `ForkJoinTask` / `RecursiveTask` / parallel streams use the **common pool**.\n\nDo not block the common pool with I/O (`ManagedBlocker` or a separate pool). `parallelStream()` on a tiny list is slower, not faster.",
    "pdfTopic": false,
    "tags": [
      "forkjoin"
    ]
  },
  {
    "id": "jav-120",
    "category": "java",
    "level": "intermediate",
    "topic": "CompletableFuture",
    "question": "How do you compose CompletableFuture and handle errors?",
    "answer": "`supplyAsync` → `thenApply` (map) → `thenCompose` (flatMap) → `thenCombine` (zip). Async variants take an executor. **`exceptionally` / `handle` / `whenComplete`** deal with failures; uncaught exceptions complete the future exceptionally.\n\n`get()` blocks and wraps in `ExecutionException`. Prefer `join()` in known-complete tests. Always pass a dedicated executor in servers — do not saturate `ForkJoinPool.commonPool()`.",
    "pdfTopic": false,
    "tags": [
      "completablefuture"
    ]
  },
  {
    "id": "jav-121",
    "category": "java",
    "level": "advanced",
    "topic": "VarHandle and memory",
    "question": "What are VarHandles, and how do they relate to volatile?",
    "answer": "**VarHandle** (Java 9) is the typed, safer replacement for much of Unsafe: get/set with **plain, opaque, acquire/release, volatile** modes. They expose the Java Memory Model explicitly.\n\n`volatile` is acquire/release + sequential consistency for that variable. VarHandles let you do weaker orderings for performance. Interviewers want “I do not invent my own memory barrier with `synchronized` around an int unless I must.”",
    "pdfTopic": false,
    "tags": [
      "jmm",
      "varhandle"
    ]
  },
  {
    "id": "jav-122",
    "category": "java",
    "level": "advanced",
    "topic": "Escape analysis",
    "question": "What is escape analysis, and when are objects allocated on the stack?",
    "answer": "The JIT proves an object does not **escape** the thread/method. Then it can **scalar-replace** (explode fields into registers) and skip heap allocation.\n\nThis is why microbenchmarks lie: a `new Point()` in a hot loop may allocate nothing in production JIT, then allocate under a profiler. Use JMH, not a `for` in `main`.",
    "pdfTopic": false,
    "tags": [
      "jit"
    ]
  },
  {
    "id": "jav-123",
    "category": "java",
    "level": "advanced",
    "topic": "G1 and ZGC",
    "question": "How do G1 and ZGC differ at a high level?",
    "answer": "**G1** collects **regions**, aiming for pause-time goals, mixed young/old collections, remembered sets. **ZGC** (and Shenandoah) are **concurrent compacting** collectors with colored pointers / load barriers and millisecond pauses even on large heaps.\n\nAndroid ART is not G1/ZGC. This is a Java-SE / backend question. Know `-Xmx`, pause goals, and that throughput vs latency is a tradeoff.",
    "pdfTopic": false,
    "tags": [
      "gc"
    ]
  },
  {
    "id": "jav-124",
    "category": "java",
    "level": "advanced",
    "topic": "Metaspace",
    "question": "What is Metaspace vs the old PermGen?",
    "answer": "Class metadata moved from **PermGen** (fixed, `OutOfMemoryError: PermGen`) to **Metaspace** (native memory, Java 8+). Unloading loaders reclaims it. Leaking class loaders (hot reload, generated proxies) still OOMs Metaspace.\n\n`-XX:MaxMetaspaceSize` caps it. Android has DEX/ART, not Metaspace, but Java interviews still ask.",
    "pdfTopic": false,
    "tags": [
      "jvm",
      "metaspace"
    ]
  },
  {
    "id": "jav-125",
    "category": "java",
    "level": "intermediate",
    "topic": "NIO",
    "question": "When do you use NIO Channels and Selectors vs java.io streams?",
    "answer": "**java.io** is stream/blocking and simple. **NIO** `Channel` + `ByteBuffer` + `Selector` enables one thread to multiplex many sockets (non-blocking). Direct buffers live off-heap (faster I/O, harder GC).\n\nNIO.2 `AsynchronousSocketChannel` / `Files` is the newer API. Android apps rarely write selectors; servers and some file copy paths do.",
    "pdfTopic": false,
    "tags": [
      "nio"
    ]
  },
  {
    "id": "jav-126",
    "category": "java",
    "level": "intermediate",
    "topic": "Externalizable",
    "question": "How does Externalizable differ from Serializable?",
    "answer": "`Serializable` is marker + default reflection protocol (`serialVersionUID`). **`Externalizable`** you implement `writeExternal`/`readExternal` — full control, typically faster and stabler.\n\nBoth are a poor RPC format. Prefer JSON/protobuf. If you must, set `serialVersionUID` explicitly or compatible class changes break streams.",
    "pdfTopic": false,
    "tags": [
      "serialization"
    ]
  },
  {
    "id": "jav-127",
    "category": "java",
    "level": "advanced",
    "topic": "Dynamic proxy",
    "question": "How does `java.lang.reflect.Proxy` work?",
    "answer": "`Proxy.newProxyInstance` builds a class that implements interfaces and forwards to an `InvocationHandler`. Retrofit, testing mocks, and Spring AOP (JDK proxies) use this.\n\nOnly **interfaces** (class proxies need CGLIB/ByteBuddy). Slow, not for hot inner loops. Handler exceptions wrap in `UndeclaredThrowableException` if unchecked rules are violated.",
    "pdfTopic": false,
    "tags": [
      "proxy",
      "reflection"
    ]
  },
  {
    "id": "jav-128",
    "category": "java",
    "level": "intermediate",
    "topic": "SPI",
    "question": "What is the Service Provider Interface (ServiceLoader)?",
    "answer": "A provider interface plus `META-INF/services/com.foo.Bar` listing implementations. `ServiceLoader.load` finds them. JDBC drivers, charset providers, and Java modules (`provides`/`uses`) use this.\n\nAndroid: prefer explicit Dagger bindings; `ServiceLoader` + R8 needs keep rules because it is reflection on resource files.",
    "pdfTopic": false,
    "tags": [
      "spi"
    ]
  },
  {
    "id": "jav-129",
    "category": "java",
    "level": "advanced",
    "topic": "ClassLoader hierarchy",
    "question": "Describe the ClassLoader delegation model.",
    "answer": "Typically **parent-first**: bootstrap → platform/extension → application/system. A loader asks its parent before loading. Tomcat/Android plugin systems sometimes invert this (child-first) for isolation.\n\n`Class.forName` uses the caller’s loader. Leaking a loader (static cache of classes) is a classic metaspace leak. Android has PathClassLoader / InMemoryDexFile instead of a desktop classpath.",
    "pdfTopic": false,
    "tags": [
      "classloader"
    ]
  },
  {
    "id": "jav-130",
    "category": "java",
    "level": "intermediate",
    "topic": "java.time",
    "question": "Why did java.time replace Date and Calendar?",
    "answer": "`Date` is mutable and poorly named; `Calendar` is cumbersome. **`java.time`** (`Instant`, `ZonedDateTime`, `LocalDate`, `Duration`) is immutable, explicit about time zones, and ISO-friendly.\n\n`LocalDateTime` has **no zone** — do not store it as an instant. Android desugars java.time via core library desugaring. Joda-Time is legacy.",
    "pdfTopic": false,
    "tags": [
      "datetime"
    ]
  },
  {
    "id": "jav-131",
    "category": "java",
    "level": "intermediate",
    "topic": "Parallel streams",
    "question": "When are parallel streams a bad idea?",
    "answer": "They use the **common ForkJoinPool**. Bad for: tiny collections, blocking I/O, shared mutable reducers, Android main-thread (starves UI if misused), and order-sensitive ops without care.\n\nUse `stream()` by default. Parallel only with CPU-heavy, independent, large data and measurements.",
    "pdfTopic": false,
    "tags": [
      "streams"
    ]
  },
  {
    "id": "jav-132",
    "category": "java",
    "level": "advanced",
    "topic": "Direct ByteBuffer",
    "question": "What is a direct ByteBuffer and what can go wrong?",
    "answer": "Allocated off-heap (`allocateDirect`) for native I/O. GC does not see the payload; cleanup is via Cleaner / `sun.misc.Unsafe` historically, now `MemorySegment` (Panama) on newer JDKs.\n\nYou can native-OOM without a large Java heap. `ByteBuffer` is not thread-safe. Slicing shares backing memory.",
    "pdfTopic": false,
    "tags": [
      "nio",
      "memory"
    ]
  },
  {
    "id": "jav-133",
    "category": "java",
    "level": "intermediate",
    "topic": "Optional pitfalls",
    "question": "How should you not use Optional?",
    "answer": "Do not use Optional for **fields**, beans, or as a parameter everywhere. Do not call `get()` without `isPresent`. Do not `Optional.of(null)`. Prefer `orElseGet` over `orElse` when the fallback is expensive.\n\nOptional is a **return type** for “maybe a value” on streams/APIs, not a replacement for null in the entire codebase.",
    "pdfTopic": false,
    "tags": [
      "optional"
    ]
  },
  {
    "id": "jav-134",
    "category": "java",
    "level": "advanced",
    "topic": "StampedLock",
    "question": "What is StampedLock?",
    "answer": "A capability-based lock: optimistic read (`tryOptimisticRead` + `validate`), read lock, write lock. Faster than ReadWriteLock when reads dominate and critical sections are tiny.\n\nIt is **not** reentrant. Easy to deadlock if you upgrade poorly. Most Android code should not reach for it.",
    "pdfTopic": false,
    "tags": [
      "locks"
    ]
  },
  {
    "id": "jav-135",
    "category": "java",
    "level": "intermediate",
    "topic": "Pattern matching",
    "question": "What is pattern matching for instanceof and switch in modern Java?",
    "answer": "`if (obj instanceof String s)` binds `s`. Switch can match types and null (Java 21), and sealed hierarchies can be **exhaustive** without a default.\n\nThis is the Java analogue of Kotlin `when` + smart casts. Android support depends on desugaring / min SDK / compile SDK.",
    "pdfTopic": false,
    "tags": [
      "java21"
    ]
  },
  {
    "id": "jav-136",
    "category": "java",
    "level": "advanced",
    "topic": "Structured concurrency",
    "question": "What is structured concurrency in Java (not Kotlin)?",
    "answer": "JEP structured concurrency treats a set of tasks as a **unit** (`StructuredTaskScope`): fail one, cancel siblings, wait for all in a block. It pairs with virtual threads.\n\nUnlike raw `CompletableFuture.allOf`, lifetimes nest with the calling scope. Still evolving; say “preview/standard depending on JDK version” in interviews.",
    "pdfTopic": false,
    "tags": [
      "java21",
      "concurrency"
    ]
  },
  {
    "id": "jav-137",
    "category": "java",
    "level": "intermediate",
    "topic": "Annotations",
    "question": "What are annotation retention policies and how does that affect Android?",
    "answer": "`SOURCE` — compiler only (`@Override`). `CLASS` — in bytecode, not runtime. `RUNTIME` — reflectable. Processors (Dagger, Room) usually read `CLASS` at compile time.\n\nR8 strips unused RUNTIME annotations unless kept. `@Retention` mistakes are why “my annotation disappeared.”",
    "pdfTopic": false,
    "tags": [
      "annotations"
    ]
  },
  {
    "id": "jav-138",
    "category": "java",
    "level": "advanced",
    "topic": "False sharing",
    "question": "What is false sharing?",
    "answer": "Two fields on the **same cache line** written by different threads invalidate each other’s cores even if logically independent. Padding / `@Contended` / separate objects fix it.\n\nYou see this in hand-rolled ring buffers and counters. `LongAdder` exists because a single `volatile long` contended increment is slow.",
    "pdfTopic": false,
    "tags": [
      "cpu",
      "concurrency"
    ]
  }
]);
