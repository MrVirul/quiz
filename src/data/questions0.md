DATABASE SYSTEM 
Lecutre 01 - Database programming mid exam practice questions

QUESTION 1 (Analysis)
Topic: Cursor Active Set & Concurrent Transaction Modification
A developer opens an explicit cursor defined by the query: SELECT emp_name, salary FROM employees WHERE salary > 4000;. After the cursor is opened, but before any rows are fetched, a concurrent database session inserts 10 new employee records matching the query criteria and issues a COMMIT;. In the original session, the developer proceeds to fetch all records in a loop. What will the developer's cursor loop process?

Options:

A) The cursor will process only the records that existed and matched the criteria at the exact moment the cursor was opened.
B) The cursor will dynamically detect the 10 new rows during FETCH because the cursor reads from the underlying active database.
C) The cursor will raise a CURSOR_ALREADY_OPEN or TRANSACTION_SERIALIZATION_FAILURE exception due to concurrent modification.
D) The cursor will fetch the new 10 rows only if the cursor is declared as a "dynamic cursor" in the PL/SQL declaration block.
Correct Answer: A

Justification:

A is CORRECT: In Oracle PL/SQL, when an explicit cursor is opened, the active set (the set of matching rows) is established at the time of the OPEN statement based on read-consistency rules. Any subsequent inserts, even if committed in another session, will not be visible to this cursor's fetch operations because the read-consistent view is fixed when the cursor is opened [6, 7].
B is INCORRECT: Explicit cursors are not dynamic; they do not update their active set during fetch operations to reflect post-open modifications.
C is INCORRECT: No exception is raised; the transaction simply processes the snapshot of data consistent at the time of cursor opening.
D is INCORRECT: PL/SQL explicit cursors do not have a "dynamic cursor" declaration mode that bypasses transactional read-consistency in this manner.
QUESTION 2 (Application)
Topic: Implicit Cursors and Single-Row SELECT INTO Behavior
A student writes the following PL/SQL block to fetch a department name:

DECLARE
  v_dept_name VARCHAR2(50);
BEGIN
  SELECT dept_name INTO v_dept_name FROM departments WHERE dept_id = 99;
  DBMS_OUTPUT.PUT_LINE('Department is: ' || v_dept_name);
END;
If dept_id = 99 matches exactly zero records in the departments table, what will happen during the execution of this block, and how does the database handle the cursor?

Options:

A) An implicit cursor is created, the block executes successfully, and v_dept_name remains uninitialized (NULL).
B) An implicit cursor is created, and the database automatically raises the predefined exception NO_DATA_FOUND at runtime, causing the block to terminate abruptly.
C) The database compiler rejects the block during the compilation phase because a single-row SELECT must always guarantee a returned row.
D) An explicit cursor must be used instead; implicit cursors cannot handle SELECT queries that return zero rows under any circumstances.
Correct Answer: B

Justification:

B is CORRECT: Implicit cursors are created by default when a SELECT statement that returns just one row is executed. However, if the query returns exactly zero rows, Oracle PL/SQL automatically raises a NO_DATA_FOUND runtime exception. Since there is no EXCEPTION block to handle it, the block terminates abruptly [5, 7].
A is INCORRECT: A single-row SELECT INTO does not silently proceed with a NULL value when 0 rows are returned; it raises an exception.
C is INCORRECT: This is a runtime error, not a compilation error. The compiler cannot know beforehand how many rows will be returned.
D is INCORRECT: While an explicit cursor can handle 0 rows without raising a runtime exception (by checking %NOTFOUND), it is not mandatory to use explicit cursors for every single-row query; implicit cursors are syntactically valid but require exception handling.
QUESTION 3 (Analysis)
Topic: Explicit Cursor Fetching Beyond Active Set Limits
An explicit cursor contains exactly 3 rows in its active set. The developer writes a loop to fetch from this cursor 5 times sequentially without checking %NOTFOUND inside the loop. What is the behavior of the variables populated by the fetch on the 4th and 5th iterations?

Options:

A) The variables will be automatically set to NULL on the 4th and 5th fetches.
B) The database raises an INVALID_CURSOR exception on the 4th fetch because the active set has been exhausted.
C) The variables will retain the values fetched from the 3rd row during the 4th and 5th fetches.
D) The loop terminates automatically at the 4th fetch because PL/SQL's execution engine performs implicit boundary checks.
Correct Answer: C

Justification:

C is CORRECT: When fetching from an explicit cursor past the end of the active set, the FETCH statement fails to retrieve a new row and does not modify the target variables. Therefore, the variables retain their previous values (the values from the 3rd row) [7].
A is INCORRECT: PL/SQL does not automatically reset the target variables to NULL when a fetch fails to retrieve a row.
B is INCORRECT: INVALID_CURSOR is raised when trying to fetch from a cursor that is closed or un-opened, not when fetching past the end of an open cursor.
D is INCORRECT: Explicit cursor fetches do not perform automatic loop termination unless the developer explicitly checks %NOTFOUND (or uses a Cursor FOR Loop which handles open, fetch, and exit internally).
QUESTION 4 (Application)
Topic: DML Implicit Cursor Attributes Behavior
A table employees contains 5 records. A developer executes the following statement block:

