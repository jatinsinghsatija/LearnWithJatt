window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.java = (window.QA_BANK.java || []).concat([
  {
    "id": "jav-081",
    "category": "java",
    "level": "basic",
    "topic": "Platform independence",
    "question": "Why is Java called platform independent?",
    "answer": "You compile to **bytecode**, not a native binary. The **JVM** on each OS interprets/JITs that bytecode. Write once, run on any JVM of a compatible version.\n\nAndroid is a twist: bytecode is converted to DEX and run by ART, not a desktop JVM. The language is still “write once,” the VM is not identical.",
    "pdfTopic": false,
    "tags": [
      "jvm",
      "bytecode"
    ]
  },
  {
    "id": "jav-082",
    "category": "java",
    "level": "basic",
    "topic": "Java features",
    "question": "What language features should you list for Java?",
    "answer": "Object-oriented, strongly typed, automatic memory management (GC), multithreaded, exception handling, packages, a large standard library, JIT, and backward compatibility as a culture.\n\nRecent interviews also expect **records, sealed classes, pattern matching, virtual threads (21)**, and modules (9+) as “do you keep up,” not as trivia.",
    "pdfTopic": false,
    "tags": [
      "features"
    ]
  },
  {
    "id": "jav-083",
    "category": "java",
    "level": "basic",
    "topic": "Java vs C++",
    "question": "How does Java differ from C++?",
    "answer": "Java has no explicit pointers or pointer arithmetic, no multiple class inheritance, a GC instead of deterministic destructors (though `AutoCloseable` exists), a virtual machine, and a single-rooted object model (`Object`). Operator overloading is almost absent (except `+` for String).\n\nC++ compiles to native code, supports RAII, templates (not JVM generics-erasure), and undefined behavior. Android NDK is the C++ door back into an Android app.",
    "pdfTopic": false,
    "tags": [
      "cpp"
    ]
  },
  {
    "id": "jav-084",
    "category": "java",
    "level": "basic",
    "topic": "main method",
    "question": "Explain `public static void main(String[] args)`. What if main is not static?",
    "answer": "- **public** — the JVM must call it from outside the class.\n- **static** — no instance exists yet; the JVM does not construct your class to start.\n- **void** — it does not return a value to the JVM (use `System.exit` for codes).\n- **String[] args** — command-line arguments.\n\nIf main is not static, the JVM does not find the entry point (`NoSuchMethodError` / launcher error). You **can overload** main, but the JVM only uses the standard signature.",
    "pdfTopic": false,
    "tags": [
      "main"
    ]
  },
  {
    "id": "jav-085",
    "category": "java",
    "level": "basic",
    "topic": "String pool",
    "question": "What is the Java String pool, and how does `new String` differ from a literal?",
    "answer": "String **literals** are interned in the heap’s string pool. `\"hi\" == \"hi\"` is true because both point at the pooled instance. `new String(\"hi\")` creates a **new** heap object, so `==` is false while `equals` is true.\n\n`intern()` puts/gets pool instances. Do not intern unbounded user input (memory). Prefer literals and `equals`.",
    "pdfTopic": false,
    "tags": [
      "string",
      "intern"
    ]
  },
  {
    "id": "jav-086",
    "category": "java",
    "level": "basic",
    "topic": "Packages",
    "question": "What are packages in Java, and what kinds exist?",
    "answer": "A package is a namespace and a directory (`com.shop.cart`). It groups classes, avoids name clashes, and is the unit of **package-private** access.\n\nTwo kinds: **built-in** (`java.lang`, `java.util`) and **user-defined**. `java.lang` is imported implicitly. Split packages across JARs are a module-system headache (Java 9+).",
    "pdfTopic": false,
    "tags": [
      "package"
    ]
  },
  {
    "id": "jav-087",
    "category": "java",
    "level": "basic",
    "topic": "Wrapper classes",
    "question": "What are wrapper classes, and why do they exist?",
    "answer": "Each primitive has a class: `Integer`, `Long`, `Double`, `Boolean`, … Collections and generics need **reference types**, so you cannot have `List<int>`. Wrappers also provide parsing (`Integer.parseInt`) and constants (`MAX_VALUE`).\n\nAutoboxing hides conversions; it also hides **NPE on unboxing null** and `==` cache surprises for `Integer` in the range −128..127.",
    "pdfTopic": false,
    "tags": [
      "wrappers",
      "autoboxing"
    ]
  },
  {
    "id": "jav-088",
    "category": "java",
    "level": "basic",
    "topic": "Default values",
    "question": "What default values do instance fields vs local variables get?",
    "answer": "Instance and static fields get language defaults: `0`, `0.0`, `false`, `null`. **Local variables have no default**; the compiler requires definite assignment before use.\n\nThat is why `int x; System.out.println(x);` fails inside a method but `private int x;` prints 0.",
    "pdfTopic": false,
    "tags": [
      "variables"
    ]
  },
  {
    "id": "jav-089",
    "category": "java",
    "level": "basic",
    "topic": "this and super",
    "question": "What is `this` vs `super`, and `this()` vs `super()`?",
    "answer": "`this` is the current instance; `super` is the parent type for methods/fields. `this()` calls another constructor in the same class; `super()` calls a parent constructor. Either call must be the **first** statement in a constructor (pre-Java 22 flexibility aside).\n\nIf you write no constructor, Java supplies a default no-arg that calls `super()`.",
    "pdfTopic": false,
    "tags": [
      "constructor"
    ]
  },
  {
    "id": "jav-090",
    "category": "java",
    "level": "basic",
    "topic": "Constructors",
    "question": "What is a constructor, and which kinds should you name?",
    "answer": "A constructor initializes a new object, is named after the class, and has no return type. Kinds: **default** (compiler-generated), **no-arg**, **parameterized**, and the (non-built-in) **copy** pattern you write yourself. Java has no true copy constructor like C++.\n\n**Private constructors** power singletons and utility classes. Constructors are **not inherited**. You can overload them; you cannot override them.",
    "pdfTopic": false,
    "tags": [
      "constructor"
    ]
  },
  {
    "id": "jav-091",
    "category": "java",
    "level": "intermediate",
    "topic": "Multiple inheritance",
    "question": "Does Java support multiple inheritance? How do you get the effect?",
    "answer": "A class **cannot extend two classes**. It **can implement many interfaces**. Since Java 8, interfaces may have **default methods**; conflicts are resolved with `super` qualification (`A.super.foo()`).\n\nThis avoids the C++ diamond for state (interfaces still cannot hold instance fields except static). Composition is the usual “multiple inheritance of behavior + state” design.",
    "pdfTopic": false,
    "tags": [
      "inheritance",
      "interface"
    ]
  },
  {
    "id": "jav-092",
    "category": "java",
    "level": "intermediate",
    "topic": "Override rules",
    "question": "Can you override static or private methods? Can you overload main?",
    "answer": "You **cannot override** `static` or `private` methods. Static methods **hide**. Private methods are not visible to children. You **can overload** `main`; the JVM still starts the `String[]` one.\n\nYou cannot override with a **narrower** access (protected → private is illegal). You may **widen** (protected → public). You cannot throw extra checked exceptions.",
    "pdfTopic": false,
    "tags": [
      "overriding"
    ]
  },
  {
    "id": "jav-093",
    "category": "java",
    "level": "intermediate",
    "topic": "IS-A HAS-A",
    "question": "What are association, aggregation, and composition?",
    "answer": "- **IS-A** — inheritance (`Dog extends Animal`).\n- **HAS-A / association** — a relationship between objects.\n- **Aggregation** — HAS-A where the child can outlive the parent (department/employees).\n- **Composition** — strong HAS-A; the part dies with the whole (house/rooms).\n\nInterviewers want composition as the default over deep inheritance.",
    "pdfTopic": false,
    "tags": [
      "oop",
      "composition"
    ]
  },
  {
    "id": "jav-094",
    "category": "java",
    "level": "intermediate",
    "topic": "Thread lifecycle",
    "question": "Describe the Java thread lifecycle and sleep vs wait vs yield vs join.",
    "answer": "States: **NEW → RUNNABLE → BLOCKED / WAITING / TIMED_WAITING → TERMINATED**.\n\n- `sleep` — timed wait, **does not release** the monitor.\n- `wait` — releases the monitor, needs `notify`/`notifyAll`, must hold the lock.\n- `yield` — hint to the scheduler, rarely useful.\n- `join` — wait for another thread to finish.\n\nA **daemon** thread dies when only daemons remain (GC is a daemon). Prefer ExecutorService over raw Thread.",
    "pdfTopic": false,
    "tags": [
      "threads"
    ]
  },
  {
    "id": "jav-095",
    "category": "java",
    "level": "intermediate",
    "topic": "Process vs thread",
    "question": "How does a process differ from a thread in Java?",
    "answer": "A **process** has its own address space and JVM instance. **Threads** share the heap of one JVM, with separate stacks. Context-switching threads is cheaper than processes; shared memory means you need synchronization.\n\nAndroid: each app process has a VM; `android:process` can split components into extra processes (rare, expensive).",
    "pdfTopic": false,
    "tags": [
      "threads",
      "process"
    ]
  },
  {
    "id": "jav-096",
    "category": "java",
    "level": "basic",
    "topic": "Type casting",
    "question": "What is type casting in Java? Widening vs narrowing?",
    "answer": "**Widening** (int → long) is implicit and safe. **Narrowing** (long → int) needs an explicit cast and may truncate. **Upcasting** objects (Dog → Animal) is implicit; **downcasting** needs a cast and may throw `ClassCastException`. Prefer `instanceof` (pattern matching `if (x instanceof Dog d)`).\n\nPrimitives and references are different casts. You cannot cast an Integer to String.",
    "pdfTopic": false,
    "tags": [
      "casting"
    ]
  },
  {
    "id": "jav-097",
    "category": "java",
    "level": "intermediate",
    "topic": "Covariant returns",
    "question": "What is a covariant return type?",
    "answer": "When overriding, the return type may be a **subtype** of the parent’s return type (`Animal clone()` overridden as `Dog clone()`). This is covariant returns, added in Java 5.\n\nParameter types cannot be covariant for override (that would be overloading).",
    "pdfTopic": false,
    "tags": [
      "overriding"
    ]
  },
  {
    "id": "jav-098",
    "category": "java",
    "level": "intermediate",
    "topic": "transient vs volatile",
    "question": "What does `transient` mean vs `volatile`?",
    "answer": "**transient** — skip this field during **Java serialization**. **volatile** — visibility: writes are visible to other threads; no extra atomicity for `i++`.\n\nThey solve different problems. A field can be both. `static` fields are not serialized as instance state anyway.",
    "pdfTopic": false,
    "tags": [
      "serialization",
      "concurrency"
    ]
  },
  {
    "id": "jav-099",
    "category": "java",
    "level": "intermediate",
    "topic": "Shift operators",
    "question": "What is the difference between `>>` and `>>>`?",
    "answer": "`>>` is **arithmetic** right shift (sign-extends). `>>>` is **logical** right shift (fills with zeros). `<<` is left shift. These apply to integers, not floats.\n\nUseful in bitsets, hash codes, and color packing. Java has no unsigned types except via these ops and `Integer.toUnsignedString`.",
    "pdfTopic": false,
    "tags": [
      "operators"
    ]
  },
  {
    "id": "jav-100",
    "category": "java",
    "level": "basic",
    "topic": "Array vs ArrayList",
    "question": "How do arrays differ from ArrayList?",
    "answer": "Arrays are fixed-size, can hold primitives, and are covariant (`String[]` is an `Object[]` — a hole that can throw `ArrayStoreException`). **ArrayList** is resizable, generic (invariant), stores references (primitives are boxed), and lives in `java.util`.\n\nArrays are objects on the **heap**. `int[] a` vs `int a[]` is the same type.",
    "pdfTopic": false,
    "tags": [
      "collections",
      "arrays"
    ]
  },
  {
    "id": "jav-101",
    "category": "java",
    "level": "intermediate",
    "topic": "Collection vs Collections",
    "question": "What is the difference between Collection and Collections?",
    "answer": "**Collection** is the root **interface** (List, Set, Queue). **Collections** is a **utility class** of static methods: `sort`, `unmodifiableList`, `synchronizedList`, `emptyList`, binary search.\n\nSaying “Collections Framework” means the whole `java.util` API, not the class `Collections`.",
    "pdfTopic": false,
    "tags": [
      "collections"
    ]
  },
  {
    "id": "jav-102",
    "category": "java",
    "level": "intermediate",
    "topic": "Iterator vs ListIterator",
    "question": "How do Iterator, ListIterator, and Enumeration differ?",
    "answer": "**Iterator** — forward, `remove` allowed, fail-fast on most JDK lists. **ListIterator** — also backward, `add`/`set`, list-only. **Enumeration** — legacy Vector/Hashtable, no `remove`, not fail-fast the same way.\n\nPrefer Iterator / enhanced-for / streams. Enumeration shows up in old APIs.",
    "pdfTopic": false,
    "tags": [
      "iterator"
    ]
  },
  {
    "id": "jav-103",
    "category": "java",
    "level": "intermediate",
    "topic": "HashMap vs Hashtable vs TreeMap",
    "question": "Compare HashMap, Hashtable, LinkedHashMap, and TreeMap.",
    "answer": "- **HashMap** — O(1) average, allows one null key, not synchronized, iteration order undefined (or insertion with LinkedHashMap).\n- **Hashtable** — legacy, synchronized, no nulls.\n- **LinkedHashMap** — insertion or access order.\n- **TreeMap** — sorted keys, `Comparable`/`Comparator`, O(log n), no null keys.\n\nFor concurrency use **ConcurrentHashMap**, not Hashtable.",
    "pdfTopic": false,
    "tags": [
      "map"
    ]
  },
  {
    "id": "jav-104",
    "category": "java",
    "level": "intermediate",
    "topic": "Error vs Exception",
    "question": "What is the difference between Error and Exception? What is exception propagation?",
    "answer": "Both extend `Throwable`. **Exception** is for recoverable conditions (checked or runtime). **Error** is for JVM-level failures (`OutOfMemoryError`, `StackOverflowError`) you usually should not catch.\n\n**Propagation**: if a method does not catch a checked exception, it must declare `throws`; the caller handles or declares. Runtime exceptions propagate unchecked. `finally` runs unless the JVM halts (`System.exit`, or a crash).",
    "pdfTopic": false,
    "tags": [
      "exceptions"
    ]
  },
  {
    "id": "jav-105",
    "category": "java",
    "level": "intermediate",
    "topic": "Callable and Future",
    "question": "How do Callable and Future differ from Runnable?",
    "answer": "`Runnable.run()` returns void and cannot throw checked exceptions. **`Callable.call()`** returns a value and may throw. `ExecutorService.submit` gives a **Future** (blocking `get`, `cancel`).\n\n**CompletableFuture** is the modern composition API (`thenApply`, `thenCombine`, async variants). Prefer it over raw Future for pipelines.",
    "pdfTopic": false,
    "tags": [
      "concurrency"
    ]
  },
  {
    "id": "jav-106",
    "category": "java",
    "level": "advanced",
    "topic": "Locks and ThreadLocal",
    "question": "What are ReentrantLock, ReadWriteLock, and ThreadLocal used for?",
    "answer": "**synchronized** is implicit and block-scoped. **ReentrantLock** adds timed tryLock, fairness, multiple conditions. **ReadWriteLock** allows concurrent readers. Always `unlock` in `finally`.\n\n**ThreadLocal** stores per-thread values (transaction id, SimpleDateFormat historically). Must `remove()` on thread pools or you leak memory across tasks.",
    "pdfTopic": false,
    "tags": [
      "locks",
      "threadlocal"
    ]
  },
  {
    "id": "jav-107",
    "category": "java",
    "level": "advanced",
    "topic": "References",
    "question": "What are strong, soft, weak, and phantom references?",
    "answer": "- **Strong** — ordinary references; GC will not collect if reachable.\n- **Soft** — collected under memory pressure (caches).\n- **Weak** — collected at next GC if only weakly reachable (`WeakHashMap` keys).\n- **Phantom** — used with `ReferenceQueue` for post-mortem cleanup (cleaner).\n\nAndroid’s `LruCache` is usually a better app-level cache than rolling SoftReferences.",
    "pdfTopic": false,
    "tags": [
      "gc",
      "references"
    ]
  },
  {
    "id": "jav-108",
    "category": "java",
    "level": "intermediate",
    "topic": "Java 8+ interfaces",
    "question": "What are default, static, and private methods in interfaces? What is a functional interface?",
    "answer": "Java 8 added **default** and **static** interface methods. Java 9 added **private** methods for sharing code inside the interface. A **functional interface** has a single abstract method (`@FunctionalInterface`) and is the target of lambdas and method references.\n\nThis is how `Comparator.comparing` and `Iterable.forEach` exist without breaking implementors.",
    "pdfTopic": false,
    "tags": [
      "lambda",
      "interface"
    ]
  },
  {
    "id": "jav-109",
    "category": "java",
    "level": "intermediate",
    "topic": "Records and sealed classes",
    "question": "What are records and sealed classes in modern Java?",
    "answer": "A **record** is a transparent, immutable data carrier: constructor, accessors, `equals`/`hashCode`/`toString` generated. A **sealed** class/interface restricts which types may extend it (`permits`), enabling exhaustive switches.\n\nThey overlap Kotlin data/sealed classes. Android desugaring / API level determines whether you can use them in apps.",
    "pdfTopic": false,
    "tags": [
      "java17",
      "records"
    ]
  },
  {
    "id": "jav-110",
    "category": "java",
    "level": "intermediate",
    "topic": "JDBC",
    "question": "What is JDBC at a high level?",
    "answer": "**JDBC** is the JDK API for SQL databases: `DriverManager` (or DataSource), `Connection`, `PreparedStatement`, `ResultSet`. Load a driver, get a connection, execute parameterized SQL, close resources with try-with-resources.\n\nAndroid apps almost never use raw JDBC against SQLite — they use **Room**. JDBC still appears in Java-backend interviews and some desktop questions.",
    "pdfTopic": false,
    "tags": [
      "jdbc",
      "sql"
    ]
  },
  {
    "id": "jav-111",
    "category": "java",
    "level": "intermediate",
    "topic": "Queue types",
    "question": "When do you use PriorityQueue, BlockingQueue, and Deque?",
    "answer": "**PriorityQueue** — heap, not FIFO; elements ordered by priority. **BlockingQueue** (`ArrayBlockingQueue`, `LinkedBlockingQueue`) — producer/consumer with `put`/`take`. **Deque** — double-ended; `ArrayDeque` is the general stack/queue replacement (do not use `Stack`/`Vector`).\n\n`ConcurrentLinkedQueue` is lock-free non-blocking.",
    "pdfTopic": false,
    "tags": [
      "queue"
    ]
  },
  {
    "id": "jav-112",
    "category": "java",
    "level": "basic",
    "topic": "I/O streams",
    "question": "What is the difference between byte streams and character streams?",
    "answer": "`InputStream`/`OutputStream` are **bytes**. `Reader`/`Writer` are **characters** (with a charset). Superclasses: `InputStream`, `OutputStream`, `Reader`, `Writer`. Buffer with `Buffered*` for performance. `FileInputStream` reads files as bytes.\n\nPrefer NIO `Files` and `Path` for new code. Always specify UTF-8 rather than relying on the platform default.",
    "pdfTopic": false,
    "tags": [
      "io"
    ]
  },
  {
    "id": "jav-113",
    "category": "java",
    "level": "basic",
    "topic": "break vs continue",
    "question": "What is the difference between break and continue?",
    "answer": "`break` exits the nearest loop or switch. `continue` skips the rest of the current iteration. Labeled break/continue exist for nested loops; use them sparingly.\n\nThey are not OOP — they still show up in “Java basics” rounds.",
    "pdfTopic": false,
    "tags": [
      "syntax"
    ]
  },
  {
    "id": "jav-114",
    "category": "java",
    "level": "advanced",
    "topic": "Virtual threads",
    "question": "What are virtual threads (Project Loom)?",
    "answer": "Java 21 **virtual threads** are JVM-scheduled, cheap threads that unmount from carrier OS threads when they block on most JDK I/O. They make thread-per-request servers practical again.\n\nThey do not replace thinking about shared mutable state. Pinning (native frames, some synchronized blocks) can still hold a carrier. Android does **not** ship Loom the same way; this is a Java-SE interview topic.",
    "pdfTopic": false,
    "tags": [
      "loom",
      "java21"
    ]
  }
]);
