---
chapter: 8
title: "Lambdas and Functional Interfaces"
questionCount: 21
sourceQuestionPdfPages: "749-760"
sourceAnswerPdfPages: "1372-1377"
---

# Chapter 8: Lambdas and Functional Interfaces

## Question 1

### Prompt

What is the result of the following class?

    1:  import java.util.function.*;
    2:
    3:  public class Panda {
    4:     int age;
    5:     public static void main(String[] args) {
    6:        Panda p1 = new Panda();
    7:        p1.age = 1;
    8:        check(p1, p -> p.age < 5);
    9:     }
   10:    private static void check(Panda panda,
   11:       Predicate<Panda> pred) {
   12:       String result =
   13:          pred.test(panda) ? "match" : "not match";
   14:       System.out.print(result);
   15: } }
    A. match
    B. not match
    C. Compiler error on line 8
    D. Compiler error on lines 10 and 11
    E. Compiler error on lines 12 and 13
    F. A runtime exception

### Correct answer

A

### Explanation

This code is correct. Line 8 creates a lambda expression that checks whether the age is less than 5, making option A correct. Since there is only one parameter and it does not specify a type, the parentheses around the parameter are optional. Lines 11 and 13 use the Predicate interface, which declares a test() method.

## Question 2

### Prompt

What is the result of the following code?

   1:  interface Climb {
   2:     boolean isTooHigh(int height, int limit);
   3:  }
   4:
   5:  public class Climber {
   6:     public static void main(String[] args) {
   7:        check((h, m) -> h.append(m).isEmpty(), 5);
   8:     }
   9:     private static void check(Climb climb, int height) {
   10:       if (climb.isTooHigh(height, 10))
   11:          System.out.println("too high");
   12:       else
   13:          System.out.println("ok");
   14:    }
   15: }
    A. ok
    B. too high
    C. Compiler error on line 7.
    D. Compiler error on line 10.
    E. Compiler error on a different line.
    F. A runtime exception is thrown.

### Correct answer

C

### Explanation

The interface takes two int parameters. The code on line 7 attempts to use them as if h is a StringBuilder, making option C correct. It is tricky to use types in a lambda when they are implicitly specified. Remember to check the interface for the real type.

## Question 3

### Prompt

Which statements about functional interfaces are true?
   (Choose all that apply.)
    A. A functional interface can contain default and
        private methods.
    B. A functional interface can be defined as a class or
        an interface.
    C. Abstract methods with signatures that are
        contained in public methods of java.lang.Object do
        not count toward the abstract method count for a
        functional interface.
    D. A functional interface cannot contain static or
        private static methods.
    E. A functional interface must be marked with the
        @FunctionalInterface annotation.

### Correct answer

A, C

### Explanation

A functional interface can contain any number of nonabstract methods, including default, private, static, and private static. For this reason, option A is correct, and option D is incorrect. Option B is incorrect, as classes are never considered functional interfaces. A functional interface contains exactly one abstract method, although methods that have matching signatures as public methods in java.lang.Object do not count toward the single method test. For these reasons, option C is correct. Finally, option E is incorrect. While a functional interface can be marked with the @FunctionalInterface annotation, it is not required.

## Question 4

### Prompt

Which lambda can replace the MySecret class to return
   the same value? (Choose all that apply.)

   interface Secret {
      String magic(double d);
   }

   class MySecret implements Secret {
      public String magic(double d) {
         return "Poof";
      } }
    A. (e) -> "Poof"
    B. (e) -> {"Poof"}
    C. (e) -> { String e = ""; "Poof" }
    D. (e) -> { String e = ""; return "Poof"; }
    E. (e) -> { String e = ""; return "Poof" }
    F. (e) -> { String f = ""; return "Poof"; }

### Correct answer

A, F

### Explanation

Option B is incorrect because it does not use the return keyword. Options C, D, and E are incorrect because the variable e is already in use from the lambda and cannot be redefined. Additionally, option C is missing the return keyword, and option E is missing the semicolon. Therefore, options A and F are correct.

