import React, { useMemo } from 'react';

import Row from '../components/elements/Table/Row.jsx';
import RowDropdown from '../components/elements/Table/RowDropdown.jsx';



const useFilterTable = (arr) => {

    const getHiddenStr = (arr) => {
        const result = [];

        arr.map((item) => {

            // Если не ведется серийный учет
            if(!item.accounting_sn){
                result.push({
                    id: item.id_product,
                    id_nomenclature: item.id_nomenclature,
                    name: item.name,
                    id_warehouse: item.id_warehouse,
                    warehouse_title: item.warehouse_title,
                    id_category: item.id_category,
                    category_title: item.category_title,
                    sn: [],
                    count: item.count,
                    accounting_sn: item.accounting_sn
                });

                return;
            }

            // При наличии серийнного номера
            let index = result.findIndex((el) => {
                return el?.id_nomenclature == item?.id_nomenclature && el?.id_warehouse == item?.id_warehouse
            })

            if(index !== -1){
                result[index].sn.push({id: item.id_product, sn: item.sn})
            } else{
                result.push({
                    id: item.id_product,
                    id_nomenclature: item.id_nomenclature,
                    name: item.name,
                    id_warehouse: item.id_warehouse,
                    warehouse_title: item.warehouse_title,
                    id_category: item.id_category,
                    category_title: item.category_title,
                    sn: [{id: item.id_product, sn: item.sn}],
                    accounting_sn: item.accounting_sn
                })
            }
        })

        return result;
    }

    // Отсортированный список товаров
    let content = getHiddenStr(arr); 


    const bodyContent = useMemo(() => {
        return content.map((item) => {
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
