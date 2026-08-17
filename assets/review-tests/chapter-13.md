---
chapter: 13
title: "Concurrency"
questionCount: 25
sourceQuestionPdfPages: "1182-1196"
sourceAnswerPdfPages: "1403-1410"
---

# Chapter 13: Concurrency

## Question 1

### Prompt

Given the following code snippet, which options correctly
    create a parallel stream? (Choose all that apply.)

    var c = List.of(19, 66);
    var s = ThreadLocalRandom.current().doubles();
    var p = ________________;
      A. new ParallelStream(s)
      B. c.parallel()
      C. s.parallelStream()
      D. c.parallelStream()
      E. new ParallelStream(c)
      F. s.parallel()

### Correct answer

D, F

### Explanation

There is no such class within the Java API called ParallelStream, so options A and E are incorrect. The method defined in the Stream class to create a parallel stream from an existing stream is parallel(); therefore, option F is correct, and option C is incorrect. The method defined in the Collection class to create a parallel stream from a collection is parallelStream(); therefore, option D is correct, and option B is incorrect.

## Question 2

### Prompt

Given that the sum of the numbers from 1 (inclusive) to
    10 (exclusive) is 45, what are the possible results of
    executing the following program? (Choose all that apply.)

    1:  import java.util.concurrent.locks.*;
    2:  import java.util.stream.*;
    3:  public class Bank {
    4:     private Lock vault = new ReentrantLock();
    5:     private int total = 0;
    6:     public void deposit(int value) {
    7:        try {
    8:           vault.tryLock();
    9:           total += value;
    10:       } finally { vault.unlock(); }
   11:    }
   12:    public static void main(String[] unused) {
   13:       var bank = new Bank();
   14:       IntStream.range(1, 10).parallel()
   15:          .forEach(s -> bank.deposit(s));
   16:       System.out.println(bank.total);
   17:    } }
    A. 45 is printed.
    B. A number less than 45 is printed.
    C. A number greater than 45 is printed.
    D. An exception is thrown.
    E. None of the above, as the code does not compile.

### Correct answer

A, D

### Explanation

The tryLock() method returns immediately with a value of false if the lock cannot be acquired. Unlike lock(), it does not wait for a lock to become available. This code fails to check the return value on line 8, resulting in the protected code being entered regardless of whether the lock is obtained. In some executions (when tryLock() returns true on every call), the code will complete successfully and print 45 at runtime, making option A correct. On other executions (when tryLock() returns false at least once), the unlock() method on line 10 will throw an IllegalMonitorStateException at runtime, making option D correct. Option B would be possible if line 10 did not throw an exception.

## Question 3

### Prompt

Which of the following statements about the Callable
   call() and Runnable run() methods are correct? (Choose all
   that apply.)
    A. Both methods return void.
    B. Both can throw unchecked exceptions.
    C. Both can be implemented with lambda expressions.
    D. Runnable returns a generic type.
    E. Both can throw checked exceptions.
    F. Callable returns a generic type.

### Correct answer

B, C, F

### Explanation

Runnable returns void and Callable returns a generic type, making options A and D incorrect and option F correct. All methods are capable of throwing unchecked exceptions, so option B is correct. Only Callable is capable of throwing checked exceptions, so option E is incorrect. Both Runnable and Callable are functional interfaces that can be implemented with a lambda expression, so option C is also correct.

## Question 4

### Prompt

Which lines need to be changed to make the code
   compile?

   try (ExecutorService service =         // w1
      Executors.newSingleThreadScheduledExecutor()) {
      service.scheduleWithFixedDelay(() -> {
         System.out.println("Open Zoo");
         return null;                     // w2
      }, 0, 1, TimeUnit.MINUTES);
      var result = service.submit(() ->   // w3
         System.out.println("Wake Staff"));
      System.out.println(result.get());
   }
    A. Only line w1.
    B. Only line w2.
    C. Only line w3.
    D. Line w1 and w2.
    E. Line w1 and w2.
    F. Line w1 and w3.
    G. None of the above; the code compiles.

### Correct answer

D

### Explanation

