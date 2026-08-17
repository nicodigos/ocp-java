---
chapter: 3
title: "Making Decisions"
questionCount: 30
sourceQuestionPdfPages: "293-309"
sourceAnswerPdfPages: "1331-1340"
---

# Chapter 3: Making Decisions

## Question 1

### Prompt

What is the output of the following code snippet?

    32: Object skips = 10;
    33: switch (skips) {
    34:    case a when a < 10  -> System.out.print(2);
    35:    case b when b>= 10 -> System.out.print(4);
    36:    case null -> System.out.print(6);
    37:    default   -> System.out.print(8);
    38: }
      A. 2
      B. 4
      C. 6
      D. 8
      E. Exactly one line does not compile.
      F. Exactly two lines do not compile.
      G. None of the above.

### Correct answer

F

### Explanation

Lines 34 and 35 do not compile because they are missing the pattern variable type, making option F correct. If a supported type, such as Integer, were added between the case and variable on each line, then the code would compile and print 4.

## Question 2

### Prompt

Which of the following data types can be used in a
    switch expression? (Choose all that apply.)
      A. enum
      B. int
      C. Byte
      D. long
      E. boolean
      F. double

### Correct answer

A, B, C

### Explanation

A switch expression supports enum values, making option A correct. It also supports int and byte primitives, including their wrapper classes Integer and Byte, making options B and C correct. It does not support the other types.

## Question 3

### Prompt

What is the output of the following code snippet?
   3: int temperature = 4;
   4: long humidity = -temperature + temperature * 3;
   5: if (temperature>=4)
   6: if (humidity < 6) System.out.println("Too Low");
   7: else System.out.println("Just Right");
   8: else System.out.println("Too High");
    A. Too Low
    B. Just Right
    C. Too High
    D. A NullPointerException is thrown at runtime.
    E. The code will not compile because of line 7.
    F. The code will not compile because of line 8.

### Correct answer

B

### Explanation

The code compiles and runs without issue, so options D, E, and F are incorrect. Even though two consecutive else statements on lines 7 and 8 look a little odd, they are associated with separate if statements on lines 5 and 6, respectively. The value of humidity on line 4 is equal to -4 + 12, which is 8. The first if statement evaluates to true on line 5, so line 6 is executed and evaluates to false. This causes the else statement on line 7 to run, printing Just Right and making option B the correct answer.

## Question 4

### Prompt

Which of the following data types are permitted on the
   right side of a for-each expression? (Choose all that
   apply.)
    A. Double[][]
    B. Object
    C. Map
    D. List
    E. String
    F. char[]
    G. Exception

### Correct answer

A, D, F

### Explanation

A for-each loop supports arrays, making options A and F correct. For Double[][], each element of the for- each loop would be a Double[]. A for-each also supports classes that implement java.lang.Iterable. Although this includes many of the Collections Framework classes, not all of them implement java.lang.Iterable. For this reason, option C is incorrect, and option D is correct. Options B, E, and G are incorrect, as they do not implement java.lang.Iterable. Although a String is a list of ordered characters, the class does not implement the required interface for a for-each loop.

## Question 5

### Prompt

What is the output of calling printReptile(6)?

   void printReptile(int category) {
      var type = switch (category) {
         case 1,2 -> "Snake";
         case 3,4 -> "Lizard";
         case 5,6 -> "Turtle";
         case 7,8 -> "Alligator";
      };
      System.out.print(type);
   }
    A. Snake
    B. Lizard
    C. Turtle
    D. Alligator
    E. TurtleAlligator
    F. None of the above

### Correct answer

F

### Explanation

The code does not compile because the switch expression requires all possible case values to be handled, making option F correct. If a valid default clause was added, then the code would compile and print Turtle at runtime.

## Question 6

### Prompt

