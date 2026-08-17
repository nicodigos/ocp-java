---
chapter: 4
title: "Core APIs"
questionCount: 22
sourceQuestionPdfPages: "400-411"
sourceAnswerPdfPages: "1341-1346"
---

# Chapter 4: Core APIs

## Question 1

### Prompt

What is output by the following code?

   1: public class Fish {
   2:    public static void main(String[] args) {
   3:       int numFish = 4;
   4:       String fishType = "tuna";
   5:       String anotherFish = numFish + 1;
   6:       System.out.println(anotherFish + " " + fishType);
   7:       System.out.println(numFish + " " + 1);
   8: } }
    A. 4 1
    B. 5
    C. 5 tuna
    D. 5tuna
    E. 51tuna
    F. The code does not compile.

### Correct answer

F

### Explanation

Line 5 does not compile. This question is checking to see whether you are paying attention to the types. numFish is an int, and 1 is an int. Therefore, we use numeric addition and get 5. The problem is that we can’t store an int in a String variable. Suppose line 5 said String anotherFish = numFish + 1 + "";. In that case, the answers would be option A and option C. The variable defined on line 5 would be the string "5", and both output statements would use concatenation.

## Question 2

### Prompt

Which of these array declarations are not legal?
   (Choose all that apply.)
    A. int[][] scores = new int[5][];
    B. Object[][][] cubbies = new Object[3][0][5];
    C. String beans[] = new beans[6];
    D. java.util.Date[] dates[] = new java.util.Date[2][];
    E. int[][] types = new int[];
    F. int[][] java = new int[][];

### Correct answer

C, E, F

### Explanation

Option C uses the variable name as if it were a type, which is clearly illegal. Options E and F don’t specify any size. Although it is legal to leave out the size for later dimensions of an array of arrays, the first one is required. Option A declares a legal 2D array. Option B declares a legal 3D array. Option D declares a legal 2D array. Remember that it is normal to see classes on the exam you might not have learned. You aren’t expected to know anything about them.

## Question 3

### Prompt

Note that March 12, 2028, is the weekend when we
   spring forward, and November 5, 2028, is when we fall
   back for daylight saving time. Which of the following
   can fill in the blank without the code throwing an
   exception? (Choose all that apply.)

   var zone = ZoneId.of("US/Eastern");
   var date = ______________________;
   var time = LocalTime.of(2, 15);
   var z = ZonedDateTime.of(date, time, zone);
    A. LocalDate.of(2028, 3, 12)
    B. LocalDate.of(2028, 3, 40)
    C. LocalDate.of(2028, 11, 5)
    D. LocalDate.of(2028, 11, 6)
    E. LocalDate.of(2029, 2, 29)
     F. LocalDate.of(2028, MonthEnum.MARCH, 12);

### Correct answer

A, C, D

### Explanation

Option B throws an exception because there is no March 40. Option E also throws an exception because 2029 isn’t a leap year and therefore has no February 29. Option F doesn’t compile because the enum should be named Month, rather than MonthEnum. Option D is correct because it is just a regular date and has nothing to do with daylight saving time. Options A and C are correct because Java is smart enough to adjust for daylight saving time.

## Question 4

### Prompt

Which of the following are output by this code? (Choose
   all that apply.)

   3: var s = "Hello";
   4: var t = new String(s);
   5: if ("Hello".equals(s)) System.out.println("one");
   6: if (t == s) System.out.println("two");
   7: if (t.intern() == s) System.out.println("three");
   8: if ("Hello" == s) System.out.println("four");
   9: if ("Hello".intern() == t) System.out.println("five");
    A. one
    B. two
    C. three
    D. four
    E. five
     F. The code does not compile.
    G. None of the above.

### Correct answer

A, C, D

### Explanation

The code compiles fine. Line 3 points to the String in the string pool. Line 4 calls the String constructor explicitly and is therefore a different object than s. Line 5 checks for object equality, which is true, and so it prints one. Line 6 uses object reference equality, which is not true since we have different objects. Line 7 calls intern(), which returns the value from the string pool and is therefore the same reference as s. Line 8 also compares references but is true since both references point to the object from the string pool. Finally, line 9 is a trick. The string Hello is already in the string pool, so calling intern() does not change anything. The reference t is a different object, so the result is still false. Therefore, options A, C, and D are correct.

