#rain-from-google-cloud

Helps extract information about VMs, Regions, Zones, or other things from Google Compute Cloud.

Hopefully compatible with most `getSomething` methods of the `Compute` object documented [here](https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/Compute).

## Installation

    npm i @google-cloud/compute -S
	npm i rain-from-google-cloud -S

## JS Engine Compatiblity

Includes ES6+ code. Intended for deployment on node.js

## Initialization

	const compute = require('@google-cloud/compute')(); // requires credentials when run outside of Google Cloud 
	const rain = require('rain-from-google-cloud')(compute);

## Usage

returns Promises

`{...}` is a placeholder for additional code 

Resolves to an Array of Strings containing  names of some Google Compute Engine Zones that 
are UP, start with us-, and support Intel Skylake (required for 64 or 96 cpu VMs).

	rain('Zones', { 
	    filter: (z)=>(
		   (z.name.startsWith('us-')) && 
		   (z.status==='UP') && 
		   (z.availableCpuPlatforms.includes("Intel Skylake"))
		   ),
		pluck: 'name'
	}).then(...startMyVMInOneOfTheseZones...)
	
## Tests

The [tests](./working-tests.txt) were run on a Google Cloud VM with full access to Google Compute Engine.

Running these tests outside Google Cloud will fail unless appropriate credentials are added to the line initializing `compute`.

### Copyright

Copyright 2018 Paul Brewer, Economic and Financial Technology Consulting LLC

### License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### No relationship to Google, Inc.

This software is 3rd party software. This software is not a product of Google, Inc.

Google Compute Engine[tm] is a trademark of Google, Inc.


