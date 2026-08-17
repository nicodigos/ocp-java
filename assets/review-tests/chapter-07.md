---
chapter: 7
title: "Beyond Classes"
questionCount: 30
sourceQuestionPdfPages: "682-701"
sourceAnswerPdfPages: "1364-1371"
---

# Chapter 7: Beyond Classes

## Question 1

### Prompt

Which of the following are valid record declarations?
    (Choose all that apply.)
   public record Iguana(int age) {
      private static final int age = 10; }

   public final record Gecko() {}

   public abstract record Chameleon()  {
      private static String name; }

   public record BeardedDragon(boolean fun) {
      @Override public boolean fun() { return false; } }

   public record Reptile(long size) {
      public Reptile {
         if(size == 1) throw new IllegalArgumentException();
      } }

   public record Newt(double age) extends Reptile {
      public Newt(double age) {
         age = this.age % 2 == 0 ? 5 : 10;
      } }
    A. Iguana
    B. Gecko
    C. Chameleon
    D. BeardedDragon
    E. Reptile
     F. Newt
    G. None of the above

### Correct answer

B, D, E

### Explanation

Iguana does not compile, as it declares a static field with the same name as an instance field. Records are implicitly final and cannot be marked abstract, which is why Gecko compiles and Chameleon does not, making option B correct. Notice in Gecko that records are not required to declare any fields. BeardedDragon also compiles, as records may override any accessor methods, making option D correct. Reptile compiles as it contains a valid compact constructor, making option E correct. Newt does not compile because it cannot extend another record. It also does not compile because the compact constructor tries to read this.age, which is not permitted.

## Question 2

### Prompt

Which of the following statements can be inserted in
   the blank line so that the code will compile
   successfully? (Choose all that apply.)

   interface CanHop {}
   public class Frog implements CanHop {
      public static void main(String[] args) {
         ____________ frog = new TurtleFrog();
      }
   }
   class BrazilianHornedFrog extends Frog {}
   class TurtleFrog extends Frog {}
    A. Frog
    B. TurtleFrog
    C. BrazilianHornedFrog
    D. CanHop
    E. var
    F. Long
    G. None of the above; the code contains a compilation
        error.

### Correct answer

A, B, D, E

### Explanation

The code compiles without issue, so option G is incorrect. The blank can be filled with any class or interface that is a supertype of TurtleFrog. Option A is the direct superclass of TurtleFrog, and option B is the same class, so both are correct. BrazilianHornedFrog is not a superclass of TurtleFrog, so option C is incorrect. TurtleFrog inherits the CanHop interface, so option D is correct. Option E is also correct, as var is permitted when the type is known. Finally, Long is an unrelated class that is not a superclass of TurtleFrog and is therefore incorrect.

## Question 3

### Prompt

What is the result of the following program?

   11: public class Favorites {
   12:    enum Flavors {
   13:       VANILLA, CHOCOLATE, STRAWBERRY
   14:       public Flavors() {}
   15:    }
   16:    public static void main(String[] args) {
   17:       for(final var e : Flavors.values())
   18:          System.out.print((e.ordinal() % 2) + " ");
   19:    } }
    A. 0 1 0
    B. 1 0 1
    C. Exactly one line of code does not compile.
    D. More than one line of code does not compile.
    E. The code compiles but produces an exception at
        runtime.
    F. None of the above.

### Correct answer

D

### Explanation

When an enum contains only a list of values, the semicolon (;) after the list is optional. When an enum contains any other members, such as a constructor or variable, the semicolon is required. For this reason, line 13 does not compile. Line 14 also does not compile, as enum constructors are implicitly private and cannot be declared as public or protected. For this reason, option D is correct. If these two issues were corrected, then the program would print 0 1 0 at runtime.

## Question 4

### Prompt

