window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.kotlin = [
  {
    "id": "kot-001",
    "category": "kotlin",
    "level": "basic",
    "topic": "Kotlin intro",
    "question": "What is Kotlin, and why do Android teams use it?",
    "answer": "Kotlin is a statically typed, JVM-first language from JetBrains that compiles to bytecode and runs wherever Java does. Google made it a first-class Android language in 2017 and the preferred language later, so new Android APIs, Jetpack, and samples are Kotlin-first.\n\nIn interviews, say what problem it solves: less boilerplate than Java, first-class null safety, coroutines for async work, and seamless Java interop so you can migrate module by module.\n\n- Compiles to JVM bytecode, JavaScript, native, and (via Kotlin Multiplatform) shared modules.\n- 100% interoperable with existing Java libraries and Android SDK.\n- Concise syntax: data classes, default arguments, extension functions, smart casts.\n- Null safety is in the type system, not a convention.",
    "pdfTopic": false,
    "tags": [
      "kotlin",
      "jvm",
      "android"
    ]
  },
  {
    "id": "kot-002",
    "category": "kotlin",
    "level": "basic",
    "topic": "Kotlin features",
    "question": "What language features should you mention when asked about Kotlin’s advantages over Java?",
    "answer": "Lead with features interviewers actually probe, then connect each to a real Android win.\n\n- **Null safety:** `String` vs `String?` plus `?.`, `?:`, and `let` so NPEs are compile-time issues.\n- **Coroutines:** structured concurrency instead of nested callbacks or raw threads.\n- **Data classes:** `equals` / `hashCode` / `toString` / `copy` generated from properties.\n- **Extension functions:** add APIs to types you do not own (`View.show()`).\n- **Smart casts:** after `is` or a null check, the compiler narrows the type.\n- **Default and named arguments:** kill most Java builder overloads.\n- **Interoperability:** call Java from Kotlin and Kotlin from Java with `@JvmStatic`, `@JvmOverloads`, `@JvmField`.\n- **Concise collections:** `map`, `filter`, `groupBy`, sequences for lazy pipelines.",
    "pdfTopic": false,
    "tags": [
      "features",
      "java-interop"
    ]
  },
  {
    "id": "kot-003",
    "category": "kotlin",
    "level": "basic",
    "topic": "val vs var",
    "question": "What is the difference between val and var?",
    "answer": "`val` declares a **read-only** reference (like Java `final`). `var` declares a **mutable** reference. The distinction is about the *variable*, not about whether the object it points to is immutable.\n\n- `val name = \"Ada\"` — you cannot reassign `name`.\n- `var count = 0` then `count += 1` is legal.\n- A `val` list can still be mutated if it is a `MutableList`: `val items = mutableListOf(1); items.add(2)`.\n- Prefer `val` by default. Reach for `var` only when the binding itself must change.\n- For compile-time constants use `const val` on `object` / companion / top-level primitives and String.",
    "pdfTopic": false,
    "tags": [
      "val",
      "var",
      "immutability"
    ],
    "code": "val userId: String = \"u-42\"      // reference cannot change\nvar retries: Int = 0             // reference can change\nval buffer = mutableListOf<Byte>()\nbuffer += 0x1                    // object mutates; val is still valid"
  },
  {
    "id": "kot-004",
    "category": "kotlin",
    "level": "basic",
    "topic": "Null safety",
    "question": "How does Kotlin’s null safety work?",
    "answer": "Every type is non-null by default. Append `?` to allow null: `String` cannot hold null; `String?` can. The compiler forces you to handle the nullable case before you dereference.\n\nThat is the single biggest Kotlin/Java interview contrast. Java `String s` may be null at runtime; Kotlin `String s` will not compile if you assign null.\n\n- **Safe call** `user?.name` — returns null if `user` is null.\n- **Elvis** `user?.name ?: \"guest\"` — fallback when the left side is null.\n- **Not-null assertion** `user!!.name` — throw NPE if null; avoid in production paths.\n- **Safe cast** `as?` returns null instead of `ClassCastException`.\n- **Platform types** from Java (`String!`) are treated as unknown nullability; annotate Java with `@Nullable` / `@NonNull` or handle defensively.",
    "pdfTopic": false,
    "tags": [
      "null-safety",
      "types"
    ]
  },
  {
    "id": "kot-005",
    "category": "kotlin",
    "level": "basic",
    "topic": "Elvis operator",
    "question": "Explain the Elvis operator `?:`.",
    "answer": "Elvis `?:` evaluates the left-hand expression and, if it is not null, returns it. If it *is* null, it evaluates and returns the right-hand side. The right side can be a value, a function call, or `return` / `throw`.\n\n- `val name = input ?: \"unknown\"`\n- `val id = user?.id ?: return` — leave the function when data is missing.\n- `val n = number ?: throw IllegalArgumentException(\"n required\")`\n- Combine with safe calls: `repo.user()?.email ?: \"n/a\"`.\n- It is *not* a ternary. Kotlin has no `condition ? a : b`; use `if` or `when`.",
    "pdfTopic": false,
    "tags": [
      "elvis",
      "null-safety"
    ],
    "code": "fun displayName(user: User?): String {\n    return user?.nick ?: user?.fullName ?: \"Guest\"\n}"
  },
  {
    "id": "kot-006",
    "category": "kotlin",
    "level": "basic",
    "topic": "Safe call",
    "question": "What does the safe-call operator `?.` do?",
    "answer": "`?.` calls a member only when the receiver is not null. If the receiver is null, the whole expression is null and the call is skipped. The result type is nullable even if the property itself is not.\n\n- `val len: Int? = text?.length`\n- Chain them: `order?.customer?.address?.city`\n- Pair with `let` so a block runs only for non-null values: `email?.let { send(it) }`.\n- `?.` on a void/Unit function simply does nothing when the receiver is null.\n- Do not confuse with `!!` (force) or `?:` (fallback).",
    "pdfTopic": false,
    "tags": [
      "safe-call",
      "null-safety"
    ]
  },
  {
    "id": "kot-007",
    "category": "kotlin",
    "level": "basic",
    "topic": "Not-null assertion",
    "question": "When is the not-null assertion `!!` acceptable, and why is it dangerous?",
    "answer": "`!!` converts `T?` to `T` and throws `NullPointerException` if the value is null. It exists as an escape hatch, not as a style.\n\nUse it only when you have proven non-null by a contract the compiler cannot see (for example a value just written in `onCreate` that a Java API still types as nullable). Prefer `?: error(\"…\")`, `requireNotNull`, or redesign the type.\n\n- `val s = nullable!!` throws if `nullable == null`.\n- Chaining `a!!.b!!.c` is a smell; one null anywhere crashes.\n- In interviews, say you almost never ship `!!` in UI or network code.",
    "pdfTopic": false,
    "tags": [
      "not-null-assertion",
      "npe"
    ]
  },
  {
    "id": "kot-008",
    "category": "kotlin",
    "level": "basic",
    "topic": "Kotlin operators",
    "question": "What Kotlin operators should you know for interviews?",
    "answer": "Kotlin keeps Java-like arithmetic and comparison, then adds operators that encode null safety, ranges, and type checks. Operator symbols are mostly functions you can overload with the `operator` modifier (`plus`, `inc`, `get`, `invoke`, `rangeTo`, …).\n\n**Arithmetic and assignment:** `+ - * / %`, `+= -= *= /= %=`, `++ --`, unary `- +`.\n\n**Comparison and equality:** `< > <= >=`, `==` / `!=` (calls `equals`, null-safe), `===` / `!==` (referential).\n\n**Range and membership:** `0..9`, `0 until 10`, `downTo`, `step`, `in` / `!in` (also used for `contains` and `iterator`).\n\n**Type checks and casts:** `is` / `!is`, `as` (unsafe), `as?` (safe, returns null).\n\n**Null-safety operators:** `?.` safe call, `?:` Elvis, `!!` not-null assertion.\n\n**Other:** `::` callable references, `[]` index (`get`/`set`), `()` invoke, `..` / `..<` ranges.\n\nOverloading example: `operator fun plus(other: Point) = Point(x + other.x, y + other.y)` lets you write `p1 + p2`.",
    "pdfTopic": true,
    "tags": [
      "operators",
      "syntax"
    ],
    "code": "val inRange = x in 1..10\nval city = (json as? Map<*, *>)?.get(\"city\") as? String\nval label = city?.uppercase() ?: \"UNKNOWN\"\noperator fun Point.plus(other: Point) = Point(x + other.x, y + other.y)"
  },
  {
    "id": "kot-009",
    "category": "kotlin",
    "level": "basic",
    "topic": "Equality",
    "question": "What is the difference between `==` and `===` in Kotlin?",
    "answer": "The PDF states it cleanly: **`==` is value equality, `===` is reference equality.**\n\n`==` is compiled to a null-safe `equals` call (`a == b` means `a?.equals(b) ?: (b === null)`). For data classes, `equals` compares properties. `===` is `true` only when both sides are the exact same object in memory (or both null). `!==` is the inverse.\n\n- Two `data class User(val id: Int)` instances with `id = 1` satisfy `==` but not `===`.\n- Primitive-looking types (`Int`, `Boolean`) are compared by value with `==`; `===` on boxed numbers can surprise you on the JVM because of caching.\n- Prefer `==` in business logic. Use `===` when identity matters (same View instance, singleton, interceptor).\n- Java’s `==` on objects is referential; Kotlin flipped the convenience so `==` matches what most people mean by “equal”.",
    "pdfTopic": true,
    "tags": [
      "equality",
      "referential"
    ],
    "code": "val a = User(1)\nval b = User(1)\nval c = a\nprintln(a == b)   // true  — equals / value\nprintln(a === b)  // false — different instances\nprintln(a === c)  // true  — same reference"
  },
  {
    "id": "kot-010",
    "category": "kotlin",
    "level": "basic",
    "topic": "Visibility",
    "question": "Explain public, internal, private, and protected in Kotlin. How do they differ from Java?",
    "answer": "Kotlin has four visibility modifiers. The PDF highlights four facts that trip Java developers.\n\n1. **`public` (default).** Declarations are visible everywhere. Kotlin’s default is public; Java’s default is *package-private*. **Package-private does not exist in Kotlin.**\n2. **`internal`.** Visible inside the same **module** — a set of Kotlin files compiled together (a Gradle module, Maven project, Ant output, or IntelliJ module). This is the real replacement for package-private. Java package-private can be broken by declaring a class in the same package from outside; `internal` cannot.\n3. **`private`.** In a class, visible only in that class. At **file** top level, visible only in that file. **Outer classes do not see private nested or inner classes** (unlike Java).\n4. **`protected`.** Visible in the class and its subclasses. Not allowed on top-level declarations.\n\n- There is no Kotlin equivalent of Java’s package-private `/* no modifier */`.\n- `internal` is what you use for APIs that should not leak outside a Gradle module.\n- Top-level `private fun helper()` is a file-local helper — a very common Kotlin idiom.",
    "pdfTopic": true,
    "tags": [
      "visibility",
      "modifiers",
      "module"
    ],
    "code": "// File: Auth.kt\nprivate fun tokenHash(raw: String): String = raw.reversed() // file-private\n\ninternal class TokenStore {              // module-only\n    protected open fun persist() {}      // class + subclasses\n}\n\nclass Api {\n    private class Cache                 // outer Api cannot see Cache's private members;\n}                                       // and nothing outside Api sees Cache"
  },
  {
    "id": "kot-011",
    "category": "kotlin",
    "level": "basic",
    "topic": "Types of classes",
    "question": "What types of classes exist in Kotlin?",
    "answer": "The PDF lists eight class kinds. Name all eight, then one line each:\n\n- **Concrete** — ordinary instantiable class with state and behavior.\n- **Abstract** — cannot be constructed; holds shared and abstract members for subclasses.\n- **Interface** — contract; a class may implement many; members may have default bodies.\n- **Sealed** — restricted hierarchy; all direct subclasses known at compile time (same module / package rules).\n- **Nested** — class inside a class, *no* implicit outer reference; can be constructed alone.\n- **Inner** — nested with an implicit outer-class reference, including private members.\n- **Data** — holds data; compiler generates `equals`, `hashCode`, `toString`, `copy`, `componentN`.\n- **Enum** — fixed set of constants; may have properties, methods, and implement interfaces.\n\nAlso mention `object` (singleton) and `companion object` when the interviewer zooms out, plus `value class` / inline class on newer interviews.",
    "pdfTopic": true,
    "tags": [
      "classes",
      "overview"
    ]
  },
  {
    "id": "kot-012",
    "category": "kotlin",
    "level": "basic",
    "topic": "Concrete class",
    "question": "What is a concrete class in Kotlin?",
    "answer": "A **concrete class** is the everyday class: it can be instantiated and may contain properties, methods, and constructors. The PDF calls it the most common type.\n\nIn Kotlin a concrete class is `final` by default — you cannot inherit from it unless you mark it `open` (or `abstract` / `sealed`). That is the opposite of Java, where classes are open by default.\n\n- `class User(val id: String)` is concrete and instantiable.\n- May hold `init` blocks, secondary constructors, and member functions.\n- Use it when you have a complete implementation, not a partial contract (that is abstract/interface) and not a closed family of types (that is sealed).",
    "pdfTopic": true,
    "tags": [
      "concrete-class",
      "classes"
    ],
    "code": "class User(val id: String, var email: String) {\n    fun domain(): String = email.substringAfter(\"@\")\n}\nval u = User(\"1\", \"ada@example.com\")"
  },
  {
    "id": "kot-013",
    "category": "kotlin",
    "level": "basic",
    "topic": "Abstract class",
    "question": "What is an abstract class in Kotlin, and when do you choose it over an interface?",
    "answer": "An **abstract class** cannot be instantiated. It is a base for subclasses and may mix implemented members with `abstract` properties and methods that subclasses must override. The PDF stresses shared interface/behavior for several types.\n\nPick an abstract class when you need **constructor state**, protected helpers, or a single “is-a” backbone. Pick an interface when you need **multiple** contracts or a pure capability (`Clickable`, `Serializable`).\n\n- `abstract class Repository { abstract suspend fun load(): Data }`\n- Abstract members are open; concrete members in an abstract class still need `open` to be overridden.\n- A class can extend **one** abstract class and implement **many** interfaces.\n- Abstract classes can have `init`, backing fields, and visibility more freely than interfaces (interfaces cannot hold backing fields unless you use default accessors carefully).",
    "pdfTopic": true,
    "tags": [
      "abstract-class",
      "classes"
    ],
    "code": "abstract class Animal(val name: String) {\n    abstract fun sound(): String\n    fun intro() = \"$name says ${sound()}\"\n}\nclass Dog(name: String) : Animal(name) {\n    override fun sound() = \"woof\"\n}"
  },
  {
    "id": "kot-014",
    "category": "kotlin",
    "level": "basic",
    "topic": "Interface",
    "question": "How do Kotlin interfaces work compared with Java interfaces and abstract classes?",
    "answer": "A Kotlin **interface** is a contract: abstract methods, property *declarations*, and optional default method bodies. A class may implement multiple interfaces. Unlike abstract classes, interfaces have **no constructor** and cannot hold backing fields.\n\nThe PDF: interfaces are how you get abstraction plus a shared method set that many classes adhere to.\n\n- `interface Named { val name: String; fun label() = name }`\n- Properties in interfaces are abstract (or have custom accessors) — no stored state.\n- Conflict resolution: if two interfaces provide the same default method, the class must `override` and pick (`super<A>.foo()`).\n- Java 8+ interfaces also have defaults; Kotlin interfaces can still be used from Java with some naming (`DefaultImpls`) caveats on older targets.",
    "pdfTopic": true,
    "tags": [
      "interface",
      "classes"
    ],
    "code": "interface Named { val name: String }\ninterface Identified { val id: String }\nclass Employee(override val id: String, override val name: String) : Named, Identified"
  },
  {
    "id": "kot-015",
    "category": "kotlin",
    "level": "basic",
    "topic": "Data class",
    "question": "What is a data class, and which methods does the compiler generate?",
    "answer": "A **data class** exists to hold data. From the properties in the **primary constructor**, the compiler generates `equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()` for destructuring. The PDF also notes they are commonly used for immutable models.\n\nRules you should recite:\n\n- At least one parameter in the primary constructor.\n- Parameters marked `val` or `var`.\n- Cannot be `abstract`, `open`, `sealed`, or `inner`.\n- `equals`/`hashCode`/`toString` only consider **primary constructor** properties, not extra body properties.\n- `copy()` is a shallow copy with named defaults: `user.copy(name = \"Ada\")`.\n- You may still add methods; generated ones can be overridden if you need a custom `toString`.",
    "pdfTopic": true,
    "tags": [
      "data-class",
      "equals",
      "copy"
    ],
    "code": "data class User(val id: Int, val name: String)\nval u = User(1, \"Ada\")\nval renamed = u.copy(name = \"Grace\")\nval (id, name) = u          // component1 / component2\nprintln(u)                  // User(id=1, name=Ada)\nprintln(u == User(1, \"Ada\")) // true"
  },
  {
    "id": "kot-016",
    "category": "kotlin",
    "level": "basic",
    "topic": "Enum class",
    "question": "What is an enum class in Kotlin?",
    "answer": "An **enum class** declares a closed set of constants. Each constant is an object. Enums may have properties, methods, a constructor, and they can implement interfaces. The PDF: use them when you have a predefined set of values.\n\n- `enum class Status { IDLE, LOADING, DONE }`\n- `enum class Color(val hex: String) { RED(\"#F00\"), BLUE(\"#00F\") }`\n- Each constant can override members with its own anonymous class body.\n- Useful APIs: `valueOf`, `values()` / `entries` (Kotlin 1.9+), `name`, `ordinal` (avoid persisting `ordinal`).\n- Prefer **sealed classes** when variants must carry *different* payloads (`Success(data)` vs `Error(throwable)`). Enums are better for simple labeled constants.",
    "pdfTopic": true,
    "tags": [
      "enum",
      "classes"
    ],
    "code": "enum class Country(val code: String) {\n    UnitedState(\"US\"),\n    Spain(\"ES\");\n    fun flagEmoji(): String = code\n}"
  },
  {
    "id": "kot-017",
    "category": "kotlin",
    "level": "basic",
    "topic": "Object vs companion",
    "question": "What is the difference between `object` and `companion object`?",
    "answer": "`object` declares a **singleton**: one instance, created lazily on first access, with its own identity. `companion object` is an object **nested in a class**, used for “static-like” factory methods and constants that still sit in the class’s namespace.\n\n- `object Tracker` — globally unique instance; can implement interfaces.\n- `class Foo { companion object { fun create() = Foo() } }` — called as `Foo.create()`.\n- A class may have only one companion; you may name it (`companion object Factory`).\n- From Java, companion members need `@JvmStatic` to look like real static methods.\n- Neither is a replacement for dependency injection when tests must swap implementations.",
    "pdfTopic": false,
    "tags": [
      "object",
      "companion",
      "singleton"
    ]
  },
  {
    "id": "kot-018",
    "category": "kotlin",
    "level": "basic",
    "topic": "Init blocks",
    "question": "What is an `init` block and when does it run?",
    "answer": "`init { }` is an initializer block that runs when an instance is constructed. It runs together with primary-constructor property initializers, **in the order they appear in the class body**, after the primary constructor parameters are bound and before a secondary constructor’s body.\n\n- Multiple `init` blocks are allowed; they run top to bottom.\n- Use them for validation (`require(id.isNotBlank())`) and derived setup that does not fit a property initializer.\n- `object` singletons also support `init` — it runs once, on first access.",
    "pdfTopic": false,
    "tags": [
      "init",
      "constructors"
    ],
    "code": "class User(val id: String) {\n    init { require(id.isNotBlank()) { \"id required\" } }\n    val tag = \"user-$id\"\n    init { println(\"created $tag\") }\n}"
  },
  {
    "id": "kot-019",
    "category": "kotlin",
    "level": "basic",
    "topic": "Constructors",
    "question": "How do primary and secondary constructors work in Kotlin?",
    "answer": "The **primary constructor** lives in the class header: `class User(val id: String, name: String)`. `val`/`var` in that header become properties. Other parameters are only constructor parameters.\n\nA **secondary constructor** is `constructor(...)` in the body. Every secondary constructor must delegate to the primary (`this(...)`) or to another secondary that eventually does. There is no Java-style implicit default constructor if you declare any constructor.\n\n- Prefer a primary constructor plus default arguments over a stack of overloads.\n- `init` blocks belong to the primary construction path and run before secondary bodies.\n- Use `@JvmOverloads` if Java callers need the overloads generated from defaults.",
    "pdfTopic": false,
    "tags": [
      "constructors",
      "primary",
      "secondary"
    ],
    "code": "class User(val id: String, val name: String = \"guest\") {\n    constructor(id: Int) : this(id.toString())\n}"
  },
  {
    "id": "kot-020",
    "category": "kotlin",
    "level": "basic",
    "topic": "Open keyword",
    "question": "Why are Kotlin classes and methods final by default, and what does `open` do?",
    "answer": "Kotlin classes, methods, and properties are **final by default**. You must mark a class `open` to allow subclassing, and mark a member `open` to allow overriding. Subclass implementations use `override` (which is always open unless you mark `final override`).\n\nThis is a deliberate contrast with Java, where anything non-final is overridable. Effective Java’s “design for inheritance or prohibit it” is the language default.\n\n- `open class View` / `open fun draw()`\n- `abstract` and interface members are open by nature.\n- `data class` cannot be `open`.\n- Useful in Android when a base `ViewModel` or mapper must be extensible in app modules.",
    "pdfTopic": false,
    "tags": [
      "open",
      "inheritance",
      "final"
    ]
  },
  {
    "id": "kot-021",
    "category": "kotlin",
    "level": "basic",
    "topic": "Extension functions",
    "question": "What are extension functions, and do they really modify the class?",
    "answer": "An extension function looks like a member but is a **static** function compiled with the receiver as the first parameter. It does **not** alter the original class, cannot access `private`/`protected` members, and is resolved **statically** (not virtually). `foo.bar()` where `bar` is an extension is really `bar(foo)`.\n\n- `fun String.initials() = split(\" \").map { it.first() }.joinToString(\"\")`\n- Extensions on nullable receivers: `fun String?.orDash() = this ?: \"-\"`\n- If a real member has the same signature, the **member wins**.\n- Great for UI helpers (`View.visible()`) and keeping APIs off bloated classes.\n- Java callers see a static method on a `…Kt` file class.",
    "pdfTopic": false,
    "tags": [
      "extensions"
    ],
    "code": "fun View.show() { visibility = View.VISIBLE }\nfun View.hide() { visibility = View.GONE }"
  },
  {
    "id": "kot-022",
    "category": "kotlin",
    "level": "basic",
    "topic": "Infix functions",
    "question": "What is an infix function?",
    "answer": "`infix` lets you call a function with neither a dot nor parentheses: `1 to \"one\"`, `map plusPair (2 to \"two\")`. Requirements: a single parameter, a member or extension, no default value, not `vararg`.\n\n- `infix fun Int.untilExclusive(end: Int) = this until end` then `0 untilExclusive 10`.\n- Standard library: `to` (Pair), `and` / `or` on flags, `downTo`, `step`.\n- Overuse hurts readability; keep infix for DSLs and tiny combinators.",
    "pdfTopic": false,
    "tags": [
      "infix",
      "dsl"
    ]
  },
  {
    "id": "kot-023",
    "category": "kotlin",
    "level": "basic",
    "topic": "Lambdas",
    "question": "How do lambdas work in Kotlin?",
    "answer": "A lambda is a function literal: `{ x: Int -> x * 2 }`. If the last parameter of a function is a lambda, you can lift it out of the parentheses: `list.filter { it > 0 }`. A single-parameter lambda exposes `it` unless you name it. The last expression is the return value; `return` inside a non-inline lambda is a `return@label`, not a function return (unless the lambda is inlined).\n\n- Types: `(Int) -> String`, `() -> Unit`, `suspend () -> T`.\n- Closures capture variables from the outer scope (including `var`).\n- `::println` is a callable reference, a cousin of lambdas.\n- Prefer method references when you are only forwarding: `list.forEach(::println)`.",
    "pdfTopic": false,
    "tags": [
      "lambdas",
      "functional"
    ],
    "code": "val doubled = listOf(1, 2, 3).map { it * 2 }\nval greet: (String) -> String = { name -> \"Hi $name\" }"
  },
  {
    "id": "kot-024",
    "category": "kotlin",
    "level": "basic",
    "topic": "when expression",
    "question": "How does `when` work, and how is it better than Java `switch`?",
    "answer": "`when` is an **expression** (it returns a value) as well as a statement. It replaces most `switch` and if-else chains. Branches are checked in order. With a subject (`when (x)`), you can match values, ranges (`in`), types (`is`), and combine with commas. Without a subject, each branch is a boolean condition.\n\n- Exhaustive when the subject is `enum`, `sealed`, or `Boolean` — no `else` required if all cases are covered.\n- Smart casts apply in `is` branches.\n- Prefer `when` over nested `if` for sealed-result handling (`Success` / `Error` / `Loading`).",
    "pdfTopic": false,
    "tags": [
      "when",
      "sealed"
    ],
    "code": "fun label(state: UiState): String = when (state) {\n    is UiState.Loading -> \"…\"\n    is UiState.Data -> state.value\n    is UiState.Error -> state.cause.message ?: \"error\"\n}"
  },
  {
    "id": "kot-025",
    "category": "kotlin",
    "level": "basic",
    "topic": "Ranges",
    "question": "How do ranges work in Kotlin?",
    "answer": "Ranges are objects implementing `ClosedRange`. `1..5` is inclusive, `1 until 5` is exclusive of the end, `5 downTo 1` counts backward, and `step 2` changes the stride. `in` / `!in` test membership. Character and `Long` ranges exist too.\n\n- `for (i in 0 until items.size)`\n- `if (c in 'a'..'z')`\n- Ranges of `Int` are iterable; a huge range is still cheap to *construct*, but iterating `0..1_000_000_000` is not.\n- Prefer `until` for index loops so you do not off-by-one on `size`.",
    "pdfTopic": false,
    "tags": [
      "ranges",
      "in"
    ]
  },
  {
    "id": "kot-026",
    "category": "kotlin",
    "level": "basic",
    "topic": "String templates",
    "question": "What are string templates?",
    "answer": "Inside a double-quoted string, `$name` interpolates a variable and `${expr}` interpolates any expression. Escape a literal dollar with `$` + `{'$'}` or a backslash. Triple-quoted raw strings can span lines and still interpolate.\n\n- `\"Hello $name, you have ${items.size} items\"`\n- Prefer templates over `+` concatenation.\n- For locale-sensitive UI text, still use Android string resources with placeholders, not raw templates.",
    "pdfTopic": false,
    "tags": [
      "strings",
      "templates"
    ]
  },
  {
    "id": "kot-027",
    "category": "kotlin",
    "level": "basic",
    "topic": "Destructuring",
    "question": "What is destructuring in Kotlin?",
    "answer": "Destructuring unpacks an object into variables via `componentN()` operators: `val (id, name) = user`. Data classes generate these automatically. `Map` entries destructure as `(key, value)`. You can ignore a slot with `_`.\n\n- `for ((index, value) in list.withIndex())`\n- `val (first, second) = pair`\n- A class that is not a data class can still opt in: `operator fun component1() = id`.\n- Lambda params can destructure: `map.forEach { (k, v) -> … }`.",
    "pdfTopic": false,
    "tags": [
      "destructuring",
      "componentN"
    ]
  },
  {
    "id": "kot-028",
    "category": "kotlin",
    "level": "basic",
    "topic": "Type aliases",
    "question": "What are type aliases?",
    "answer": "`typealias` gives a new name to an existing type without creating a new type at runtime. Useful for function types and to shorten nested generics.\n\n- `typealias UserId = String` — still a `String` at runtime; no extra type safety (use a `value class` if you need a distinct type).\n- `typealias Click = (View) -> Unit`\n- `typealias Cache = Map<String, List<User>>`\n- Aliases are not visible as new types in Java; they erase to the underlying type.",
    "pdfTopic": false,
    "tags": [
      "typealias"
    ]
  },
  {
    "id": "kot-029",
    "category": "kotlin",
    "level": "basic",
    "topic": "Default and named parameters",
    "question": "How do default and named arguments work?",
    "answer": "Parameters may have defaults: `fun log(msg: String, tag: String = \"APP\")`. Callers can skip them. **Named arguments** let you pass any subset in any order: `log(tag = \"NET\", msg = \"timeout\")`. This removes most Java overload explosions and builder noise for simple types.\n\n- Once you skip a positional argument, later ones must be named.\n- `@JvmOverloads` generates Java overloads for each defaulted parameter from the right.\n- Data class `copy()` is implemented with named defaults.\n- Avoid a long row of `Boolean` defaults; names plus a data holder read better.",
    "pdfTopic": false,
    "tags": [
      "defaults",
      "named-params"
    ]
  },
  {
    "id": "kot-030",
    "category": "kotlin",
    "level": "basic",
    "topic": "Any Unit Nothing",
    "question": "What are `Any`, `Unit`, and `Nothing`?",
    "answer": "These three types show up constantly in signatures.\n\n- **`Any`** — the root of the non-null hierarchy (like Java `Object` minus `null`). Everything except nullable types is `Any`. `Any?` is the top of *all* types including null.\n- **`Unit`** — the type of a function that returns no meaningful value (Java `void`). There is a singleton `Unit` instance, so it is a real type and can be a generic parameter (`Task<Unit>`).\n- **`Nothing`** — a type with **no values**. A function that always throws or never returns (`while (true)`) can be typed `Nothing`. `Nothing` is a subtype of every type, which is why `?: throw …` still type-checks. `List<Nothing>` is empty-only (`emptyList()`).",
    "pdfTopic": false,
    "tags": [
      "Any",
      "Unit",
      "Nothing",
      "types"
    ]
  },
  {
    "id": "kot-031",
    "category": "kotlin",
    "level": "basic",
    "topic": "const vs val",
    "question": "What is the difference between `const val` and `val`?",
    "answer": "`val` is a read-only property assigned at runtime (constructor, `init`, getter, `lazy`). `const val` is a **compile-time** constant inlined into callers.\n\n- Only `String` and primitives.\n- Must be declared at top level, in an `object`, or in a `companion object` — no custom getter.\n- Annotated uses (`@JvmField` not needed; they become Java `static final`).\n- `val` on a class can still run logic in a getter; `const val` cannot.",
    "pdfTopic": false,
    "tags": [
      "const",
      "val"
    ],
    "code": "const val EXTRA_ID = \"id\"          // inlined\nobject Limits { const val MAX = 3 }\nclass Screen { val title: String get() = fetchTitle() } // not const"
  },
  {
    "id": "kot-032",
    "category": "kotlin",
    "level": "basic",
    "topic": "Java interop",
    "question": "How does Kotlin/Java interoperability work in practice?",
    "answer": "Kotlin compiles to the same bytecode, so you can call Java from Kotlin and Kotlin from Java in one module. The awkward parts are nullability, statics, checked exceptions, and SAM conversions.\n\n- Java types become **platform types** (`String!`) unless annotated `@Nullable`/`@NotNull`.\n- Kotlin `object` / companion members look like `INSTANCE` / `Companion` from Java; add `@JvmStatic` or `@JvmField` for Java-friendly statics.\n- `@JvmOverloads`, `@JvmName`, `@file:JvmName(\"Utils\")` shape the Java API.\n- Kotlin has **no checked exceptions**; `@Throws` documents them for Java callers.\n- Java SAM interfaces can be called with a lambda; Kotlin `fun interface` does the same in reverse.\n- Collection mutability (`List` vs `MutableList`) is not enforced from Java.",
    "pdfTopic": false,
    "tags": [
      "java-interop",
      "jvm"
    ]
  },
  {
    "id": "kot-033",
    "category": "kotlin",
    "level": "basic",
    "topic": "Smart casts",
    "question": "What are smart casts?",
    "answer": "After a type or null check, the compiler **narrows** the type automatically so you do not re-cast.\n\n- `if (x is String) x.length` — `x` is `String` in that branch.\n- `if (x != null) x.foo()` — `x` is non-null.\n- Smart casts **fail** when the compiler cannot prove immutability: a `var` that might be written concurrently, or a custom getter that could return a different value. Use `val` local copies: `val cur = field; if (cur is Foo) …`.\n- `when (x)` with `is` branches is the usual sealed-class pattern.",
    "pdfTopic": false,
    "tags": [
      "smart-cast",
      "types"
    ]
  },
  {
    "id": "kot-034",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Sealed class",
    "question": "What is a sealed class, and why is it useful?",
    "answer": "A **sealed class** (or sealed interface) restricts which types may inherit it. Direct subclasses are known at compile time — historically in the same file, now in the same package/module depending on language version. The PDF: use them when you have a **fixed set of subclasses** and want a restricted hierarchy.\n\nThat is why `when (result)` can be **exhaustive** without `else`: the compiler knows every variant (`Success`, `Error`, `Loading`). Each subclass can carry different fields, which enums cannot do cleanly.\n\n- Prefer sealed over enum when variants have payloads.\n- Prefer sealed over open hierarchies for UI/network results.\n- `data class` subclasses are common: `sealed class Result { data class Ok(val v: T): Result(); data object Err: Result() }`.",
    "pdfTopic": true,
    "tags": [
      "sealed",
      "when"
    ],
    "code": "sealed class UiState {\n    data object Loading : UiState()\n    data class Data(val title: String) : UiState()\n    data class Error(val cause: Throwable) : UiState()\n}"
  },
  {
    "id": "kot-035",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Nested class",
    "question": "What is a nested class in Kotlin?",
    "answer": "A class declared inside another class is **nested** by default. It does **not** hold a reference to the outer instance and **cannot** touch outer members unless you pass the outer explicitly. You can instantiate it without an outer object: `Outer.Nested()`.\n\nThe PDF: nested classes are for logical grouping; they are like Java `static` nested classes.\n\n- No implicit `this@Outer`.\n- Can be `private` to hide helpers; remember: **the outer class cannot see private members of a private nested class** the way Java sometimes allows — Kotlin hides private nested types from the outer as well.\n- Use nested when the inner type is a namespace/helper (a `Builder`, a `ViewHolder` that does not need the parent).",
    "pdfTopic": true,
    "tags": [
      "nested-class"
    ],
    "code": "class Outer(val id: Int) {\n    class Nested(val label: String) {\n        // cannot access id\n    }\n}\nval n = Outer.Nested(\"x\")"
  },
  {
    "id": "kot-036",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Inner class",
    "question": "What is an inner class, and how does it differ from a nested class?",
    "answer": "Mark a nested class `inner` and it gains a reference to the outer instance. It can access outer members, **including private ones**. You construct it from an outer instance: `outer.Inner()`.\n\nThe PDF: inner classes group types that need the parent. That extra reference is also how Android leaks happen — a non-static inner class holding an Activity.\n\n- Nested = Java static nested; inner = Java non-static inner.\n- Qualify the outer with `this@Outer` when names clash.\n- Prefer nested (or top-level) unless you truly need the outer instance.",
    "pdfTopic": true,
    "tags": [
      "inner-class"
    ],
    "code": "class Outer(val id: Int) {\n    inner class Inner {\n        fun tag() = \"inner-of-$id\"\n    }\n}\nval inner = Outer(7).Inner()"
  },
  {
    "id": "kot-037",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Nested vs inner",
    "question": "How do you choose between nested and inner classes in an interview answer?",
    "answer": "Give the rule of thumb, then the leak warning.\n\n- **Nested (default):** no outer pointer, cheaper, instantiable as `Outer.Nested()`, cannot see outer instance state. Use for `Builder`, serializers, `Comparator`s.\n- **Inner:** has an implicit outer pointer, can read private outer members, must be created from an instance. Use only when the nested type is meaningless without that parent.\n- Android: a `Handler`, `Runnable`, or coroutine callback as an inner class of an Activity will pin that Activity in memory until the callback dies. Make it nested + weak reference, or hoist it out.\n- Visibility reminder from the PDF: private nested types are not visible to the outer class the way many Java developers expect.",
    "pdfTopic": true,
    "tags": [
      "nested-class",
      "inner-class"
    ]
  },
  {
    "id": "kot-038",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Scope functions",
    "question": "What are Kotlin scope functions, and how do you pick among let, run, with, apply, and also?",
    "answer": "Scope functions execute a block in the context of an object. There are **five**: `let`, `run`, `with`, `apply`, `also`. You choose using two axes from the PDF:\n\n1. **How you refer to the object:** `this` (lambda receiver) vs `it` (lambda argument).\n2. **What you return:** the **lambda result** vs the **context object**.\n\n| Function | Object | Returns | Typical use |\n|---|---|---|---|\n| `let` | `it` | lambda result | null-safe transform / map |\n| `run` | `this` | lambda result | configure + compute; nullable `?.run` |\n| `with` | `this` | lambda result | call several methods on a non-null object |\n| `apply` | `this` | context object | initialize members |\n| `also` | `it` | context object | extra side effects (log, add to list) |\n\nDo not nest three scope functions “because Kotlin.” If `this` vs `it` becomes ambiguous, stop and write a named variable.",
    "pdfTopic": true,
    "tags": [
      "scope-functions"
    ]
  },
  {
    "id": "kot-039",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "let",
    "question": "Explain `let`: context object, return value, and the usual use case.",
    "answer": "**Context object: `it`. Return value: lambda result.**\n\n`let` is the map-like scope function. The object becomes the lambda argument `it` (or a name you choose), and the last expression is what `let` returns. The PDF’s headline use case is **null safety**: combine `?.` with `let` so the block runs only when the value is non-null — that is how Kotlin avoids the NPE “nightmare” the notes mention.\n\n- Transform: `val length = name?.let { it.length }`.\n- Rename `it` for nested lets: `user?.let { u -> u.email?.let { e -> send(u, e) } }`.\n- Not for configuring an object you want to return unchanged — that is `also` or `apply`.",
    "pdfTopic": true,
    "tags": [
      "let",
      "scope-functions"
    ],
    "code": "fun main() {\n    var a: Int? = null\n    a?.let { print(it) }   // skipped — a is null\n    a = 2\n    a?.let { print(it) }   // prints 2\n}"
  },
  {
    "id": "kot-040",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "apply",
    "question": "Explain `apply` and when you use it to initialize members.",
    "answer": "**Context object: `this`. Return value: the context object.**\n\nThe PDF’s mnemonic is “apply these to the object.” You mostly use it to **initialize members** on a newly created instance and then pass that same instance on. Inside the lambda you can write `founder = \"…\"` or `this.founder = \"…\"`; `this` can be omitted when there is no name clash.\n\n- `val view = TextView(ctx).apply { text = \"Hi\"; textSize = 18f }`\n- Builders in Kotlin often `apply { field = value }` so each setter returns `this` for chaining (see the Hamburger builder).\n- Do not use `apply` when you need a *computed* result — that is `run` / `let`.",
    "pdfTopic": true,
    "tags": [
      "apply",
      "scope-functions"
    ],
    "code": "class Company {\n    lateinit var name: String\n    lateinit var objective: String\n    lateinit var founder: String\n}\n\nfun main() {\n    Company().apply {\n        this.founder = \"Sandeep Jain\"\n        name = \"GeeksforGeeks\"\n        objective = \"A computer science portal for Geeks\"\n    }\n}"
  },
  {
    "id": "kot-041",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "with",
    "question": "Explain `with` and how it differs from `run`.",
    "answer": "**Context object: `this`. Return value: lambda result.** `with` is **not** an extension: you pass the object as an argument — `with(obj) { … }`.\n\nThe PDF recommends `with` for calling several functions on a context object when you do **not** care about returning that object, only the lambda result (or `Unit`). Because it is not an extension, `with` does not combine with `?.`. For a nullable receiver, use `?.run { }` instead.\n\n- `with(gfg) { println(name) }` prints the company name using `this`.\n- Good for grouping many calls on a non-null API (`with(canvas) { drawLine(); drawText() }`).\n- If you need the object back, prefer `apply` / `also`.",
    "pdfTopic": true,
    "tags": [
      "with",
      "scope-functions"
    ],
    "code": "class Company {\n    lateinit var name: String\n    lateinit var objective: String\n    lateinit var founder: String\n}\n\nfun main() {\n    val gfg = Company().apply {\n        name = \"GeeksforGeeks\"\n        objective = \"A computer science portal for Geeks\"\n        founder = \"Sandeep Jain\"\n    }\n    with(gfg) {\n        println(\" $name \")\n    }\n}\n// Output: GeeksforGeeks"
  },
  {
    "id": "kot-042",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "run",
    "question": "Explain `run` as the combination of `let` and `with`.",
    "answer": "**Context object: `this`. Return value: lambda result.**\n\nThe PDF describes `run` as **`let` + `with`**: it is an extension (so `?.run` gives null safety like `let`) but the object is `this` (like `with`). Use it when the block both **initializes / uses members** and **computes a result**.\n\nThere is also a non-extension `run { }` that just executes a block and returns its result — handy as a local scope.\n\n- `company?.run { print(name) }` — body skipped when `company` is null (PDF example).\n- `val text = SpannableStringBuilder().run { append(\"a\"); append(\"b\"); toString() }`",
    "pdfTopic": true,
    "tags": [
      "run",
      "scope-functions"
    ],
    "code": "class Company {\n    lateinit var name: String\n    lateinit var objective: String\n    lateinit var founder: String\n}\n\nfun main() {\n    println(\"Company Name : \")\n    var company: Company? = null\n    company?.run { print(name) }     // skipped\n\n    print(\"Company Name : \")\n    company = Company().apply {\n        name = \"GeeksforGeeks\"\n        founder = \"Sandeep Jain\"\n        objective = \"A computer science portal for Geeks\"\n    }\n    company?.run { print(name) }     // GeeksforGeeks\n}"
  },
  {
    "id": "kot-043",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "also",
    "question": "Explain `also` and the “extra operations” use case.",
    "answer": "**Context object: `it`. Return value: the context object.**\n\n`also` is for **side effects** after (or while) you still want the original object: logging, adding to a collection, extra mutations that are not “initialize this receiver.” The PDF: perform additional operations once members are initialized.\n\nBecause it returns the context object, it chains cleanly: `createUser().also { log(it) }.also { cache.put(it.id, it) }`.\n\n- Prefer `also` over `apply` when you want to name the object (`it` / `user`) instead of `this`, especially if the block already has another `this`.\n- `list.also { it.add(4); it.remove(2) }` mutates then returns the same list.",
    "pdfTopic": true,
    "tags": [
      "also",
      "scope-functions"
    ],
    "code": "fun main() {\n    val list = mutableListOf(1, 2, 3)\n    list.also {\n        it.add(4)\n        it.remove(2)\n    }\n    println(list)   // [1, 3, 4]\n}"
  },
  {
    "id": "kot-044",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Scope function references",
    "question": "In scope functions, when do you use `this` versus `it`?",
    "answer": "The PDF splits object referencing into two camps.\n\n- **`this` (lambda receiver):** `run`, `with`, `apply`. You can omit `this` when accessing members: `name = \"GeeksforGeeks\"` is the same as `this.name = …`.\n- **`it` (lambda argument):** `let` and `also`. You must say `it.name` (or rename: `let { company -> company.name }`).\n\nOmit `this` when it reads naturally. Keep `it` when the surrounding class already has a `this` (an Activity, a ViewHolder) so you do not shadow the wrong receiver. If both `this` and `it` appear in nested scope functions, flatten the code — that is a common review comment.",
    "pdfTopic": true,
    "tags": [
      "this",
      "it",
      "scope-functions"
    ],
    "code": "Company().apply {\n    this.name = \"GeeksforGeeks\"\n    this.founder = \"Sandeep Jain\"\n    this.objective = \"A computer science portal for Geeks\"\n}\n\nCompany().let {\n    it.name = \"GeeksforGeeks\"\n    it.founder = \"Sandeep Jain\"\n    it.objective = \"A computer science portal for Geeks\"\n}"
  },
  {
    "id": "kot-045",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Scope function returns",
    "question": "What can a scope function return: lambda result or context object?",
    "answer": "Two return styles, per the PDF:\n\n1. **Lambda result** — the last expression in the block. Used by **`let`, `run`, `with`**. Example: `val founderName: String = with(Company()) { founder }` then print `GfG's Founder : $founderName`.\n2. **Context object** — the original receiver, ignoring the last line (except as a side effect). Used by **`apply` and `also`**. You do not specify the return; the object is returned automatically. That is why they are the right choice for fluent initialization and “tap” side effects.\n\nIf you accidentally use `apply` when you meant to transform, you will get the object back instead of the computed value — a frequent bug in interviews’ live coding.",
    "pdfTopic": true,
    "tags": [
      "scope-functions",
      "return-value"
    ],
    "code": "class Company {\n    var name: String = \"GeeksforGeeks\"\n    var founder: String = \"Sandeep Jain\"\n    var objective: String = \"A computer science portal for Geeks\"\n}\n\nfun main() {\n    val founderName: String = with(Company()) {\n        founder\n    }\n    println(\"GfG's Founder : $founderName\")\n}"
  },
  {
    "id": "kot-046",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "let null safety",
    "question": "How does `let` help with Kotlin null safety?",
    "answer": "`let` plus the safe-call operator is the PDF’s standard null-safety pattern. `a?.let { … }` **does not execute the block when `a` is null**, so you never dereference a null and you never throw. When `a` is non-null, it is passed as `it` with a non-null type.\n\nThat is cleaner than `if (a != null) { … }` when you want an expression, a short transform, or to avoid smart-cast issues on `var`.\n\n- `user?.email?.let { sendWelcome(it) }`\n- Return a value: `val id = response?.body?.let { parse(it) } ?: 0`\n- `run` can do the same with `this` (`company?.run { print(name) }`); pick `let` when you want `it` or a named argument.\n- `let` is not magic: a long `?.let` chain can still hide control flow. For several steps, use an early `return`.",
    "pdfTopic": true,
    "tags": [
      "let",
      "null-safety"
    ],
    "code": "fun show(user: User?) {\n    user?.let { u ->\n        title.text = u.name\n        avatar.load(u.photoUrl)\n    }\n}"
  },
  {
    "id": "kot-047",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Coroutine builders",
    "question": "What are coroutine builders, and which four should you name first?",
    "answer": "A **coroutine builder** starts a coroutine (or switches its context) from a `CoroutineScope` or a blocking bridge. The PDF lists four: **`launch`**, **`async`**, **`runBlocking`**, **`withContext`**.\n\n- **`launch`** — fire-and-forget; returns `Job`.\n- **`async`** — returns `Deferred<T>`; get the value with `await()`.\n- **`runBlocking`** — bridges blocking code (tests, `main`) to coroutines; blocks the current thread until completion. Not for Android UI production code.\n- **`withContext`** — *not* a new sibling job in the usual “start work” sense; it **shifts context** (often the dispatcher) for a suspend block and returns a result.\n\nAll of them take a `CoroutineContext` (dispatcher, job, name) plus a `suspend` lambda. Prefer structured builders (`coroutineScope`, `supervisorScope`) over `GlobalScope`.",
    "pdfTopic": true,
    "tags": [
      "coroutines",
      "builders"
    ]
  },
  {
    "id": "kot-048",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "launch",
    "question": "What does `launch` do?",
    "answer": "`launch` starts a coroutine that **does not deliver a result**. It returns a `Job` you can `join()`, `cancel()`, or ignore. The PDF table: **fire-and-forget**. It is not a suspend call at the call site, so code *after* `launch` continues immediately.\n\n- Typical: `viewModelScope.launch { repo.refresh() }`\n- Failures in `launch` (without a `SupervisorJob`) cancel the parent scope.\n- Use it for work whose success is side effects: save to DB, update UI, fire analytics — the PDF’s “fetch user and save in database” / “change color” bucket.\n- Combine with `CoroutineExceptionHandler` or `try/catch` inside the coroutine for expected errors.",
    "pdfTopic": true,
    "tags": [
      "launch",
      "Job"
    ],
    "code": "viewModelScope.launch {\n    val user = api.fetchUser()\n    dao.save(user)\n}"
  },
  {
    "id": "kot-049",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "async",
    "question": "What does `async` do, and why must you `await`?",
    "answer": "`async` starts a coroutine that **returns a result**. It yields a `Deferred<T>` (a `Job` with `await()`). `await()` suspends until the result is ready (the PDF says it “blocks” at `await` — more precisely it **suspends the coroutine**, it does not freeze the thread unless you are inside `runBlocking` on that thread).\n\n- Start two `async` blocks, then `await` both for **parallel** work.\n- If you `async` and **never `await`**, the PDF is right: it behaves like `launch` (plus you can swallow failures until `await`, depending on `CoroutineStart`).\n- Prefer `coroutineScope { async { } }` so failures cancel siblings.",
    "pdfTopic": true,
    "tags": [
      "async",
      "Deferred"
    ],
    "code": "coroutineScope {\n    val a = async { api.user(id1) }\n    val b = async { api.user(id2) }\n    combine(a.await(), b.await())\n}"
  },
  {
    "id": "kot-050",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "runBlocking",
    "question": "When is `runBlocking` appropriate?",
    "answer": "`runBlocking` starts a coroutine and **blocks the current thread** until it completes. It is the bridge from *blocking* world (`main`, JUnit, some workers) into `suspend`.\n\n- Fine in unit tests and small CLI `main` functions.\n- **Do not** call it from Android’s main thread — you will ANR.\n- **Do not** nest `runBlocking` inside a coroutine; you can deadlock a dispatcher.\n- Production Android code should use `lifecycleScope` / `viewModelScope` / `withContext`, not `runBlocking`.",
    "pdfTopic": true,
    "tags": [
      "runBlocking"
    ],
    "code": "fun main() = runBlocking {\n    val data = fetch()\n    println(data)\n}"
  },
  {
    "id": "kot-051",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "withContext",
    "question": "What does `withContext` do as a coroutine builder?",
    "answer": "`withContext(context)` **switches the coroutine context** for the given block, then returns the block’s result to the caller. It does not start an independent fire-and-forget job; the caller **waits** (suspends) for the result. That is why it is the right tool for “do this piece on IO, then continue.”\n\n- `val json = withContext(Dispatchers.IO) { api.fetch() }`\n- Context is restored after the block, so UI code after `withContext` can run on Main again if that is where you started.\n- It is a suspend function, unlike `launch`.\n- See also thread shifting: hop `Dispatchers.IO` → `Dispatchers.Main` for UI.",
    "pdfTopic": true,
    "tags": [
      "withContext",
      "dispatchers"
    ],
    "code": "suspend fun load(): Profile = withContext(Dispatchers.IO) {\n    database.profile()\n}"
  },
  {
    "id": "kot-052",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Launch vs Async",
    "question": "How do `launch` and `async` differ? Include the usual interview table.",
    "answer": "This is the PDF comparison, stated in interview language:\n\n- **Intent:** `launch` is **fire-and-forget**. `async` **performs work and returns a result**.\n- **Return type:** `launch` returns a **`Job`** (the notes say it “does not return anything” meaning no business result). `async` returns **`Deferred<T>`** with **`await()`**.\n- **Parallel network:** `launch` is the wrong tool when you need two responses to combine. **`async` is for parallel calls** you will wait on.\n- **Waiting:** code after `launch` does not wait. Code after `await()` **must wait for the result**. The PDF says `await` “blocks the main thread”; accurately, it **suspends the coroutine**. The UI thread is blocked only if that coroutine was started with a blocking builder (`runBlocking`) on main.\n- **Without `await`:** `async` **behaves like `launch`**.\n- **Examples:** `launch` → fetch a user **and save** in the database, or a UI side effect. `async` → fetch **two users in parallel**, then compute something from both.\n\nYou cannot make `launch` return a typed result. You *can* ignore `async`’s result — but then you should have used `launch`.",
    "pdfTopic": true,
    "tags": [
      "launch",
      "async",
      "Deferred"
    ],
    "code": "// launch: fire-and-forget save\nviewModelScope.launch {\n    val user = api.fetchUser()\n    dao.save(user)\n}\n\n// async: parallel fetch, then use both results\nviewModelScope.launch {\n    coroutineScope {\n        val first = async { api.fetchUser(id1) }\n        val second = async { api.fetchUser(id2) }\n        val summary = first.await().score + second.await().score\n        _ui.value = summary\n    }\n}"
  },
  {
    "id": "kot-053",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Types of dispatchers",
    "question": "What are the types of coroutine dispatchers?",
    "answer": "A **dispatcher** decides *which thread(s)* a coroutine runs on. Name the built-ins:\n\n- **`Dispatchers.Main`** — Android UI thread (requires the UI artifact). Use for View/`StateFlow` updates.\n- **`Dispatchers.IO`** — optimized for **blocking I/O** (disk, network libraries that block). The pool can grow.\n- **`Dispatchers.Default`** — CPU work (sort, JSON parse, bitmap transform). Shared CPU pool (~cores).\n- **`Dispatchers.Unconfined`** — starts on the caller thread, resumes on whatever thread continued the suspend call. Easy to misuse; avoid for Android UI.\n- **`Main.immediate`** — like Main but skips a re-dispatch if you are already on Main.\n- **Custom:** `executor.asCoroutineDispatcher()`, test `StandardTestDispatcher`.\n\nChoosing wrong: `Default` for blocking OkHttp-without-suspend will starve CPU; `Main` for disk will jank.",
    "pdfTopic": true,
    "tags": [
      "dispatchers"
    ]
  },
  {
    "id": "kot-054",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Dispatchers.IO",
    "question": "How do you switch from `Dispatchers.IO` to `Dispatchers.Main`? (PDF snippet.)",
    "answer": "The PDF shows the classic Android hop: start on **IO**, then `withContext(Dispatchers.Main)` to touch views. Written cleanly (the notes’ `Coroutines(Dispatchers.IO).launch` / `Dispachers.Main` is the same idea):\n\nDo **heavy or blocking work** on IO; **UI updates** on Main. `withContext` suspends until the inner block finishes, then returns to the outer dispatcher.\n\n- Never update a `View` from IO.\n- Room/Retrofit suspend APIs may already be off-main; do not double-hop without reason.\n- `viewModelScope` plus `withContext(IO)` is preferred over a raw `CoroutineScope(IO)` that you forget to cancel.",
    "pdfTopic": true,
    "tags": [
      "Dispatchers.IO",
      "Main",
      "withContext"
    ],
    "code": "CoroutineScope(Dispatchers.IO).launch {\n    println(\"print\") // background work\n    withContext(Dispatchers.Main) {\n        // update UI\n    }\n}\n\n// More typical Android:\nviewModelScope.launch {\n    val profile = withContext(Dispatchers.IO) { dao.load() }\n    _state.value = profile   // Main, because viewModelScope uses Main.immediate\n}"
  },
  {
    "id": "kot-055",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Suspend functions",
    "question": "What is a suspend function? (The PDF heading says “Suspended class”.)",
    "answer": "A **`suspend` function** can pause a coroutine without blocking a thread and later resume with a result. The compiler rewrites it into a **state machine** plus a `Continuation`. The PDF’s “Suspended class” label is that machinery — there is no class you write called Suspended; the *function* is suspending.\n\nRules:\n\n- Can only be called from another `suspend` function or a coroutine builder (`launch`, `async`, `runBlocking`, `withContext`).\n- Regular functions cannot call `suspend` without a builder.\n- Suspension points are library calls like `delay`, `await`, `withContext`, Flow `collect`.\n- A suspend function **may not suspend** at runtime (if it never hits a suspension point); `suspend` is a *capability*.\n- They are still functions: default args, extensions, generics all work. Mark I/O APIs `suspend` instead of taking callbacks.",
    "pdfTopic": true,
    "tags": [
      "suspend",
      "coroutines"
    ],
    "code": "suspend fun loadUser(id: String): User =\n    withContext(Dispatchers.IO) { api.fetchUser(id) }"
  },
  {
    "id": "kot-056",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Coroutine scopes",
    "question": "What coroutine scopes should an Android/Kotlin developer name?",
    "answer": "A **scope** owns coroutines and cancels them when its lifecycle ends. The PDF lists four: **`lifecycleScope`**, **`viewModelScope`**, **`GlobalScope`**, **`SupervisorScope`**.\n\n- **`lifecycleScope`** — tied to an Activity/Fragment `Lifecycle`; cancelled in `DESTROYED`.\n- **`viewModelScope`** — tied to a `ViewModel`; cancelled in `onCleared()`.\n- **`GlobalScope`** — process-ish lifetime, **unstructured**; avoid in app code.\n- **`supervisorScope` / `SupervisorScope`** — a scope whose **child failures do not cancel siblings** (uses `SupervisorJob`).\n\nAlso mention `coroutineScope { }` (structured, waits for children, first failure cancels the rest) and custom `CoroutineScope(SupervisorJob() + Dispatchers.Main)`.",
    "pdfTopic": true,
    "tags": [
      "scopes",
      "structured-concurrency"
    ]
  },
  {
    "id": "kot-057",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "lifecycleScope",
    "question": "What is `lifecycleScope` and when do you use it?",
    "answer": "`lifecycleScope` is a `CoroutineScope` bound to a `LifecycleOwner` (Activity, Fragment). When the lifecycle hits **DESTROYED**, the scope is cancelled, so you do not update dead UI.\n\n- `lifecycleScope.launch { flow.collect { render(it) } }`\n- Prefer `repeatOnLifecycle(STARTED)` (or `flowWithLifecycle`) so collection **stops** in the background instead of only at destroy.\n- Older `launchWhenStarted` is deprecated because it paused rather than cancelled, which could resume in surprising ways.\n- Use this for **UI collection**. Use `viewModelScope` for work that must survive rotation.",
    "pdfTopic": true,
    "tags": [
      "lifecycleScope",
      "android"
    ],
    "code": "lifecycleScope.launch {\n    repeatOnLifecycle(Lifecycle.State.STARTED) {\n        viewModel.ui.collect { state -> render(state) }\n    }\n}"
  },
  {
    "id": "kot-058",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "viewModelScope",
    "question": "What is `viewModelScope`?",
    "answer": "`viewModelScope` lives on a Jetpack `ViewModel`. It uses `SupervisorJob` + `Dispatchers.Main.immediate` and is **cancelled in `onCleared()`** — that is, when the ViewModel is going away for good, not on rotation.\n\n- Load data, map it, write `StateFlow` here.\n- Survives configuration changes; `lifecycleScope` on the old Activity does not.\n- Because it is a supervisor, one failed child does not cancel the whole ViewModel scope — handle errors per `launch`.\n- Never keep a `View` or `Activity` reference inside these coroutines.",
    "pdfTopic": true,
    "tags": [
      "viewModelScope",
      "android"
    ],
    "code": "class ProfileVm(private val repo: Repo) : ViewModel() {\n    fun refresh() = viewModelScope.launch {\n        _state.value = repo.load()\n    }\n}"
  },
  {
    "id": "kot-059",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Singleton",
    "question": "How do you implement a Singleton in Kotlin?",
    "answer": "Kotlin’s `object` declaration *is* a singleton: one instance, thread-safe lazy initialization, private constructor implied. The PDF’s example is the whole pattern:\n\n`object Singleton { init { println(\"Hello Singleton\") } }`\n\nThe `init` block runs **once**, on first access. Compare with Java’s double-checked locking: you do not write that in Kotlin unless you need a parameterized singleton (`class` + companion cache) or an interface-backed injectable instance.\n\n- `object` can implement interfaces (`object ProductionClock : Clock`).\n- For tests, prefer DI (`interface` + Hilt) over a hard `object`.\n- `companion object` is a singleton *per class*, not a global app singleton.",
    "pdfTopic": true,
    "tags": [
      "singleton",
      "object"
    ],
    "code": "object Singleton {\n    init { println(\"Hello Singleton\") }\n}\n\n// first access constructs it once\nfun main() {\n    Singleton\n    Singleton\n}"
  },
  {
    "id": "kot-060",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Factory and Builder",
    "question": "How do you write Factory and Builder in Kotlin (CurrencyFactory and Hamburger)?",
    "answer": "If Java already covered GoF, keep this Kotlin-flavored.\n\n**Factory:** a single place that picks a concrete type. In Kotlin that is often an `object` with a `when`. The PDF’s `CurrencyFactory` maps `Country.UnitedState` → `USDollar`, `Country.Spain` → `Euro`.\n\n**Builder:** separate construction from representation. PDF rules: **private constructor**, an **inner `Builder`**, setter-like functions that return the builder, and `build()` returning the product. Kotlin `apply` makes those setters one-liners. Many builders can be replaced with **default/named args**, but the Hamburger example is what interviewers expect from that PDF.\n\nUse factory when the caller should not know the concrete class. Use builder when construction is stepwise with many optional flags.",
    "pdfTopic": true,
    "tags": [
      "factory",
      "builder",
      "patterns"
    ],
    "code": "interface Currency {\n    fun symbol(): String\n    fun code(): String\n}\n\nenum class Country { UnitedState, Spain }\n\nclass USDollar : Currency {\n    override fun symbol() = \"$\"\n    override fun code() = \"USD\"\n}\n\nclass Euro : Currency {\n    override fun symbol() = \"€\"\n    override fun code() = \"EUR\"\n}\n\nobject CurrencyFactory {\n    fun currency(country: Country): Currency = when (country) {\n        Country.UnitedState -> USDollar()\n        Country.Spain -> Euro()\n    }\n}\n\nclass Hamburger private constructor(\n    val cheese: Boolean,\n    val beef: Boolean,\n    val onions: Boolean\n) {\n    class Builder {\n        private var cheese: Boolean = true\n        private var beef: Boolean = true\n        private var onions: Boolean = true\n\n        fun cheese(value: Boolean) = apply { cheese = value }\n        fun beef(value: Boolean) = apply { beef = value }\n        fun onions(value: Boolean) = apply { onions = value }\n\n        fun build() = Hamburger(cheese, beef, onions)\n    }\n}\n\nval burger = Hamburger.Builder().cheese(false).onions(true).build()"
  },
  {
    "id": "kot-061",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Higher-order functions",
    "question": "What is a higher-order function?",
    "answer": "A higher-order function takes another function as a parameter, returns a function, or both. Collection APIs (`map`, `filter`, `fold`) and coroutine builders are higher-order. Combined with lambdas, this is how Kotlin expresses policy without subclasses.\n\n- `fun List<Int>.sumBy(f: (Int) -> Int) = fold(0) { acc, n -> acc + f(n) }`\n- Returning functions: `fun multiplier(k: Int): (Int) -> Int = { it * k }`\n- Last-lambda syntax: `withTimeout(1_000) { … }`.\n- Cost: each lambda can allocate an object unless the higher-order function is `inline`.",
    "pdfTopic": false,
    "tags": [
      "higher-order",
      "lambdas"
    ]
  },
  {
    "id": "kot-062",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Inline functions",
    "question": "What does `inline` do, and when should you use it?",
    "answer": "`inline` asks the compiler to **copy the function body** (and lambdas passed to it) into the call site. That avoids lambda objects and lets you `return` from the enclosing function (`non-local return`).\n\n- Use on small higher-order helpers (`lock`, `measureTime`, `repeat`).\n- `noinline` keeps a specific lambda as an object (when you must store it).\n- `crossinline` forbids non-local returns when the lambda is invoked in another context (a `Runnable`).\n- Inlining large functions bloats bytecode. Do not `inline` ordinary business methods.",
    "pdfTopic": false,
    "tags": [
      "inline",
      "lambdas"
    ],
    "code": "inline fun <T> T.applyIf(cond: Boolean, block: T.() -> T): T =\n    if (cond) block() else this"
  },
  {
    "id": "kot-063",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Reified",
    "question": "What are reified type parameters?",
    "answer": "JVM generics are erased. Inside a normal generic function you cannot write `T::class` or `is T`. Mark the function `inline` and the type parameter `reified`, and the compiler **substitutes the concrete type** at each call site.\n\n- `inline fun <reified T> Gson.fromJson(json: String): T`\n- `inline fun <reified T : Activity> Context.start() = startActivity(Intent(this, T::class.java))`\n- Only works for `inline` functions (the type must be known where the body is copied).\n- Java cannot call `reified` functions usefully; they are Kotlin-only.",
    "pdfTopic": false,
    "tags": [
      "reified",
      "inline",
      "generics"
    ]
  },
  {
    "id": "kot-064",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "lateinit vs lazy",
    "question": "What is the difference between `lateinit var` and `by lazy`?",
    "answer": "Both delay assignment, for opposite kinds of properties.\n\n- **`lateinit var`:** a **mutable** non-null `var` you will assign **later** (Dagger fields, `onCreate` views). It cannot be a primitive. Read before init → `UninitializedPropertyAccessException`. Check with `::prop.isInitialized`.\n- **`by lazy`:** a **read-only `val`** computed on **first access**, then cached. Default lock is synchronized (`LazyThreadSafetyMode.SYNCHRONIZED`); use `PUBLICATION` or `NONE` if you must.\n\nUse `lateinit` when a framework writes the value after construction. Use `lazy` for expensive immutable setup (database, OkHttp client in an `object`).",
    "pdfTopic": false,
    "tags": [
      "lateinit",
      "lazy"
    ],
    "code": "lateinit var binding: ActivityMainBinding\nval api: Api by lazy { RetrofitClient.create() }"
  },
  {
    "id": "kot-065",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "tailrec",
    "question": "What is `tailrec`?",
    "answer": "`tailrec` asks the compiler to rewrite a **tail-recursive** function into a loop so it will not overflow the stack. The recursive call must be the **last** operation (no extra math after it).\n\n- Good for algorithms you would write with a loop but want in recursive form (`gcd`, list walks).\n- If the compiler cannot optimize, it warns; believe that warning.\n- Not a replacement for heap-based algorithms on huge graphs; it only eliminates the extra stack frame.",
    "pdfTopic": false,
    "tags": [
      "tailrec",
      "recursion"
    ],
    "code": "tailrec fun gcd(a: Int, b: Int): Int =\n    if (b == 0) a else gcd(b, a % b)"
  },
  {
    "id": "kot-066",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Collections vs sequences",
    "question": "How do Kotlin collections differ from sequences?",
    "answer": "**Collections** (`List`, `Set`, `Map`) are eager: each `map`/`filter` builds a **new** collection. **Sequences** (`sequenceOf`, `asSequence()`) are **lazy and cold**: operators fuse, and work starts only when a terminal operation runs (`toList`, `first`, `forEach`).\n\n- `list.filter { }.map { }` = two intermediate lists.\n- `list.asSequence().filter { }.map { }.toList()` = one pass.\n- Sequences shine on large lists with several operators, or infinite generators (`generateSequence`).\n- They are **synchronous** and **cannot suspend**. For async streams use **Flow**.\n- Do not wrap tiny lists “for performance”; the iterator overhead can lose.",
    "pdfTopic": false,
    "tags": [
      "collections",
      "sequences"
    ]
  },
  {
    "id": "kot-067",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Variance",
    "question": "Explain `in` and `out` (declaration-site variance).",
    "answer": "Generics are invariant by default: `List<String>` is not a `List<Any>`. **`out`** (covariance) means the type is **produced**; **`in`** (contravariance) means it is **consumed**.\n\n- `interface Producer<out T> { fun next(): T }` — `Producer<String>` is a `Producer<Any>`.\n- `interface Consumer<in T> { fun accept(t: T) }` — `Consumer<Any>` is a `Consumer<String>`.\n- Kotlin `List<out T>` is covariant (read-only). `MutableList<T>` is invariant.\n- **Use-site** variance: `fun copy(from: Array<out T>, to: Array<in T>)`.\n- `out` types cannot appear in `in` positions (parameters) and vice versa — that is the compiler’s safety check.",
    "pdfTopic": false,
    "tags": [
      "variance",
      "generics",
      "in",
      "out"
    ]
  },
  {
    "id": "kot-068",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Delegates",
    "question": "What are Kotlin property delegates? Cover `lazy` and `observable`.",
    "answer": "`by` hands a property’s `get`/`set` to another object implementing `getValue`/`setValue`. Standard library:\n\n- **`by lazy { }`** — compute once on first get.\n- **`by Delegates.observable(initial) { prop, old, new -> … }`** — callback after each set.\n- **`by Delegates.vetoable(initial) { … }`** — reject assignments.\n- **`by Delegates.notNull<T>()`** — like `lateinit` for types that cannot use it.\n- Android: `by viewModels()`, `by mutableStateOf` (Compose) are delegates too.\n\nCustom delegates are how you write `by argExtra(\"id\")` or map-backed properties.",
    "pdfTopic": false,
    "tags": [
      "delegates",
      "lazy",
      "observable"
    ],
    "code": "var name: String by Delegates.observable(\"Ada\") { _, old, new ->\n    println(\"$old -> $new\")\n}\nval db by lazy { Room.databaseBuilder(ctx, AppDb::class.java, \"app.db\").build() }"
  },
  {
    "id": "kot-069",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Value classes",
    "question": "What are value classes (inline classes)?",
    "answer": "A `value class` (formerly `inline class`) wraps a single value without an extra heap object in many call sites. The compiler **unboxes** it to the underlying type when it can, giving type safety (`UserId` vs raw `String`) without allocation.\n\n- `@JvmInline value class UserId(val raw: String)`\n- One property in the primary constructor; can have methods.\n- Identity (`===`) and some generics/arrays still box.\n- Prefer over `typealias` when you need a **distinct** type.\n- Do not use for heavy wrappers; they are for IDs, units, and flags.",
    "pdfTopic": false,
    "tags": [
      "value-class",
      "inline-class"
    ]
  },
  {
    "id": "kot-070",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Job vs SupervisorJob",
    "question": "What is the difference between `Job` and `SupervisorJob`?",
    "answer": "Every coroutine has a `Job` in its context. Jobs form a tree: cancelling a parent cancels children. **A normal `Job` also cancels siblings when one child fails.**\n\nA **`SupervisorJob`** (and `supervisorScope`) **does not propagate a child’s failure to other children**. The failed child dies; the rest keep running. The parent still cancels everyone if *you* cancel the parent.\n\n- `viewModelScope` uses a `SupervisorJob` so one failed `launch` does not kill the ViewModel.\n- `async` still needs `await` or a handler; with a supervisor, un-awaited `async` failures can become silent unless handled.\n- Combine: `CoroutineScope(SupervisorJob() + Dispatchers.Main)`.",
    "pdfTopic": false,
    "tags": [
      "Job",
      "SupervisorJob"
    ]
  },
  {
    "id": "kot-071",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Sealed vs enum",
    "question": "When do you use a sealed class instead of an enum?",
    "answer": "Use an **enum** for a closed set of **constant labels** (maybe with the same fields on every constant). Use a **sealed class/interface** when variants are a **closed family of types** that may carry **different data** and behavior.\n\n- Enum: `enum class Role { ADMIN, USER }`.\n- Sealed: `sealed class Result { data class Ok(val data: T); data class Err(val e: Throwable) }`.\n- Both give exhaustive `when`.\n- Sealed types scale to nested hierarchies; enums do not model `Success(data)` vs `Loading` as cleanly.\n- You can combine them: a sealed type with an enum field.",
    "pdfTopic": false,
    "tags": [
      "sealed",
      "enum"
    ]
  },
  {
    "id": "kot-072",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Coroutine context",
    "question": "What is a coroutine context?",
    "answer": "`CoroutineContext` is an indexed set of **elements**: `Job`, `Dispatcher`, `CoroutineName`, `CoroutineExceptionHandler`, and custom keys. A coroutine inherits its parent’s context; builders add/override with `+`.\n\n- `launch(Dispatchers.IO + CoroutineName(\"sync\")) { }`\n- `coroutineContext[Job]` to inspect the current job.\n- `withContext` replaces parts of the context for a block.\n- Structured concurrency is this tree of jobs plus inherited context — not a global thread pool you manage by hand.",
    "pdfTopic": false,
    "tags": [
      "coroutine-context",
      "Job",
      "dispatcher"
    ]
  },
  {
    "id": "kot-073",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Flow vs Sequence vs Channel",
    "question": "How do Flow, Sequence, and Channel differ in Kotlin coroutines?",
    "answer": "All three move multiple values. They differ in **when work starts**, **whether they can suspend**, and **who owns the values**.\n\n- **`Sequence`:** cold, **synchronous**, iterator-based. Operators are lazy, but you **cannot** call `suspend` inside `sequence { }`. Best for CPU pipelines on in-memory data (`asSequence().map{}.filter{}`).\n- **`Flow`:** cold, **asynchronous** stream. Each `collect` runs the producer from scratch. `emit`/`collect` are suspend. Back-pressure is cooperative (slow collector slows emit). This is the default for repository streams, Room, location, network paging.\n- **`Channel`:** a **hot** communication primitive (rendezvous or buffered). Values can be **sent without a collector waiting** (they sit in a buffer or the sender suspends). Multiple coroutines send/receive. You must **close** the channel. Use to *connect* producers and consumers, not as a UI state holder.\n\nInterview one-liner: Sequence = lazy sync list; Flow = cold async stream; Channel = hot pipe.",
    "pdfTopic": true,
    "tags": [
      "flow",
      "sequence",
      "channel"
    ],
    "code": "val seq = sequence { yield(1); yield(2) }          // cold, sync\nval flow = flow { emit(1); delay(10); emit(2) }    // cold, async\nval ch = Channel<Int>()                             // hot pipe\nlaunch { ch.send(1); ch.close() }\nlaunch { println(ch.receive()) }"
  },
  {
    "id": "kot-074",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Cold vs hot streams",
    "question": "What is the difference between a cold stream and a hot stream?",
    "answer": "A **cold** stream **starts work when a collector subscribes** and usually **replays the whole sequence** to each collector independently. A **hot** stream **runs whether or not anyone is listening** (or shares one running producer among collectors) and **late subscribers miss earlier values** unless a replay cache is configured.\n\n- **Cold:** `Sequence`, `Flow` (`flow { }`, `callbackFlow` until collected), typical Room `Flow`.\n- **Hot:** `Channel`, `SharedFlow`, `StateFlow`, broadcast-style APIs, sensor listeners that are already on.\n\n`shareIn` / `stateIn` turn a cold Flow **hot**. That is how you avoid restarting a network socket for every UI collector.\n\nNever collect a cold Flow with side effects from multiple collectors unless you intend to duplicate the work.",
    "pdfTopic": true,
    "tags": [
      "cold",
      "hot",
      "flow"
    ]
  },
  {
    "id": "kot-075",
    "category": "kotlin",
    "level": "advanced",
    "topic": "StateFlow vs SharedFlow",
    "question": "How do `StateFlow` and `SharedFlow` differ?",
    "answer": "Both are **hot** `Flow` implementations in `kotlinx.coroutines`. Pick by *semantics*.\n\n**`StateFlow`**\n- Always has a **current value** (`value` / constructor initial).\n- **Conflates** — collectors see the latest, not every intermediate.\n- Uses **equality** to skip identical updates (`Any.equals`).\n- Models **state**: UI screen, form, connection status. Closest cousin to `LiveData`.\n\n**`SharedFlow`**\n- May have **no initial value**.\n- Configurable **`replay`**, **`extraBufferCapacity`**, **`onBufferOverflow`**.\n- Does not conflate unless you configure it that way.\n- Models **events**: snackbars, navigation, “one-shot” messages. `replay = 0` is a pure event bus (with the usual “subscriber might miss” caveat).\n\n`MutableStateFlow` / `MutableSharedFlow` are the writable types; expose the read-only super types from a ViewModel.",
    "pdfTopic": true,
    "tags": [
      "StateFlow",
      "SharedFlow"
    ],
    "code": "private val _state = MutableStateFlow(UiState())\nval state: StateFlow<UiState> = _state\n\nprivate val _events = MutableSharedFlow<UiEvent>(extraBufferCapacity = 1)\nval events: SharedFlow<UiEvent> = _events"
  },
  {
    "id": "kot-076",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Stackless vs stackful",
    "question": "Are Kotlin coroutines stackless or stackful, and why does that matter?",
    "answer": "Kotlin coroutines are **stackless**. They do **not** carry a copied native call stack. The compiler turns each `suspend` function into a **state machine**; locals that must survive a suspension become fields on a `Continuation` object. Resuming jumps to the next state, often on a different thread.\n\n**Stackful** coroutines (Lua, some native fibers, classic green threads) allocate their own stack and can suspend from *any* nested C/native call because the stack is preserved.\n\nWhy interviews care:\n\n- Stackless = cheap: thousands of coroutines, no 1 MB thread stacks.\n- You can only suspend at **explicit suspend calls**, not from arbitrary Java callbacks unless you bridge with `suspendCancellableCoroutine` / `callbackFlow`.\n- Stack traces through suspend functions need coroutine debug (`-Dkotlinx.coroutines.debug`) because there is no real stack sitting around.\n- “Suspended class” in the PDF is this continuation/state-machine object, not a type you declare.",
    "pdfTopic": true,
    "tags": [
      "stackless",
      "continuations"
    ]
  },
  {
    "id": "kot-077",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Nested coroutines",
    "question": "What are nested coroutines, and how does structured concurrency apply?",
    "answer": "A **nested coroutine** is a child started inside another coroutine’s scope (`launch` inside `launch`, `async` inside `coroutineScope`). Children **inherit** the parent context (plus overrides). The parent **does not complete until children complete**. Cancelling the parent **cancels children**. A failure in a child with a regular `Job` **cancels the parent** (and therefore siblings).\n\n- Prefer `coroutineScope { }` inside a `suspend` function to start children and wait for them.\n- A `launch` in `viewModelScope` from inside another coroutine is still a **sibling under the ViewModel**, not a child of the inner job — pass `this` (`coroutineScope`) if you need a true child.\n- `GlobalScope.launch` inside a coroutine **breaks** nesting — that is unstructured.\n- For parallel work: `coroutineScope { val a = async {…}; val b = async {…}; a.await() to b.await() }`.",
    "pdfTopic": true,
    "tags": [
      "nested",
      "structured-concurrency"
    ],
    "code": "suspend fun loadDashboard(): Dashboard = coroutineScope {\n    val user = async { api.user() }\n    val feed = async { api.feed() }\n    Dashboard(user.await(), feed.await())\n}"
  },
  {
    "id": "kot-078",
    "category": "kotlin",
    "level": "advanced",
    "topic": "GlobalScope",
    "question": "Why is `GlobalScope` discouraged?",
    "answer": "`GlobalScope` is a scope that **lives for the process** and is **not** tied to a lifecycle or parent job. Coroutines launched there are **unstructured**: nothing cancels them automatically, exceptions can go to the default handler, and you leak work after a screen dies.\n\n- The PDF lists it as a scope type — name it, then say **do not use it in app code**.\n- Legitimate rare uses: process-wide diagnostics, a library with no owner (still better to take a `CoroutineScope` parameter).\n- Replace with `viewModelScope`, `lifecycleScope`, or an application scope you cancel in `ProcessLifecycleOwner`.",
    "pdfTopic": true,
    "tags": [
      "GlobalScope"
    ],
    "code": "// avoid\nGlobalScope.launch { syncForever() }\n\n// prefer\nclass AppScope(@ApplicationContext ctx: Context) {\n    val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)\n}"
  },
  {
    "id": "kot-079",
    "category": "kotlin",
    "level": "advanced",
    "topic": "SupervisorScope",
    "question": "What is `supervisorScope` / SupervisorScope, and when do you need it?",
    "answer": "`supervisorScope { }` is a **structured** builder that waits for children like `coroutineScope`, but uses a **`SupervisorJob`**: **one child’s exception does not cancel the others**. The builder still throws (or fails its own job) according to how you handle the failed child — typically you `try/catch` around `await` or install a handler per child.\n\nThe PDF lists **SupervisorScope** next to lifecycle/viewModel/global scopes. On Android, `viewModelScope` is already a supervisor. You still wrap *inner* parallel work in `supervisorScope` when you want “all independent”: e.g. refresh cache **and** analytics **and** feature flags, and a flags failure must not abort the cache write.\n\n- `coroutineScope`: one failure → cancel everyone (all-or-nothing).\n- `supervisorScope`: failures are isolated; you decide per child.\n- Cancelling the supervisor still cancels all children.",
    "pdfTopic": true,
    "tags": [
      "supervisorScope",
      "SupervisorJob"
    ],
    "code": "suspend fun refreshAll() = supervisorScope {\n    launch { runCatching { repo.cache() } }\n    launch { runCatching { analytics.flush() } }\n    launch { runCatching { flags.fetch() } }\n}"
  },
  {
    "id": "kot-080",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Thread shifting",
    "question": "How does thread shifting work in coroutines?",
    "answer": "Coroutines **do not belong to a thread**. They hop when the **dispatcher** in their context changes. The PDF topic is **thread shifting**: typically `withContext(Dispatchers.IO)` for blocking work, then back to **Main** for UI.\n\nUnlike `thread.start()`, shifting does not allocate a new native thread per task; the continuation resumes on a thread the dispatcher owns. `launch(Dispatchers.IO)` starts a *child* on IO; `withContext` keeps the **same coroutine** (same `Job`) and only changes threads for the block.\n\n- Stay on Main for short UI logic; shift for disk, CPU, or blocking APIs.\n- Do not `withContext(Main)` from a background `Thread` that is not a coroutine — you must already be in a coroutine.\n- `Unconfined` “shifts” unpredictably; skip it in production UI.",
    "pdfTopic": true,
    "tags": [
      "thread-shifting",
      "withContext"
    ],
    "code": "viewModelScope.launch {                 // Main.immediate\n    val bytes = withContext(Dispatchers.IO) {\n        file.readBytes()                // worker thread\n    }\n    preview.setImage(bytes)             // back on Main\n}"
  },
  {
    "id": "kot-081",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Flow operators",
    "question": "How do `map`, `flatMapLatest`, and `combine` differ on Flow?",
    "answer": "These three show up in every Android ViewModel interview.\n\n- **`map`:** transform each value 1:1. Upstream still sequential. `map { it.name }`.\n- **`flatMapLatest`:** for each upstream value, start a **new inner Flow** and **cancel the previous** inner collection. Search-as-you-type: `query.flatMapLatest { repo.search(it) }` so stale responses cannot overwrite a newer query.\n- **`combine`:** whenever **any** of several flows emits, recompute with the **latest** of each. `combine(user, prefs) { u, p -> Ui(u, p) }`.\n\nAlso know `flatMapConcat` (queue inner flows) vs `flatMapMerge` (concurrent inners). `zip` pairs emissions 1:1 and waits; `combine` does not wait for a “pair,” it uses latest.",
    "pdfTopic": false,
    "tags": [
      "flow",
      "map",
      "flatMapLatest",
      "combine"
    ],
    "code": "val results = query.flatMapLatest { q -> repo.search(q) }\nval ui = combine(results, loading) { data, load -> Ui(data, load) }"
  },
  {
    "id": "kot-082",
    "category": "kotlin",
    "level": "advanced",
    "topic": "callbackFlow",
    "question": "What is `callbackFlow` and when do you use it?",
    "answer": "`callbackFlow` bridges **callback APIs** into a **cold Flow**. You register the listener in the builder, `trySend`/`send` values, and `awaitClose { unregister() }` **must** run so the listener is torn down when collection stops.\n\n- Location, sensors, Firebase listeners, `TextWatcher`, `OnClick` streams.\n- Cold: each collector registers again (unless you `shareIn`).\n- Prefer `trySend` from threads you do not control; `send` is suspend and needs a coroutine.\n- `callbackFlow` is a `channelFlow` variant; closing/errors propagate to collectors.\n- Never forget `awaitClose` — that is the leak.",
    "pdfTopic": false,
    "tags": [
      "callbackFlow",
      "flow"
    ],
    "code": "fun locationUpdates(): Flow<Location> = callbackFlow {\n    val cb = LocationCallback { loc -> trySend(loc) }\n    client.request(cb)\n    awaitClose { client.remove(cb) }\n}"
  },
  {
    "id": "kot-083",
    "category": "kotlin",
    "level": "advanced",
    "topic": "CoroutineExceptionHandler",
    "question": "How do exceptions work in coroutines, and what is `CoroutineExceptionHandler`?",
    "answer": "Exceptions in a coroutine **cancel the job**. With a regular `Job`, they **propagate to the parent**. `SupervisorJob` stops that sibling-killing, but an **uncaught** exception in a `launch` still goes to a handler.\n\n- **`async`:** the exception is **held until `await()`** (or a parent notices). Un-awaited `async` in a supervisor can look “lost.”\n- **`CoroutineExceptionHandler`** is a context element that receives uncaught exceptions on **root** `launch` (not a replacement for `try/catch` around `await`, and it does not run on children the way people hope unless it is on the right job).\n- `CancellationException` is **not** an error; rethrow it if you catch `Exception`.\n- `try/catch` inside the coroutine for expected failures (404, validation). Handler for last-resort logging/crash reporting.",
    "pdfTopic": false,
    "tags": [
      "exceptions",
      "CoroutineExceptionHandler"
    ],
    "code": "val handler = CoroutineExceptionHandler { _, t -> log(t) }\nviewModelScope.launch(handler) {\n    repo.sync()\n}"
  },
  {
    "id": "kot-084",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Structured concurrency",
    "question": "What is structured concurrency in Kotlin?",
    "answer": "**Structured concurrency** means coroutines form a **tree**: a parent scope **owns** children, **waits** for them, and **cancels** them. You cannot “leak” a task outside its lifetime unless you deliberately use `GlobalScope` or an unmanaged `Job`.\n\nPractical rules:\n\n- Launch from a **scope with a lifecycle** (`viewModelScope`, `lifecycleScope`, `coroutineScope { }`).\n- A `suspend` function that starts children should use `coroutineScope` / `supervisorScope` so callers wait and cancel correctly.\n- Cancellation is **cooperative** (`isActive`, `ensureActive`, cancellable suspend calls).\n- This is why thread shifting with `withContext` is safe: it is the **same** job, not a stray thread.\n\nUnstructured: `thread { }`, `GlobalScope.launch`, storing a `Job` and forgetting to cancel.",
    "pdfTopic": false,
    "tags": [
      "structured-concurrency",
      "cancellation"
    ]
  },
  {
    "id": "kot-085",
    "category": "kotlin",
    "level": "advanced",
    "topic": "coroutineScope builder",
    "question": "How does the `coroutineScope` builder differ from `supervisorScope` and from `runBlocking`?",
    "answer": "`coroutineScope { }` is a **suspend** function that creates a child scope, runs the block, and **suspends until all children finish**. If one child fails, **all siblings are cancelled** and the failure is thrown to the caller. It does **not** block a thread.\n\n- vs `supervisorScope`: failures are isolated there; here they are all-or-nothing.\n- vs `runBlocking`: `runBlocking` **blocks a thread** and is a bridge from non-suspend code. `coroutineScope` is for use **inside** suspend functions.\n- This is the correct way to do parallel `async` inside a repository function.",
    "pdfTopic": false,
    "tags": [
      "coroutineScope",
      "structured-concurrency"
    ]
  },
  {
    "id": "kot-086",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Cancellation",
    "question": "How does coroutine cancellation work?",
    "answer": "Calling `job.cancel()` (or destroying a scope) sets the job to *cancelling*. **Cancellable** suspend functions (`delay`, `yield`, `withContext`, most Flow operators) throw `CancellationException` at the next suspension point. CPU loops must check `isActive` or call `ensureActive()`.\n\n- `CancellationException` should be **rethrown**; do not log it as a crash.\n- `finally` still runs; use `withContext(NonCancellable) { }` only for cleanup that itself suspends (closing a socket).\n- Cancelling a parent cancels the tree.\n- `join()` waits for completion including cancellation.",
    "pdfTopic": false,
    "tags": [
      "cancellation",
      "Job"
    ]
  },
  {
    "id": "kot-087",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Channel types",
    "question": "What Channel capacities exist, and when is a Channel the wrong API?",
    "answer": "`Channel(capacity)`:\n\n- **Rendezvous (`0`, default):** sender and receiver meet; `send` suspends until `receive`.\n- **Buffered (`UNLIMITED` or a number):** `send` suspends only when the buffer is full (`UNLIMITED` never, until OOM).\n- **Conflated:** keeps only the latest; slow receivers skip intermediates.\n- **`BUFFERED`:** default buffered size.\n\nPrefer **Flow** for streams of data with a single collector story; **StateFlow/SharedFlow** for UI state/events; **Channel** for *pipelines* and actor-style workers. Exposing a `Channel` from a ViewModel is usually wrong — expose a Flow.",
    "pdfTopic": false,
    "tags": [
      "channel",
      "flow"
    ]
  },
  {
    "id": "kot-088",
    "category": "kotlin",
    "level": "advanced",
    "topic": "shareIn and stateIn",
    "question": "How do `shareIn` and `stateIn` turn a cold Flow hot?",
    "answer": "`shareIn(scope, started, replay)` shares **one** upstream collection among many collectors (`SharedFlow`). `stateIn(scope, started, initial)` does the same as a **`StateFlow`** with an initial/current value.\n\n- `SharingStarted.WhileSubscribed(5000)` is the Android default: stop upstream shortly after the last UI collector leaves (survives rotation).\n- `Eagerly` starts immediately; `Lazily` on first subscriber.\n- Use them in a ViewModel so each Compose collector does not re-hit the network.\n- Upstream exceptions complete the shared flow; decide `catch` before sharing.",
    "pdfTopic": false,
    "tags": [
      "shareIn",
      "stateIn",
      "hot"
    ]
  },
  {
    "id": "kot-089",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Flow vs LiveData",
    "question": "When do you choose Flow over LiveData?",
    "answer": "`Flow` is the Kotlin-first async stream: operators, back-pressure, dispatchers, test APIs, multiplatform. `LiveData` is lifecycle-aware on Android and easy from Java.\n\n- New code: **`StateFlow`/`Flow` in ViewModel**, collect with `repeatOnLifecycle` or `collectAsStateWithLifecycle`.\n- Keep LiveData when a Java UI layer already depends on it (`asLiveData()`).\n- LiveData is **hot-ish** (has a value, conflates) and main-thread observer delivery. Flow is cold until you share it, and can run anywhere.\n- Do not wrap every Flow in LiveData “just in case.”",
    "pdfTopic": false,
    "tags": [
      "flow",
      "livedata"
    ]
  },
  {
    "id": "kot-090",
    "category": "kotlin",
    "level": "advanced",
    "topic": "suspendCancellableCoroutine",
    "question": "How do you wrap a one-shot callback in a suspend function?",
    "answer": "`suspendCancellableCoroutine { cont -> … }` turns a single callback into a suspend call. Resume once with `cont.resume(value)` or `cont.resumeWithException(e)`. Attach `cont.invokeOnCancellation { /* unregister */ }` so back-pressure/cancel actually stops the work.\n\n- One-shot: location `getCurrent`, `ListenableFuture`, old `AsyncTask` callbacks.\n- Streams of callbacks: `callbackFlow`, not this.\n- Never resume twice; guard with a flag or `runCatching`.",
    "pdfTopic": false,
    "tags": [
      "suspend",
      "callbacks"
    ],
    "code": "suspend fun Query.await(): Snapshot =\n    suspendCancellableCoroutine { cont ->\n        val l = object : Listener {\n            override fun onSuccess(s: Snapshot) { cont.resume(s) }\n            override fun onError(e: Exception) { cont.resumeWithException(e) }\n        }\n        addListener(l)\n        cont.invokeOnCancellation { removeListener(l) }\n    }"
  },
  {
    "id": "kot-091",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Sequence vs Flow choice",
    "question": "A sequence can be lazy — why not use Sequence for repository streams?",
    "answer": "Because **`Sequence` cannot suspend** and it runs on the caller’s thread. A repository that hits the network, Room, or `delay` needs **Flow** (or a suspend function). Sequence is for **in-memory**, **CPU**, **synchronous** pipelines.\n\nIf you call a blocking API inside `sequence { }`, you block whoever is iterating — on Android that might be Main. If you call a suspend API, it **will not compile**.\n\nRule: collections/sequences in mappers; Flow at I/O boundaries; Channel when two coroutines need a pipe.",
    "pdfTopic": false,
    "tags": [
      "sequence",
      "flow"
    ]
  },
  {
    "id": "kot-092",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Exception transparency",
    "question": "How should you handle errors in Flow?",
    "answer": "Flows are **transparent** to exceptions: an exception in `emit` or an operator **cancels the flow** and is thrown from `collect`, unless you catch it.\n\n- `catch { emit(Fallback) }` — recover **upstream** of the collector.\n- `retry` / `retryWhen` for transient IO.\n- Do not `try/catch` inside `collect` and then keep collecting — the flow is already complete.\n- `onCompletion { cause -> }` sees both success and failure (and cancellation).\n- For UI, map failures to a sealed `UiState.Error` **inside** the flow rather than crashing the scope.",
    "pdfTopic": false,
    "tags": [
      "flow",
      "catch",
      "exceptions"
    ]
  },
  {
    "id": "kot-093",
    "category": "kotlin",
    "level": "basic",
    "topic": "Collections basics",
    "question": "What is the difference between `List`, `MutableList`, `Set`, and `Map` in Kotlin?",
    "answer": "Kotlin splits **read-only** and **mutable** interfaces. `List<T>` has no `add`; `MutableList<T>` does. The read-only type is **not** a deep immutable snapshot — a `List` reference may point at a mutable list that someone else mutates.\n\n- `listOf` / `mutableListOf` / `buildList`\n- `setOf` (unique), `mapOf(key to value)`\n- Prefer returning `List` from public APIs, not `MutableList`.\n- Sequences and Flow are for pipelines, not as a replacement for a simple list in memory.",
    "pdfTopic": false,
    "tags": [
      "collections"
    ]
  },
  {
    "id": "kot-094",
    "category": "kotlin",
    "level": "basic",
    "topic": "Companion object Java",
    "question": "How do you expose Kotlin companions and objects to Java?",
    "answer": "From Java, `Foo.Companion.create()` is the default. Annotate with `@JvmStatic` to get `Foo.create()`. `@JvmField` on a `val` in an object exposes a static field without getters. `const val` already becomes `public static final`.\n\n- `object` singletons are `Singleton.INSTANCE` from Java.\n- `fun interface` lets Java pass lambdas into Kotlin SAM types.\n- File-level functions become `MyFileKt.method()` unless `@file:JvmName`.",
    "pdfTopic": false,
    "tags": [
      "java-interop",
      "companion"
    ]
  },
  {
    "id": "kot-095",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "takeIf takeUnless",
    "question": "What are `takeIf` and `takeUnless`?",
    "answer": "They are tiny scope-like helpers. `x.takeIf { predicate }` returns `x` or `null`. `takeUnless` is the inverse. Chain with Elvis: `val adult = user.takeIf { it.age >= 18 } ?: return`.\n\n- Cleaner than `if (p) x else null`.\n- Not a replacement for `filter` on collections (`list.filter { }` already drops items).",
    "pdfTopic": false,
    "tags": [
      "takeIf",
      "null-safety"
    ]
  },
  {
    "id": "kot-096",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "operator overloading",
    "question": "How does operator overloading work in Kotlin?",
    "answer": "Mark a function `operator` with a reserved name: `plus`, `minus`, `times`, `compareTo`, `get`, `set`, `invoke`, `rangeTo`, `contains`, `inc`, `iterator`, `component1`…\n\n- `a + b` → `a.plus(b)`\n- `map[\"k\"]` → `get`, `map[\"k\"] = v` → `set`\n- `instance(x)` → `invoke`\n- Keep it unsurprising; do not overload `+` for unrelated domain actions.",
    "pdfTopic": false,
    "tags": [
      "operators",
      "overloading"
    ]
  },
  {
    "id": "kot-098",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Copy and immutability",
    "question": "How do data class `copy` and immutability work together?",
    "answer": "`copy()` creates a **new instance** with selected properties replaced. Nested objects are **not** deep-copied. If a property is a `MutableList`, both copies share it.\n\n- Model UI state as `data class` + `copy` in a `StateFlow`.\n- For nested changes: `state.copy(user = state.user.copy(name = \"Ada\"))`.\n- Prefer `List` over `MutableList` in state so you cannot mutate by accident.",
    "pdfTopic": false,
    "tags": [
      "data-class",
      "copy"
    ]
  },
  {
    "id": "kot-099",
    "category": "kotlin",
    "level": "basic",
    "topic": "Nothing and Elvis",
    "question": "Why does `?: throw` or `?: return` type-check with `Nothing`?",
    "answer": "`throw` and `return` have type `Nothing` — they never produce a value. `Nothing` is a subtype of every type, so `nullable ?: throw IllegalStateException()` still has the non-null left type. That is why Elvis can “abort” and the rest of the function treats the value as non-null.",
    "pdfTopic": false,
    "tags": [
      "Nothing",
      "elvis"
    ]
  },
  {
    "id": "kot-100",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "SAM and fun interface",
    "question": "What is a `fun interface`?",
    "answer": "A `fun interface` (SAM interface) has **one abstract method**, so you can pass a lambda where the interface is expected. Kotlin already did this for Java interfaces; `fun interface` enables it for Kotlin-defined types.\n\n- `fun interface Click { fun onClick() }` then `button.setClick { … }`.\n- Useful for callbacks you want as types, not raw function types, so they can have default methods too.",
    "pdfTopic": false,
    "tags": [
      "fun-interface",
      "sam"
    ]
  },
  {
    "id": "kot-101",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Flow context",
    "question": "How does `flowOn` relate to `withContext` on a Flow?",
    "answer": "`flowOn(dispatcher)` changes the **upstream** context (producer and operators **above** it). Downstream (including `collect`) stays on the caller’s context. That is the Flow equivalent of thread shifting.\n\n- `flow { emit(readDisk()) }.flowOn(Dispatchers.IO)` then collect on Main.\n- `withContext` inside `collect` shifts only that collector, not the producer.\n- Multiple `flowOn` calls change context in segments; order matters.\n- Do not `withContext` around `emit` without understanding conflation — prefer `flowOn`.",
    "pdfTopic": false,
    "tags": [
      "flowOn",
      "thread-shifting"
    ]
  },
  {
    "id": "kot-102",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Inner vs nested Android leak",
    "question": "Why can an inner class leak an Activity even in Kotlin?",
    "answer": "`inner class` holds a hidden reference to the outer instance. A long-lived `Handler`, coroutine, or listener as an inner class of an Activity keeps that Activity (and its views) in memory after `onDestroy`. Nested (non-inner) classes, top-level classes, or `object` listeners do not.\n\nCoroutines: capturing `this@Activity` in `GlobalScope.launch` is the same leak. Tie work to `lifecycleScope` instead.",
    "pdfTopic": false,
    "tags": [
      "inner-class",
      "leaks"
    ]
  },
  {
    "id": "kot-103",
    "category": "kotlin",
    "level": "basic",
    "topic": "String vs StringBuilder",
    "question": "How should you build strings in Kotlin?",
    "answer": "Templates cover most cases. For loops of appends use `buildString { append(…) }` (a `StringBuilder` under the hood) or `joinToString`. `String` is immutable; `+` in a loop allocates many intermediates.\n\n- Prefer `\"$first $last\"` over concatenation.\n- `buildString` is the idiomatic builder.",
    "pdfTopic": false,
    "tags": [
      "strings"
    ]
  },
  {
    "id": "kot-104",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Type checks and casts",
    "question": "What is the difference between `is`, `as`, and `as?`?",
    "answer": "- **`is` / `!is`:** type check; enables smart casts.\n- **`as`:** unsafe cast; throws `ClassCastException` on failure (and NPE if you cast null to a non-null type).\n- **`as?`:** safe cast; returns `null` on failure.\n\nPrefer `is` + smart cast or `as?` + Elvis. Bare `as` belongs in interop edges you have already validated.",
    "pdfTopic": false,
    "tags": [
      "is",
      "as",
      "casts"
    ]
  },
  {
    "id": "kot-105",
    "category": "kotlin",
    "level": "advanced",
    "topic": "MutableSharedFlow extra",
    "question": "How do `replay`, `extraBufferCapacity`, and `tryEmit` work on `MutableSharedFlow`?",
    "answer": "- **`replay`:** new subscribers immediately receive the last N values (like a tiny cache). `0` means events-only.\n- **`extraBufferCapacity`:** extra slots beyond replay for slow collectors.\n- **`onBufferOverflow`:** `SUSPEND`, `DROP_OLDEST`, `DROP_LATEST`.\n- **`tryEmit`:** non-suspending; returns false if the buffer policy cannot accept (with `SUSPEND` and no extra capacity, `tryEmit` fails when there is no subscriber/buffer).\n- For UI events, `extraBufferCapacity = 1` + `tryEmit` is a common ViewModel pattern so you do not drop a snackbar when Compose is not yet collecting.",
    "pdfTopic": false,
    "tags": [
      "SharedFlow",
      "tryEmit"
    ]
  },
  {
    "id": "kot-106",
    "category": "kotlin",
    "level": "basic",
    "topic": "Packages and files",
    "question": "How do files, packages, and top-level functions work in Kotlin?",
    "answer": "A `.kt` file may contain **multiple** public classes, plus **top-level** functions and properties. The package declaration does not have to match the folder (but it should). `private` at top level is **file-private**.\n\nThis is why Kotlin helpers live as `fun Uri.toFile()` in a file instead of a `UriUtils` class. Java sees `FileNameKt`. Use `@file:JvmName(\"Uris\")` for a cleaner Java name.",
    "pdfTopic": false,
    "tags": [
      "files",
      "top-level"
    ]
  },
  {
    "id": "kot-107",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Default dispatcher starvation",
    "question": "Why must you not run blocking I/O on `Dispatchers.Default`?",
    "answer": "`Default` is a **fixed** pool sized around CPU cores. If you block those threads on disk or network, CPU coroutines **starve** and the app janks or deadlocks. `IO` is allowed to **grow** for blocking work. Suspend APIs (Retrofit suspend, Room suspend) should run on the dispatcher the library expects — often you just call them without wrapping.\n\n- CPU: `Default`. Blocking: `IO`. UI: `Main`.\n- `withContext(IO)` around a *already-suspend* Retrofit call is usually redundant.",
    "pdfTopic": false,
    "tags": [
      "dispatchers",
      "IO",
      "Default"
    ]
  },
  {
    "id": "kot-108",
    "category": "kotlin",
    "level": "advanced",
    "topic": "yield and delay",
    "question": "What is the difference between `delay` and `yield`?",
    "answer": "`delay(ms)` suspends for time (cancellable, does not block the thread). `yield()` suspends **briefly** to let other coroutines on that dispatcher run — useful in CPU loops so cancellation and fairness happen. `Thread.sleep` blocks; never use it in a coroutine when `delay` will do.",
    "pdfTopic": false,
    "tags": [
      "delay",
      "yield"
    ]
  },
  {
    "id": "kot-109",
    "category": "kotlin",
    "level": "basic",
    "topic": "Boolean and if expression",
    "question": "Why is `if` an expression in Kotlin, and how does that replace the ternary?",
    "answer": "`if (c) a else b` **returns** a value, so Kotlin has no `?:` ternary for booleans (Elvis is only for null). `when` is also an expression. Both branches must have a common type.\n\n- `val color = if (enabled) GREEN else GRAY`\n- Missing `else` is only allowed when the `if` is used as a statement, not as a value.",
    "pdfTopic": false,
    "tags": [
      "if",
      "expression"
    ]
  },
  {
    "id": "kot-110",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Generic constraints",
    "question": "How do you constrain generic types in Kotlin?",
    "answer": "`fun <T : Comparable<T>> sort(list: List<T>)`. Multiple bounds use `where`: `fun <T> foo() where T : CharSequence, T : Appendable`. `reified` still needs `inline`. `*` is a star projection (“some unknown type”), similar to Java `?`.",
    "pdfTopic": false,
    "tags": [
      "generics",
      "where"
    ]
  },
  {
    "id": "kot-111",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Actor and Mutex",
    "question": "How do you protect shared mutable state in coroutines?",
    "answer": "Coroutines are concurrent, not race-free. Do not share a `HashMap` across `launch`es on `Default` without coordination.\n\n- Confine state to **one thread** (`Main` or a single-thread dispatcher).\n- **`Mutex`** for critical sections (`mutex.withLock { }`) — not JVM `synchronized` across suspend calls (`synchronized` + `delay` is a bug).\n- Channels / actor pattern: one coroutine owns the state and processes messages.\n- Prefer immutable snapshots in `StateFlow` over mutating a shared list.",
    "pdfTopic": false,
    "tags": [
      "Mutex",
      "concurrency"
    ]
  },
  {
    "id": "kot-112",
    "category": "kotlin",
    "level": "basic",
    "topic": "Nullability annotations Java",
    "question": "What is a platform type, and how do you deal with Java nulls?",
    "answer": "Java types show up as `String!` — the compiler does not know nullability. You may treat them as `String` or `String?`; the wrong choice crashes at runtime.\n\n- Annotate Java with `androidx.annotation.Nullable` / `NonNull`.\n- On the Kotlin side, immediately convert: `val name: String = javaName ?: \"\"`.\n- Do not sprinkle `!!` on every Java getter.",
    "pdfTopic": false,
    "tags": [
      "platform-types",
      "java-interop"
    ]
  },
  {
    "id": "kot-113",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "lateinit isInitialized",
    "question": "How do you check whether a `lateinit` property is set?",
    "answer": "Use the property reference: `if (::binding.isInitialized) binding.root`. There is no safe read that returns null; `lateinit` is a promise, not a `T?`. If the value might stay unset, use a nullable type instead of `lateinit`.",
    "pdfTopic": false,
    "tags": [
      "lateinit"
    ]
  },
  {
    "id": "kot-114",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Nested coroutine exception",
    "question": "What happens if a nested `async` fails and you never `await` it?",
    "answer": "With a **regular** parent `Job` (`coroutineScope`, `launch` without supervisor), the failure still **cancels the parent**. With a **supervisor**, the exception is **deferred** until `await` or can be lost if the `Deferred` is dropped. The PDF’s “async without await acts like launch” is about **results**, not about exceptions — exception semantics still differ. Always `await` or `join` children you start, or use `launch` plus explicit `try/catch`.",
    "pdfTopic": false,
    "tags": [
      "async",
      "exceptions",
      "nested"
    ]
  },
  {
    "id": "kot-115",
    "category": "kotlin",
    "level": "basic",
    "topic": "Equality of data class vs class",
    "question": "Why does a normal class compare by reference with `==` unless you override `equals`?",
    "answer": "`==` calls `equals`. `Any.equals` defaults to **referential** equality (`===`). **Data classes override `equals`** to compare primary properties. A plain `class User(val id: Int)` with `==` is `false` for two instances with the same `id` unless you write `equals`/`hashCode` yourself. That is a classic interview trap next to `===`.",
    "pdfTopic": false,
    "tags": [
      "equals",
      "data-class"
    ]
  },
  {
    "id": "kot-116",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Open vs override",
    "question": "Walk through `open`, `override`, and `final override`.",
    "answer": "Base members must be `open` (or abstract). Child uses `override`. To stop further overrides, `final override fun draw()`. Properties override with the same rules (`open val` → `override val` or `override var` with care). You cannot override a `val` with a `var` in a way that breaks covariance of getters without thinking through backing fields — interviews expect “make it open or you cannot subclass.”",
    "pdfTopic": false,
    "tags": [
      "open",
      "override"
    ]
  },
  {
    "id": "kot-117",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Unconfined dispatcher",
    "question": "What is `Dispatchers.Unconfined` and why is it risky on Android?",
    "answer": "The coroutine **starts** on the caller’s thread and **resumes** on the thread that invoked the continuation (often an OkHttp thread after a suspend network call). After the first suspension you are no longer on Main even if you launched from Main. Updating UI then crashes. Use it only for tiny non-UI adapters or tests. Prefer explicit `Main` / `IO` / `Default`.",
    "pdfTopic": false,
    "tags": [
      "Unconfined",
      "dispatchers"
    ]
  }
];
