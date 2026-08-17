---
chapter: 10
title: "Streams"
questionCount: 21
sourceQuestionPdfPages: "896-905"
sourceAnswerPdfPages: "1385-1390"
---

# Chapter 10: Streams

## Question 1

### Prompt

What could be the output of the following?

    var stream = Stream.iterate("", (s) -> s + "1");
    System.out.println(stream.limit(2).map(x -> x + "2"));
      A. 12112
    B. 212
    C. 212112
    D. java.util.stream.ReferencePipeline$3@4517d9a3
    E. The code does not compile.
    F. An exception is thrown.
    G. The code hangs.

### Correct answer

D

### Explanation

No terminal operation is called, so the stream never executes. The first line creates an infinite stream reference. If the stream were executed on the second line, it would get the first two elements from that infinite stream, "" and "1", and add an extra character, resulting in "2" and "12", respectively. Since the stream is not executed, the reference is printed instead, giving us option D.

## Question 2

### Prompt

What could be the output of the following?

   Predicate<String> predicate = s -> s.startsWith("g");
   var stream1 = Stream.generate(() -> "growl!");
   var stream2 = Stream.generate(() -> "growl!");
   var b1 = stream1.anyMatch(predicate);
   var b2 = stream2.allMatch(predicate);
   System.out.println(b1 + " " + b2);
    A. true false
    B. true true
    C. java.util.stream.ReferencePipeline$3@4517d9a3
    D. The code does not compile.
    E. An exception is thrown.
    F. The code hangs.

### Correct answer

F

### Explanation

Both streams created in this code snippet are infinite streams. The variable b1 is set to true since anyMatch() terminates. Even though the stream is infinite, Java finds a match on the first element and stops looking. However, when allMatch() runs, it needs to keep going until the end of the stream since it keeps finding matches. Since all elements continue to match, the program hangs, making option F the answer.

## Question 3

### Prompt

What could be the output of the following?

   Predicate<String> predicate = s -> s.length()> 3;
   var stream = Stream.iterate("-",
       s -> ! s.isEmpty(), (s) -> s + s);
   var b1 = stream.noneMatch(predicate);
   var b2 = stream.anyMatch(predicate);
   System.out.println(b1 + " " + b2);
    A. false false
    B. false true
    C. java.util.stream.ReferencePipeline$3@4517d9a3
    D. The code does not compile.
    E. An exception is thrown.
    F. The code hangs.

### Correct answer

E

### Explanation

An infinite stream is generated where each element is twice as long as the previous one. While this code uses the three-parameter iterate() method, the condition is never false. The variable b1 is set to false because Java finds an element that matches when it gets to the element of length 4. However, the next line tries to operate on the same stream. Since streams can be used only once, this throws an exception that the “stream has already been operated upon or closed,” making option E the answer. If two different streams were used, the result would be option B.

## Question 4

### Prompt

Which are true statements about terminal operations in a stream that
   runs successfully? (Choose all that apply.)
    A. At most one terminal operation can exist in a stream pipeline.
    B. Terminal operations are a required part of the stream pipeline in
        order to get a result.
    C. Terminal operations have Stream as the return type.
    D. The peek() method is an example of a terminal operation.
    E. The referenced Stream may be used after calling a terminal
        operation.

### Correct answer

A, B

### Explanation

Terminal operations are the final step in a stream pipeline. Exactly one is required, because it triggers the execution of the entire stream pipeline. Therefore, options A and B are correct. Option C is true of intermediate operations rather than terminal operations. Option D is incorrect because peek() is an intermediate operation. Finally, option E is incorrect because once a stream pipeline is run, the Stream is marked invalid.

## Question 5

### Prompt