What is the output of the following program?

   public sealed class ArmoredAnimal permits Armadillo {
      public ArmoredAnimal(int size) {}
      @Override public String toString() { return "Strong"; }
      public static void main(String[] a) {
         var c = new Armadillo(10, null);
         System.out.println(c);
      }
   }
   class Armadillo extends ArmoredAnimal {
      @Override public String toString() { return "Cute"; }
      public Armadillo(int size, String name) {
         super(size);
      }
   }
    A. Strong
    B. Cute
    C. The program does not compile.
    D. The code compiles but produces an exception at
        runtime.
    E. None of the above.

### Correct answer

C

### Explanation

A class extending a sealed class must be marked final, sealed, or non-sealed. Since Armadillo is missing a modifier, the code does not compile, and option C is correct.

## Question 5

### Prompt

Which statement about the following program is
   correct?

   1:  interface HasExoskeleton {
   2:     double size = 2.0f;
   3:     abstract int getNumberOfSections();
   4:  }
   5:  abstract class Insect implements HasExoskeleton {
   6:     abstract int getNumberOfLegs();
   7:  }
   8:  public class Beetle extends Insect {
   9:     int getNumberOfLegs() { return 6; }
   10:    int getNumberOfSections(int count) { return 1; }
   11: }
    A. It compiles without issue.
    B. The code will produce a ClassCastException if called
        at runtime.
    C. The code will not compile because of line 2.
    D. The code will not compile because of line 5.
    E. The code will not compile because of line 8.
    F. The code will not compile because of line 10.

### Correct answer

E

### Explanation

First, the declarations of HasExoskeleton and Insect are correct and do not contain any errors, making options C and D incorrect. The concrete class Beetle extends Insect and inherits two abstract methods, getNumberOfSections() and getNumberOfLegs(). The Beetle class includes an overloaded version of getNumberOfSections() that takes an int value. The method declaration is valid, making option F incorrect, although it does not satisfy the abstract method requirement inherited from HasExoskeleton. For this reason, only one of the two abstract methods is properly overridden. The Beetle class therefore does not compile, and option E is correct.

## Question 6

### Prompt

Which statements about the following program are
   correct? (Choose all that apply.)

   1: public abstract interface Herbivore {
   2:    int amount = 10;
   3:    public void eatGrass();
   4:    public abstract int chew() { return 13; }
   5: }
   6:
   7: abstract class IsAPlant extends Herbivore {
   8:    Object eatGrass(int season) { return null; }
   9: }
    A. It compiles and runs without issue.
    B. The code will not compile because of line 1.
    C. The code will not compile because of line 2.
    D. The code will not compile because of line 4.
    E. The code will not compile because of line 7.
    F. The code will not compile because line 8 contains
        an invalid method override.

### Correct answer

D, E

### Explanation

Line 4 does not compile, since an abstract method cannot include a body. Line 7 also does not compile because the wrong keyword is used. A class implements an interface; it does not extend it. For these reasons, options D and E are correct.

## Question 7

### Prompt

What is the output of the following program?

   1: interface Aquatic {
   2:    int getNumOfGills(int p);
   3: }
   4: public class ClownFish implements Aquatic {
   5:    String getNumOfGills() { return "14"; }
   6:    int getNumOfGills(int input) { return 15; }
   7:    public static void main(String[] args) {
   8:       System.out.println(new
   ClownFish().getNumOfGills(-1));
   9: } }
    A. 14
    B. 15
    C. The code will not compile because of line 4.
    D. The code will not compile because of line 5.
    E. The code will not compile because of line 6.
    F. None of the above.

### Correct answer

E

### Explanation

The inherited interface method getNumOfGills(int) is implicitly public; therefore, it must be declared public in any concrete class that implements the interface. Since the method uses the package (default) modifier in the ClownFish class, line 6 does not compile, making option E the correct answer. If the method declaration were corrected to include public on line 6, then the program would compile and print 15 at runtime, and option B would be the correct answer.

## Question 8

### Prompt

