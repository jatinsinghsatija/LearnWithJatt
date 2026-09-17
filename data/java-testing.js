window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.java = (window.QA_BANK.java || []).concat([
  {
    "id": "jav-139",
    "category": "java",
    "level": "basic",
    "topic": "What is a unit test",
    "question": "What is a unit test in Java, and what should it not do?",
    "answer": "A **unit test** verifies a small unit (class/method) in isolation, on the JVM, in milliseconds, with no network, no real DB, no UI. JUnit is the usual runner.\n\nIt should not start Spring full context, hit REST, or sleep. Those are integration tests. If you mock every collaborator including the class under test, you are testing the mock framework.",
    "pdfTopic": false,
    "tags": [
      "junit",
      "unit-test"
    ]
  },
  {
    "id": "jav-140",
    "category": "java",
    "level": "basic",
    "topic": "JUnit 4 vs 5",
    "question": "How does JUnit 4 differ from JUnit 5?",
    "answer": "JUnit 4: `@Test`, `@Before`/`@After`, `@BeforeClass`, `@RunWith`, `@Rule`, `org.junit`.\nJUnit 5 (Jupiter): `@BeforeEach`/`@AfterEach`, `@BeforeAll` (static unless `@TestInstance(PER_CLASS)`), `@ExtendWith`, `@ParameterizedTest`, `@Nested`, `@DisplayName`, `org.junit.jupiter.api`.\n\nJUnit 5’s vintage engine can run JUnit 4. New Java code should be Jupiter. Android instrumented tests often still look like JUnit 4.",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-141",
    "category": "java",
    "level": "basic",
    "topic": "JUnit lifecycle",
    "question": "What is the JUnit test lifecycle?",
    "answer": "For each test method: instantiate the test class (JUnit 4 / PER_METHOD), `@BeforeEach`, `@Test`, `@AfterEach`. `@BeforeAll` / `@AfterAll` once per class.\n\nInstance fields reset if a new instance is created per method — that is why mutable fixtures in fields can surprise you with `PER_CLASS`. Do not rely on test **order** (`@Order` exists; still a smell).",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-142",
    "category": "java",
    "level": "intermediate",
    "topic": "Assertions",
    "question": "How should you assert in JUnit, including exceptions?",
    "answer": "JUnit 5: `assertEquals`, `assertTrue`, `assertNotNull`, `assertThrows(IllegalArgumentException.class, () -> calc.div(1,0))`, `assertAll` for multiple asserts.\n\n`assertThrows` returns the exception so you can assert the message. Do not use expected= in JUnit 4 annotations for new code. Prefer AssertJ `assertThat(list).containsExactly(...)` for collections.",
    "pdfTopic": false,
    "tags": [
      "junit",
      "assertions"
    ]
  },
  {
    "id": "jav-143",
    "category": "java",
    "level": "intermediate",
    "topic": "Parameterized tests",
    "question": "How do parameterized tests work in JUnit 5?",
    "answer": "`@ParameterizedTest` + `@ValueSource`, `@CsvSource`, `@MethodSource`, `@EnumSource`. Each set of arguments is a separate invocation.\n\nUse them for validation matrices (null, empty, blank). Keep the table readable. `@MethodSource` should be static and return `Stream<Arguments>`.",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-144",
    "category": "java",
    "level": "intermediate",
    "topic": "Mockito basics",
    "question": "How do you stub and verify with Mockito?",
    "answer": "`when(repo.find(1)).thenReturn(user)` or `doReturn(user).when(repo).find(1)` (void/spies). `verify(repo).save(user)`, `verify(repo, never()).delete(any())`, `times(1)`.\n\n`@Mock` + `MockitoExtension` (J5) or `MockitoJUnitRunner` (J4). `ArgumentCaptor` captures args. `thenThrow`. Do not mock data classes you can construct.",
    "pdfTopic": false,
    "tags": [
      "mockito"
    ]
  },
  {
    "id": "jav-145",
    "category": "java",
    "level": "intermediate",
    "topic": "Mock vs spy",
    "question": "When is a Mockito spy dangerous?",
    "answer": "A **mock** is a full fake. A **spy** wraps a real object and stubs selected methods. Spies call **real** code by default — side effects, NPEs, and half-stubbed state are common.\n\nPrefer a fake implementation. If you spy, use `doReturn().when(spy).method()` not `when(spy.method())` which **calls the real method** while stubbing.",
    "pdfTopic": false,
    "tags": [
      "mockito"
    ]
  },
  {
    "id": "jav-146",
    "category": "java",
    "level": "intermediate",
    "topic": "Test doubles recap",
    "question": "Explain dummy, stub, fake, mock, and spy with a Java example each.",
    "answer": "Dummy: `new Service(nullLogger)` unused. Stub: `when(clock.now()).thenReturn(t0)`. Fake: `InMemoryUserRepo implements UserRepo`. Mock: `verify(mailer).send(dto)`. Spy: `spy(realParser)` stub `parseHeader` only.\n\nInterviewers want you to pick the **simplest** double that still fails when production is wrong.",
    "pdfTopic": false,
    "tags": [
      "test-doubles"
    ]
  },
  {
    "id": "jav-147",
    "category": "java",
    "level": "advanced",
    "topic": "Static mocking",
    "question": "How do you mock static methods, and why is it a last resort?",
    "answer": "Mockito inline `mockStatic(UUID.class)` / MockedStatic in try-with-resources. PowerMock did this with bytecode hacks and fights JUnit 5/JPMS.\n\nStatic mocks couple tests to implementation. Wrap `UUID.randomUUID()` in a `IdGenerator` you can fake. Use static mock only for unmodifiable third-party statics, briefly.",
    "pdfTopic": false,
    "tags": [
      "mockito"
    ]
  },
  {
    "id": "jav-148",
    "category": "java",
    "level": "intermediate",
    "topic": "TDD cycle",
    "question": "What is the TDD red-green-refactor cycle in Java?",
    "answer": "**Red** — write a failing unit test. **Green** — smallest production change that passes. **Refactor** — clean design with tests still green.\n\nYou do not TDD UI layout or generated code. You TDD domain rules, parsers, and calculators. Skipping red (writing tests after) is “test after,” not TDD.",
    "pdfTopic": false,
    "tags": [
      "tdd"
    ]
  },
  {
    "id": "jav-149",
    "category": "java",
    "level": "intermediate",
    "topic": "TestNG",
    "question": "How does TestNG differ from JUnit?",
    "answer": "TestNG has **groups**, flexible dependencies (`dependsOnMethods` — controversial), `@DataProvider`, parallel methods, and a different lifecycle (`@BeforeMethod`). It was popular when JUnit 4 was limited.\n\nJUnit 5 closed most gaps. New Java/Android work is usually JUnit. Know TestNG exists for older enterprise codebases.",
    "pdfTopic": false,
    "tags": [
      "testng"
    ]
  },
  {
    "id": "jav-150",
    "category": "java",
    "level": "advanced",
    "topic": "Mutation testing",
    "question": "What is mutation testing (PIT), and why can 100% coverage still be weak?",
    "answer": "**PIT** mutates bytecode (flip `>` to `<`, kill a condition) and checks that tests **fail**. If a mutant survives, a test never asserted that behavior.\n\nCoverage only proves lines **ran**, not that they were **checked**. Mutation testing is slow; run it on domain modules, not the whole monolith nightly.",
    "pdfTopic": false,
    "tags": [
      "pit",
      "coverage"
    ]
  },
  {
    "id": "jav-151",
    "category": "java",
    "level": "intermediate",
    "topic": "Nested tests",
    "question": "What are `@Nested` tests and `@DisplayName` for?",
    "answer": "`@Nested` inner classes group scenarios (`WhenAccountIsFrozen { @Test withdraw_fails }`). `@DisplayName` makes reports readable.\n\nThis is BDD-ish structure without Cucumber. Outer `@BeforeEach` runs before nested ones. Inner classes must not be static (JUnit 5).",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-152",
    "category": "java",
    "level": "intermediate",
    "topic": "Timeouts and assumptions",
    "question": "What are JUnit timeouts and assumptions?",
    "answer": "`assertTimeout` / `assertTimeoutPreemptively` fail slow tests (preemptive uses another thread — beware of thread-safety). **Assumptions** (`assumeTrue(isLinux())`) skip when the environment cannot run the test — not the same as a failure.\n\nDo not timeout-flake CI because a laptop is slow; inject a clock and fake time.",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-153",
    "category": "java",
    "level": "advanced",
    "topic": "JUnit extensions",
    "question": "What replaced JUnit 4 Rules in JUnit 5?",
    "answer": "**Extensions** (`BeforeEachCallback`, `ParameterResolver`) registered with `@ExtendWith`. MockitoExtension, SpringExtension, TempDir, etc.\n\nRules (`TemporaryFolder`) still work via the vintage/adapter path but new code should be extensions. You can write a `MainDispatcherExtension` analogue in Kotlin tests.",
    "pdfTopic": false,
    "tags": [
      "junit"
    ]
  },
  {
    "id": "jav-154",
    "category": "java",
    "level": "intermediate",
    "topic": "AAA vs Given When Then",
    "question": "How do you structure a readable Java unit test?",
    "answer": "Arrange-Act-Assert or Given-When-Then. Blank lines between sections. One act. Assert only the behavior under test (not 15 fields).\n\nNames: `shouldRejectWithdrawWhenBalanceInsufficient`. Magic numbers belong in locals (`int balance = 10`). Builders/fixtures reduce setup noise.",
    "pdfTopic": false,
    "tags": [
      "style"
    ]
  },
  {
    "id": "jav-155",
    "category": "java",
    "level": "advanced",
    "topic": "Contract tests",
    "question": "What is a contract test vs a unit test vs an e2e test?",
    "answer": "Unit — one class, fakes. **Contract** — consumer/provider agree a schema (Spring Cloud Contract, Pact); the provider verifies the contract without the consumer app. **E2E** — full stack through HTTP/UI.\n\nContract tests catch “we changed JSON field names” cheaper than e2e. They are not a substitute for domain unit tests.",
    "pdfTopic": false,
    "tags": [
      "contract"
    ]
  },
  {
    "id": "jav-156",
    "category": "java",
    "level": "intermediate",
    "topic": "Coverage pitfalls",
    "question": "Why is 100% line coverage a bad KPI?",
    "answer": "You can execute a line without asserting it. Catch blocks and branches are easy to miss. Coverage theater produces tautological tests (`getX`/`setX`).\n\nTrack coverage to find **untested packages**, fail CI on drops, and pair with mutation testing or code review. Prefer tests of **rules** over tests of **getters**.",
    "pdfTopic": false,
    "tags": [
      "coverage"
    ]
  },
  {
    "id": "jav-157",
    "category": "java",
    "level": "basic",
    "topic": "What belongs in a unit test suite",
    "question": "What should a Java unit-test suite include and exclude?",
    "answer": "Include: pure logic, mappers, validators, state machines, error mapping. Exclude: Spring `@SpringBootTest` slicing everything, Testcontainers DB (integration), Selenium (e2e), `Thread.sleep`, real sockets.\n\nA “unit test” that starts Tomcat is an integration test wearing a fake badge.",
    "pdfTopic": false,
    "tags": [
      "unit-test"
    ]
  },
  {
    "id": "jav-158",
    "category": "java",
    "level": "intermediate",
    "topic": "AssertJ collections",
    "question": "Why is AssertJ popular for collection assertions?",
    "answer": "`assertThat(list).extracting(User::name).containsExactly(\"a\",\"b\")` and `usingRecursiveComparison()` beat loops of `assertEquals`.\n\nFluent assertions fail with **actual vs expected** dumps. Soft assertions (`SoftAssertions`) collect multiple failures. Use them in unit tests of aggregations and DTOs.",
    "pdfTopic": false,
    "tags": [
      "assertj"
    ]
  }
]);
