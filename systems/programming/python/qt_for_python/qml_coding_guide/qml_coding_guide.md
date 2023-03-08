# QML Coding Guide

## Table of Contents

- [QML Coding Guide](#qml-coding-guide)
  - [Table of Contents](#table-of-contents)
  - [Coding Style](#coding-style)
  - [Source(s)](#sources)

## Coding Style

QML object attributes are always structured in the following order:

- id
- Property declarations
- Signal declarations
- Property initializations
- Attached properties and signal handlers
- States
- Transitions
- Signal handlers
- Child objects
  - Visual Items
  - Qt provided non-visual items
  - Custom non-visual items
- `QtObject` for encapsulating private members[1](https://bugreports.qt.io/browse/QTBUG-11984)
- JavaScript functions

- The main purpose for this order is to make sure that 
  - the most intrinsic properties of a type is always the most visible one 
    > in order to make the interface easier to digest at a first glance.

Although it could be argued that the "JavaScript functions" are also part of the interface, the ideal is _to have no functions at all_.

## Source(s)

[Furkanzmc / QML-Coding-Guide](https://github.com/Furkanzmc/QML-Coding-Guide/)