The first problem is that although a ScheduledExecutorService is created, it is assigned to an ExecutorService. The type of the variable on line w1 would have to be updated to ScheduledExecutorService for the code to compile. The second problem is that scheduleWithFixedDelay() supports only Runnable, not Callable, and any attempt to return a value is invalid in a Runnable lambda expression; therefore, line w2 will also not compile, and option D is correct.

## Question 5

### Prompt

What statement about the following code is true?

   var value1 = new AtomicLong(0);
   final long[] value2 = {0};
   IntStream.iterate(1, i -> 1).limit(100).parallel()
      .forEach(i -> value1.incrementAndGet());
   IntStream.iterate(1, i -> 1).limit(100).parallel()
      .forEach(i -> ++value2[0]);
   System.out.println(value1 + " " + value2[0]);
    A. It outputs 100 100.
    B. It outputs 100 99.
    C. The output cannot be determined ahead of time.
    D. The code does not compile.
    E. It compiles but throws an exception at runtime.
    F. It compiles but enters an infinite loop at runtime.
    G. None of the above.

### Correct answer

C

### Explanation

The code compiles and runs without throwing an exception or entering an infinite loop, so options D, E, and F are incorrect. The key here is that the increment operator ++ is not atomic. While the first part of the output will always be 100, the second part is nondeterministic. It may output any value from 1 to 100, because the threads can overwrite each other’s work. Therefore, option C is the correct answer, and options A and B are incorrect.

## Question 6

### Prompt

Which statements about the following code are correct?
   (Choose all that apply.)

   var data = List.of(2, 5, 1, 9, 8);
   data.stream().parallel()
      .mapToInt(s -> s)
      .peek(System.out::print)
      .forEachOrdered(System.out::print);
    A. The peek() method will print the entries in the sorted
        order: 12589.
    B. The peek() method will print the entries in the original
        order: 25198.
    C. The peek() method will print the entries in an order
        that cannot be determined ahead of time.
    D. The forEachOrdered() method will print the entries in
        the sorted order: 12589.
    E. The forEachOrdered() method will print the entries in
        the original order: 25198.
    F. The forEachOrdered() method will print the entries in an
        order that cannot be determined ahead of time.
    G. The code does not compile.

### Correct answer

C, E

### Explanation

The code compiles, so option G is incorrect. The peek() method on a parallel stream will process the elements concurrently, so the order cannot be determined ahead of time, and option C is correct. The forEachOrdered() method will process the elements in the order in which they are stored in the stream, making option E correct. None of the methods sort the elements, so options A and D are incorrect.

## Question 7

### Prompt

Fill in the blanks: __________ occur(s) when two or more
   threads are blocked forever but both appear active.
   _______ occur(s) when two or more threads try to
   complete a related task at the same time, resulting in
   invalid or unexpected data.
    A. Livelock, Deadlock
    B. Deadlock, Starvation
    C. Race conditions, Deadlock
    D. Livelock, Race conditions
    E. Starvation, Race conditions
    F. Deadlock, Livelock

### Correct answer

D

### Explanation

Livelock occurs when two or more threads are conceptually blocked forever, although they are each still active and trying to complete their task. A race condition is an undesirable result that occurs when two tasks that should have been completed sequentially are completed at the same time. For these reasons, option D is correct.

## Question 8

### Prompt

Assuming this class is accessed by only a single thread at
   a time, what is the result of calling the
   countIceCreamFlavors() method?

   import java.util.stream.LongStream;
   public class Flavors {
      private static int counter;
      public static void countIceCreamFlavors()  {
         counter = 0;
         Runnable task = () -> counter++;
         LongStream.range(0, 500)
             .forEach(m -> Thread.ofPlatform()
               .priority(1)
               .unstarted(task)
               .run());
          System.out.println(counter);
       } }
      A. The method consistently prints a number less than
         500.
      B. The method consistently prints 500.
      C. The method compiles and prints a value, but that
         value cannot be determined ahead of time.
      D. The method does not compile.
      E. The method compiles but throws an exception at
         runtime.
      F. None of the above.

### Correct answer

B

### Explanation