What is the output of the following code snippet?

   List<Integer> myFavoriteNumbers = new ArrayList<>();
   myFavoriteNumbers.add(10);
   myFavoriteNumbers.add(14);
   for (var a : myFavoriteNumbers) {
      System.out.print(a + ", ");
      break;
   }

   for (int b : myFavoriteNumbers) {
      continue;
      System.out.print(b + ", ");
   }

   for (Object c : myFavoriteNumbers)
      System.out.print(c + ", ");
    A. It compiles and runs without issue but does not
        produce any output.
    B. 10, 14,
    C. 10, 10, 14,
    D. 10, 10, 14, 10, 14,
    E. Exactly one line of code does not compile.
    F. Exactly two lines of code do not compile.
    G. Three or more lines of code do not compile.
    H. The code contains an infinite loop and does not
        terminate.

### Correct answer

E

### Explanation

The second for-each loop contains a continue followed by a print() statement. Because the continue is not conditional and always included as part of the body of the for-each loop, the print() statement is not reachable. For this reason, the print() statement does not compile. As this is the only compilation error, option E is correct. The other lines of code compile without issue.

## Question 7

### Prompt

Assuming weather is a well-formed nonempty array,
   which code snippet, when inserted independently into
   the blank in the following code, prints all of the
   elements of weather? (Choose all that apply.)

   private void print(int[] weather) {
      for () {
         System.out.println(weather[i]);
      }
   }
    A. int i=weather.length; i>0; i--
    B. int i=0; i<=weather.length-1; ++i
    C. var w : weather
    D. int i=weather.length-1; i>=0; i--
    E. int i=0, int j=3; i<weather.length; ++i
    F. int i=0; ++i<10 && i<weather.length;
    G. None of the above

### Correct answer

B, D

### Explanation

Option A is incorrect because on the first iteration, it attempts to access weather[weather.length] of the nonempty array, which causes an ArrayIndexOutOfBoundsException to be thrown. Option B is correct and will print the elements in order. Option C doesn’t compile as i is undefined in weather[i]. For this to work, the body of the for-each loop would have to be updated as well. Option D is also correct and is a common way to print the elements of an array in reverse order. Option E does not compile and is therefore incorrect. You can declare multiple elements in a for loop, but the data type must be listed only once, such as in for (int i=0, j=3; ...). Finally, option F is incorrect because the first element of the array is skipped. Since the conditional expression is checked before the loop is executed the first time, the first value of i used inside the body of the loop will be 1.

## Question 8

### Prompt

What is the output of calling printType(11)?

   31: void printType(Object o) {
   32:    if (o instanceof Integer bat) {
   33:       System.out.print("int");
   34:    } else if (o instanceof Integer bat && bat < 10) {
   35:       System.out.print("small int");
   36:    } else if (o instanceof Long bat || bat <= 20) {
   37:       System.out.print("long");
   38:    } default {
   39:       System.out.print("unknown");
   40:    }
   41: }
    A. int
    B. small int
      C. long
      D. unknown
      E. Nothing is printed.
      F. The code contains one line that does not compile.
      G. The code contains two lines that do not compile.
      H. None of the above.

### Correct answer

G

### Explanation

The first two pattern matching statements compile without issue. The variable bat is allowed to be used again, provided it is no longer in scope. Line 36 does not compile, though. Due to flow scoping, if o is not a Long, then bat is not in scope in the expression bat <= 20. Line 38 also does not compile as default cannot be used as part of an if/else statement. For these two reasons, option G is correct.

## Question 9

### Prompt

Which statements, when inserted independently into
    the following blank, will cause the code to print 2 at
    runtime? (Choose all that apply.)

    int count = 0;
    BUNNY: for (int row = 1; row <=3; row++)
       RABBIT: for (int col = 0; col <3 ; col++) {
          if ((col + row) % 2 == 0)
             ;
          count++;
       }
    System.out.println(count);

      A. break BUNNY
      B. break RABBIT
      C. continue BUNNY
      D. continue RABBIT
      E. break
      F. continue
      G. None of the above, as the code contains a compiler
         error

