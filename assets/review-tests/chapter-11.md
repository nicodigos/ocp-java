---
chapter: 11
title: "Exceptions and Localization"
questionCount: 26
sourceQuestionPdfPages: "992-1007"
sourceAnswerPdfPages: "1391-1397"
---

# Chapter 11: Exceptions and Localization

## Question 1

### Prompt

Which of the following can be inserted on line 8 to
     make this code compile? (Choose all that apply.)

     7: public void whatHappensNext() throws IOException {
     8:    // INSERT CODE HERE
     9: }
      A. System.out.println("it’s ok");
      B. throw new Exception();
      C. throw new IllegalArgumentException();
      D. throw new java.io.IOException();
      E. throw new RuntimeException();
      F. None of the above

### Correct answer

A, C, D, E

### Explanation

A method that declares an exception isn’t required to throw one, making option A correct. Unchecked exceptions can be thrown in any method, making options C and E correct. Option D matches the exception type declared, so it’s also correct. Option B is incorrect because a broader exception is not allowed.

## Question 2

### Prompt

Which statement about the following class is correct?

     1:  class Problem extends Exception {
     2:     public Problem() {}
     3:  }
     4:  class YesProblem extends Problem {}
     5:  public class MyDatabase {
     6:     public static void connectToDatabase() throw Problem
     {
     7:        throws new YesProblem();
     8:     }
     9:     public static void main(String[] c) throw Exception
     {
     10:       connectToDatabase();
     11:    }
     12: }
      A. The code compiles and prints a stack trace for
          YesProblem at runtime.
    B. The code compiles and prints a stack trace for
        Problem at runtime.
    C. The code does not compile because Problem defines
        a constructor.
    D. The code does not compile because YesProblem does
        not define a constructor.
    E. The code does not compile but would if Problem and
        YesProblem were switched on lines 6 and 7.
    F. None of the above.

### Correct answer

F

### Explanation

The code does not compile because the throw and throws keywords are incorrectly used on lines 6, 7, and 9. If the keywords were fixed, the rest of the code would compile and print a stack trace with YesProblem at runtime. For this reason, option F is correct.

## Question 3

### Prompt

Which of the following are common types to localize?
   (Choose all that apply.)
    A. Dates
    B. Lambda expressions
    C. Class names
    D. Currency
    E. Numbers
    F. Variable names

### Correct answer

A, D, E

### Explanation

Localization refers to user-facing elements. Dates, currency, and numbers are commonly used in different formats for different countries, making options A, D, and E correct. Class and variable names, along with lambda expressions, are internal to the application, so there is no need to translate them for users.

## Question 4

### Prompt

What is the output of the following snippet, assuming a
   and b are both 0?

   3:  try {
   4:     System.out.print(a / b);
   5:  } catch (RuntimeException e) {
   6:     System.out.print(-1);
   7:  } catch (ArithmeticException e) {
   8:     System.out.print(0);
   9:  } finally {
   10:    System.out.print("done");
   11: }
    A. -1
    B. 0
    C. done-1
    D. done0
    E. The code does not compile.
    F. An uncaught exception is thrown.
    G. None of the above.

### Correct answer

E

### Explanation

The order of catch blocks is important because they’re checked in the order they appear after the try block. Because ArithmeticException is a child class of RuntimeException, the catch block on line 7 is unreachable (if an ArithmeticException is thrown in the try block, it will be caught on line 5). Line 7 generates a compiler error because it is unreachable code, making option E correct.

## Question 5

### Prompt

Assuming the current locale uses dollars ($) and the
   following method is called with a double value of
   100_102.2, which of the following values are printed?
   (Choose all that apply.)

   public void print(double t) {

   System.out.print(NumberFormat.getCompactNumberInstance().fo
   rmat(t));

      System.out.print(
         NumberFormat.getCompactNumberInstance(
            Locale.getDefault(), Style.SHORT).format(t));


   System.out.print(NumberFormat.getCurrencyInstance().format(
   t));
   }
    A. 100
    B. $100,000.00
    C. 100K
    D. 100 thousand
    E. 100M
    F. $100,102.20
    G. None of the above

### Correct answer

C, F

### Explanation