Be wary of run() vs. start() on the exam! The method looks like it executes a task concurrently, but it runs synchronously. In each iteration of the forEach() loop, the process waits for the run() method to complete before moving on. For this reason, the code is thread- safe. Since the program consistently prints 500 at runtime, option B is correct. Note that if start() had been used instead of run() (or the stream was parallel), then the output would be indeterminate, and option C would have been correct.

## Question 9

### Prompt

Which are true of ExecutorService? (Choose all that apply.)
      A. If a task is submitted when no threads are available,
         the executor discards the task without completing it.
      B. If a task is submitted when no threads are available,
         the executor adds the task to an internal queue and
         completes when there is an available thread.
      C. If a task is submitted when no threads are available,
         the thread submitting the task waits on the submit
         call until a thread is available before continuing.
      D. Platform threads can be pooled using ExecutorService,
         but not virtual threads.
      E. Virtual threads can be pooled using ExecutorService,
         but not platform threads.
      F. Both platform threads and virtual threads can be
         pooled using ExecutorService.

### Correct answer

B, D

### Explanation

If a task is submitted to a thread executor and the thread executor does not have any available threads, the call to the task will return immediately with the task being queued internally by the thread executor. For this reason, option B is correct. Additionally, only platform threads can be pooled, making option D correct as well. Virtual threads are lightweight so they don’t benefit from pooling.

## Question 10

### Prompt

What is the result of executing the following code
    snippet?
    SequencedCollection<Integer> lions = new ArrayList<>
    (List.of(1, 2, 3));
    SequencedCollection<Integer> tigers = new
    CopyOnWriteArrayList<>(lions);
    Set<Integer> bears = new ConcurrentSkipListSet<>();
    bears.addAll(lions);
    for (Integer item: tigers) tigers.add(4); // x1
    for (Integer item: bears) bears.add(5);   // x2
    System.out.println(lions.size() + " " + tigers.size()
       + " " + bears.size());
      A. It outputs 3 6 4.
      B. It outputs 6 6 6.
      C. It outputs 6 3 4.
      D. The code does not compile.
      E. It compiles but throws an exception at runtime on line
         x1.
      F. It compiles but throws an exception at runtime on line
         x2.
      G. It compiles but enters an infinite loop at runtime.

### Correct answer

A

### Explanation

The code compiles without issue, so option D is incorrect. The CopyOnWriteArrayList class is designed to preserve the original list on iteration, so the first loop will be executed exactly three times and, in the process, will increase the size of tigers to six elements. The ConcurrentSkipListSet class allows modifications, and since it enforces the uniqueness of its elements, the value 5 is added only once, leading to a total of four elements in bears. Finally, despite using the elements of lions to populate the collections, tigers and bears are not backed by the original list, so the size of lions is 3 throughout this program. For these reasons, the program prints 3 6 4, and option A is correct.

## Question 11

### Prompt

What statement about the following code is true?

    Integer i1 = List.of(1, 2, 3, 4, 5).stream().findAny().get();
    synchronized(i1) { // y1
       Integer i2 = List.of(6, 7, 8, 9, 10)
          .parallelStream()
          .sorted()
          .findAny().get(); // y2
       System.out.println(i1 + " " + i2);
    }
      A. The first value printed is always 1.
      B. The second value printed is always 6.
      C. The code will not compile because of line y1.
      D. The code will not compile because of line y2.
      E. The code compiles but throws an exception at
         runtime.
      F. The output cannot be determined ahead of time.
      G. It compiles but waits forever at runtime.

### Correct answer

F

### Explanation

The code compiles and runs without issue, so options C, D, E, and G are incorrect. There are two important things to notice. First, synchronizing on the first variable doesn’t impact the results of the code. Second, sorting on a parallel stream does not mean that findAny() will return the first record. The findAny() method will return the value from the first thread that retrieves a record. Therefore, the output is not guaranteed, and option F is correct. Option A looks correct, but even on serial streams, findAny() is free to select any element.

## Question 12

### Prompt

