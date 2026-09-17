window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.java = [
  {
    "id": "jav-001",
    "category": "java",
    "level": "basic",
    "topic": "OOP",
    "question": "What is a class, and how does it differ from an object?",
    "answer": "A **class** is a blueprint: a logical template that groups fields, constructors, methods, blocks, nested types, and implemented interfaces. An **object** is a live instance of that class. The PDF’s OOP notes put it this way: a class is a logical entity; an object is both a physical and a logical entity, with **state** (field values) and **behaviour** (methods).\n\nYou create objects with `new`, which allocates heap memory and runs a constructor. Many objects can share one class. Static members belong to the class itself, not to any one instance.\n\n```java\nclass User {\n    String name;\n    User(String name) { this.name = name; }\n}\nUser a = new User(\"Ada\");\nUser b = new User(\"Grace\");\n```\n\n`User` is the class; `a` and `b` are two objects with independent state.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "class",
      "object"
    ]
  },
  {
    "id": "jav-002",
    "category": "java",
    "level": "basic",
    "topic": "Inheritance",
    "question": "What is inheritance in Java, and how do you declare it?",
    "answer": "**Inheritance** is when a child type acquires the properties and behaviours of a parent type. Java uses `extends` for classes and `implements` for interfaces. The PDF highlights two payoffs: **code reuse** and a path to **runtime polymorphism** (a subclass instance used where the parent type is expected).\n\nJava allows **single class inheritance** only. Multiple inheritance of *type* is done with interfaces. `Object` is the root of every class hierarchy.\n\n```java\nclass Animal {\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    @Override void speak() { System.out.println(\"woof\"); }\n}\nAnimal a = new Dog(); // runtime type is Dog\n```\n\n`super` reaches the parent constructor or members. `final` classes cannot be subclassed; `final` methods cannot be overridden.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "extends",
      "reuse"
    ]
  },
  {
    "id": "jav-003",
    "category": "java",
    "level": "basic",
    "topic": "Interface",
    "question": "What is an interface in Java?",
    "answer": "An **interface** is a contract: a named set of method signatures (and, since Java 8, default and static methods) that implementing classes must honour. The PDF’s facts:\n\n- Multiple inheritance of type is achieved through interfaces.\n- A class `implements` an interface and thereby inherits its abstract methods.\n- An interface has **no constructors** (you cannot `new` it except via anonymous/lambda implementations of a functional interface).\n- The `interface` keyword declares it.\n\n```java\ninterface Payment {\n    void pay(int amount);\n    default void receipt() { System.out.println(\"paid\"); }\n}\nclass CardPayment implements Payment {\n    public void pay(int amount) { /* charge card */ }\n}\n```\n\nFields in a classic interface are `public static final`. A class may implement many interfaces; it may extend only one class. Prefer interfaces when you need a capability (`Comparable`, `AutoCloseable`) rather than a shared implementation hierarchy.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "interface",
      "contract"
    ]
  },
  {
    "id": "jav-004",
    "category": "java",
    "level": "basic",
    "topic": "Encapsulation",
    "question": "What is encapsulation?",
    "answer": "**Encapsulation** wraps data and the code that operates on it into a single unit (a class) and **hides** the representation from outside interference. The usual Java recipe, matching the PDF: declare fields `private`, expose a controlled API (`getX` / `setX` or better, behaviour methods), and validate in setters or constructors.\n\nThat keeps invariants (for example “balance cannot go negative”) in one place. It is not the same as abstraction: encapsulation is about *bundling and access control*; abstraction is about *what you show versus what you hide at the design level*. A well-encapsulated class can change its internals without breaking callers.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "private",
      "getters"
    ]
  },
  {
    "id": "jav-005",
    "category": "java",
    "level": "basic",
    "topic": "Abstraction",
    "question": "What is abstraction in Java?",
    "answer": "**Abstraction** hides implementation details and shows only the needed functionality. In Java you get it from **abstract classes** (partial implementation plus abstract methods) and **interfaces** (capability contracts). Callers depend on `List`, not on whether the runtime object is an `ArrayList` or `LinkedList`.\n\nThe PDF one-liner is accurate: hide implementation, show functionality. Encapsulation supports abstraction by keeping fields private so the public surface can stay small. Too little abstraction leaks details; too much hides useful information. Interviewers often ask you to contrast it with encapsulation — answer with “what vs how” versus “bundling and access”.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "abstract",
      "interface"
    ]
  },
  {
    "id": "jav-006",
    "category": "java",
    "level": "basic",
    "topic": "Polymorphism",
    "question": "What is polymorphism in Java?",
    "answer": "**Polymorphism** is the ability of an object to take on many forms. The PDF states that Java’s main support is **method overloading** (compile-time / static polymorphism) and **method overriding** (runtime / dynamic polymorphism).\n\n- **Compile-time:** the compiler picks an overload from the *declared* argument types.\n- **Runtime:** the JVM dispatches an overridden instance method using the *actual* object type (`invokevirtual` / `invokeinterface`).\n\n```java\nAnimal a = new Dog();\na.speak(); // Dog.speak if overridden\n```\n\nSubtype polymorphism also lets you pass a `Dog` where an `Animal` is required. `final`, `private`, and `static` methods are not overridden (static methods *hide*). Generics add parametric polymorphism, which is a separate interview thread.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "overloading",
      "overriding"
    ]
  },
  {
    "id": "jav-007",
    "category": "java",
    "level": "basic",
    "topic": "Method overloading",
    "question": "What is method overloading?",
    "answer": "**Method overloading** means a class (or a class and its parents) declares multiple methods with the **same name** but a **different parameter list** — different count, types, or order. Return type alone is not enough. The PDF calls this **compile-time polymorphism** and notes that it improves readability: `print(int)`, `print(String)` instead of `printInt` / `printString`.\n\n```java\nclass Printer {\n    void print(int n) { }\n    void print(String s) { }\n    void print(String s, int copies) { }\n}\n```\n\nResolution uses the compile-time types, including boxing, varargs, and most-specific-match rules. Constructors can be overloaded the same way. Overloading is not overriding: there is no runtime dispatch among overloads.\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "compile-time",
      "overload"
    ]
  },
  {
    "id": "jav-008",
    "category": "java",
    "level": "basic",
    "topic": "Method overriding",
    "question": "What is method overriding?",
    "answer": "**Method overriding** is when a subclass method has the **same name and type signature** as an instance method in a superclass (or a matching interface method). The PDF calls this **runtime polymorphism**. The JVM picks the implementation from the actual object, not the reference type.\n\nRules interviewers expect:\n\n- Same name, same argument types; covariant return types are allowed.\n- Cannot be less accessible (`protected` cannot become `private`).\n- Cannot override `static`, `final`, or `private` methods.\n- Use `@Override` so the compiler catches signature mistakes.\n- Checked exceptions cannot be broader than the parent’s.\n\n```java\nclass Shape { void draw() {} }\nclass Circle extends Shape {\n    @Override void draw() { /* circle */ }\n}\n```\n",
    "pdfTopic": true,
    "tags": [
      "oop",
      "runtime",
      "override"
    ]
  },
  {
    "id": "jav-009",
    "category": "java",
    "level": "basic",
    "topic": "OOP",
    "question": "How do method overloading and method overriding differ?",
    "answer": "Both reuse a method name; they solve different problems.\n\n- **Overloading** is several methods in the same class (or inherited) with different parameters. Chosen at **compile time**. Also called static polymorphism. Increases readability.\n- **Overriding** replaces a superclass instance method in a subclass with the same signature. Chosen at **runtime**. Also called dynamic polymorphism. Enables substitutability.\n\nOverloading can change the return type if parameters differ; overriding must keep a compatible return type. `static` methods can overload and can *hide*, but they do not override. Interview follow-up: passing `null` to overloaded methods can be ambiguous; overriding with a covariant return is legal since Java 5.\n",
    "pdfTopic": true,
    "tags": [
      "overloading",
      "overriding",
      "polymorphism"
    ]
  },
  {
    "id": "jav-010",
    "category": "java",
    "level": "basic",
    "topic": "Abstract class",
    "question": "What is an abstract class, and when do you use one?",
    "answer": "An **abstract class** is a class declared `abstract`. It **cannot be instantiated**. It may mix concrete methods, fields, constructors, and **abstract methods** (no body) that subclasses must implement. Use it when related types share state or implementation, but the base type itself is incomplete.\n\n```java\nabstract class Repository {\n    final Connection db;\n    Repository(Connection db) { this.db = db; }\n    abstract User find(String id);\n    void close() { db.close(); }\n}\n```\n\nThe PDF lists “Abstract class” as a core Java interview topic beside interfaces. Choose an abstract class when you need constructors, non-constant fields, or protected helpers. Choose an interface when you only need a capability several unrelated classes can implement.\n",
    "pdfTopic": true,
    "tags": [
      "abstract",
      "oop",
      "inheritance"
    ]
  },
  {
    "id": "jav-011",
    "category": "java",
    "level": "basic",
    "topic": "Abstract class",
    "question": "How does an abstract class differ from an interface?",
    "answer": "Both define a type you cannot `new` directly (aside from anonymous classes). Differences that come up in interviews:\n\n- A class **extends one** abstract class; it **implements many** interfaces.\n- Abstract classes can have instance fields, constructors, and any access modifier on members. Classic interfaces have `public` methods and `public static final` fields (Java 8+ adds default/static methods; Java 9+ private methods).\n- Abstract classes are for an **is-a** family with shared code. Interfaces are for **capabilities** (`Comparable`, `AutoCloseable`).\n- Adding an abstract method is a breaking change for subclasses; adding a default method to an interface is often source-compatible.\n\nSince Java 8 the gap narrowed, but “shared state + constructor” still points at an abstract class; “multiple unrelated types share an API” points at an interface.\n",
    "pdfTopic": true,
    "tags": [
      "abstract",
      "interface",
      "oop"
    ]
  },
  {
    "id": "jav-012",
    "category": "java",
    "level": "basic",
    "topic": "Access modifiers",
    "question": "Explain Java’s public, protected, default (package-private), and private access modifiers.",
    "answer": "Java has four access levels. Unlike Kotlin, there is **no `internal`**, and the **default** (no modifier) is **package-private**, not public.\n\n- **`public`:** visible everywhere the class is visible.\n- **`protected`:** visible in the same package **and** in subclasses (even in other packages), for the inherited member. A subclass in another package cannot reach `protected` members *through a parent-typed reference* the way same-package code can.\n- **Default / package-private:** visible only to classes in the **same package**. This is Java’s default; Kotlin’s default is `public` and Kotlin has no package-private.\n- **`private`:** visible only inside the declaring top-level class. Nested classes in the same outer class can see each other’s private members — the opposite of Kotlin, where the outer class does not see `private` nested types.\n\nApply modifiers to types, fields, methods, and constructors. Top-level classes may be `public` or package-private only. Tightest reasonable visibility is the usual style.\n",
    "pdfTopic": true,
    "tags": [
      "public",
      "private",
      "protected",
      "package-private"
    ]
  },
  {
    "id": "jav-013",
    "category": "java",
    "level": "basic",
    "topic": "JDK / JVM / JRE / DVM",
    "question": "What are the JDK, JVM, JRE, and DVM, and how do they relate?",
    "answer": "The PDF groups these four on purpose — three are standard Java, one is Android’s historical runtime.\n\n- **JDK (Java Development Kit):** compiler (`javac`), `jar`, debugger, and a JRE. You need it to *write and build* Java.\n- **JRE (Java Runtime Environment):** JVM plus the class libraries needed to *run* bytecode. No compiler.\n- **JVM (Java Virtual Machine):** loads `.class` files, verifies bytecode, interprets/JITs it, manages memory and threads. The JVM is a specification; HotSpot is an implementation. It is **stack-based**.\n- **DVM (Dalvik Virtual Machine):** Android’s older runtime. The PDF notes it is a **register-based** VM, designed so a device can run many instances efficiently, and it relies on the Linux kernel for threading and low-level memory. Apps were compiled to `.dex`. From **Android 5.0**, **ART** replaced Dalvik and uses ahead-of-time (and later profile-guided) compilation to native code.\n\nPipeline: source → JDK compiles to bytecode → JVM or (on older Android) dex/DVM executes it.\n",
    "pdfTopic": true,
    "tags": [
      "jdk",
      "jvm",
      "jre",
      "dvm",
      "art"
    ]
  },
  {
    "id": "jav-014",
    "category": "java",
    "level": "basic",
    "topic": "StringBuffer vs StringBuilder",
    "question": "How do String, StringBuffer, and StringBuilder differ?",
    "answer": "`String` is **immutable**: every concatenation that is not compile-time constant can allocate a new object. `StringBuffer` and `StringBuilder` are **mutable** character sequences with `append`, `insert`, `delete`.\n\nThey differ mainly in **thread safety**:\n\n- **`StringBuffer`:** every mutating method is `synchronized`. Safe for shared use across threads; slower because of locking.\n- **`StringBuilder`:** not synchronized. Use it on one thread (the common case, including building a string inside a method). Faster.\n\nBoth expand an internal `char`/`byte` array. Prefer `StringBuilder` unless you have a documented concurrent builder. For simple `+` in a single expression, the compiler already emits a `StringBuilder`. Do not concatenate in a loop with `String`; use a builder.\n",
    "pdfTopic": true,
    "tags": [
      "string",
      "thread-safety",
      "mutable"
    ]
  },
  {
    "id": "jav-015",
    "category": "java",
    "level": "basic",
    "topic": "List vs Vector",
    "question": "How does List (especially ArrayList) differ from Vector?",
    "answer": "`List` is the interface. `ArrayList` is the usual growable array. `Vector` is a **legacy** `List` from Java 1.0.\n\n- **Synchronization:** `Vector` methods are synchronized; `ArrayList` is not. A synchronized `Vector` is still easy to misuse (compound actions like check-then-add are not atomic). Prefer `ArrayList` plus an explicit lock, or a concurrent collection.\n- **Growth:** `ArrayList` grows by about **50%** (`old + old/2`). `Vector` **doubles** by default (or by `capacityIncrement` if set).\n- **Traversal:** `ArrayList` offers fail-fast `Iterator`s. `Vector` also supports the older `Enumeration`.\n- **API:** both implement `List`. New code almost never needs `Vector`. `Stack` extends `Vector` and is similarly outdated (`ArrayDeque` is the replacement).\n\nInterview one-liner: `Vector` is a synchronized, doubling array list; `ArrayList` is unsynchronized and usually the right default.\n",
    "pdfTopic": true,
    "tags": [
      "arraylist",
      "vector",
      "collections"
    ]
  },
  {
    "id": "jav-016",
    "category": "java",
    "level": "basic",
    "topic": "Collections vs Arrays",
    "question": "How do Java collections differ from arrays?",
    "answer": "**Arrays** are a language-level, fixed-length, covariant container: `String[]` is a subtype of `Object[]` (which is a heap of trouble — `ArrayStoreException`). They hold primitives or references, have a `length` field, and random access is O(1).\n\n**Collections** (`Collection`, `List`, `Set`, `Map`, …) are a library: growable (usually), generic (invariant), richer APIs (`add`, `remove`, `contains`, iterators, streams), and they **cannot store primitives** without boxing.\n\n- **Size:** arrays are fixed at creation; collections are often resizable.\n- **Element types:** arrays hold primitives or objects; collections hold objects only (boxing for primitives).\n- **API:** arrays use indexes, `clone`, and `java.util.Arrays`; collections offer interfaces plus algorithms in `Collections`.\n- **Type safety:** arrays are covariant (and can throw `ArrayStoreException`); collections with generics are invariant and stronger at compile time.\n\n`Arrays.asList` is a fixed-size list over an array. `toArray` copies a collection back. Choose arrays for tight primitive numeric kernels; choose collections for almost everything else.\n",
    "pdfTopic": true,
    "tags": [
      "array",
      "collections",
      "generics"
    ]
  },
  {
    "id": "jav-017",
    "category": "java",
    "level": "basic",
    "topic": "Linear Search",
    "question": "How does linear search work, and what is its complexity?",
    "answer": "The PDF: **linear search** checks each element **sequentially** until the target is found or the list is exhausted.\n\n```java\nstatic int linearSearch(int[] a, int target) {\n    for (int i = 0; i < a.length; i++) {\n        if (a[i] == target) return i;\n    }\n    return -1;\n}\n```\n\n- **Time:** O(n) worst and average; O(1) best if the first element matches.\n- **Space:** O(1).\n- **Requires sorted input?** No. That is why you use it for small or unsorted data.\n\n`List.indexOf` is linear search. For a sorted array, binary search is the better default.\n",
    "pdfTopic": true,
    "tags": [
      "search",
      "algorithms",
      "O(n)"
    ]
  },
  {
    "id": "jav-018",
    "category": "java",
    "level": "basic",
    "topic": "Binary Search",
    "question": "How does binary search work, and what is its complexity?",
    "answer": "The PDF: **binary search** is an efficient algorithm on **sorted** arrays. It repeatedly **divides the range in half** until the value is found or the range is empty.\n\nCompare the midpoint. If the target is smaller, search the left half; if larger, the right. Iterative form uses two indexes; recursive form adds O(log n) stack space.\n\n- **Time:** O(log n).\n- **Space:** O(1) iterative; O(log n) recursive.\n- **Precondition:** the array must be sorted in the same order as the comparator you use. If it is not, the result is undefined, not “a bit slower”.\n\n`Arrays.binarySearch` and `Collections.binarySearch` return `(-(insertion point) - 1)` when missing — a favourite follow-up. Integers can overflow if you write `(low + high) / 2`; use `low + (high - low) / 2`.\n",
    "pdfTopic": true,
    "tags": [
      "search",
      "sorted",
      "O(log n)"
    ]
  },
  {
    "id": "jav-019",
    "category": "java",
    "level": "basic",
    "topic": "Bubble Sort",
    "question": "Explain bubble sort and its complexity.",
    "answer": "The PDF: **bubble sort** repeatedly steps through the list, **compares adjacent** elements, and **swaps** them if they are in the wrong order, until the list is sorted. After pass *k*, the last *k* elements are in final position — the largest values have “bubbled” right.\n\n```java\nvoid bubble(int[] a) {\n    boolean swapped;\n    do {\n        swapped = false;\n        for (int i = 1; i < a.length; i++) {\n            if (a[i - 1] > a[i]) {\n                int t = a[i]; a[i] = a[i - 1]; a[i - 1] = t;\n                swapped = true;\n            }\n        }\n    } while (swapped);\n}\n```\n\n- **Time:** O(n²) worst and average; **O(n)** best if you stop when a pass makes no swaps (already sorted).\n- **Space:** O(1).\n- **Stable:** yes (equal elements are not swapped).\n- Rarely used in production; it is a teaching algorithm.\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "O(n^2)",
      "stable"
    ]
  },
  {
    "id": "jav-020",
    "category": "java",
    "level": "basic",
    "topic": "Insertion Sort",
    "question": "Explain insertion sort and its complexity.",
    "answer": "The PDF: **insertion sort** builds the final sorted array **one item at a time**. It is much less efficient than quicksort, heapsort, or merge sort on large random input, but it is excellent on **small** or **nearly sorted** data (and is the insertion phase inside TimSort, which `Arrays.sort` uses for objects).\n\nTake `a[i]`, shift larger sorted elements one slot right, insert it. Like sorting a hand of cards.\n\n- **Time:** O(n²) worst/average; **O(n)** best (already sorted).\n- **Space:** O(1).\n- **Stable:** yes.\n- **Adaptive:** yes — fewer moves when data is almost sorted.\n\nPrefer it for n in the tens, or as a base case of a divide-and-conquer sort.\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "O(n^2)",
      "adaptive"
    ]
  },
  {
    "id": "jav-021",
    "category": "java",
    "level": "basic",
    "topic": "Selection Sort",
    "question": "Explain selection sort and its complexity.",
    "answer": "The PDF: **selection sort** selects the **smallest** element from the unsorted suffix and **moves it to the front** of that suffix, repeating until the whole list is sorted.\n\n```java\nvoid selection(int[] a) {\n    for (int i = 0; i < a.length - 1; i++) {\n        int min = i;\n        for (int j = i + 1; j < a.length; j++) {\n            if (a[j] < a[min]) min = j;\n        }\n        int t = a[i]; a[i] = a[min]; a[min] = t;\n    }\n}\n```\n\n- **Time:** **O(n²) in every case** — even if the array is sorted, it still scans the suffix.\n- **Space:** O(1).\n- **Stable:** not in the usual swap implementation (a swap can jump over equal keys).\n- **Swaps:** at most n − 1, which can matter when writes are expensive.\n\nIt is simple, not adaptive, and almost never the right production choice.\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "O(n^2)",
      "unstable"
    ]
  },
  {
    "id": "jav-022",
    "category": "java",
    "level": "intermediate",
    "topic": "Merge Sort",
    "question": "Explain merge sort and its complexity.",
    "answer": "The PDF: **merge sort** is an efficient, **stable**, comparison-based sort that uses **divide-and-conquer**. Split the array into two halves, **recursively sort** each half, then **merge** the two sorted halves.\n\nMerge walks two pointers and copies the smaller head into a temporary buffer, then copies back (or merges into a helper array).\n\n- **Time:** **O(n log n)** best, average, and worst — the recurrence is T(n) = 2T(n/2) + O(n).\n- **Space:** **O(n)** extra for the merge buffer, plus O(log n) stack.\n- **Stable:** yes, if the merge prefers the left run on ties.\n- **Linked lists:** can merge with O(1) extra space by relinking nodes.\n\nJava’s `Arrays.sort(Object[])` uses **TimSort**, a merge/insertion hybrid. Primitive `Arrays.sort` uses dual-pivot quicksort instead (not stable).\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "divide-and-conquer",
      "stable"
    ]
  },
  {
    "id": "jav-023",
    "category": "java",
    "level": "intermediate",
    "topic": "Quick Sort",
    "question": "Explain quick sort and its complexity.",
    "answer": "The PDF: **quick sort** is an efficient, **unstable**, comparison-based **divide-and-conquer** sort. Pick a **pivot**, **partition** the rest into “less than pivot” and “greater than pivot”, then recurse on the two sides. The pivot lands in its final index after partition.\n\n- **Time:** **O(n log n)** average; **O(n²)** worst (already sorted data with a naive first/last pivot). Random or median-of-three pivots make the worst case unlikely. Dual-pivot quicksort (used for Java primitive arrays) improves constants.\n- **Space:** O(log n) average stack; O(n) worst stack without tail-call / smaller-first recursion.\n- **Stable:** no — partition swaps scramble equal keys.\n- **In-place:** yes, aside from the call stack.\n\nInterview contrast with merge sort: quicksort usually wins on primitives (cache, no O(n) buffer) but can degrade and is not stable; merge sort has a hard O(n log n) bound and stays stable.\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "pivot",
      "divide-and-conquer"
    ]
  },
  {
    "id": "jav-024",
    "category": "java",
    "level": "intermediate",
    "topic": "Sorting",
    "question": "Compare the time and space complexity of linear search, binary search, bubble, insertion, selection, merge, and quick sort.",
    "answer": "These are the algorithms named in the PDF. Memorize the table; interviewers ask it as a rapid-fire.\n\n- **Linear search:** time O(n), space O(1). Unsorted OK.\n- **Binary search:** time O(log n), space O(1) iterative. **Must be sorted.**\n- **Bubble sort:** time O(n²) typical, O(n) best with a swap flag; space O(1); **stable**.\n- **Insertion sort:** time O(n²) typical, O(n) best; space O(1); **stable**, adaptive.\n- **Selection sort:** time O(n²) **always**; space O(1); typically **not stable**; few swaps.\n- **Merge sort:** time **O(n log n)** always; space O(n); **stable**.\n- **Quick sort:** time O(n log n) average, **O(n²)** worst; space O(log n) average; **not stable**.\n\nBig-O hides constants: insertion sort beats merge sort for tiny n. Production Java uses TimSort for objects and dual-pivot quicksort for primitives, not textbook bubble/selection.\n",
    "pdfTopic": true,
    "tags": [
      "complexity",
      "big-o",
      "algorithms"
    ]
  },
  {
    "id": "jav-025",
    "category": "java",
    "level": "basic",
    "topic": "Static methods",
    "question": "How do static methods differ from private methods?",
    "answer": "They answer different questions. **`static`** is about *who the member belongs to*. **`private`** is about *who can call it*. The PDF lists them together because juniors mix “helper method” with “class method”.\n\n- A **static method** belongs to the **class**. Call it as `Math.max(a, b)` without an instance. It cannot use instance fields or `this`. It **cannot be overridden** (a subclass static method with the same signature *hides*). It may be `public` or `private`.\n- A **private method** is an implementation detail of the class. It may be instance or static. It **cannot be overridden** because it is not visible to subclasses (and is resolved statically). Outer-class private members are visible to nested classes in Java.\n\nUse **private instance** methods to break up object behaviour. Use **private static** methods for pure helpers that do not need state. Use **public static** methods for stateless utilities. There is no “static vs private” exclusive choice — a method is often both.\n",
    "pdfTopic": true,
    "tags": [
      "static",
      "private",
      "access"
    ]
  },
  {
    "id": "jav-026",
    "category": "java",
    "level": "intermediate",
    "topic": "Singleton",
    "question": "What is the Singleton pattern, and how do you implement it in Java with double-checked locking?",
    "answer": "A **singleton** allows **only one instance** of a class and gives **global access** to it. The PDF lists the properties: only one instance; globally accessible. Rules it gives: a **private constructor**, a **static reference**, **one static factory method**, a globally accessible object reference, and **consistency across multiple threads**.\n\nThe PDF’s Java example is **double-checked locking** (check, lock, check again):\n\n```java\npublic class Singleton {\n   private static Singleton instance = null;\n   private Singleton() {}\n   public static Singleton getInstance() {\n       if (instance == null) {\n           synchronized (Singleton.class) {\n               if (instance == null) {\n                   instance = new Singleton();\n               }\n           }\n       }\n       return instance;\n   }\n}\n```\n\nThe outer check avoids locking on the fast path. The inner check stops two threads from both creating an instance.\n\n**Production caveat:** `instance` should be **`volatile`**. Without it, a thread can see a partially constructed object because `new` is not atomic (allocate, init, publish). Enum singletons (`enum S { INSTANCE; }`) and holder-class (`private static class H { static final S I = new S(); }`) are the usual modern answers. Kotlin’s `object` is a singleton (the PDF shows that too).\n",
    "pdfTopic": true,
    "tags": [
      "singleton",
      "dcl",
      "design-patterns"
    ],
    "code": "public class Singleton {\n   private static Singleton instance = null;\n   private Singleton() {}\n   public static Singleton getInstance() {\n       if (instance == null) {\n           synchronized (Singleton.class) {\n               if (instance == null) {\n                   instance = new Singleton();\n               }\n           }\n       }\n       return instance;\n   }\n}\n"
  },
  {
    "id": "jav-027",
    "category": "java",
    "level": "intermediate",
    "topic": "Factory",
    "question": "What is the Factory pattern?",
    "answer": "A **factory** hides **creational logic**. A factory type decides **which concrete class** to instantiate so callers depend on an interface, not on `new Concrete()`. The PDF: use it when you deal with many related objects and do not want to specify the concrete class.\n\nClassic shape: an interface (`Currency`), implementations (`USDollar`, `Euro`), and a factory method `currency(country)` that `switch`es on a discriminator and returns the interface.\n\nBenefits: one place to change construction, easier testing (return fakes), and closed-for-modification if you add types via maps or registration. Related names: **simple factory** (one method), **factory method** (subclass decides), **abstract factory** (families of products). On Android/Java, `Calendar.getInstance()` is a JDK factory; Retrofit’s `create(Api.class)` is another.\n",
    "pdfTopic": true,
    "tags": [
      "factory",
      "creational",
      "design-patterns"
    ]
  },
  {
    "id": "jav-028",
    "category": "java",
    "level": "intermediate",
    "topic": "Builder",
    "question": "What is the Builder pattern, and what rules does a Builder class follow?",
    "answer": "The PDF quotes the GoF aim: **separate the construction of a complex object from its representation** so the same process can create different representations. You set fields **step by step**; `build()` returns the finished object.\n\nPDF rules for a Builder class:\n\n1. A **private constructor** on the product.\n2. An **inner class** usually named `Builder`.\n3. A **function per field** that sets the value and **returns the builder** (fluent API).\n4. A **`build()`** function that returns an instance of the main class.\n\nUse it for many optional parameters instead of telescoping constructors. In Java, `StringBuilder` is a related idea; `AlertDialog.Builder` and OkHttp `Request.Builder` are textbook Android examples. Make `build()` validate (required fields, invariants). For immutable products, copy builder fields into `final` fields in the private constructor. Java records plus a builder, or Lombok `@Builder`, are common shortcuts — still know the manual form.\n",
    "pdfTopic": true,
    "tags": [
      "builder",
      "creational",
      "fluent"
    ]
  },
  {
    "id": "jav-029",
    "category": "java",
    "level": "intermediate",
    "topic": "Facade",
    "question": "What is the Facade pattern?",
    "answer": "**Facade** is a **structural** pattern. It provides a **higher-level interface** that makes a set of other interfaces easier to use. Callers talk to one type; the facade talks to subsystems (network, cache, parsers, retries).\n\nThe PDF’s Android example: **Square’s Retrofit**. You declare a small interface (`listBooks()`), and Retrofit is the facade over OkHttp, converters, and threading. You do not wire sockets yourself.\n\nFacades reduce coupling and are a good place for logging or error mapping. They can become a “god class” if you dump the entire system behind one type — split facades by subsystem when that happens. Related: **adapter** changes an interface; facade *simplifies* many interfaces.\n",
    "pdfTopic": true,
    "tags": [
      "facade",
      "structural",
      "retrofit"
    ]
  },
  {
    "id": "jav-030",
    "category": "java",
    "level": "intermediate",
    "topic": "Adapter",
    "question": "What is the Adapter pattern?",
    "answer": "An **adapter** is a **bridge between two incompatible interfaces**. One class (the adapter) implements the interface your client already uses and **delegates** to an existing type that speaks a different API.\n\nThe PDF’s real-world picture: a **card reader** sits between a memory card and a laptop. You plug the card into the reader and the reader into the laptop.\n\nIn code, `Adapter` implements `Target`, holds an `Adaptee`, and maps `request()` to `adaptee.specificRequest()`. Android’s `RecyclerView.Adapter` is a related idea (adapting a data set to view holders), though it is a framework class more than a textbook object adapter. **Class adapter** (multiple inheritance) is rare in Java; **object adapter** (composition) is the default.\n\nDo not confuse with **Facade** (simplify many APIs) or **Decorator** (add behaviour while keeping the same interface).\n",
    "pdfTopic": true,
    "tags": [
      "adapter",
      "structural",
      "bridge"
    ]
  },
  {
    "id": "jav-031",
    "category": "java",
    "level": "intermediate",
    "topic": "Dependency Injection",
    "question": "What is dependency injection, conceptually?",
    "answer": "**Dependency injection (DI)** means a type **receives** the objects it needs instead of **constructing** them. The PDF analogy: moving into a **furnished apartment** — you do not assemble the furniture. In software, you provide required objects when instantiating a new object; that object does not construct or customize those helpers itself.\n\nWithout DI, a `Car` does `new Engine()` inside itself. Testing is hard (you cannot swap a fake engine), and the car is coupled to a concrete engine. With constructor injection:\n\n```text\nCar(engine: Engine) { this.engine = engine }\nmain: engine = Engine(); car = Car(engine); car.start()\n```\n\nThe PDF notes Android often needs the same complex objects (network client, image loader, `SharedPreferences`) in many screens — inject them into activities/fragments.\n\nForms: **constructor** (preferred), **setter**, **field** (frameworks like Dagger/Hilt/Guice). DI is a *principle*; Dagger/Hilt/Spring are *frameworks* that automate the wiring. Related SOLID idea: depend on abstractions.\n",
    "pdfTopic": true,
    "tags": [
      "di",
      "constructor-injection",
      "testing"
    ]
  },
  {
    "id": "jav-032",
    "category": "java",
    "level": "intermediate",
    "topic": "Design Patterns",
    "question": "Which design patterns should you know from a typical Android/Java interview list, and how are they grouped?",
    "answer": "The PDF’s pattern cluster is: **Singleton**, **Factory**, **Builder**, **Facade**, **Adapter**, and **Dependency Injection**.\n\n- **Creational** (how objects are born): Singleton (one instance), Factory (choose the concrete type), Builder (stepwise construction). DI is creational in spirit: someone else creates collaborators.\n- **Structural** (how types fit together): Facade (one simple front for many APIs), Adapter (make mismatched APIs work together).\n\nKnow the **intent**, **structure**, **one code sketch**, and **when not to use it** (singleton as global mutable state, factory for a single obvious type, builder for two fields). Interviewers often follow with “how would you test this?” — inject dependencies, avoid hidden statics, keep facades thin.\n",
    "pdfTopic": true,
    "tags": [
      "design-patterns",
      "creational",
      "structural"
    ]
  },
  {
    "id": "jav-033",
    "category": "java",
    "level": "intermediate",
    "topic": "Map vs FlatMap",
    "question": "What is the difference between map and flatMap?",
    "answer": "Both transform data in a pipeline (`Stream`, `Optional`, reactive types). They differ in **shape**.\n\n- **`map`:** one input produces **one** output. `Stream<T>` + `Function<T, R>` → `Stream<R>`. Length stays the same (aside from parallel quirks, it is 1:1).\n- **`flatMap`:** one input produces **zero or more** outputs, then those streams are **flattened** into one. `Stream<T>` + `Function<T, Stream<R>>` → `Stream<R>`.\n\n```java\nList<String> words = List.of(\"ab\", \"c\");\nwords.stream().map(s -> s.split(\"\"))        // Stream<String[]>\n     .forEach(a -> {});\nwords.stream().flatMap(s -> Arrays.stream(s.split(\"\"))) // Stream<String>: a,b,c\n     .toList();\n```\n\n`Optional.map` wraps a nullable mapper poorly; `Optional.flatMap` expects the mapper to return `Optional` and avoids `Optional<Optional<T>>`. In RxJava/Reactor the same idea applies to async streams. Interview trap: `map` that returns a collection gives a stream of collections — you usually wanted `flatMap`.\n",
    "pdfTopic": true,
    "tags": [
      "stream",
      "optional",
      "flatten"
    ]
  },
  {
    "id": "jav-034",
    "category": "java",
    "level": "intermediate",
    "topic": "Iterator",
    "question": "What is a Java Iterator, and which collections provide one?",
    "answer": "Loops (`for`, `while`, for-each) are index- or enhanced-for based. The PDF stresses that Java also traverses **with objects**. **`Iterator`** is a collection-framework interface (`hasNext`, `next`, optional `remove`) for walking a collection without exposing its structure.\n\n- **`List` and `Set`** implementations (`ArrayList`, `LinkedList`, `TreeSet`, …) provide `iterator()`.\n- **`Map`** (`HashMap`, `TreeMap`, `LinkedHashMap`) does **not** implement `Iterable`. Iterate `keySet()`, `values()`, or `entrySet()`.\n\nFor-each is syntactic sugar over `Iterator` (or an array). `ListIterator` adds bidirectional movement and `set`. `Iterable.forEach` and streams are later APIs on top of the same idea. Never modify a fail-fast collection except through `Iterator.remove` during iteration.\n",
    "pdfTopic": true,
    "tags": [
      "iterator",
      "collections",
      "iterable"
    ]
  },
  {
    "id": "jav-035",
    "category": "java",
    "level": "intermediate",
    "topic": "Iterator",
    "question": "What is the difference between a fail-fast iterator and a fail-safe iterator?",
    "answer": "**Fail-fast** (PDF): the iterator **fails as soon as the collection’s structure changes** after iteration began — add, remove, or update that changes structure, from this thread or another. Java implements this with a **`modCount`**. If the iterator sees a mismatch, it throws **`ConcurrentModificationException`**. `ArrayList`, `HashMap`, `HashSet` iterators are fail-fast. (It is best-effort, not a hard guarantee under data races.)\n\n**Fail-safe** (PDF): the iterator **does not throw** if the collection is modified during traversal because it works on a **copy** (or a weakly consistent snapshot) rather than the live structure. Examples: `CopyOnWriteArrayList` (iterates the array captured at iterator creation), `ConcurrentHashMap` (weakly consistent, may or may not see later writes, but no `CME`).\n\nTrade-off: fail-fast catches bugs early; fail-safe / concurrent iterators cost copy or allow stale views. “Fail-safe” is interview vocabulary — the JavaDoc prefers “weakly consistent”.\n",
    "pdfTopic": true,
    "tags": [
      "fail-fast",
      "fail-safe",
      "ConcurrentModificationException"
    ]
  },
  {
    "id": "jav-036",
    "category": "java",
    "level": "intermediate",
    "topic": "final vs finally vs finalize",
    "question": "Compare final, finally, and finalize (definition, what they apply to, functionality, execution).",
    "answer": "The PDF comparison has four rows. They are unrelated features that share a name prefix.\n\n### Definition\n- **`final`:** keyword / modifier that **restricts** a class, method, or variable.\n- **`finally`:** a **block** in exception handling that runs **important code whether or not** an exception occurred.\n- **`finalize`:** a **method** meant to run **cleanup just before** the object is garbage collected.\n\n### Applicable to\n- **`final`:** classes, methods, variables (and parameters).\n- **`finally`:** always tied to **try / catch** (or try-with-resources).\n- **`finalize()`:** objects (`Object.finalize`).\n\n### Functionality\n- **`final` variable:** becomes a constant (blank finals must be assigned once). **`final` method:** cannot be overridden. **`final` class:** cannot be extended.\n- **`finally`:** runs cleanup for the try block (close files, unlock) even if an exception is thrown or a `return` happens in try/catch.\n- **`finalize`:** object-level cleanup before destruction.\n\n### Execution\n- A **`final` method** runs only when you **call** it (being `final` does not schedule it).\n- A **`finally` block** runs when the try-catch completes (normally or abruptly), and **does not depend on** whether an exception occurred. (`System.exit` or a crashed JVM can skip it.)\n- **`finalize`** was intended to run **just before the object is destroyed**. It is **deprecated**, runs on a GC thread at an unpredictable time, may never run, and can resurrect objects. Use `AutoCloseable` and try-with-resources instead.\n",
    "pdfTopic": true,
    "tags": [
      "final",
      "finally",
      "finalize",
      "gc"
    ]
  },
  {
    "id": "jav-037",
    "category": "java",
    "level": "intermediate",
    "topic": "Thread vs Runnable",
    "question": "How does extending Thread differ from implementing Runnable?",
    "answer": "The PDF discusses this next to Android `Service`, but the Java core is **Thread vs Runnable**.\n\n- **`Thread`** is a **class** that represents an execution path. You can subclass it and override `run()`, then `start()`.\n- **`Runnable`** is a **functional interface** (`void run()`). A `Thread` (or an `Executor`) *executes* a `Runnable`. `Thread` itself implements `Runnable`.\n\nPrefer **`Runnable` (or `Callable`)** composed into a `Thread` or thread pool:\n\n- Java has **single class inheritance**. Extending `Thread` spends that slot; implementing `Runnable` leaves it free.\n- The same `Runnable` can be submitted to an `ExecutorService`. Subclassing `Thread` ties work to a concrete thread object.\n- Call **`start()`**, not `run()`. `run()` executes on the *current* thread; `start()` allocates a new OS/JVM thread and then calls `run()`.\n\n```java\nRunnable work = () -> doWork();\nnew Thread(work, \"worker\").start();\n```\n\nOn Android, `Service` is a component that runs on the **main thread** by default; heavy work still needs a thread or pool — that is why the PDF groups Thread / Service / Runnable.\n",
    "pdfTopic": true,
    "tags": [
      "thread",
      "runnable",
      "concurrency"
    ]
  },
  {
    "id": "jav-038",
    "category": "java",
    "level": "intermediate",
    "topic": "Stack vs Heap",
    "question": "How does stack memory differ from heap memory in Java?",
    "answer": "The JVM splits runtime memory. Interviewers want a clean split:\n\n**Stack**\n- Per-thread. Each method call pushes a **frame**: local primitives, object *references*, return address.\n- LIFO; frames vanish on return or uncaught exception.\n- Fast, typically smaller; **`StackOverflowError`** if recursion is too deep.\n- Not GC-managed in the same way; storage dies with the frame.\n\n**Heap**\n- Shared by all threads. **`new` objects** (and their instance fields) live here, including arrays.\n- Managed by the **garbage collector**. **`OutOfMemoryError: Java heap space`** when allocation fails.\n- Larger, slower, needs synchronization when objects are shared.\n\nA local `User u = new User()` stores the reference `u` on the stack and the `User` instance on the heap. Static fields live in class metadata (historically permgen, now **Metaspace** for class metadata, with `static` object *referents* still on the heap). Escape analysis can sometimes allocate a scalarized object on the stack, but the mental model remains stack = frames, heap = objects.\n",
    "pdfTopic": true,
    "tags": [
      "stack",
      "heap",
      "memory",
      "jvm"
    ]
  },
  {
    "id": "jav-039",
    "category": "java",
    "level": "intermediate",
    "topic": "Data Structures",
    "question": "Which data structures should a Java interviewer expect you to know, and which JDK types map to them?",
    "answer": "The PDF lists **Data Structures** as its own topic. Answer with the structure, cost, and a Java type.\n\n- **Array:** fixed, O(1) index. `int[]`, `ArrayList` (dynamic array).\n- **Linked list:** O(1) insert at known node, O(n) scan. `LinkedList`.\n- **Stack:** LIFO. `ArrayDeque` (not `java.util.Stack`).\n- **Queue / deque:** FIFO or both ends. `ArrayDeque`, `LinkedList`, `PriorityQueue` (heap).\n- **Hash table:** average O(1) lookup. `HashMap`, `HashSet`, `LinkedHashMap` (insertion order).\n- **Tree / sorted map:** O(log n). `TreeMap`, `TreeSet` (red-black).\n- **Heap:** priority. `PriorityQueue`.\n- **Graph:** adjacency lists (`Map<N, List<N>>`); no single JDK graph type.\n- **Trie / union-find:** roll your own unless a library provides them.\n\nKnow when to pick each: uniqueness → Set; key/value → Map; duplicates + order → List; next-smallest → heap. Also know **Big-O of the ops you will call**, not just the type name.\n",
    "pdfTopic": true,
    "tags": [
      "data-structures",
      "collections",
      "complexity"
    ]
  },
  {
    "id": "jav-040",
    "category": "java",
    "level": "intermediate",
    "topic": "Big-O notation",
    "question": "What is Big-O notation, and which orders of growth should you know?",
    "answer": "The PDF says Big-O **can be skipped but you should have basic knowledge**. Big-O describes how cost **grows** with input size *n* in the **worst case** (common interview default), ignoring constants and lower-order terms.\n\nOrders to recognise, fastest to slowest for large n:\n\n- **O(1)** constant — hashmap expected get, array index.\n- **O(log n)** logarithmic — binary search, balanced tree hop.\n- **O(n)** linear — single scan, linear search.\n- **O(n log n)** linearithmic — efficient comparison sorts (merge, typical quicksort).\n- **O(n²)** quadratic — nested loops; bubble / insertion / selection.\n- **O(2^n)** / **O(n!)** exponential / factorial — naive recursion, permutations.\n\nSay whether you mean time or space. Average vs worst matters for hash maps and quicksort. Amortized O(1) (`ArrayList.add`) is not the same as worst-case O(1). Big-O is an upper bound; Θ and Ω are tighter vocabulary if they push.\n",
    "pdfTopic": true,
    "tags": [
      "big-o",
      "complexity",
      "algorithms"
    ]
  },
  {
    "id": "jav-041",
    "category": "java",
    "level": "intermediate",
    "topic": "Comparator vs Comparable",
    "question": "How do Comparator and Comparable differ?",
    "answer": "Both define **sort order**. They live in different places.\n\n- **`Comparable<T>`** (`java.lang`): the class itself has a **natural order** via `int compareTo(T o)`. `Integer`, `String`, `LocalDate` implement it. `Collections.sort(list)` and `TreeSet` use it when no comparator is given. You get **one** natural order.\n- **`Comparator<T>`** (`java.util`): a **separate** object with `int compare(T a, T b)`. Use it for alternative orders (by name, by salary) without changing the class. `sort(list, comparator)`, `TreeMap` constructors, `Stream.sorted(cmp)`.\n\nReturn negative, zero, or positive. The contract must be a **total order** consistent with `equals` if you use the type in `TreeSet`/`TreeMap` — otherwise equal-by-compare keys vanish. Java 8 helpers: `Comparator.comparing(User::name).thenComparingInt(User::age)`. `compareTo` throwing for unrelated types is a classic `Comparable` pitfall.\n",
    "pdfTopic": true,
    "tags": [
      "comparable",
      "comparator",
      "sorting"
    ]
  },
  {
    "id": "jav-042",
    "category": "java",
    "level": "intermediate",
    "topic": "Serialization",
    "question": "How does Java serialization work, and how does Serializable compare to Android’s Parcelable?",
    "answer": "The PDF’s transfer story: objects moved between Android components must be **Serializable or Parcelable** when stuffed into an `Intent`.\n\n**`Serializable`** (Java):\n- A **marker interface**. Implement it and the JDK writes the object graph with **reflection**.\n- Easy, but the PDF is blunt: reflection creates **many extra objects**, **lots of GC**, and **poor performance**.\n- Control with `serialVersionUID`, `transient` fields, custom `writeObject`/`readObject`. Fragile across class changes. Security: do not deserialize untrusted bytes.\n\n**`Parcelable`** (Android-specific, for contrast):\n- You **write the parcel yourself** (`writeToParcel`, `CREATOR`).\n- **No reflection**, little extra garbage.\n- **Faster**, designed for Binder IPC.\n\nOn the JVM outside Android you still meet `Serializable`, JSON (Jackson/Gson), and binary codecs (Protobuf, Kryo). For Android IPC, prefer `Parcelable` (or Kotlin `Parcelize`). For disk or network, prefer an explicit schema, not default Java serialization.\n",
    "pdfTopic": true,
    "tags": [
      "serializable",
      "parcelable",
      "ipc"
    ]
  },
  {
    "id": "jav-043",
    "category": "java",
    "level": "advanced",
    "topic": "Garbage Collection",
    "question": "How does garbage collection work in Java?",
    "answer": "**Garbage collection** automatically reclaims heap objects that are **no longer reachable** from GC roots (thread stacks, static fields, JNI refs). You allocate with `new`; you do not `free`. The PDF lists GC as an advanced topic because Android and server JVMs both pause or move objects and that shows up in jank and tail latency.\n\nReachability: an object dies when no path from a root exists. `finalize` is not a destructor and is deprecated. `Reference` types: `SoftReference` (cache), `WeakReference` (canonical maps), `PhantomReference` (post-mortem cleanup).\n\nCollectors (HotSpot): **Serial**, **Parallel**, **G1** (default on modern JDKs), **ZGC**, **Shenandoah**. They trade throughput vs pause time. Typical phases: mark live objects, optionally compact/evacuate, reclaim.\n\nTuning knobs: heap size (`-Xms/-Xmx`), collector choice, GC logs. Tools: JFR, `jstat`, Android Studio memory profiler. GC is not a substitute for releasing listeners, closing streams, or clearing caches — those are **memory leaks** of *reachable* objects.\n",
    "pdfTopic": true,
    "tags": [
      "gc",
      "heap",
      "reachability"
    ]
  },
  {
    "id": "jav-044",
    "category": "java",
    "level": "basic",
    "topic": "Enums",
    "question": "What is a Java enum, and what can it contain?",
    "answer": "An **`enum`** is a class that declares a **fixed set of constants**. Each constant is a singleton instance of that type. The PDF lists enums among core interview items; Kotlin’s enum class is the same idea.\n\n```java\nenum Level {\n    LOW(1), HIGH(10);\n    private final int n;\n    Level(int n) { this.n = n; }\n    int n() { return n; }\n}\n```\n\nFacts: constructors are **private** (implicitly). Enums **extend `java.lang.Enum`**, so they cannot extend another class, but they **can implement interfaces**. You can add methods, fields, and per-constant method bodies. `==` is safe for enum identity. Use `EnumSet` and `EnumMap` for compact collections. A single-element enum is the JVM-safe **singleton** form. `valueOf`, `values()`, and `ordinal()` are generated; do not persist `ordinal()`.\n",
    "pdfTopic": true,
    "tags": [
      "enum",
      "singleton",
      "types"
    ]
  },
  {
    "id": "jav-045",
    "category": "java",
    "level": "intermediate",
    "topic": "Observer",
    "question": "What is the Observer pattern, and how do Observer and Observable relate in Java?",
    "answer": "**Observer** (publish–subscribe): a **subject** keeps a list of **observers** and **notifies** them when state changes. The PDF lists “Observer vs Observable” as a Java topic.\n\nLegacy JDK: `java.util.Observable` (subject) and `java.util.Observer`. You `addObserver`, mutate, `setChanged()`, `notifyObservers()`. This API is **deprecated**. It is a class (not an interface), so you must extend it; notification is not thread-safe by default; `setChanged` is easy to forget.\n\nPrefer: `PropertyChangeSupport`, event listeners, RxJava/Flow, `LiveData`/`StateFlow` on Android, or a small custom listener list.\n\nVocabulary: **Observable** = the source of events; **Observer** = the subscriber. In Java **Streams** the names flip in casual speech — stay precise. Failures: leaking observers (never unregister) is a common memory leak.\n",
    "pdfTopic": true,
    "tags": [
      "observer",
      "observable",
      "deprecated"
    ]
  },
  {
    "id": "jav-046",
    "category": "java",
    "level": "intermediate",
    "topic": "equals and hashCode",
    "question": "What is the equals/hashCode contract?",
    "answer": "If you override **`equals`**, you **must** override **`hashCode`** so equal objects have the same hash. `HashMap` and `HashSet` put objects in buckets by hash, then confirm with `equals`. Break the contract and keys vanish or duplicate.\n\n`equals` must be reflexive, symmetric, transitive, consistent, and `x.equals(null)` is false. Use the same fields in both methods. Prefer `Objects.equals` / `Objects.hash`. For mutable keys, **never** mutate fields that participate in equality while the object sits in a hash collection.\n\n`==` tests reference identity; `equals` tests value (if overridden). `record` types generate both. `Object`’s defaults are identity-based.\n",
    "pdfTopic": false,
    "tags": [
      "equals",
      "hashCode",
      "hashmap"
    ]
  },
  {
    "id": "jav-047",
    "category": "java",
    "level": "basic",
    "topic": "String",
    "question": "Why is String immutable in Java, and what follows from that?",
    "answer": "`String` holds a private byte/char array and exposes no mutators. Methods like `substring` / `toUpperCase` return **new** strings (implementation details have changed, but the public type stays immutable).\n\nWhy: **thread safety** without locks; **caching** of hash codes; **security** (strings used as URLs, file paths, class names); the **string pool** can intern safely. `String` is a good `HashMap` key because its hash cannot change.\n\nCost: heavy concatenation in loops allocates many temporaries — use `StringBuilder`. `final` class means no subclasses. Literals intern in the pool; `new String(\"a\")` is a different object unless you `intern()`.\n",
    "pdfTopic": false,
    "tags": [
      "string",
      "immutability",
      "pool"
    ]
  },
  {
    "id": "jav-048",
    "category": "java",
    "level": "basic",
    "topic": "String",
    "question": "What is the difference between == and equals in Java?",
    "answer": "**`==`** on references asks **identity**: same object in memory. On primitives it compares values.\n\n**`equals`** asks **equality** as defined by the class. `Object.equals` is identity. `String`, boxed types, and collections override it for value equality.\n\n```java\nString a = new String(\"x\");\nString b = new String(\"x\");\na == b;      // false\na.equals(b); // true\n```\n\nLiterals `\"x\" == \"x\"` may be true because of interned pool instances — do not write production code that depends on that. For boxed integers, `==` is true for cached values in **−128..127** and a trap outside that range. Kotlin’s `==` is `equals`; `===` is reference equality — do not mix the languages in an answer.\n",
    "pdfTopic": false,
    "tags": [
      "==",
      "equals",
      "identity"
    ]
  },
  {
    "id": "jav-049",
    "category": "java",
    "level": "intermediate",
    "topic": "Exceptions",
    "question": "What is the difference between checked and unchecked exceptions?",
    "answer": "All exceptions extend `Throwable`. **`Error`** (and `VirtualMachineError`) and **`RuntimeException`** are **unchecked**. Everything else under `Exception` is **checked**: the compiler requires `catch` or `throws`.\n\n- **Checked:** recoverable conditions the caller should handle — `IOException`, `SQLException`. They appear in APIs that talk to the outside world.\n- **Unchecked:** programming bugs or states that usually cannot be usefully handled at every layer — `NullPointerException`, `IllegalArgumentException`, `IndexOutOfBoundsException`.\n\n`try/catch/finally`, `throws`, and try-with-resources apply to both. Do not catch `Error`. Wrapping checked exceptions in unchecked ones is a style choice (streams do this a lot). Android/Kotlin often prefer unchecked; classic Java libraries still use checked IO.\n",
    "pdfTopic": false,
    "tags": [
      "checked",
      "unchecked",
      "exception"
    ]
  },
  {
    "id": "jav-050",
    "category": "java",
    "level": "intermediate",
    "topic": "Exceptions",
    "question": "What is try-with-resources, and why is it preferred over a finally block for closing?",
    "answer": "**Try-with-resources** (Java 7) declares `AutoCloseable` resources in the `try (...)`. The compiler emits `close()` in a generated `finally`, including **suppressed exceptions** on the primary throwable (`getSuppressed()`).\n\n```java\ntry (InputStream in = Files.newInputStream(path);\n     BufferedReader br = new BufferedReader(new InputStreamReader(in))) {\n    return br.readLine();\n}\n```\n\nResources close in **reverse** declaration order. `finally` still exists for non-resource cleanup (metrics, locks not modelled as closeable). `finalize` is not a close mechanism. A resource must implement `AutoCloseable`; `close` should be idempotent.\n",
    "pdfTopic": false,
    "tags": [
      "try-with-resources",
      "autocloseable",
      "finally"
    ]
  },
  {
    "id": "jav-051",
    "category": "java",
    "level": "intermediate",
    "topic": "Generics",
    "question": "How do Java generics work, and what is type erasure?",
    "answer": "Generics add **compile-time type parameters**: `List<String>` stops you from `add(3)`. At runtime, **type erasure** wipes those parameters: the JVM sees `List`. Bridges and casts are inserted by `javac`.\n\nConsequences:\n\n- No `new T()`, no `T[]` without a factory or `Array.newInstance`.\n- You cannot overload `void f(List<A>)` and `void f(List<B>)`.\n- `instanceof List<String>` is illegal; `instanceof List<?>` is fine.\n- **Wildcards:** `List<? extends T>` is producer (get), `List<? super T>` is consumer (put) — PECS.\n\nRaw types (`List` without `<>`) exist for compatibility; avoid them. `reified` types are a Kotlin/JVM-inline trick; Java needs `Class<T>` tokens for runtime type checks.\n",
    "pdfTopic": false,
    "tags": [
      "generics",
      "erasure",
      "wildcards"
    ]
  },
  {
    "id": "jav-052",
    "category": "java",
    "level": "advanced",
    "topic": "HashMap",
    "question": "How does HashMap work internally?",
    "answer": "`HashMap` is an array of **bins** (buckets). `hashCode` of the key is mixed (XOR with a shifted copy) then masked to a table index. Each bin is a **linked list**, and since Java 8 it **treeifies** into a red-black tree when a bin grows past **8** entries and the table is large enough (**64**), untreeifying below **6**.\n\n`put`: compute hash, find bin, compare keys with `==` then `equals`, replace or insert. When `size > capacity * loadFactor` (default **0.75**), the table **resizes to 2×** and rehashes. Capacity is always a power of two.\n\nNull: one `null` key is allowed (in `HashMap`, not `ConcurrentHashMap` or `Hashtable`). Iteration order is unordered (use `LinkedHashMap` for insertion/access order). Not thread-safe; concurrent resize used to risk a CPU spin in ancient JDKs — today you still get lost updates and `CME` on iterators.\n\nGood keys: immutable, stable `hashCode`/`equals`, well distributed.\n",
    "pdfTopic": false,
    "tags": [
      "hashmap",
      "buckets",
      "treeify"
    ]
  },
  {
    "id": "jav-053",
    "category": "java",
    "level": "advanced",
    "topic": "ConcurrentHashMap",
    "question": "How does ConcurrentHashMap differ from HashMap and Hashtable?",
    "answer": "**`HashMap`:** fast, unsynchronized, `null` key/values allowed, fail-fast iterators.\n\n**`Hashtable`:** legacy, every method synchronized on the whole table, no nulls, still coarse-grained.\n\n**`ConcurrentHashMap`:** no nulls; reads are largely non-blocking; writes lock at **bin** granularity (Java 8+ uses CAS on nodes and `synchronized` on the bin head, not the old 16-segment table). Size is an estimate under concurrency. Iterators are **weakly consistent** — no `ConcurrentModificationException`, they may skip or include later writes.\n\n`compute`, `merge`, `putIfAbsent` are atomic for that key. Do not use `get` + `put` as a compound action. For a concurrent set, `ConcurrentHashMap.newKeySet()` beats a synchronized `HashSet`.\n",
    "pdfTopic": false,
    "tags": [
      "concurrenthashmap",
      "cas",
      "concurrency"
    ]
  },
  {
    "id": "jav-054",
    "category": "java",
    "level": "intermediate",
    "topic": "Collections",
    "question": "How does ArrayList differ from LinkedList?",
    "answer": "**`ArrayList`:** contiguous array. **O(1)** random access, **amortized O(1)** add at end, **O(n)** add/remove in the middle (shift). Better locality. Default capacity 10; grows by ~1.5×.\n\n**`LinkedList`:** doubly linked nodes. **O(n)** access by index, **O(1)** add/remove at the ends or with an iterator at a known node. Each element pays node overhead and pointer chasing.\n\nIn real JVM code `ArrayList` almost always wins for `List` workloads. Use `ArrayDeque` for queues/stacks, not `LinkedList`. `LinkedList` implements `Deque` and `List`; that extra API is not a reason to pick it for random access.\n",
    "pdfTopic": false,
    "tags": [
      "arraylist",
      "linkedlist",
      "list"
    ]
  },
  {
    "id": "jav-055",
    "category": "java",
    "level": "intermediate",
    "topic": "Collections",
    "question": "How does HashSet differ from TreeSet?",
    "answer": "Both implement `Set` (no duplicates by `equals` for HashSet, by comparator for TreeSet).\n\n- **`HashSet`:** backed by a `HashMap`. Average **O(1)** add/contains/remove. Unordered (iteration order can change on resize). Allows one `null`.\n- **`TreeSet`:** backed by a `TreeMap` (red-black tree). **O(log n)** operations. Sorted by `Comparable` or a `Comparator`. `null` is not allowed if natural ordering is used (NPE). Extra API: `first`, `higher`, `subSet`.\n\nIf you need order of insertion, `LinkedHashSet`. If you need concurrency, `ConcurrentHashMap.newKeySet()`. Equality vs ordering mismatch (`compareTo` disagreeing with `equals`) breaks `TreeSet` uniqueness.\n",
    "pdfTopic": false,
    "tags": [
      "hashset",
      "treeset",
      "set"
    ]
  },
  {
    "id": "jav-056",
    "category": "java",
    "level": "advanced",
    "topic": "Concurrency",
    "question": "What does the volatile keyword do?",
    "answer": "**`volatile`** gives **visibility** and **ordering**, not mutual exclusion.\n\n- A write to a volatile field **happens-before** every subsequent read of that field (JMM). Other threads see the latest value; the JVM will not cache it indefinitely in a register.\n- It prevents certain reorderings around that field.\n- A single volatile read/write is atomic (including 64-bit `long`/`double`, which might otherwise tear). **`volatile++` is not atomic** — it is read, increment, write.\n\nUse: shutdown flags, double-checked locking (the singleton instance field), publishing an immutable config. Do not use it as a substitute for `synchronized` when updating two fields together or incrementing counters (`AtomicInteger`, `LongAdder`).\n",
    "pdfTopic": false,
    "tags": [
      "volatile",
      "jmm",
      "visibility"
    ]
  },
  {
    "id": "jav-057",
    "category": "java",
    "level": "intermediate",
    "topic": "Concurrency",
    "question": "What does synchronized do in Java?",
    "answer": "**`synchronized`** acquires an **intrinsic lock** (monitor) on an object, runs the body, then releases it — even on exceptions.\n\n- Instance method: lock is `this`.\n- Static method: lock is the `Class` object.\n- Block: `synchronized (lock) { }`.\n\nIt provides **exclusion** (one thread in the critical section per lock) **and** **happens-before** (unlock flushes writes; the next lock sees them). Use a **private final** lock object if you do not want callers to contend on `this`.\n\nLimits: no try-lock or interruptible wait on the intrinsic lock (`ReentrantLock` can). Nested synchronized on the same object is reentrant. Prefer concurrent collections and atomics when they fit; synchronize when you have compound invariants.\n",
    "pdfTopic": false,
    "tags": [
      "synchronized",
      "monitor",
      "lock"
    ]
  },
  {
    "id": "jav-058",
    "category": "java",
    "level": "advanced",
    "topic": "Concurrency",
    "question": "What is a deadlock, and how do you prevent it?",
    "answer": "**Deadlock:** two or more threads wait forever for locks the others hold. Classic: T1 locks A then wants B; T2 locks B then wants A.\n\nCoffman conditions (all required): **mutual exclusion**, **hold and wait**, **no preemption**, **circular wait**. Break any one:\n\n- **Lock ordering:** always acquire locks in the same global order.\n- **Try-lock with timeout** and back off (`ReentrantLock.tryLock`).\n- Avoid nested locks; shrink critical sections.\n- Do not call alien methods while holding a lock (lock inversion / deadlock with client code).\n\nDiagnose with `jstack`, thread dumps, VisualVM, or Android Studio: look for `BLOCKED` threads and a cycle. Livelock and starvation are related but different (threads busy but making no progress, or one thread never entering).\n",
    "pdfTopic": false,
    "tags": [
      "deadlock",
      "locks",
      "threading"
    ]
  },
  {
    "id": "jav-059",
    "category": "java",
    "level": "advanced",
    "topic": "Concurrency",
    "question": "How do wait, notify, and notifyAll work?",
    "answer": "They are **`Object`** methods, not `Thread` methods. A thread must **own the monitor** (`synchronized` on that object) or you get `IllegalMonitorStateException`.\n\n- **`wait()`:** releases the lock and parks until **notify/notifyAll**, a timeout, or a spurious wakeup. Always wait in a **loop** that rechecks the condition.\n- **`notify()`:** wakes one waiter. **`notifyAll()`:** wakes all; they re-contend for the lock. Prefer `notifyAll` unless you know only one waiter can proceed.\n\n```java\nsynchronized (lock) {\n    while (!ready) lock.wait();\n    // consume\n}\nsynchronized (lock) {\n    ready = true;\n    lock.notifyAll();\n}\n```\n\n**`sleep`** does **not** release the monitor. Prefer `BlockingQueue`, `CountDownLatch`, `Condition` for new code; know wait/notify because interviewers still ask.\n",
    "pdfTopic": false,
    "tags": [
      "wait",
      "notify",
      "monitor"
    ]
  },
  {
    "id": "jav-060",
    "category": "java",
    "level": "intermediate",
    "topic": "Concurrency",
    "question": "What is ExecutorService, and why not create raw Threads?",
    "answer": "**`ExecutorService`** is a thread-pool API: you submit `Runnable`/`Callable`, it runs them on worker threads. `Executors.newFixedThreadPool(n)`, `newSingleThreadExecutor()`, `newCachedThreadPool()`, `newScheduledThreadPool(n)`. Production code often uses `ThreadPoolExecutor` with an explicit queue, bounds, and `CallerRunsPolicy`.\n\nBenefits: reuse threads (avoid OS spawn cost), cap concurrency, `invokeAll` / `invokeAny`, `Future` cancellation, orderly `shutdown` vs `shutdownNow`.\n\nAlways **shut down** pools you own. `Executors` factory methods use unbounded queues or unbounded threads — those can OOM. On Android, prefer the pools you configure, WorkManager, or coroutines; do not leak a pool from an Activity. Java 21 virtual threads change the “one pool per blocking task” story, but the Executor abstraction remains.\n",
    "pdfTopic": false,
    "tags": [
      "executor",
      "thread-pool",
      "future"
    ]
  },
  {
    "id": "jav-061",
    "category": "java",
    "level": "intermediate",
    "topic": "Stream API",
    "question": "How does the Stream API work, and what is the difference between intermediate and terminal operations?",
    "answer": "`Stream` is a **lazy** pipeline over data, not a storage type. You build it with `stream()`, `of`, `iterate`, then chain operations, then a **terminal** op runs the pipeline.\n\n- **Intermediate** (`map`, `filter`, `flatMap`, `distinct`, `sorted`, `limit`): return a new stream, **lazy**, usually stateless. `sorted` and `distinct` are stateful.\n- **Terminal** (`forEach`, `collect`, `reduce`, `count`, `findFirst`): trigger execution, consume the stream. A stream can be consumed **once**.\n\n```java\nlist.stream().filter(x -> x > 0).map(Object::toString).toList();\n```\n\nParallel streams (`parallelStream`) use the common ForkJoinPool — easy to mis-size on a server or Android. Prefer `collect(Collectors.toList())` on older Java; `toList()` (unmodifiable) from Java 16. Do not mutate shared state inside `forEach` in parallel.\n",
    "pdfTopic": false,
    "tags": [
      "stream",
      "lazy",
      "collect"
    ]
  },
  {
    "id": "jav-062",
    "category": "java",
    "level": "intermediate",
    "topic": "Optional",
    "question": "What is Optional, and how should you use it?",
    "answer": "**`Optional<T>`** is a container that may hold a value or be empty. It makes a missing return value **explicit** and pushes you toward `map` / `flatMap` / `orElse` instead of NPEs.\n\nUse as a **return type** when “none” is normal. Do **not** use as a field, method parameter, or element of a collection (use empty collections). Do not call `get()` without `isPresent()`; prefer `orElse`, `orElseGet`, `orElseThrow`. `orElse(compute())` always computes — use `orElseGet` for expensive defaults.\n\n`map` transforms a present value; `flatMap` when the function already returns `Optional`. `Optional.of(null)` throws; `ofNullable` does not. Primitive specializations: `OptionalInt`, etc., avoid boxing.\n",
    "pdfTopic": false,
    "tags": [
      "optional",
      "null",
      "api-design"
    ]
  },
  {
    "id": "jav-063",
    "category": "java",
    "level": "basic",
    "topic": "Autoboxing",
    "question": "What is autoboxing and unboxing, and what are the traps?",
    "answer": "**Autoboxing** converts a primitive to its wrapper (`int` → `Integer`); **unboxing** goes the other way. The compiler inserts `Integer.valueOf` / `intValue`.\n\nTraps:\n\n- **Null unbox:** `Integer x = null; int y = x;` throws `NullPointerException`.\n- **Identity cache:** `Integer.valueOf` caches **−128..127**. `Integer a = 127; Integer b = 127; a == b` is true; `128 == 128` as boxed `==` is often false. Always `equals` for wrappers.\n- **Performance:** boxing in tight loops and as `List<Integer>` allocates and stresses GC. Prefer primitive arrays or specialized collections when profiling says so.\n- Overload resolution can pick a surprising method when mixing primitives and wrappers.\n",
    "pdfTopic": false,
    "tags": [
      "boxing",
      "integer-cache",
      "primitives"
    ]
  },
  {
    "id": "jav-064",
    "category": "java",
    "level": "advanced",
    "topic": "Class loading",
    "question": "How does class loading work in the JVM?",
    "answer": "A **class loader** locates bytecode, defines a `Class`, and links it. The usual **delegation** hierarchy:\n\n1. **Bootstrap** — core `java.*` (native, no Java object).\n2. **Platform** (historically extension) — modules like `java.sql`.\n3. **Application** (system) — classpath / module path.\n\nA loader asks its **parent first** (unless it is a custom child-first loader, which is rare and fragile). The same class name loaded by two loaders is **two classes** (`ClassCastException` across plugin boundaries).\n\nPhases: **load**, **link** (verify, prepare statics, resolve refs), **initialize** (`<clinit>`). `Class.forName` initializes; `loadClass` may not. Android’s ART/Dex has a different file format but the same “who defined this class” idea. Leaking a loader (static caches, ThreadLocal) is a classic PermGen/Metaspace leak.\n",
    "pdfTopic": false,
    "tags": [
      "classloader",
      "jvm",
      "delegation"
    ]
  },
  {
    "id": "jav-065",
    "category": "java",
    "level": "advanced",
    "topic": "Reflection",
    "question": "What is reflection, and when is it a bad idea?",
    "answer": "**Reflection** (`java.lang.reflect`) inspects and invokes types at runtime: `Class.forName`, `getDeclaredMethod`, `setAccessible`, `invoke`. Frameworks (Spring, Gson, Hibernate, Android Instant Apps tooling) depend on it. The PDF’s Serializable path uses reflection, which is why it allocates and is slow.\n\nCosts: slower than direct calls, breaks encapsulation, skips generic type safety, fights ahead-of-time compilers (Graal, R8) unless you keep metadata. Security managers and modules (`opens`) can deny access.\n\nPrefer: compiled interfaces, service loaders, annotation processors, `MethodHandle`, or generated adapters (`Parcelable` vs `Serializable` is the same lesson). If you reflect, cache `Method` objects and handle `InvocationTargetException`.\n",
    "pdfTopic": false,
    "tags": [
      "reflection",
      "class",
      "frameworks"
    ]
  },
  {
    "id": "jav-066",
    "category": "java",
    "level": "basic",
    "topic": "Marker interfaces",
    "question": "What is a marker interface? Give Java examples.",
    "answer": "A **marker** (tag) interface declares **no methods**. It marks a type so the JVM or library can treat instances specially.\n\nClassic JDK markers: **`Serializable`** (eligible for default serialization), **`Cloneable`** (`Object.clone` is allowed to copy fields; otherwise `CloneNotSupportedException`), **`RandomAccess`** (`List` implementations that are fast by index — `ArrayList` yes, `LinkedList` no — so algorithms can switch strategy).\n\nToday many “markers” are **annotations** (`@FunctionalInterface`, `@Deprecated`). Know both. A marker is a type you can still `instanceof`; an annotation is metadata. Empty interfaces for DI scopes are a style, not a JVM feature.\n",
    "pdfTopic": false,
    "tags": [
      "serializable",
      "cloneable",
      "marker"
    ]
  },
  {
    "id": "jav-067",
    "category": "java",
    "level": "intermediate",
    "topic": "Clone",
    "question": "How does cloning work in Java, and why is it often avoided?",
    "answer": "`Object.clone` does a **shallow field copy** and throws unless the class implements **`Cloneable`**. You override `clone()`, call `super.clone()`, then deep-copy mutable fields.\n\nProblems: `Cloneable` has no `clone` method (it is a marker); `clone` is `protected` on `Object`; shallow copies alias mutable state; inheritance and `final` fields fight you; it bypasses constructors (invariants, even `record` style).\n\nPrefer a **copy constructor**, a static `of` factory, or `Builder`. If you must clone arrays, `arr.clone()` or `Arrays.copyOf` is fine. Deep clone of graphs is usually serialization or an explicit mapper, not `clone()`.\n",
    "pdfTopic": false,
    "tags": [
      "clone",
      "cloneable",
      "shallow-copy"
    ]
  },
  {
    "id": "jav-068",
    "category": "java",
    "level": "intermediate",
    "topic": "Immutability",
    "question": "How do you design an immutable class in Java?",
    "answer": "An immutable object’s state never changes after construction. Recipe:\n\n1. Declare the class **`final`** (or make it unextendable).\n2. Make all fields **`private final`**.\n3. **No setters**; initialize in the constructor (or a factory).\n4. If a field is a mutable type (`Date`, arrays, lists), **defensive copy** on the way in and out (`List.copyOf`, clone the array).\n5. Do not leak `this` during construction (no registering listeners in the constructor).\n\nBenefits: thread-safe publication (with safe publishing / `final` fields), easy `equals`/`hashCode`, good map keys. `String`, boxed primitives, `LocalDate`, and `record`s (when components are immutable) follow this. Java records give a concise immutable data carrier but still copy mutable components yourself.\n",
    "pdfTopic": false,
    "tags": [
      "immutable",
      "final",
      "thread-safety"
    ]
  },
  {
    "id": "jav-069",
    "category": "java",
    "level": "intermediate",
    "topic": "Composition vs inheritance",
    "question": "When should you use composition instead of inheritance?",
    "answer": "**Inheritance** is an **is-a** relationship: it reuses API and enables polymorphism, but it is a **tight, compile-time** coupling. Subclasses break if the parent changes (`fragile base class`). You get only one superclass.\n\n**Composition** is **has-a**: hold a reference and delegate. You can change the delegate, mock it, combine several behaviours, and keep the public API small.\n\nJoshua Bloch’s rule: **favor composition over inheritance** unless you are in the same codebase and the type is designed for extension (`abstract` hooks, documented `protected` methods). Wrapper/decorator and strategy are composition. Android examples: prefer injecting a repository over subclassing `Application` for every feature. Inheritance of *interfaces* is cheap; inheritance of *implementation* is the expensive one.\n",
    "pdfTopic": false,
    "tags": [
      "composition",
      "inheritance",
      "design"
    ]
  },
  {
    "id": "jav-070",
    "category": "java",
    "level": "intermediate",
    "topic": "SOLID",
    "question": "What are the SOLID principles, briefly, in Java terms?",
    "answer": "SOLID is a checklist for object design, not a Java feature.\n\n- **S**ingle Responsibility: one reason to change per class. A `User` should not also send email.\n- **O**pen/Closed: open for extension, closed for modification — new behaviour via new types (strategy, decorator), not endless `if` chains in a core class.\n- **L**iskov Substitution: subclasses must honour the parent contract. A `Square` that breaks `Rectangle.setWidth` violates LSP.\n- **I**nterface Segregation: many small interfaces beat one fat `Manager` with methods some clients cannot use.\n- **D**ependency Inversion: depend on abstractions; inject implementations (the PDF’s DI example is DIP in action).\n\nInterviewers want an example, not the Wikipedia sentence. Tie DIP to constructor injection and SRP to splitting Android Activities that do networking, parsing, and UI in one file.\n",
    "pdfTopic": false,
    "tags": [
      "solid",
      "design",
      "di"
    ]
  },
  {
    "id": "jav-071",
    "category": "java",
    "level": "advanced",
    "topic": "Memory leaks",
    "question": "What causes memory leaks in Java, and how do you find them?",
    "answer": "The GC frees **unreachable** objects. A “leak” on the JVM is an object you **no longer need** but that is still **reachable**.\n\nCommon sources:\n\n- **Static** collections that grow without bounds.\n- Listeners / callbacks / inner classes holding an Activity or View (Android).\n- **`ThreadLocal`** not `remove()`d on thread pools (threads live on).\n- Unclosed streams / sockets (native memory too).\n- Caches without eviction; interned strings or `String.intern` abuse.\n- Custom class loaders pinned by a static cache.\n\nFind them with heap dumps (MAT, VisualVM, Android Profiler): look at **dominators**, retained size, duplicate bitmaps. Fix by bounding caches, using `WeakReference` only with a clear policy, unregistering listeners, try-with-resources, and avoiding static Contexts.\n",
    "pdfTopic": false,
    "tags": [
      "leak",
      "heap",
      "gc"
    ]
  },
  {
    "id": "jav-072",
    "category": "java",
    "level": "advanced",
    "topic": "Garbage Collection",
    "question": "How do generational garbage collectors organize the heap?",
    "answer": "Most HotSpot collectors are **generational**: the **weak generational hypothesis** says most objects die young.\n\n- **Young generation:** **Eden** plus two **survivor** spaces (S0/S1). New objects allocate in Eden. A **minor GC** copies live objects to a survivor; objects that survive several copies are **tenured**.\n- **Old (tenured) generation:** long-lived objects. **Major / full** collections are rarer and more expensive (collector-dependent).\n- **Metaspace:** class metadata (native memory), not Java objects. Static *object* fields still point at heap objects.\n\n**G1** splits the heap into regions rather than two big contiguous spaces, but still treats some regions as young. **ZGC** is region-based with very short pauses and is less “classic nursery”. On Android, ART’s collector is a different implementation with the same idea: short-lived UI objects vs long-lived singletons.\n\nPromotion failures and long GC pauses show up as jank. Tuning without metrics is guesswork.\n",
    "pdfTopic": false,
    "tags": [
      "gc",
      "eden",
      "survivor",
      "old-gen"
    ]
  },
  {
    "id": "jav-073",
    "category": "java",
    "level": "advanced",
    "topic": "JIT",
    "question": "What is the JIT compiler, and how does it relate to bytecode?",
    "answer": "`javac` emits **bytecode** (`.class`), not machine code. The **JVM interpreter** starts executing it. The **JIT (Just-In-Time)** compiler — HotSpot’s C1 (client) and C2 (server) — compiles **hot** methods to native code using type profiles (speculative inlining, monomorphic calls, escape analysis).\n\n**Tiered compilation** is the default: interpret → C1 with profiling → C2. Deoptimization rolls back if a speculation fails. **AOT** (Graal native image, Android ART) compiles earlier; the PDF notes ART compiles bytecode toward native code from Android 5.\n\nWhy it matters: microbenchmarks need warmup (`JMH`). `-Xint` disables JIT. Inlining and lock elision explain why “obviously expensive” Java sometimes is not. Bytecode is still the portable unit; JIT is the performance engine on the server JVM.\n",
    "pdfTopic": false,
    "tags": [
      "jit",
      "hotspot",
      "bytecode"
    ]
  },
  {
    "id": "jav-074",
    "category": "java",
    "level": "basic",
    "topic": "Bytecode",
    "question": "What is Java bytecode?",
    "answer": "**Bytecode** is the JVM’s instruction set, stored in `.class` files: opcodes like `aload_0`, `invokevirtual`, `getfield`, plus a constant pool. It is **portable** — write once, run on any JVM that implements the spec.\n\n`javac` produces it; `javap -c` disassembles it. The JVM **verifies** it (type safety, stack depth) before execution. Android historically converted it to **Dalvik DEX**; ART still starts from DEX, not from HotSpot `.class` on device.\n\nInterview links: overloading is resolved in bytecode as different method descriptors; overriding is `invokevirtual` at a vtable slot; lambdas are `invokedynamic`. You do not write bytecode by hand, but knowing it exists explains why Kotlin and Java interoperate and why ProGuard/R8 rewrite it.\n",
    "pdfTopic": false,
    "tags": [
      "bytecode",
      "class-file",
      "jvm"
    ]
  },
  {
    "id": "jav-075",
    "category": "java",
    "level": "intermediate",
    "topic": "String",
    "question": "Why should a HashMap key usually be immutable?",
    "answer": "A `HashMap` places a key in a bucket using `hashCode` at insert time. `get` hashes again and looks in that bucket. If you **mutate** a field that `hashCode`/`equals` use, the key **sits in the old bucket** but hashes to a new one — the map **cannot find it**, and a rehash may never repair it.\n\nImmutable keys (`String`, boxed primitives, records of immutables, well-written value types) keep the hash stable. If you must use a mutable object, **never change equality fields** while it is a key. This is the practical follow-up to the equals/hashCode contract and to String immutability.\n",
    "pdfTopic": false,
    "tags": [
      "hashmap",
      "immutable",
      "hashCode"
    ]
  },
  {
    "id": "jav-076",
    "category": "java",
    "level": "intermediate",
    "topic": "Concurrency",
    "question": "What is the Java memory model’s happens-before relationship in practical terms?",
    "answer": "The **JMM** defines when a write becomes visible. **Happens-before** is the rule of thumb:\n\n- Unlock of monitor M happens-before a later lock of M (`synchronized`).\n- Write to a **volatile** happens-before a later read of that volatile.\n- A thread’s actions happen-before it `join()`s; `start()` happens-before the started thread’s run.\n- Constructor writes to **final** fields happen-before another thread sees the published object (safe publication), if you do not leak `this`.\n\nWithout these, a thread may see stale values or impossible reorderings (`ready = true` appearing before the payload is written). `volatile` and `synchronized` are the language tools; `java.util.concurrent` builds on them. This is the advanced companion to the stack/heap and singleton DCL questions.\n",
    "pdfTopic": false,
    "tags": [
      "jmm",
      "happens-before",
      "volatile"
    ]
  },
  {
    "id": "jav-077",
    "category": "java",
    "level": "basic",
    "topic": "OOP",
    "question": "What is the difference between an object and a class at runtime (including Class objects)?",
    "answer": "At source level, a class is the blueprint and objects are instances. At runtime there is a third player: a **`java.lang.Class`** object per loaded type, used for reflection, synchronization on static methods, and `.class` literals.\n\n`foo.getClass() == Foo.class` is true for exact types (not subclasses). `Class` is heap metadata from the class loader’s point of view; instances of `Foo` are separate heap objects. Static methods run without a `Foo` instance but still need the class to be initialized (`<clinit>`). This question ties Objects/Classes (PDF) to Class loading and static members.\n",
    "pdfTopic": true,
    "tags": [
      "class",
      "runtime",
      "reflection"
    ]
  },
  {
    "id": "jav-078",
    "category": "java",
    "level": "intermediate",
    "topic": "Collections",
    "question": "How do you sort a List in Java, and how do search APIs relate?",
    "answer": "`Collections.sort(list)` or `list.sort(comparator)` sorts in place. Object lists use **TimSort** (stable, O(n log n) worst, near O(n) on partial order). `Arrays.sort` for primitives uses dual-pivot **quicksort** (not stable).\n\nFor search: unsorted → linear (`indexOf`, a loop). Sorted → `Collections.binarySearch` / `Arrays.binarySearch` (PDF binary search). The comparator used to sort **must** be the one used to search.\n\n`Comparable` natural order vs `Comparator` was a PDF pair — sorting is where they meet. Never binary-search a list sorted with a different order.\n",
    "pdfTopic": true,
    "tags": [
      "sort",
      "binary-search",
      "timsort"
    ]
  },
  {
    "id": "jav-079",
    "category": "java",
    "level": "advanced",
    "topic": "Garbage Collection",
    "question": "What are GC roots, and when is an object eligible for collection?",
    "answer": "An object is eligible when it is **unreachable from GC roots**. Roots include:\n\n- Local variables and operand stacks of live stack frames.\n- Active thread objects.\n- Static fields of loaded classes.\n- JNI global references.\n\nReference strength: strong (normal) > soft (caches, collected under pressure) > weak (does not keep the referent alive) > phantom (used with a `ReferenceQueue` after finalization/cleanup). Cycles of strong refs stay alive; cycles with no root path are collected — Java GC is not reference counting.\n\n`System.gc()` is a hint, not a command. Eligibility is about reachability, not about calling `finalize` (deprecated) or going out of a method if a static still points at the object.\n",
    "pdfTopic": true,
    "tags": [
      "gc",
      "roots",
      "reachability"
    ]
  },
  {
    "id": "jav-080",
    "category": "java",
    "level": "intermediate",
    "topic": "Design Patterns",
    "question": "How would you implement Dependency Injection without a framework, and how does that relate to Singleton and Factory?",
    "answer": "Manual DI is **constructor parameters** (PDF `Car(Engine)`). A small `main` or composition root **creates** the graph: build a logger, a client, a repository, then the app. That composition root may use a **Factory** when the concrete type depends on config, and it may hold **one** shared client — a **Singleton by wiring**, not by `getInstance()` globals.\n\nFrameworks (Dagger, Hilt, Spring, Guice) generate or reflect that graph. Interviewers like this combo because the PDF lists Singleton, Factory, and DI as neighbours: singleton as “one instance” is often better as “one instance in the container”, factory as “choose the implementation”, DI as “do not `new` your collaborators inside the class”.\n",
    "pdfTopic": true,
    "tags": [
      "di",
      "factory",
      "singleton"
    ]
  }
];
