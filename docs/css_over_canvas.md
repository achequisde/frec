# Why use CSS over Canvas?

## Pitfalls of Canvas

Canvas is an extremely performant rasterizer, the problem lies within the fact that it's bitmap based, thus can't be easily scaled without code that allows for it.

The purpose of using CSS allows for a responsive solution that can be easily styled using CSS without further configuration.

## Usage of the Transform property

The bars drawn in the graph correspond to dynamically scaled divs using the **transform** property. Why use transform?

It'd be ideal to understand the rendering pipeline of the browser, which is divided into 4 specific steps. [1]

1. **Style**: calculation of styles applied to the elements.
2. **Layout**: generation of geometry and position for each element.
3. **Paint**: draw of pixels for each element into layers.
4. **Composite**: draw the layers to the screen.

Each step of this pipeline is **sequential**, this means that if we were to draw the layout again, it'd be **necessary** to paint and composite the viewport. [2]

If we were to resize an element using its height or width, we'd have to recalculate the geometry of the browser, thus having to return to the **layout** step. [2] 

This doesn't happen with the properties *trasnform*, *opacity* and *will-change*, as these calculations remain in the composite step of the rendering pipeline.

Changing the scale would mean that we'd take advantage of the browser to create a fully responsive bar graph for the waveform without creating any additional code to handle responsiveness.

Sources:
[1] https://web.dev/animations-overview/#pipeline
[2] https://web.dev/animations-overview/