Assuming each call to takeNap() takes five seconds to
    execute without throwing an exception, what is the
    expected result of executing the following code snippet?
    (Choose all that apply.)

    public void shutdown() throws InterruptedException {
       var service = Executors.newFixedThreadPool(4);
       try {
          service.execute(() -> takeNap());
          service.execute(() -> takeNap());
          service.execute(() -> takeNap());
       } finally {
          service.shutdown();
       }
       service.awaitTermination(2, TimeUnit.SECONDS);
       System.out.println("DONE!");
    }
    public void refactored() {
       try (var service = Executors.newFixedThreadPool(4)) {
          service.execute(() -> takeNap());
          service.execute(() -> takeNap());
          service.execute(() -> takeNap());
       }
       System.out.println("DONE!");
    }
      A. shutdown() will pause for approximately 2 seconds and
         then print DONE!.
      B. shutdown() will pause for approximately 5 seconds and
         then print DONE!.
      C. shutdown() will pause for approximately 15 seconds
         and then print DONE!.
      D. refactored() will pause for approximately 2 seconds
         and then print DONE!.
      E. refactored() will pause for approximately 5 seconds
         and then print DONE!.
      F. refactored() will pause for approximately 15 seconds
         and then print DONE!.
      G. One of the methods returns the result immediately.
      H. One of the methods throws an exception.

### Correct answer

A, E

### Explanation

The shutdown() method submits three tasks to an ExecutorService, shuts it down, and then waits for the results. The awaitTermination() method waits a specified amount of time for all tasks to complete and the service to finish shutting down. Since each five-second task is still executing, the awaitTermination() method will return with a value of false after two seconds but not throw an exception making option A correct. The refactored() method uses a try-with-resources, which allows the tasks to gracefully finish and option E to be the other answer.

## Question 13

### Prompt

What statement about the following code is true?

    System.out.print(List.of("duck","flamingo","pelican")
       .parallelStream().parallel()   // q1
       .reduce(0,
          (c1, c2) -> c1.length() + c2.length(),  // q2
          (s1, s2) -> s1 + s2));      // q3
      A. It compiles and runs without issue, outputting the
         total length of all strings in the stream.
      B. The code will not compile because of line q1.
      C. The code will not compile because of line q2.
      D. The code will not compile because of line q3.
      E. It compiles but throws an exception at runtime.
      F. None of the above.

### Correct answer

C

### Explanation

The code does not compile, so options A and E are incorrect. The problem here is that c1 is an Integer and c2 is a String, so the code fails to combine on line q2, since calling length() on an Integer is not allowed, and option C is correct. The rest of the lines compile without issue. Note that calling parallel() on an already parallel stream is allowed, and it may return the same object.

## Question 14

### Prompt

What statements about the following code snippet are
    true? (Choose all that apply.)

    Object o1 = new Object();
    Object o2 = new Object();
    try (var service = Executors.newFixedThreadPool(2)) {
       var f1 = service.submit(() -> {
          synchronized (o1) {
             synchronized (o2) { System.out.print("Tortoise"); }
          }
       });
       var f2 = service.submit(() -> {
          synchronized (o2) {
             synchronized (o1) { System.out.print("Hare"); }
          }
       });
       f1.get();
       f2.get();
    }
      A. The code will always output Tortoise followed by Hare.
      B. The code will always output Hare followed by Tortoise.
      C. If the code does output anything, the order cannot be
         determined.
      D. The code does not compile.
      E. The code compiles but may produce a deadlock at
         runtime.
      F. The code compiles but may produce a livelock at
         runtime.
      G. It compiles but throws an exception at runtime.

### Correct answer

C, E

### Explanation

The code compiles without issue, so option D is incorrect. Since both tasks are submitted to the same thread executor pool, the order cannot be determined, so options A and B are incorrect, and option C is correct. The key here is that the order in which the resources o1 and o2 are synchronized could result in a deadlock. For example, if the first thread gets a lock on o1 and the second thread gets a lock on o2 before either thread can get their second lock, the code will hang at runtime, making option E correct. The code cannot produce a livelock, since both threads are waiting, so option F is incorrect. Finally, if a deadlock does occur, an exception will not be thrown, so option G is incorrect.

## Question 15

### Prompt

