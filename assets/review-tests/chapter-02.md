---
chapter: 2
title: "Operators"
questionCount: 20
sourceQuestionPdfPages: "214-223"
sourceAnswerPdfPages: "1325-1330"
---

# Chapter 2: Operators

## Question 1

### Prompt

Which of the following Java operators can be used with
    boolean variables? (Choose all that apply.)
      A. ==
      B. +
      C. --
      D. !
      E. %
      F. -
      G. Cast with (boolean)

### Correct answer

A, D, G

### Explanation

Option A is the equality operator and can be used on primitives and object references. Options B and C are both arithmetic operators and cannot be applied to a boolean value. Option D is the logical complement operator and is used exclusively with boolean values. Option E is the modulus operator, which can be used only with numeric primitives. Option F is a negation/subtraction operator and can be applied only to numeric values. Finally, option G is correct, as you can cast a boolean variable since boolean is a type.

## Question 2

### Prompt

What data type (or types) will allow the following code
    snippet to compile? (Choose all that apply.)

    byte apples = 5;
    short oranges = 10;
   ____ bananas = apples + oranges;
    A. int
    B. long
    C. boolean
    D. double
    E. short
    F. byte

### Correct answer

A, B, D

### Explanation

The expression apples + oranges is automatically promoted to int, so int and data types that can be promoted automatically from int will work, making options A, B, and D correct. Option C will not work because boolean is not a numeric data type. Options E and F will not work without an explicit cast to a smaller data type.

## Question 3

### Prompt

What change, when applied independently, would allow
   the following code snippet to compile? (Choose all that
   apply.)

   3: long ear = 10;
   4: int hearing = 2 * ear;
    A. No change; it compiles as is.
    B. Cast ear on line 4 to int.
    C. Change the data type of ear on line 3 to short.
    D. Cast 2 * ear on line 4 to int.
    E. Change the data type of hearing on line 4 to short.
    F. Change the data type of hearing on line 4 to long.

### Correct answer

B, C, D, F

### Explanation

The code will not compile as is, so option A is not correct. The value 2 * ear is automatically promoted to long and cannot be automatically stored in hearing, which is an int value. Options B, C, and D solve this problem by reducing the long value to int. Option E does not solve the problem and actually makes it worse by attempting to place the value in a smaller data type. Option F solves the problem by increasing the data type of the declaration so that long is allowed.

## Question 4

### Prompt

What is the output of the following code snippet?

   3: boolean canine = true, wolf = true;
   4: int teeth = 20;
   5: canine = (teeth != 10) ^ (wolf=false);
   6: System.out.println(canine+", "+teeth+", "+wolf);
    A. true, 20, true
    B. true, 20, false
    C. false, 10, true
    D. false, 20, false
    E. The code will not compile because of line 5.
    F. None of the above.

### Correct answer

B

### Explanation

The code compiles and runs without issue, so option E is not correct. This example is tricky because of the second assignment operator embedded in line 5. The expression (wolf=false) assigns the value false to wolf and returns false for the entire expression. Since teeth does not equal 10, the left side returns true; therefore, the exclusive or (^) of the entire expression assigned to canine is true. The output reflects these assignments, with no change to teeth, so option B is the only correct answer.

## Question 5

### Prompt

Which of the following operators are ranked in
   increasing or the same order of precedence? Assume
   the + operator is binary addition, not the unary form.
   (Choose all that apply.)
    A. +, *, %, --
    B. ++, (int), *
    C. =, ==, !
    D. (short), =, !, *
    E. *, /, %, +, ==
    F. !, ||, &
    G. ^, +, =, +=

### Correct answer

A, C

### Explanation

Options A and C are correct, as they show operators in increasing or the same order of precedence. Options B and E are in decreasing or the same order of precedence. Options D, F, and G are in neither increasing nor decreasing order of precedence. In option D, the assignment operator (=) is between two unary operators, with the multiplication operator (*) incorrectly being in place of highest precedence. In option F, the logical complement operator (!) has the highest order of precedence, so it should be last. In option G, the assignment operators have the lowest order of precedence, not the highest, so the last two operators should be first.

## Question 6

### Prompt