Which of the following sets result to 8.0? (Choose all that apply.)
    A.

        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> (int) x)
           .collect(Collectors.groupingBy(x -> x))
           .keySet()
           .stream()
           .collect(Collectors.averagingInt(x -> x));
    B.

        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> x)
           .boxed()
           .collect(Collectors.groupingBy(x -> x))
           .keySet()
           .stream()
           .collect(Collectors.averagingInt(x -> x));
    C.

        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> (int) x)
           .boxed()
           .collect(Collectors.groupingBy(x -> x))
           .keySet()
            .stream()
           .collect(Collectors.averagingInt(x -> x));
    D.

        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> (int) x)
           .collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
           .keySet()
           .stream()
           .collect(Collectors.averagingInt(x -> x));
    E.

        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> x)
           .boxed()
           .collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
           .keySet()
           .stream()
           .collect(Collectors.averagingInt(x -> x));
    F.
        double result = LongStream.of(6L, 8L, 10L)
           .mapToInt(x -> (int) x)
           .boxed()
           .collect(Collectors.groupingBy(x -> x, Collectors.toSet()))
           .keySet()
           .stream()
           .collect(Collectors.averagingInt(x -> x));

### Correct answer

C, F

### Explanation

Yes, we know this question is a lot of reading. Remember to look for the differences between options rather than studying each line. These options all have much in common. All of them start out with a LongStream and attempt to convert it to an IntStream. However, options B and E are incorrect because they do not cast the long to an int, resulting in a compiler error on the mapToInt() calls. Next, we hit the second difference. Options A and D are incorrect because they are missing boxed() before the collect() call. Since groupingBy() is creating a Collection, we need a nonprimitive Stream. The final difference is that option F specifies the type of Collection. This is allowed, though, meaning both options C and F are correct.

## Question 6

### Prompt

Which of the following methods can fill in the blank so that the code
   prints out false?

   var s = Stream.generate(() -> "meow");
   var match = s.__________(String::isEmpty);
   System.out.println(match);
    A. Only allMatch
    B. Only anyMatch
    C. Only noneMatch
    D. Both allMatch and anyMatch
    E. Both allMatch and noneMatch
    F. None of the above

### Correct answer

A

### Explanation

The anyMatch() and noneMatch() methods run infinitely. The stream has no way to know that a match won’t show up later. Option A is correct because only allMatch() makes it safe to return false as soon as one element passes through the stream that doesn’t match.

## Question 7

### Prompt

We have a method that returns a sorted list without changing the
   original. We want to rewrite it. Which of the following pairs can fill in
   the blanks in refactored() to do the same with streams?

   private static List<String> sort(List<String> list) {
      var copy = new ArrayList<String>(list);
      Collections.sort(copy, (a, b) -> b.compareTo(a));
      return copy;
   }

   private static List<String> refactored(List<String> list) {
      return list.stream()
         ._______((a, b) -> b.compareTo(a))
         .__________;
   }
    A. compare and toList()
    B. compare and sort()
    C. compareTo and toList()
    D. compareTo and sort()
    E. sorted and collect()
    F. sorted and collect(Collectors.toList())

### Correct answer

F

### Explanation

There is no Stream<T> method called compare() or compareTo(), so options A through D can be eliminated. The sorted() method is correct to use in a stream pipeline to return a sorted Stream and fills in the first blank. Either toList() or collect(Collectors.toList()) can fill in the second blank. Only one answer correctly fills in both blanks, and therefore option F is correct.

## Question 8

### Prompt

Which of the following are true given this declaration? (Choose all that
   apply.)

   var is = IntStream.empty();
      A. is.average() returns the type int.
      B. is.average() returns the type OptionalInt.
      C. is.findAny() returns the type int.
      D. is.findAny() returns the type OptionalInt.
      E. is.sum() returns the type int.
      F. is.sum() returns the type OptionalInt.

### Correct answer

D, E

### Explanation

The average() method returns an OptionalDouble since averages of any type can result in a fraction. Therefore, options A and B are both incorrect. The findAny() method returns an OptionalInt because there might not be any elements to find. Therefore, option D is correct. The sum() method returns an int rather than an OptionalInt because the sum of an empty stream is zero. Therefore, option E is correct.

## Question 9

### Prompt

Which of the following can we add after line 6 for the code to run
    without error and not produce any output? (Choose all that apply.)

    4: var stream = LongStream.of(1, 2, 3);
    5: var opt = stream.map(n -> n * 10)
    6:    .filter(n -> n < 5).findFirst();
      A.

         if (opt.isPresent())
            System.out.println(opt.get());
      B.

         if (opt.isPresent())
            System.out.println(opt.getAsLong());
      C.

         opt.ifPresent(System.out.println);
      D.

         opt.ifPresent(System.out::println);
      E. None of these; the code does not compile.
      F. None of these; line 6 throws an exception at runtime.

