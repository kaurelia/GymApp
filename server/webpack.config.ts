import { join } from "path";

const setUpConfig = () => {
  return {
    target: "node",
    entry: join(__dirname, "src", "app.ts"),
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(ts)$/,
          include: join(__dirname, "src"),
          exclude: [/(node_modules)/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-env",
                    {
                      bugfixes: true,
                      useBuiltIns: "usage",
                      corejs: "3",
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    output: { path: join(__dirname, "dist") },
    resolve: {
      extensions: [".js", ".ts", ".json"],
      alias: {
        "~root": join(__dirname, "src"),
      },
    },
  };
};
export default setUpConfig;