## Question 5

### Prompt

Which of the following functional interfaces contain an
   abstract method that returns a primitive value?
   (Choose all that apply.)
    A. BooleanSupplier
    B. CharSupplier
    C. DoubleSupplier
    D. FloatSupplier
    E. IntSupplier
    F. StringSupplier

### Correct answer

A, C, E

### Explanation

Java includes support for three primitive streams, along with numerous functional interfaces to go with them: int, double, and long. For this reason, options C and E are correct. Additionally, there is a BooleanSupplier functional interface, making option A correct. Java does not include primitive streams or related functional interfaces for other numeric data types, making options B and D incorrect. Option F is incorrect because String is not a primitive but an object. Only primitives have custom suppliers.

## Question 6

### Prompt

Which of the following lambda expressions can be
   passed to a function of Predicate<String> type? (Choose
   all that apply.)
    A. s -> s.isEmpty()
    B. s --> s.isEmpty()
    C. (String s) -> s.isEmpty()
    D. (String s) --> s.isEmpty()
    E. (StringBuilder s) -> s.isEmpty()
    F. (StringBuilder s) --> s.isEmpty()

### Correct answer

A, C

### Explanation

Predicate<String> takes a parameter list of one parameter using the specified type. Options E and F are incorrect because they specify the wrong type. Options B, D, and F are incorrect because they use the wrong syntax for the arrow operator. This leaves us with options A and C as the answers.

## Question 7

### Prompt

Which of these statements is true about the following
   code?

   public void method() {
      x((var x) -> {}, (var x, var y) -> false);
   }
   public void x(Consumer<String> x, BinaryOperator<Boolean>
   y) {}
    A. The code does not compile because of one of the
        variables named x.
    B. The code does not compile because of one of the
        variables named y.
      C. The code does not compile for another reason.
      D. The code compiles, and the x in each lambda refers
         to the same type.
      E. The code compiles, and the x in each lambda refers
         to a different type.

### Correct answer

E

### Explanation

While there appears to have been a variable name shortage when this code was written, it does compile. Lambda variables and method names are allowed to be the same. The x lambda parameter is scoped to within each lambda, so it is allowed to be reused. The type is inferred by the method it calls. The first lambda maps x to a String and the second to a Boolean. Therefore, option E is correct.

## Question 8

### Prompt

Which of the following is equivalent to this code?

    UnaryOperator<Integer> u = x -> x * x;
      A. BiFunction<Integer> f = x -> x*x;
      B. BiFunction<Integer, Integer> f = x -> x*x;
      C. BinaryOperator<Integer, Integer> f = x -> x*x;
      D. Function<Integer> f = x -> x*x;
      E. Function<Integer, Integer> f = x -> x*x;
      F. None of the above

### Correct answer

E

### Explanation

The question starts with a UnaryOperator<Integer>, which takes one parameter and returns a value of the same type. Therefore, option E is correct, as UnaryOperator extends Function. Notice that other options don’t even compile because they have the wrong number of generic types for the functional interface provided. You should know that a BiFunction<T,U,R> takes three generic arguments, a BinaryOperator<T> takes one generic argument, and a Function<T,R> takes two generic arguments.

## Question 9

### Prompt

Which statements are true? (Choose all that apply.)
      A. The Consumer interface is good for printing out an
         existing value.
      B. The Supplier interface is good for printing out an
         existing value.
      C. The IntegerSupplier interface returns an int.
      D. The Predicate interface returns an int.
      E. The Function interface has a method named test().
      F. The Predicate interface has a method named test().

### Correct answer

A, F

### Explanation

Option A is correct, and option B is incorrect because a Supplier returns a value while a Consumer takes one and acts on it. Option C is tricky. IntSupplier does return an int. However, the option asks about IntegerSupplier, which doesn’t exist. Option D is incorrect because a Predicate returns a boolean. It does have a method named test(), making option F correct. Finally, option E is incorrect because Function has an apply() method.

