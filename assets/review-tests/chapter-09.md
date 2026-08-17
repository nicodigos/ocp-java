---
chapter: 9
title: "Collections and Generics"
questionCount: 23
sourceQuestionPdfPages: "832-842"
sourceAnswerPdfPages: "1378-1384"
---

# Chapter 9: Collections and Generics

## Question 1

### Prompt

Suppose you need to display a collection of products for sale,
    which may contain duplicates. Additionally, you have a collection
    of sales that you need to track, sorted by the natural order of the
    sale ID, and you need to retrieve the text of each. Which two of the
    following classes best suit your needs for each of these scenarios?
    (Choose two.)
      A. ArrayList
      B. HashMap
      C. HashSet
      D. LinkedList
      E. SequencedTreeSet
      F. TreeMap

### Correct answer

A, F

### Explanation

Option E is incorrect for both scenarios, as SequencedTreeSet does not exist. For the first scenario, the answer needs to implement List because the scenario allows duplicates, narrowing it down to options A and D. Option A is a better answer than option D because LinkedList is both a List and a Queue, and you just need a regular List. For the second scenario, the answer needs to implement Map because you are dealing with key/value pairs per the unique id field. This narrows it down to options B and F. Since the question talks about ordering, you need the TreeMap. Therefore, the answer is option F.

## Question 2

### Prompt

Which of the following are true? (Choose all that apply.)

    12: List<?> q = List.of("mouse", "parrot");
    13: var v = List.of("mouse", "parrot");
    14:
    15: q.removeIf(String::isEmpty);
    16: q.removeIf(s -> s.length() == 4);
    17: v.removeIf(String::isEmpty);
    18: v.removeIf(s -> s.length() == 4);
      A. This code compiles and runs without error.
      B. Exactly one of these lines contains a compiler error.
      C. Exactly two of these lines contain a compiler error.
      D. Exactly three of these lines contain a compiler error.
      E. Exactly four of these lines contain a compiler error.
    F. If any lines with compiler errors are removed, this code runs
        without throwing an exception.
    G. If any lines with compiler errors are removed, this code throws
        an exception.

### Correct answer

C, G

### Explanation

Line 12 creates a List<?>, which means it is treated as if all the elements are of type Object rather than String. Lines 15 and 16 do not compile since they call the String methods isEmpty() and length(), which are not defined on Object. Line 13 creates a List<String> because var uses the type that it deduces from the context. Lines 17 and 18 do compile. However, List.of() creates an immutable list, so both of those lines would throw an UnsupportedOperationException if run. Therefore, options C and G are correct.

## Question 3

### Prompt

What is the result of the following statements?

   3:  var greetings = new ArrayDeque<String>();
   4:  greetings.offerLast("hello");
   5:  greetings.offerLast("hi");
   6:  greetings.offerFirst("ola");
   7:  greetings.pop();
   8:  greetings.peek();
   9:  while (greetings.peek() != null)
   10:    System.out.print(greetings.pop());
    A. hello
    B. hellohi
    C. hellohiola
    D. hiola
    E. The code does not compile.
    F. An exception is thrown.

### Correct answer

B

### Explanation

This is a double-ended queue. On lines 4 and 5, we add to the back, giving us [hello, hi]. On line 6, we add to the front and have [ola, hello, hi]. On line 7, we remove the first element, which is "ola". On line 8, we look at the new first element ("hello") but don’t remove it. On lines 9 and 10, we remove each element in turn until no elements are left, printing hello and hi together, which makes option B the answer.

## Question 4

### Prompt

Which of these statements compile? (Choose all that apply.)
    A. HashSet<Number> hs = new HashSet<Integer>();
    B. HashSet<? super ClassCastException> set = new HashSet<Exception>
        ();
    C. List<> list = new ArrayList<String>();
    D. List<Object> values = new HashSet<Object>();
    E. List<Object> objects = new ArrayList<? extends Object>();
    F. Map<String, ? extends Number> hm = new HashMap<String, Integer>();

### Correct answer

B, F

### Explanation

