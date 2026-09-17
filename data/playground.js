window.QA_BANK = window.QA_BANK || {};
window.QA_BANK.playground = [
  {
    "id": "pg-001",
    "category": "playground",
    "level": "basic",
    "topic": "Palindrome",
    "question": "Check whether a string is a palindrome, ignoring case. Print true/false for Radar, hello, and AbBa.",
    "answer": "A palindrome reads the same forwards and backwards. Compare characters from both ends (two pointers) after normalizing case. Avoid building a reversed copy with `+` in a loop — that is O(n²) on Java strings.\n\n**Complexity:** O(n) time, O(1) extra space with two pointers.",
    "expected": "true\nfalse\ntrue",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"Radar\"));\n        System.out.println(isPalindrome(\"hello\"));\n        System.out.println(isPalindrome(\"AbBa\"));\n    }\n\n    static boolean isPalindrome(String s) {\n        // write your code\n        return false;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(isPalindrome(\"Radar\"))\n    println(isPalindrome(\"hello\"))\n    println(isPalindrome(\"AbBa\"))\n}\n\nfun isPalindrome(s: String): Boolean {\n    // write your code\n    return false\n\n}\n",
      "dart": "void main() {\n  print(isPalindrome(\"Radar\"));\n  print(isPalindrome(\"hello\"));\n  print(isPalindrome(\"AbBa\"));\n}\n\nbool isPalindrome(String s) {\n  // write your code\n  return false;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"Radar\"));\n        System.out.println(isPalindrome(\"hello\"));\n        System.out.println(isPalindrome(\"AbBa\"));\n    }\n\n    static boolean isPalindrome(String s) {\n        int i = 0, j = s.length() - 1;\n        while (i < j) {\n            char a = Character.toLowerCase(s.charAt(i));\n            char b = Character.toLowerCase(s.charAt(j));\n            if (a != b) return false;\n            i++;\n            j--;\n        }\n        return true;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(isPalindrome(\"Radar\"))\n    println(isPalindrome(\"hello\"))\n    println(isPalindrome(\"AbBa\"))\n}\n\nfun isPalindrome(s: String): Boolean {\n    var i = 0\n    var j = s.lastIndex\n    while (i < j) {\n        if (s[i].lowercaseChar() != s[j].lowercaseChar()) return false\n        i++\n        j--\n    }\n    return true\n\n}\n",
      "dart": "void main() {\n  print(isPalindrome(\"Radar\"));\n  print(isPalindrome(\"hello\"));\n  print(isPalindrome(\"AbBa\"));\n}\n\nbool isPalindrome(String s) {\n  var i = 0;\n  var j = s.length - 1;\n  while (i < j) {\n    if (s[i].toLowerCase() != s[j].toLowerCase()) return false;\n    i++;\n    j--;\n  }\n  return true;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "reverseStr\\s*\\+|\\+\\s*s\\.charAt|\\+\\s*s\\[|reversed\\s*\\+=",
        "message": "Building a reversed string with + in a loop is O(n²). Two pointers (or StringBuilder) is the interview answer."
      },
      {
        "pattern": "toCharArray\\(\\)|split\\(\"\"\\)|StringBuilder",
        "message": "Works, but two indices use O(1) extra memory. Mention that in the interview."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "string",
      "two-pointers",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-002",
    "category": "playground",
    "level": "basic",
    "topic": "Linear Search",
    "question": "Implement linear search. Print the index of 8 and of 7 in {2, 4, 6, 8, 10} (-1 if missing).",
    "answer": "Scan left to right until the target is found. Works on unsorted data. **O(n)** time, **O(1)** space. If the array is sorted, binary search is the follow-up.",
    "expected": "3\n-1",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        System.out.println(linearSearch(arr, 8));\n        System.out.println(linearSearch(arr, 7));\n    }\n\n    static int linearSearch(int[] arr, int x) {\n        // write your code\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 6, 8, 10)\n    println(linearSearch(arr, 8))\n    println(linearSearch(arr, 7))\n}\n\nfun linearSearch(arr: IntArray, x: Int): Int {\n    // write your code\n    return -1\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 6, 8, 10];\n  print(linearSearch(arr, 8));\n  print(linearSearch(arr, 7));\n}\n\nint linearSearch(List<int> arr, int x) {\n  // write your code\n  return -1;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        System.out.println(linearSearch(arr, 8));\n        System.out.println(linearSearch(arr, 7));\n    }\n\n    static int linearSearch(int[] arr, int x) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == x) return i;\n        }\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 6, 8, 10)\n    println(linearSearch(arr, 8))\n    println(linearSearch(arr, 7))\n}\n\nfun linearSearch(arr: IntArray, x: Int): Int {\n    for (i in arr.indices) if (arr[i] == x) return i\n    return -1\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 6, 8, 10];\n  print(linearSearch(arr, 8));\n  print(linearSearch(arr, 7));\n}\n\nint linearSearch(List<int> arr, int x) {\n  for (var i = 0; i < arr.length; i++) {\n    if (arr[i] == x) return i;\n  }\n  return -1;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.binarySearch|binarySearch",
        "message": "Binary search is fine only because this sample is sorted. Linear search must not assume order."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "search",
      "arrays",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-003",
    "category": "playground",
    "level": "intermediate",
    "topic": "Binary Search",
    "question": "Implement iterative binary search on a sorted array. Print the index of 8 and of 7 in {2, 4, 6, 8, 10}.",
    "answer": "Keep `left` and `right`. Mid = `left + (right - left) / 2` (avoids overflow). If `arr[mid] < x` search right, else left. **O(log n)**. Array **must be sorted**.",
    "expected": "3\n-1",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        System.out.println(binarySearch(arr, 8));\n        System.out.println(binarySearch(arr, 7));\n    }\n\n    static int binarySearch(int[] arr, int x) {\n        // write your code\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 6, 8, 10)\n    println(binarySearch(arr, 8))\n    println(binarySearch(arr, 7))\n}\n\nfun binarySearch(arr: IntArray, x: Int): Int {\n    // write your code\n    return -1\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 6, 8, 10];\n  print(binarySearch(arr, 8));\n  print(binarySearch(arr, 7));\n}\n\nint binarySearch(List<int> arr, int x) {\n  // write your code\n  return -1;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        System.out.println(binarySearch(arr, 8));\n        System.out.println(binarySearch(arr, 7));\n    }\n\n    static int binarySearch(int[] arr, int x) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] < x) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 6, 8, 10)\n    println(binarySearch(arr, 8))\n    println(binarySearch(arr, 7))\n}\n\nfun binarySearch(arr: IntArray, x: Int): Int {\n    var left = 0\n    var right = arr.lastIndex\n    while (left <= right) {\n        val mid = left + (right - left) / 2\n        when {\n            arr[mid] == x -> return mid\n            arr[mid] < x -> left = mid + 1\n            else -> right = mid - 1\n        }\n    }\n    return -1\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 6, 8, 10];\n  print(binarySearch(arr, 8));\n  print(binarySearch(arr, 7));\n}\n\nint binarySearch(List<int> arr, int x) {\n  var left = 0;\n  var right = arr.length - 1;\n  while (left <= right) {\n    var mid = left + (right - left) ~/ 2;\n    if (arr[mid] == x) return mid;\n    if (arr[mid] < x) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "mid\\s*=\\s*\\(\\s*left\\s*\\+\\s*right\\s*\\)\\s*/",
        "message": "Use left + (right - left) / 2 so left+right cannot overflow on large indices."
      },
      {
        "pattern": "for\\s*\\(\\s*int i = 0",
        "message": "A full scan is linear search. Binary search must halve the range each step."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "search",
      "arrays",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-004",
    "category": "playground",
    "level": "basic",
    "topic": "Bubble Sort",
    "question": "Sort {5, 1, 4, 2, 8} with bubble sort and print the array.",
    "answer": "Repeatedly swap adjacent out-of-order pairs. After pass i, the last i elements are sorted. **O(n²)** time, **O(1)** extra space. Mention an early-exit flag if no swaps occur.",
    "expected": "[1, 2, 4, 5, 8]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        // write your Bubble Sort here\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    // write your Bubble Sort here\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  // write your Bubble Sort here\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int t = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = t;\n                }\n            }\n        }\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    val n = arr.size\n    for (i in 0 until n - 1) {\n        for (j in 0 until n - i - 1) {\n            if (arr[j] > arr[j + 1]) {\n                val t = arr[j]\n                arr[j] = arr[j + 1]\n                arr[j + 1] = t\n            }\n        }\n    }\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  var n = arr.length;\n  for (var i = 0; i < n - 1; i++) {\n    for (var j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        var t = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = t;\n      }\n    }\n  }\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|sort\\(\\)|sorted\\(\\)",
        "message": "Do not call the library sort — implement bubble sort as asked."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "sorting",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-005",
    "category": "playground",
    "level": "basic",
    "topic": "Insertion Sort",
    "question": "Sort {5, 1, 4, 2, 8} with insertion sort and print the array.",
    "answer": "Build a sorted prefix. Take `key = arr[i]` and shift larger elements right until the hole for key is found. **O(n²)** worst, **O(n)** on already-sorted data. Good for small or nearly sorted arrays.",
    "expected": "[1, 2, 4, 5, 8]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        // write your Insertion Sort here\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    // write your Insertion Sort here\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  // write your Insertion Sort here\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        for (int i = 1; i < arr.length; i++) {\n            int key = arr[i], j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    for (i in 1 until arr.size) {\n        val key = arr[i]\n        var j = i - 1\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]\n            j--\n        }\n        arr[j + 1] = key\n    }\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  for (var i = 1; i < arr.length; i++) {\n    var key = arr[i];\n    var j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|sorted\\(\\)",
        "message": "Implement insertion sort yourself, not a library sort."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "sorting",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-006",
    "category": "playground",
    "level": "basic",
    "topic": "Selection Sort",
    "question": "Sort {5, 1, 4, 2, 8} with selection sort and print the array.",
    "answer": "For each index i, find the minimum in `i..n-1` and swap it with `arr[i]`. **O(n²)** time, **O(1)** space, at most n swaps (useful when writes are expensive).",
    "expected": "[1, 2, 4, 5, 8]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        // write your Selection Sort here\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    // write your Selection Sort here\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  // write your Selection Sort here\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void sort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            int min = i;\n            for (int j = i + 1; j < n; j++) if (arr[j] < arr[min]) min = j;\n            int t = arr[min];\n            arr[min] = arr[i];\n            arr[i] = t;\n        }\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    sort(arr)\n    println(arr.contentToString())\n}\n\nfun sort(arr: IntArray) {\n    for (i in 0 until arr.size - 1) {\n        var min = i\n        for (j in i + 1 until arr.size) if (arr[j] < arr[min]) min = j\n        val t = arr[min]\n        arr[min] = arr[i]\n        arr[i] = t\n    }\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  sort(arr);\n  print(arr);\n}\n\nvoid sort(List<int> arr) {\n  var n = arr.length;\n  for (var i = 0; i < n - 1; i++) {\n    var min = i;\n    for (var j = i + 1; j < n; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    var t = arr[min];\n    arr[min] = arr[i];\n    arr[i] = t;\n  }\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|sorted\\(\\)",
        "message": "Implement selection sort yourself."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "sorting",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-007",
    "category": "playground",
    "level": "advanced",
    "topic": "Merge Sort",
    "question": "Sort {5, 1, 4, 2, 8} with merge sort and print the array.",
    "answer": "Divide-and-conquer: sort halves, then merge two sorted runs. **O(n log n)** time, **O(n)** extra space. Stable. Default interview 'efficient general sort' along with heapsort/quicksort.",
    "expected": "[1, 2, 4, 5, 8]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        mergeSort(arr, 0, arr.length - 1);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void mergeSort(int[] arr, int left, int right) {\n        // write your code\n    }\n\n    static void merge(int[] arr, int left, int mid, int right) {\n        // write your code\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    mergeSort(arr, 0, arr.lastIndex)\n    println(arr.contentToString())\n}\n\nfun mergeSort(arr: IntArray, left: Int, right: Int) {\n    // write your code\n}\n\nfun merge(arr: IntArray, left: Int, mid: Int, right: Int) {\n    // write your code\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  mergeSort(arr, 0, arr.length - 1);\n  print(arr);\n}\n\nvoid mergeSort(List<int> arr, int left, int right) {\n  // write your code\n}\n\nvoid merge(List<int> arr, int left, int mid, int right) {\n  // write your code\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        mergeSort(arr, 0, arr.length - 1);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void mergeSort(int[] arr, int left, int right) {\n        if (left >= right) return;\n        int mid = left + (right - left) / 2;\n        mergeSort(arr, left, mid);\n        mergeSort(arr, mid + 1, right);\n        merge(arr, left, mid, right);\n    }\n\n    static void merge(int[] arr, int left, int mid, int right) {\n        int n1 = mid - left + 1, n2 = right - mid;\n        int[] L = new int[n1], R = new int[n2];\n        System.arraycopy(arr, left, L, 0, n1);\n        System.arraycopy(arr, mid + 1, R, 0, n2);\n        int i = 0, j = 0, k = left;\n        while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n        while (i < n1) arr[k++] = L[i++];\n        while (j < n2) arr[k++] = R[j++];\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    mergeSort(arr, 0, arr.lastIndex)\n    println(arr.contentToString())\n}\n\nfun mergeSort(arr: IntArray, left: Int, right: Int) {\n    if (left >= right) return\n    val mid = left + (right - left) / 2\n    mergeSort(arr, left, mid)\n    mergeSort(arr, mid + 1, right)\n    merge(arr, left, mid, right)\n}\n\nfun merge(arr: IntArray, left: Int, mid: Int, right: Int) {\n    val L = arr.copyOfRange(left, mid + 1)\n    val R = arr.copyOfRange(mid + 1, right + 1)\n    var i = 0\n    var j = 0\n    var k = left\n    while (i < L.size && j < R.size) {\n        arr[k++] = if (L[i] <= R[j]) L[i++] else R[j++]\n    }\n    while (i < L.size) arr[k++] = L[i++]\n    while (j < R.size) arr[k++] = R[j++]\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  mergeSort(arr, 0, arr.length - 1);\n  print(arr);\n}\n\nvoid mergeSort(List<int> arr, int left, int right) {\n  if (left >= right) return;\n  var mid = left + (right - left) ~/ 2;\n  mergeSort(arr, left, mid);\n  mergeSort(arr, mid + 1, right);\n  merge(arr, left, mid, right);\n}\n\nvoid merge(List<int> arr, int left, int mid, int right) {\n  var L = arr.sublist(left, mid + 1);\n  var R = arr.sublist(mid + 1, right + 1);\n  var i = 0, j = 0, k = left;\n  while (i < L.length && j < R.length) {\n    arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n  }\n  while (i < L.length) arr[k++] = L[i++];\n  while (j < R.length) arr[k++] = R[j++];\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|List\\.sort|sorted\\(\\)",
        "message": "Call mergeSort/merge, not the standard library sort."
      },
      {
        "pattern": "for \\(int i = 0; i < n - 1",
        "message": "That looks like bubble/selection. Merge sort should recurse on halves then merge."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "sorting",
      "divide-conquer",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-008",
    "category": "playground",
    "level": "advanced",
    "topic": "Quick Sort",
    "question": "Sort {5, 1, 4, 2, 8} with quicksort (last-element pivot as in the notes) and print the array.",
    "answer": "Partition around a pivot so left ≤ pivot < right, then recurse. Average **O(n log n)**, worst **O(n²)** on sorted input with a naive last-element pivot. In-place, not stable. Interview follow-up: random/median-of-three pivot.",
    "expected": "[1, 2, 4, 5, 8]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void quickSort(int[] arr, int low, int high) {\n        // write your code\n    }\n\n    static int partition(int[] arr, int low, int high) {\n        return 0;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    quickSort(arr, 0, arr.lastIndex)\n    println(arr.contentToString())\n}\n\nfun quickSort(arr: IntArray, low: Int, high: Int) {\n    // write your code\n}\n\nfun partition(arr: IntArray, low: Int, high: Int): Int {\n    return 0\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  quickSort(arr, 0, arr.length - 1);\n  print(arr);\n}\n\nvoid quickSort(List<int> arr, int low, int high) {\n  // write your code\n}\n\nint partition(List<int> arr, int low, int high) {\n  return 0;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 1, 4, 2, 8};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n\n    static void quickSort(int[] arr, int low, int high) {\n        if (low >= high) return;\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n\n    static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n            }\n        }\n        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;\n        return i + 1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(5, 1, 4, 2, 8)\n    quickSort(arr, 0, arr.lastIndex)\n    println(arr.contentToString())\n}\n\nfun quickSort(arr: IntArray, low: Int, high: Int) {\n    if (low >= high) return\n    val pi = partition(arr, low, high)\n    quickSort(arr, low, pi - 1)\n    quickSort(arr, pi + 1, high)\n}\n\nfun partition(arr: IntArray, low: Int, high: Int): Int {\n    val pivot = arr[high]\n    var i = low - 1\n    for (j in low until high) {\n        if (arr[j] <= pivot) {\n            i++\n            val t = arr[i]; arr[i] = arr[j]; arr[j] = t\n        }\n    }\n    val t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t\n    return i + 1\n\n}\n",
      "dart": "void main() {\n  var arr = [5, 1, 4, 2, 8];\n  quickSort(arr, 0, arr.length - 1);\n  print(arr);\n}\n\nvoid quickSort(List<int> arr, int low, int high) {\n  if (low >= high) return;\n  var pi = partition(arr, low, high);\n  quickSort(arr, low, pi - 1);\n  quickSort(arr, pi + 1, high);\n}\n\nint partition(List<int> arr, int low, int high) {\n  var pivot = arr[high];\n  var i = low - 1;\n  for (var j = low; j < high; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      var t = arr[i];\n      arr[i] = arr[j];\n      arr[j] = t;\n    }\n  }\n  var t = arr[i + 1];\n  arr[i + 1] = arr[high];\n  arr[high] = t;\n  return i + 1;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|sorted\\(\\)",
        "message": "Implement partition + recurse, not Arrays.sort."
      },
      {
        "pattern": "for \\(int i = 0; i < n - 1",
        "message": "That looks like bubble sort. Quicksort partitions then recurses."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "sorting",
      "divide-conquer",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-009",
    "category": "playground",
    "level": "intermediate",
    "topic": "Odd First Even Last",
    "question": "From {26,27,28,29,30,31,32,33} print odds first (order preserved), then evens.",
    "answer": "Partition into two lists while scanning once, then concatenate. **O(n)** time. Do not sort — that would scramble the original odd/even relative order unless you use a stable partition.",
    "expected": "[27, 29, 31, 33, 26, 28, 30, 32]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String[] arr = {\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\"};\n        // write your code; print the final array with Arrays.toString\n        System.out.println(Arrays.toString(arr));\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = arrayOf(\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\")\n    // write your code; print the final list\n    println(arr.contentToString())\n\n}\n",
      "dart": "void main() {\n  var arr = [\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\"];\n  // write your code; print the final list\n  print(arr);\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String[] arr = {\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\"};\n        List<String> odds = new ArrayList<>();\n        List<String> evens = new ArrayList<>();\n        for (String s : arr) {\n            if (Integer.parseInt(s) % 2 == 0) evens.add(s);\n            else odds.add(s);\n        }\n        List<String> out = new ArrayList<>(odds);\n        out.addAll(evens);\n        System.out.println(out);\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = arrayOf(\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\")\n    val odds = arr.filter { it.toInt() % 2 != 0 }\n    val evens = arr.filter { it.toInt() % 2 == 0 }\n    println((odds + evens))\n\n}\n",
      "dart": "void main() {\n  var arr = [\"26\", \"27\", \"28\", \"29\", \"30\", \"31\", \"32\", \"33\"];\n  var odds = arr.where((s) => int.parse(s) % 2 != 0).toList();\n  var evens = arr.where((s) => int.parse(s) % 2 == 0).toList();\n  print([...odds, ...evens]);\n\n}\n"
    },
    "quality": [
      {
        "pattern": "Arrays\\.sort|sortedBy|sort\\(",
        "message": "Sorting is unnecessary and can change relative order. Two-list partition is O(n) and stable."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "partition",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-010",
    "category": "playground",
    "level": "advanced",
    "topic": "Longest unique substring",
    "question": "Print the length of the longest substring without repeating characters for abcabcbb, bbbbb, and pwwkew.",
    "answer": "Sliding window + last-seen index map. Move `i` to `last[c]+1` when `c` repeats inside the window. **O(n)** time. The notes used a HashMap of last indices — that is the expected interview solution, not O(n²) nested loops.",
    "expected": "3\n1\n3",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(longest(\"abcabcbb\"));\n        System.out.println(longest(\"bbbbb\"));\n        System.out.println(longest(\"pwwkew\"));\n    }\n    static int longest(String str) {\n        // write your code\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(longest(\"abcabcbb\"))\n    println(longest(\"bbbbb\"))\n    println(longest(\"pwwkew\"))\n}\n\nfun longest(str: String): Int {\n    // write your code\n    return 0\n\n}\n",
      "dart": "void main() {\n  print(longest(\"abcabcbb\"));\n  print(longest(\"bbbbb\"));\n  print(longest(\"pwwkew\"));\n}\n\nint longest(String str) {\n  // write your code\n  return 0;\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(longest(\"abcabcbb\"));\n        System.out.println(longest(\"bbbbb\"));\n        System.out.println(longest(\"pwwkew\"));\n    }\n    static int longest(String str) {\n        Map<Character, Integer> last = new HashMap<>();\n        int i = 0, res = 0;\n        for (int j = 0; j < str.length(); j++) {\n            char c = str.charAt(j);\n            if (last.containsKey(c)) i = Math.max(i, last.get(c) + 1);\n            res = Math.max(res, j - i + 1);\n            last.put(c, j);\n        }\n        return res;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(longest(\"abcabcbb\"))\n    println(longest(\"bbbbb\"))\n    println(longest(\"pwwkew\"))\n}\n\nfun longest(str: String): Int {\n    val last = HashMap<Char, Int>()\n    var i = 0\n    var res = 0\n    for (j in str.indices) {\n        val c = str[j]\n        if (c in last) i = maxOf(i, last[c]!! + 1)\n        res = maxOf(res, j - i + 1)\n        last[c] = j\n    }\n    return res\n\n}\n",
      "dart": "void main() {\n  print(longest(\"abcabcbb\"));\n  print(longest(\"bbbbb\"));\n  print(longest(\"pwwkew\"));\n}\n\nint longest(String str) {\n  var last = <String, int>{};\n  var i = 0;\n  var res = 0;\n  for (var j = 0; j < str.length; j++) {\n    var c = str[j];\n    if (last.containsKey(c)) i = i > last[c]! + 1 ? i : last[c]! + 1;\n    var len = j - i + 1;\n    if (len > res) res = len;\n    last[c] = j;\n  }\n  return res;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[^{]*\\{[^}]*for \\(",
        "message": "Nested loops are O(n²). The expected solution is a sliding window with a last-index map."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "string",
      "sliding-window",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-011",
    "category": "playground",
    "level": "intermediate",
    "topic": "Missing Elements",
    "question": "From {2, 4, 3, 6, 5, 10, 12, 8} print every missing integer from 1 through the max, one per line.",
    "answer": "After you know min/max, a **HashSet** of present values makes each lookup O(1). Nested `anyMatch` / `contains` on the raw array is O(n²). The notes also showed a sort-and-walk approach.",
    "expected": "1\n7\n9\n11",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 3, 6, 5, 10, 12, 8};\n        // print missing numbers from 1 to max, one per line\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 3, 6, 5, 10, 12, 8)\n    // print missing numbers from 1 to max, one per line\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 3, 6, 5, 10, 12, 8];\n  // print missing numbers from 1 to max, one per line\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 3, 6, 5, 10, 12, 8};\n        Set<Integer> have = new HashSet<>();\n        int max = 0;\n        for (int v : arr) { have.add(v); if (v > max) max = v; }\n        for (int i = 1; i <= max; i++) if (!have.contains(i)) System.out.println(i);\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(2, 4, 3, 6, 5, 10, 12, 8)\n    val have = arr.toSet()\n    val max = arr.maxOrNull()!!\n    for (i in 1..max) if (i !in have) println(i)\n\n}\n",
      "dart": "void main() {\n  var arr = [2, 4, 3, 6, 5, 10, 12, 8];\n  var have = arr.toSet();\n  var max = arr.reduce((a, b) => a > b ? a : b);\n  for (var i = 1; i <= max; i++) {\n    if (!have.contains(i)) print(i);\n  }\n\n}\n"
    },
    "quality": [
      {
        "pattern": "anyMatch|arr\\.contains\\(i\\)|indexOf\\(i\\)",
        "message": "Scanning the array for every candidate is O(n²). Put values in a HashSet first."
      },
      {
        "pattern": "stream\\(arr\\)\\.anyMatch",
        "message": "The PDF alternate used stream anyMatch inside a loop — correct but slow. Prefer a Set."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "set",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-012",
    "category": "playground",
    "level": "intermediate",
    "topic": "Max-min sequence",
    "question": "From {10,20,...,110} print max, min, next-max, next-min, ... (110, 10, 100, 20, ...).",
    "answer": "Sort, then two pointers at the ends. Alternate take from right then left. **O(n log n)** for the sort. Watch the odd-length middle element so you do not index twice.",
    "expected": "[110, 10, 100, 20, 90, 30, 80, 40, 70, 50, 60]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Integer[] arr = {10,20,30,40,50,60,70,80,90,100,110};\n        // rearrange and print Arrays.toString\n        System.out.println(Arrays.toString(arr));\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = arrayOf(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110)\n    // rearrange and print\n    println(arr.contentToString())\n\n}\n",
      "dart": "void main() {\n  var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];\n  // rearrange and print\n  print(arr);\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {10,20,30,40,50,60,70,80,90,100,110};\n        Arrays.sort(arr);\n        int[] out = new int[arr.length];\n        int l = 0, r = arr.length - 1, k = 0;\n        while (l <= r) {\n            out[k++] = arr[r--];\n            if (l <= r) out[k++] = arr[l++];\n        }\n        System.out.println(Arrays.toString(out));\n    }\n}\n",
      "kotlin": "fun main() {\n    val arr = intArrayOf(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110)\n    arr.sort()\n    val out = IntArray(arr.size)\n    var l = 0\n    var r = arr.lastIndex\n    var k = 0\n    while (l <= r) {\n        out[k++] = arr[r--]\n        if (l <= r) out[k++] = arr[l++]\n    }\n    println(out.contentToString())\n\n}\n",
      "dart": "void main() {\n  var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];\n  arr.sort();\n  var out = <int>[];\n  var l = 0;\n  var r = arr.length - 1;\n  while (l <= r) {\n    out.add(arr[r--]);\n    if (l <= r) out.add(arr[l++]);\n  }\n  print(out);\n\n}\n"
    },
    "quality": [
      {
        "pattern": "catch \\(e",
        "message": "The PDF used try/catch to hide index errors. Two pointers with `l <= r` is the clean version."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "two-pointers",
      "pdf"
    ],
    "pdfTopic": true
  },
  {
    "id": "pg-013",
    "category": "playground",
    "level": "basic",
    "topic": "Reverse string",
    "question": "Print the reverse of 'android' and of 'Flutter'.",
    "answer": "Two pointers swapping characters, or iterate from the end into a StringBuilder. **O(n)**.",
    "expected": "diordna\nrettulF",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(rev(\"android\"));\n        System.out.println(rev(\"Flutter\"));\n    }\n    static String rev(String s) {\n        return s;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(rev(\"android\"))\n    println(rev(\"Flutter\"))\n}\nfun rev(s: String): String {\n    return s\n\n}\n",
      "dart": "void main() {\n  print(rev(\"android\"));\n  print(rev(\"Flutter\"));\n}\n\nString rev(String s) {\n  return s;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(rev(\"android\"));\n        System.out.println(rev(\"Flutter\"));\n    }\n    static String rev(String s) {\n        char[] a = s.toCharArray();\n        int i = 0, j = a.length - 1;\n        while (i < j) { char t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }\n        return new String(a);\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(rev(\"android\"))\n    println(rev(\"Flutter\"))\n}\nfun rev(s: String): String {\n    val a = s.toCharArray()\n    var i = 0\n    var j = a.lastIndex\n    while (i < j) {\n        val t = a[i]; a[i] = a[j]; a[j] = t\n        i++; j--\n    }\n    return String(a)\n\n}\n",
      "dart": "void main() {\n  print(rev(\"android\"));\n  print(rev(\"Flutter\"));\n}\n\nString rev(String s) {\n  var a = s.split('');\n  var i = 0;\n  var j = a.length - 1;\n  while (i < j) {\n    var t = a[i];\n    a[i] = a[j];\n    a[j] = t;\n    i++;\n    j--;\n  }\n  return a.join();\n\n}\n"
    },
    "quality": [
      {
        "pattern": "\\+ s\\.charAt\\(i\\)",
        "message": "Concatenating in a reverse loop is O(n²) on Java strings. Use a char array or StringBuilder."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "string"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-014",
    "category": "playground",
    "level": "basic",
    "topic": "Fibonacci",
    "question": "Print the first 8 Fibonacci numbers (starting 0, 1) as a space-separated line.",
    "answer": "Iterative pair `(a,b) = (b, a+b)`. Recursive without memo is exponential — interviewers will ask you to fix that.",
    "expected": "0 1 1 2 3 5 8 13",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        // print first 8 fibonacci numbers separated by spaces\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    // print first 8 fibonacci numbers separated by spaces\n\n}\n",
      "dart": "void main() {\n  // print first 8 fibonacci numbers separated by spaces\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int n = 8, a = 0, b = 1;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(a);\n            int c = a + b; a = b; b = c;\n        }\n        System.out.println(sb);\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    var a = 0\n    var b = 1\n    val out = mutableListOf<Int>()\n    repeat(8) {\n        out += a\n        val c = a + b\n        a = b\n        b = c\n    }\n    println(out.joinToString(\" \"))\n\n}\n",
      "dart": "void main() {\n  var a = 0, b = 1;\n  var out = <int>[];\n  for (var i = 0; i < 8; i++) {\n    out.add(a);\n    var c = a + b;\n    a = b;\n    b = c;\n  }\n  print(out.join(\" \"));\n\n}\n"
    },
    "quality": [
      {
        "pattern": "fib\\(n - 1\\)|fib\\(n-1\\)",
        "message": "Naive recursion is O(φⁿ). The expected production answer is a loop (or memoized DP)."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "dp",
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-015",
    "category": "playground",
    "level": "basic",
    "topic": "FizzBuzz",
    "question": "Print FizzBuzz for 1..15 (Fizz on 3, Buzz on 5, FizzBuzz on 15), one token per line.",
    "answer": "Check 15 first, then 3, then 5. A classic warmup; they want clean control flow, not cleverness.",
    "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        // FizzBuzz 1..15, one per line\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    // FizzBuzz 1..15, one per line\n\n}\n",
      "dart": "void main() {\n  // FizzBuzz 1..15, one per line\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) System.out.println(\"FizzBuzz\");\n            else if (i % 3 == 0) System.out.println(\"Fizz\");\n            else if (i % 5 == 0) System.out.println(\"Buzz\");\n            else System.out.println(i);\n        }\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    for (i in 1..15) {\n        println(when {\n            i % 15 == 0 -> \"FizzBuzz\"\n            i % 3 == 0 -> \"Fizz\"\n            i % 5 == 0 -> \"Buzz\"\n            else -> i\n        })\n    }\n\n}\n",
      "dart": "void main() {\n  for (var i = 1; i <= 15; i++) {\n    if (i % 15 == 0) print(\"FizzBuzz\");\n    else if (i % 3 == 0) print(\"Fizz\");\n    else if (i % 5 == 0) print(\"Buzz\");\n    else print(i);\n  }\n\n}\n"
    },
    "quality": [
      {
        "pattern": "i % 3 == 0 && i % 5 == 0",
        "message": "Fine. Checking %15 (or 3&&5) before the single checks is the usual order so 15 is not printed as Fizz only."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "control-flow"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-016",
    "category": "playground",
    "level": "intermediate",
    "topic": "Anagram",
    "question": "Print whether each pair is an anagram: (listen, silent) and (apple, papel) and (rat, car).",
    "answer": "Sort both strings or count characters in an int[26]/HashMap. Ignore case. **O(n)** with counts is preferred over sort's O(n log n).",
    "expected": "true\ntrue\nfalse",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(an(\"listen\",\"silent\"));\n        System.out.println(an(\"apple\",\"papel\"));\n        System.out.println(an(\"rat\",\"car\"));\n    }\n    static boolean an(String a, String b) {\n        return false;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(an(\"listen\",\"silent\"))\n    println(an(\"apple\",\"papel\"))\n    println(an(\"rat\",\"car\"))\n}\nfun an(a: String, b: String): Boolean {\n    return false\n\n}\n",
      "dart": "void main() {\n  print(an(\"listen\",\"silent\"));\n  print(an(\"apple\",\"papel\"));\n  print(an(\"rat\",\"car\"));\n}\n\nbool an(String a, String b) {\n  return false;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(an(\"listen\",\"silent\"));\n        System.out.println(an(\"apple\",\"papel\"));\n        System.out.println(an(\"rat\",\"car\"));\n    }\n    static boolean an(String a, String b) {\n        if (a.length() != b.length()) return false;\n        int[] c = new int[26];\n        for (int i = 0; i < a.length(); i++) {\n            c[Character.toLowerCase(a.charAt(i)) - 'a']++;\n            c[Character.toLowerCase(b.charAt(i)) - 'a']--;\n        }\n        for (int n : c) if (n != 0) return false;\n        return true;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(an(\"listen\",\"silent\"))\n    println(an(\"apple\",\"papel\"))\n    println(an(\"rat\",\"car\"))\n}\nfun an(a: String, b: String): Boolean {\n    if (a.length != b.length) return false\n    val c = IntArray(26)\n    for (i in a.indices) {\n        c[a[i].lowercaseChar() - 'a']++\n        c[b[i].lowercaseChar() - 'a']--\n    }\n    return c.all { it == 0 }\n\n}\n",
      "dart": "void main() {\n  print(an(\"listen\", \"silent\"));\n  print(an(\"apple\", \"papel\"));\n  print(an(\"rat\", \"car\"));\n}\n\nbool an(String a, String b) {\n  if (a.length != b.length) return false;\n  var c = List.filled(26, 0);\n  for (var i = 0; i < a.length; i++) {\n    c[a[i].toLowerCase().codeUnitAt(0) - 97]++;\n    c[b[i].toLowerCase().codeUnitAt(0) - 97]--;\n  }\n  return c.every((n) => n == 0);\n\n}\n"
    },
    "quality": [
      {
        "pattern": "toCharArray\\(\\)[\\s\\S]*sort\\(",
        "message": "Sorting works (O(n log n)). A 26-slot count is O(n) and what most interviewers want next."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "string",
      "hashing"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-017",
    "category": "playground",
    "level": "intermediate",
    "topic": "Two Sum",
    "question": "In {2, 7, 11, 15} find two indices that add to 9. Print them as [i, j] with i < j.",
    "answer": "One-pass HashMap from value → index. For each x, look up `target - x`. **O(n)** time vs O(n²) nested loops.",
    "expected": "[0, 1]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));\n    }\n    static int[] twoSum(int[] nums, int target) { return new int[]{-1,-1}; }\n}\n",
      "kotlin": "fun main() {\n    println(twoSum(intArrayOf(2,7,11,15), 9).contentToString())\n}\nfun twoSum(nums: IntArray, target: Int): IntArray {\n    return intArrayOf(-1, -1)\n\n}\n",
      "dart": "void main() {\n  print(twoSum([2, 7, 11, 15], 9));\n}\n\nList<int> twoSum(List<int> nums, int target) {\n  return [-1, -1];\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));\n    }\n    static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            Integer j = seen.get(target - nums[i]);\n            if (j != null) return new int[]{j, i};\n            seen.put(nums[i], i);\n        }\n        return new int[]{-1, -1};\n    }\n}\n",
      "kotlin": "fun main() {\n    println(twoSum(intArrayOf(2,7,11,15), 9).contentToString())\n}\nfun twoSum(nums: IntArray, target: Int): IntArray {\n    val seen = HashMap<Int, Int>()\n    for (i in nums.indices) {\n        val j = seen[target - nums[i]]\n        if (j != null) return intArrayOf(j, i)\n        seen[nums[i]] = i\n    }\n    return intArrayOf(-1, -1)\n\n}\n",
      "dart": "void main() {\n  print(twoSum([2, 7, 11, 15], 9));\n}\n\nList<int> twoSum(List<int> nums, int target) {\n  var seen = <int, int>{};\n  for (var i = 0; i < nums.length; i++) {\n    var j = seen[target - nums[i]];\n    if (j != null) return [j, i];\n    seen[nums[i]] = i;\n  }\n  return [-1, -1];\n\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[^{]*\\{[^}]*for \\(",
        "message": "Nested loops are O(n²). The expected follow-up is a HashMap in one pass."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "hashing",
      "arrays"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-018",
    "category": "playground",
    "level": "intermediate",
    "topic": "Valid parentheses",
    "question": "Print whether each string is valid parentheses: ()[]{}, (], and ([]) .",
    "answer": "Stack: push opening, pop when a matching closer arrives. Empty stack at the end. **O(n)**.",
    "expected": "true\nfalse\ntrue",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(ok(\"()[]{}\"));\n        System.out.println(ok(\"(]\"));\n        System.out.println(ok(\"([])\"));\n    }\n    static boolean ok(String s) {\n        return false;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(ok(\"()[]{}\"))\n    println(ok(\"(]\"))\n    println(ok(\"([])\"))\n}\nfun ok(s: String): Boolean {\n    return false\n\n}\n",
      "dart": "void main() {\n  print(ok(\"()[]{}\"));\n  print(ok(\"(]\"));\n  print(ok(\"([])\"));\n}\n\nbool ok(String s) {\n  return false;\n\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(ok(\"()[]{}\"));\n        System.out.println(ok(\"(]\"));\n        System.out.println(ok(\"([])\"));\n    }\n    static boolean ok(String s) {\n        Deque<Character> st = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '[' || c == '{') st.push(c);\n            else {\n                if (st.isEmpty()) return false;\n                char o = st.pop();\n                if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;\n            }\n        }\n        return st.isEmpty();\n    }\n}\n",
      "kotlin": "fun main() {\n    println(ok(\"()[]{}\"))\n    println(ok(\"(]\"))\n    println(ok(\"([])\"))\n}\nfun ok(s: String): Boolean {\n    val st = ArrayDeque<Char>()\n    val pair = mapOf(')' to '(', ']' to '[', '}' to '{')\n    for (c in s) {\n        if (c in \"([{\") st.addLast(c)\n        else {\n            if (st.isEmpty() || st.removeLast() != pair[c]) return false\n        }\n    }\n    return st.isEmpty()\n\n}\n",
      "dart": "void main() {\n  print(ok(\"()[]{}\"));\n  print(ok(\"(]\"));\n  print(ok(\"([])\"));\n}\n\nbool ok(String s) {\n  var st = <String>[];\n  var pair = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"};\n  for (var i = 0; i < s.length; i++) {\n    var c = s[i];\n    if (\"([{\".contains(c)) {\n      st.add(c);\n    } else {\n      if (st.isEmpty || st.removeLast() != pair[c]) return false;\n    }\n  }\n  return st.isEmpty;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "replaceAll|replace\\(",
        "message": "Repeatedly stripping '()' works for tiny strings but is the wrong interview data structure. Use a stack."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "stack",
      "string"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-019",
    "category": "playground",
    "level": "intermediate",
    "topic": "Move zeros",
    "question": "Move zeros in {0,1,0,3,12} to the end, keeping other order. Print the array.",
    "answer": "Write pointer for next non-zero; fill the rest with zero. **O(n)** in-place. Do not sort — that would reorder the non-zeros.",
    "expected": "[1, 3, 12, 0, 0]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {0,1,0,3,12};\n        move(a);\n        System.out.println(java.util.Arrays.toString(a));\n    }\n    static void move(int[] a) {\n        // write your code\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(0,1,0,3,12)\n    move(a)\n    println(a.contentToString())\n}\nfun move(a: IntArray) {\n    // write your code\n\n}\n",
      "dart": "void main() {\n  var a = [0, 1, 0, 3, 12];\n  move(a);\n  print(a);\n}\n\nvoid move(List<int> a) {\n  // write your code\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {0,1,0,3,12};\n        move(a);\n        System.out.println(java.util.Arrays.toString(a));\n    }\n    static void move(int[] a) {\n        int w = 0;\n        for (int i = 0; i < a.length; i++) if (a[i] != 0) a[w++] = a[i];\n        while (w < a.length) a[w++] = 0;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(0,1,0,3,12)\n    move(a)\n    println(a.contentToString())\n}\nfun move(a: IntArray) {\n    var w = 0\n    for (v in a) if (v != 0) a[w++] = v\n    while (w < a.size) a[w++] = 0\n\n}\n",
      "dart": "void main() {\n  var a = [0, 1, 0, 3, 12];\n  move(a);\n  print(a);\n}\n\nvoid move(List<int> a) {\n  var w = 0;\n  for (var i = 0; i < a.length; i++) {\n    if (a[i] != 0) a[w++] = a[i];\n  }\n  while (w < a.length) a[w++] = 0;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "sort\\(",
        "message": "Sorting would group zeros but also reorder 1,3,12 if they were unsorted. Use a write pointer."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "two-pointers"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-020",
    "category": "playground",
    "level": "advanced",
    "topic": "Kadane",
    "question": "Print the maximum subarray sum of {-2,1,-3,4,-1,2,1,-5,4}.",
    "answer": "Kadane: `best = max(x, best+x)` rolling. **O(n)**. Nested sums are O(n²)/O(n³) and will be flagged.",
    "expected": "6",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(kadane(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n    }\n    static int kadane(int[] a) {\n        return 0;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(kadane(intArrayOf(-2,1,-3,4,-1,2,1,-5,4)))\n}\nfun kadane(a: IntArray): Int {\n    return 0\n\n}\n",
      "dart": "void main() {\n  print(kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]));\n}\n\nint kadane(List<int> a) {\n  return 0;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(kadane(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n    }\n    static int kadane(int[] a) {\n        int best = a[0], cur = a[0];\n        for (int i = 1; i < a.length; i++) {\n            cur = Math.max(a[i], cur + a[i]);\n            best = Math.max(best, cur);\n        }\n        return best;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(kadane(intArrayOf(-2,1,-3,4,-1,2,1,-5,4)))\n}\nfun kadane(a: IntArray): Int {\n    var best = a[0]\n    var cur = a[0]\n    for (i in 1 until a.size) {\n        cur = maxOf(a[i], cur + a[i])\n        best = maxOf(best, cur)\n    }\n    return best\n\n}\n",
      "dart": "void main() {\n  print(kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]));\n}\n\nint kadane(List<int> a) {\n  var best = a[0];\n  var cur = a[0];\n  for (var i = 1; i < a.length; i++) {\n    cur = a[i] > cur + a[i] ? a[i] : cur + a[i];\n    if (cur > best) best = cur;\n  }\n  return best;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(",
        "message": "Nested range sums are O(n²). Kadane is a single pass."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "dp"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-021",
    "category": "playground",
    "level": "basic",
    "topic": "Factorial",
    "question": "Print 5! and 0! (both as integers).",
    "answer": "Iterative product 1..n. 0! is 1 by definition. Watch overflow past 20! in 64-bit — mention BigInteger in interviews.",
    "expected": "120\n1",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(fact(5));\n        System.out.println(fact(0));\n    }\n    static long fact(int n) {\n        return 0;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(fact(5))\n    println(fact(0))\n}\nfun fact(n: Int): Long {\n    return 0\n\n}\n",
      "dart": "void main() {\n  print(fact(5));\n  print(fact(0));\n}\n\nint fact(int n) {\n  return 0;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(fact(5));\n        System.out.println(fact(0));\n    }\n    static long fact(int n) {\n        long r = 1;\n        for (int i = 2; i <= n; i++) r *= i;\n        return r;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(fact(5))\n    println(fact(0))\n}\nfun fact(n: Int): Long {\n    var r = 1L\n    for (i in 2..n) r *= i\n    return r\n\n}\n",
      "dart": "void main() {\n  print(fact(5));\n  print(fact(0));\n}\nint fact(int n) {\n  var r = 1;\n  for (var i = 2; i <= n; i++) r *= i;\n  return r;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "fact\\(n - 1\\)",
        "message": "Recursion is correct but uses O(n) stack. A loop is enough for this problem."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-022",
    "category": "playground",
    "level": "intermediate",
    "topic": "First unique character",
    "question": "Print the index of the first non-repeating character in 'leetcode' and in 'aabb' (-1 if none).",
    "answer": "Count frequencies, then a second pass for the first count==1. **O(n)**.",
    "expected": "0\n-1",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(first(\"leetcode\"));\n        System.out.println(first(\"aabb\"));\n    }\n    static int first(String s) {\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(first(\"leetcode\"))\n    println(first(\"aabb\"))\n}\nfun first(s: String): Int {\n    return -1\n\n}\n",
      "dart": "void main() {\n  print(first(\"leetcode\"));\n  print(first(\"aabb\"));\n}\n\nint first(String s) {\n  return -1;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(first(\"leetcode\"));\n        System.out.println(first(\"aabb\"));\n    }\n    static int first(String s) {\n        int[] c = new int[26];\n        for (int i = 0; i < s.length(); i++) c[s.charAt(i) - 'a']++;\n        for (int i = 0; i < s.length(); i++) if (c[s.charAt(i) - 'a'] == 1) return i;\n        return -1;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(first(\"leetcode\"))\n    println(first(\"aabb\"))\n}\nfun first(s: String): Int {\n    val c = IntArray(26)\n    for (ch in s) c[ch - 'a']++\n    for (i in s.indices) if (c[s[i] - 'a'] == 1) return i\n    return -1\n\n}\n",
      "dart": "void main() {\n  print(first(\"leetcode\"));\n  print(first(\"aabb\"));\n}\nint first(String s) {\n  var c = List.filled(26, 0);\n  for (var i = 0; i < s.length; i++) {\n    c[s.codeUnitAt(i) - 97]++;\n  }\n  for (var i = 0; i < s.length; i++) {\n    if (c[s.codeUnitAt(i) - 97] == 1) return i;\n  }\n  return -1;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "indexOf[\\s\\S]*lastIndexOf",
        "message": "indexOf==lastIndexOf works but is O(n²). Two counting passes are O(n)."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "string",
      "hashing"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-023",
    "category": "playground",
    "level": "basic",
    "topic": "Max in array",
    "question": "Print the maximum of {3, 9, 1, 4, 7}.",
    "answer": "One pass keep `best`. Do not sort just to read the last element — that is O(n log n) for an O(n) job.",
    "expected": "9",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(max(new int[]{3,9,1,4,7}));\n    }\n    static int max(int[] a) {\n        return 0;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(max(intArrayOf(3,9,1,4,7)))\n}\nfun max(a: IntArray): Int {\n    return 0\n\n}\n",
      "dart": "void main() {\n  print(maxOf([3, 9, 1, 4, 7]));\n}\n\nint maxOf(List<int> a) {\n  return 0;\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(max(new int[]{3,9,1,4,7}));\n    }\n    static int max(int[] a) {\n        int m = a[0];\n        for (int v : a) if (v > m) m = v;\n        return m;\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    println(max(intArrayOf(3,9,1,4,7)))\n}\nfun max(a: IntArray): Int {\n    var m = a[0]\n    for (v in a) if (v > m) m = v\n    return m\n\n}\n",
      "dart": "void main() {\n  print(maxOf([3, 9, 1, 4, 7]));\n}\n\nint maxOf(List<int> a) {\n  var m = a[0];\n  for (var v in a) {\n    if (v > m) m = v;\n  }\n  return m;\n\n}\n"
    },
    "quality": [
      {
        "pattern": "sort\\(",
        "message": "Sorting to find max is O(n log n). A linear scan is enough."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-024",
    "category": "playground",
    "level": "intermediate",
    "topic": "Rotate array",
    "question": "Rotate {1,2,3,4,5,6,7} right by 3. Print the array.",
    "answer": "Reverse the whole array, reverse first k, reverse the rest. **O(n)** extra O(1). k %= n.",
    "expected": "[5, 6, 7, 1, 2, 3, 4]",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1,2,3,4,5,6,7};\n        rotate(a, 3);\n        System.out.println(java.util.Arrays.toString(a));\n    }\n    static void rotate(int[] a, int k) {\n        // write your code\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(1,2,3,4,5,6,7)\n    rotate(a, 3)\n    println(a.contentToString())\n}\nfun rotate(a: IntArray, k: Int) {\n    // write your code\n\n}\n",
      "dart": "void main() {\n  var a = [1, 2, 3, 4, 5, 6, 7];\n  rotate(a, 3);\n  print(a);\n}\n\nvoid rotate(List<int> a, int k) {\n  // write your code\n\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1,2,3,4,5,6,7};\n        rotate(a, 3);\n        System.out.println(java.util.Arrays.toString(a));\n    }\n    static void rotate(int[] a, int k) {\n        k %= a.length;\n        rev(a, 0, a.length - 1);\n        rev(a, 0, k - 1);\n        rev(a, k, a.length - 1);\n    }\n    static void rev(int[] a, int i, int j) {\n        while (i < j) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }\n    \n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(1,2,3,4,5,6,7)\n    rotate(a, 3)\n    println(a.contentToString())\n}\nfun rotate(a: IntArray, k0: Int) {\n    val k = k0 % a.size\n    fun rev(i0: Int, j0: Int) {\n        var i = i0; var j = j0\n        while (i < j) { val t = a[i]; a[i] = a[j]; a[j] = t; i++; j-- }\n    }\n    rev(0, a.lastIndex)\n    rev(0, k - 1)\n    rev(k, a.lastIndex)\n\n}\n",
      "dart": "void main() {\n  var a = [1, 2, 3, 4, 5, 6, 7];\n  rotate(a, 3);\n  print(a);\n}\n\nvoid rotate(List<int> a, int k0) {\n  var k = k0 % a.length;\n  void rev(int i, int j) {\n    while (i < j) {\n      var t = a[i];\n      a[i] = a[j];\n      a[j] = t;\n      i++;\n      j--;\n    }\n  }\n  rev(0, a.length - 1);\n  rev(0, k - 1);\n  rev(k, a.length - 1);\n\n}\n"
    },
    "quality": [
      {
        "pattern": "new int\\[|IntArray\\(|List\\.filled",
        "message": "An extra array is acceptable O(n) space. The classic in-place trick is three reverses."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-025",
    "category": "playground",
    "level": "intermediate",
    "topic": "Contains duplicate",
    "question": "Print whether {1,2,3,1} and {1,2,3,4} contain a duplicate.",
    "answer": "Put values in a HashSet while scanning. If `add` returns false, a duplicate exists. **O(n)** time, **O(n)** space. Sorting then adjacent compare is O(n log n) extra O(1).",
    "expected": "true\nfalse",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(dup(new int[]{1,2,3,1}));\n        System.out.println(dup(new int[]{1,2,3,4}));\n    }\n    static boolean dup(int[] a) {\n        return false;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(dup(intArrayOf(1,2,3,1)))\n    println(dup(intArrayOf(1,2,3,4)))\n}\nfun dup(a: IntArray): Boolean {\n    return false\n}\n",
      "dart": "void main() {\n  print(dup([1, 2, 3, 1]));\n  print(dup([1, 2, 3, 4]));\n}\nbool dup(List<int> a) {\n  return false;\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(dup(new int[]{1,2,3,1}));\n        System.out.println(dup(new int[]{1,2,3,4}));\n    }\n    static boolean dup(int[] a) {\n        Set<Integer> seen = new HashSet<>();\n        for (int v : a) if (!seen.add(v)) return true;\n        return false;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(dup(intArrayOf(1,2,3,1)))\n    println(dup(intArrayOf(1,2,3,4)))\n}\nfun dup(a: IntArray): Boolean {\n    val seen = HashSet<Int>()\n    for (v in a) if (!seen.add(v)) return true\n    return false\n}\n",
      "dart": "void main() {\n  print(dup([1, 2, 3, 1]));\n  print(dup([1, 2, 3, 4]));\n}\nbool dup(List<int> a) {\n  var seen = <int>{};\n  for (var v in a) {\n    if (!seen.add(v)) return true;\n  }\n  return false;\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[\\s\\S]{0,60}for \\(",
        "message": "Nested comparisons are O(n²). A HashSet is the usual O(n) interview answer."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "hashing",
      "arrays"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-026",
    "category": "playground",
    "level": "intermediate",
    "topic": "Best time to buy stock",
    "question": "One buy and one sell. Print max profit for {7,1,5,3,6,4} and for {7,6,4,3,1} (0 if none).",
    "answer": "Track the lowest price so far and the best `price - low`. **O(n)**. Nested buy/sell loops are O(n²).",
    "expected": "5\n0",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(profit(new int[]{7,1,5,3,6,4}));\n        System.out.println(profit(new int[]{7,6,4,3,1}));\n    }\n    static int profit(int[] p) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(profit(intArrayOf(7,1,5,3,6,4)))\n    println(profit(intArrayOf(7,6,4,3,1)))\n}\nfun profit(p: IntArray): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(profit([7, 1, 5, 3, 6, 4]));\n  print(profit([7, 6, 4, 3, 1]));\n}\nint profit(List<int> p) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(profit(new int[]{7,1,5,3,6,4}));\n        System.out.println(profit(new int[]{7,6,4,3,1}));\n    }\n    static int profit(int[] p) {\n        int low = p[0], best = 0;\n        for (int x : p) {\n            if (x < low) low = x;\n            int g = x - low;\n            if (g > best) best = g;\n        }\n        return best;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(profit(intArrayOf(7,1,5,3,6,4)))\n    println(profit(intArrayOf(7,6,4,3,1)))\n}\nfun profit(p: IntArray): Int {\n    var low = p[0]\n    var best = 0\n    for (x in p) {\n        if (x < low) low = x\n        best = maxOf(best, x - low)\n    }\n    return best\n}\n",
      "dart": "void main() {\n  print(profit([7, 1, 5, 3, 6, 4]));\n  print(profit([7, 6, 4, 3, 1]));\n}\nint profit(List<int> p) {\n  var low = p[0];\n  var best = 0;\n  for (var x in p) {\n    if (x < low) low = x;\n    var g = x - low;\n    if (g > best) best = g;\n  }\n  return best;\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(",
        "message": "Trying every buy/sell pair is O(n²). Track min-so-far in one pass."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "greedy"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-027",
    "category": "playground",
    "level": "intermediate",
    "topic": "Climbing stairs",
    "question": "You can take 1 or 2 steps. Print the number of ways to climb 2 stairs and 5 stairs.",
    "answer": "Classic DP: `ways(n) = ways(n-1) + ways(n-2)` with ways(1)=1, ways(2)=2. Same recurrence as Fibonacci. **O(n)** with two rolling variables; naive recursion is exponential.",
    "expected": "2\n8",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(ways(2));\n        System.out.println(ways(5));\n    }\n    static int ways(int n) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(ways(2))\n    println(ways(5))\n}\nfun ways(n: Int): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(ways(2));\n  print(ways(5));\n}\nint ways(int n) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(ways(2));\n        System.out.println(ways(5));\n    }\n    static int ways(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(ways(2))\n    println(ways(5))\n}\nfun ways(n: Int): Int {\n    if (n <= 2) return n\n    var a = 1\n    var b = 2\n    for (i in 3..n) {\n        val c = a + b\n        a = b\n        b = c\n    }\n    return b\n}\n",
      "dart": "void main() {\n  print(ways(2));\n  print(ways(5));\n}\nint ways(int n) {\n  if (n <= 2) return n;\n  var a = 1, b = 2;\n  for (var i = 3; i <= n; i++) {\n    var c = a + b;\n    a = b;\n    b = c;\n  }\n  return b;\n}\n"
    },
    "quality": [
      {
        "pattern": "ways\\(n - 1\\)\\s*\\+\\s*ways\\(n - 2\\)",
        "message": "Unmemoized recursion is exponential. Use a loop or memoize."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "dp"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-028",
    "category": "playground",
    "level": "basic",
    "topic": "GCD",
    "question": "Print gcd(48, 18) and gcd(7, 13).",
    "answer": "Euclidean algorithm: `gcd(a,b) = gcd(b, a % b)` until b is 0. **O(log min(a,b))**. Subtract-loop versions work but are slower.",
    "expected": "6\n1",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(gcd(48, 18));\n        System.out.println(gcd(7, 13));\n    }\n    static int gcd(int a, int b) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(gcd(48, 18))\n    println(gcd(7, 13))\n}\nfun gcd(a: Int, b: Int): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(gcd(48, 18));\n  print(gcd(7, 13));\n}\nint gcd(int a, int b) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(gcd(48, 18));\n        System.out.println(gcd(7, 13));\n    }\n    static int gcd(int a, int b) {\n        while (b != 0) {\n            int t = a % b;\n            a = b;\n            b = t;\n        }\n        return a;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(gcd(48, 18))\n    println(gcd(7, 13))\n}\nfun gcd(a0: Int, b0: Int): Int {\n    var a = a0\n    var b = b0\n    while (b != 0) {\n        val t = a % b\n        a = b\n        b = t\n    }\n    return a\n}\n",
      "dart": "void main() {\n  print(gcd(48, 18));\n  print(gcd(7, 13));\n}\nint gcd(int a, int b) {\n  while (b != 0) {\n    var t = a % b;\n    a = b;\n    b = t;\n  }\n  return a;\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\(int i = Math.min",
        "message": "Scanning down from min(a,b) is slower than Euclid's modulo loop."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-029",
    "category": "playground",
    "level": "basic",
    "topic": "Prime check",
    "question": "Print whether 2, 27, and 29 are prime (true/false per line).",
    "answer": "Trial division up to √n, skip evens after 2. **O(√n)**. Checking every integer to n-1 is the version they will ask you to improve.",
    "expected": "true\nfalse\ntrue",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(prime(2));\n        System.out.println(prime(27));\n        System.out.println(prime(29));\n    }\n    static boolean prime(int n) {\n        return false;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(prime(2))\n    println(prime(27))\n    println(prime(29))\n}\nfun prime(n: Int): Boolean {\n    return false\n}\n",
      "dart": "void main() {\n  print(prime(2));\n  print(prime(27));\n  print(prime(29));\n}\nbool prime(int n) {\n  return false;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(prime(2));\n        System.out.println(prime(27));\n        System.out.println(prime(29));\n    }\n    static boolean prime(int n) {\n        if (n < 2) return false;\n        if (n == 2) return true;\n        if (n % 2 == 0) return false;\n        for (int i = 3; i * i <= n; i += 2) if (n % i == 0) return false;\n        return true;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(prime(2))\n    println(prime(27))\n    println(prime(29))\n}\nfun prime(n: Int): Boolean {\n    if (n < 2) return false\n    if (n == 2) return true\n    if (n % 2 == 0) return false\n    var i = 3\n    while (i * i <= n) {\n        if (n % i == 0) return false\n        i += 2\n    }\n    return true\n}\n",
      "dart": "void main() {\n  print(prime(2));\n  print(prime(27));\n  print(prime(29));\n}\nbool prime(int n) {\n  if (n < 2) return false;\n  if (n == 2) return true;\n  if (n % 2 == 0) return false;\n  var i = 3;\n  while (i * i <= n) {\n    if (n % i == 0) return false;\n    i += 2;\n  }\n  return true;\n}\n"
    },
    "quality": [
      {
        "pattern": "i < n(;|\\)| )",
        "message": "Looping to n-1 is O(n). Stop at i*i <= n."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-030",
    "category": "playground",
    "level": "basic",
    "topic": "Second largest",
    "question": "Print the second-largest distinct value in {10, 5, 10, 8, 9}.",
    "answer": "One pass: keep `first` and `second`. Skip values equal to first so duplicates of the max don't count. **O(n)**. Sorting is the slower shortcut.",
    "expected": "9",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(second(new int[]{10,5,10,8,9}));\n    }\n    static int second(int[] a) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(second(intArrayOf(10,5,10,8,9)))\n}\nfun second(a: IntArray): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(second([10, 5, 10, 8, 9]));\n}\nint second(List<int> a) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(second(new int[]{10,5,10,8,9}));\n    }\n    static int second(int[] a) {\n        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;\n        for (int v : a) {\n            if (v > first) { second = first; first = v; }\n            else if (v > second && v != first) second = v;\n        }\n        return second;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(second(intArrayOf(10,5,10,8,9)))\n}\nfun second(a: IntArray): Int {\n    var first = Int.MIN_VALUE\n    var sec = Int.MIN_VALUE\n    for (v in a) {\n        when {\n            v > first -> { sec = first; first = v }\n            v > sec && v != first -> sec = v\n        }\n    }\n    return sec\n}\n",
      "dart": "void main() {\n  print(second([10, 5, 10, 8, 9]));\n}\nint second(List<int> a) {\n  var first = -0x3fffffff;\n  var sec = -0x3fffffff;\n  for (var v in a) {\n    if (v > first) {\n      sec = first;\n      first = v;\n    } else if (v > sec && v != first) {\n      sec = v;\n    }\n  }\n  return sec;\n}\n"
    },
    "quality": [
      {
        "pattern": "sort\\(",
        "message": "Sorting is O(n log n). Track the top two values in one pass."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-031",
    "category": "playground",
    "level": "intermediate",
    "topic": "Merge sorted arrays",
    "question": "Merge {1,3,5} and {2,4,6,7} into one sorted array and print it.",
    "answer": "Two pointers on already-sorted inputs. **O(n+m)**. Concatenate-and-sort is the weaker answer.",
    "expected": "[1, 2, 3, 4, 5, 6, 7]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(merge(new int[]{1,3,5}, new int[]{2,4,6,7})));\n    }\n    static int[] merge(int[] a, int[] b) {\n        return new int[0];\n    }\n}\n",
      "kotlin": "fun main() {\n    println(merge(intArrayOf(1,3,5), intArrayOf(2,4,6,7)).contentToString())\n}\nfun merge(a: IntArray, b: IntArray): IntArray {\n    return intArrayOf()\n}\n",
      "dart": "void main() {\n  print(merge([1, 3, 5], [2, 4, 6, 7]));\n}\nList<int> merge(List<int> a, List<int> b) {\n  return [];\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(merge(new int[]{1,3,5}, new int[]{2,4,6,7})));\n    }\n    static int[] merge(int[] a, int[] b) {\n        int[] out = new int[a.length + b.length];\n        int i = 0, j = 0, k = 0;\n        while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];\n        while (i < a.length) out[k++] = a[i++];\n        while (j < b.length) out[k++] = b[j++];\n        return out;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(merge(intArrayOf(1,3,5), intArrayOf(2,4,6,7)).contentToString())\n}\nfun merge(a: IntArray, b: IntArray): IntArray {\n    val out = IntArray(a.size + b.size)\n    var i = 0\n    var j = 0\n    var k = 0\n    while (i < a.size && j < b.size) out[k++] = if (a[i] <= b[j]) a[i++] else b[j++]\n    while (i < a.size) out[k++] = a[i++]\n    while (j < b.size) out[k++] = b[j++]\n    return out\n}\n",
      "dart": "void main() {\n  print(merge([1, 3, 5], [2, 4, 6, 7]));\n}\nList<int> merge(List<int> a, List<int> b) {\n  var out = <int>[];\n  var i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    out.add(a[i] <= b[j] ? a[i++] : b[j++]);\n  }\n  while (i < a.length) out.add(a[i++]);\n  while (j < b.length) out.add(b[j++]);\n  return out;\n}\n"
    },
    "quality": [
      {
        "pattern": "sort\\(",
        "message": "Inputs are already sorted — two pointers merge in O(n+m). Don't sort the concatenation."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "two-pointers"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-032",
    "category": "playground",
    "level": "intermediate",
    "topic": "Remove duplicates",
    "question": "From sorted {1,1,2,2,2,3} print the unique prefix as an array (order kept).",
    "answer": "Read/write pointers on a sorted array: copy when the value changes. **O(n)** in-place. A HashSet would also unique but uses extra memory and can scramble order if you rebuild from the set.",
    "expected": "[1, 2, 3]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = {1,1,2,2,2,3};\n        int n = unique(a);\n        System.out.println(Arrays.toString(Arrays.copyOf(a, n)));\n    }\n    static int unique(int[] a) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(1,1,2,2,2,3)\n    val n = unique(a)\n    println(a.copyOf(n).contentToString())\n}\nfun unique(a: IntArray): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  var a = [1, 1, 2, 2, 2, 3];\n  var n = unique(a);\n  print(a.sublist(0, n));\n}\nint unique(List<int> a) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = {1,1,2,2,2,3};\n        int n = unique(a);\n        System.out.println(Arrays.toString(Arrays.copyOf(a, n)));\n    }\n    static int unique(int[] a) {\n        if (a.length == 0) return 0;\n        int w = 1;\n        for (int i = 1; i < a.length; i++) if (a[i] != a[w - 1]) a[w++] = a[i];\n        return w;\n    }\n}\n",
      "kotlin": "fun main() {\n    val a = intArrayOf(1,1,2,2,2,3)\n    val n = unique(a)\n    println(a.copyOf(n).contentToString())\n}\nfun unique(a: IntArray): Int {\n    if (a.isEmpty()) return 0\n    var w = 1\n    for (i in 1 until a.size) if (a[i] != a[w - 1]) a[w++] = a[i]\n    return w\n}\n",
      "dart": "void main() {\n  var a = [1, 1, 2, 2, 2, 3];\n  var n = unique(a);\n  print(a.sublist(0, n));\n}\nint unique(List<int> a) {\n  if (a.isEmpty) return 0;\n  var w = 1;\n  for (var i = 1; i < a.length; i++) {\n    if (a[i] != a[w - 1]) a[w++] = a[i];\n  }\n  return w;\n}\n"
    },
    "quality": [
      {
        "pattern": "HashSet|toSet\\(",
        "message": "A set works but uses extra memory. On a sorted array the two-pointer write is O(1) extra space."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "two-pointers"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-033",
    "category": "playground",
    "level": "basic",
    "topic": "Reverse integer",
    "question": "Print reverse of 123 and of -450 (sign kept, trailing zeros dropped).",
    "answer": "Pop digits with `% 10` and build `rev = rev * 10 + d`. In interviews mention 32-bit overflow checks. **O(log n)** digits.",
    "expected": "321\n-54",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(rev(123));\n        System.out.println(rev(-450));\n    }\n    static int rev(int x) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(rev(123))\n    println(rev(-450))\n}\nfun rev(x: Int): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(rev(123));\n  print(rev(-450));\n}\nint rev(int x) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(rev(123));\n        System.out.println(rev(-450));\n    }\n    static int rev(int x) {\n        int sign = x < 0 ? -1 : 1;\n        x = Math.abs(x);\n        int r = 0;\n        while (x > 0) {\n            r = r * 10 + x % 10;\n            x /= 10;\n        }\n        return sign * r;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(rev(123))\n    println(rev(-450))\n}\nfun rev(x: Int): Int {\n    val sign = if (x < 0) -1 else 1\n    var n = kotlin.math.abs(x)\n    var r = 0\n    while (n > 0) {\n        r = r * 10 + n % 10\n        n /= 10\n    }\n    return sign * r\n}\n",
      "dart": "void main() {\n  print(rev(123));\n  print(rev(-450));\n}\nint rev(int x) {\n  var sign = x < 0 ? -1 : 1;\n  var n = x.abs();\n  var r = 0;\n  while (n > 0) {\n    r = r * 10 + n % 10;\n    n ~/= 10;\n  }\n  return sign * r;\n}\n"
    },
    "quality": [
      {
        "pattern": "String\\.valueOf|toString\\(\\)[\\s\\S]*reverse",
        "message": "String reverse works here but they often want the arithmetic version plus overflow talk."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-034",
    "category": "playground",
    "level": "intermediate",
    "topic": "Majority element",
    "question": "Print the majority element (> n/2 times) in {2,2,1,1,1,2,2}.",
    "answer": "Boyer-Moore: one candidate, one count. **O(n)** time, **O(1)** space. HashMap counting is the easier O(n) extra-space answer.",
    "expected": "2",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(majority(new int[]{2,2,1,1,1,2,2}));\n    }\n    static int majority(int[] a) {\n        return 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(majority(intArrayOf(2,2,1,1,1,2,2)))\n}\nfun majority(a: IntArray): Int {\n    return 0\n}\n",
      "dart": "void main() {\n  print(majority([2, 2, 1, 1, 1, 2, 2]));\n}\nint majority(List<int> a) {\n  return 0;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(majority(new int[]{2,2,1,1,1,2,2}));\n    }\n    static int majority(int[] a) {\n        int cand = a[0], count = 0;\n        for (int v : a) {\n            if (count == 0) cand = v;\n            count += (v == cand) ? 1 : -1;\n        }\n        return cand;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(majority(intArrayOf(2,2,1,1,1,2,2)))\n}\nfun majority(a: IntArray): Int {\n    var cand = a[0]\n    var count = 0\n    for (v in a) {\n        if (count == 0) cand = v\n        count += if (v == cand) 1 else -1\n    }\n    return cand\n}\n",
      "dart": "void main() {\n  print(majority([2, 2, 1, 1, 1, 2, 2]));\n}\nint majority(List<int> a) {\n  var cand = a[0];\n  var count = 0;\n  for (var v in a) {\n    if (count == 0) cand = v;\n    count += v == cand ? 1 : -1;\n  }\n  return cand;\n}\n"
    },
    "quality": [
      {
        "pattern": "HashMap|groupingBy|Map<",
        "message": "Counting in a map is correct O(n) extra space. Boyer-Moore is the O(1)-space follow-up."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "arrays",
      "voting"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-035",
    "category": "playground",
    "level": "basic",
    "topic": "Power of two",
    "question": "Print whether 1, 16, and 18 are powers of two.",
    "answer": "`n > 0 && (n & (n - 1)) == 0` because a power of two has a single bit set. Looping with `/2` is fine if you mention the bit trick.",
    "expected": "true\ntrue\nfalse",
    "starter": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(pow2(1));\n        System.out.println(pow2(16));\n        System.out.println(pow2(18));\n    }\n    static boolean pow2(int n) {\n        return false;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(pow2(1))\n    println(pow2(16))\n    println(pow2(18))\n}\nfun pow2(n: Int): Boolean {\n    return false\n}\n",
      "dart": "void main() {\n  print(pow2(1));\n  print(pow2(16));\n  print(pow2(18));\n}\nbool pow2(int n) {\n  return false;\n}\n"
    },
    "solution": {
      "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(pow2(1));\n        System.out.println(pow2(16));\n        System.out.println(pow2(18));\n    }\n    static boolean pow2(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n}\n",
      "kotlin": "fun main() {\n    println(pow2(1))\n    println(pow2(16))\n    println(pow2(18))\n}\nfun pow2(n: Int) = n > 0 && (n and (n - 1)) == 0\n",
      "dart": "void main() {\n  print(pow2(1));\n  print(pow2(16));\n  print(pow2(18));\n}\nbool pow2(int n) => n > 0 && (n & (n - 1)) == 0;\n"
    },
    "quality": [
      {
        "pattern": "Math\\.pow|pow\\(2",
        "message": "Floating pow can mis-round. Prefer the bit check or integer doubling/halving."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "bits",
      "math"
    ],
    "pdfTopic": false
  },
  {
    "id": "pg-036",
    "category": "playground",
    "level": "intermediate",
    "topic": "Intersection of arrays",
    "question": "Print the intersection of {1,2,2,1} and {2,2} as a sorted unique list.",
    "answer": "Put one array in a set, walk the other, collect hits in a result set (unique). **O(n+m)**. Nested loops are O(n·m).",
    "expected": "[2]",
    "starter": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(intersect(new int[]{1,2,2,1}, new int[]{2,2}));\n    }\n    static List<Integer> intersect(int[] a, int[] b) {\n        return List.of();\n    }\n}\n",
      "kotlin": "fun main() {\n    println(intersect(intArrayOf(1,2,2,1), intArrayOf(2,2)))\n}\nfun intersect(a: IntArray, b: IntArray): List<Int> {\n    return emptyList()\n}\n",
      "dart": "void main() {\n  print(intersect([1, 2, 2, 1], [2, 2]));\n}\nList<int> intersect(List<int> a, List<int> b) {\n  return [];\n}\n"
    },
    "solution": {
      "java": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(intersect(new int[]{1,2,2,1}, new int[]{2,2}));\n    }\n    static List<Integer> intersect(int[] a, int[] b) {\n        Set<Integer> inA = new HashSet<>();\n        for (int v : a) inA.add(v);\n        Set<Integer> out = new TreeSet<>();\n        for (int v : b) if (inA.contains(v)) out.add(v);\n        return new ArrayList<>(out);\n    }\n}\n",
      "kotlin": "fun main() {\n    println(intersect(intArrayOf(1,2,2,1), intArrayOf(2,2)))\n}\nfun intersect(a: IntArray, b: IntArray): List<Int> {\n    val inA = a.toSet()\n    return b.filter { it in inA }.toSortedSet().toList()\n}\n",
      "dart": "void main() {\n  print(intersect([1, 2, 2, 1], [2, 2]));\n}\nList<int> intersect(List<int> a, List<int> b) {\n  var inA = a.toSet();\n  var out = b.where(inA.contains).toSet().toList()..sort();\n  return out;\n}\n"
    },
    "quality": [
      {
        "pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(",
        "message": "Nested scans are O(n·m). Two sets (or a sort+two-pointer) is the expected answer."
      }
    ],
    "files": {
      "java": "Main.java",
      "kotlin": "Main.kt",
      "dart": "main.dart"
    },
    "tags": [
      "hashing",
      "arrays"
    ],
    "pdfTopic": false
  }
];
