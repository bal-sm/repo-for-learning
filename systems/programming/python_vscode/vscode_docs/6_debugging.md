# Python debugging in VS Code

## Diambil dari tutorial [1]

### Configure and run the debugger [1.1]

1. Check if the `Python Debugger` extension is installed.
2. Set a breakpoint:

   ```python
   msg = "Roll a dice"
   print(msg) # Press `F9` here or click in this line's gutter.

   # Then a red circle appears in the gutter.
   ```

3. Initialize the debugger, by pressing `F5`:
   - Select `Python File` from the dropdown, when prompt.
   - The debugger will start, and then stop at the first line of the file breakpoint.
     - The current line is indicated with a yellow arrow in the left margin.
     - If you examine the **Local** variables window at this point, you can see that the `msg` variable appears in the **Local** pane.
     - A debug toolbar appears along the top with the following commands from left to right:
       - continue (`F5`),
       - step over (`F10`),
         - > I actually don't what this means, yet, 1.
       - step into (`F11`),
         - > I actually don't what this means, yet, 2.
       - step out (`Shift+F11`),
         - > I actually don't what this means, yet, 3.
       - restart (`Ctrl+Shift+F5`),
       - and stop (`Shift+F5`).
     - The Status Bar also changes color
       - (orange in many themes)
       - to indicate that you're in debug mode.
     - > The `Python Debug Console` also appears automatically in the lower right panel to show the commands being run, along with the program output.
     - To continue running the program,
       - select the continue command on the debug toolbar (`F5`).
       - > Debugging information can also be seen by hovering over code, such as **variables**. In the case of `msg`, hovering over the variable will display the string `Roll a dice!` in a box above the variable. This is a tip.
     - You can also work with variables in the **`Debug Console`**
       - > (If you don't see it, select *Debug Console* in the lower right area of VS Code, or select it from the ... menu.)
       - Then try entering the following lines, one by one, at the `>` prompt at the bottom of the console:

         ```python
         > msg
         # 'Roll a dice!'
         > msg.capitalize()
         # 'Roll a dice!'
         > msg.split()
         # ['Roll', 'a', 'dice!']
         ```

         Mine:
         > omG I can manipulate variable on the Debug Console????

         Mine:
         > serius loh itu kalo `msg = msg.title()` di Debug Console, `msg` di code juga berubah jadi `Roll A Dice!`.

4. Select the blue **Continue** button on the toolbar again (or press `F5`) to run the program to completion.
   - "Roll a dice!" appears in the `Python Debug Console` if you switch back to it, and VS Code exits debugging mode once the program is complete.
5. If you restart the debugger, the debugger again stops on the first breakpoint.
6. To stop running a program before it's complete, use the red square stop button on the debug toolbar (`Shift+F5`), or use the **Run** > **Stop** debugging menu command.

Tip: Use `Logpoint`s instead of `print` statements:
> - Developers often litter source code with `print` statements to quickly inspect variables without necessarily stepping through each line of code in a debugger.
>   - In VS Code, you can instead use **Logpoints**.
> - A `Logpoint` is like a `breakpoint` except that:
>   - it logs a message to the console and
>   - doesn't stop the program.

Mine:
> Logpoint vs. `print()`??
>
> Logpoint better anying gblk.

## ...

Mine:
> Now the real lesson of debugging on [2] (sic).

..., TBA.

## Source(s)

- [1]: [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial)
  - [1.1]: [Configure and run the debugger](https://code.visualstudio.com/docs/python/python-tutorial#_configure-and-run-the-debugger)
- [2]: [Python debugging in VS Code](https://code.visualstudio.com/docs/python/debugging)
