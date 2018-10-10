// record-assets-plugin.js

function RecordAssetsPlugin (options) {}

RecordAssetsPlugin.prototype.apply = function (compiler) {
//  compiler.plugin('emit', function (compilation, callback) {
//    compilation.assets['abc'] = {
//      source: function () {
//        return 'xyz'
//      },
//      size: function () {
//        return 3
//      }
//    }
//    callback()
//  })

  compiler.plugin('after-emit', function (compilation, callback) {
    let stats = compilation.getStats().toJson()
    let scripts = '';
    let styles = '';

    stats.assets.forEach(function (assetInfo) {
      let name = assetInfo.name
      if (name.length >= 3 && name.slice(-3) === '.js') {
        scripts += '<script src="/'+ assetInfo.name +'">' +"\n"
      }
      else if (name.length >= 4 && name.slice(-4) === '.css') {
        styles += '<link rel="stylesheet" href="/'+ assetInfo.name +'">' +"\n"
      }
    })

    this.outputFileSystem.writeFile('templates/styles.html.ep', styles, callback)
    this.outputFileSystem.writeFile('templates/scripts.html.ep', scripts, callback)
  })
}

module.exports = RecordAssetsPlugin
