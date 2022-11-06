import React, { useMemo } from 'react';

import Row from '../components/elements/Table/Row.jsx';
import RowDropdown from '../components/elements/Table/RowDropdown.jsx';



const useFilterTable = (arr) => {
    console.log('UseFILTER', arr)

    const getHiddenStr = (arr) => {
        const result = [];

        arr.map((item) => {

            // Если продукт имеет поле "Количество"
            if(item.hasOwnProperty('count')){
                result.push({
                    id: item.id,
                    name: item.name,
                    id_warehouse: item.id_warehouse,
                    warehouse_title: item.warehouse_title,
                    id_category: item.id_category,
                    category_title: item.category_title,
                    sn: [],
                    count: item.count
                });

                return;
            }

            // При наличии серийнного номера
            let index = result.findIndex((el) => {
                return el?.id == item?.id && el?.id_warehouse == item?.id_warehouse
            })

            if(index !== -1){
                result[index].sn.push(item.sn)
            } else{
                result.push({
                    id: item.id,
                    name: item.name,
                    id_warehouse: item.id_warehouse,
                    warehouse_title: item.warehouse_title,
                    id_category: item.id_category,
                    category_title: item.category_title,
                    sn: [item.sn]
                })
            }
        })

        console.log(result)
        return result;
    }

    let content = getHiddenStr(arr); 

    const bodyContent = useMemo(() => {
        return content.map((item, index) => {
            if(item.sn.length > 1){
                return(
                    <RowDropdown product={item} count={item.sn.length} sn={item.sn}/>
                )

            } else{
                return (
                    <Row product={item} />
                ) 
            }
        });
    }, [content]);


    return bodyContent;
}

export default useFilterTable;