The code compiles and runs without issue. When a CompactNumberFormat instance is requested without a style, it uses the SHORT style by default. This results in both of the first two statements printing 100K, making option C correct. If the LONG style were used, then 100 thousand would be printed. Option F is also correct, as the full value is printed with a currency formatter.

## Question 6

### Prompt

What is the output of the following code?

   LocalDate date = LocalDate.parse("2025-04-30",
      DateTimeFormatter.ISO_LOCAL_DATE_TIME);
   System.out.println(date.getYear() + " "
      + date.getMonth() + " "+ date.getDayOfMonth());
    A. 2025 APRIL 2
    B. 2025 APRIL 30
    C. 2025 MAY 2
    D. The code does not compile.
    E. A runtime exception is thrown.

### Correct answer

E

### Explanation

A LocalDate does not have a time element. Therefore, a date/time formatter is not appropriate. The code compiles but throws an exception at runtime, making option E correct. If ISO_LOCAL_DATE were used, the code would print 2025 APRIL 30.

## Question 7

### Prompt

What does the following method print?

   11: public void tryAgain(String s) {
   12:    try (FileReader r = null, p = new FileReader("")) {
   13:       System.out.print("X");
   14:       throw new IllegalArgumentException();
   15:    } catch (Exception s) {
   16:       System.out.print("A");
   17:       throw new FileNotFoundException();
   18:    } finally {
   19:       System.out.print("O");
   20:    }
   21: }
    A. XAO
    B. XOA
    C. One line of this method contains a compiler error.
    D. Two lines of this method contain compiler errors.
    E. Three or more lines of this method contain compiler
        errors.
    F. The code compiles, but a NullPointerException is
        thrown at runtime.
    G. None of the above.

### Correct answer

E

### Explanation

The first compiler error is on line 12 because each resource in a try-with-resources statement must have its own data type and be separated by a semicolon (;). Line 15 does not compile because the variable s is already declared in the method. Line 17 also does not compile. The FileNotFoundException, which inherits from IOException and Exception, is a checked exception, so it must be handled or declared by the method. Because these three lines of code do not compile, option E is the correct answer.

## Question 8

### Prompt

Assume that all of the files mentioned in the answer
   choices exist and define the same keys. Which one will
   be used to find the key in line 8?
    6: Locale.setDefault(Locale.of("en", "US"));
    7: var b = ResourceBundle.getBundle("Dolphins");
    8: System.out.println(b.getString("name"));
      A. Dolphins.properties
      B. Dolphins_US.properties
      C. Dolphins_en.properties
      D. Whales.properties
      E. Whales_en_US.properties
      F. The code does not compile.

### Correct answer

C

### Explanation

Java will first look for the most specific matches it can find, starting with Dolphins_en_US.properties. Since that is not an answer choice, it drops the country and looks for Dolphins_en.properties, making option C correct. Option B is incorrect because a country without a language is not a valid locale.

## Question 9

### Prompt

For what value of pattern will the following print
    <005.21> <008.49> <1,234.0>?

    String pattern = "____________________";
    var message = DoubleStream.of(5.21, 8.49, 1234)
       .mapToObj(v -> new DecimalFormat(pattern).format(v))
       .collect(Collectors.joining("> <"));
    System.out.println("<"+message+">");
      A. ##.#
      B. 0,000.0#
      C. #,###.0
      D. #,###,000.0#
      E. The code does not compile regardless of what is
         placed in the blank.
      F. None of the above.

### Correct answer

D

### Explanation

When working with a custom number formatter, the 0 symbol displays the digit as 0, even if it’s not present, while the # symbol omits the digit from the start or end of the String if it is not present. Based on the requested output, a format that displays at least three digits before the decimal (including a comma) and at least one after the decimal is required. It should display a second digit after the decimal if one is available. For this reason, option D is the correct answer.

## Question 10

### Prompt

Which scenario is the best use of an exception?
      A. An element is not found when searching a list.
      B. An unexpected parameter is passed into a method.
      C. The computer caught fire.
      D. You want to loop through a list.
      E. You don’t know how to code a method.

### Correct answer

B

### Explanation

An IllegalArgumentException is used when an unexpected parameter is passed into a method, making option B correct. Option A is incorrect because returning null or -1 is a common return value for searching for data. Option D is incorrect because a for loop is typically used for this scenario. Option E is incorrect because you should find out how to code the method and not leave it for the unsuspecting programmer who calls your method. Option C is incorrect because you should run!