Option A does not compile because the generic types are not compatible. We could say HashSet<? extends Number> hs2 = new HashSet<Integer>();. Option B uses a lower bound, so it allows superclass generic types. Option C does not compile because the diamond operator is allowed only on the right side. Option D does not compile because a Set is not a List. Option E does not compile because upper bounds are not allowed when instantiating the type. Finally, option F does compile because the upper bound is on the correct side of the =.

## Question 5

### Prompt

What is the result of the following code?

   1: public record Hello<T>(T t) {
   2:    public Hello(T t) { this.t = t; }
   3:    private <T> void println(T message) {
   4:       System.out.print(t + "-" + message);
   5:    }
   6:    public static void main(String[] args) {
   7:       new Hello<String>("hi").println(1);
   8:       new Hello("hola").println(true);
   9:    } }
    A. hi followed by a runtime exception.
    B. hi-1hola-true
    C. The first compiler error is on line 1.
    D. The first compiler error is on line 3.
    E. The first compiler error is on line 8.
     F. The first compiler error is on another line.

### Correct answer

B

### Explanation

The record compiles and runs without issue. Line 8 gives a compiler warning for not using generics but not a compiler error. Line 7 creates the Hello class with the generic type String. It also passes an int to the println() method, which gets autoboxed into an Integer. While the println() method takes a generic parameter of type T, it is not the same <T> defined for the class on line 1. Instead, it is a different T defined as part of the method declaration on line 3. Therefore, the String argument on line 7 applies only to the class. The method can take any object as a parameter, including autoboxed primitives. Line 8 creates the Hello class with the generic type Object since no type is specified for that instance. It passes a boolean to println(), which gets autoboxed into a Boolean. The result is that hi-1hola-true is printed, making option B correct.

## Question 6

### Prompt

Which of the following can fill in the blank to print [7, 5, 3]?
   (Choose all that apply.)

   8:  public record Platypus(String name, int beakLength) {
   9:     @Override public String toString() {return "" + beakLength;}
   10:
   11:    public static void main(String[] args) {
   12:       Platypus p1 = new Platypus("Paula", 3);
   13:       Platypus p2 = new Platypus("Peter", 5);
   14:       Platypus p3 = new Platypus("Peter", 7);
   15:
   16:       List<Platypus> list = Arrays.asList(p1, p2, p3);
   17:
   18:       Collections.sort(list, Comparator.comparing_______________);
   19:
   20:       System.out.println(list);
   21:    }
   22: }
    A.

        (Platypus::beakLength)
    B.

        (Platypus::beakLength).reversed()
    C.

        (Platypus::name)
           .thenComparing(Platypus::beakLength)
    D.

        (Platypus::name)
           .thenComparing(
           Comparator.comparing(Platypus::beakLength)
           .reversed())
    E.
        (Platypus::name)
           .thenComparingNumber(Platypus::beakLength)
           .reversed()
    F.

        (Platypus::name)
           .thenComparingInt(Platypus::beakLength)
           .reversed()

### Correct answer

B, F

### Explanation

We’re looking for a Comparator definition that sorts in descending order by beakLength. Option A is incorrect because it sorts in ascending order by beakLength. Similarly, option C is incorrect because it sorts by beakLength in ascending order within those matches that have the same name. Option E is incorrect because there is no thenComparingNumber() method. Option B is a correct answer, as it sorts by beakLength in descending order. Options D and F are trickier. First, notice that we can call either thenComparing() or thenComparingInt() because the former will simply autobox the int into an Integer. Then observe what reversed() applies to. Option D is incorrect because it sorts by name in ascending order and only reverses the beak length of those with the same name. Option F creates a comparator that sorts by name in ascending order and then by beak size in ascending order. Finally, it reverses the result. This is just what we want, so option F is correct.

## Question 7

### Prompt

