---
chapter: 1
title: "Building Blocks"
questionCount: 23
sourceQuestionPdfPages: "157-168"
sourceAnswerPdfPages: "1318-1324"
---

# Chapter 1: Building Blocks

## Question 1

### Prompt

Which of the following are legal entry point methods that can
    be run from the command line? (Choose all that apply.)
      A. private static void main(String[] args)
      B. public static final main(String[] args)
      C. public void main(String[] args)
      D. public static final void main(String[] args)
      E. public static void main(String[] args)
      F. public static main(String[] args)

### Correct answer

D, E

### Explanation

Option E is the canonical main() method signature. You need to memorize it. Option D is an alternate form with the redundant final. Option A is incorrect because the main() method must be public. Options B and F are incorrect because the main() method must have a void return type. Option C is incorrect because the main() method must be static.

## Question 2

### Prompt

Which answer options represent the order in which the
    following statements can be assembled into a program that will
    compile successfully? (Choose all that apply.)

    X: class Rabbit {}
    Y: import java.util.*;
    Z: package animals;
      A. X, Y, Z
      B. Y, Z, X
      C. Z, Y, X
      D. Y, X
      E. Z, X
      F. X, Z
      G. None of the above

### Correct answer

C, D, E

### Explanation

The package and import statements are both optional. If both are present, the order must be package, then import, and then class. Option A is incorrect because class is before package and import. Option B is incorrect because import is before package. Option F is incorrect because class is before package.

## Question 3

### Prompt

Which of the following are true? (Choose all that apply.)

    public class Bunny {
       public static void main(String[] x) {
          Bunny bun = new Bunny();
    } }
    A. Bunny is a class.
    B. bun is a class.
    C. main is a class.
    D. Bunny is a reference to an object.
    E. bun is a reference to an object.
    F. main is a reference to an object.
    G. The main() method doesn’t run because the parameter name
        is incorrect.

### Correct answer

A, E

### Explanation

Bunny is a class, which can be seen from the declaration: public class Bunny. The variable bun is a reference to an object. The method main() is the standard entry point to a program. Option G is incorrect because the parameter type matters, not the parameter name.

## Question 4

### Prompt

Which of the following are valid Java identifiers? (Choose all
   that apply.)
    A. _
    B. _helloWorld$
    C. true
    D. java.lang
    E. Public
    F. 1980_s
    G. _Q2_

### Correct answer

B, E, G

### Explanation

Option A is invalid because a single underscore is not allowed. Option C is not a valid identifier because true is a Java reserved word. Option D is not valid because a period (.) is not allowed in identifiers. Option F is not valid because the first character is not a letter, dollar sign ($), or underscore (_). Options B, E, and G are valid because they contain only valid characters.

## Question 5

### Prompt

Which statements about the following program are correct?
   (Choose all that apply.)

   2:  public class Bear {
   3:     private Bear pandaBear;
   4:     private void roar(Bear b) {
   5:        System.out.println("Roar!");
   6:        pandaBear = b;
   7:     }
   8:     public static void main(String[] args) {
   9:        Bear brownBear = new Bear();
   10:       Bear polarBear = new Bear();
   11:       brownBear.roar(polarBear);
   12:       polarBear = null;
   13:       brownBear = null;
   14:       System.gc(); } }
    A. The object created on line 9 is first eligible for garbage
        collection after line 13.
    B. The object created on line 9 is first eligible for garbage
        collection after line 14.
    C. The object created on line 10 is first eligible for garbage
        collection after line 12.
    D. The object created on line 10 is first eligible for garbage
        collection after line 13.
    E. Garbage collection is guaranteed to run.
    F. Garbage collection might or might not run.
    G. The code does not compile.

### Correct answer

A, D, F

### Explanation

Garbage collection is never guaranteed to run, making option F correct and option E incorrect. Next, the class compiles and runs without issue, so option G is incorrect. The Bear object created on line 9 is accessible until line 13 via the brownBear reference variable, which is option A. The Bear object created on line 10 is accessible via both the polarBear reference and the brownBear.pandaBear reference. After line 12, the object is still accessible via brownBear.pandaBear. After line 13, though, it is no longer accessible since brownBear is no longer accessible, which makes option D the final correct answer.

## Question 6

### Prompt