### Correct answer

B, C, E

### Explanation

The code contains a nested loop and a conditional expression that is executed if the sum of col + row is an even number; otherwise, count is incremented. Note that options E and F are equivalent to options B and D, respectively, since unlabeled statements apply to the most inner loop. Studying the loops, the first time the condition is true is in the second iteration of the inner loop, when row is 1 and col is 1. Option A is incorrect because this causes the loop to exit immediately with count only being set to 1. Options B, C, and E follow the same pathway. First, count is incremented to 1 on the first inner loop, and then the inner loop is exited. On the next iteration of the outer loop, row is 2 and col is 0, so execution exits the inner loop immediately. On the third iteration of the outer loop, row is 3 and col is 0, so count is incremented to 2. In the next iteration of the inner loop, the sum is even, so we exit, and our program is complete, making options B, C, and E each correct. Options D and F are both incorrect, as they cause the inner and outer loops to execute multiple times, with count having a value of 5 when done. You don’t need to trace through all the iterations; just stop when the value of count exceeds 2.

## Question 10

### Prompt

Given the following method, how many lines contain
    compilation errors?

    8:  enum DayOfWeek {
    9:     SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
    FRIDAY, SATURDAY;
    10:    private DayOfWeek getWeekDay(int day, final int
    thursday) {
    11:       int otherDay = day;
    12:       int Sunday = 0;
    13:       switch (otherDay) {
    14:          default:
    15:          case 1: continue;
    16:          case thursday: return DayOfWeek.THURSDAY;
    17:          case 2,10: break;
    18:          case Sunday: return DayOfWeek.SUNDAY;
    19:          case DayOfWeek.MONDAY: return
    DayOfWeek.MONDAY;
    20:       }
    21:       return DayOfWeek.FRIDAY;
    22:    } }
      A. None, the code compiles and runs without issue.
      B. 1.
      C. 2.
      D. 3.
      E. 4.
      F. 5.
      G. 6.
      H. The code compiles but may produce an error at
          runtime.

### Correct answer

E

### Explanation

This code contains numerous compilation errors, making options A and H incorrect. Line 15 does not compile, as continue cannot be used inside a switch statement like this. Line 16 is not a compile-time constant since any int value can be passed as a parameter. Marking it final does not change this, so it doesn’t compile. Line 18 does not compile because Sunday is not marked as final. Being effectively final is insufficient. Finally, line 19 does not compile because DayOfWeek.MONDAY is not an int value. While switch statements do support enum values, each case clause must have the same data type as the switch variable otherDay, which is int. The rest of the lines do compile. Since exactly four lines do not compile, option E is the correct answer.

## Question 11

### Prompt

What is the output of calling
    printLocation(Animal.MAMMAL)?

    10: class Zoo {
    11:    enum Animal {BIRD, FISH, MAMMAL}
    12:    void printLocation(Animal a) {
    13:       long type = switch (a) {
    14:          case BIRD -> 1;
    15:          case FISH -> 2;
    16:          case MAMMAL -> 3;
    17:          default -> 4;
    18:       };
    19:       System.out.print(type);
    20:    } }
      A. 3
      B. 4
      C. 34
      D. The code does not compile because of line 13.
      E. The code does not compile because of line 17.
      F. None of the above.

### Correct answer

A

### Explanation

The code compiles and runs without issue, printing 3 at runtime and making option A correct. The default clause on line 17 is optional since all the enum values are accounted for and can be removed without changing the output.

## Question 12

### Prompt

What is the result of the following code snippet?

    3: int sing = 8, squawk = 2, notes = 0;
    4: while (sing> squawk) {
    5:    sing--;
    6:    squawk += 2;
    7:    notes += sing + squawk;
    8: }
    9: System.out.println(notes);
      A. 11
      B. 13
      C. 23
      D. 33
      E. 50
      F. The code will not compile because of line 7.