Which of the following method signatures are valid overrides of
   the hairy() method in the Alpaca class? (Choose all that apply.)

   import java.util.*;

   public class Alpaca {
      public List<String> hairy(List<String> list) { return null; }
   }
    A. public List<String> hairy(List<CharSequence> list) { return null;
        }
    B. public List<String> hairy(List<String> list) { return null; }
    C. public List<String> hairy(List<Integer> list) { return null; }
    D. public List<CharSequence> hairy(List<String> list) { return null;
        }
    E. public Object hairy(List<String> list) { return null; }
    F. public ArrayList<String> hairy(List<String> list) { return null; }

### Correct answer

B, F

### Explanation

A valid override of a method with generic arguments must have a return type that is covariant, with matching generic type parameters. Options D and E are incorrect because the return type is too broad. Additionally, the generic arguments must have the same signature with the same generic types. This eliminates options A and C. The remaining options are correct, making the answer options B and F.

## Question 8

### Prompt

Which of the following fills in the blank, allowing the code to
   compile and run without issue?

   11: SequencedCollection<String> animals = new _____________<>();
   12: animals.addFirst("lions");
   13: animals.addLast("tigers");
   14: for(var a : animals)
   15:    System.out.println(a);
   16: System.out.println(animals.get(0));
    A. HashSet
    B. LinkedList
    C. TreeSetMap
    D. HashMap
    E. None of the above

### Correct answer

E

### Explanation

There is no get(int) method defined in SequencedCollection, meaning line 16 does not compile, regardless of what is placed in the blank. For this reason, option E is correct. If line 16 was removed or corrected to use getFirst(), then LinkedList would be the correct answer.

## Question 9

### Prompt

What is the result of the following program?
    3:  public class MyComparator implements Comparator<String> {
    4:     public int compare(String a, String b) {
    5:        return b.toLowerCase().compareTo(a.toLowerCase());
    6:     }
    7:     public static void main(String[] args) {
    8:        String[] values = { "123", "Abb", "aab" };
    9:        Arrays.sort(values, new MyComparator());
    10:       for (var s: values)
    11:          System.out.print(s + " ");
    12:    }
    13: }
      A. Abb aab 123
      B. aab Abb 123
      C. 123 Abb aab
      D. 123 aab Abb
      E. The code does not compile.
      F. A runtime exception is thrown.

### Correct answer

A

### Explanation

The array is sorted using MyComparator, which sorts the elements in reverse alphabetical order in a case- insensitive fashion. Normally, numbers sort before letters. This code reverses that by calling the compareTo() method on b instead of a. Therefore, option A is correct.

## Question 10

### Prompt

Which of these statements can fill in the blank so that the Helper
    class compiles successfully? (Choose all that apply.)

    2:  public class Helper {
    3:     public static <U extends Exception>
    4:        void printException(U u) {
    5:
    6:        System.out.println(u.getMessage());
    7:     }
    8:     public static void main(String[] args) {
    9:        Helper.____________________________________________;
    10:    } }
      A. printException(new FileNotFoundException("A"))
      B. printException(new Exception("B"))
      C. <Throwable>printException(new Exception("C"))
      D. <NullPointerException>printException(new NullPointerException
          ("D"))
      E. printException(new Throwable("E"))

### Correct answer

A, B, D

### Explanation

The generic type must be Exception or a subclass of Exception since this is an upper bound, making options A and B correct. Options C and E are wrong because Throwable is a superclass of Exception. Additionally, option D is correct despite the odd syntax by explicitly listing the type. You should still be able to recognize it as acceptable.

## Question 11

### Prompt

Which of the following will compile when filling in the blank?
    (Choose all that apply.)

    var list = List.of(1, 2, 3);
    var set = Set.of(1, 2, 3);
    var map = Map.of(1, 2, 3, 4);
    ____________.forEach(System.out::println);
      A. list
      B. set
      C. map
      D. map.keys()
      E. map.keySet()
      F. map.values()
      G. map.valueSet()

### Correct answer

A, B, E, F

### Explanation

The forEach() method works with a Collection, such as List or a Set. Therefore, options A and B are correct. Additionally, options E and F return a Set and Collection, respectively, and can be used as well. Options D and G refer to methods that do not exist. Option C is tricky because a Map does have a forEach() method. However, it uses two lambda parameters rather than one. Since there is no matching System.out.println method, it does not compile.