Which statement about the following code snippet is
    correct?

    2: var cats = Stream.of("leopard", "lynx", "ocelot", "puma")
    3:    .parallel();
    4: var bears =
    Stream.of("panda","grizzly","polar").parallel();
    5: var data = Stream.of(cats,bears).flatMap(s -> s)
    6:    .collect(Collectors.groupingByConcurrent(
    7:       s -> !s.startsWith("p")));
    8: System.out.println(data.get(false).size()
    9:    + " " + data.get(true).size());
      A. It outputs 3 4.
      B. It outputs 4 3.
      C. The code will not compile because of line 6.
      D. The code will not compile because of line 7.
      E. The code will not compile because of line 8.
      F. It compiles but throws an exception at runtime.

### Correct answer

A

### Explanation

The code compiles and runs without issue, so options C, D, E, and F are incorrect. The collect() operation groups the animals into those that do and do not start with the letter p. Note that there are four animals that do not start with the letter p and three animals that do. Therefore, the output is 3 4, and option A is correct, making option B incorrect.

## Question 16

### Prompt

Which APIs exist for creating or working with platform
    threads? (Choose all that apply.)
      A. Executors.newCachedThreadPool()
      B. Executors.newPlatformThreadPool()
      C. Executors.newPlatformThreadPerTaskExecutor()
      D. new Thread()
      E. Thread.ofPlatform()
      F. Thread.ofPlatformThread()

### Correct answer

A, D, E

### Explanation

All the factory methods on Executors work with platform threads except newVirtualThreadPerTaskExecutor(), making option A correct. You can also create a platform thread using the constructor or factory method Thread.ofPlatform(), making options D and E the other answers.

## Question 17

### Prompt

Which statement about methods in ReentrantLock is
    correct?
      A. The lock() method will attempt to acquire a lock
         without waiting indefinitely for it.
      B. The testLock() method will attempt to acquire a lock
         without waiting indefinitely for it.
      C. The attemptLock() method will attempt to acquire a
         lock without waiting indefinitely for it.
      D. By default, a ReentrantLock fairly releases to each
         thread in the order in which it was requested.
      E. Calling the unlock() method once will release a
         resource so that other threads can obtain the lock.
      F. None of the above.

### Correct answer

F

### Explanation

The lock() method will wait indefinitely for a lock, so option A is incorrect. Options B and C are also incorrect, as the correct method name to attempt to acquire a lock is tryLock(). Option D is incorrect, as fairness is set to false by default and must be enabled by using an overloaded constructor. Finally, option E is incorrect because a thread that holds the lock may have called lock() or tryLock() multiple times. A thread needs to call unlock() once for each call to lock() and successful tryLock(). Option F is the correct answer since none of the other options is a valid statement.

## Question 18

### Prompt

Which of the following lambda expressions are valid
    Callable expressions? (Choose all that apply.)
      A. a -> {return 10;}
      B. () -> {String s = "";}
      C. () -> 5
      D. () -> {return null}
      E. () -> "The" + "Zoo"
      F. (int count) -> count+1
      G. () -> {System.out.print("Giraffe"); return 10;}

### Correct answer

C, E, G

### Explanation

A Callable lambda expression takes no values and returns a generic type; therefore, options C, E, and G are correct. Options A and F are incorrect because they both take an input parameter. Option B is incorrect because it does not return a value. Option D is not a valid lambda expression, because it is missing a semicolon at the end of the return statement, which is required when inside braces, {}.

## Question 19

### Prompt

What is the result of executing the following application?
    (Choose all that apply.)
    import java.util.concurrent.*;
    import java.util.stream.*;
    public class PrintConstants {
       public static void main(String[] args) {
          var s = Executors.newVirtualThreadPerTaskExecutor();
          DoubleStream.of(3.14159, 2.71828)   // b1
             .forEach(c -> s.submit(          // b2
                () -> System.out.println(10 * c))); // b3
          s.execute(() -> System.out.println("Printed"));
       } }
      A. It compiles and outputs the two numbers followed by
         Printed.
      B. The code will not compile because of line b1.
      C. The code will not compile because of line b2.
      D. The code will not compile because of line b3.
      E. It compiles, but the output cannot be determined
         ahead of time.
      F. It compiles but throws an exception at runtime.
      G. It compiles but waits forever at runtime.

### Correct answer

E, G

### Explanation