BEGIN
  UPDATE employees SET salary = salary * 1.1 WHERE department_id = 999;
  -- Line X
END;
Assuming department_id = 999 matches zero rows, what will the values of the implicit cursor attributes SQL%FOUND and SQL%ROWCOUNT be if evaluated at Line X?

Options:

A) SQL%FOUND is TRUE, and SQL%ROWCOUNT is 0.
B) SQL%FOUND is FALSE, and SQL%ROWCOUNT is NULL.
C) SQL%FOUND is FALSE, and SQL%ROWCOUNT is 0.
D) An exception is thrown, preventing any attributes from being evaluated.
Correct Answer: C

Justification:

C is CORRECT: Implicit cursors are created by default when DML statements like UPDATE are executed [7]. If an UPDATE statement affects zero rows, no exception is raised (unlike a single-row SELECT INTO). Instead, the implicit cursor attribute SQL%FOUND is set to FALSE, and SQL%ROWCOUNT is set to 0 representing the number of rows modified [7].
A is INCORRECT: SQL%FOUND is only TRUE if at least one row was affected.
B is INCORRECT: SQL%ROWCOUNT is an integer count and is set to 0, not NULL.
D is INCORRECT: No exception is thrown when a DML statement updates zero rows, so execution continues normally to Line X.
QUESTION 5 (Analysis)
Topic: Multi-Row SELECT under Implicit Cursor Restrictions
What occurs if a standard SELECT query that returns exactly three rows is executed directly in the execution section of a PL/SQL block without an explicit cursor declaration, such as:

BEGIN
  SELECT salary INTO v_sal FROM employees;
END;
Options:

A) The block compiles successfully, and v_sal is populated with the value of the first record in the active set.
B) The block compiles successfully, but at runtime, the database raises the TOO_MANY_ROWS predefined exception, and the block terminates abruptly if unhandled.
C) The block fails compilation because standard SELECT statements in the execution section of PL/SQL must always have an explicit cursor.
D) The block compiles and executes, but only the last retrieved row is stored in v_sal.
Correct Answer: B

Justification:

B is CORRECT: An implicit cursor is created when a SELECT statement is executed directly in PL/SQL. However, if the query returns more than one row, the predefined exception TOO_MANY_ROWS is raised at runtime because a simple SELECT INTO is designed to handle exactly one row [7].
A is INCORRECT: It does not silently assign the first record.
C is INCORRECT: The syntax is valid, so it compiles successfully; the failure occurs at runtime when multiple rows are returned.
D is INCORRECT: It does not overwrite to the last record; the exception interrupts execution immediately.
QUESTION 6 (Analysis)
Topic: Explicit Cursor Properties & Active Set Definition
Which of the following statements correctly describes the properties of an explicit cursor? (Select ALL that apply)

Options:

A) It is a temporary work area used to store data retrieved from the database and manipulate it.
B) It can hold more than one row but can process only one row at a time.
C) The set of rows the explicit cursor holds is called the active set.
D) It is created automatically whenever an INSERT or UPDATE statement is executed.
Correct Answers: A, B, C

Justification:

A is CORRECT: A cursor is indeed defined as a temporary work area to store and manipulate retrieved data [6].
B is CORRECT: A cursor can hold multiple rows (active set) but can only process one row at a time sequentially [6, 7].
C is CORRECT: The set of rows a cursor holds is explicitly defined as the "active set" [6].
D is INCORRECT: Explicit cursors are user-defined and must be declared. It is the implicit cursor that is created by default when DML statements (INSERT/UPDATE/DELETE) run [7].
QUESTION 7 (Application)
Topic: Explicit vs. Implicit Cursors Operational Differences
A student needs to choose between an explicit cursor and an implicit cursor. Which scenario strictly mandates the declaration and use of an explicit cursor?

Options:

A) Running an INSERT statement that adds a single record to the database.
B) Executing a SELECT statement that is expected to return exactly one row for a specific primary key.
C) Processing a multi-row query result-set sequentially, row-by-row, within a loop in PL/SQL.
D) Deleting multiple records from a table using a DELETE statement.
Correct Answer: C

Justification:

C is CORRECT: Explicit cursors must be created when you are executing a SELECT statement that returns more than one row and you need to process them row-by-row [7].
A & D are INCORRECT: Single or multi-row DML statements (INSERT, DELETE) are handled by implicit cursors automatically [7].
B is INCORRECT: Single-row SELECT statements are handled by implicit cursors (using SELECT...INTO) [7].
QUESTION 8 (Analysis)
Topic: Cursor Lifecycle State & The Current Row Pointer
When processing an explicit cursor, how does the current row pointer behave, and how is it advanced?

Options:

A) The pointer is positioned at the first row when the cursor is declared, and advances only when the transaction commits.
B) The pointer is uninitialized when the cursor is opened, and each FETCH operation retrieves the current row and advances the pointer to the next row in the active set.
C) The pointer is managed by the client application and must be manually incremented using an index variable.
D) The pointer is always fixed at the last row retrieved, requiring a PREVIOUS keyword to traverse backward.
Correct Answer: B

Justification:

B is CORRECT: When you fetch a row, the current row position moves to the next row. The pointer is advanced automatically with each FETCH command [7].
A is INCORRECT: The pointer has nothing to do with transaction commits.
C is INCORRECT: It is managed internally by the Oracle database engine, not the client application.
D is INCORRECT: Cursors are forward-only traversal mechanisms in standard PL/SQL; there is no PREVIOUS navigation.
QUESTION 9 (Application)
Topic: Implicit Cursor Creation Conditions
Under which of the following conditions does Oracle database create an implicit cursor by default? (Select ALL that apply)

Options:

A) During the execution of an UPDATE statement that modifies 50 rows.
B) During the execution of a DELETE statement that removes 0 rows.
C) During the execution of a SELECT statement that returns exactly one row.
D) During the execution of a DECLARE block containing local variables.
Correct Answers: A, B, C

Justification:

A & B are CORRECT: Implicit cursors are created by default when DML statements like INSERT, UPDATE, and DELETE are executed, regardless of how many rows are affected [7].
C is CORRECT: They are also created when a SELECT statement that returns just one row is executed [7].
D is INCORRECT: Declaring variables does not interact with database tables and does not create a database cursor.
QUESTION 10 (Analysis)
Topic: Memory Overhead and Cursor Execution
Why are explicit cursors preferred over implicit cursors when retrieving and processing a large dataset of 10,000 rows?

Options:

A) Implicit cursors will automatically load all 10,000 rows into the local client memory, causing an out-of-memory error.
B) An implicit cursor cannot handle multiple rows and would raise a TOO_MANY_ROWS exception immediately upon finding more than one row during a standard SELECT INTO.
C) Explicit cursors allow the database to bypass transaction logging, making row retrieval significantly faster.
D) Explicit cursors are compiled faster because they do not require any validation checks.
Correct Answer: B

Justification:

B is CORRECT: A standard single-row SELECT INTO implicit cursor is structurally restricted to single-row results; returning multiple rows throws TOO_MANY_ROWS [7]. To process a large dataset row-by-row, explicit cursors (or explicit cursor loops) must be used.
A is INCORRECT: The issue is not memory exhaustion but structural restriction and exception handling in standard single-row SQL.
C is INCORRECT: Explicit cursors do not bypass transaction logs.
D is INCORRECT: Compilation and validation checks are identical for both.
SECTION B: PL/SQL PROCEDURES AND FUNCTIONS (QUESTIONS 11 - 20)
QUESTION 11 (Analysis)
Topic: Structural and Functional Comparison of Procedures vs. Functions
As a senior DBA, you are reviewing subprogram designs. Which of the following statements represents a correct structural difference between a Procedure and a Function in PL/SQL? (Select ALL that apply)

Options:

A) Functions can accept multiple input parameters and return exactly one value, whereas Procedures can return multiple values via OUT parameters.
B) Functions can be used inside standard SQL syntax (e.g., SELECT or WHERE clauses), whereas Procedures cannot.
C) Procedures are mandatory for database operations, whereas Functions are optional utility blocks.
D) A Function can return multiple values through OUT parameters in addition to its return value, but this prevents it from being called within standard SQL queries.
Correct Answers: A, B, D

Justification:

A is CORRECT: According to the comparison table, procedures can return multiple output values via OUT parameters, while functions return exactly one value via the RETURN statement [8].
B is CORRECT: Functions can be used in SQL syntax, whereas procedures cannot [8].
C is INCORRECT: Both procedures and functions are database subprograms; neither is "mandatory" while the other is "optional." Both are tools for modularization.
D is CORRECT: While technically a function can have OUT parameters, doing so violates its primary purpose (returning a single value) and makes it illegal to use within SQL queries because SQL queries expect functions to be side-effect free and return exactly one value [8].
QUESTION 12 (Application)
Topic: Parameter Modes (IN, OUT, IN OUT) Behavior
Consider the following procedure definition:

CREATE OR REPLACE PROCEDURE calculate_data (
  p_val1 IN NUMBER,
  p_val2 OUT NUMBER,
  p_val3 IN OUT NUMBER
) IS
BEGIN
  p_val2 := p_val1 * 2;
  p_val3 := p_val3 + p_val2;
END calculate_data;
If a developer executes this procedure with the following block:

DECLARE
  v_a NUMBER := 10;
  v_b NUMBER := 50;
  v_c NUMBER := 5;
BEGIN
  calculate_data(v_a, v_b, v_c);
  DBMS_OUTPUT.PUT_LINE(v_b || ' and ' || v_c);
END;
What will be the printed output of the block?

Options:

A) 20 and 25
B) 20 and 75
C) 100 and 105
D) 50 and 25
Correct Answer: A

