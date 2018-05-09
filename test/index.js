// jshint node:true, esversion:6

const compute = require('@google-cloud/compute')();  // requires additional credentials when outside Google Cloud

// if it FAILS all the tests, you may need to fix your Google Cloud credentials.
// it is also possible to fail a test if you do not have any Disks, or any VMs, etc.  Please use common sense.  

require('should');

const rain = require('../index.js')(compute);

const things = [
    'Addresses',
    'Disks',
    'Firewalls',
    'MachineTypes',
    'Networks',
    'Operations',
    'Regions',
    'Snapshots',
    'Subnetworks',
    'VMs',
    'Zones'
];

describe('rain-from-google-cloud', function(){
    it('rain should be a function', function(){
	rain.should.be.type('function');
    });
    things.forEach((thing)=>{
	it(`rain('${thing}') should be a Promise resolving to some ${thing}`, function(){
	    return rain(thing).then((r)=>(r.length.should.be.above(0)));
	});
    });
    it("rain('Blackholes') should throw because Google Cloud doesn't make Blackholes (yet?) ", function(){
	(()=>rain('Blackholes')).should.throw();
    });
    it("rain('Zones', { filter: (z)=>(z.name.startsWith('us')), pluck: 'name'}) includes 'us-east1-b', 'us-central1-c'",
       function(){
	   return rain("Zones", {
	       filter: (z)=>(z.name.startsWith('us')),
	       pluck: 'name'
	   }).then((zones)=>{
	       zones.length.should.be.above(1);
	       zones.includes('us-east1-b').should.equal(true);
	       zones.includes('us-central1-c').should.equal(true);
	       zones.includes('asia-south1-b').should.equal(false);
	       zones.includes('mars-pyramid1-a').should.equal(false);
	   });
       });
});