## Question 5

### Prompt

What is the result of the following code?

   7: var sb = new StringBuilder();
   8: sb.append("aaa").insert(1, "bb").insert(4, "ccc");
   9: System.out.println(sb);
    A. abbaaccc
    B. abbaccca
    C. bbaaaccc
    D. bbaaccca
    E. An empty line.
    F. The code does not compile.

### Correct answer

B

### Explanation

This example uses method chaining. After the call to append(), sb contains "aaa". That result is passed to the first insert() call, which inserts at index 1. At this point, sb contains abbaa. That result is passed to the final insert(), which inserts at index 4, resulting in abbaccca. Therefore, option B is the answer.

## Question 6

### Prompt

How many of these lines contain a compiler error?

   23: double one = Math.pow(1, 2);
   24: int two = Math.round(1.0);
   25: float three = Math.random();
   26: var doubles = new double[] {one, two, three};
    A. 0
    B. 1
    C. 2
    D. 3
    E. 4

### Correct answer

C

### Explanation

Remember to watch return types on math operations. One of the tricks is line 24. The round() method returns an int when called with a float. However, we are calling it with a double, so it returns a long. The other trick is line 25. The random() method returns a double. Since two lines have a compiler error, option C is the answer.

## Question 7

### Prompt

Which of these statements is true of the two values?
   (Choose all that apply.)

   2025–08–28T05:00 GMT-04:00
   2025–08–28T09:00 GMT-06:00
    A. The first date/time is earlier.
    B. The second date/time is earlier.
    C. Both date/times are the same.
    D. The date/times are two hours apart.
    E. The date/times are six hours apart.
    F. The date/times are 10 hours apart.

### Correct answer

A, E

### Explanation

When dealing with time zones, it is best to convert to GMT first by subtracting the time zone. Remember that subtracting a negative is like adding. The first date/time is 9:00 GMT, and the second is 15:00 GMT. Therefore, the first one is earlier by six hours. Therefore, options A and E are correct.

## Question 8

### Prompt

Which of the following return 5 when run
   independently? (Choose all that apply.)
    var string = "12345";
    var builder = new StringBuilder("12345");
      A. builder.charAt(4)
      B. builder.replace(2, 4, "6").charAt(3)
      C. builder.replace(2, 5, "6").charAt(2)
      D. string.charAt(5)
      E. string.length
      F. string.replace("123", "1").charAt(2)
      G. None of the above

### Correct answer

A, B, F

### Explanation

Remember that indexes are zero-based, which means index 4 corresponds to 5, and option A is correct. For option B, the replace() method starts the replacement at index 2 and ends before index 4. This means two characters are replaced, and charAt(3) is called on the intermediate value of 1265. The character at index 3 is 5, making option B correct. Option C is similar, making the intermediate value 126 and returning 6. Option D results in an exception since there is no character at index 5. Option E is incorrect. It does not compile because the parentheses for the length() method are missing. Finally, option F’s replace results in the intermediate value 145. The character at index 2 is 5, so option F is correct.

## Question 9

### Prompt

Which of the following are true about arrays? (Choose
    all that apply.)
      A. The first element is index 0.
      B. The first element is index 1.
      C. Arrays are fixed size.
      D. Arrays are immutable.
      E. Calling equals() on two different arrays containing
         the same primitive values always returns true.
      F. Calling equals() on two different arrays containing
         the same primitive values always returns false.
      G. Calling equals() on two different arrays containing
         the same primitive values can return true or false.

### Correct answer

A, C, F

### Explanation

Arrays are zero-indexed, making option A correct and option B incorrect. They are not able to change size, which is option C. The values can be changed, making option D incorrect. An array does not override equals(), so it uses object equality. Since two different objects are not equal, option F is correct, and options E and G are incorrect.

## Question 10

### Prompt