What is the output of the following program?

   1: public class CandyCounter {
   2:    static long addCandy(double fruit, float vegetables)
   {
   3:       return (int)fruit+vegetables;
   4:    }
   5:
   6:    public static void main(String[] args) {
   7:       System.out.print(addCandy(1.4, 2.4f) + ", ");
   8:       System.out.print(addCandy(1.9, (float)4) + ", ");
   9:       System.out.print(addCandy((long)(int)(short)2,
   (float)4)); } }
    A. 4, 6, 6.0
    B. 3, 5, 6
    C. 3, 6, 6
    D. 4, 5, 6
    E. The code does not compile because of line 9.
    F. None of the above.

### Correct answer

F

### Explanation

The code does not compile because line 3 contains a compilation error. The cast (int) is applied to fruit, not the expression fruit+vegetables. Since the cast operator has a higher operator precedence than the addition operator, it is applied to fruit, but the expression is promoted to a float, due to vegetables being float. The result cannot be returned as long in the addCandy() method without a cast. For this reason, option F is correct. If parentheses were added around fruit+vegetables, then the output would be 3, 5, 6, and option B would be correct. Remember that casting floating-point numbers to integral values results in truncation, not rounding.

## Question 7

### Prompt

What is the output of the following code snippet?

   int ph = 7, vis = 2;
   boolean clear = vis> 1 & (vis < 9 || ph < 2);
   boolean safe = (vis> 2) && (ph++> 1);
   boolean tasty = 7 <= --ph;
   System.out.println(clear + "-" + safe + "-" + tasty);
    A. true-true-true
    B. true-true-false
    C. true-false-true
    D. true-false-false
    E. false-true-true
    F. false-true-false
    G. false-false-true
    H. false-false-false

### Correct answer

D

### Explanation

In the first boolean expression, vis is 2 and ph is 7, so this expression evaluates to true & (true || false), which reduces to true. The second boolean expression uses the conditional operator, and since (vis > 2) is false, the right side is not evaluated, leaving ph at 7. In the last assignment, ph is 7, and the pre-decrement operator is applied first, reducing the expression to 7 <= 6 and resulting in an assignment of false. For these reasons, option D is the correct answer.

## Question 8

### Prompt

What is the output of the following code snippet?

   4: int pig = (short)4;
   5: pig = pig++;
   6: long goat = (int)2;
   7: goat -= 1.0;
   8: System.out.print(pig + " - " + goat);
    A. 4 - 1
    B. 4 - 2
    C. 5 - 1
    D. 5 - 2
    E. The code does not compile due to line 7.
    F. None of the above.

### Correct answer

A

### Explanation

The code compiles and runs without issue, so option E is incorrect. Line 7 does not produce a compilation error since the compound operator applies casting automatically. Line 5 increments pig by 1, but it returns the original value of 4 since it is using the post- increment operator. The pig variable is then assigned this value, and the increment operation is discarded. Line 7 just reduces the value of goat by 1, resulting in an output of 4 - 1 and making option A the correct answer.

## Question 9

### Prompt

What are the unique outputs of the following code
   snippet? (Choose all that apply.)
    int a = 2, b = 4, c = 2;
    System.out.println(a> 2 ? --c : b++);
    System.out.println(b = (a!=c ? a : b++));
    System.out.println(a> b ? b < c ? b : 2 : 1);
      A. 1
      B. 2
      C. 3
      D. 4
      E. 5
      F. 6
      G. The code does not compile.

### Correct answer

A, D, E

### Explanation

The code compiles without issue, so option G is incorrect. In the first expression, a > 2 is false, so b is incremented to 5; but since the post-increment operator is used, 4 is printed, making option D correct. The --c was not applied, because only one of the right-hand expressions was evaluated. In the second expression, a!=c is false since c was never modified. Since b is 5 due to the previous line and the post-increment operator is used, b++ returns 5. The result is then assigned to b using the assignment operator, overriding the incremented value for b and printing 5, making option E correct. In the last expression, parentheses are not required, but lack of parentheses can make ternary expressions difficult to read. From the previous lines, a is 2, b is 5, and c is 2. We can rewrite this expression with parentheses as (2 > 5 ? (5 < 2 ? 5 : 2) : 1). The second ternary expression is never evaluated since 2 > 5 is false, and the expression returns 1, making option A correct.

## Question 10

### Prompt

Which is not an output of the following code snippet?

    short height = 1, weight = 3;
    short zebra = (byte) weight * (byte) height;
    double ox = 1 + height * 2 + weight;
    long giraffe = 1 + 9 % height + 1;
    System.out.println(zebra);
    System.out.println(ox);
    System.out.println(giraffe);
      A. 2
      B. 3
      C. 6
      D. 6.0
      E. The code does not compile.