## Question 11

### Prompt

Which of the following exceptions must be handled or
    declared in the method in which they are thrown?
    (Choose all that apply.)

    class Apple extends RuntimeException {}
    class Orange extends Exception {}
    class Banana extends Error {}
    class Pear extends Apple {}
    class Tomato extends Orange {}
    class Peach extends Throwable {}
      A. Apple
      B. Orange
      C. Banana
      D. Pear
      E. Tomato
      F. Peach

### Correct answer

B, E, F

### Explanation

An exception that must be handled or declared is a checked exception. A checked exception inherits Exception but not RuntimeException. The entire hierarchy counts, so options B and E are both correct. Option F is also correct, as a class that inherits Throwable but not RuntimeException or Error is also checked.

## Question 12

### Prompt

Which of the following changes, when made
    independently, would make this code compile? (Choose
    all that apply.)

    1:  import java.io.*;
    2:  public class StuckTurkeyCage implements AutoCloseable {
    3:     public void close() throws IOException {
    4:        throw new FileNotFoundException("Cage not
    closed");
    5:     }
    6:     public static void main(String[] args) {
    7:        try (StuckTurkeyCage t = new StuckTurkeyCage()) {
    8:           System.out.println("put turkeys in");
    9:        }
    10:    } }
      A. Remove throws IOException from the declaration on
         line 3.
      B. Add throws Exception to the declaration on line 6.
      C. Change line 9 to } catch (Exception e) {}.
      D. Change line 9 to } finally {}.
      E. The code compiles as is.
      F. None of the above.

### Correct answer

B, C

### Explanation

The code does not compile as is because the exception declared by the close() method must be handled or declared. Option A is incorrect because removing the exception from the declaration causes a compilation error on line 4, as FileNotFoundException is a checked exception that must be handled or declared. Option B is correct because the unhandled exception within the main() method becomes declared. Option C is also correct because the exception becomes handled. Option D is incorrect because the exception remains unhandled.

## Question 13

### Prompt

Which of the following are true statements about
    exception handling in Java? (Choose all that apply.)
      A. A traditional try statement without a catch block
         requires a finally block.
      B. A traditional try statement without a finally block
         requires a catch block.
      C. A traditional try statement with only one statement
         can omit the {}.
      D. A try-with-resources statement without a catch
         block requires a finally block.
      E. A try-with-resources statement without a finally
         block requires a catch block.
      F. A try-with-resources statement with only one
         statement can omit the {}.

### Correct answer

A, B

### Explanation

A try-with-resources statement does not require a catch or finally block. A traditional try statement requires at least one of the two. Neither statement can be written without a body encased in braces, {}. For these reasons, options A and B are correct.

## Question 14

### Prompt

Assuming -g:vars is used when the code is compiled to
    include debug information, what is the output of the
    following code snippet?

    var huey = (String)null;
    Integer dewey = null;
    Object louie = null;
    if(louie == huey.substring(dewey.intValue())) {
       System.out.println("Quack!");
    }
      A. A NullPointerException that does not include any
         variable names in the stack trace
      B. A NullPointerException naming huey in the stack trace
      C. A NullPointerException naming dewey in the stack
         trace
      D. A NullPointerException naming louie in the stack
         trace
      E. A NullPointerException naming huey and louie in the
         stack trace
      F. A NullPointerException naming huey and dewey in the
         stack trace
      G. None of the above

### Correct answer

C

### Explanation

NullPointerException stack traces include the name of the variable that is null by default, making option A incorrect. The first NullPointerException encountered at runtime is when dewey.intValue() is called, making option C correct. Options E and F are incorrect as only one NullPointerException exception can be thrown at a time.

## Question 15

### Prompt

Which of the following, when inserted independently in
    the blank, use locale parameters that are properly
    formatted? (Choose all that apply.)

    import java.util.Locale;
    public class ReadMap implements AutoCloseable {
       private Locale locale;
       private boolean closed = false;
       @Override public void close() {
          System.out.println("Folding map");
          locale = null;
          closed = true;
       }
       public void open() {
          this.locale = ____________;
       }
       public void use() {
          // Implementation omitted
       }
    }
      A. Locale.of("xM")
      B. Locale.of("MQ", "ks")
      C. Locale.of("qw")
      D. Locale.of("wp", "VW")
      E. Locale.create("zp")
      F. new Locale.Builder().setLanguage("yw").setRegion("PM")
      G. The code does not compile regardless of what is
         placed in the blank.