Given the following, select the statements that can be
   inserted into the blank line so that the code will
   compile and print true at runtime? (Choose all that
   apply.)

   record Walrus(List<String> diet) {}
   record Exhibit(Walrus animal, String location) {}

   var e = new Exhibit(new Walrus(List.of("Wally")), "Artic");
   System.out.print(e instanceof _____________);
    A. Exhibit(Walrus(List<Integer> z), Object a)
    B. Exhibit(Walrus(List m), Object n)
    C. Object w && w.animal().diet().size() == 0
    D. Exhibit(Walrus(var i), var i)
    E. Exhibit(var p, var q)
    F. Exhibit(List<?> g, var h)
    G. Exhibit(var x, CharSequence y)
    H. Exhibit(Walrus(null), var v)
     I. None of the above

### Correct answer

B, E, G

### Explanation

Options A and F do not compile because they are not compatible with List<String>. Option C does not compile because the reference type of w is Object, which doesn’t have an animal() method. Option D does not compile because the variable i is used twice in the same pattern matching statement. Option H does not compile because you can’t use null in a pattern matching statement. Options B, E, and G correctly compile and print true at runtime.

## Question 9

### Prompt

Which of the following statements can be inserted in
   the blank so that the code will compile successfully?
   (Choose all that apply.)

   abstract class Snake {}
   class Cobra extends Snake {}
   class GardenSnake extends Cobra {}
   public class SnakeHandler {
       private Snake snakey;
       public void setSnake(Snake mySnake) { this.snakey =
    mySnake; }
       public static void main(String[] args) {
          new SnakeHandler().setSnake(_____________);
       } }
      A. new Cobra()
      B. new Snake()
      C. new Object()
      D. new String("Snake")
      E. new GardenSnake()
      F. null
      G. None of the above. The class does not compile,
         regardless of the value inserted in the blank.

### Correct answer

A, E, F

### Explanation

The setSnake() method requires an instance of Snake. Cobra is a direct subclass, while GardenSnake is an indirect subclass. For these reasons, options A and E are correct. Option B is incorrect because Snake is abstract and requires a concrete subclass for instantiation. Option C is incorrect because Object is a supertype of Snake, not a subtype. Option D is incorrect as String is an unrelated class and does not inherit Snake. Finally, a null value can always be passed as an object value, regardless of type, so option F is also correct.

## Question 10

### Prompt

What types can be inserted in the blanks on the lines
    marked X and Z that allow the code to compile? (Choose
    all that apply.)

    interface Walk { private static List move() { return null;
    } }
    interface Run extends Walk { public ArrayList move(); }
    class Leopard implements Walk {
       public ___________ move() {  // X
          return null;
       }
    }
    class Panther implements Run {
       public  move(___________) {  // Z
          return null;
       }
    }
      A. Integer on the line marked X
      B. ArrayList on the line marked X
      C. List on the line marked X
      D. List on the line marked Z
      E. ArrayList on the line marked Z
      F. None of the above, since the Run interface does not
         compile.
      G. Does not compile for a different reason.

### Correct answer

A, B, C, E

### Explanation

Walk declares a private method that is not inherited in any of its subtypes. For this reason, any valid class is supported on line X, making options A, B, and C correct. Line Z is more restrictive, with only ArrayList or subtypes of ArrayList supported, making option E correct.

## Question 11

### Prompt

What is the result of compiling and executing the
    following code?

    1:  public class Movie {
    2:     private int butter = 5;
    3:     private Movie() {}
    4:     protected class Popcorn {
    5:        private Popcorn() {}
    6:        public static int butter = 10;
    7:        public void startMovie() {
    8:           System.out.println(butter);
    9:        }
    10:    }
    11:    public static void main(String[] args) {
    12:       var movie = new Movie();
    13:       Movie.Popcorn in = new Movie().new Popcorn();
    14:       in.startMovie();
    15:    } }
      A. The output is 5.
      B. The output is 10.
      C. Line 6 generates a compiler error.
      D. Line 12 generates a compiler error.
      E. Line 13 generates a compiler error.
      F. The code compiles but produces an exception at
         runtime.