### Correct answer

E

### Explanation

The code does not compile due to an error on the second line, making option E correct. Even though both height and weight are cast to byte, the multiplication operator automatically promotes them to int, resulting in an attempt to store an int in a short variable.

## Question 11

### Prompt

What is the output of the following code?

    11: int sample1 = (2 * 4) % 3;
    12: int sample2 = 3 * 2 % -3;
    13: int sample3 = 5 * (1 % 2);
    14: System.out.println(sample1 + ", " + sample2 + ", " +
    sample3);
      A. 0, 0, 5
      B. 1, 2, 10
      C. 2, 1, 5
      D. 2, 0, 5
      E. 3, 1, 10
      F. 3, 2, 6
      G. The code does not compile.

### Correct answer

D

### Explanation

First, * and % have the same operator precedence, so the expression is evaluated from left to right unless parentheses are present. The first expression evaluates to 8 % 3, which leaves a remainder of 2. The second expression is evaluated left to right since * and % have the same operator precedence, and it reduces to 6 % -3, which is 0. The last expression reduces to 5 * 1, which is 5. Therefore, the output on line 14 is 2, 0, 5, making option D the correct answer.

## Question 12

### Prompt

The _________ operator increases a value and returns
    the original value, while the _______ operator decreases
    a value and returns the new value.
      A. post-increment, post-increment
      B. pre-decrement, post-decrement
      C. post-increment, post-decrement
      D. post-increment, pre-decrement
      E. pre-increment, pre-decrement
      F. pre-increment, post-decrement

### Correct answer

D

### Explanation

The pre- prefix indicates the operation is applied first, and the new value is returned, while the post- prefix indicates the original value is returned prior to the operation. Next, increment increases the value, while decrement decreases the value. For these reasons, option D is the correct answer.

## Question 13

### Prompt

What is the output of the following code snippet?

    boolean sunny = true, raining = false, sunday = true;
    boolean goingToTheStore = sunny & raining ^ sunday;
    boolean goingToTheZoo = sunday && !raining;
    boolean stayingHome = !(goingToTheStore && goingToTheZoo);
    System.out.println(goingToTheStore + "-" + goingToTheZoo
       + "-" +stayingHome);
      A. true-false-false
      B. false-true-false
      C. true-true-true
      D. false-true-true
      E. false-false-false
      F. true-true-false
      G. None of the above

### Correct answer

F

### Explanation

The first expression is evaluated from left to right, letting us reduce it to false ^ sunday, which is true, because sunday is true. In the second expression, we apply the negation operator (!) first, reducing the expression to sunday && true, which evaluates to true. In the last expression, both variables are true, so they reduce to !(true && true), which further reduces to !true, aka false. For these reasons, option F is the correct answer.

## Question 14

### Prompt

Which of the following statements are correct? (Choose
    all that apply.)
      A. The return value of an assignment operation
         expression can be void.
      B. The inequality operator (!=) can be used to compare
         objects.
      C. The equality operator (==) can be used to compare a
         boolean value with a numeric value.
      D. During runtime, the & and | operators may cause
         only the left side of the expression to be evaluated.
      E. The return value of an assignment operation
         expression is the value of the newly assigned
         variable.
      F. In Java, 0 and false may be used interchangeably.
      G. The logical complement operator (!) cannot be used
         to flip numeric values.

### Correct answer

B, E, G

### Explanation

The return value of an assignment operation in the expression is the same as the value of the newly assigned variable. For this reason, option A is incorrect, and option E is correct. Option B is correct, as the equality (==) and inequality (!=) operators can both be used with objects. Option C is incorrect, as boolean and numeric types are not comparable. For example, you can’t say true == 3 without a compilation error. Option D is incorrect, as logical operators evaluate both sides of the expression. Option F is incorrect, as Java does not accept numbers for boolean values. Finally, option G is correct, as you need to use the negation operator (-) to flip or negate numeric values, not the logical complement operator (!).

## Question 15

### Prompt

Which operator takes three operands or values?
      A. =
      B. &&
      C. *=
      D. ? :
      E. &
      F. ++
      G. /

### Correct answer

D

### Explanation

