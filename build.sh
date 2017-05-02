NODE_ENV=production webpack -p --display-error-details
rm -rf build
mkdir build
cp -r public build/public
babel src/server.js -d build
cp package.json build
rm pdie.zip
cd build
zip -r ../pdie.zip *
