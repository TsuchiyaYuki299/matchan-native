module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel", // ★ plugins から presets のお引越し！
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