Justification:

A is CORRECT:
p_val1 is IN (value is 10).
p_val2 is OUT. Inside the procedure, it is uninitialized (starts as NULL). The assignment p_val2 := p_val1 * 2 sets p_val2 = 20.
p_val3 is IN OUT (value is 5). The assignment p_val3 := p_val3 + p_val2 becomes 5 + 20 = 25.
When the procedure finishes, the actual parameters v_b and v_c are updated to 20 and 25 respectively [8].
B is INCORRECT: This would occur if the old value of v_b (50) was added to v_c (50 + 25 = 75), but p_val2 is updated to 20 inside.
C is INCORRECT: This assumes v_b (50) was passed as an IN parameter and doubled, which is not what the code does.
D is INCORRECT: The OUT parameter v_b is overwritten; it does not retain its pre-call value of 50.
QUESTION 13 (Analysis)
Topic: Subprogram Declarations and Syntax Validation
A developer writes a procedure but gets a compilation error. What is the syntax error in the following block?

CREATE OR REPLACE PROCEDURE display_message (p_msg IN VARCHAR2)
DECLARE
  v_suffix VARCHAR2(10) := '!!!';
BEGIN
  DBMS_OUTPUT.PUT_LINE(p_msg || v_suffix);
END display_message;
Options:

A) The parameter p_msg must specify a size constraint (e.g., VARCHAR2(30)).
B) The keyword DECLARE is used. Procedures must use IS or AS and declare local variables before BEGIN without the DECLARE keyword.
C) Procedures cannot accept parameters of type VARCHAR2 without a default value.
D) The procedure lacks an EXCEPTION block, which is mandatory for all procedures.
Correct Answer: B

Justification:

B is CORRECT: In subprogram definitions (procedures and functions), the declaration section starts with the keyword IS or AS [8, 10]. The keyword DECLARE is only used for anonymous PL/SQL blocks and must NOT be used in procedures or functions [4, 8].
A is INCORRECT: Parameter declarations in procedures and functions must not specify constraints like size (e.g., write VARCHAR2, not VARCHAR2(30)) [8].
C is INCORRECT: Default values are optional for parameters.
D is INCORRECT: Exception blocks are optional [9].
QUESTION 14 (Application)
Topic: Functions in SQL Queries and Mutating State Restrictions
A student creates a function to calculate a discount:

CREATE OR REPLACE FUNCTION apply_discount(p_price IN NUMBER)
RETURN NUMBER
IS
BEGIN
  UPDATE inventory SET last_accessed = SYSDATE;
  RETURN p_price * 0.9;
END apply_discount;
When this function is executed via: SELECT apply_discount(price) FROM products;, what will happen?

Options:

A) The query executes successfully and updates the inventory table for every row in products.
B) The query fails at runtime because functions called from SQL SELECT queries are not allowed to perform DML operations (such as UPDATE) on database tables.
C) The query compiles but only updates the first row in inventory due to performance optimizations.
D) The SQL engine automatically wraps the DML in an autonomous transaction and commits it.
Correct Answer: B

Justification:

B is CORRECT: When a PL/SQL function is used inside a standard SQL syntax (like a SELECT statement), it must obey strict rules: it cannot perform DML statements (like INSERT, UPDATE, or DELETE) on database tables [8, 11]. Attempting to do so raises a runtime exception.
A, C & D are INCORRECT: The execution is blocked by the Oracle database engine to prevent side effects during query execution.
QUESTION 15 (Analysis)
Topic: Parameter Specifications and Constraints
Which of the following represents a valid syntax for declaring parameters in a PL/SQL procedure or function?

Options:

A) CREATE PROCEDURE proc1 (p_id IN NUMBER(10))
B) CREATE PROCEDURE proc1 (p_id IN NUMBER)
C) CREATE PROCEDURE proc1 (p_name IN OUT VARCHAR2(50))
D) CREATE PROCEDURE proc1 (p_date DATE(7))
Correct Answer: B

Justification:

B is CORRECT: In PL/SQL subprogram parameters, only the base datatype name is specified (e.g., NUMBER, VARCHAR2, DATE). Precision or size constraints are illegal in the parameter list [8].
A, C & D are INCORRECT: They specify size/precision constraints (NUMBER(10), VARCHAR2(50), DATE(7)), which will result in compile-time errors.
QUESTION 16 (Application)
Topic: Analyzing "update_salary_by_dept" Activity Behavior
Based on the class activity to create update_salary_by_dept(p_dept_id IN NUMBER, p_percent IN NUMBER, p_updated_count OUT NUMBER) [10]: if a department ID does not exist in the database, what is the correct implementation behavior?

Options:

A) The UPDATE statement throws an implicit NO_DATA_FOUND exception, forcing execution to the exception block.
B) The UPDATE statement completes without error, setting p_updated_count to 0, and the procedure completes gracefully.
C) The database raises a TOO_MANY_ROWS exception because multiple updates were attempted.
D) The database automatically rolls back the entire transaction history since the last connection.
Correct Answer: B

