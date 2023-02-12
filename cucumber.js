module.exports = {
    default: {
        paths: [
            "src/app/features/**/*.feature"
        ],
        formatOptions: {
            snippetInterface: "synchronous",

        },
        publishQuiet: true,
        requireModule: [
            "ts-node/register"
        ],
        require: [
            "src/app/features/**/*.spec.ts"
        ]
    }
}