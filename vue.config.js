const webpack = require("webpack");
module.exports = {
    publicPath: '/',
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    }
}