### Correct answer

B

### Explanation

Inner classes can contain static variables, so the code compiles. Remember that private constructors can be used by any methods within the outer class. The butter reference on line 8 refers to the inner class variable defined on line 6, with the output being 10 at runtime, and making option B correct.

## Question 12

### Prompt

Which variables or members are accessible from within
    the hiss() method? (Choose all that apply.)

    13: public class BoaConstrictor {
    14:    private Body body;
    15:    BoaConstrictor(Body b) { this.body = b; }
    16:    private long tail = 10;
    17:    record Body(int stripes) {
    18:       private static int counter = 0;
    19:       int counter() { return counter; }
    20:       Body {
    21:          stripes = stripes + counter++;
    22:       }
    23:       private void hiss() {} } }
      A. counter()
      B. tail
      C. body
      D. stripes()
      E. stripes
      F. counter
      G. Line 15 does not compile.
      H. Line 17 does not compile.
       I. Lines 20–22 do not compile.

### Correct answer

A, D, E, F

### Explanation

The code compiles, making options G, H, and I incorrect. The hiss() method is an instance member, so it can access any visible static members inside itself or the outer class, making option F correct. It can also access instance variables and methods within the record, making options A, D, and E correct. Because nested records are inherently static, it cannot access body or tail, which are instance members of the outer class, making options B and C incorrect.

## Question 13

### Prompt

What is the result of the following program?

    public class Weather {
       enum Seasons {
          WINTER, SPRING, SUMMER, FALL
       }

       public static void main(String[] args) {
          Seasons v = null;
          switch (v) {
             case Seasons.SPRING -> System.out.print("s");
             case Seasons.WINTER -> System.out.print("w");
             case Seasons.SUMMER -> System.out.print("m");
             default -> System.out.println("missing data"); }
       } }
      A. s
      B. w
      C. m
      D. missing data
      E. Exactly one line of code does not compile.
      F. More than one line of code does not compile.
      G. The code compiles but produces an exception at
         runtime.

### Correct answer

G

### Explanation

The code compiles without issue, so options E and F are incorrect. It prints a NullPointerException at runtime, making option G correct.

## Question 14

### Prompt

Which statements about sealed classes are correct?
    (Choose all that apply.)
      A. A sealed interface restricts which subinterfaces
         may extend it.
      B. A sealed class cannot be indirectly extended by a
         class that is not listed in its permits clause.
      C. A sealed class can be extended by an abstract class.
      D. A sealed class can be extended by a subclass that
         uses the nonsealed modifier.
      E. A sealed interface restricts which subclasses may
         implement it.
      F. A sealed class cannot contain any nested
         subclasses.
      G. None of the above.

### Correct answer

A, C, E

### Explanation

A sealed interface restricts which interfaces may extend it, or which classes may implement it, making options A and E correct. Option B is incorrect. For example, a non-sealed subclass allows classes not listed in the permits clause to indirectly extend the sealed class. Option C is correct. While a sealed class is commonly extended by a subclass marked final, it can also be extended by a sealed or non-sealed subclass marked abstract. Option D is incorrect, as the modifier is non-sealed, not nonsealed. Finally, option F is incorrect, as sealed classes can contain nested subclasses.

## Question 15

### Prompt

Which line allows the code to print Not scared at
    runtime?

    public class Ghost {
       public static void boo() {
          System.out.println("Not scared");
       }
       protected final class Spirit {
          public void boo() {
             System.out.println("Booo!!!");
          }
       }
       public static void main(String... haunt) {
          var g = new Ghost().new Spirit() {};
          _______________________________;
       } }
      A. g.boo()
      B. g.super.boo()
      C. new Ghost().boo()
      D. g.Ghost.boo()
      E. new Spirit().boo()
      F. None of the above

