// rain-from-google-cloud Copyright 2018 Paul Brewer, Economic and Financial Technology Consulting LLC
// This software is open source software available under the terms of the MIT License
// https://opensource.org/licenses/MIT
// This software is NOT a product of Google, Inc.

// jshint node:true, esversion:6 

/**
 * returns the rain function
 * rain can access, filter, and pluck from many of the lists accessible from the Google Compute Engine global object.
 * rain eliminates certain boilerplate common to many of these requests.  
 * rain will return a promise to the list of requested data.
 * @param { Object } result from calling `const compute = require('@google-cloud/compute')()
 * @return { Function } rain function
 */

module.exports = function(compute){
    return function rain(source,{options,filter,pluck}={}){
	if (typeof(source)!=='string') throw new Error('rain: source must be a string');
	if (typeof(compute['get'+source])!=='function') throw new Error(`rain: bad source ${source}`);
	if (source.endsWith("Stream")) throw new Error(`rain: bad source ${source}`);
	return (compute['get'+source](options)
		.then((r)=>(r[0]))
		.then((r)=>(r.map(x=>x.metadata).filter(x=>x)))
		.then((r)=>((filter)?(r.filter(filter)):(r)))
		.then((r)=>((pluck)?(r.map(x=>(x && x[pluck])).filter(x=>x)):(r)))
	       );
    };
};