### Correct answer

B, D

### Explanation

Lines 4–6 compile and run without issue, making options E and F incorrect. Line 4 creates a stream of elements [1, 2, 3]. Line 5 maps the stream to a new stream with values [10, 20, 30]. Line 6 filters out all items not less than 5, which in this case results in an empty stream. For this reason, findFirst() returns an empty Optional. Option A does not compile. It would work for a Stream<T> object, but we have a LongStream and therefore need to call getAsLong(). Option C also does not compile, as it is missing the :: that would make it a method reference. Options B and D both compile and run without error, although neither produces any output at runtime since the stream is empty.

## Question 10

### Prompt

Given the four statements (L, M, N, O), select the order that would
    cause the code to output 10 lines.

    Stream.generate(() -> "1")
       L: .filter(x -> x.length()> 1)
       M: .forEach(System.out::println)
       N: .limit(10)
       O: .peek(System.out::println)
    ;
      A. L, N
      B. L, N, O
      C. L, N, M
      D. L, N, M, O
      E. L, O, M
      F. N, M
      G. N, O

### Correct answer

F

### Explanation

Only one of the method calls, forEach(), is a terminal operation, so any answer in which M is not the last line will not execute the pipeline. This eliminates all but options C, E, and F. Option C is incorrect because filter() is called before limit(). Since none of the elements of the stream meets the requirement for the Predicate<String>, the filter() operation will run infinitely, never passing any elements to limit(). Option E is incorrect because there is no limit() operation, which means that the code would run infinitely. Option F is correct. It first limits the infinite stream to a finite stream of 10 elements and then prints the result.

## Question 11

### Prompt

What changes need to be made together for this code to print the string
    12345? (Choose all that apply.)

    Stream.iterate(1, x -> x++)
       .limit(5).map(x -> x)
       .collect(Collectors.joining());
      A. Changing Collectors.joining() to Collectors.joining(",")
      B. Changing map(x -> x) to map(x -> "" + x)
      C. Changing x -> x++ to x -> ++x
      D. Adding .forEach(System.out::print) after the call to collect()
      E. Wrapping the entire line in a System.out.print statement
      F. None of the above; the code already prints 12345

### Correct answer

B, C, E

### Explanation

As written, the code doesn’t compile because the Collectors.joining() expects to get a Stream<String>. Option B fixes this, at which point nothing is output because the collector creates a String without outputting the result. Option E fixes this and causes the output to be 11111. Since the post-increment operator is used, the stream contains an infinite number of the character 1. Option C fixes this and causes the stream to contain increasing numbers.

## Question 12

### Prompt

Which is true of the following code?

    Set<String> birds = Set.of("oriole", "flamingo");
    Stream.concat(birds.stream(), birds.stream(), birds.stream())
       .sorted()       // line X
       .distinct()
       .findAny()
       .ifPresent(System.out::println);
      A. It is guaranteed to print flamingo as is and when line X is removed.
      B. It is guaranteed to print oriole as is and when line X is removed.
      C. It is guaranteed to print flamingo as is, but not when line X is
         removed.
      D. It is guaranteed to print oriole as is, but not when line X is removed.
      E. The output may vary as is.
      F. The code does not compile.
      G. It throws an exception because the same list is used as the source
         for multiple streams.

### Correct answer

F

### Explanation

The code does not compile because Stream.concat() takes two parameters, not the three provided. This makes the answer option F.

## Question 13

### Prompt

Which of the following is true?

    List<Integer> x1 = List.of(1, 2, 3);
    List<Integer> x2 = List.of(4, 5, 6);
    List<Integer> x3 = List.of();
    Stream.of(x1, x2, x3).map(x -> x + 1)
       .flatMap(x -> x.stream())
       .forEach(System.out::print);
      A. The code compiles and prints 123456.
      B. The code compiles and prints 234567.
      C. The code compiles but does not print anything.
      D. The code compiles but prints stream references.
      E. The code runs infinitely.
      F. The code does not compile.
      G. The code throws an exception.

### Correct answer

F

### Explanation

If the map() and flatMap() calls were reversed, option B would be correct. In this case, the Stream created from the source is of type Stream<List>. Trying to use the addition operator (+) on a List is not supported in Java. Therefore, the code does not compile, and option F is correct.