## Question 10

### Prompt

Which of the following can be inserted without causing
    a compilation error? (Choose all that apply.)

    public void remove(List<Character> chars) {
       char end = 'z';
       Predicate<Character> predicate = c -> {
          char start = 'a'; return start <= c && c <= end; };
       // INSERT LINE HERE
    }
      A. char start = ’a’;
      B. char c = ’x’;
      C. chars = null;
      D. end = ’1’;
      E. None of the above

### Correct answer

A, B, C

### Explanation

Since the scope of start and c is within the lambda, the variables can be declared or updated after it without issue, making options A, B, and C correct. Option D is incorrect because setting end prevents it from being effectively final.

## Question 11

### Prompt

How many times is true printed out by this code?

    import java.util.function.Predicate;
    public class Fantasy {
       public static void scary(String animal) {
          var dino = s -> "dino".equals(animal);
          var dragon = s -> "dragon".equals(animal);
          var combined = dino.or(dragon);
          System.out.println(combined.test(animal));
       }
       public static void main(String[] args) {
          scary("dino");
          scary("dragon");
          scary("unicorn");
       }
    }
      A. One.
      B. Two.
      C. Three.
      D. The code does not compile.
      E. A runtime exception is thrown.

### Correct answer

D

### Explanation

The code does not compile because the lambdas are assigned to var. The compiler does not have enough information to determine they are of type Predicate<String>. Therefore, option D is correct.

## Question 12

### Prompt

What does the following code output?

    Function<Integer, Integer> s = a -> a + 4;
    Function<Integer, Integer> t = a -> a * 3;
    Function<Integer, Integer> c = s.compose(t);
    System.out.print(c.apply(1));
      A. 7
      B. 15
      C. The code does not compile because of the data
         types in the lambda expressions.
      D. The code does not compile because of the compose()
         call.
      E. The code does not compile for another reason.

### Correct answer

A

### Explanation

The a.compose(b) method calls the Function parameter b before the reference Function variable a. In this case, that means we multiply by 3 before adding 4. This gives a result of 7, making option A correct.

## Question 13

### Prompt

Which is true of the following code?

    int length = 3;

    for (int i = 0; i<3; i++) {
       if (i%2 == 0) {
          Supplier<Integer> supplier = () -> length; // A
          System.out.println(supplier.get());        // B
       } else {
          int j = i;
          Supplier<Integer> supplier = () -> j;      // C
          System.out.println(supplier.get());        // D
       }
    }
      A. The first compiler error is on line A.
      B. The first compiler error is on line B.
      C. The first compiler error is on line C.
      D. The first compiler error is on line D.
      E. The code compiles successfully.

### Correct answer

E

### Explanation

Lambdas are only allowed to reference final or effectively final variables. You can tell the variable j is effectively final because adding a final keyword before it wouldn’t introduce a compiler error. Each time the else statement is executed, the variable is redeclared and goes out of scope. Therefore, it is not reassigned. Similarly, length is effectively final. There are no compiler errors, and option E is correct.

## Question 14

### Prompt

Which of the following are valid lambda expressions?
    (Choose all that apply.)
      A. (Wolf w, var c) -> 39
      B. (final Camel c) -> {}
      C. (a,b,c) -> {int b = 3; return 2;}
      D. (x,y) -> new RuntimeException()
      E. (var y) -> return 0;
      F. () -> {float r}
      G. (Cat a, b) -> {}

### Correct answer

B, D

### Explanation

Option B is a valid functional interface, one that could be assigned to a Consumer<Camel> reference. Notice that the final modifier is permitted on variables in the parameter list. Option D is correct, as the exception is being returned as an object and not thrown. This would be compatible with a BiFunction that included RuntimeException as its return type. Options A and G are incorrect because they mix format types for the parameters. Option C is invalid because the variable b is used twice. Option E is incorrect, as a return statement is permitted only inside braces ({}). Option F is incorrect because the variable declaration requires a semicolon (;) after it.