How many of these lines contain a compiler error?

    23: int one = Math.min(5, 3);
    24: long two = Math.round(5.5);
    25: double three = Math.floor(6.6);
    26: var doubles = new double[] {one, two, three};
      A. 0
      B. 1
      C. 2
      D. 3
      E. 4

### Correct answer

A

### Explanation

All of these lines compile. The min() and floor() methods return the same type passed in: int and double, respectively. The round() method returns a long when called with a double. Option A is correct since the code compiles.

## Question 11

### Prompt

What is the output of the following code?

    var date = LocalDate.of(2025, 4, 3);
    date.plusDays(2);
    date.plusHours(3);
    System.out.println(date.getYear() + " " + date.getMonth()
        + " " + date.getDayOfMonth());
      A. 2025 MARCH 4
      B. 2025 MARCH 6
      C. 2025 APRIL 3
      D. 2025 APRIL 5
      E. The code does not compile.
      F. A runtime exception is thrown.

### Correct answer

E

### Explanation

A LocalDate does not have a time element. Therefore, there is no method to add hours, making option E the answer.

## Question 12

### Prompt

What is output by the following code ignoring any new
    lines in the ouput? (Choose all that apply.)

    var numbers = "012345678".indent(1);
    numbers = numbers.stripLeading();
    System.out.println(numbers.substring(1, 3));
    System.out.println(numbers.substring(7, 7));
    System.out.println(numbers.substring(7));
      A. 12
      B. 123
      C. 7
      D. 78
      E. A blank line.
      F. An exception is thrown.

### Correct answer

A, D, E

### Explanation

First, notice that the indent() call adds a blank space to the beginning of numbers, and stripLeading() immediately removes it. The substring() method has two forms. The first takes the index to start with and the index to stop immediately before. The second takes just the index to start with and goes to the end of the String. Remember that indexes are zero-based. The first call starts at index 1 and ends with index 2 since it needs to stop before index 3. This gives us option A. The second call starts at index 7 and ends in the same place, resulting in an empty String, which is option E. This prints out a blank line. The final call starts at index 7 and goes to the end of the String finishing up with option D.

## Question 13

### Prompt

What is the result of the following code?
    public class Lion {
       public void roar(String roar1, StringBuilder roar2) {
          roar1.concat("!!!");
          roar2.append("!!!");
       }
       public static void main(String[] args) {
          var roar1 = "roar";
          var roar2 = new StringBuilder("roar");
          new Lion().roar(roar1, roar2);
          System.out.println(roar1 + " " + roar2);
    } }
      A. roar roar
      B. roar roar!!!
      C. roar!!! Roar
      D. roar!!! Roar!!!
      E. An exception is thrown.
      F. The code does not compile.

### Correct answer

B

### Explanation

A String is immutable. Calling concat() returns a new String but does not change the original. A StringBuilder is mutable. Calling append() adds characters to the existing character sequence along with returning a reference to the same object. Therefore, option B is correct.

## Question 14

### Prompt

Given the following, which can correctly fill in the blank
    allowing the code to compile? (Choose all that apply.)

    var date = LocalDate.now();
    var time = LocalTime.now();
    var dateTime = date.______(time);
    var zoneId = ZoneId.systemDefault();
    var zonedDateTime = ZonedDateTime.of(dateTime, zoneId);
    Instant instant = ___________________________;
      A. asTime()
      B. atTime()
      C. withTime()
      D. dateTime.toInstant()
      E. new Instant()
      F. zonedDateTime.toInstant()

### Correct answer

B, F

### Explanation

Options A and C are incorrect because there is no asTime() or withTime() method defined on LocalDate. Option B correctly creates a LocalDateTime from a LocalDate and LocalTime. Option E is incorrect because Instant, like other date/time classes, does not have a public constructor and is instantiated via methods. Option F is the proper conversion. Option D is incorrect because the source object does not represent a point in time. Without a time zone, Java doesn’t know what moment in time to use for the Instant.

## Question 15

### Prompt