## Question 14

### Prompt

Which of the following are true? (Choose all that apply.)

    4: Stream<Integer> s = Stream.of(1);
    5: IntStream is = s.boxed();
    6: DoubleStream ds = s.mapToDouble(x -> x);
    7: Stream<Integer> s2 = ds.mapToInt(x -> x);
    8: s2.forEach(System.out::print);
      A. Line 4 causes a compiler error.
      B. Line 5 causes a compiler error.
      C. Line 6 causes a compiler error.
      D. Line 7 causes a compiler error.
      E. Line 8 causes a compiler error.
      F. The code compiles but throws an exception at runtime.
      G. The code compiles and prints 1.

### Correct answer

B, D

### Explanation

Line 4 creates a Stream and uses autoboxing to put the Integer wrapper of 1 inside. Line 5 does not compile because boxed() is available only on primitive streams like IntStream, not Stream<Integer>. This makes option B one answer. Line 6 converts to a double primitive, which works since Integer can be unboxed to a value that can be implicitly cast to a double. Line 7 does not compile for two reasons, making option D the second answer. First, converting from a double to an int would require an explicit cast. Also, mapToInt() returns an IntStream, so the data type of s2 is incorrect. The rest of the lines compile without issue.

## Question 15

### Prompt

Given the generic type String, the partitioningBy() collector creates a
    Map<Boolean, List<String>> when passed to collect() by default. When a
    downstream collector is passed to partitioningBy(), which return types
    can be created? (Choose all that apply.)
      A. Map<boolean, List<String>>
      B. Map<Boolean, List<String>>
      C. Map<Boolean, Map<String>>
      D. Map<Boolean, Set<String>>
      E. Map<Long, TreeSet<String>>
      F. None of the above

### Correct answer

B, D

### Explanation

Options A and C do not compile because they are invalid generic declarations. Primitives are not allowed as generics, and Map must have two generic type parameters. Option E is incorrect because partitioning only gives a Boolean key. Options B and D are correct because they return a Map with a Boolean key and a value type that can be customized to any Collection.

## Question 16

### Prompt

Which of the following statements are true about this code? (Choose all
    that apply.)

    20: Predicate<String> empty = String::isEmpty;
    21: Predicate<String> notEmpty = empty.negate();
    22:
    23: var result = Stream.generate(() -> "")
    24:    .limit(10)
    25:    .filter(notEmpty)
    26:    .collect(Collectors.groupingBy(k -> k))
    27:    .entrySet()
    28:    .stream()
    29:    .map(Entry::getValue)
    30:    .flatMap(Collection::stream)
    31:    .collect(Collectors.partitioningBy(notEmpty));
    32: System.out.println(result);
      A. It outputs {}.
      B. It outputs {false=[], true=[]}.
      C. If we changed line 31 from partitioningBy(notEmpty) to groupingBy(n ->
          n), it would output {}.
      D. If we changed line 31 from partitioningBy(notEmpty) to groupingBy(n ->
          n), it would output {false=[], true=[]}.
      E. The code does not compile.
      F. The code compiles but does not terminate at runtime.

### Correct answer

B, C

### Explanation

First, this mess of code does compile. While it starts with an infinite stream on line 23, it becomes finite on line 24 thanks to limit(), making option F incorrect. The pipeline preserves only nonempty elements on line 25. Since there aren’t any of those, the pipeline is empty. Line 26 converts this to an empty map. Lines 27 and 28 create a Set with no elements and then another empty stream. Lines 29 and 30 convert the generic type of the Stream to List<String> and then String. Finally, line 31 gives us another Map<Boolean, List<String>>. The partitioningBy() operation always returns a map with two Boolean keys, even if there are no corresponding values. Therefore, option B is correct if the code is kept as is. By contrast, groupingBy() returns only keys that are actually needed, making option C correct if the code is modified on line 31.

## Question 17

### Prompt

What is the result of the following?

    var s = DoubleStream.of(1.2, 2.4);
    s.peek(System.out::println).filter(x -> x> 2).count();
      A. 1
      B. 2
      C. 2.4
      D. 1.2 and 2.4
      E. There is no output.
      F. The code does not compile.
      G. An exception is thrown.

### Correct answer

D

### Explanation