The ternary operator is the only operator that takes three values, making option D the only correct choice. Options A, B, C, E, and G are all binary operators. While they can be strung together in longer expressions, each operation uses only two values at a time. Option F is a unary operator and takes only one value.

## Question 16

### Prompt

How many lines of the following code contain compiler
    errors?
    int note = 1 * 2 + (long)3;
    short melody = (byte)(double)(note *= 2);
    double song = melody;
    float symphony = (float)((song == 1_000f) ? song * 2L :
    song);
      A. 0
      B. 1
      C. 2
      D. 3
      E. 4

### Correct answer

B

### Explanation

The first line contains a compilation error. The value 3 is cast to long. The 1 * 2 value is evaluated as int but promoted to long when added to the 3. Trying to store a long value in an int variable triggers a compiler error. The other lines do not contain any compilation errors, as they store smaller values in larger or same-size data types, with lines 2 and 4 using casting to do so. Since only one line does not compile, option B is correct.

## Question 17

### Prompt

Given the following code snippet, what are the values of
    the variables after it is executed? (Choose all that
    apply.)

    int ticketsTaken = 1;
    int ticketsSold = 3;
    ticketsSold += 1 + ticketsTaken++;
    ticketsTaken *= 2;
    ticketsSold += (long)1;
      A. ticketsSold is 8.
      B. ticketsTaken is 2.
      C. ticketsSold is 6.
      D. ticketsTaken is 6.
      E. ticketsSold is 7.
      F. ticketsTaken is 4.
      G. The code does not compile.

### Correct answer

C, F

### Explanation

The starting values of ticketsTaken and ticketsSold are 1 and 3, respectively. After the first compound assignment, ticketsTaken is incremented to 2. The ticketsSold value is increased from 3 to 5; since the post- increment operator was used, the value of ticketsTaken++ returns 1. On the next line, ticketsTaken is doubled to 4. On the final line, ticketsSold is increased by 1 to 6. The final values of the variables are 4 and 6, for ticketsTaken and ticketsSold, respectively, making options C and F the correct answers. Note the last line does not trigger a compilation error as the compound operator automatically casts the right-hand operand.

## Question 18

### Prompt

Which of the following can be used to change the order
    of operation in an expression?
      A. [ ]
      B. < >
      C. ( )
      D. \ /
      E. { }
      F. " "

### Correct answer

C

### Explanation

Only parentheses, ( ), can be used to change the order of operation in an expression, making option C correct. The other operators, such as [ ], < >, and { }, cannot be used to change the order of precedence in Java.

## Question 19

### Prompt

What is the result of executing the following code
    snippet? (Choose all that apply.)

    3: int start = 7;
    4: int end = 4;
    5: end += ++start;
    6: start = (byte)(Byte.MAX_VALUE + 1);
      A. start is 0.
      B. start is -128.
      C. start is 127.
      D. end is 8.
      E. end is 11.
      F. end is 12.
      G. The code does not compile.
     H. The code compiles but throws an exception at
         runtime.

### Correct answer

B, F

### Explanation

The code compiles and runs successfully, so options G and H are incorrect. On line 5, the pre- increment operator is executed first, so start is incremented to 8, and the new value is returned as the right side of the expression. The value of end is computed by adding 8 to the original value of 4, leaving a new value of 12 for end and making option F a correct answer. On line 6, we are incrementing one past the maximum byte value. Due to overflow, this will result in a negative number, making option B the correct answer. Even if you didn’t know the maximum value of byte, you should have known the code compiles and runs and looked for the answer for start with a negative number.

## Question 20

### Prompt

Which of the following statements about unary
    operators are true? (Choose all that apply.)
      A. Unary operators are always executed before any
         surrounding numeric binary or ternary operators.
      B. The - operator can be used to flip a boolean value.
      C. The pre-increment operator (++) returns the value
         of the variable before the increment is applied.
      D. The post-decrement operator (--) returns the value
         of the variable before the decrement is applied.
E. The ! operator cannot be used on numeric values.
F. None of the above.

### Correct answer

A, D, E

### Explanation

Unary operators have the highest order of precedence, making option A correct. The negation operator (-) is used only for numeric values, while the logical complement operator (!) is used exclusively for boolean values. For these reasons, option B is incorrect, and option E is correct. Finally, the pre-increment/pre- decrement operators return the new value of the variable, while the post-increment/post-decrement operators return the original variable. For these reasons, option C is incorrect, and option D is correct.