Assuming the following class compiles, how many variables
   defined in the class or method are in scope on the line marked
   on line 14?

   1:  public class Camel {
   2:     { int hairs = 3_000_0; }
   3:     long water, air=2;
   4:     boolean twoHumps = true;
   5:     public void spit(float distance) {
   6:        var path = "";
   7:        { double teeth = 32 + distance++; }
   8:        while(water> 0) {
   9:           int age = twoHumps ? 1 : 2;
   10:          short i=-1;
   11:          for(i=0; i<10; i++) {
   12:             var Private = 2;
   13:          }
   14:          // SCOPE
   15:       }
   16:    }
   17: }
    A. 2
    B. 3
    C. 4
    D. 5
    E. 6
    F. 7
    G. None of the above

### Correct answer

F

### Explanation

To solve this problem, you need to trace the braces ({}) and see when variables go in and out of scope. The variables on lines 2 and 7 are only in scope for a single line block. The variable on line 12 is only in scope for the for loop. None of these is in scope on line 14. By contrast, the three instance variables on lines 3 and 4 are available in all instance methods. Additionally, the variables on lines 6, 9, and 10 are available since the method and while loop are still in scope. This is a total of 7 variables, which is option F.

## Question 7

### Prompt

Which are true about this code? (Choose all that apply.)
   public class KitchenSink {
       private int numForks;

       public static void main(String[] args) {
          int numKnives;
          System.out.print("""
             "# forks = " + numForks +
              " # knives = " + numKnives +
             # cups = 0""");
       }
   }
    A. The output includes # forks = 0.
    B. The output includes # knives = 0.
    C. The output includes # cups = 0.
    D. The output includes a blank line.
    E. The output includes one or more lines that begin with
        whitespace.
    F. The code does not compile.

### Correct answer

C, E

### Explanation