### Correct answer

C

### Explanation

Prior to the first iteration, sing = 8, squawk = 2, and notes = 0. After the iteration of the first loop, sing is updated to 7, squawk to 4, and notes to the sum of the new values for sing + squawk, 7 + 4 = 11. After the iteration of the second loop, sing is updated to 6, squawk to 6, and notes to the sum of itself plus the new values for sing + squawk, 11 + 6 + 6 = 23. On the third iteration of the loop, sing > squawk evaluates to false, as 6 > 6 is false. The loop ends and the most recent value of sing, 23, is output, so the correct answer is option C.

## Question 13

### Prompt

What is the result of calling getHatSize(9f) on the
    following code snippet?

    10: int getHatSize(Number measurement) {
    11:    return switch (measurement) {
    12:       case Double d -> 1 + d.intValue();
    13:       case null     -> 11;
    14:       case !(Number n) -> 3 + n.intValue();
    15:       case Float f when f < 10 -> 4 + f.intValue();
    16:    };
    17: }
      A. 10
      B. 11
      C. 12
      D. 13
      E. The code does not compile because it is missing a
         default clause.
      F. The code does not compile for a different reason.

### Correct answer

F

### Explanation

The code does not compile because case clause uses the logical complement operator (!), which is not permitted with pattern matching. If this was removed, then the code would still not compile, as this clause would dominate the case on line 15, leading to unreachable code on line 15. For this reason, option F is correct.

## Question 14

### Prompt

What is the output of the following code snippet?

    2: boolean keepGoing = true;
    3: int result = 15, meters = 10;
    4: do {
    5:    meters--;
    6:    if (meters==8) keepGoing = false;
    7:    result -= 2;
    8: } while keepGoing;
    9: System.out.println(result);
      A. 7
      B. 9
      C. 10
      D. 11
      E. 15
      F. The code will not compile because of line 6.
      G. The code does not compile for a different reason.

### Correct answer

G

### Explanation

This example may look complicated, but the code does not compile. Line 8 is missing the required parentheses around the boolean conditional expression. Since the code does not compile and it is not because of line 6, option G is the correct answer. If line 8 was corrected with parentheses, then the loop would be executed twice, and the output would be 11.

## Question 15

### Prompt

Which statements about the following code snippet are
    correct? (Choose all that apply.)

    for (var penguin : new int[2])
       System.out.println(penguin);

    var ostrich = new Character[3];
    for (var emu : ostrich)
       System.out.println(emu);

    List<Integer> parrots = new ArrayList<Integer>();
    for (var macaw  : parrots)
       System.out.println(macaw);
      A. The data type of penguin is Integer.
      B. The data type of penguin is int.
      C. The data type of emu is undefined.
      D. The data type of emu is Character.
      E. The data type of macaw is List.
      F. The data type of macaw is Integer.
      G. None of the above, as the code does not compile.

### Correct answer

B, D, F

### Explanation

The code does compile, making option G incorrect. In the first for-each loop, the right side of the for-each loop has a type of int[], so each element penguin has a type of int, making option B correct. In the second for-each loop, ostrich has a type of Character[], so emu has a data type of Character, making option D correct. In the last for-each loop, parrots has a data type of List<Integer>. Since the generic type of Integer is used in the List, macaw will have a data type of Integer, making option F correct.

## Question 16

### Prompt

What is the result of the following code snippet?

    final char a = 'A', e = 'E';
    char grade = 'B';
    switch (grade) {
       default:
       case a:
       case 'B': 'C': System.out.print("great ");
       case 'D':      System.out.print("good "); break;
       case e:
       case 'F':      System.out.print("not good ");
    }
      A. great
      B. great good
      C. good
      D. not good
      E. The code does not compile because the data type of
          one or more case clauses does not match the data
          type of the switch variable.
      F. None of the above.

### Correct answer

F

