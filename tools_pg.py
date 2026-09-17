#!/usr/bin/env python3
import json
from pathlib import Path

# Complete, runnable programs. main() prints test results used for evaluation.


def p(id_, level, topic, question, answer, expected, starter, solution, quality, tags):
    return {
        "id": id_,
        "category": "playground",
        "level": level,
        "topic": topic,
        "question": question,
        "answer": answer,
        "expected": expected,
        "starter": starter,
        "solution": solution,
        "quality": quality,
        "files": {"java": "Main.java", "kotlin": "Main.kt", "dart": "main.dart"},
        "tags": tags,
        "pdfTopic": id_.startswith("pg-0") and int(id_.split("-")[1]) <= 12,
    }


SJ = lambda body: f"""public class Main {{
    public static void main(String[] args) {{
{body}
    }}
}}
"""

SK = lambda body: f"""fun main() {{
{body}
}}
"""

SD = lambda body: f"""void main() {{
{body}
}}
"""

problems = []

problems.append(p(
    "pg-001", "basic", "Palindrome",
    "Check whether a string is a palindrome, ignoring case. Print true/false for Radar, hello, and AbBa.",
    "A palindrome reads the same forwards and backwards. Compare characters from both ends (two pointers) after normalizing case. Avoid building a reversed copy with `+` in a loop — that is O(n²) on Java strings.\n\n**Complexity:** O(n) time, O(1) extra space with two pointers.",
    "true\nfalse\ntrue",
    {
        "java": SJ("""        System.out.println(isPalindrome("Radar"));
        System.out.println(isPalindrome("hello"));
        System.out.println(isPalindrome("AbBa"));
    }

    static boolean isPalindrome(String s) {
        // write your code
        return false;
    """),
        "kotlin": SK("""    println(isPalindrome("Radar"))
    println(isPalindrome("hello"))
    println(isPalindrome("AbBa"))
}

fun isPalindrome(s: String): Boolean {
    // write your code
    return false
"""),
        "dart": SD("""  print(isPalindrome("Radar"));
  print(isPalindrome("hello"));
  print(isPalindrome("AbBa"));
}

bool isPalindrome(String s) {
  // write your code
  return false;
"""),
    },
    {
        "java": SJ("""        System.out.println(isPalindrome("Radar"));
        System.out.println(isPalindrome("hello"));
        System.out.println(isPalindrome("AbBa"));
    }

    static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            char a = Character.toLowerCase(s.charAt(i));
            char b = Character.toLowerCase(s.charAt(j));
            if (a != b) return false;
            i++;
            j--;
        }
        return true;
    """),
        "kotlin": SK("""    println(isPalindrome("Radar"))
    println(isPalindrome("hello"))
    println(isPalindrome("AbBa"))
}

fun isPalindrome(s: String): Boolean {
    var i = 0
    var j = s.lastIndex
    while (i < j) {
        if (s[i].lowercaseChar() != s[j].lowercaseChar()) return false
        i++
        j--
    }
    return true
"""),
        "dart": SD("""  print(isPalindrome("Radar"));
  print(isPalindrome("hello"));
  print(isPalindrome("AbBa"));
}

bool isPalindrome(String s) {
  var i = 0;
  var j = s.length - 1;
  while (i < j) {
    if (s[i].toLowerCase() != s[j].toLowerCase()) return false;
    i++;
    j--;
  }
  return true;
"""),
    },
    [
        {"pattern": "reverseStr\\s*\\+|\\+\\s*s\\.charAt|\\+\\s*s\\[|reversed\\s*\\+=", "message": "Building a reversed string with + in a loop is O(n²). Two pointers (or StringBuilder) is the interview answer."},
        {"pattern": "toCharArray\\(\\)|split\\(\"\"\\)|StringBuilder", "message": "Works, but two indices use O(1) extra memory. Mention that in the interview."},
    ],
    ["string", "two-pointers", "pdf"],
))

problems.append(p(
    "pg-002", "basic", "Linear Search",
    "Implement linear search. Print the index of 8 and of 7 in {2, 4, 6, 8, 10} (-1 if missing).",
    "Scan left to right until the target is found. Works on unsorted data. **O(n)** time, **O(1)** space. If the array is sorted, binary search is the follow-up.",
    "3\n-1",
    {
        "java": SJ("""        int[] arr = {2, 4, 6, 8, 10};
        System.out.println(linearSearch(arr, 8));
        System.out.println(linearSearch(arr, 7));
    }

    static int linearSearch(int[] arr, int x) {
        // write your code
        return -1;
    """),
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 6, 8, 10)
    println(linearSearch(arr, 8))
    println(linearSearch(arr, 7))
}

fun linearSearch(arr: IntArray, x: Int): Int {
    // write your code
    return -1
"""),
        "dart": SD("""  var arr = [2, 4, 6, 8, 10];
  print(linearSearch(arr, 8));
  print(linearSearch(arr, 7));
}

int linearSearch(List<int> arr, int x) {
  // write your code
  return -1;
"""),
    },
    {
        "java": SJ("""        int[] arr = {2, 4, 6, 8, 10};
        System.out.println(linearSearch(arr, 8));
        System.out.println(linearSearch(arr, 7));
    }

    static int linearSearch(int[] arr, int x) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == x) return i;
        }
        return -1;
    """),
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 6, 8, 10)
    println(linearSearch(arr, 8))
    println(linearSearch(arr, 7))
}

fun linearSearch(arr: IntArray, x: Int): Int {
    for (i in arr.indices) if (arr[i] == x) return i
    return -1
"""),
        "dart": SD("""  var arr = [2, 4, 6, 8, 10];
  print(linearSearch(arr, 8));
  print(linearSearch(arr, 7));
}

int linearSearch(List<int> arr, int x) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == x) return i;
  }
  return -1;
"""),
    },
    [{"pattern": "Arrays\\.binarySearch|binarySearch", "message": "Binary search is fine only because this sample is sorted. Linear search must not assume order."}],
    ["search", "arrays", "pdf"],
))

problems.append(p(
    "pg-003", "intermediate", "Binary Search",
    "Implement iterative binary search on a sorted array. Print the index of 8 and of 7 in {2, 4, 6, 8, 10}.",
    "Keep `left` and `right`. Mid = `left + (right - left) / 2` (avoids overflow). If `arr[mid] < x` search right, else left. **O(log n)**. Array **must be sorted**.",
    "3\n-1",
    {
        "java": SJ("""        int[] arr = {2, 4, 6, 8, 10};
        System.out.println(binarySearch(arr, 8));
        System.out.println(binarySearch(arr, 7));
    }

    static int binarySearch(int[] arr, int x) {
        // write your code
        return -1;
    """),
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 6, 8, 10)
    println(binarySearch(arr, 8))
    println(binarySearch(arr, 7))
}

fun binarySearch(arr: IntArray, x: Int): Int {
    // write your code
    return -1
"""),
        "dart": SD("""  var arr = [2, 4, 6, 8, 10];
  print(binarySearch(arr, 8));
  print(binarySearch(arr, 7));
}

int binarySearch(List<int> arr, int x) {
  // write your code
  return -1;
"""),
    },
    {
        "java": SJ("""        int[] arr = {2, 4, 6, 8, 10};
        System.out.println(binarySearch(arr, 8));
        System.out.println(binarySearch(arr, 7));
    }

    static int binarySearch(int[] arr, int x) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == x) return mid;
            if (arr[mid] < x) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    """),
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 6, 8, 10)
    println(binarySearch(arr, 8))
    println(binarySearch(arr, 7))
}

fun binarySearch(arr: IntArray, x: Int): Int {
    var left = 0
    var right = arr.lastIndex
    while (left <= right) {
        val mid = left + (right - left) / 2
        when {
            arr[mid] == x -> return mid
            arr[mid] < x -> left = mid + 1
            else -> right = mid - 1
        }
    }
    return -1
"""),
        "dart": SD("""  var arr = [2, 4, 6, 8, 10];
  print(binarySearch(arr, 8));
  print(binarySearch(arr, 7));
}

int binarySearch(List<int> arr, int x) {
  var left = 0;
  var right = arr.length - 1;
  while (left <= right) {
    var mid = left + (right - left) ~/ 2;
    if (arr[mid] == x) return mid;
    if (arr[mid] < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
"""),
    },
    [
        {"pattern": "mid\\s*=\\s*\\(\\s*left\\s*\\+\\s*right\\s*\\)\\s*/", "message": "Use left + (right - left) / 2 so left+right cannot overflow on large indices."},
        {"pattern": "for\\s*\\(\\s*int i = 0", "message": "A full scan is linear search. Binary search must halve the range each step."},
    ],
    ["search", "arrays", "pdf"],
))

def sort_problem(pid, level, name, question, answer, quality, java_fn, kotlin_fn, dart_fn, tags):
    expected = "[1, 2, 4, 5, 8]"
    starter_j = SJ("""        int[] arr = {5, 1, 4, 2, 8};
        sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void sort(int[] arr) {
        // write your """ + name + """ here
    """)
    starter_k = SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    sort(arr)
    println(arr.contentToString())
}

fun sort(arr: IntArray) {
    // write your """ + name + """ here
""")
    starter_d = SD("""  var arr = [5, 1, 4, 2, 8];
  sort(arr);
  print(arr);
}