### Correct answer

F

### Explanation

Trick question—the code does not compile! For this reason, option F is correct. The Spirit class is marked final, so it cannot be extended. The main() method uses an anonymous class that inherits from Spirit, which is not allowed. If Spirit were not marked final, then option C would be correct. Option A would print Booo!!!, while options B, D, and E would not compile for various reasons.

## Question 16

### Prompt

The following code appears in a file named Ostrich.java.
    What is the result of compiling the source file?

    1: public class Ostrich {
    2:    private int count;
    3:    static class OstrichWrangler {
    4:       public int stampede() {
    5:          return count;
    6:       } } }
      A. The code compiles successfully, and one bytecode
         file is generated: Ostrich.class.
      B. The code compiles successfully, and two bytecode
         files are generated: Ostrich.class and
         OstrichWrangler.class.
      C. The code compiles successfully, and two bytecode
         files are generated: Ostrich.class and
         Ostrich$OstrichWrangler.class.
      D. A compiler error occurs on line 3.
      E. A compiler error occurs on line 5.

### Correct answer

E

### Explanation

The OstrichWrangler class is a static nested class; therefore, it cannot access the instance member count. For this reason, line 5 does not compile, and option E is correct.

## Question 17

### Prompt

Which lines of the following interface declarations do
    not compile? (Choose all that apply.)

    1: public interface Omnivore {
    2:    int amount = 10;
    3:    static boolean gather = true;
    4:    static void eatGrass() {}
    5:    int findMore() { return 2; }
    6:    default float rest() { return 2; }
    7:    protected int chew() { return 13; }
    8:    private static void eatLeaves() {}
    9: }
      A. All of the lines compile without issue.
      B. Line 2.
      C. Line 3.
      D. Line 4.
      E. Line 5.
      F. Line 6.
      G. Line 7.
      H. Line 8.

### Correct answer

E, G

### Explanation

Lines 2 and 3 compile with interface variables implicitly public, static, and final. Line 4 also compiles, as static methods are implicitly public. Line 5 does not compile, making option E correct. Non-static interface methods with a body must be explicitly marked private or default. Line 6 compiles, with the public modifier being added by the compiler. Line 7 does not compile, as interfaces do not have protected members, making option G correct. Finally, line 8 compiles without issue.

## Question 18

### Prompt

What is printed by the following program?

    public class Deer {
       enum Food {APPLES, BERRIES, GRASS}
       protected class Diet {
          private Food getFavorite() {
             return Food.BERRIES;
          }
       }
       public static void main(String[] seasons) {
          System.out.print(switch(new Diet().getFavorite()) {
             case APPLES -> "a";
             case BERRIES -> "b";
             default -> "c";
          });
       } }
      A. a
      B. b
      C. c
      D. The code declaration of the Diet class does not
         compile.
      E. The main() method does not compile.
      F. The code compiles but produces an exception at
         runtime.
      G. None of the above.

### Correct answer

E

### Explanation

Diet is an inner class, which requires an instance of Deer to instantiate. Since the main() method is static, there is no such instance. Therefore, the main() method does not compile, and option E is correct. If a reference to Deer were used, such as calling new Deer().new Diet(), then the code would compile and print b at runtime.

## Question 19

### Prompt

Which of the following is printed by the Bear program?

    public class Bear {
       enum FOOD {
          BERRIES, INSECTS {
             public boolean isHealthy() { return true; }},
          FISH, ROOTS, COOKIES, HONEY;
          public abstract boolean isHealthy();
       }
       public static void main(String[] args) {
          System.out.print(FOOD.INSECTS);
          System.out.print(FOOD.INSECTS.ordinal());
          System.out.print(FOOD.INSECTS.isHealthy());
          System.out.print(FOOD.COOKIES.isHealthy());
       } }
      A. insects
      B. Insects
      C. 0
      D. 1
      E. false
      F. The code does not compile.

