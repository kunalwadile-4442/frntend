/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
const getShowColumnKey = (tColumn, OptionSortMenu1?:any) => {
    const showTableColumn = [];
    if(OptionSortMenu1?.length>=0){
        tColumn?.filter?.((item)=>{
            const find = OptionSortMenu1?.find?.((item1)=>item1?.key == item?.key)
            if(find){
                showTableColumn?.push?.(item);
            }
        })
    }else{
        tColumn?.map?.((item)=>showTableColumn?.push?.(item));
    }
    const keysArray = showTableColumn?.map?.((item) => item?.key);
    if (keysArray) {
        type KeysArrayType = (typeof keysArray)[number];
        const convertArrayToObject = (
            arr: readonly any[]
        ): { [key in KeysArrayType]: any } => {
            return arr.reduce((obj, key) => {
                obj[key as KeysArrayType] = true;
                return obj;
            }, {} as { [key in KeysArrayType]: any });
        };

        const result = convertArrayToObject(keysArray);
        return result;
    } else {
        return null;
    }
};

const getDisabledList = (selectToggleItem) => {
    return selectToggleItem?.filter?.(item => !item?.disabled)
}

const getOptionColumnMenu = (columnOption, columnKey) => {
    if (columnOption?.length > 0) {
        return columnOption?.map?.((item: any) => {
            return {
                ...item,
                label: item?.name,
                value: item?.key,
            };
        });
    }
    return columnKey?.map?.((item: any) => {
        return {
            ...item,
            label: item?.name,
            value: item?.key,
        };
    });
}
const getTableColumn = (columnOption, columnKey) => {
    if (columnOption?.length > 0) {
        const checkList = columnOption?.filter?.((item1: any) => {
            const itemItem = columnKey?.find?.(
                (item: any) => item?.key == item1.key
            );
            if (itemItem) {
                return item1;
            }
        });
        return checkList?.map?.((item: any) => {
            return {
                ...item,
                label: item?.name,
                value: item?.key,
            };
        });
    }
    return columnKey?.map?.((item: any) => {
        return {
            ...item,
            label: item?.name,
            value: item?.key,
        };
    });
}
export {
    getShowColumnKey,
    getDisabledList,
    getOptionColumnMenu,
    getTableColumn,
}