Justification:

B is CORRECT: SQL DML statements like UPDATE do not throw NO_DATA_FOUND exceptions when they match zero rows [9]. The update simply affects 0 rows. To satisfy the activity requirement of "returning the number of employees updated", the developer should assign SQL%ROWCOUNT (which is 0) to the OUT parameter p_updated_count [10].
A is INCORRECT: NO_DATA_FOUND is only raised by a single-row SELECT INTO, not by an UPDATE statement.
C is INCORRECT: TOO_MANY_ROWS is raised by SELECT INTO returning multiple rows, not by updates.
D is INCORRECT: Transactional control is maintained, and no automatic database-wide rollbacks occur.
QUESTION 17 (Analysis)
Topic: Function Return Semantics & Exception Handlers
An examiner writes a function with an exception handler:

CREATE OR REPLACE FUNCTION get_val(p_num IN NUMBER)
RETURN VARCHAR2
IS
BEGIN
  IF p_num > 100 THEN
    RETURN 'High';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error';
END get_val;
If this function is called with p_num = 50, what happens at runtime?

Options:

A) The function returns NULL because the IF condition failed and no default was specified.
B) The database raises an "ORA-06503: PL/SQL: Function returned without value" exception at runtime.
C) The function automatically jumps to the EXCEPTION block and returns 'Error'.
D) The function is rejected by the compiler during compilation because all execution paths must statically prove a return value.
Correct Answer: B

Justification:

B is CORRECT: A function must return a value of the declared datatype at runtime [10, 11]. If p_num = 50, the execution skips the IF block and reaches the end of the execution block without executing a RETURN statement. Since no exception occurred during execution, it does not trigger the EXCEPTION block. Instead, it hits the END block and raises the runtime error "Function returned without value".
A is INCORRECT: PL/SQL does not return a default NULL in this case; it throws an error.
C is INCORRECT: The exception block is only entered if an error occurs during the execution of statements, not because a logic path lacked a return statement.
D is INCORRECT: This compiles successfully because the syntactic structure contains return statements; the error is a runtime flow-of-control issue.
QUESTION 18 (Application)
Topic: Handling NULL and Arithmetic in Functions
In the activity get_employee_annual_salary [11, 12], the formula for the annual salary is defined as (salary * 12). However, if the employee has a bonus percentage, it must be added. If a developer implements the assignment as:
v_annual := (v_salary * 12) + (v_salary * 12 * v_bonus_percent);
What will happen if an employee has a valid v_salary but their v_bonus_percent is NULL in the database?

Options:

A) The function will calculate the salary ignoring the bonus (equivalent to a bonus of 0).
B) The calculation will return NULL for the entire annual salary because any arithmetic operation involving a NULL operand yields NULL.
C) The database automatically substitutes NULL with 1 during arithmetic operations.
D) A VALUE_ERROR exception is thrown at runtime, interrupting the function.
Correct Answer: B

Justification:

B is CORRECT: In database systems and SQL, any mathematical operation involving NULL returns NULL [11]. If v_bonus_percent is NULL, the term (v_salary * 12 * v_bonus_percent) evaluates to NULL, and adding it to (v_salary * 12) results in NULL. To prevent this, NVL or COALESCE must be used to handle NULLs [11].
A is INCORRECT: Oracle does not automatically convert NULL to 0 in arithmetic unless instructed via functions like NVL.
C & D are INCORRECT: It is a logical NULL propagation behavior, not an automatic replacement or a runtime system crash.
QUESTION 19 (Analysis)
Topic: Subprogram Execution & Commit Control
Review the database procedure from the slides:

CREATE OR REPLACE PROCEDURE update_emp_salary (
  p_emp_id IN NUMBER,
  p_percent IN NUMBER
) IS
BEGIN  
  UPDATE employees  
  SET salary = salary + (salary * (p_percent / 100))  
  WHERE employee_id = p_emp_id;  
  COMMIT;  
  DBMS_OUTPUT.PUT_LINE('Salary updated.');
END update_emp_salary;
If a calling anonymous block performs several inserts into another audit table, and then calls update_emp_salary, what is the scope of the COMMIT; statement executed inside the procedure?

Options:

A) The COMMIT only saves the UPDATE statement inside the procedure, leaving the inserts in the calling block uncommitted.
B) The COMMIT saves both the UPDATE inside the procedure and all pending modifications (including the inserts) in the current session transaction.
C) The COMMIT is ignored because nested procedures are not allowed to control transactions.
D) The procedure fails compilation because a COMMIT statement cannot exist within a subprogram.
Correct Answer: B

Justification:

B is CORRECT: In standard Oracle PL/SQL, a COMMIT statement commits the entire current transaction in the session, saving all pending changes made in the session so far, which includes both the procedure's DML and any preceding DML from the calling block [9].
A is INCORRECT: A standard commit is not statement-scoped; it is transaction-scoped.
C & D are INCORRECT: COMMIT is syntactically and operationally valid in procedures [9].
QUESTION 20 (Analysis)
Topic: Function Characteristics & SQL Syntax Integration
Which of the following is true regarding functions in PL/SQL? (Select ALL that apply)