## Question 15

### Prompt

Which lambda expression, when entered into the blank
    line in the following code, causes the program to print
    hahaha? (Choose all that apply.)

    import java.util.function.Predicate;
    public class Hyena {
       private int age = 1;
       public static void main(String[] args) {
          var p = new Hyena();
          double height = 10;
          int age = 1;
          testLaugh(p,  ________________);
          age = 2;
       }
       static void testLaugh(Hyena panda, Predicate<Hyena>
    joke) {
          var r = joke.test(panda) ? "hahaha" : "silence";
          System.out.print(r);
       }
    }
      A. var -> p.age <= 10
      B. shenzi -> age==1
      C. p -> true
      D. age==1
      E. shenzi -> age==2
      F. h -> h.age < 5
      G. None of the above, as the code does not compile

### Correct answer

A, F

### Explanation

Option A is a valid lambda expression. While main() is a static method, it can access age since it is using a reference to an instance of Hyena, which is effectively final in this method. Since var is not a reserved word, it may be used for variable names. Option F is also correct, with the lambda variable being a reference to a Hyena object. The variable is processed using deferred execution in the testLaugh() method. Options B and E are incorrect; since the local variable age is not effectively final, this would lead to a compilation error. Option C would also cause a compilation error, since the expression uses the variable name p, which is already declared within the method. Finally, option D is incorrect, as this is not even a lambda expression.

## Question 16

### Prompt

Which of the following can be inserted without causing
    a compilation error?

    public void remove(List<Character> chars) {
       char end = 'z';
       // INSERT LINE HERE

       Predicate<Character> predicate =  c -> {
          char start = 'a'; return start <= c && c <= end; };
    }
      A. char start = ’a’;
      B. char c = ’x’;
      C. chars = null;
      D. end = ’1’;
      E. None of the above

### Correct answer

C

### Explanation

Lambdas are not allowed to redeclare local variables, making options A and B incorrect. Option D is incorrect because setting end prevents it from being effectively final. Lambdas are only allowed to reference final or effectively final variables. Option C compiles since chars is not used.

## Question 17

### Prompt

What is the result of running the following class?

    1:  import java.util.function.*;
    2:
    3:  public class Panda {
    4:     int age;
    5:     public static void main(String[] args) {
    6:        Panda p1 = new Panda();
    7:        p1.age = 1;
    8:        check(p1, p -> {p.age < 5});
    9:     }
    10:    private static void check(Panda panda,
    11:       Predicate<Panda> pred) {
    12:       String result = pred.test(panda)
    13:          ? "match" : "not match";
    14:       System.out.print(result);
    15: } }
      A. match
      B. not match
      C. Compiler error on line 8.
      D. Compiler error on line 10.
      E. Compiler error on line 12.
      F. A runtime exception is thrown.

### Correct answer

C

### Explanation

Line 8 uses braces around the body. This means the return keyword and semicolon are required. Since the code doesn’t compile, option C is the answer.

## Question 18

### Prompt

Which functional interfaces complete the following
    code? For line 7, assume m and n are instances of
    functional interfaces that exist and have the same type
    as y. (Choose three.)

    6:  _____________ x = String::new;
    7:  _____________ y = m.andThen(n);
    8:  _____________ z = a -> a + a;
      A. BinaryConsumer<String, String>
      B. BiConsumer<String, String>
      C. BinaryFunction<String, String>
      D. BiFunction<String, String>
      E. Predicate<String>
      F. Supplier<String>
      G. UnaryOperator<String>
      H. UnaryOperator<String, String>

### Correct answer

B, F, G

### Explanation

We can eliminate four choices right away. Options A and C are there to mislead you; these interfaces don’t exist. Option D is incorrect because a BiFunction<T,U,R> takes three generic arguments, not two. Option E is incorrect because none of the examples returns a boolean. The declaration on line 6 doesn’t take any parameters, and it returns a String, so a Supplier<String> can fill in the blank, making option F correct. The declaration on line 7 requires you to recognize that Consumer and Function, along with their binary equivalents, have an andThen() method. This makes option B correct. Finally, line 8 takes a single parameter, and it returns the same type, which is a UnaryOperator. Since the types are the same, only one generic parameter is needed, making option G correct.