### Correct answer

F

### Explanation

The isHealthy() method is marked abstract in the enum; therefore, it must be implemented in each enum value declaration. Since only INSECTS implements it, the code does not compile, making option F correct.

## Question 20

### Prompt

What is the output of this code?

    13: record Gorilla(int x, Double y) {
    14:    Gorilla {}
    15:    Gorilla() { this(1,2.0); }
    16: }
    17: record Family(Gorilla parent1, Gorilla parent2) {}
    18:
    19: var family = new Family(
    20:    new Gorilla(1, null), new Gorilla(0, 1.2));
    21: System.out.print(switch (family) {
    22:    case Family(var a, var b) -> "1";
    23:    case Family(Gorilla c, Gorilla (int d, double e)) ->
    "2";
    24:    case Family(Gorilla (int f, Double g), var h) ->
    "3";
    25:    case Family(Gorilla i, Gorilla (int j, Double k)) ->
    "4";
    26:    case Family(Object m, Object n) -> "5";
    27:    case null -> "6";
    28:    default -> "7";
    29: });
      A. 1
      B. 2
      C. 3
      D. 4
      E. 5
      F. 6
      G. 7
      H. None of the above

### Correct answer

H

### Explanation

The record declarations compile but the switch expression does not, making option H correct. First, the second case statement does not compile, as double is not compatible with Double. Next, the pattern matching case statement on line 22 dominates the ones on lines 23– 25. If three of them were to be removed (including the second one), then the code would compile and print the value associated with the remaining one.

## Question 21

### Prompt

Given the following record declaration, which line of
    code can fill in the blank and allow the code to compile?

    public record RabbitFood(int size, String brand, LocalDate
    expires) {
       public static int MAX_STORAGE = 100;
       public RabbitFood() {
          __________________________;
       }
    }
      A. size = MAX_STORAGE
      B. this.size = 10
      C. if(expires.isAfter(LocalDate.now())) throw new
          RuntimeException()
      D. if(brand==null) super.brand = "Unknown"
      E. throw new RuntimeException()
      F. None of the above

### Correct answer

F

### Explanation

The record defines an overloaded constructor using parentheses, not a compact one. For this reason, the first line must be a call to another constructor, such as this(500, "Acme", LocalDate.now()). For this reason, the code does not compile and option F is correct.

## Question 22

### Prompt

Which of the following can be inserted in the rest()
    method? (Choose all that apply.)

    public class Lion {
       class Cub {}
       static class Den {}
       static void rest() {
          ________________;
       } }
      A. Cub a = Lion.new Cub()
      B. Lion.Cub b = new Lion().Cub()
      C. Lion.Cub c = new Lion().new Cub()
      D. var d = new Den()
      E. var e = Lion.new Cub()
      F. Lion.Den f = Lion.new Den()
      G. Lion.Den g = new Lion.Den()
      H. var h = new Cub()

### Correct answer

C, D, G

### Explanation

Option C correctly creates an instance of an inner class Cub using an instance of the outer class Lion. Options A, B, E, and H use incorrect syntax for creating an instance of the Cub class. Options D and G correctly create an instance of the static nested Den class, which does not require an instance of Lion, while option F uses invalid syntax.

## Question 23

### Prompt

Given the following program, what can be inserted into
    the blank line that would allow it to print Swim! at
    runtime?

    interface Swim {
       default void perform() { System.out.print("Swim!"); }
    }
    interface Dance {
       default void perform() { System.out.print("Dance!"); }
    }
    public class Penguin implements Swim, Dance {
       public void perform() { System.out.print("Smile!"); }
       private void doShow() {
          ____________________;
       }
       public static void main(String[] eggs) {
          new Penguin().doShow();
       } }
      A. super.perform()
      B. Swim.perform()
      C. super.Swim.perform()
      D. Swim.super.perform()
      E. The code does not compile regardless of what is
         inserted into the blank.
      F. The code compiles, but due to polymorphism, it is
         not possible to produce the requested output
         without creating a new object.