The application compiles and does not throw an exception. Even though the stream is processed in sequential order, the tasks are submitted to a thread executor, which may complete the tasks in any order. Therefore, the output cannot be determined ahead of time, and option E is correct. Finally, the thread executor is never shut down; therefore, the code will run but never terminate, making option G also correct.

## Question 20

### Prompt

What is the result of executing the following program?

    import java.util.*;
    import java.util.concurrent.*;
    import java.util.stream.*;
    public class PrintCounter {
       static int count = 0;
       public static void main(String[] args) throws
                         InterruptedException, ExecutionException
    {
          try (var service = Executors.newSingleThreadExecutor())
    {
             var r = new ArrayList<Future<?>>();
             IntStream.iterate(0,i -> i + 1).limit(5).forEach(
                i -> r.add(service.execute(() -> {count++;})) //
    n1
             );
             for (Future<?> result : r) {
                System.out.print(result.get() + " "); // n2
             }
          }
       } }
      A. It prints 0 1 2 3 4
      B. It prints 1 2 3 4 5
      C. It prints null null null null null
      D. It hangs indefinitely at runtime.
      E. The output cannot be determined.
      F. The code will not compile because of line n1.
      G. The code will not compile because of line n2.

### Correct answer

F

### Explanation

The key to solving this question is to remember that the execute() method returns void, not a Future object. Therefore, line n1 does not compile, and option F is the correct answer. If the submit() method had been used instead of execute(), option C would have been the correct answer, as the output of the submit(Runnable) task is a Future<?> object that can only return null on its get() method.

## Question 21

### Prompt

Given the following code snippet and blank lines on p1 and
    p2, which values guarantee that 1 is printed at runtime?
    (Choose all that apply.)

    var data = List.of(List.of(1, 2),
       List.of(3, 4),
       List.of(5, 6));
    data._______________  // p1
       .flatMap(s -> s.stream())
       .________________  // p2
       .ifPresent(System.out::print);
      A. stream() on line p1, findFirst() on line p2.
      B. stream() on line p1, findAny() on line p2.
      C. parallelStream() on line p1, findAny() on line p2.
      D. parallelStream() on line p1, findFirst() on line p2.
      E. The code does not compile regardless of what is
         inserted into the blanks.
      F. None of the above.

### Correct answer

A, D

### Explanation

The findFirst() method guarantees the first element in the stream will be returned, whether it is serial or parallel, making options A and D correct. While option B may consistently print 1 at runtime, the behavior of findAny() on a serial stream is not guaranteed, so option B is incorrect. Option C is likewise incorrect, with the output being random at runtime.

## Question 22

### Prompt

Assuming one minute is enough time for the tasks
    submitted to the service executor to complete, what is the
    result of executing countSheep()?

    import java.util.concurrent.*;
    import java.util.concurrent.atomic.*;
    public class BedTime {
       private AtomicInteger s1 = new AtomicInteger(0); // w1
       private int s2 = 0;

       private void countSheep() throws InterruptedException {
          try (var service = Executors.newSingleThreadExecutor())
    { // w2
             for (int i = 0; i < 100; i++)
             service.execute(() -> {
                s1.getAndIncrement(); s2++; }); // w3
             Thread.sleep(60_000);
             System.out.println(s1 + " " + s2);
          }
       }
       public static void main(String... nap)
         throws InterruptedException {
          new BedTime().countSheep();
       } }
      A. The method consistently prints 100 99.
      B. The method consistently prints 100 100.
      C. The output cannot be determined ahead of time.
      D. The code will not compile because of line w1.
      E. The code will not compile because of line w2.
      F. The code will not compile because of line w3.
      G. It compiles but throws an exception at runtime.

### Correct answer

B

### Explanation

The code compiles and runs without issue. The key aspect to notice in the code is that a single-thread executor is used, meaning that no task will be executed concurrently. Therefore, the results are valid and predictable, with 100 100 being the output, and option B is the correct answer. If a thread executor with more threads was used, then the s2++ operations could overwrite each other, making the second value indeterminate at the end of the program. In this case, option C would be the correct answer.

## Question 23

### Prompt