### Correct answer

C, D

### Explanation

The code compiles with the appropriate locale, so option G is incorrect. A locale consists of a required lowercase language code and optional uppercase country code. In the Locale.of() method, the language code is provided first. For these reasons, options C and D are correct. Option E is incorrect because a Locale is created using the Locale.of() method or Locale.Builder class. Option F is really close but is missing build() at the end. Without that, option F does not compile.

## Question 16

### Prompt

Which of the following can be inserted into the blank to
    allow the code to compile and run without throwing an
    exception?

    var f = DateTimeFormatter.ofPattern("hh o'clock");
    System.out.println(f.format(___________________.now()));
      A. ZonedTime
      B. LocalDate
      C. LocalTimestamp
      D. LocalTime
      E. The code does not compile regardless of what is
         placed in the blank.
      F. None of the above.

### Correct answer

F

### Explanation

When creating a custom formatter, any nonsymbol code must be properly escaped using pairs of single quotes (’). In this case, it fails because o is not a symbol. Even if you didn’t know o wasn’t a symbol, the code contains an unmatched single quote. If the properly escaped value of "hh’ o’’clock’" were used, then the correct answer would be option D, LocalTime. Without this change, though, the code throws an exception at runtime, making option F the correct answer. Option B would not be correct because LocalDate values do not have an hour part. Options A and C are incorrect because ZonedTime and LocalTimestamp are not valid date/time classes.

## Question 17

### Prompt

Which of the following statements about resource
    bundles are correct? (Choose all that apply.)
      A. All keys must be in the same resource bundle to be
         used.
      B. A resource bundle is loaded by calling the new
         ResourceBundle() constructor.
      C. Resource bundle values are always read using the
         Properties class.
      D. Changing the default locale lasts for only a single
         run of the program.
      E. If a resource bundle for a specific locale is
         requested, then the resource bundle for the default
         locale will not be used.
      F. It is possible to use a resource bundle for a locale
         without specifying a default locale.

### Correct answer

D, F

### Explanation

Option A is incorrect because Java will look at parent bundles if a key is not found in a specified resource bundle. Option B is incorrect because resource bundles are loaded from static factory methods. Option C is incorrect, as resource bundle values are read from the ResourceBundle object directly. Option D is correct because the locale is changed only in memory. Option E is incorrect, as the resource bundle for the default locale may be used if there is no resource bundle for the specified locale (or its locale without a country code). Finally, option F is correct. The JVM will set a default locale automatically.

## Question 18

### Prompt

What is the output of the following code?

    import java.io.*;
    public class FamilyCar {
       static class Door implements AutoCloseable {
          public void close() {
             System.out.print("D");
       } }
       static class Window implements Closeable {
          public void close() {
             System.out.print("W");
             throw new RuntimeException();
       } }
       public static void main(String[] args) {
          var d = new Door();
          try (d; var w = new Window()) {
             System.out.print("T");
          } catch (Exception e) {
             System.out.print("E");
          } finally {
             System.out.print("F");
          } } }
      A. TWF
      B. TWDF
      C. TWDEF
      D. TWF followed by an exception
      E. TWDF followed by an exception
      F. TWEF followed by an exception
      G. The code does not compile.

### Correct answer

C

### Explanation

After both resources are declared and created in the try-with-resources statement, T is printed as part of the body. Then the try-with-resources completes and closes the resources in the reverse of the order in which they were declared. After W is printed, an exception is thrown. However, the remaining resource still needs to be closed, so D is printed. Once all the resources are closed, the exception is thrown and swallowed in the catch block, causing E to be printed. Last, the finally block is run, printing F. Therefore, the answer is TWDEF and option C is correct.

## Question 19

### Prompt

