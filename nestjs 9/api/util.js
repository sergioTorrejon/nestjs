fs = require('fs').promises

module.exports = {
	titleCase: function(str) {
		return str.split('_').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
	},
	noExp: function(num) {
		return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function(a, b, c, d, e) {
			if (e < 0) {
				return b + '0.' + Array(1 - e - c.length).join(0) + c + d
			} else {
				return b + c + d + Array(e - d.length + 1).join(0)
			}
		})
	},
	round: function(number) {
		return (+(Math.round(this.noExp(number) + 'e+2') + 'e-2')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
	pdfImg: async function(src) {
		//let img = await fs.readFile(src, 'base64')
		//return 'data:image/jpeg;base64,'+img
	},
}