void sort(List<int> arr) {
  // write your """ + name + """ here
""")
    return p(pid, level, name, question, answer, expected,
             {"java": starter_j, "kotlin": starter_k, "dart": starter_d},
             {"java": java_fn, "kotlin": kotlin_fn, "dart": dart_fn},
             quality, tags)

problems.append(sort_problem(
    "pg-004", "basic", "Bubble Sort",
    "Sort {5, 1, 4, 2, 8} with bubble sort and print the array.",
    "Repeatedly swap adjacent out-of-order pairs. After pass i, the last i elements are sorted. **O(n²)** time, **O(1)** extra space. Mention an early-exit flag if no swaps occur.",
    [{"pattern": "Arrays\\.sort|sort\\(\\)|sorted\\(\\)", "message": "Do not call the library sort — implement bubble sort as asked."}],
    SJ("""        int[] arr = {5, 1, 4, 2, 8};
        sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                }
            }
        }
    """),
    SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    sort(arr)
    println(arr.contentToString())
}

fun sort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val t = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = t
            }
        }
    }
"""),
    SD("""  var arr = [5, 1, 4, 2, 8];
  sort(arr);
  print(arr);
}

void sort(List<int> arr) {
  var n = arr.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }
    }
  }
"""),
    ["sorting", "pdf"],
))

problems.append(sort_problem(
    "pg-005", "basic", "Insertion Sort",
    "Sort {5, 1, 4, 2, 8} with insertion sort and print the array.",
    "Build a sorted prefix. Take `key = arr[i]` and shift larger elements right until the hole for key is found. **O(n²)** worst, **O(n)** on already-sorted data. Good for small or nearly sorted arrays.",
    [{"pattern": "Arrays\\.sort|sorted\\(\\)", "message": "Implement insertion sort yourself, not a library sort."}],
    SJ("""        int[] arr = {5, 1, 4, 2, 8};
        sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void sort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i], j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    """),
    SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    sort(arr)
    println(arr.contentToString())
}

fun sort(arr: IntArray) {
    for (i in 1 until arr.size) {
        val key = arr[i]
        var j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
"""),
    SD("""  var arr = [5, 1, 4, 2, 8];
  sort(arr);
  print(arr);
}

void sort(List<int> arr) {
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
"""),
    ["sorting", "pdf"],
))

problems.append(sort_problem(
    "pg-006", "basic", "Selection Sort",
    "Sort {5, 1, 4, 2, 8} with selection sort and print the array.",
    "For each index i, find the minimum in `i..n-1` and swap it with `arr[i]`. **O(n²)** time, **O(1)** space, at most n swaps (useful when writes are expensive).",
    [{"pattern": "Arrays\\.sort|sorted\\(\\)", "message": "Implement selection sort yourself."}],
    SJ("""        int[] arr = {5, 1, 4, 2, 8};
        sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) if (arr[j] < arr[min]) min = j;
            int t = arr[min];
            arr[min] = arr[i];
            arr[i] = t;
        }
    """),
    SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    sort(arr)
    println(arr.contentToString())
}

fun sort(arr: IntArray) {
    for (i in 0 until arr.size - 1) {
        var min = i
        for (j in i + 1 until arr.size) if (arr[j] < arr[min]) min = j
        val t = arr[min]
        arr[min] = arr[i]
        arr[i] = t
    }
"""),
    SD("""  var arr = [5, 1, 4, 2, 8];
  sort(arr);
  print(arr);
}

void sort(List<int> arr) {
  var n = arr.length;
  for (var i = 0; i < n - 1; i++) {
    var min = i;
    for (var j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    var t = arr[min];
    arr[min] = arr[i];
    arr[i] = t;
  }
"""),
    ["sorting", "pdf"],
))

problems.append(p(
    "pg-007", "advanced", "Merge Sort",
    "Sort {5, 1, 4, 2, 8} with merge sort and print the array.",
    "Divide-and-conquer: sort halves, then merge two sorted runs. **O(n log n)** time, **O(n)** extra space. Stable. Default interview 'efficient general sort' along with heapsort/quicksort.",
    "[1, 2, 4, 5, 8]",
    {
        "java": SJ("""        int[] arr = {5, 1, 4, 2, 8};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void mergeSort(int[] arr, int left, int right) {
        // write your code
    }

    static void merge(int[] arr, int left, int mid, int right) {
        // write your code
    """),
        "kotlin": SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    mergeSort(arr, 0, arr.lastIndex)
    println(arr.contentToString())
}

fun mergeSort(arr: IntArray, left: Int, right: Int) {
    // write your code
}

fun merge(arr: IntArray, left: Int, mid: Int, right: Int) {
    // write your code
"""),
        "dart": SD("""  var arr = [5, 1, 4, 2, 8];
  mergeSort(arr, 0, arr.length - 1);
  print(arr);
}

void mergeSort(List<int> arr, int left, int right) {
  // write your code
}

void merge(List<int> arr, int left, int mid, int right) {
  // write your code
"""),
    },
    {
        "java": SJ("""        int[] arr = {5, 1, 4, 2, 8};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1, n2 = right - mid;
        int[] L = new int[n1], R = new int[n2];
        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    """),
        "kotlin": SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    mergeSort(arr, 0, arr.lastIndex)
    println(arr.contentToString())
}

fun mergeSort(arr: IntArray, left: Int, right: Int) {
    if (left >= right) return
    val mid = left + (right - left) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
}

fun merge(arr: IntArray, left: Int, mid: Int, right: Int) {
    val L = arr.copyOfRange(left, mid + 1)
    val R = arr.copyOfRange(mid + 1, right + 1)
    var i = 0
    var j = 0
    var k = left
    while (i < L.size && j < R.size) {
        arr[k++] = if (L[i] <= R[j]) L[i++] else R[j++]
    }
    while (i < L.size) arr[k++] = L[i++]
    while (j < R.size) arr[k++] = R[j++]
"""),
        "dart": SD("""  var arr = [5, 1, 4, 2, 8];
  mergeSort(arr, 0, arr.length - 1);
  print(arr);
}

void mergeSort(List<int> arr, int left, int right) {
  if (left >= right) return;
  var mid = left + (right - left) ~/ 2;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

void merge(List<int> arr, int left, int mid, int right) {
  var L = arr.sublist(left, mid + 1);
  var R = arr.sublist(mid + 1, right + 1);
  var i = 0, j = 0, k = left;
  while (i < L.length && j < R.length) {
    arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
  }
  while (i < L.length) arr[k++] = L[i++];
  while (j < R.length) arr[k++] = R[j++];
"""),
    },
    [
        {"pattern": "Arrays\\.sort|List\\.sort|sorted\\(\\)", "message": "Call mergeSort/merge, not the standard library sort."},
        {"pattern": "for \\(int i = 0; i < n - 1", "message": "That looks like bubble/selection. Merge sort should recurse on halves then merge."},
    ],
    ["sorting", "divide-conquer", "pdf"],
))

problems.append(p(
    "pg-008", "advanced", "Quick Sort",
    "Sort {5, 1, 4, 2, 8} with quicksort (last-element pivot as in the notes) and print the array.",
    "Partition around a pivot so left ≤ pivot < right, then recurse. Average **O(n log n)**, worst **O(n²)** on sorted input with a naive last-element pivot. In-place, not stable. Interview follow-up: random/median-of-three pivot.",
    "[1, 2, 4, 5, 8]",
    {
        "java": SJ("""        int[] arr = {5, 1, 4, 2, 8};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void quickSort(int[] arr, int low, int high) {
        // write your code
    }

    static int partition(int[] arr, int low, int high) {
        return 0;
    """),
        "kotlin": SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    quickSort(arr, 0, arr.lastIndex)
    println(arr.contentToString())
}

fun quickSort(arr: IntArray, low: Int, high: Int) {
    // write your code
}

fun partition(arr: IntArray, low: Int, high: Int): Int {
    return 0
"""),
        "dart": SD("""  var arr = [5, 1, 4, 2, 8];
  quickSort(arr, 0, arr.length - 1);
  print(arr);
}

void quickSort(List<int> arr, int low, int high) {
  // write your code
}

int partition(List<int> arr, int low, int high) {
  return 0;
"""),
    },
    {
        "java": SJ("""        int[] arr = {5, 1, 4, 2, 8};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
        }
        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        return i + 1;
    """),
        "kotlin": SK("""    val arr = intArrayOf(5, 1, 4, 2, 8)
    quickSort(arr, 0, arr.lastIndex)
    println(arr.contentToString())
}

fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low >= high) return
    val pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
}

fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            val t = arr[i]; arr[i] = arr[j]; arr[j] = t
        }
    }
    val t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t
    return i + 1
"""),
        "dart": SD("""  var arr = [5, 1, 4, 2, 8];
  quickSort(arr, 0, arr.length - 1);
  print(arr);
}

void quickSort(List<int> arr, int low, int high) {
  if (low >= high) return;
  var pi = partition(arr, low, high);
  quickSort(arr, low, pi - 1);
  quickSort(arr, pi + 1, high);
}