Suppose that we have the following three properties
    files and code. Which bundles are used on lines 8 and 9,
    respectively?

    Dolphins.properties
    name=The Dolphin
    age=0

    Dolphins_en.properties
    name=Dolly
    age=4

    Dolphins_fr.properties
    name=Dolly

    5: var fr = Locale.of("fr");
    6: Locale.setDefault(Locale.of("en", "US"));
    7: var b = ResourceBundle.getBundle("Dolphins", fr);
    8: b.getString("name");
    9: b.getString("age");
      A. Dolphins.properties and Dolphins.properties
      B. Dolphins.properties and Dolphins_en.properties
      C. Dolphins_en.properties and Dolphins_en.properties
      D. Dolphins_fr.properties and Dolphins.properties
      E. Dolphins_fr.properties and Dolphins_en.properties
      F. The code does not compile.
      G. None of the above.

### Correct answer

D

### Explanation

Java will use Dolphins_fr.properties as the matching resource bundle on line 7 because it is an exact match on the language of the requested locale. Line 8 finds a matching key in this file. Line 9 does not find a match in that file; therefore, it has to look higher up in the hierarchy. Once a bundle is chosen, only resources in that hierarchy are allowed. It cannot use the default locale anymore, but it can use the default resource bundle specified by Dolphins.properties. For these reasons, option D is correct.

## Question 20

### Prompt

What is printed by the following program?

    1:  public class DriveBus {
    2:     public void go() {
    3:        System.out.print("A");
    4:        try {
    5:           stop();
    6:        } catch (ArithmeticException e) {
    7:           System.out.print("B");
    8:        } finally {
    9:           System.out.print("C");
    10:       }
    11:       System.out.print("D");
    12:    }
    13:    public void stop() {
    14:       System.out.print("E");
    15:       Object x = null;
    16:       x.toString();
    17:       System.out.print("F");
    18:    }
    19:    public static void main(String n[]) {
    20:       new DriveBus().go();
    21:    } }
      A. AE
      B. AEBCD
      C. AEC
      D. AECD
      E. AE followed by a stack trace
      F. AEBCD followed by a stack trace
      G. AEC followed by a stack trace
      H. A stack trace with no other output

### Correct answer

G

### Explanation

The main() method invokes go(), and A is printed on line 3. The stop() method is invoked, and E is printed on line 14. Line 16 throws a NullPointerException, so stop() immediately ends, and line 17 doesn’t execute. The exception isn’t caught in go(), so the go() method ends as well, but not before its finally block executes and C is printed on line 9. Because main() doesn’t catch the exception, the stack trace displays, and no further output occurs. For these reasons, AEC is printed followed by a stack trace for a NullPointerException, making option G correct.

## Question 21

### Prompt

