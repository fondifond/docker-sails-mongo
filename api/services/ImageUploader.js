var im = require('imagemagick');
var fs = require('fs');

module.exports = {
    process: function(fileObject, itemId){
        return new Promise(function(resolve, reject) {
            fileObject.upload({
                maxBytes : 100000000
            }, function (err, uploadedFiles) {
                for (var i in uploadedFiles) {
                    var path = 'assets/images/'+itemId;
                    if (fs.existsSync(path)) {
                        var dir = fs.readdirSync(path);
                        path = path +"/"+ (dir.length+1) + '.jpg';
                    } else {
                        fs.mkdirSync(path);
                        path = path + '/1.jpg';
                    }
                    ImageUploader
                        .resize(uploadedFiles[i].fd, path)
                        .then(function(filename){
                            fs.unlink(uploadedFiles[i].fd);
                            resolve(ImageUploader.pathToGlobal(filename));
                            return;
                        });
                }
            });
        });
    },
    resize: function(file, destination){
        return new Promise(function(resolve, reject) {
            im.convert(
                [
                    file,
                    '-resize', '300x300^',
                    '-gravity', 'center',
                    '-crop', '300x300+0+0', '+repage',
                    '-quality', '75',
                    '-interlace', 'Plane',
                    destination
                ],
                function(err, stdout){
                    if (err) reject(new Error(err));
                    console.log('stdout:', stdout);
                    resolve(destination);
                }
            );
        });
    },
    pathToLocal: function(path){
        if (path.search('assets') == -1) {
            path = 'assets'+path;
        }
        return path;
    },
    pathToGlobal: function(path){
        if (path.search('assets') != -1) {
            path = path.replace('assets', '');
        }
        return path;
    }
};