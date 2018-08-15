module.exports = {
    "extends": "google",
    "env" : {
        "node" : true,
        "mocha": true
    },
    "parserOptions": {
        "ecmaVersion": 8
    },
    rules:{
        "linebreak-style": 0,
        "max-len": [2, {"code": 120, "tabWidth": 4, "ignoreUrls": true}],
        "maximumLineLength": 0,
        "require-jsdoc": [2, {
            "require": {
                "FunctionDeclaration": false,
                "MethodDefinition": false,
                "ClassDeclaration": false
            }
        }]
      }        
};