int partition(List<int> arr, int low, int high) {
  var pivot = arr[high];
  var i = low - 1;
  for (var j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }
  var t = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = t;
  return i + 1;
"""),
    },
    [
        {"pattern": "Arrays\\.sort|sorted\\(\\)", "message": "Implement partition + recurse, not Arrays.sort."},
        {"pattern": "for \\(int i = 0; i < n - 1", "message": "That looks like bubble sort. Quicksort partitions then recurses."},
    ],
    ["sorting", "divide-conquer", "pdf"],
))

problems.append(p(
    "pg-009", "intermediate", "Odd First Even Last",
    "From {26,27,28,29,30,31,32,33} print odds first (order preserved), then evens.",
    "Partition into two lists while scanning once, then concatenate. **O(n)** time. Do not sort — that would scramble the original odd/even relative order unless you use a stable partition.",
    "[27, 29, 31, 33, 26, 28, 30, 32]",
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        String[] arr = {"26","27","28","29","30","31","32","33"};
        // write your code; print the final array with Arrays.toString
        System.out.println(Arrays.toString(arr));
    }
}
""",
        "kotlin": SK("""    val arr = arrayOf("26","27","28","29","30","31","32","33")
    // write your code; print the final list
    println(arr.contentToString())
"""),
        "dart": SD("""  var arr = ["26","27","28","29","30","31","32","33"];
  // write your code; print the final list
  print(arr);
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        String[] arr = {"26","27","28","29","30","31","32","33"};
        List<String> odds = new ArrayList<>();
        List<String> evens = new ArrayList<>();
        for (String s : arr) {
            if (Integer.parseInt(s) % 2 == 0) evens.add(s);
            else odds.add(s);
        }
        List<String> out = new ArrayList<>(odds);
        out.addAll(evens);
        System.out.println(out);
    }
}
""",
        "kotlin": SK("""    val arr = arrayOf("26","27","28","29","30","31","32","33")
    val odds = arr.filter { it.toInt() % 2 != 0 }
    val evens = arr.filter { it.toInt() % 2 == 0 }
    println((odds + evens))
"""),
        "dart": SD("""  var arr = ["26", "27", "28", "29", "30", "31", "32", "33"];
  var odds = arr.where((s) => int.parse(s) % 2 != 0).toList();
  var evens = arr.where((s) => int.parse(s) % 2 == 0).toList();
  print([...odds, ...evens]);
"""),
    },
    [
        {"pattern": "Arrays\\.sort|sortedBy|sort\\(", "message": "Sorting is unnecessary and can change relative order. Two-list partition is O(n) and stable."},
    ],
    ["arrays", "partition", "pdf"],
))

problems.append(p(
    "pg-010", "advanced", "Longest unique substring",
    "Print the length of the longest substring without repeating characters for abcabcbb, bbbbb, and pwwkew.",
    "Sliding window + last-seen index map. Move `i` to `last[c]+1` when `c` repeats inside the window. **O(n)** time. The notes used a HashMap of last indices — that is the expected interview solution, not O(n²) nested loops.",
    "3\n1\n3",
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(longest("abcabcbb"));
        System.out.println(longest("bbbbb"));
        System.out.println(longest("pwwkew"));
    }
    static int longest(String str) {
        // write your code
        return 0;
    }
}
""",
        "kotlin": SK("""    println(longest("abcabcbb"))
    println(longest("bbbbb"))
    println(longest("pwwkew"))
}

fun longest(str: String): Int {
    // write your code
    return 0
"""),
        "dart": SD("""  print(longest("abcabcbb"));
  print(longest("bbbbb"));
  print(longest("pwwkew"));
}

int longest(String str) {
  // write your code
  return 0;
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(longest("abcabcbb"));
        System.out.println(longest("bbbbb"));
        System.out.println(longest("pwwkew"));
    }
    static int longest(String str) {
        Map<Character, Integer> last = new HashMap<>();
        int i = 0, res = 0;
        for (int j = 0; j < str.length(); j++) {
            char c = str.charAt(j);
            if (last.containsKey(c)) i = Math.max(i, last.get(c) + 1);
            res = Math.max(res, j - i + 1);
            last.put(c, j);
        }
        return res;
    }
}
""",
        "kotlin": SK("""    println(longest("abcabcbb"))
    println(longest("bbbbb"))
    println(longest("pwwkew"))
}

fun longest(str: String): Int {
    val last = HashMap<Char, Int>()
    var i = 0
    var res = 0
    for (j in str.indices) {
        val c = str[j]
        if (c in last) i = maxOf(i, last[c]!! + 1)
        res = maxOf(res, j - i + 1)
        last[c] = j
    }
    return res
"""),
        "dart": SD("""  print(longest("abcabcbb"));
  print(longest("bbbbb"));
  print(longest("pwwkew"));
}

int longest(String str) {
  var last = <String, int>{};
  var i = 0;
  var res = 0;
  for (var j = 0; j < str.length; j++) {
    var c = str[j];
    if (last.containsKey(c)) i = i > last[c]! + 1 ? i : last[c]! + 1;
    var len = j - i + 1;
    if (len > res) res = len;
    last[c] = j;
  }
  return res;
"""),
    },
    [
        {"pattern": "for \\([^)]+\\)[^{]*\\{[^}]*for \\(", "message": "Nested loops are O(n²). The expected solution is a sliding window with a last-index map."},
    ],
    ["string", "sliding-window", "pdf"],
))

problems.append(p(
    "pg-011", "intermediate", "Missing Elements",
    "From {2, 4, 3, 6, 5, 10, 12, 8} print every missing integer from 1 through the max, one per line.",
    "After you know min/max, a **HashSet** of present values makes each lookup O(1). Nested `anyMatch` / `contains` on the raw array is O(n²). The notes also showed a sort-and-walk approach.",
    "1\n7\n9\n11",
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 3, 6, 5, 10, 12, 8};
        // print missing numbers from 1 to max, one per line
    }
}
""",
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 3, 6, 5, 10, 12, 8)
    // print missing numbers from 1 to max, one per line
"""),
        "dart": SD("""  var arr = [2, 4, 3, 6, 5, 10, 12, 8];
  // print missing numbers from 1 to max, one per line
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] arr = {2, 4, 3, 6, 5, 10, 12, 8};
        Set<Integer> have = new HashSet<>();
        int max = 0;
        for (int v : arr) { have.add(v); if (v > max) max = v; }
        for (int i = 1; i <= max; i++) if (!have.contains(i)) System.out.println(i);
    }
}
""",
        "kotlin": SK("""    val arr = intArrayOf(2, 4, 3, 6, 5, 10, 12, 8)
    val have = arr.toSet()
    val max = arr.maxOrNull()!!
    for (i in 1..max) if (i !in have) println(i)
"""),
        "dart": SD("""  var arr = [2, 4, 3, 6, 5, 10, 12, 8];
  var have = arr.toSet();
  var max = arr.reduce((a, b) => a > b ? a : b);
  for (var i = 1; i <= max; i++) {
    if (!have.contains(i)) print(i);
  }
"""),
    },
    [
        {"pattern": "anyMatch|arr\\.contains\\(i\\)|indexOf\\(i\\)", "message": "Scanning the array for every candidate is O(n²). Put values in a HashSet first."},
        {"pattern": "stream\\(arr\\)\\.anyMatch", "message": "The PDF alternate used stream anyMatch inside a loop — correct but slow. Prefer a Set."},
    ],
    ["arrays", "set", "pdf"],
))

problems.append(p(
    "pg-012", "intermediate", "Max-min sequence",
    "From {10,20,...,110} print max, min, next-max, next-min, ... (110, 10, 100, 20, ...).",
    "Sort, then two pointers at the ends. Alternate take from right then left. **O(n log n)** for the sort. Watch the odd-length middle element so you do not index twice.",
    "[110, 10, 100, 20, 90, 30, 80, 40, 70, 50, 60]",
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        Integer[] arr = {10,20,30,40,50,60,70,80,90,100,110};
        // rearrange and print Arrays.toString
        System.out.println(Arrays.toString(arr));
    }
}
""",
        "kotlin": SK("""    val arr = arrayOf(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110)
    // rearrange and print
    println(arr.contentToString())
"""),
        "dart": SD("""  var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  // rearrange and print
  print(arr);
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] arr = {10,20,30,40,50,60,70,80,90,100,110};
        Arrays.sort(arr);
        int[] out = new int[arr.length];
        int l = 0, r = arr.length - 1, k = 0;
        while (l <= r) {
            out[k++] = arr[r--];
            if (l <= r) out[k++] = arr[l++];
        }
        System.out.println(Arrays.toString(out));
    }
}
""",
        "kotlin": SK("""    val arr = intArrayOf(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110)
    arr.sort()
    val out = IntArray(arr.size)
    var l = 0
    var r = arr.lastIndex
    var k = 0
    while (l <= r) {
        out[k++] = arr[r--]
        if (l <= r) out[k++] = arr[l++]
    }
    println(out.contentToString())
"""),
        "dart": SD("""  var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  arr.sort();
  var out = <int>[];
  var l = 0;
  var r = arr.length - 1;
  while (l <= r) {
    out.add(arr[r--]);
    if (l <= r) out.add(arr[l++]);
  }
  print(out);
"""),
    },
    [
        {"pattern": "catch \\(e", "message": "The PDF used try/catch to hide index errors. Two pointers with `l <= r` is the clean version."},
    ],
    ["arrays", "two-pointers", "pdf"],
))