### Explanation

The code does not compile, although not for the reason specified in option E. The second case clause contains invalid syntax. Each case clause must have the keyword case—in other words, you cannot chain them with a colon (:). For this reason, option F is the correct answer. This line could have been fixed to say case ’B’, ’C’ or by adding the case keyword before ’C’; then the rest of the code would have compiled and printed great good at runtime.

## Question 17

### Prompt

Given the following array, which code snippets print
    the elements in reverse order from how they are
    declared? (Choose all that apply.)

    char[] wolf = {'W', 'e', 'b', 'b', 'y'};
      A. int q = wolf.length;
         for ( ; ; ) {
            System.out.print(wolf[--q]);
            if (q==0) break;
         }
      B. for (int m=wolf.length-1; m>=0; --m)
            System.out.print(wolf[m]);
      C. for (int z=0; z<wolf.length; z++)
            System.out.print(wolf[wolf.length-z]);
      D. int x = wolf.length-1;
         for (int j=0; x>=0 && j==0; x--)
            System.out.print(wolf[x]);
      E. final int r = wolf.length;
         for (int w = r-1; r>-1; w = r-1)
            System.out.print(wolf[w]);
      F. for (int i=wolf.length; i>0; --i)
            System.out.print(wolf[i]);
      G. None of the above

### Correct answer

A, B, D

### Explanation

To print items in the wolf array in reverse order, the code needs to start with wolf[wolf.length-1] and end with wolf[0]. Option A accomplishes this and is the first correct answer. Option B is also correct and is one of the most common ways a reverse loop is written. The termination condition is often m>=0 or m>-1, and both are correct. Options C and F each cause an ArrayIndexOutOfBoundsException at runtime since both read from wolf[wolf.length] first, with an index that is passed the length of the 0-based array wolf. The form of option C would be successful if the value was changed to wolf[wolf.length-z-1]. Option D is also correct, as the j is extraneous and can be ignored in this example. Finally, option E is incorrect and produces an infinite loop, as w is repeatedly set to r-1, in this case 4, on every loop iteration. Since the update statement has no effect after the first iteration, the condition is never met, and the loop never terminates.

## Question 18

### Prompt

What distinct numbers are printed when the following
    method is executed? (Choose all that apply.)

    private void countAttendees() {
       int participants = 4, animals = 2, performers = -1;

       while ((participants = participants + 1) < 10) {}
       do {} while (animals++ <= 1);
       for ( ; performers < 2; performers += 2) {}

       System.out.println(participants);
       System.out.println(animals);
       System.out.println(performers);
    }
      A. 6
      B. 3
      C. 4
      D. 5
      E. 10
      F. 9
      G. The code does not compile.
      H. None of the above.

### Correct answer

B, E

### Explanation

The code compiles without issue and prints two distinct numbers at runtime, so options G and H are incorrect. The first loop executes a total of five times, with the loop ending when participants has a value of 10. For this reason, option E is correct. In the second loop, animals starts out not less than or equal to 1, but since it is a do/while loop, it executes at least once. In this manner, animals takes on a value of 3 and the loop terminates, making option B correct. Finally, the last loop executes a total of two times, with performers starting with -1, going to 1 at the end of the first loop, and then ending with a value of 3 after the second loop, which breaks the loop. This makes option B a correct answer twice over.

## Question 19

### Prompt

What is the output of the following code snippet?

    2: double iguana = 0;
    3: do {
    4:    int snake = 1;
    5:    System.out.print(snake++ + " ");
    6:    iguana--;
    7: } while (snake <= 5);
    8: System.out.println(iguana);

      A. 1 2 3 4 -4.0
      B. 1 2 3 4 -5.0
      C. 1 2 3 4 5 -4.0
      D. 0 1 2 3 4 5 -5.0
      E. The code does not compile.
      F. The code compiles but produces an infinite loop at
         runtime.
      G. None of the above.