## Question 19

### Prompt

Which of the following compiles and prints out the
    entire set?

    Set<?> set = Set.of("lion", "tiger", "bear");
    var s = Set.copyOf(set);
    Consumer<Object> consumer =  ________________;
    s.forEach(consumer);
      A. () -> System.out.println(s)
      B. s -> System.out.println(s)
      C. (s) -> System.out.println(s)
      D. System.out.println(s)
      E. System::out::println
      F. System.out::println

### Correct answer

F

### Explanation

While there is a lot in this question trying to confuse you, note that there are no options about the code not compiling. This allows you to focus on the lambdas and method references. Option A is incorrect because a Consumer requires one parameter. Options B and C are close. The syntax for the lambda is correct. However, s is already defined as a local variable, and therefore the lambda can’t redefine it. Options D and E use incorrect syntax for a method reference. Option F is correct.

## Question 20

### Prompt

Which lambda can replace the new Sloth() call in the
    main() method and produce the same output at runtime?

    import java.util.List;
    interface Yawn {
       String yawn(double d, List<Integer> time);
    }
    class Sloth implements Yawn {
       public String yawn(double zzz, List<Integer> time) {
          return "Sleep: " + zzz;
       } }
    public class Vet {
       public static String takeNap(Yawn y) {
          return y.yawn(10, null);
       }
       public static void main(String... unused) {
          System.out.print(takeNap(new Sloth()));
       } }
      A. (z,f) -> { String x = ""; return "Sleep: " + x }
      B. (t,s) -> { String t = ""; return "Sleep: " + t; }
      C. (w,q) -> {"Sleep: " + w}
      D. (e,u) -> { String g = ""; "Sleep: " + e }
      E. (a,b) -> "Sleep: " + (double)(b==null ? a : a)
      F. (r,k) -> { String g = ""; return "Sleep:"; }
      G. None of the above, as the program does not
         compile

### Correct answer

E

### Explanation

Option A does not compile because the second statement within the block is missing a semicolon (;) at the end. Option B is an invalid lambda expression because t is defined twice: in the parameter list and within the lambda expression. Options C and D are both missing a return statement and semicolon. Options E and F are both valid lambda expressions, although only option E matches the behavior of the Sloth class. In particular, option F only prints Sleep:, not Sleep: 10.0.

## Question 21

### Prompt

Which of the following are valid functional interfaces?
    (Choose all that apply.)

    public interface Transport {
       public int go();
       public boolean equals(Object o);
    }

    public abstract class Car {
       public abstract Object swim(double speed, int duration);
    }

public interface Locomotive extends Train {
   public int getSpeed();
}

public interface Train extends Transport {}

abstract interface Spaceship extends Transport {
   default int blastOff();
}

public interface Boat {
   int hashCode();
   int hashCode(String input);
}
 A. Boat
 B. Car
 C. Locomotive
 D. Spaceship
 E. Transport
 F. Train
 G. None of these is a valid functional interface.

### Correct answer

A, E, F

### Explanation

A valid functional interface is one that contains a single abstract method, excluding any public methods that are already defined in the java.lang.Object class. Transport and Boat are valid functional interfaces, as they each contain a single abstract method: go() and hashCode(String), respectively. This gives us options A and E. Since the other methods are part of Object, they do not count as abstract methods. Train is also a functional interface since it extends Transport and does not define any additional abstract methods. This adds option F as the final correct answer. Car is not a functional interface because it is an abstract class. Locomotive is not a functional interface because it includes two abstract methods, one of which is inherited. Finally, Spaceship is not a valid interface, let alone a functional interface, because a default method must provide a body. A quick way to test whether an interface is a functional interface is to apply the @FunctionalInterface annotation and check if the code still compiles.
