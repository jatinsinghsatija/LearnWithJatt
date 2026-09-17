window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.kotlin = (window.QA_BANK.kotlin || []).concat([
  {
    "id": "kot-154",
    "category": "kotlin",
    "level": "basic",
    "topic": "kotlin.test",
    "question": "How do you write a basic Kotlin unit test?",
    "answer": "`kotlin.test` (`@Test`, `assertEquals`, `assertFailsWith`) is multiplatform. On JVM you usually use **JUnit 5** with Kotlin (`@Test fun name()` — backticks for spaces).\n\n`@BeforeTest` / `@AfterTest` in kotlin.test; JUnit 5 `@BeforeEach`. Put tests in `src/test/kotlin` mirroring packages. Name functions with backticks: `` `login fails when token expired` ``.",
    "pdfTopic": false,
    "tags": [
      "junit",
      "kotlin.test"
    ]
  },
  {
    "id": "kot-155",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "MockK",
    "question": "How does MockK differ from Mockito for Kotlin unit tests?",
    "answer": "MockK mocks **final classes and suspend functions** without extra inline agents: `every { repo.user() } returns u`, `coEvery { repo.user() } returns u`, `verify { repo.save(any()) }`, `coVerify`, `slot<User>()`, `relaxUnitFun = true`.\n\n`spyk` is the spy. `mockkObject` for objects (use rarely). Clear mocks in `@AfterEach` (`unmockkAll()`) if you mock objects/statics.",
    "pdfTopic": false,
    "tags": [
      "mockk"
    ]
  },
  {
    "id": "kot-156",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "runTest",
    "question": "What does `runTest` do, and why not `runBlocking` in unit tests?",
    "answer": "`runTest` (kotlinx-coroutines-test) uses a **test scheduler** so `delay` is virtual, and it fails if the test leaks unfinished coroutines (unless you opt out).\n\n`runBlocking` uses real time and can deadlock or flake. Production Android code should not `runBlocking` on main; tests should not `runBlocking { delay(5_000) }`.",
    "pdfTopic": false,
    "tags": [
      "coroutines",
      "runTest"
    ]
  },
  {
    "id": "kot-157",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Test dispatchers",
    "question": "StandardTestDispatcher vs UnconfinedTestDispatcher — which for ViewModel tests?",
    "answer": "**StandardTestDispatcher** queues work; you `advanceUntilIdle()` / `advanceTimeBy`. Deterministic order. **UnconfinedTestDispatcher** starts coroutines eagerly on the caller — easier, can hide race bugs.\n\nInject the dispatcher into the ViewModel. `Dispatchers.setMain(testDispatcher)` in a JUnit rule/extension so `viewModelScope` is testable. Prefer Standard when timing matters (debounce).",
    "pdfTopic": false,
    "tags": [
      "coroutines",
      "testing"
    ]
  },
  {
    "id": "kot-158",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Turbine",
    "question": "How do you assert a Flow in a unit test?",
    "answer": "Cash App **Turbine**: `flow.test { assertEquals(a, awaitItem()); awaitComplete() }`. Or `kotlinx-coroutines-test` `toList()` on a finite flow inside `runTest`.\n\nFor StateFlow, collect the current `value` and then new items. Cancel the collection. Do not `first()` if you need the second emission. `advanceUntilIdle` before asserting.",
    "pdfTopic": false,
    "tags": [
      "turbine",
      "flow"
    ]
  },
  {
    "id": "kot-159",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Cancellation in tests",
    "question": "How should unit tests treat CancellationException?",
    "answer": "Never swallow it in `catch (e: Exception)`. `runTest` uses cancellation to skip delays; catching it turns a pass into a hang or a false green.\n\nIf you `runCatching`, rethrow cancellation. Turbine/`awaitClose` should complete when the scope cancels. A test that `verify(exactly = 0)` after cancel must still `advanceUntilIdle`.",
    "pdfTopic": false,
    "tags": [
      "cancellation",
      "testing"
    ]
  },
  {
    "id": "kot-160",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Kotest",
    "question": "What is Kotest, and how does it differ from JUnit + MockK?",
    "answer": "**Kotest** is a Kotlin test framework: spec styles (StringSpec, BehaviorSpec Given/When/Then), matchers (`shouldBe`), property testing, coroutine test listeners.\n\nYou can still run on JUnit 5’s engine. Teams pick Kotest for readable BDD specs; others stay on JUnit for Android plugin familiarity. MockK remains the mock library either way.",
    "pdfTopic": false,
    "tags": [
      "kotest"
    ]
  },
  {
    "id": "kot-161",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "coEvery",
    "question": "How do you mock suspend functions?",
    "answer": "MockK `coEvery { api.login(any()) } returns Result.Ok`. Mockito needs `thenAnswer { continuation in ... }` or mockito-kotlin coroutines helpers — clumsier.\n\nThe unit under test must be called from `runTest` / a coroutine. Stubbing a suspend function and calling it from a non-coroutine test will not compile or will hang.",
    "pdfTopic": false,
    "tags": [
      "mockk",
      "coroutines"
    ]
  },
  {
    "id": "kot-162",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Main dispatcher rule",
    "question": "How do you replace `Dispatchers.Main` in JVM unit tests?",
    "answer": "Android `Dispatchers.Main` is absent on the JVM (`IllegalStateException`). `Dispatchers.setMain(testDispatcher)` in `@BeforeEach` and `resetMain()` after, or a JUnit 5 extension.\n\n`viewModelScope` uses Main.Immediate. Without the rule, ViewModel tests crash. Robolectric is not required for this.",
    "pdfTopic": false,
    "tags": [
      "android",
      "coroutines"
    ]
  },
  {
    "id": "kot-163",
    "category": "kotlin",
    "level": "basic",
    "topic": "assertFailsWith",
    "question": "How do you assert exceptions in Kotlin unit tests?",
    "answer": "`assertFailsWith<IllegalArgumentException> { parser.parse() }` (kotlin.test) or JUnit `assertThrows`. The block is the act.\n\nAssert the message if it is part of the contract. Do not use `@Test(expected=...)` in new Kotlin code.",
    "pdfTopic": false,
    "tags": [
      "assertions"
    ]
  },
  {
    "id": "kot-164",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Fakes in Kotlin",
    "question": "Why are fakes often better than MockK for repositories you own?",
    "answer": "A `class FakeUserRepo : UserRepo` with a `MutableMap` is readable, supports many tests, and refactors with the interface. Mocks encode **call sequences** that break when you add logging.\n\nUse MockK for types that are expensive (OkHttp) or not yours. Hybrid: fake repo + mock analytics.",
    "pdfTopic": false,
    "tags": [
      "fakes"
    ]
  },
  {
    "id": "kot-165",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Property-based tests",
    "question": "What is property-based testing in Kotlin (Kotest / kotlin-test)?",
    "answer": "Instead of one example, you state a **property** (`reverse(reverse(x)) == x`) and the library generates inputs. Kotest `checkAll`, or KotlinTest property tests.\n\nGood for parsers, serializers, money rounding. Shrink failing inputs. Not a replacement for a few example unit tests of business rules.",
    "pdfTopic": false,
    "tags": [
      "property-test",
      "kotest"
    ]
  },
  {
    "id": "kot-166",
    "category": "kotlin",
    "level": "intermediate",
    "topic": "Slot and capture",
    "question": "How do you capture arguments with MockK?",
    "answer": "`val slot = slot<User>(); every { repo.save(capture(slot)) } just Runs` then `viewModel.save()` then `slot.captured.name shouldBe \"Ada\"`.\n\n`mutableListOf` + `capture` for many calls. Prefer asserting a fake’s stored value over capturing if you wrote the fake.",
    "pdfTopic": false,
    "tags": [
      "mockk"
    ]
  },
  {
    "id": "kot-167",
    "category": "kotlin",
    "level": "advanced",
    "topic": "Testing StateFlow",
    "question": "How do you unit-test a ViewModel that exposes StateFlow?",
    "answer": "`runTest` + collect: `val values = mutableListOf<UiState>(); val job = launch { vm.state.toList(values) }` is wrong for infinite StateFlow. Use Turbine `vm.state.test { awaitItem(); vm.onEvent(); awaitItem() }` or `state.value` after `advanceUntilIdle()`.\n\n`stateIn` needs a scope — the ViewModel scope. Sharing policy `WhileSubscribed` may need a subscriber before upstream starts.",
    "pdfTopic": false,
    "tags": [
      "stateflow",
      "turbine"
    ]
  }
]);