## Question 12

### Prompt

Which of these statements can fill in the blank so that the Wildcard
    class compiles successfully? (Choose all that apply.)

    3:  public class Wildcard {
    4:     public void showSize(List<?> list) {
    5:        System.out.println(list.size());
    6:     }
    7:     public static void main(String[] args) {
    8:        Wildcard card = new Wildcard();
    9:        _________________________________________;
    10:       card.showSize(list);
    11:    } }
      A. List<?> list = new HashSet <String>()
      B. ArrayList<? super Date> list = new ArrayList<Date>()
      C. List<?> list = new ArrayList<?>()
      D. List<Exception> list = new LinkedList<java.io.IOException>()
      E. ArrayList <? extends Number> list = new ArrayList <Integer>()
      F. None of the above

### Correct answer

B, E

### Explanation

The showSize() method can take any type of List since it uses an unbounded wildcard. Option A is incorrect because it is a Set and not a List. Option C is incorrect because the wildcard is not allowed to be on the right side of an assignment. Option D is incorrect because the generic types are not compatible. Option B is correct because a lower-bounded wildcard allows that same type to be the generic. Option E is correct because Integer is a subclass of Number.

## Question 13

### Prompt

What is the result of the following program?

    3:  public record Sorted(int num, String text)
    4:     implements Comparable<Sorted>, Comparator<Sorted> {
    5:
    6:     public String toString() { return "" + num; }
    7:     public int compareTo(Sorted s) {
    8:        return text.compareTo(s.text);
    9:     }
    10:    public int compare(Sorted s1, Sorted s2) {
    11:       return s1.num - s2.num;
    12:    }
    13:    public static void main(String[] args) {
    14:       var s1 = new Sorted(88, "a");
    15:       var s2 = new Sorted(55, "b");
    16:       SequencedSet<Sorted> t1 = new TreeSet<Sorted>();
    17:       t1.add(s1); t1.add(s2);
    18:       var t2 = new TreeSet<Sorted>(s1);
    19:       t2.add(s1); t2.add(s2);
    20:       System.out.println(t1 + " " + t2);
    21:    } }
      A. [55, 88] [55, 88]
      B. [55, 88] [88, 55]
      C. [88, 55] [55, 88]
      D. [88, 55] [88, 55]
      E. The code does not compile.
      F. A runtime exception is thrown.

### Correct answer

C

### Explanation

This question is difficult because it defines both Comparable and Comparator on the same object. The t1 object doesn’t specify a Comparator, so it uses the Comparable object’s compareTo() method. This sorts by the text instance variable. The t2 object does specify a Comparator when calling the constructor, so it uses the compare() method, which sorts by the int. This gives us option C as the answer. Note that the SequencedSet reference on line 16 does not change the ordering, as the underlying object is still a TreeSet.

## Question 14

### Prompt

What is the result of the following code?

    Comparator<Integer> c1 = (o1, o2) -> o2 - o1;
    Comparator<Integer> c2 = Comparator.naturalOrder();
    Comparator<Integer> c3 = Comparator.reverseOrder();

    var list = Arrays.asList(5, 4, 7, 2);
    Collections.sort(list,_____________);
    Collections.reverse(list);
    Collections.reverse(list);
    System.out.println(Collections.binarySearch(list, 2));
      A. One or more of the comparators can fill in the blank so that
         the code prints 0.
      B. One or more of the comparators can fill in the blank so that
         the code prints 1.
      C. One or more of the comparators can fill in the blank so that
         the code prints 2.
      D. The result is undefined regardless of which comparator is
         used.
      E. A runtime exception is thrown regardless of which comparator
         is used.
      F. The code does not compile.

### Correct answer

A

### Explanation

When using binarySearch(), the List must be sorted in the same order that the Comparator uses. Since the binarySearch() method does not specify a Comparator explicitly, the default sort order is used. Only c2 uses that sort order and correctly identifies that the value 2 is at index 0. Therefore, option A is correct. The other two comparators sort in descending order. Therefore, the precondition for binarySearch() is not met, and the result is undefined for those two. The two calls to reverse() are just there to distract you; they cancel each other out.

