import { tryit } from 'radash';
import type { ScienceQueryPartialDto } from '@cts-shared';
import { apiFetchScienceList } from '../apis/science';

export const getFetchScienceList = async (query: ScienceQueryPartialDto = {}) => {
	// const { updateList } = useAppleDeviceStore();
	// const validation = apiContract.getListRes.responses[200];
	const [err, res] = await tryit(apiFetchScienceList)(query);

	if (err)
		throw new Error(err.toString());

	return res;
};
