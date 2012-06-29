#!/bin/sh

# Run `bash build.sh` from within the theme's directory whenever 
# you need to perform these tasks.

# A separate `watch.sh` script is better for continuous compilation
# of `.scss` files during development.

# Update any paths as needed. This example relies on all the theme's
# `.scss` files being in a `css/scss` directory, and all the `.js` files
# being in a `js` directory.


# Concatenate and minify the CSS
# Requires: Sass (Ruby)

END_CSS="css/main.css"
END_MIN_CSS="css/main.min.css"
SASS_COMMAND="sass --load-path css/scss --style"

$SASS_COMMAND expanded css/scss/main.scss:$END_CSS
$SASS_COMMAND compressed css/scss/main.scss:$END_MIN_CSS

echo "SCSS-to-CSS build compilation successful"

# Concatenate all JS files to into `site.js`
# Explicitly name and order the files if needed

rm -rf js/site.js js/site.min.js

cat js/*.js > js/site.js

echo "JS concatenation successful"

# Minify the combined JS
# Requires: UglifyJS (Node)

uglifyjs --output js/site.min.js js/site.js

echo "JS uglification successful"

exit 0