### Correct answer

D

### Explanation

First, if a class or interface inherits two interfaces containing default methods with the same signature, it must override the method with its own implementation. The Penguin class does this correctly, so option E is incorrect. The way to access an inherited default method is by using the syntax Swim.super.perform(), making option D correct. We agree that the syntax is bizarre, but you need to learn it. Options A, B, and C are incorrect and result in compiler errors.

## Question 24

### Prompt

Which lines of the following interface do not compile?
    (Choose all that apply.)

    1: public interface BigCat {
    2:    abstract String getName();
    3:    static int hunt() { getName(); return 5; }
    4:    default void climb() { rest(); }
    5:    private void roar() { getName();  climb(); hunt(); }
    6:    private static boolean sneak() { roar(); return true;
    }
    7:    private int rest() { return 2; };
    8: }
      A. Line 2
      B. Line 3
      C. Line 4
      D. Line 5
      E. Line 6
      F. Line 7
      G. None of the above

### Correct answer

B, E

### Explanation

Line 3 does not compile because the static method hunt() cannot access an abstract instance method getName(), making option B correct. Line 6 does not compile because the private static method sneak() cannot access the private instance method roar(), making option E correct. The rest of the lines compile without issue.

## Question 25

### Prompt

What does the following program print?

    1:  public class Zebra {
    2:     private int x = 24;
    3:     public int hunt() {
    4:        String message = "x is ";
    5:        abstract class Stripes {
    6:           private int x = 0;
    7:           public void print() {
    8:              System.out.print(message + Zebra.this.x);
    9:           }
    10:       }
    11:       var s = new Stripes() {};
    12:       s.print();
    13:       return x;
    14:    }
    15:    public static void main(String[] args) {
    16:       new Zebra().hunt();
    17:    } }
      A. x is 0
      B. x is 24
      C. Line 6 generates a compiler error.
      D. Line 8 generates a compiler error.
      E. Line 11 generates a compiler error.
      F. None of the above.

### Correct answer

B

### Explanation

Zebra.this.x is the correct way to refer to x in the Zebra class. Line 5 defines an abstract local class within a method, while line 11 defines a concrete anonymous class that extends the Stripes class. The code compiles without issue and prints x is 24 at runtime, making option B the correct answer.

## Question 26

### Prompt

What is the output of the following program?

    20: public enum Animals {
    21:    MAMMAL(List.of(2,4)),
    22:    INVERTEBRATE(List.of(2, 4, 6, 8, 100)),
    23:    BIRD(null) {
    24:       public int stand() {
    25:          return legs.get(0) + 4;
    26:       }
    27:    };
    28:    List<Integer> legs;
    29:    Animals(List<Integer> legs) {
    30:       this.legs = legs;
    31:    }
    32:    public int stand() { return legs.get(0); }
    33:    public static void main(String[] a) {
    34:       Animals.BIRD.legs = List.of(-1);
    35:       System.out.println(Animals.BIRD.stand());
    36:    } }
      A. null
      B. -1
      C. 3
      D. 4
      E. Compiler error on lines 23.
      F. Compiler error on lines 24.
      G. Compiler error on line 34.
     H. The code compiles but produces a
         NullPointerException at runtime.
       I. None of the above.

### Correct answer

C

### Explanation

The code compiles and runs without issue. The stand() method is overridden on line 24, so the code prints 3 (-1 + 4) at runtime, making option C correct. Note that unlike records, enums can have mutable members, so the modification of legs on line 34 is permitted (albeit not recommended!).

## Question 27

### Prompt