What is the result of executing the following application?

    import java.util.concurrent.*;
    import java.util.stream.*;
    public class StockRoomTracker {
       public static void await(CyclicBarrier cb) { // j1
          try { cb.await(); } catch (Exception e) {}
       }
       public static void main(String[] args) {
          var cb = new CyclicBarrier(10,
             () -> System.out.println("Stock Room Full!")); // j2
          IntStream.iterate(1, i -> 1).limit(9).parallel()
             .forEach(i -> await(cb)); // j3
       } }
      A. It outputs Stock Room Full!
      B. The code will not compile because of line j1.
      C. The code will not compile because of line j2.
      D. The code will not compile because of line j3.
      E. It compiles but throws an exception at runtime.
      F. It compiles but waits forever at runtime.

### Correct answer

F

### Explanation

The code compiles without issue, so options B, C, and D are incorrect. The limit on the cyclic barrier is 10, but the stream can generate only up to 9 threads that reach the barrier; therefore, the limit can never be reached, and option F is the correct answer, making options A and E incorrect. Even if the limit(9) statement was changed to limit(10), the program could still hang since the JVM might not allocate 10 threads to the parallel stream.

## Question 24

### Prompt

What statements about the following class definition are
    true? (Choose all that apply.)

    public final class TicketManager {
       private int tickets;
       private static TicketManager instance;
       private TicketManager() {}
       static synchronized TicketManager getInstance() {      //
    k1
          if (instance==null) instance = new TicketManager(); //
    k2
          return instance;
       }

       public int getTicketCount() { return tickets; }
       public void addTickets(int value) {tickets += value;}  //
    k3
       public void sellTickets(int value) {
          synchronized (this) {                               //
    k4
             tickets -= value;
          } } }
      A. It compiles without issue.
      B. The code will not compile because of line k2.
      C. The code will not compile because of line k3.
      D. The locks acquired on k1 and k4 are on the same
         object.
      E. The class correctly protects the tickets data from race
         conditions.
      F. At most one instance of TicketManager will be created in
         an application that uses this class.

### Correct answer

A, F

### Explanation

The class compiles without issue, so option A is correct. Since getInstance() is a static method and sellTickets() is an instance method, lines k1 and k4 synchronize on different objects, making option D incorrect. The class is not thread-safe because the addTickets() method is not synchronized, and option E is incorrect. One thread could call sellTickets() while another thread calls addTickets(), possibly resulting in bad data. Finally, option F is correct because the getInstance() method is synchronized. Since the constructor is private, this method is the only way to create an instance of TicketManager outside the class. The first thread to enter the method will set the instance variable, and all other threads will use the existing value. This is a singleton pattern.

## Question 25

### Prompt

Assuming an implementation of the performCount() method
    is provided prior to runtime, which of the following are
    possible results of executing the following application?
    (Choose all that apply.)

    import java.util.*;
    import java.util.concurrent.*;
    public class CountZooAnimals {
       public static void performCount(int animal) {
          // IMPLEMENTATION OMITTED
       }
       public static void printResults(Future<?> f) {
          try {
             System.out.println(f.get(1, TimeUnit.DAYS)); // o1
          } catch (Exception e) {
             System.out.println("Exception!");
          }
       }
       public static void main(String[] args) throws Exception {
          final var r = new ArrayList<Future<?>>();
          try (var s = Executors.newSingleThreadExecutor()) {
             for (int i = 0; i < 10; i++) {
                final int animal = i;
                r.add(s.submit(() -> performCount(animal))); //
    o2
             }
             r.forEach(f -> printResults(f));
          }
       } }
      A. It outputs a number 10 times.
      B. It outputs a Boolean value 10 times.
      C. It outputs a null value 10 times.
      D. It outputs Exception! 10 times.
      E. The code will not compile because of line o1.
      F. The code will not compile because of line o2.

### Correct answer

C, D

### Explanation

The code compiles and runs without issue, so options F and G are incorrect. The return type of performCount() is void, so submit() is interpreted as being applied to a Runnable expression. While submit(Runnable) does return a Future<?>, calling get() on it always returns null. For this reason, options A and B are incorrect, and option C is correct. The performCount() method can also throw a runtime exception, which will then be thrown by the get() call as an ExecutionException; therefore, option D is also a correct answer.
