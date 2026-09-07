# Financial Tracker — V1 & V2

This repository documents the progression of my Python command-line financial tracker from V1 to V2.

The project started as a way to practice Python by building something practical rather than only working through isolated exercises. Each version builds on the previous one, adding functionality while giving me a chance to improve how I structure code, handle data, and think about user input.

---

# V1 — Financial Tracker

A beginner-to-intermediate Python command-line financial tracker built from scratch.

V1 focuses on transaction management, input validation, person-to-person money tracking, and basic financial calculations.

## Features

- Add income and expense transactions
- View transactions in a formatted table
- Calculate total income, expenses, and balance
- Track transactions involving other people
- Record money lent and borrowed
- View a person's transaction history
- Calculate whether I am a creditor, debtor, or settled
- Validate user input and handle invalid entries
- Support cancelling an operation

## Person Tracking

Transactions can be associated with a person and classified as:

```text
Normal
I lent money
I borrowed money
```

This allows the application to calculate a person's current balance instead of treating every transaction as a simple expense or income.

For example:

```text
I lend Dad $500
→ Dad owes me $500

Dad pays me $200
→ Remaining balance: $300

Dad pays the remaining $300
→ Settled
```

## Data Structure

Transactions are represented using Python dictionaries and stored in a list.

```python
{
    "type": "expense",
    "amount": 25.50,
    "category": "Food",
    "person": "",
    "relationship": "normal",
    "description": "Lunch"
}
```

One important design decision was keeping `type` separate from `relationship`.

```text
type
→ income / expense

relationship
→ normal / lent / borrowed
```

This keeps normal financial calculations separate from person-specific balances.

## What I Learned

V1 gave me practice with:

- Functions and program structure
- Lists and dictionaries
- Loops and conditionals
- Input validation
- Exception handling
- Data modelling
- String formatting
- Basic financial logic

One of the biggest lessons was that designing the data correctly can be just as important as writing the code that uses it.

## Limitations

V1 stores transactions only while the program is running. Closing the application clears the data.

There is also no way to edit or delete existing transactions.

These limitations became the starting point for V2.

## Future Improvements

- Persistent data storage
- Edit and delete transactions
- More robust error handling
- Automated tests
- Better reporting
- Database storage

## Tech Stack

- Python 3
- Python standard library
- Command-line interface

## How to Run

```bash
python financial_tracker.py
```

## Project Status

**Version:** V1.0  
**Status:** Completed learning milestone  
**Type:** Personal learning project

---

# V2 — Financial Tracker

V2 builds directly on the limitations of the first version.

The biggest change is persistent storage, but the application also gained a more complete transaction management system with editing, deletion, improved validation, and custom exception handling.

## What's New in V2

- JSON-based persistent storage
- Loading and saving transactions
- Add, view, edit, and delete operations
- Deletion confirmation
- Custom exception handling
- Improved input validation
- Date handling
- More complete transaction management

Transactions are stored in:

```text
transactions.json
```

The application loads saved transactions when it starts and saves changes when transactions are added, edited, or deleted.

It also handles a missing storage file and corrupted JSON data.

## Features

### Transaction Management

- Add income and expense transactions
- View all transactions
- Edit existing transactions
- Delete transactions
- Calculate total income, expenses, and balance
- Add categories and descriptions
- Use today's date or enter a specific date
- Cancel supported operations

### Person Tracking

The person tracking system from V1 remains in V2.

Transactions can be associated with another person and classified as:

```text
Normal
I lent money
I borrowed money
```

The application can then show a person's transaction history and calculate whether I am currently a creditor, debtor, or settled.

## Data Structure

Transactions continue to use Python dictionaries stored in a list, but V2 now persists that data as JSON.

```python
{
    "type": "expense",
    "amount": 25.50,
    "category": "Food",
    "person": "",
    "relationship": "normal",
    "description": "Lunch",
    "date": "2026-08-21"
}
```

Keeping `type` and `relationship` separate allows normal income/expense calculations to remain independent from person-to-person balances.

## What I Learned

V2 gave me experience with:

- JSON and file handling
- CRUD operations
- Exception handling and custom exceptions
- Input validation
- Date handling
- Persistent application data
- Editing and deleting existing data
- Managing different types of application state

The biggest change from V1 is that the application is no longer just recording data. It can now manage that data throughout its lifecycle.

This version still has plenty of room for improvement, but it feels like a step beyond a basic Python exercise and toward building a more structured application.

## Current Limitations

V2 is still contained in one Python file and uses JSON rather than a database. It also does not have automated tests or advanced reporting yet.

These are areas I want to work on in future versions.

## Future Improvements

- Split the application into multiple modules
- Add automated tests
- Add transaction filtering and reporting
- Add CSV import/export
- Move from JSON to SQLite
- Improve the command-line interface
- Explore a graphical or web interface

## Tech Stack

- Python 3
- Python standard library
- JSON
- Command-line interface

## How to Run

```bash
python financial_tracker.py
```

The application will create or use `transactions.json` for persistent transaction storage.

## Project Status

**Version:** V2.0  
**Status:** Working  
**Type:** Personal learning project

V2 is the next step in my progression from Python fundamentals toward building more structured and practical applications.