# Extra problems from common interview lists
problems.append(p(
    "pg-013", "basic", "Reverse string",
    "Print the reverse of 'android' and of 'Flutter'.",
    "Two pointers swapping characters, or iterate from the end into a StringBuilder. **O(n)**.",
    "diordna\nrettulF",
    {
        "java": SJ("""        System.out.println(rev("android"));
        System.out.println(rev("Flutter"));
    }
    static String rev(String s) {
        return s;
    """),
        "kotlin": SK("""    println(rev("android"))
    println(rev("Flutter"))
}
fun rev(s: String): String {
    return s
"""),
        "dart": SD("""  print(rev("android"));
  print(rev("Flutter"));
}

String rev(String s) {
  return s;
"""),
    },
    {
        "java": SJ("""        System.out.println(rev("android"));
        System.out.println(rev("Flutter"));
    }
    static String rev(String s) {
        char[] a = s.toCharArray();
        int i = 0, j = a.length - 1;
        while (i < j) { char t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }
        return new String(a);
    """),
        "kotlin": SK("""    println(rev("android"))
    println(rev("Flutter"))
}
fun rev(s: String): String {
    val a = s.toCharArray()
    var i = 0
    var j = a.lastIndex
    while (i < j) {
        val t = a[i]; a[i] = a[j]; a[j] = t
        i++; j--
    }
    return String(a)
"""),
        "dart": SD("""  print(rev("android"));
  print(rev("Flutter"));
}

String rev(String s) {
  var a = s.split('');
  var i = 0;
  var j = a.length - 1;
  while (i < j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
    i++;
    j--;
  }
  return a.join();
"""),
    },
    [{"pattern": "\\+ s\\.charAt\\(i\\)", "message": "Concatenating in a reverse loop is O(n²) on Java strings. Use a char array or StringBuilder."}],
    ["string"],
))

problems.append(p(
    "pg-014", "basic", "Fibonacci",
    "Print the first 8 Fibonacci numbers (starting 0, 1) as a space-separated line.",
    "Iterative pair `(a,b) = (b, a+b)`. Recursive without memo is exponential — interviewers will ask you to fix that.",
    "0 1 1 2 3 5 8 13",
    {
        "java": SJ("""        // print first 8 fibonacci numbers separated by spaces
    """),
        "kotlin": SK("""    // print first 8 fibonacci numbers separated by spaces
"""),
        "dart": SD("""  // print first 8 fibonacci numbers separated by spaces
"""),
    },
    {
        "java": SJ("""        int n = 8, a = 0, b = 1;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a);
            int c = a + b; a = b; b = c;
        }
        System.out.println(sb);
    """),
        "kotlin": SK("""    var a = 0
    var b = 1
    val out = mutableListOf<Int>()
    repeat(8) {
        out += a
        val c = a + b
        a = b
        b = c
    }
    println(out.joinToString(" "))
"""),
        "dart": SD("""  var a = 0, b = 1;
  var out = <int>[];
  for (var i = 0; i < 8; i++) {
    out.add(a);
    var c = a + b;
    a = b;
    b = c;
  }
  print(out.join(" "));
"""),
    },
    [{"pattern": "fib\\(n - 1\\)|fib\\(n-1\\)", "message": "Naive recursion is O(φⁿ). The expected production answer is a loop (or memoized DP)."}],
    ["dp", "math"],
))

problems.append(p(
    "pg-015", "basic", "FizzBuzz",
    "Print FizzBuzz for 1..15 (Fizz on 3, Buzz on 5, FizzBuzz on 15), one token per line.",
    "Check 15 first, then 3, then 5. A classic warmup; they want clean control flow, not cleverness.",
    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    {
        "java": SJ("""        // FizzBuzz 1..15, one per line
    """),
        "kotlin": SK("""    // FizzBuzz 1..15, one per line
"""),
        "dart": SD("""  // FizzBuzz 1..15, one per line
"""),
    },
    {
        "java": SJ("""        for (int i = 1; i <= 15; i++) {
            if (i % 15 == 0) System.out.println("FizzBuzz");
            else if (i % 3 == 0) System.out.println("Fizz");
            else if (i % 5 == 0) System.out.println("Buzz");
            else System.out.println(i);
        }
    """),
        "kotlin": SK("""    for (i in 1..15) {
        println(when {
            i % 15 == 0 -> "FizzBuzz"
            i % 3 == 0 -> "Fizz"
            i % 5 == 0 -> "Buzz"
            else -> i
        })
    }
"""),
        "dart": SD("""  for (var i = 1; i <= 15; i++) {
    if (i % 15 == 0) print("FizzBuzz");
    else if (i % 3 == 0) print("Fizz");
    else if (i % 5 == 0) print("Buzz");
    else print(i);
  }
"""),
    },
    [{"pattern": "i % 3 == 0 && i % 5 == 0", "message": "Fine. Checking %15 (or 3&&5) before the single checks is the usual order so 15 is not printed as Fizz only."}],
    ["control-flow"],
))

problems.append(p(
    "pg-016", "intermediate", "Anagram",
    "Print whether each pair is an anagram: (listen, silent) and (apple, papel) and (rat, car).",
    "Sort both strings or count characters in an int[26]/HashMap. Ignore case. **O(n)** with counts is preferred over sort's O(n log n).",
    "true\ntrue\nfalse",
    {
        "java": SJ("""        System.out.println(an("listen","silent"));
        System.out.println(an("apple","papel"));
        System.out.println(an("rat","car"));
    }
    static boolean an(String a, String b) {
        return false;
    """),
        "kotlin": SK("""    println(an("listen","silent"))
    println(an("apple","papel"))
    println(an("rat","car"))
}
fun an(a: String, b: String): Boolean {
    return false
"""),
        "dart": SD("""  print(an("listen","silent"));
  print(an("apple","papel"));
  print(an("rat","car"));
}

bool an(String a, String b) {
  return false;
"""),
    },
    {
        "java": SJ("""        System.out.println(an("listen","silent"));
        System.out.println(an("apple","papel"));
        System.out.println(an("rat","car"));
    }
    static boolean an(String a, String b) {
        if (a.length() != b.length()) return false;
        int[] c = new int[26];
        for (int i = 0; i < a.length(); i++) {
            c[Character.toLowerCase(a.charAt(i)) - 'a']++;
            c[Character.toLowerCase(b.charAt(i)) - 'a']--;
        }
        for (int n : c) if (n != 0) return false;
        return true;
    """),
        "kotlin": SK("""    println(an("listen","silent"))
    println(an("apple","papel"))
    println(an("rat","car"))
}
fun an(a: String, b: String): Boolean {
    if (a.length != b.length) return false
    val c = IntArray(26)
    for (i in a.indices) {
        c[a[i].lowercaseChar() - 'a']++
        c[b[i].lowercaseChar() - 'a']--
    }
    return c.all { it == 0 }
"""),
        "dart": SD("""  print(an("listen", "silent"));
  print(an("apple", "papel"));
  print(an("rat", "car"));
}

bool an(String a, String b) {
  if (a.length != b.length) return false;
  var c = List.filled(26, 0);
  for (var i = 0; i < a.length; i++) {
    c[a[i].toLowerCase().codeUnitAt(0) - 97]++;
    c[b[i].toLowerCase().codeUnitAt(0) - 97]--;
  }
  return c.every((n) => n == 0);
"""),
    },
    [{"pattern": "toCharArray\\(\\)[\\s\\S]*sort\\(", "message": "Sorting works (O(n log n)). A 26-slot count is O(n) and what most interviewers want next."}],
    ["string", "hashing"],
))

problems.append(p(
    "pg-017", "intermediate", "Two Sum",
    "In {2, 7, 11, 15} find two indices that add to 9. Print them as [i, j] with i < j.",
    "One-pass HashMap from value → index. For each x, look up `target - x`. **O(n)** time vs O(n²) nested loops.",
    "[0, 1]",
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));
    }
    static int[] twoSum(int[] nums, int target) { return new int[]{-1,-1}; }
}
""",
        "kotlin": SK("""    println(twoSum(intArrayOf(2,7,11,15), 9).contentToString())
}
fun twoSum(nums: IntArray, target: Int): IntArray {
    return intArrayOf(-1, -1)
"""),
        "dart": SD("""  print(twoSum([2, 7, 11, 15], 9));
}

List<int> twoSum(List<int> nums, int target) {
  return [-1, -1];
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));
    }
    static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            Integer j = seen.get(target - nums[i]);
            if (j != null) return new int[]{j, i};
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }
}
""",
        "kotlin": SK("""    println(twoSum(intArrayOf(2,7,11,15), 9).contentToString())
}
fun twoSum(nums: IntArray, target: Int): IntArray {
    val seen = HashMap<Int, Int>()
    for (i in nums.indices) {
        val j = seen[target - nums[i]]
        if (j != null) return intArrayOf(j, i)
        seen[nums[i]] = i
    }
    return intArrayOf(-1, -1)
"""),
        "dart": SD("""  print(twoSum([2, 7, 11, 15], 9));
}

List<int> twoSum(List<int> nums, int target) {
  var seen = <int, int>{};
  for (var i = 0; i < nums.length; i++) {
    var j = seen[target - nums[i]];
    if (j != null) return [j, i];
    seen[nums[i]] = i;
  }
  return [-1, -1];
"""),
    },
    [{"pattern": "for \\([^)]+\\)[^{]*\\{[^}]*for \\(", "message": "Nested loops are O(n²). The expected follow-up is a HashMap in one pass."}],
    ["hashing", "arrays"],
))

problems.append(p(
    "pg-018", "intermediate", "Valid parentheses",
    "Print whether each string is valid parentheses: ()[]{}, (], and ([]) .",
    "Stack: push opening, pop when a matching closer arrives. Empty stack at the end. **O(n)**.",
    "true\nfalse\ntrue",
    {
        "java": SJ("""        System.out.println(ok("()[]{}"));
        System.out.println(ok("(]"));
        System.out.println(ok("([])"));
    }
    static boolean ok(String s) {
        return false;
    """),
        "kotlin": SK("""    println(ok("()[]{}"))
    println(ok("(]"))
    println(ok("([])"))
}
fun ok(s: String): Boolean {
    return false
"""),
        "dart": SD("""  print(ok("()[]{}"));
  print(ok("(]"));
  print(ok("([])"));
}

