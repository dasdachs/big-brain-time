/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
	  testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": ["@swc/jest"],
    },
  }
};