## Question 15

### Prompt

Which of the following lines can be inserted to make the code
    compile? (Choose all that apply.)

    class W {}
    class X extends W {}
    class Y extends X {}
    class Z<Y> {
       // INSERT CODE HERE
    }
      A. W w1 = new W();
      B. W w2 = new X();
      C. W w3 = new Y();
      D. Y y1 = new W();
      E. Y y2 = new X();
      F. Y y3 = new Y();

### Correct answer

A, B

### Explanation

Y is both a class and a type parameter. This means that within the class Z, when we refer to Y, it uses the type parameter. All of the choices that mention class Y are incorrect because it no longer means the class Y. Only options A and B are correct.

## Question 16

### Prompt

Which options are true of the following code? (Choose all that
    apply.)

    _____________ q = new LinkedList<>();
    var u = Collections.unmodifiableCollection(q);
    q.add(10);
    q.add(12);
    q.remove(1);
    System.out.print(u);
      A. If we fill in the blank with List<Integer>, the output is [10].
      B. If we fill in the blank with Queue<Integer>, the output is [10].
      C. If we fill in the blank with var, the output is [10].
      D. One or more of the scenarios does not compile.
      E. One or more of the scenarios throws a runtime exception.

### Correct answer

A, C

### Explanation

A LinkedList implements both List and Queue. The List interface has a method to remove by index. Since this method exists, Java does not autobox to call the other method, making the output [10] and option A correct. Similarly, option C is correct because the method to remove an element by index is available on a LinkedList<Object> (which is what var represents here). By contrast, Queue has only the remove by object method, so Java does autobox there. Since the number 1 is not in the list, Java does not remove anything for the Queue, and the output is [10, 12]. The unmodifiableCollection() call is a distractor as it is an unmodifiable view and the underlying connection can be changed.

## Question 17

### Prompt

What is the result of the following code?

    4: Map m = new HashMap();
    5: m.put(123, "456");
    6: m.put("abc", "def");
    7: System.out.println(m.contains("123"));
      A. false
      B. true
      C. Compiler error on line 4.
      D. Compiler error on line 5.
      E. Compiler error on line 7.
      F. A runtime exception is thrown.

### Correct answer

E

### Explanation

This question looks like it is about generics, but it’s not. It is trying to see whether you noticed that Map does not have a contains() method. It has containsKey() and containsValue() instead, making option E the answer. If containsKey() were called, the answer would be false because 123 is an Integer key in the Map, rather than a String.

## Question 18

### Prompt

What is the result of the following code? (Choose all that apply.)

    48: var map = Map.of(1,2, 3, 6);
    49: var list = List.copyOf(map.entrySet());
    50:
    51: List<Integer> one = List.of(8, 16, 2);
    52: var copy = List.copyOf(one);
    53: var copyOfCopy = List.copyOf(copy);
    54: var thirdCopy = new ArrayList<>(copyOfCopy);
    55:
    56: list.replaceAll(x -> x * 2);
    57: one.replaceAll(x -> x * 2);
    58: thirdCopy.replaceAll(x -> x * 2);
    59:
    60: System.out.println(thirdCopy);
      A. One line fails to compile.
      B. Two lines fail to compile.
      C. Three lines fail to compile.
      D. The code compiles but throws an exception at runtime.
      E. If any lines with compiler errors are removed, the code throws
         an exception at runtime.
      F. If any lines with compiler errors are removed, the code prints
         [16, 32, 4].
      G. The code compiles and prints [16, 32, 4] without any changes.

### Correct answer

A, E

### Explanation

The key to this question is keeping track of the types. Line 48 is a Map<Integer, Integer>. Line 49 builds a List out of a Set of Entry objects, giving us List<Entry<Integer, Integer>>. This causes a compiler error on line 56 since we can’t multiply an Entry object by two. Lines 51–54 are all of type List<Integer>. The first three are immutable, and the one on line 54 is mutable. This means line 57 throws an UnsupportedOperationException since we attempt to modify the list. Line 58 would work if we could get to it. Since there is one compiler error and one runtime error, options A and E are correct.