bool ok(String s) {
  return false;
"""),
    },
    {
        "java": """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(ok("()[]{}"));
        System.out.println(ok("(]"));
        System.out.println(ok("([])"));
    }
    static boolean ok(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.isEmpty()) return false;
                char o = st.pop();
                if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;
            }
        }
        return st.isEmpty();
    }
}
""",
        "kotlin": SK("""    println(ok("()[]{}"))
    println(ok("(]"))
    println(ok("([])"))
}
fun ok(s: String): Boolean {
    val st = ArrayDeque<Char>()
    val pair = mapOf(')' to '(', ']' to '[', '}' to '{')
    for (c in s) {
        if (c in "([{") st.addLast(c)
        else {
            if (st.isEmpty() || st.removeLast() != pair[c]) return false
        }
    }
    return st.isEmpty()
"""),
        "dart": SD("""  print(ok("()[]{}"));
  print(ok("(]"));
  print(ok("([])"));
}

bool ok(String s) {
  var st = <String>[];
  var pair = {")": "(", "]": "[", "}": "{"};
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if ("([{".contains(c)) {
      st.add(c);
    } else {
      if (st.isEmpty || st.removeLast() != pair[c]) return false;
    }
  }
  return st.isEmpty;
"""),
    },
    [{"pattern": "replaceAll|replace\\(", "message": "Repeatedly stripping '()' works for tiny strings but is the wrong interview data structure. Use a stack."}],
    ["stack", "string"],
))

problems.append(p(
    "pg-019", "intermediate", "Move zeros",
    "Move zeros in {0,1,0,3,12} to the end, keeping other order. Print the array.",
    "Write pointer for next non-zero; fill the rest with zero. **O(n)** in-place. Do not sort — that would reorder the non-zeros.",
    "[1, 3, 12, 0, 0]",
    {
        "java": SJ("""        int[] a = {0,1,0,3,12};
        move(a);
        System.out.println(java.util.Arrays.toString(a));
    }
    static void move(int[] a) {
        // write your code
    """),
        "kotlin": SK("""    val a = intArrayOf(0,1,0,3,12)
    move(a)
    println(a.contentToString())
}
fun move(a: IntArray) {
    // write your code
"""),
        "dart": SD("""  var a = [0, 1, 0, 3, 12];
  move(a);
  print(a);
}

void move(List<int> a) {
  // write your code
"""),
    },
    {
        "java": SJ("""        int[] a = {0,1,0,3,12};
        move(a);
        System.out.println(java.util.Arrays.toString(a));
    }
    static void move(int[] a) {
        int w = 0;
        for (int i = 0; i < a.length; i++) if (a[i] != 0) a[w++] = a[i];
        while (w < a.length) a[w++] = 0;
    """),
        "kotlin": SK("""    val a = intArrayOf(0,1,0,3,12)
    move(a)
    println(a.contentToString())
}
fun move(a: IntArray) {
    var w = 0
    for (v in a) if (v != 0) a[w++] = v
    while (w < a.size) a[w++] = 0
"""),
        "dart": SD("""  var a = [0, 1, 0, 3, 12];
  move(a);
  print(a);
}

void move(List<int> a) {
  var w = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] != 0) a[w++] = a[i];
  }
  while (w < a.length) a[w++] = 0;
