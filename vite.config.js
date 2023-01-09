// Create config that includes custom plugin that outputs bundled js into console

const config = {
	plugins: [
		{
			name: "inplace css into templates",
			generateBundle(options, bundle, isWrite) {
				const keys = Object.keys(bundle);
				const styles = keys.filter((key) => key.endsWith(".css"))[0];
				const scripts = keys.filter((key) => key.endsWith(".js"))[0];
				bundle[scripts].code = bundle[scripts].code.replace(
					/\/dist\/output.css/g,
					styles
				);
			},
		},
	],
};

export default config;
