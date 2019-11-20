package com.grkj.common.base;

public interface ReadOnlyRestFulContoller<T> extends BaseRestfulController<T> {

	@Override
	default boolean isPermitDelete(Object id) {
		return false;
	}

	@Override
	default boolean isPermitSave(T data, SaveType saveType) {
		return false;
	}
	
	
}
