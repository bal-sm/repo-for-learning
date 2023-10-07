# Scrolling QTableWidget Smoothly by Mouse Wheel

## Question by ahmed4end

I tried .setVerticalScrollMode(QtWidgets.QAbstractItemView.ScrollPerPixel) which works nicely but requires user to move mouse to the scroll bar and use it to experience the smooth scroll but the mouse wheel works the old way with jumpy scrolling, i wonder if there a way to make the scrolling behave the same when using the mouse wheel ?

## Answer by nenad

You should use self.widget.verticalScrollBar().setSingleStep(step).

QTableWidget inherits QTableView, which inherits QAbstractItemView, which inherits QAbstractScrollArea, which has method verticalScrollBar(), which brings us to the QScrollBar Class that inherits QAbstractSlider, which finally has setSingleStep(step) method (maybe there is shorter path?).

Here's the complete code:

[smooth_scroll.py](smooth_scroll.py)

You can increase/decrease step in spinbox to see how it behaves. I hope that is what you asked for.
