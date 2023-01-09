export const api = async (url, options) => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/${url}`,
		options
	);
	if (!response.ok) {
		throw response;
	}
	return response.json();
};

export const search = async (query) =>
	query ? api(`character/?name=${query}`) : api("character");

export const detail = async (id) => api(`character/${id}`);
