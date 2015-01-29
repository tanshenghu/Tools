var fs = require('fs');
var exec = require('child_process').exec;

// read package.json
var pkg = fs.readFileSync(__dirname + '/package.json').toString();
var cfg = JSON.parse(pkg);
var output = cfg.spm.output = [];

// read current git branch
var head = fs.readFileSync(__dirname + '/.git/HEAD').toString();
cfg.version = head.split('/').pop().trim();
console.log('\tVersion: \x1B[32m\"' + cfg.version + '\"\x1B[39m');

// find all pages
var pages = fs.readdirSync(__dirname + '/src/p');
for (var i = 0; i < pages.length; i++) {
    if (fs.existsSync(__dirname + '/src/p/' + pages[i] + '/index.js')) {
        output.push('p/' + pages[i] + '/index.js');
    }
    if (fs.existsSync(__dirname + '/src/p/' + pages[i] + '/index.css')) {
        output.push('p/' + pages[i] + '/index.css');
    }
    if (fs.existsSync(__dirname + '/src/p/' + pages[i] + '/index-en.js')) {
        output.push('p/' + pages[i] + '/index-en.js');
    }
    if (fs.existsSync(__dirname + '/src/p/' + pages[i] + '/index-en.css')) {
        output.push('p/' + pages[i] + '/index-en.css');
    }
}

// find all components
var comps = fs.readdirSync(__dirname + '/src/c');
for (var i = 0; i < comps.length; i++) {
    if (fs.existsSync(__dirname + '/src/c/' + comps[i] + '/' + comps[i] +  '.js')) {
        output.push('c/' + comps[i] + '/' + comps[i] + '.js');
    }
    if (fs.existsSync(__dirname + '/src/c/' + comps[i] + '/' + comps[i] + '.css')) {
        output.push('c/' + comps[i] + '/' + comps[i] + '.css');
    }
    if (fs.existsSync(__dirname + '/src/c/' + comps[i] + '/' + comps[i] +  '-en.js')) {
        output.push('c/' + comps[i] + '/' + comps[i] + '-en.js');
    }
    if (fs.existsSync(__dirname + '/src/c/' + comps[i] + '/common_pdf.css')) {
        output.push('c/' + comps[i] + '/' + 'common_pdf.css');
    }
}

// find all components
var comps = fs.readdirSync(__dirname + '/src/lang');

for (var i = 0; i < comps.length; i++) {
    if (fs.existsSync(__dirname + '/src/lang/en.js')) {
        output.push('lang/en.js');
    }
    if (fs.existsSync(__dirname + '/src/lang/zh.js')) {
        output.push('lang/zh.js');
    }
}

// write package.json
fs.writeFileSync(__dirname + '/package.json', JSON.stringify(cfg, null, '  '));

// spm build
/*console.log('\tStart to build.')
var cp = exec('spm build');
cp.stdout.on('data', function (data) {
    process.stdout.write(data);
});
cp.stderr.on('data', function (data) {
    process.stderr.write('\x1B[31m' + data + '\x1B[39m');
});
cp.on('exit', function() {
    console.log('\tBuild finished.');
});*/


