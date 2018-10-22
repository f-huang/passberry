import EnumScanState from "../EnumScanState";

const getScanState = (ticket) => {
	if (ticket === null)
		return EnumScanState.NOT_FOUND;
	else if (ticket.usedTime !== null)
		return EnumScanState.ALREADY_USED;
	else
		return EnumScanState.SUCCESS;
};

export default getScanState;