"""),
    },
    [{"pattern": "sort\\(", "message": "Sorting would group zeros but also reorder 1,3,12 if they were unsorted. Use a write pointer."}],
    ["arrays", "two-pointers"],
))

problems.append(p(
    "pg-020", "advanced", "Kadane",
    "Print the maximum subarray sum of {-2,1,-3,4,-1,2,1,-5,4}.",
    "Kadane: `best = max(x, best+x)` rolling. **O(n)**. Nested sums are O(n²)/O(n³) and will be flagged.",
    "6",
    {
        "java": SJ("""        System.out.println(kadane(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
    }
    static int kadane(int[] a) {
        return 0;
    """),
        "kotlin": SK("""    println(kadane(intArrayOf(-2,1,-3,4,-1,2,1,-5,4)))
}
fun kadane(a: IntArray): Int {
    return 0
"""),
        "dart": SD("""  print(kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
}

int kadane(List<int> a) {
  return 0;
"""),
    },
    {
        "java": SJ("""        System.out.println(kadane(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
    }
    static int kadane(int[] a) {
        int best = a[0], cur = a[0];
        for (int i = 1; i < a.length; i++) {
            cur = Math.max(a[i], cur + a[i]);
            best = Math.max(best, cur);
        }
        return best;
    """),
        "kotlin": SK("""    println(kadane(intArrayOf(-2,1,-3,4,-1,2,1,-5,4)))
}
fun kadane(a: IntArray): Int {
    var best = a[0]
    var cur = a[0]
    for (i in 1 until a.size) {
        cur = maxOf(a[i], cur + a[i])
        best = maxOf(best, cur)
    }
    return best
"""),
        "dart": SD("""  print(kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
}

int kadane(List<int> a) {
  var best = a[0];
  var cur = a[0];
  for (var i = 1; i < a.length; i++) {
    cur = a[i] > cur + a[i] ? a[i] : cur + a[i];
    if (cur > best) best = cur;
  }
  return best;
"""),
    },
    [{"pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(", "message": "Nested range sums are O(n²). Kadane is a single pass."}],
    ["arrays", "dp"],
))

problems.append(p(
    "pg-021", "basic", "Factorial",
    "Print 5! and 0! (both as integers).",
    "Iterative product 1..n. 0! is 1 by definition. Watch overflow past 20! in 64-bit — mention BigInteger in interviews.",
    "120\n1",
    {
        "java": SJ("""        System.out.println(fact(5));
        System.out.println(fact(0));
    }
    static long fact(int n) {
        return 0;
    """),
        "kotlin": SK("""    println(fact(5))
    println(fact(0))
}
fun fact(n: Int): Long {
    return 0
"""),
        "dart": SD("""  print(fact(5));
  print(fact(0));
}

int fact(int n) {
  return 0;
"""),
    },
    {
        "java": SJ("""        System.out.println(fact(5));
        System.out.println(fact(0));
    }
    static long fact(int n) {
        long r = 1;
        for (int i = 2; i <= n; i++) r *= i;
        return r;
    """),
        "kotlin": SK("""    println(fact(5))
    println(fact(0))
}
fun fact(n: Int): Long {
    var r = 1L
    for (i in 2..n) r *= i
    return r
"""),
        "dart": SD("""  print(fact(5));
  print(fact(0));
}
int fact(int n) {
  var r = 1;
  for (var i = 2; i <= n; i++) r *= i;
  return r;
"""),
    },
    [{"pattern": "fact\\(n - 1\\)", "message": "Recursion is correct but uses O(n) stack. A loop is enough for this problem."}],
    ["math"],
))

problems.append(p(
    "pg-022", "intermediate", "First unique character",
    "Print the index of the first non-repeating character in 'leetcode' and in 'aabb' (-1 if none).",
    "Count frequencies, then a second pass for the first count==1. **O(n)**.",
    "0\n-1",
    {
        "java": SJ("""        System.out.println(first("leetcode"));
        System.out.println(first("aabb"));
    }
    static int first(String s) {
        return -1;
    """),
        "kotlin": SK("""    println(first("leetcode"))
    println(first("aabb"))
}
fun first(s: String): Int {
    return -1
"""),
        "dart": SD("""  print(first("leetcode"));
  print(first("aabb"));
}

int first(String s) {
  return -1;
"""),
    },
    {
        "java": SJ("""        System.out.println(first("leetcode"));
        System.out.println(first("aabb"));
    }
    static int first(String s) {
        int[] c = new int[26];
        for (int i = 0; i < s.length(); i++) c[s.charAt(i) - 'a']++;
        for (int i = 0; i < s.length(); i++) if (c[s.charAt(i) - 'a'] == 1) return i;
        return -1;
    """),
        "kotlin": SK("""    println(first("leetcode"))
    println(first("aabb"))
}
fun first(s: String): Int {
    val c = IntArray(26)
    for (ch in s) c[ch - 'a']++
    for (i in s.indices) if (c[s[i] - 'a'] == 1) return i
    return -1
"""),
        "dart": SD("""  print(first("leetcode"));
  print(first("aabb"));
}
int first(String s) {
  var c = List.filled(26, 0);
  for (var i = 0; i < s.length; i++) {
    c[s.codeUnitAt(i) - 97]++;
  }
  for (var i = 0; i < s.length; i++) {
    if (c[s.codeUnitAt(i) - 97] == 1) return i;
  }
  return -1;
"""),
    },
    [{"pattern": "indexOf[\\s\\S]*lastIndexOf", "message": "indexOf==lastIndexOf works but is O(n²). Two counting passes are O(n)."}],
    ["string", "hashing"],
))

problems.append(p(
    "pg-023", "basic", "Max in array",
    "Print the maximum of {3, 9, 1, 4, 7}.",
    "One pass keep `best`. Do not sort just to read the last element — that is O(n log n) for an O(n) job.",
    "9",
    {
        "java": SJ("""        System.out.println(max(new int[]{3,9,1,4,7}));
    }
    static int max(int[] a) {
        return 0;
    """),
        "kotlin": SK("""    println(max(intArrayOf(3,9,1,4,7)))
}
fun max(a: IntArray): Int {
    return 0
"""),
        "dart": SD("""  print(maxOf([3, 9, 1, 4, 7]));
}

int maxOf(List<int> a) {
  return 0;
"""),
    },
    {
        "java": SJ("""        System.out.println(max(new int[]{3,9,1,4,7}));
    }
    static int max(int[] a) {
        int m = a[0];
        for (int v : a) if (v > m) m = v;
        return m;
    """),
        "kotlin": SK("""    println(max(intArrayOf(3,9,1,4,7)))
}
fun max(a: IntArray): Int {
    var m = a[0]
    for (v in a) if (v > m) m = v
    return m
"""),
        "dart": SD("""  print(maxOf([3, 9, 1, 4, 7]));
}

int maxOf(List<int> a) {
  var m = a[0];
  for (var v in a) {
    if (v > m) m = v;
  }
  return m;
"""),
    },
    [{"pattern": "sort\\(", "message": "Sorting to find max is O(n log n). A linear scan is enough."}],
    ["arrays"],
))

problems.append(p(
    "pg-024", "intermediate", "Rotate array",
    "Rotate {1,2,3,4,5,6,7} right by 3. Print the array.",
    "Reverse the whole array, reverse first k, reverse the rest. **O(n)** extra O(1). k %= n.",
    "[5, 6, 7, 1, 2, 3, 4]",
    {
        "java": SJ("""        int[] a = {1,2,3,4,5,6,7};
        rotate(a, 3);
        System.out.println(java.util.Arrays.toString(a));
    }
    static void rotate(int[] a, int k) {
        // write your code
    """),
        "kotlin": SK("""    val a = intArrayOf(1,2,3,4,5,6,7)
    rotate(a, 3)
    println(a.contentToString())
}
fun rotate(a: IntArray, k: Int) {
    // write your code
"""),
        "dart": SD("""  var a = [1, 2, 3, 4, 5, 6, 7];
  rotate(a, 3);
  print(a);
}

void rotate(List<int> a, int k) {
  // write your code
"""),
    },
    {
        "java": SJ("""        int[] a = {1,2,3,4,5,6,7};
        rotate(a, 3);
        System.out.println(java.util.Arrays.toString(a));
    }
    static void rotate(int[] a, int k) {
        k %= a.length;
        rev(a, 0, a.length - 1);
        rev(a, 0, k - 1);
        rev(a, k, a.length - 1);
    }
    static void rev(int[] a, int i, int j) {
        while (i < j) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }
    """),
        "kotlin": SK("""    val a = intArrayOf(1,2,3,4,5,6,7)
    rotate(a, 3)
    println(a.contentToString())
}
fun rotate(a: IntArray, k0: Int) {
    val k = k0 % a.size
    fun rev(i0: Int, j0: Int) {
        var i = i0; var j = j0
        while (i < j) { val t = a[i]; a[i] = a[j]; a[j] = t; i++; j-- }
    }
    rev(0, a.lastIndex)
    rev(0, k - 1)
    rev(k, a.lastIndex)
"""),
        "dart": SD("""  var a = [1, 2, 3, 4, 5, 6, 7];
  rotate(a, 3);
  print(a);
}

void rotate(List<int> a, int k0) {
  var k = k0 % a.length;
  void rev(int i, int j) {
    while (i < j) {
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
      i++;
      j--;
    }
  }
  rev(0, a.length - 1);
  rev(0, k - 1);
  rev(k, a.length - 1);
"""),
    },
    [{"pattern": "new int\\[|IntArray\\(|List\\.filled", "message": "An extra array is acceptable O(n) space. The classic in-place trick is three reverses."}],
    ["arrays"],
))

def complete(java, kotlin, dart):
    return {"java": java.strip() + "\n", "kotlin": kotlin.strip() + "\n", "dart": dart.strip() + "\n"}

problems.append(p(
    "pg-025", "intermediate", "Contains duplicate",
    "Print whether {1,2,3,1} and {1,2,3,4} contain a duplicate.",
    "Put values in a HashSet while scanning. If `add` returns false, a duplicate exists. **O(n)** time, **O(n)** space. Sorting then adjacent compare is O(n log n) extra O(1).",
    "true\nfalse",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(dup(new int[]{1,2,3,1}));
        System.out.println(dup(new int[]{1,2,3,4}));
    }
    static boolean dup(int[] a) {
        return false;
    }
}""",
        """fun main() {
    println(dup(intArrayOf(1,2,3,1)))
    println(dup(intArrayOf(1,2,3,4)))
}
fun dup(a: IntArray): Boolean {
    return false
}""",
        """void main() {
  print(dup([1, 2, 3, 1]));
  print(dup([1, 2, 3, 4]));
}
bool dup(List<int> a) {
  return false;
}""",
    ),
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(dup(new int[]{1,2,3,1}));
        System.out.println(dup(new int[]{1,2,3,4}));
    }
    static boolean dup(int[] a) {
        Set<Integer> seen = new HashSet<>();
        for (int v : a) if (!seen.add(v)) return true;
        return false;
    }
}""",
        """fun main() {
    println(dup(intArrayOf(1,2,3,1)))
    println(dup(intArrayOf(1,2,3,4)))
}
fun dup(a: IntArray): Boolean {
    val seen = HashSet<Int>()
    for (v in a) if (!seen.add(v)) return true
    return false
}""",
        """void main() {
  print(dup([1, 2, 3, 1]));
  print(dup([1, 2, 3, 4]));
}
bool dup(List<int> a) {
  var seen = <int>{};
  for (var v in a) {
    if (!seen.add(v)) return true;
  }
  return false;
}""",
    ),
    [{"pattern": "for \\([^)]+\\)[\\s\\S]{0,60}for \\(", "message": "Nested comparisons are O(n²). A HashSet is the usual O(n) interview answer."}],
    ["hashing", "arrays"],
))

problems.append(p(
    "pg-026", "intermediate", "Best time to buy stock",
    "One buy and one sell. Print max profit for {7,1,5,3,6,4} and for {7,6,4,3,1} (0 if none).",
    "Track the lowest price so far and the best `price - low`. **O(n)**. Nested buy/sell loops are O(n²).",
    "5\n0",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(profit(new int[]{7,1,5,3,6,4}));
        System.out.println(profit(new int[]{7,6,4,3,1}));
    }
    static int profit(int[] p) {
        return 0;
    }
}""",
        """fun main() {
    println(profit(intArrayOf(7,1,5,3,6,4)))
    println(profit(intArrayOf(7,6,4,3,1)))
}
fun profit(p: IntArray): Int {
    return 0
}""",
        """void main() {
  print(profit([7, 1, 5, 3, 6, 4]));
  print(profit([7, 6, 4, 3, 1]));
}
int profit(List<int> p) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(profit(new int[]{7,1,5,3,6,4}));
        System.out.println(profit(new int[]{7,6,4,3,1}));
    }
    static int profit(int[] p) {
        int low = p[0], best = 0;
        for (int x : p) {
            if (x < low) low = x;
            int g = x - low;
            if (g > best) best = g;
        }
        return best;
    }
}""",
        """fun main() {
    println(profit(intArrayOf(7,1,5,3,6,4)))
    println(profit(intArrayOf(7,6,4,3,1)))
}
fun profit(p: IntArray): Int {
    var low = p[0]
    var best = 0
    for (x in p) {
        if (x < low) low = x
        best = maxOf(best, x - low)
    }
    return best
}""",
        """void main() {
  print(profit([7, 1, 5, 3, 6, 4]));
  print(profit([7, 6, 4, 3, 1]));
}
int profit(List<int> p) {
  var low = p[0];
  var best = 0;
  for (var x in p) {
    if (x < low) low = x;
    var g = x - low;
    if (g > best) best = g;
  }
  return best;
}""",
    ),
    [{"pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(", "message": "Trying every buy/sell pair is O(n²). Track min-so-far in one pass."}],
    ["arrays", "greedy"],
))