### Correct answer

E

### Explanation

The variable snake is declared within the body of the do/while statement, so it is out of scope on line 7. For this reason, option E is the correct answer. If snake were declared before line 3 with a value of 1, then the output would have been 1 2 3 4 5 -5.0, and option G would have been the correct answer.

## Question 20

### Prompt

Which statements, when inserted into the following
    blanks, allow the code to compile and run without
    entering an infinite loop? (Choose all that apply.)

    4:  int height = 1;
    5:  L1: while (height++ <10) {
    6:     long humidity = 12;
    7:     L2: do {
    8:        if (humidity-- % 12 == 0) ;
    9:        int temperature = 30;
    10:       L3: for ( ; ; ) {
    11:          temperature++;
    12:          if (temperature>50) ;
    13:       }
    14:    } while (humidity> 4);
    15: }
      A. break L2 on line 8; continue L2 on line 12
      B. continue on line 8; continue on line 12
      C. break L3 on line 8; break L1 on line 12
      D. continue L2 on line 8; continue L3 on line 12
      E. continue L2 on line 8; continue L2 on line 12
      F. None of the above, as the code contains a compiler
          error

### Correct answer

A, E

### Explanation

The most important thing to notice when reading this code is that the innermost loop is an infinite loop. Therefore, you are looking for solutions that skip the innermost loop entirely or that exit that loop. Option A is correct, as break L2 on line 8 causes the second inner loop to exit every time it is entered, skipping the innermost loop entirely. For option B, the first continue on line 8 causes the execution to skip the innermost loop on the first iteration of the second loop but not the second iteration of the second loop. The innermost loop is executed, and with continue on line 12, it produces an infinite loop at runtime, making option B incorrect. Option C is incorrect because it contains a compiler error. The label L3 is not visible outside its loop. Option D is incorrect, as it is equivalent to option B since the unlabeled break and continue apply to the nearest loop and therefore produce an infinite loop at runtime. Like option A, the continue L2 on line 8 allows the innermost loop to be executed the second time the second loop is called. The continue L2 on line 12 exits the infinite loop, though, causing control to return to the second loop. Since the first and second loops terminate, the code terminates, and option E is a correct answer.

## Question 21

### Prompt

A minimum of how many lines need to be corrected
    before the following method will compile?

    21: void findZookeeper(Integer id) {
    22:    System.out.print(switch (id) {
    23:       case 10 -> {"Jane";}
    24:       case 20 -> {yield "Lisa";};
    25:       case 30 -> "Kelly";
    26:       case 30 -> "Sarah";
    27:       default -> "Unassigned";
    28:    });
    29: }
      A. Zero
      B. One
      C. Two
      D. Three
      E. Four
      F. Five

### Correct answer

D

### Explanation

Line 23 does not compile because it is missing a yield statement. Line 24 does not compile because it contains an extra semicolon at the end. Finally, lines 25 and 26 do not compile because they use the same case value. At least one of them would need to be changed for the code to compile. Since three lines need to be corrected, option D is correct.

## Question 22

### Prompt

What is the output of the following code snippet?

    2: var tailFeathers = 3;
    3: final var one = 1;
    4: switch (tailFeathers) {
    5:    case one: System.out.print(3 + " ");
    6:    default: case 3: System.out.print(5 + " ");
    7: }
    8: while (tailFeathers> 1) {
    9:    System.out.print(--tailFeathers + " "); }
      A. 3
      B. 5 1
      C. 5 2
      D. 3 5 1
      E. 5 2 1
      F. The code will not compile because of lines 3–5.
      G. The code will not compile because of line 6.

### Correct answer

E

### Explanation

The code compiles without issue, making options F and G incorrect. Remember, var is supported in both switch and while loops, provided the compiler determines that the type is compatible with these statements. In addition, the variable one is allowed in a case clause because it is a final local variable, making it a compile-time constant. The value of tailFeathers is 3, which matches the second case clause, making 5 the first output. The while loop is executed twice, with the pre-decrement operator (--) modifying the value of tailFeathers from 3 to 2 and then to 1 on the second loop. For this reason, the final output is 5 2 1, making option E the correct answer.

