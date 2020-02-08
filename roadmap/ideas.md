### Ideas
- monetize uploading public/private datasets
- color scales
  - for **continuous** data the default should probably be some viridis color scale, but other options (diverging, bright to dark, dark to bright, custom) should be available
  - for **discrete** data there has to be the option to select that the data is discrete and a default and custom option to color them available
  - **binned continuous** data could either 
    - be simply integrated in the discrete option (bins are thus decided by the user with more effort)
    - or done by us with the choice of different binning algorithms (constant size, quantiles method, Fisher-Jenks, ...)
- different options of plots
  - our existing 3D hexagon plot
  - non-3D version of hexagon plot (3D plots have the caveat that big bars tend to _hide_ smaller ones, thus skewing the visualization)
  - simply plotting every data point
  - heatmap / contour map
  - choropleth map
  - cartogram
- ability for users to comment on maps
- ability for users to easily share public/private maps via a link or QR code