## Question 19

### Prompt

What code change is needed to make the method compile,
    assuming there is no class named T?

    public static T identity(T t) {
       return t;
    }
      A. Add <T> after the public keyword.
      B. Add <T> after the static keyword.
      C. Add <T> after T.
      D. Add <?> after the public keyword.
      E. Add <?> after the static keyword.
      F. No change is required. The code already compiles.

### Correct answer

B

### Explanation

When using generic types in a method, the generic specification goes before the return type, so option B is correct.

## Question 20

### Prompt

Assuming keys are printed in order, what is the result of the
    following?
    var map = new HashMap<Integer, Integer>();
    map.put(1, 10);
    map.put(2, 20);
    map.put(3, null);
    map.merge(1, 3, (a,b) -> a + b);
    map.merge(3, 3, (a,b) -> a + b);
    System.out.println(map);
      A. {1=10, 2=20}
      B. {1=10, 2=20, 3=null}
      C. {1=10, 2=20, 3=3}
      D. {1=13, 2=20}
      E. {1=13, 2=20, 3=null}
      F. {1=13, 2=20, 3=3}
      G. The code does not compile.
      H. An exception is thrown.

### Correct answer

F

### Explanation

The first call to merge() calls the mapping function and adds the numbers to get 13. It then updates the map. The second call to merge() sees that the map currently has a null value for that key. It does not call the mapping function but instead replaces it with the new value of 3. Therefore, option F is correct.

## Question 21

### Prompt

Which of the following statements are true? (Choose all that
    apply.)
      A. Comparable is in the java.util package.
      B. Comparator is in the java.util package.
      C. compare() is in the Comparable interface.
      D. compare() is in the Comparator interface.
      E. compare() takes one method parameter.
      F. compare() takes two method parameters.

### Correct answer

B, D, F

### Explanation

The java.lang.Comparable interface is implemented on the object to compare. It specifies the compareTo() method, which takes one parameter. The java.util.Comparator interface specifies the compare() method, which takes two parameters. This gives us options B, D, and F as the answers.

## Question 22

### Prompt

What is the output of the following code snippet?

    21: SequencedMap<Integer, String> cats = new TreeMap<>();
    22: cats.put(3, "Snowball");
    23: cats.put(2, "Sugar");
    24: cats.put(1, "Minnie Mouse");
    25: cats.pollFirstEntry();
    26: var id = cats.lastEntry().getKey();
    27: cats.pollFirstEntry();
    28: System.out.print(cats.firstEntry().getValue());
      A. Minnie Mouse
      B. Snowball
      C. Sugar
      D. The code does not compile.
      E. The code compiles, but an exception is thrown at runtime.

### Correct answer

B

### Explanation

The code compiles and runs without issue, so options D and E are incorrect. A TreeMap sorts its items in the natural order of keys (not the values). Therefore, lines 25 and 27 remove [1, Minnie Mouse] and [2, Sugar], respectively. Line 26 has no impact on the map. On line 28, Snowball is printed, making option B correct. If line 26 were changed to use pollLastEntry(), then the map would be empty and line 28 would throw a NullPointerException trying to call getValue().

## Question 23

### Prompt

What is the output of the following code snippet?

    var fishes = new TreeSet<String>();
    fishes.add("Koi");
    fishes.addFirst("clown");
    fishes.add("carp");
    for(var fish : fishes)
       System.out.print(fish + ", ");
      A. carp, clown, Koi,
      B. carp, Koi, clown,
      C. clown, carp, Koi,
      D. clown, Koi, carp,
      E. Koi, carp, clown,
      F. Koi, clown, carp,
      G. The code does not compile.
      H. The code compiles but throws an exception at runtime.

### Correct answer

H

### Explanation

TreeSet is a SequencedSet, so it does have an addFirst() method. For this reason, the code does compile. Unfortunately, addFirst() is not supported at runtime, as inserting an element at the front of the TreeSet could violate the Comparator of the TreeSet. For this reason, the code program throws an UnsupportedOperationException on the third line.