## Question 23

### Prompt

What is the output of the following code snippet?

    15: int penguin = 50, turtle = 75;
    16: boolean older = penguin>= turtle;
    17: if (older = true) System.out.println("Success");
    18: else System.out.println("Failure");
    19: else if (penguin != 50) System.out.println("Other");
      A. Success
      B. Failure
      C. Other
      D. The code will not compile because of line 17.
      E. The code compiles but throws an exception at
         runtime.
      F. None of the above.

### Correct answer

F

### Explanation

Line 19 starts with an else statement, but there is no preceding if statement that it matches. For this reason, line 19 does not compile, making option F the correct answer. If the else keyword was removed from line 19, then the code snippet would print Success.

## Question 24

### Prompt

What is the output of the following code snippet?

    22: String zooStatus = "Closed";
    23: int visitors = switch (zooStatus) {
    24:    case String s when s.equals("Open") -> 10;
    25:    case Object s when s != null && !s.equals("") -> 20;
    26:    case null -> {yield 30;}
    27:    default -> 40;
    28: };
    29: System.out.print(visitors);
      A. 10
      B. 20
      C. 30
      D. 40
      E. Exactly one line does not compile.
      F. Exactly two lines do not compile.
      G. Three or more lines do not compile.

### Correct answer

B

### Explanation

Since this is a pattern matching switch statement, the case branches are evaluated in the order in which they appear. In particular, each branch does not dominate the ones after it, so the code compiles without issue. If either of the when clauses were removed from their accompanying case clause, then the code would not compile. The first branch is skipped because Closed does not match Open. The second one matches, resulting in 20 being printed at runtime and making option B correct.

## Question 25

### Prompt

What is the output of the following code snippet?

    6:  String instrument = "violin";
    7:  final String CELLO = "cello";
    8:  String viola = "viola";
    9:  int p = -1;
    10: switch (instrument) {
    11:    case "bass" : break;
    12:    case CELLO : p++;
    13:    default: p++;
    14:    case "VIOLIN": p++;
    15:    case "viola" : ++p; break;
    16: }
    17: System.out.print(p);
      A. -1
      B. 0
      C. 1
      D. 2
      E. 3
      F. The code does not compile.

### Correct answer

D

### Explanation

The code compiles without issue, so option F is incorrect. The viola variable created on line 8 is never used and can be ignored. If it had been used as the case value on line 15, it would have caused a compilation error since it is not marked final. Since "violin" and "VIOLIN" are not an exact match, the default branch of the switch statement is executed at runtime. This execution path increments p a total of three times, bringing the final value of p to 2 and making option D the correct answer.

## Question 26

### Prompt

What is the output of the following code snippet?

    9:  int w = 0, r = 1;
    10: String name = "";
    11: while (w < 2) {
    12:    name += "A";
    13:    do {
    14:       name += "B";
    15:       if (name.length()>0) name += "C";
    16:       else break;
    17:    } while (r <=1);
    18:    r++; w++; }
    19: System.out.println(name);
      A. ABC
      B. ABCABC
      C. ABCABCABC
      D. Line 15 contains a compilation error.
      E. Line 18 contains a compilation error.
      F. The code compiles but never terminates at runtime.
      G. The code compiles but throws a NullPointerException
         at runtime.

### Correct answer

F

### Explanation

The code snippet does not contain any compilation errors, so options D and E are incorrect. There is a problem with this code snippet, though. While it may seem complicated, the key is to notice that the variable r is updated outside of the do/while loop. This is allowed from a compilation standpoint, since it is defined before the loop, but it means the innermost loop never breaks the termination condition r <= 1. At runtime, this will produce an infinite loop the first time the innermost loop is entered, making option F the correct answer.