problems.append(p(
    "pg-027", "intermediate", "Climbing stairs",
    "You can take 1 or 2 steps. Print the number of ways to climb 2 stairs and 5 stairs.",
    "Classic DP: `ways(n) = ways(n-1) + ways(n-2)` with ways(1)=1, ways(2)=2. Same recurrence as Fibonacci. **O(n)** with two rolling variables; naive recursion is exponential.",
    "2\n8",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(ways(2));
        System.out.println(ways(5));
    }
    static int ways(int n) {
        return 0;
    }
}""",
        """fun main() {
    println(ways(2))
    println(ways(5))
}
fun ways(n: Int): Int {
    return 0
}""",
        """void main() {
  print(ways(2));
  print(ways(5));
}
int ways(int n) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(ways(2));
        System.out.println(ways(5));
    }
    static int ways(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
}""",
        """fun main() {
    println(ways(2))
    println(ways(5))
}
fun ways(n: Int): Int {
    if (n <= 2) return n
    var a = 1
    var b = 2
    for (i in 3..n) {
        val c = a + b
        a = b
        b = c
    }
    return b
}""",
        """void main() {
  print(ways(2));
  print(ways(5));
}
int ways(int n) {
  if (n <= 2) return n;
  var a = 1, b = 2;
  for (var i = 3; i <= n; i++) {
    var c = a + b;
    a = b;
    b = c;
  }
  return b;
}""",
    ),
    [{"pattern": "ways\\(n - 1\\)\\s*\\+\\s*ways\\(n - 2\\)", "message": "Unmemoized recursion is exponential. Use a loop or memoize."}],
    ["dp"],
))

problems.append(p(
    "pg-028", "basic", "GCD",
    "Print gcd(48, 18) and gcd(7, 13).",
    "Euclidean algorithm: `gcd(a,b) = gcd(b, a % b)` until b is 0. **O(log min(a,b))**. Subtract-loop versions work but are slower.",
    "6\n1",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(gcd(48, 18));
        System.out.println(gcd(7, 13));
    }
    static int gcd(int a, int b) {
        return 0;
    }
}""",
        """fun main() {
    println(gcd(48, 18))
    println(gcd(7, 13))
}
fun gcd(a: Int, b: Int): Int {
    return 0
}""",
        """void main() {
  print(gcd(48, 18));
  print(gcd(7, 13));
}
int gcd(int a, int b) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(gcd(48, 18));
        System.out.println(gcd(7, 13));
    }
    static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}""",
        """fun main() {
    println(gcd(48, 18))
    println(gcd(7, 13))
}
fun gcd(a0: Int, b0: Int): Int {
    var a = a0
    var b = b0
    while (b != 0) {
        val t = a % b
        a = b
        b = t
    }
    return a
}""",
        """void main() {
  print(gcd(48, 18));
  print(gcd(7, 13));
}
int gcd(int a, int b) {
  while (b != 0) {
    var t = a % b;
    a = b;
    b = t;
  }
  return a;
}""",
    ),
    [{"pattern": "for \\(int i = Math.min", "message": "Scanning down from min(a,b) is slower than Euclid's modulo loop."}],
    ["math"],
))

problems.append(p(
    "pg-029", "basic", "Prime check",
    "Print whether 2, 27, and 29 are prime (true/false per line).",
    "Trial division up to √n, skip evens after 2. **O(√n)**. Checking every integer to n-1 is the version they will ask you to improve.",
    "true\nfalse\ntrue",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(prime(2));
        System.out.println(prime(27));
        System.out.println(prime(29));
    }
    static boolean prime(int n) {
        return false;
    }
}""",
        """fun main() {
    println(prime(2))
    println(prime(27))
    println(prime(29))
}
fun prime(n: Int): Boolean {
    return false
}""",
        """void main() {
  print(prime(2));
  print(prime(27));
  print(prime(29));
}
bool prime(int n) {
  return false;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(prime(2));
        System.out.println(prime(27));
        System.out.println(prime(29));
    }
    static boolean prime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i * i <= n; i += 2) if (n % i == 0) return false;
        return true;
    }
}""",
        """fun main() {
    println(prime(2))
    println(prime(27))
    println(prime(29))
}
fun prime(n: Int): Boolean {
    if (n < 2) return false
    if (n == 2) return true
    if (n % 2 == 0) return false
    var i = 3
    while (i * i <= n) {
        if (n % i == 0) return false
        i += 2
    }
    return true
}""",
        """void main() {
  print(prime(2));
  print(prime(27));
  print(prime(29));
}
bool prime(int n) {
  if (n < 2) return false;
  if (n == 2) return true;
  if (n % 2 == 0) return false;
  var i = 3;
  while (i * i <= n) {
    if (n % i == 0) return false;
    i += 2;
  }
  return true;
}""",
    ),
    [{"pattern": "i < n(;|\\)| )", "message": "Looping to n-1 is O(n). Stop at i*i <= n."}],
    ["math"],
))

problems.append(p(
    "pg-030", "basic", "Second largest",
    "Print the second-largest distinct value in {10, 5, 10, 8, 9}.",
    "One pass: keep `first` and `second`. Skip values equal to first so duplicates of the max don't count. **O(n)**. Sorting is the slower shortcut.",
    "9",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(second(new int[]{10,5,10,8,9}));
    }
    static int second(int[] a) {
        return 0;
    }
}""",
        """fun main() {
    println(second(intArrayOf(10,5,10,8,9)))
}
fun second(a: IntArray): Int {
    return 0
}""",
        """void main() {
  print(second([10, 5, 10, 8, 9]));
}
int second(List<int> a) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(second(new int[]{10,5,10,8,9}));
    }
    static int second(int[] a) {
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int v : a) {
            if (v > first) { second = first; first = v; }
            else if (v > second && v != first) second = v;
        }
        return second;
    }
}""",
        """fun main() {
    println(second(intArrayOf(10,5,10,8,9)))
}
fun second(a: IntArray): Int {
    var first = Int.MIN_VALUE
    var sec = Int.MIN_VALUE
    for (v in a) {
        when {
            v > first -> { sec = first; first = v }
            v > sec && v != first -> sec = v
        }
    }
    return sec
}""",
        """void main() {
  print(second([10, 5, 10, 8, 9]));
}
int second(List<int> a) {
  var first = -0x3fffffff;
  var sec = -0x3fffffff;
  for (var v in a) {
    if (v > first) {
      sec = first;
      first = v;
    } else if (v > sec && v != first) {
      sec = v;
    }
  }
  return sec;
}""",
    ),
    [{"pattern": "sort\\(", "message": "Sorting is O(n log n). Track the top two values in one pass."}],
    ["arrays"],
))

problems.append(p(
    "pg-031", "intermediate", "Merge sorted arrays",
    "Merge {1,3,5} and {2,4,6,7} into one sorted array and print it.",
    "Two pointers on already-sorted inputs. **O(n+m)**. Concatenate-and-sort is the weaker answer.",
    "[1, 2, 3, 4, 5, 6, 7]",
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(merge(new int[]{1,3,5}, new int[]{2,4,6,7})));
    }
    static int[] merge(int[] a, int[] b) {
        return new int[0];
    }
}""",
        """fun main() {
    println(merge(intArrayOf(1,3,5), intArrayOf(2,4,6,7)).contentToString())
}
fun merge(a: IntArray, b: IntArray): IntArray {
    return intArrayOf()
}""",
        """void main() {
  print(merge([1, 3, 5], [2, 4, 6, 7]));
}
List<int> merge(List<int> a, List<int> b) {
  return [];
}""",
    ),
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(merge(new int[]{1,3,5}, new int[]{2,4,6,7})));
    }
    static int[] merge(int[] a, int[] b) {
        int[] out = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
        while (i < a.length) out[k++] = a[i++];
        while (j < b.length) out[k++] = b[j++];
        return out;
    }
}""",
        """fun main() {
    println(merge(intArrayOf(1,3,5), intArrayOf(2,4,6,7)).contentToString())
}
fun merge(a: IntArray, b: IntArray): IntArray {
    val out = IntArray(a.size + b.size)
    var i = 0
    var j = 0
    var k = 0
    while (i < a.size && j < b.size) out[k++] = if (a[i] <= b[j]) a[i++] else b[j++]
    while (i < a.size) out[k++] = a[i++]
    while (j < b.size) out[k++] = b[j++]
    return out
}""",
        """void main() {
  print(merge([1, 3, 5], [2, 4, 6, 7]));
}
List<int> merge(List<int> a, List<int> b) {
  var out = <int>[];
  var i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.add(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  while (i < a.length) out.add(a[i++]);
  while (j < b.length) out.add(b[j++]);
  return out;
}""",
    ),
    [{"pattern": "sort\\(", "message": "Inputs are already sorted — two pointers merge in O(n+m). Don't sort the concatenation."}],
    ["arrays", "two-pointers"],
))

problems.append(p(
    "pg-032", "intermediate", "Remove duplicates",
    "From sorted {1,1,2,2,2,3} print the unique prefix as an array (order kept).",
    "Read/write pointers on a sorted array: copy when the value changes. **O(n)** in-place. A HashSet would also unique but uses extra memory and can scramble order if you rebuild from the set.",
    "[1, 2, 3]",
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] a = {1,1,2,2,2,3};
        int n = unique(a);
        System.out.println(Arrays.toString(Arrays.copyOf(a, n)));
    }
    static int unique(int[] a) {
        return 0;
    }
}""",
        """fun main() {
    val a = intArrayOf(1,1,2,2,2,3)
    val n = unique(a)
    println(a.copyOf(n).contentToString())
}
fun unique(a: IntArray): Int {
    return 0
}""",
        """void main() {
  var a = [1, 1, 2, 2, 2, 3];
  var n = unique(a);
  print(a.sublist(0, n));
}
int unique(List<int> a) {
  return 0;
}""",
    ),
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] a = {1,1,2,2,2,3};
        int n = unique(a);
        System.out.println(Arrays.toString(Arrays.copyOf(a, n)));
    }
    static int unique(int[] a) {
        if (a.length == 0) return 0;
        int w = 1;
        for (int i = 1; i < a.length; i++) if (a[i] != a[w - 1]) a[w++] = a[i];
        return w;
    }
}""",
        """fun main() {
    val a = intArrayOf(1,1,2,2,2,3)
    val n = unique(a)
    println(a.copyOf(n).contentToString())
}
fun unique(a: IntArray): Int {
    if (a.isEmpty()) return 0
    var w = 1
    for (i in 1 until a.size) if (a[i] != a[w - 1]) a[w++] = a[i]
    return w
}""",
        """void main() {
  var a = [1, 1, 2, 2, 2, 3];
  var n = unique(a);
  print(a.sublist(0, n));
}
int unique(List<int> a) {
  if (a.isEmpty) return 0;
  var w = 1;
  for (var i = 1; i < a.length; i++) {
    if (a[i] != a[w - 1]) a[w++] = a[i];
  }
  return w;
}""",
    ),
    [{"pattern": "HashSet|toSet\\(", "message": "A set works but uses extra memory. On a sorted array the two-pointer write is O(1) extra space."}],
    ["arrays", "two-pointers"],
))