The terminal operation is count(). Since there is a terminal operation, the intermediate operations run. The peek() operation comes before the filter(), so both numbers are printed, making option D the answer. After the filter(), the count() happens to be 1 since one of the numbers is filtered out. However, the result of the stream pipeline isn’t stored in a variable or printed, and it is ignored.

## Question 18

### Prompt

What is the output of the following?

    11: public class Paging {
    12:    record Sesame(String name, boolean human)  {
    13:       @Override public String toString() {
    14:          return name();
    15:       }
    16:    }
    17:    record Page(List<Sesame> list, long count)  {}
    18:
    19:    public static void main(String[] args) {
    20:       var monsters = Stream.of(new Sesame("Elmo", false));
    21:       var people = Stream.of(new Sesame("Abby", true));
    22:       printPage(monsters, people);
    23:    }
    24:
    25:    private static void printPage(Stream<Sesame> monsters,
    26:          Stream<Sesame> people) {
    27:       Page page = Stream.concat(monsters, people)
    28:          .collect(Collectors.teeing(
    29:             Collectors.filtering(s -> s.name().startsWith("E"),
    30:                Collectors.toList()),
    31:             Collectors.counting(),
    32:             (l, c) -> new Page(l, c)));
    33:       System.out.println(page);
    34:    } }
      A. Page[list=[Abby], count=1]
      B. Page[list=[Abby], count=2]
      C. Page[list=[Elmo], count=1]
      D. Page[list=[Elmo], count=2]
      E. The code does not compile due to Stream.concat().
      F. The code does not compile due to Collectors.teeing().
      G. The code does not compile for another reason.

### Correct answer

D

### Explanation

This compiles, ruling out options E, F, and G. Since line 29 filters by names starting with E, that rules out options A and B. Finally, line 31 counts the entire list, which is of size 2, giving us option D as the answer.

## Question 19

### Prompt

What is the simplest way of rewriting this code?

    List<Integer> x = IntStream.range(1, 6)
       .mapToObj(i -> i)
       .collect(Collectors.toList());
    x.forEach(System.out::println);
      A.

         IntStream.range(1, 6);
      B.

         IntStream.range(1, 6)
            .forEach(System.out::println);
      C.

          IntStream.range(1, 6)
             .mapToObj(i -> i)
             .forEach(System.out::println);
      D. None of the above is equivalent.
      E. The provided code does not compile.

### Correct answer

B

### Explanation

Both lists and streams have forEach() methods. There is no reason to collect into a list just to loop through it. Option A is incorrect because it does not contain a terminal operation or print anything. Options B and C both work. However, the question asks about the simplest way, which is option B.

## Question 20

### Prompt

Which of the following throw an exception when an Optional is empty?
    (Choose all that apply.)
      A. opt.orElse("");
      B. opt.orElseGet(() -> "");
      C. opt.orElseThrow();
      D. opt.orElseThrow(() -> throw new Exception());
      E. opt.orElseThrow(RuntimeException::new);
      F. opt.get();
      G. opt.get("");

### Correct answer

C, E, F

### Explanation

Options A and B compile and return an empty string without throwing an exception, using a String and Supplier parameter, respectively. Option G does not compile as the get() method does not take a parameter. Options C and F throw a NoSuchElementException. Option E throws a RuntimeException. Option D looks correct but will compile only if the throw is removed. Remember, the orElseThrow() should get a lambda expression or method reference that returns an exception, not one that throws an exception.

## Question 21

### Prompt

What is the output of the following?

    var spliterator = Stream.generate(() -> "x")
       .spliterator();

    spliterator.tryAdvance(System.out::print);
    var split = spliterator.trySplit();
    split.tryAdvance(System.out::print);
      A. x
      B. xx
      C. A long list of x’s.
      D. There is no output.
      E. The code does not compile.
      F. The code compiles but does not terminate at runtime.

### Correct answer

B

### Explanation

We start with an infinite stream where each element is x. The spliterator() method is a terminal operation since it returns a Spliterator rather than a Stream. The tryAdvance() method gets the first element and prints a single x. The trySplit() method takes a large number of elements from the stream. Since this is an infinite stream, it doesn’t attempt to take half. Then tryAdvance() is called on the new split variable, and another x is printed. Since there are two values printed, option B is correct.