Which change allows the following program to compile?

    1: public class AhChoo {
    2:    static class SneezeException extends Exception {}
    3:    static class SniffleException extends SneezeException
    {}
    4:    public static void main(String[] args) {
    5:       try {
    6:          throw new SneezeException();
    7:       } catch (SneezeException | SniffleException e) {
    8:       } finally {}
    9:    } }
      A. Add throws SneezeException to the declaration on line
         4.
      B. Add throws Throwable to the declaration on line 4.
      C. Change line 7 to } catch (SneezeException e) {.
      D. Change line 7 to } catch (SniffleException e) {.
      E. Remove line 7.
      F. The code compiles correctly as is.
      G. None of the above.

### Correct answer

C

### Explanation

The code does not compile because the multi-catch block on line 7 cannot catch both a superclass and a related subclass. Options A and B do not address this problem, so they are incorrect. Since the try body throws SneezeException, it can be caught in a catch block, making option C correct. Option D allows the catch block to compile but causes a compiler error on line 6. Both of the custom exceptions are checked and must be handled or declared in the main() method. A SneezeException is not a SniffleException, so the exception is not handled. Likewise, option E leads to an unhandled exception compiler error on line 6.

## Question 22

### Prompt

What is the output of the following code?

    try {
       LocalDateTime book = LocalDateTime.of(2025, 4, 5, 12,
    30, 20);

    System.out.print(book.format(DateTimeFormatter.ofPattern("m
    ")));

    System.out.print(book.format(DateTimeFormatter.ofPattern("z
    ")));

    System.out.print(DateTimeFormatter.ofPattern("y").format(bo
    ok));
    } catch (Throwable e) {}
      A. 4
      B. 30
      C. 402
      D. 3002
      E. 3002025
      F. 402025
      G. None of the above

### Correct answer

B

### Explanation

For this question, the date used is April 5, 2025, at 12:30:20 p.m. The code compiles, and either form of the formatter is correct: dateTime.format(formatter) or formatter.format(dateTime). The custom format m returns the minute, so 30 is output first. The next line throws an exception as z relates to time zone, and date/time does not have a zone component. This exception is then swallowed by the try/catch block. Since this is the only value printed, option B is correct. If the code had not thrown an exception, the last line would have printed 2025.

## Question 23

### Prompt

Fill in the blank: A class that implements
    _________________ may be in a try-with-resources
    statement. (Choose all that apply.)
      A. AutoCloseable
      B. Resource
      C. Exception
      D. AutomaticResource
      E. Closeable
      F. RuntimeException
      G. Serializable

### Correct answer

A, E

### Explanation

Resources must inherit AutoCloseable to be used in a try-with-resources block. Since Closeable, which is used for I/O classes, extends AutoCloseable, both may be used, making options A and E correct.

## Question 24

### Prompt

What is the output of the following program?

    public class SnowStorm {
       static class WalkToSchool implements AutoCloseable {
          public void close() {
             throw new RuntimeException("flurry");
          } }
       public static void main(String[] args) {
          WalkToSchool walk1 = new WalkToSchool();
          try (walk1; WalkToSchool walk2 = new WalkToSchool())
    {
             throw new RuntimeException("blizzard");
          } catch(Exception e) {
             System.out.println(e.getMessage()
                + " " + e.getSuppressed().length);
          }
          walk1 = null;
       } }
      A. blizzard 0
      B. blizzard 1
      C. blizzard 2
      D. flurry 0
      E. flurry 1
      F. flurry 2
      G. None of the above

### Correct answer

G

### Explanation

The code does not compile because the resource walk1 is not final or effectively final and cannot be used in the declaration of a try-with-resources statement. For this reason, option G is correct. If the line that set walk1 to null were removed, then the code would compile and print blizzard 2 at runtime, with the exception inside the try block being the primary exception since it is thrown first. Then two suppressed exceptions would be added to it when trying to close the AutoCloseable resources.

## Question 25

### Prompt

Assuming U.S. currency is in dollars ($) and German
    currency is in euros (€), what is the output of the
    following program?

    import java.text.NumberFormat;
    import java.util.Locale;
    import java.util.Locale.Category;
    public record Wallet(double money) {
       private String openWallet() {
          Locale.setDefault(Category.DISPLAY,
             new Locale.Builder().setRegion("us").build());
          Locale.setDefault(Category.FORMAT,
             new Locale.Builder().setLanguage("en").build());
          return
    NumberFormat.getCurrencyInstance(Locale.GERMANY)
             .format(money);
       }
       public void printBalance() {
          System.out.println(openWallet());
       }
       public static void main(String... unused) {
          new Wallet(2.4).printBalance();
       } }
      A. 2,40 €
      B. $2.40
      C. 2.4
      D. The code does not compile.
      E. None of the above.

### Correct answer

A

### Explanation

The code compiles and prints the value for Germany, 2,40 €, making option A the correct answer. Note that the default locale category is ignored since an explicit currency locale is selected.

## Question 26

### Prompt

Which lines can fill in the blank to make the following
    code compile? (Choose all that apply.)

    void rollOut() throws ClassCastException {}

    public void transform(String c) {
       try {
          rollOut();
       } catch (IllegalArgumentException
    |________________________) {
       }
    }
      A. IOException a
      B. Error b
      C. NullPointerException c
      D. RuntimeException d
      E. NumberFormatException e
      F. ClassCastException f
G. None of the above. The code contains a compiler
   error regardless of what is inserted into the blank.

### Correct answer

B, F

### Explanation

The try block is not capable of throwing an IOException, making the catch block unreachable code and option A incorrect. Options B and F are correct, as both are unchecked exceptions that do not extend or inherit from IllegalArgumentException. Remember, it is not a good idea to catch Error in practice, although because it is possible, it may come up on the exam. Option C is incorrect because the variable c is declared already in the method declaration. Option D is incorrect because the IllegalArgumentException inherits from RuntimeException, making the first declaration unnecessary. Similarly, option E is incorrect because NumberFormatException inherits from IllegalArgumentException, making the second declaration unnecessary. Since options B and F are correct, option G is incorrect.