What is the output of the following? (Choose all that
    apply.)

    var arr = new String[] { "PIG", "pig", "123"};
    Arrays.sort(arr);
    System.out.println(Arrays.toString(arr));
    System.out.println(Arrays.binarySearch(arr, "Pippa"));
      A. [pig, PIG, 123]
      B. [PIG, pig, 123]
      C. [123, PIG, pig]
      D. [123, pig, PIG]
      E. -3
      F. -2
      G. The results of binarySearch() are undefined in this
         example.

### Correct answer

C, E

### Explanation

Numbers sort before letters, and uppercase sorts before lowercase. This makes option C one of the answers. The binarySearch() method looks at where a value would be inserted, which is before the second element for Pippa. It then negates it and subtracts one, which is option E.

## Question 16

### Prompt

Which of these statements are true? (Choose all that
    apply.)

    var letters = new StringBuilder("abcdefg");
      A. letters.substring(1, 2) returns a single-character
         String.
      B. letters.substring(2, 2) returns a single-character
         String.
      C. letters.substring(6, 5) returns a single-character
         String.
      D. letters.substring(6, 6) returns a single-character
         String.
      E. letters.substring(1, 2) throws an exception.
      F. letters.substring(2, 2) throws an exception.
      G. letters.substring(6, 5) throws an exception.
      H. letters.substring(6, 6) throws an exception.

### Correct answer

A, G

### Explanation

The substring() method includes the starting index but not the ending index. When called with 1 and 2, it returns a single-character String, making option A correct and option E incorrect. Calling substring() with 2 as both parameters is legal. It returns an empty String, making options B and F incorrect. Java does not allow the indexes to be specified in reverse order. Option G is correct because it throws a StringIndexOutOfBoundsException. Finally, option H is incorrect because it returns an empty String.

## Question 17

### Prompt

What is the result of the following code? (Choose all
    that apply.)

    13: String s1 = """
    14:    purr""";
    15: String s2 = "";
    16:
    17: s1.toUpperCase();
    18: s1.trim();
    19: s1.substring(1, 3);
    20: s1 += "two";
    21:
    22: s2 += 2;
    23: s2 += 'c';
    24: s2 += false;
    25:
    26: if ( s2 == "2cfalse") System.out.println("==");
    27: if ( s2.equals("2cfalse"))
    System.out.println("equals");
    28: System.out.println(s1.length());
      A. 2
      B. 4
      C. 7
      D. 10
      E. ==
      F. equals
      G. An exception is thrown.
      H. The code does not compile.

### Correct answer

C, F

### Explanation

This question is tricky because it has several parts. First, you have to know that the text block on lines 13 and 14 is equivalent to a regular String. Since there is no line break at the end, this is four characters. Then, you have to know that String objects are immutable, which means the results of lines 17–19 are ignored. Finally, on line 20, something happens. We concatenate three new characters to s1 and now have a String of length 7, making option C correct. Next, s2 += 2 expands to s2 = s2 + 2. A String concatenated with any other type gives a String. Lines 22, 23, and 24 all append to s2, giving a result of "2cfalse". The if statement on line 27 returns true because the values of the two String objects are the same using object equality. For this reason, option F is correct. The if statement on line 26 returns false because the two String objects are not the same in memory. One comes directly from the string pool, and the other comes from building using String operations.

## Question 18

### Prompt

Which of the following fill in the blank to print a
    positive integer? (Choose all that apply.)

    String[] s1 = { "Camel", "Peacock", "Llama"};
    String[] s2 = { "Camel", "Llama", "Peacock"};
    String[] s3 = { "Camel"};
    String[] s4 = { "Camel", null};
    System.out.println(Arrays.)____________________________;
      A. compare(s1, s2)
      B. mismatch(s1, s2)
      C. compare(s3, s4)
      D. mismatch (s3, s4)
      E. compare(s4, s4)
      F. mismatch (s4, s4)

### Correct answer

A, B, D

### Explanation

The compare() method returns a positive integer when the arrays are different and the first is larger. This is the case for option A since the s2 element at index 1 comes first alphabetically. It is not the case for option C because the s4 is longer or for option E because the arrays are the same. The mismatch() method returns a positive integer when the arrays are different in a position index 1 or greater. This is the case for options B and D since the difference is at index 1. It is not the case for option F because there is no difference.