Options:

A) A function can be called as part of an expression in a standard SQL SELECT query.
B) A function can have NO parameters but must always declare a RETURN datatype.
C) A function's return value must be a scalar database type; it cannot be customized.
D) A function executes automatically in response to DML operations on a table.
Correct Answers: A, B

Justification:

A is CORRECT: Functions are designed to be used in SQL syntax directly [8, 11].
B is CORRECT: Parameters are optional for functions, but a function must have a RETURN datatype specified in its header [10, 11].
C is INCORRECT: Functions can return complex types, not just scalar types.
D is INCORRECT: Triggers execute automatically in response to DML operations, not standard functions [12].
SECTION C: DATABASE TRIGGERS (QUESTIONS 21 - 30)
QUESTION 21 (Analysis)
Topic: Triggers vs. Procedures & Functions Execution Paradigm
How does the execution of a Database Trigger fundamentally differ from that of Procedures and Functions?

Options:

A) Triggers must be explicitly called with parameter values, whereas Procedures execute automatically.
B) Triggers cannot perform DML statements on other tables, whereas Procedures can.
C) Triggers execute (fire) automatically in response to specific events (like DML) on a table or view, requiring no application or explicit code call, whereas Procedures/Functions must be explicitly executed.
D) Triggers are compiled at runtime on each execution, whereas Procedures and Functions are pre-compiled database objects.
Correct Answer: C

Justification:

C is CORRECT: Triggers let the database itself automatically respond to events with no application code or explicit call needed. They fire automatically in response to events, whereas procedures/functions must be explicitly invoked [12].
A is INCORRECT: It reverses the behavior; procedures are called, triggers are automatic.
B is INCORRECT: Triggers can perform DML on other tables (as seen in the salary audit insert example) [14].
D is INCORRECT: All are stored PL/SQL blocks and are pre-compiled database objects.
QUESTION 22 (Application)
Topic: BEFORE vs. AFTER Trigger Timing and Field Modification
A database designer wants to write a trigger on the employees table that automatically capitalizes the employee's name (emp_name) before saving it to the table. Which configuration is appropriate and why?

Options:

A) An AFTER INSERT trigger, because name changes can only be verified after the record has been successfully inserted into the database.
B) A BEFORE INSERT FOR EACH ROW trigger, because it allows the trigger to modify the :NEW.emp_name field directly before the data is written to the disk.
C) A statement-level BEFORE INSERT trigger, because it optimizes performance by capitalizing all names in a single step.
D) Either BEFORE or AFTER row-level trigger; they both allow modifications to the :NEW fields.
Correct Answer: B

Justification:

B is CORRECT: A BEFORE row-level trigger is the only place where the values in the :NEW record can be modified before the DML statement is written to the table [13].
A is INCORRECT: In an AFTER trigger, the row has already been written; thus, :NEW fields are read-only and cannot be modified.
C is INCORRECT: Statement-level triggers do not have access to individual row :NEW or :OLD values, so they cannot modify row data [13].
D is INCORRECT: AFTER triggers cannot modify :NEW values.
QUESTION 23 (Analysis)
Topic: Row-Level vs. Statement-Level Trigger Execution
An employees table currently has 100 employee records. A developer executes the statement: UPDATE employees SET salary = salary * 1.05;.
If there are two triggers active on the table:

Trigger 1: CREATE TRIGGER tr1 AFTER UPDATE ON employees ... (Statement-level)

Trigger 2: CREATE TRIGGER tr2 AFTER UPDATE ON employees FOR EACH ROW ... (Row-level)
How many times will each trigger execute during this update transaction?

Options:

A) Trigger 1 will execute 1 time; Trigger 2 will execute 1 time.
B) Trigger 1 will execute 100 times; Trigger 2 will execute 100 times.
C) Trigger 1 will execute 1 time; Trigger 2 will execute 100 times.
D) Trigger 1 will execute 0 times because no row filters were specified; Trigger 2 will execute 100 times.
Correct Answer: C

Justification:

C is CORRECT: Row-level triggers containing the clause FOR EACH ROW execute once for each row affected by the triggering DML statement (100 times) [13, 14]. Statement-level triggers (which omit the FOR EACH ROW clause) execute exactly once per DML statement, regardless of the number of affected rows (1 time) [13].
A, B & D are INCORRECT: They fail to represent the fundamental operational distinction between statement-level and row-level triggers.
QUESTION 24 (Application)
Topic: Pseudorecords (:OLD and :NEW) Availability Matrix
In a row-level database trigger, which of the following accurately describes the availability of the :OLD and :NEW qualifiers? (Select ALL that apply)

Options:

A) During an INSERT statement, :OLD values are fully populated with default database parameters.
B) During an INSERT statement, :OLD is NULL (or unpopulated), and :NEW contains the values to be inserted.
C) During a DELETE statement, :OLD contains the existing row values being deleted, and :NEW is NULL (or unpopulated).
D) During an UPDATE statement, :OLD contains the pre-update row values, and :NEW contains the post-update values.
Correct Answers: B, C, D

Justification:

B is CORRECT: For an INSERT trigger, there is no previous state, so :OLD is empty/NULL, and :NEW contains the values being inserted [13].
C is CORRECT: For a DELETE trigger, the row is being removed; therefore, :OLD has the existing values, and :NEW is empty [13].
D is CORRECT: For an UPDATE trigger, :OLD represents the values before the update, and :NEW represents the proposed new values [13, 14].
A is INCORRECT: :OLD does not contain default parameters during an INSERT; it is simply not populated.
QUESTION 25 (Analysis)
Topic: Trigger Compilation Failure of AFTER Trigger Modifying :NEW
A junior developer attempts to compile the following trigger and gets an error:

CREATE OR REPLACE TRIGGER trg_salary_cap
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF :NEW.salary > 200000 THEN
    :NEW.salary := 200000;
  END IF;
END;
What is the exact reason for the compilation error?

Options:

A) The database does not allow comparing :NEW values inside an IF statement.
B) :NEW values are read-only in AFTER triggers and cannot be assigned new values.
C) The parameter 200000 is missing a currency symbol or unit of measurement.
D) FOR EACH ROW cannot be used in conjunction with AFTER triggers.
Correct Answer: B

Justification:

B is CORRECT: In AFTER triggers, the DML changes have already been written to the table. Thus, the :NEW pseudorecord fields are strictly read-only [13, 14]. To modify proposed data values before they are written to the database, a BEFORE trigger must be used [13].
A is INCORRECT: Comparing :NEW values is perfectly valid.
C is INCORRECT: Database numbers do not contain formatting characters like currency.
D is INCORRECT: Row-level AFTER triggers are fully supported (as shown in the slide audit example) [14].
QUESTION 26 (Application)
Topic: Trigger WHEN Clause Syntax Restrictions
A developer wants to restrict a row-level trigger to fire only when the new salary is greater than 100,000. Which of the following syntaxes is valid for the trigger header?

Options:

A) CREATE TRIGGER trg ON employees FOR EACH ROW WHEN (:NEW.salary > 100000)
B) CREATE TRIGGER trg ON employees FOR EACH ROW WHEN (NEW.salary > 100000)
C) CREATE TRIGGER trg ON employees FOR EACH ROW BEGIN IF :NEW.salary > 100000 THEN ...
D) Both B and C are syntactically valid methods of applying conditional criteria.
Correct Answer: D

Justification:

D is CORRECT (B and C are both valid):
In the WHEN clause of a trigger header, the colon (:) prefix must NOT be used for the NEW and OLD qualifiers [13]. Thus, WHEN (NEW.salary > 100000) (Option B) is syntactically correct.
Alternatively, the check can be written inside the trigger body within an IF statement using the colon prefix, such as IF :NEW.salary > 100000 THEN (Option C) [14].
A is INCORRECT: Using the colon (:) prefix inside the WHEN clause is a syntax error in Oracle PL/SQL.
QUESTION 27 (Analysis)
Topic: Trigger Transaction Scope & Constraints
Why is a database trigger prohibited from executing transaction control statements like COMMIT; or ROLLBACK; directly in its body?

Options:

A) Triggers run in a completely offline sandbox and do not interact with active transactions.
B) Triggers execute as an integral part of the triggering DML statement's transaction. Allowing a trigger to commit would prematurely finalize parent transactions, breaking database integrity.
C) Trigger execution blocks are too small to support the memory required for commits.
D) Standard Oracle SQL syntax does not recognize the keyword COMMIT inside triggers.
Correct Answer: B

Justification:

B is CORRECT: A trigger operates as part of the transaction that executes the triggering SQL statement. If a trigger was allowed to commit or roll back, it would commit or roll back the parent transaction's changes along with its own, compromising transaction control and consistency.
A is INCORRECT: Triggers are highly integrated online database objects, not sandboxed.
C is INCORRECT: It is a logical architectural constraint, not a memory/size limitation.
D is INCORRECT: The parser recognizes the keyword, but the runtime throws an exception to prevent transaction boundary violations.
QUESTION 28 (Application)
Topic: Audit Trigger Logical Trace
Trace the slide example trigger trg_audit_salary_update [14]:

CREATE OR REPLACE TRIGGER trg_audit_salary_update
AFTER UPDATE OF salary ON employees
FOR EACH ROW
BEGIN  
  IF :OLD.salary < :NEW.salary THEN
    INSERT INTO salary_audit VALUES (:OLD.emp_id, :OLD.salary, :NEW.salary, SYSTIMESTAMP);
  END IF;
END;
If Alice Smith has an initial salary of 5000.00 and an update is issued:
UPDATE employees SET salary = 4800.00 WHERE emp_id = 101;
What will be recorded in the salary_audit table?

Options:

A) A record showing a change from 5000.00 to 4800.00 with the timestamp.
B) Nothing is inserted because the condition :OLD.salary < :NEW.salary evaluates to FALSE (4800 is not greater than 5000).
C) The trigger throws a runtime error because salary decreases are not allowed.
D) A row is inserted, but with NULL values for the salaries.
Correct Answer: B

Justification:

B is CORRECT: The trigger has a conditional check: IF :OLD.salary < :NEW.salary [14]. Since the old salary (5000) is greater than the new salary (4800), the condition is FALSE. The INSERT statement is bypassed, and nothing is recorded in the salary_audit table [14].
A is INCORRECT: This would occur if there was no check, but the IF condition blocks it.
C is INCORRECT: The trigger logic itself does not throw an error or prevent the decrease; it simply decides not to audit it.
D is INCORRECT: It does not insert NULLs; the whole INSERT block is skipped.
QUESTION 29 (Application)
Topic: Enforcing Constraints via Triggers (Prevent Salary Decrease Activity)
In the activity trg_prevent_salary_decrease [15], the trigger must prevent the salary from decreasing and prevent the salary from exceeding 200,000. To successfully prevent these updates from being written to the database, what should the trigger do?

Options:

A) Execute a ROLLBACK; statement directly inside the exception handler.
B) Raise a custom exception or use RAISE_APPLICATION_ERROR to interrupt execution, which halts the DML statement and rolls back its changes.
C) Reset the :NEW.salary := :OLD.salary; silently without notifying the user application.
D) Delete the modified employee record entirely from the table.
Correct Answer: B

Justification:

B is CORRECT: To prevent an update and notify the application, the trigger must raise a runtime error (e.g., using RAISE_APPLICATION_ERROR) [15, 16]. This halts execution, aborts the SQL statement, and rolls back any changes made by the statement, raising an appropriate error message [15, 16].
A is INCORRECT: Direct ROLLBACK is illegal in triggers.
C is INCORRECT: Although a BEFORE trigger can overwrite values, the activity mandates "raising appropriate error messages for each violation" [15, 16]. Silently resetting is not the requested behavior.
D is INCORRECT: Deleting the record is highly destructive and does not solve the constraint requirement.
QUESTION 30 (Analysis)
Topic: Cascade execution of multiple database objects
An update statement on employees fires a BEFORE UPDATE trigger, which updates a record in the departments table. The update in departments subsequently fires a trigger on departments which inserts a row in audit_log. Which of the following is true?

Options:

A) The execution of nested triggers is illegal; the engine will crash on the second trigger.
B) All trigger executions are flattened, and they execute concurrently in parallel threads.
C) The triggers execute sequentially in a cascading fashion within the single, shared transaction boundary. If any trigger fails, all changes in the cascade are rolled back.
D) The parent update must commit before the department trigger can fire.
Correct Answer: C

Justification:

C is CORRECT: Oracle supports cascading triggers. One trigger's DML can fire another trigger. All of these run within the same session and transaction boundary. If any part of the chain fails, the entire transaction (or the triggering statement's block) is rolled back, preserving database integrity.
A is INCORRECT: Nested triggers are fully supported and standard in relational databases.
B is INCORRECT: Database execution in PL/SQL is sequential and synchronous, not concurrent/parallel.
D is INCORRECT: Triggers do not commit independently; they rely on the main transaction's commit.
ANSWER KEY
Question	Correct Option	Primary Topic Reference (Lec1.pdf)
Q1	A	Cursors (Slide 6, 7)
Q2	B	Cursors (Slide 7), Blocks (Slide 5)
Q3	C	Cursors (Slide 7)
Q4	C	Cursors (Slide 7)
Q5	B	Cursors (Slide 7)
Q6	A, B, C	Cursors (Slide 6, 7)
Q7	C	Cursors (Slide 7)
Q8	B	Cursors (Slide 7)
Q9	A, B, C	Cursors (Slide 7)
Q10	B	Cursors (Slide 7)
Q11	A, B, D	Procedures & Functions (Slide 8, 11)
Q12	A	Procedures (Slide 8)
Q13	B	Procedures (Slide 8, 9), Blocks (Slide 4)
Q14	B	Functions (Slide 8, 11)
Q15	B	Procedures (Slide 8)
Q16	B	Procedures (Slide 10)
Q17	B	Functions (Slide 10, 11)
Q18	B	Functions (Slide 11, 12)
Q19	B	Procedures (Slide 9)
Q20	A, B	Functions (Slide 8, 10, 11)
Q21	C	Triggers (Slide 12)
Q22	B	Triggers (Slide 13)
Q23	C	Triggers (Slide 13, 14)
Q24	B, C, D	Triggers (Slide 13)
Q25	B	Triggers (Slide 13, 14)
Q26	D	Triggers (Slide 13, 14)
Q27	B	Triggers (Slide 13)
Q28	B	Triggers (Slide 14)
Q29	B	Triggers (Slide 15, 16)
Q30	C	Triggers (Slide 12, 13)
