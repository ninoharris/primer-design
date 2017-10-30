import ncbi from 'bionode-ncbi'

ncbi.search('protein', 'bacteriorhodopsin').then(o => o.title).then(console.log)