The first thing to recognize is that this is a text block and the code inside the """ is just text. Options A and B are incorrect because the numForks and numKnives variables are not used. This is convenient since numKnives is not initialized and would not compile if it were referenced. Option C is correct as it is matching text. Option D is incorrect because the text block does not have a trailing blank line. Finally, option E is also an answer since " # knives is indented.

## Question 8

### Prompt

Which of the following code snippets about var compile without
   issue when used in a method? (Choose all that apply.)
    A. var spring = null;
    B. var fall = "leaves";
    C. var evening = 2; evening = null;
    D. var night = Integer.valueOf(3);
    E. var day = 1/0;
    F. var winter = 12, cold;
    G. var fall = 2, autumn = 2;
    H. var morning = ""; morning = null;

### Correct answer

B, D, E, H

### Explanation

A var cannot be initialized with a null value without a type, but it can be assigned a null value later if the underlying type is not a primitive. For these reasons, option H is correct, but options A and C are incorrect. Options B and D are correct as the underlying types are String and Integer, respectively. Option E is correct as this is a valid numeric expression. You might know that dividing by zero produces a runtime exception, but the question was only about whether the code compiled. Finally, options F and G are incorrect as var cannot be used in a multiple-variable assignment.

## Question 9

### Prompt

Which of the following is correct?
    A. An instance variable of type float defaults to 0.
    B. An instance variable of type char defaults to null.
    C. A local variable of type double defaults to 0.0.
    D. A local variable of type int defaults to null.
    E. A class variable of type String defaults to null.
      F. A class variable of type String defaults to the empty string
         "".
      G. None of the above.

### Correct answer

E

### Explanation

Options C and D are incorrect because local variables don’t have default values. Option A is incorrect because float should have a decimal point. Option B is incorrect because primitives do not default to null. Option E is correct and option F incorrect because reference types in class variables default to null.

## Question 10

### Prompt

Which of the following expressions, when inserted
    independently into the blank line, allow the code to compile?
    (Choose all that apply.)

    public void printMagicData() {
       var magic = ;
       System.out.println(magic);
    }
      A. 3_1
      B. 1_329_.0
      C. 3_13.0_
      D. 5_291._2
      E. 2_234.0_0
      F. 9___6
      G. _1_3_5_0

### Correct answer

A, E, F

### Explanation

An underscore (_) can be placed in any numeric literal, as long as it is not at the beginning, at the end, or next to a decimal point (.). Underscores can even be placed next to each other. For these reasons, options A, E, and F are correct. Options B and D are incorrect as the underscore (_) is next to a decimal point (.). Options C and G are incorrect because an underscore (_) cannot be placed at the beginning or end of the literal.

## Question 11

### Prompt

Given the following two class files, what is the maximum
    number of imports that can be removed and have the code still
    compile?

    // Water.java
    package aquarium;
    public class Water { }

    // Tank.java
    package aquarium;
    import java.lang.*;
    import java.lang.System;
    import aquarium.Water;
    import aquarium.*;
    public class Tank {
       public void print(Water water) {
          System.out.println(water); } }
      A. 0
      B. 1
      C. 2
      D. 3
      E. 4
      F. Does not compile

### Correct answer

E

### Explanation

The first two imports can be removed because java.lang is automatically imported. The following two imports can be removed because Tank and Water are in the same package, making the correct option E. If Tank and Water were in different packages, exactly one of these two imports could be removed. In that case, the answer would be option D.

## Question 12

### Prompt

Which statements about the following class are correct?
    (Choose all that apply.)

    1: public class ClownFish {
    2:    int gills = 0, double weight=2;
    3:    { int fins = gills; }
    4:    void print(int length = 3) {
    5:       System.out.println(gills);
    6:       System.out.println(weight);
    7:       System.out.println(fins);
    8:       System.out.println(length);
    9: } }
      A. Line 2 generates a compiler error.
      B. Line 3 generates a compiler error.
      C. Line 4 generates a compiler error.
      D. Line 7 generates a compiler error.
      E. The code prints 0.
      F. The code prints 2.0.
      G. The code prints 2.
      H. The code prints 3.

### Correct answer

A, C, D

### Explanation

Line 2 does not compile as only one type should be specified, making option A correct. Line 3 compiles without issue as it declares a local variable inside an instance initializer that is never used. Line 4 does not compile because Java does not support setting default method parameter values, making option C correct. Finally, line 7 does not compile because fins is in scope and accessible only inside the instance initializer on line 3, making option D correct.

## Question 13

### Prompt

Given the following classes, which of the following snippets can
    independently be inserted in place of INSERT IMPORTS HERE and
    have the code compile? (Choose all that apply.)

    package aquarium;
    public class Water {
       boolean salty = false;
    }

    package aquarium.jellies;
    public class Water {
       boolean salty = true;
    }

    package employee;
    INSERT IMPORTS HERE
    public class WaterFiller {
       Water water;
    }
      A. import aquarium.*;
      B. import aquarium.Water;
      C. import aquarium.jellies.*;
      D. import aquarium.*;
      E. import aquarium.jellies.Water;
      F. import aquarium.*;
      G. import aquarium.jellies.*;
      H. import aquarium.Water;
       I. import aquarium.jellies.Water;
       J. None of the above

### Correct answer

A, B, C

### Explanation

Option A is correct because it imports all the classes in the aquarium package including aquarium.Water. Options B and C are correct because they import Water by class name. Since importing by class name takes precedence over wildcards, these compile. Option D is incorrect because Java doesn’t know which of the two wildcard Water classes to use. Option E is incorrect because you cannot specify the same class name in two imports.

## Question 14

### Prompt

Which of the following statements about the code snippet are
    true? (Choose all that apply.)

    3: short numPets = 5L;
    4: int numGrains = 2.0;
    5: String name = "Scruffy";
    6: int d = numPets.length();
    7: int e = numGrains.length;
    8: int f = name.length();
      A. Line 3 generates a compiler error.
      B. Line 4 generates a compiler error.
      C. Line 5 generates a compiler error.
      D. Line 6 generates a compiler error.
      E. Line 7 generates a compiler error.
      F. Line 8 generates a compiler error.

### Correct answer

A, B, D, E

### Explanation

Line 3 does not compile because the L suffix makes the literal value a long, which cannot be stored inside a short directly, making option A correct. Line 4 does not compile because int is an integral type, but 2.0 is a double literal value, making option B correct. Line 5 compiles without issue. Lines 6 and 7 do not compile because numPets and numGrains are both primitives, and you can call methods only on reference types, not primitive values, making options D and E correct, respectively. Finally, line 8 compiles because there is a length() method defined on String.

## Question 15

### Prompt

Which of the following statements about garbage collection are
    correct? (Choose all that apply.)
      A. Calling System.gc() is guaranteed to free up memory by
         destroying objects eligible for garbage collection.
      B. Garbage collection runs on a set schedule.
      C. Garbage collection allows the JVM to reclaim memory for
         other objects.
      D. Garbage collection runs when your program has used up
         half the available memory.
      E. An object may be eligible for garbage collection but never
         removed from the heap.
      F. An object is eligible for garbage collection once no
         references to it are accessible in the program.
      G. Marking a variable final means its associated object will
         never be garbage collected.

### Correct answer

C, E, F

### Explanation

In Java, there are no guarantees about when garbage collection will run. The JVM is free to ignore calls to System.gc(). For this reason, options A, B, and D are incorrect. Option C is correct as the purpose of garbage collection is to reclaim used memory. Option E is also correct that an object may never be garbage collected, such as if the program ends before garbage collection runs. Option F is correct and is the primary means by which garbage collection algorithms determine whether an object is eligible for garbage collection. Finally, option G is incorrect as marking a variable final means it is constant within its own scope. For example, a local variable marked final will be eligible for garbage collection after the method ends, assuming there are no other references to the object that exist outside the method.

## Question 16

### Prompt

Which are true about this code? (Choose all that apply.)

    var blocky = """
       squirrel \s
       pigeon   \
       termite""";
    System.out.print(blocky);
      A. It outputs two lines.
      B. It outputs three lines.
      C. It outputs four lines.
      D. There is one line with trailing whitespace.
      E. There are two lines with trailing whitespace.
      F. If we indented each line five characters, it would change
         the output.

### Correct answer

A, D

### Explanation

Option A is correct. There are two lines. One starts with squirrel, and the other starts with pigeon. Remember that a backslash means to skip the line break. Option D is also correct as \s means to keep whitespace. In a text block, incidental indentation is ignored, making option F incorrect.

## Question 17

### Prompt

What lines are printed by the following program? (Choose all
    that apply.)

    1:  public class WaterBottle {
    2:     private String brand;
    3:     private boolean empty;
    4:     public static float code;
    5:     public static void main(String[] args) {
    6:        WaterBottle wb = new WaterBottle();
    7:        System.out.println("Empty = " + wb.empty);
    8:        System.out.println("Brand = " + wb.brand);
    9:        System.out.println("Code = " + code);
    10:    } }
      A. Line 8 generates a compiler error.
      B. Line 9 generates a compiler error.
      C. Empty =
      D. Empty = false
      E. Brand =
      F. Brand = null
      G. Code = 0.0
      H. Code = 0f

### Correct answer

D, F, G

### Explanation

The code compiles and runs without issue, so options A and B are incorrect. A boolean field initializes to false, making option D correct with Empty = false being printed. Object references initialize to null, not the empty String, so option F is correct with Brand = null being printed. Finally, the default value of floating- point numbers is 0.0. Although float values can be declared with an f suffix, they are not printed with an f suffix. For these reasons, option G is correct and Code = 0.0 is printed.

## Question 18

### Prompt

Which of the following statements about var are true? (Choose
    all that apply.)
      A. A var can be used as a constructor parameter.
      B. The type of a var is known at compile time.
      C. A var cannot be used as an instance variable.
      D. A var can be used in a multiple variable assignment
         statement.
      E. The value of a var cannot change at runtime.
      F. The type of a var cannot change at runtime.
      G. The word var is a reserved word in Java.

### Correct answer

B, C, F

### Explanation

A var cannot be used for a constructor or method parameter or for an instance or class variable, making option A incorrect and option C correct. The type of a var is known at compile time, and the type cannot be changed at runtime, although its value can change at runtime. For these reasons, options B and F are correct, and option E is incorrect. Option D is incorrect, as var is not permitted in multiple-variable declarations. Finally, option G is incorrect, as var is not a reserved word in Java.

## Question 19

### Prompt

Which are true about the following code? (Choose all that
    apply.)

    var num1 = Integer.parseInt("11");
    var num2 = Integer.valueOf("B", 16);
    System.out.println(Integer.max(num1, num2));
      A. The output is 11.
      B. The output is B.
      C. The code does not compile.
      D. num1 is a primitive.
      E. num2 is a primitive.
      F. A NumberFormatException is thrown.

### Correct answer

A, D

### Explanation

The first two lines provide a way to convert a String into a number. The first is a int primitive, and the second is a Integer reference object, making option D one of the answers. Remember that B is 11 in base 16. The code is correct, and the maximum is 11, which is option A.

## Question 20

### Prompt

Which statement about the following class is correct?

    1:  public class PoliceBox {
    2:     String color;
    3:     long age;
    4:     public void PoliceBox() {
    5:        color = "blue";
    6:        age = 1200;
    7:     }
    8:     public static void main(String []time) {
    9:        var p = new PoliceBox();
    10:       var q = new PoliceBox();
    11:       p.color = "green";
    12:       p.age = 1400;
    13:       p = q;
    14:       System.out.println("Q1="+q.color);
    15:       System.out.println("Q2="+q.age);
    16:       System.out.println("P1="+p.color);
    17:       System.out.println("P2="+p.age);
    18: } }
      A. It prints Q1=blue.
      B. It prints Q2=1200.
      C. It prints P1=null.
      D. It prints P2=1400.
      E. Line 4 does not compile.
      F. Line 12 does not compile.
      G. Line 13 does not compile.
      H. None of the above.

### Correct answer

C

### Explanation

The key thing to notice is that line 4 does not define a constructor but instead a method named PoliceBox(), since it has a return type of void. This method is never executed during the program run, and color and age are assigned the default values null and 0L, respectively. Lines 11 and 12 change the values for an object associated with p, but then, on line 13, the p variable is changed to point to the object associated with q, which still has the default values. For this reason, the program prints Q1=null, Q2=0, P1=null, and P2=0, making option C the only correct answer.

## Question 21

### Prompt

What is the output of executing the following class?

    1:  public class Salmon {
    2:     int count;
    3:     { System.out.print(count+"-"); }
    4:     { count++; }
    5:     public Salmon() {
    6:        count = 4;
    7:        System.out.print(2+"-");
    8:     }
    9:     public static void main(String[] args) {
    10:       System.out.print(7+"-");
    11:       var s = new Salmon();
    12:       System.out.print(s.count+"-"); } }
      A. 7-0-2-1-
      B. 7-0-1-
      C. 0-7-2-1-
      D. 7-0-2-4-
      E. 0-7-1-
      F. The class does not compile because of line 3.
      G. The class does not compile because of line 4.
      H. None of the above.

### Correct answer

D

### Explanation

We start with the main() method, which prints 7- on line 10. Next, a new Salmon instance is created on line 11. This causes the two instance initializers on lines 3 and 4 to be executed in order. The default value of an instance variable of type int is 0, so 0- is printed next, and count is assigned a value of 1. Next, the constructor is called. This assigns a value of 4 to count and prints 2-. Finally, line 12 prints 4-, since that is the value of count. Putting it all together, we have 7-0-2-4-, making option D the correct answer.

## Question 22

### Prompt

Given the following class, which of the following lines of code
    can independently replace INSERT CODE HERE to make the code
    compile? (Choose all that apply.)

    public class Price {
       public void admission() {
          INSERT CODE HERE
          System.out.print(amount);
          } }
      A. int Amount = 0b11;
      B. int amount = 9L;
      C. int amount = 0xE;
      D. int amount = 1_2.0;
      E. double amount = 1_0_.0;
      F. int amount = 0b101;
      G. double amount = 9_2.1_2;
      H. double amount = 1_2_.0_0;

### Correct answer

C, F, G

### Explanation

First, 0b is the prefix for a binary value, and 0x is the prefix for a hexadecimal value. These values can be assigned to many primitive types, including int and double, making options C and F correct. Option A is incorrect because naming the variable Amount will cause the System.out.print(amount) call on the next line to not compile. Option B is incorrect because 9L is a long value. If the type was changed to long amount = 9L, then it would compile. Option D is incorrect because 1_2.0 is a double value. If the type was changed to double amount = 1_2.0, then it would compile. Options E and H are incorrect because the underscore (_) appears next to the decimal point (.), which is not allowed. Finally, option G is correct, and the underscore and assignment usage is valid.

## Question 23

### Prompt

Which statements about the following class are true? (Choose
    all that apply.)

    1:  public class River {
    2:     int Depth = 1;
    3:     float temp = 50.0;
    4:     public void flow() {
    5:        for (int i = 0; i < 1; i++) {
    6:           int depth = 2;
    7:           depth++;
    8:           temp--;
    9:        }
    10:       System.out.println(depth);
    11:       System.out.println(temp); }
    12:    public static void main(String... s) {
    13:       new River().flow();
    14: } }
A. Line 3 generates a compiler error.
B. Line 6 generates a compiler error.
C. Line 7 generates a compiler error.
D. Line 10 generates a compiler error.
E. The program prints 3 on line 10.
F. The program prints 4 on line 10.
G. The program prints 50.0 on line 11.
H. The program prints 49.0 on line 11.

### Correct answer

A, D

### Explanation

The first compiler error is on line 3. The variable temp is declared as a float, but the assigned value is 50.0, which is a double without the F/f postfix. Since a double doesn’t fit inside a float, line 3 does not compile. Next, depth is declared inside the for loop and has scope only inside this loop. Therefore, reading the value on line 10 triggers a compiler error. For these reasons, options A and D are the correct answers.