problems.append(p(
    "pg-033", "basic", "Reverse integer",
    "Print reverse of 123 and of -450 (sign kept, trailing zeros dropped).",
    "Pop digits with `% 10` and build `rev = rev * 10 + d`. In interviews mention 32-bit overflow checks. **O(log n)** digits.",
    "321\n-54",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(rev(123));
        System.out.println(rev(-450));
    }
    static int rev(int x) {
        return 0;
    }
}""",
        """fun main() {
    println(rev(123))
    println(rev(-450))
}
fun rev(x: Int): Int {
    return 0
}""",
        """void main() {
  print(rev(123));
  print(rev(-450));
}
int rev(int x) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(rev(123));
        System.out.println(rev(-450));
    }
    static int rev(int x) {
        int sign = x < 0 ? -1 : 1;
        x = Math.abs(x);
        int r = 0;
        while (x > 0) {
            r = r * 10 + x % 10;
            x /= 10;
        }
        return sign * r;
    }
}""",
        """fun main() {
    println(rev(123))
    println(rev(-450))
}
fun rev(x: Int): Int {
    val sign = if (x < 0) -1 else 1
    var n = kotlin.math.abs(x)
    var r = 0
    while (n > 0) {
        r = r * 10 + n % 10
        n /= 10
    }
    return sign * r
}""",
        """void main() {
  print(rev(123));
  print(rev(-450));
}
int rev(int x) {
  var sign = x < 0 ? -1 : 1;
  var n = x.abs();
  var r = 0;
  while (n > 0) {
    r = r * 10 + n % 10;
    n ~/= 10;
  }
  return sign * r;
}""",
    ),
    [{"pattern": "String\\.valueOf|toString\\(\\)[\\s\\S]*reverse", "message": "String reverse works here but they often want the arithmetic version plus overflow talk."}],
    ["math"],
))

problems.append(p(
    "pg-034", "intermediate", "Majority element",
    "Print the majority element (> n/2 times) in {2,2,1,1,1,2,2}.",
    "Boyer-Moore: one candidate, one count. **O(n)** time, **O(1)** space. HashMap counting is the easier O(n) extra-space answer.",
    "2",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(majority(new int[]{2,2,1,1,1,2,2}));
    }
    static int majority(int[] a) {
        return 0;
    }
}""",
        """fun main() {
    println(majority(intArrayOf(2,2,1,1,1,2,2)))
}
fun majority(a: IntArray): Int {
    return 0
}""",
        """void main() {
  print(majority([2, 2, 1, 1, 1, 2, 2]));
}
int majority(List<int> a) {
  return 0;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(majority(new int[]{2,2,1,1,1,2,2}));
    }
    static int majority(int[] a) {
        int cand = a[0], count = 0;
        for (int v : a) {
            if (count == 0) cand = v;
            count += (v == cand) ? 1 : -1;
        }
        return cand;
    }
}""",
        """fun main() {
    println(majority(intArrayOf(2,2,1,1,1,2,2)))
}
fun majority(a: IntArray): Int {
    var cand = a[0]
    var count = 0
    for (v in a) {
        if (count == 0) cand = v
        count += if (v == cand) 1 else -1
    }
    return cand
}""",
        """void main() {
  print(majority([2, 2, 1, 1, 1, 2, 2]));
}
int majority(List<int> a) {
  var cand = a[0];
  var count = 0;
  for (var v in a) {
    if (count == 0) cand = v;
    count += v == cand ? 1 : -1;
  }
  return cand;
}""",
    ),
    [{"pattern": "HashMap|groupingBy|Map<", "message": "Counting in a map is correct O(n) extra space. Boyer-Moore is the O(1)-space follow-up."}],
    ["arrays", "voting"],
))

problems.append(p(
    "pg-035", "basic", "Power of two",
    "Print whether 1, 16, and 18 are powers of two.",
    "`n > 0 && (n & (n - 1)) == 0` because a power of two has a single bit set. Looping with `/2` is fine if you mention the bit trick.",
    "true\ntrue\nfalse",
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(pow2(1));
        System.out.println(pow2(16));
        System.out.println(pow2(18));
    }
    static boolean pow2(int n) {
        return false;
    }
}""",
        """fun main() {
    println(pow2(1))
    println(pow2(16))
    println(pow2(18))
}
fun pow2(n: Int): Boolean {
    return false
}""",
        """void main() {
  print(pow2(1));
  print(pow2(16));
  print(pow2(18));
}
bool pow2(int n) {
  return false;
}""",
    ),
    complete(
        """public class Main {
    public static void main(String[] args) {
        System.out.println(pow2(1));
        System.out.println(pow2(16));
        System.out.println(pow2(18));
    }
    static boolean pow2(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}""",
        """fun main() {
    println(pow2(1))
    println(pow2(16))
    println(pow2(18))
}
fun pow2(n: Int) = n > 0 && (n and (n - 1)) == 0""",
        """void main() {
  print(pow2(1));
  print(pow2(16));
  print(pow2(18));
}
bool pow2(int n) => n > 0 && (n & (n - 1)) == 0;""",
    ),
    [{"pattern": "Math\\.pow|pow\\(2", "message": "Floating pow can mis-round. Prefer the bit check or integer doubling/halving."}],
    ["bits", "math"],
))

problems.append(p(
    "pg-036", "intermediate", "Intersection of arrays",
    "Print the intersection of {1,2,2,1} and {2,2} as a sorted unique list.",
    "Put one array in a set, walk the other, collect hits in a result set (unique). **O(n+m)**. Nested loops are O(n·m).",
    "[2]",
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(intersect(new int[]{1,2,2,1}, new int[]{2,2}));
    }
    static List<Integer> intersect(int[] a, int[] b) {
        return List.of();
    }
}""",
        """fun main() {
    println(intersect(intArrayOf(1,2,2,1), intArrayOf(2,2)))
}
fun intersect(a: IntArray, b: IntArray): List<Int> {
    return emptyList()
}""",
        """void main() {
  print(intersect([1, 2, 2, 1], [2, 2]));
}
List<int> intersect(List<int> a, List<int> b) {
  return [];
}""",
    ),
    complete(
        """import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println(intersect(new int[]{1,2,2,1}, new int[]{2,2}));
    }
    static List<Integer> intersect(int[] a, int[] b) {
        Set<Integer> inA = new HashSet<>();
        for (int v : a) inA.add(v);
        Set<Integer> out = new TreeSet<>();
        for (int v : b) if (inA.contains(v)) out.add(v);
        return new ArrayList<>(out);
    }
}""",
        """fun main() {
    println(intersect(intArrayOf(1,2,2,1), intArrayOf(2,2)))
}
fun intersect(a: IntArray, b: IntArray): List<Int> {
    val inA = a.toSet()
    return b.filter { it in inA }.toSortedSet().toList()
}""",
        """void main() {
  print(intersect([1, 2, 2, 1], [2, 2]));
}
List<int> intersect(List<int> a, List<int> b) {
  var inA = a.toSet();
  var out = b.where(inA.contains).toSet().toList()..sort();
  return out;
}""",
    ),
    [{"pattern": "for \\([^)]+\\)[\\s\\S]{0,80}for \\(", "message": "Nested scans are O(n·m). Two sets (or a sort+two-pointer) is the expected answer."}],
    ["hashing", "arrays"],
))

out = Path("/Users/enfecjatin/LetsExplore/data/playground.js")
out.write_text(
    "window.QA_BANK = window.QA_BANK || {};\nwindow.QA_BANK.playground = "
    + json.dumps(problems, indent=2, ensure_ascii=False)
    + ";\n",
    encoding="utf-8",
)
print("problems", len(problems), "pdf", sum(1 for x in problems if x.get("pdfTopic")), "->", out)

issues = []
for item in problems:
    for kind in ("starter", "solution"):
        for lang, code in item[kind].items():
            if code.count("{") != code.count("}"):
                issues.append(f"{item['id']} {kind} {lang} braces {code.count('{')}/{code.count('}')}")
            if lang == "java" and "public class Main" not in code:
                issues.append(f"{item['id']} {kind} java missing class")
            if lang == "java" and "void main" not in code:
                issues.append(f"{item['id']} {kind} java missing main")
            if lang == "kotlin" and "fun main" not in code:
                issues.append(f"{item['id']} {kind} kotlin missing main")
            if lang == "dart" and "void main" not in code:
                issues.append(f"{item['id']} {kind} dart missing main")
if issues:
    print("ISSUES")
    print("\n".join(issues))
    raise SystemExit(1)
print("structure ok")

