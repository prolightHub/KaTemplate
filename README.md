# KaTemplate
Can handle running Khan Academy programs on your computer
Please refresh again to load extra sounds and images.

# Usage:

Inside of _index.js_:

```
function main()
{
    // Put your Khan Academy javascript here
}
createProcessing(main);
```

Or split it up into multiple files and your _index.js_ would now look like this:
```
function main()
{
    // Put your Khan Academy javascript here
}
createProcessing(main, func1, func2);
```

_func1_ and _func2_ would be like this in other files:

```
function func1()
{
    // Do something here
}
```

```
function func2()
{
    // Do something here too
}
```

It's important to note that, your functions will get combined (in the order you put them in).

```
function anonymous()
{
    // Put your Khan Academy javascript here
    // Do something here
    // Do something here too
}
```

Or really like this:

```
(function anonymous(
) {
    return function any(processing)
    {
        ...
        with(processing)
        {
            // Put your Khan Academy javascript here
            // Do something here
            // Do something here too
        }
        ...
    };
})
```