Assuming a record is defined with at least one field,
    which components does the compiler always insert,
    each of which may be overridden or redeclared?
    (Choose all that apply.)
      A. A no-argument constructor
      B. An accessor method for each field
      C. The toString() method
      D. The equals() method
      E. A mutator method for each field
      F. A sort method for each field
      G. The hashCode() method

### Correct answer

B, C, D, G

### Explanation

The compiler inserts an accessor for each field, a constructor containing all of the fields in the order they are declared, and useful implementations of equals(), hashCode(), and toString(), making options B, C, D, and G correct. Option A is incorrect, as the compiler would only insert a no-argument constructor if the record had no fields. Option E is incorrect, as records are immutable. Option F is also incorrect and not a property of records.

## Question 28

### Prompt

Which of the following classes and interfaces do not
    compile? (Choose all that apply.)
    public abstract class Camel { void travel(); }

    public interface EatsGrass { private abstract int chew(); }

    public abstract class Elephant {
       abstract private class SleepsAlot {
          abstract int sleep();
       } }

    public class Eagle { abstract soar(); }

    public interface Spider { default void crawl() {} }
      A. Camel
      B. EatsGrass
      C. Elephant
      D. Eagle
      E. Spider

### Correct answer

A, B, D

### Explanation

Camel does not compile because the travel() method does not declare a body, nor is it marked abstract, making option A correct. EatsGrass also does not compile because an interface method cannot be marked both private and abstract, making option B correct. Finally, Eagle does not compile because it declares an abstract method soar() in a concrete class, making option D correct. The other classes compile without issue.

## Question 29

### Prompt

How many lines of the following program contain a
    compilation error?

    1:  class Primate {
    2:     protected int age = 2;
    3:     { age = 1; }
    4:     public Primate() {
    5:        this().age = 3;
    6:     }
    7:  }
    8:  public class Orangutan {
    9:     protected int age = 4;
    10:    { age = 5; }
    11:    public Orangutan() {
    12:       this().age = 6;
    13:    }
    14:    public static void main(String[] bananas) {
    15:       final Primate x = (Primate)new Orangutan();
    16:       System.out.println(x.age);
    17:    }
    18: }
      A. None, and the program prints 1 at runtime.
      B. None, and the program prints 3 at runtime.
      C. None, but it causes a ClassCastException at runtime.
      D. 1
      E. 2
      F. 3
      G. 4

### Correct answer

F

### Explanation

The code does not compile, so options A through options C are incorrect. Both lines 5 and 12 do not compile, as this() is used instead of this. Remember, this() refers to calling a constructor, whereas this is a reference to the current instance. Next, the compiler does not allow casting to an unrelated class type. Since Orangutan is not a subclass of Primate, the cast on line 15 is invalid, and the code does not compile. Due to these three lines containing compilation errors, option F is the correct answer.

## Question 30

### Prompt

Assuming the following classes are declared as top-
    level types in the same file, which classes contain
    compiler errors? (Choose all that apply.)

    sealed class Bird {
       public final class Flamingo extends Bird {}
    }

    sealed class Monkey {}

    class EmperorTamarin extends Monkey {}

    non-sealed class Mandrill extends Monkey {}

    sealed class Friendly extends Mandrill permits Silly {}

    final class Silly {}

      A. Bird
      B. Monkey
      C. EmperorTamarin
      D. Mandrill
      E. Friendly
      F. Silly
      G. All of the classes compile without issue.

### Correct answer

C, E

### Explanation

Bird and its nested Flamingo subclass compile without issue. The permits clause is optional if the subclass is nested or declared in the same file. For this reason, Monkey and its subclass Mandrill also compile without issue. EmperorTamarin does not compile, as it is missing a non-sealed, sealed, or final modifier, making option C correct. Friendly also does not compile, since it lists a subclass Silly that does not extend it, making option E correct. While the permits clause is optional, the extends clause is not. Silly compiles just fine. Even though it does not extend Friendly, the compiler error is in the sealed class.