## Question 19

### Prompt

Note that March 12, 2028 is the weekend that clocks
    spring ahead for daylight saving time. What is the
    output of the following? (Choose all that apply.)

    var date = LocalDate.of(2028, Month.MARCH, 12);
    var time = LocalTime.of(1, 30);
    var zone = ZoneId.of("US/Eastern");
    var dateTime1 = ZonedDateTime.of(date, time, zone);
    var dateTime2 = dateTime1.plus(1, ChronoUnit.HOURS);

    long diff = ChronoUnit.HOURS.between(dateTime1, dateTime2);
    int hour = dateTime2.getHour();
    boolean offset = dateTime1.getOffset()
       == dateTime2.getOffset();
    System.out.println("diff = " + diff);
    System.out.println("hour = " + hour);
    System.out.println("offset = " + offset);
      A. diff = 1
      B. diff = 2
      C. hour = 2
      D. hour = 3
      E. offset = true
      F. The code does not compile.
      G. A runtime exception is thrown.

### Correct answer

A, D

### Explanation

The dateTime1 object has a time of 1:30 per initialization. The dateTime2 object is an hour later. However, there is no 2:30 when springing ahead, setting the time to 3:30. Option A is correct because it is an hour later. Option D is also correct because the hour of the new time is 3. Option E is not correct because we have changed the time zone offset due to daylight saving time.

## Question 20

### Prompt

Which of the following can fill in the blank to print avaJ?
    (Choose all that apply.)

    3: var puzzle = new StringBuilder("Java");
    4: puzzle._________________________;
    5: System.out.println(puzzle);
      A. reverse()
      B. append("vaJ$").substring(0, 4)
      C. append("vaJ$").delete(0,
          3).deleteCharAt(puzzle.length() - 1)
      D. append("vaJ$").delete(0,
          3).deleteCharAt(puzzle.length())
      E. None of the above

### Correct answer

A, C

### Explanation

The reverse() method is the easiest way of reversing the characters in a StringBuilder; therefore, option A is correct. In option B, substring() returns a String, which is not stored anywhere. Option C uses method chaining. First, it creates the value "JavavaJ$". Then, it removes the first three characters, resulting in "avaJ$". Finally, it removes the last character, resulting in "avaJ". Option D throws an exception because you cannot delete the character after the last index. Remember that deleteCharAt() uses indexes that are zero-based, and length() counts the number of characters rather than the index.

## Question 21

### Prompt

What is the output of the following code?

    var date = LocalDate.of(2025, Month.APRIL, 30);
    date.plusDays(2);
    date.plusYears(3);
    System.out.println(date.getYear() + " " + date.getMonth()
       + " " + date.getDayOfMonth());
      A. 2025 APRIL 30
      B. 2025 MAY 2
      C. 2028 APRIL 2
      D. 2028 APRIL 30
      E. 2028 MAY 2
      F. The code does not compile.
      G. A runtime exception is thrown.

### Correct answer

A

### Explanation

The date starts out as April 30, 2025. Since dates are immutable and the plus methods’ return values are ignored, the result is unchanged. Therefore, option A is correct.

## Question 22

### Prompt

What is the output of the following?

    var result = LocalDate.of(2025, Month.OCTOBER, 31)
       .plusYears(1)
       .plusMonths(-5)
       .plusMonths(1)
   .withYear(2026)
   .atTime(LocalTime.of(13, 4));
System.out.println(result);
 A. 2025-06-30T13:04
 B. 2026-04-304
 C. 2026-04-30T13:04
 D. 2026-06-30T
 E. 2026-06-30T13:04
 F. The code does not compile.
 G. A runtime exception is thrown.

### Correct answer

E

### Explanation

The code first creates a date of 2025-10-31. The chaining in the output is valid resulting in interim states of 2026-10-31, followed by 2026-05-31, then 2026-06- 30, then 2026-06-30, and finally the result of 2026-06- 30T13:04.