## Question 27

### Prompt

What is printed by the following code snippet?

    23: byte amphibian = 2;
    24: String name = "Salamander";
    25: String color = switch (amphibian) {
    26:    case 1 -> { yield "Red"; }
    27:    case 2 -> { if (name.equals("Frog")) yield "Green";
    28:                yield "Blue"; }
    29:    case 3 -> { yield "Purple"; }
    30:    default -> throw new RuntimeException();
    31: };
    32: System.out.print(color);
      A. Red
      B. Green
      C. Purple
      D. Blue
      E. The code does not compile.
      F. An exception is thrown at runtime.

### Correct answer

D

### Explanation

The code compiles and runs without issue, as every case block contains a yield statement. The second case block contains two paths which both end in a yield statement. At runtime, the code prints Blue, making option D correct.

## Question 28

### Prompt

What is the output of calling getFish("goldie")?

    40: void getFish(Object fish) {
    41:    if (!(fish instanceof String guppy))
    42:       System.out.print("Eat!");
    43:    else if (!(fish instanceof String guppy)) {
    44:       throw new RuntimeException();
    45:    }
    46:    System.out.print("Swim!");
    47: }
      A. Eat!
      B. Swim!
      C. Eat! followed by an exception
      D. Eat!Swim!
      E. An exception is printed
      F. None of the above

### Correct answer

F

### Explanation

Based on flow scoping, guppy is in scope after lines 41–42 if the type is not a String. In this case, line 43 declares a variable guppy that is a duplicate of the previously defined local variable defined on line 41. For this reason, the code does not compile, and option F is correct. If a different variable name was used on line 43, then the code would compile and print Swim! at runtime with the specified input.

## Question 29

### Prompt

What is the result of the following code?

    1: public class PrintIntegers {
    2:    public static void main(String[] args) {
    3:       int y = -2;
    4:       do System.out.print(++y + " ");
    5:       while (y <= 5);
    6: } }
      A. -2 -1 0 1 2 3 4 5
      B. -2 -1 0 1 2 3 4
      C. -1 0 1 2 3 4 5 6
      D. -1 0 1 2 3 4 5
      E. The code will not compile because of line 5.
      F. The code contains an infinite loop and does not
         terminate.

### Correct answer

C

### Explanation

Since the pre-increment operator was used, the first value that will be displayed is -1, so options A and B are incorrect. On the second-to-last iteration of the loop, y will be incremented to 5, and the loop will output 5. The loop will continue since 5 <= 5 is true, and on the last iteration, 6 will be output. At the end of this last iteration, the boolean expression 6 <= 5 will evaluate to false, and the loop will terminate. Since 6 was the last value output by the loop, the answer is option C.

## Question 30

### Prompt

What is the minimum number of lines that would need
    to be changed or removed for the following code to
    compile and return a value when called with dance(10)?

    41: double dance(Object speed) {
    42:    return switch (speed) {
    43:       case 5 -> {yield 4};
    44:       case 10 -> 8;
    45:       case 15,20 -> 12;
    46:       default -> 20;
    47:       case null -> 16;
    48:    }
    49: }
      A. Zero, the code compiles and runs without issue
      B. One
      C. Two
      D. Three
      E. Four
      F. Five
      G. Six

### Correct answer

E

### Explanation

On line 43, the semicolon should be after the yield statement, not outside the brace. Line 48 is missing a semicolon after the return statement containing the switch expression. For these reasons, at least two lines must be corrected. Next, lines 43, 44, and 45 do not compile because the numeric values are not compatible with the reference type for Object. We can fix this by changing line 41 to pass speed as a compatible type, such as Integer. Finally, the default clause on line 46 dominates the proceeding case null on line 47. Removing line 47 fixes this issue, as case null is not required. Since we can get the code to compile by changing or removing four lines, option E is the correct answer.
