import React, { useMemo, useState } from 'react';
import Row from '../components/elements/Table/Row.jsx';


const useFilterTable = (arr) => {

    const unique = {
       // id товара: Количество вариантов товара
    }

    arr.forEach(item => {
        if( unique.hasOwnProperty(`${item.id}`) ){
            unique[`${item.id}`] = unique[`${item.id}`] + 1
        } else{
            unique[`${item.id}`] = 1
        }   
    });

    console.log(unique);

    const bodyContent = useMemo(() => {
        return arr.map((item, index) => {
           // if (unique[`${item.id}`] === 1){
                return (
                    <Row product={item} />
                )
            //} else{
                //getHiddenStr(item, unique[`${item.id}`])
            //}

        });
    }, []);

    const getHiddenStr = (product, count) => {
        console.log (product, count)
    }

    return bodyContent;

}

export default useFilterTable;


// content = [
//     {
//       id: 1,
//       name: 'Монитор Asus P123DF',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: '123'
//     },
//     {
//       id: 1,
//       name: 'Монитор Asus P123DF',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: '123 '
//     },
//     {
//       id: 1,
//       name: 'Монитор Asus P123DF',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: 'пп'
//     },
//     {
//       id: 1,
//       name: 'Монитор Asus P123DF',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: '!!!'
//     },
//     {
//       id: 3,
//       name: 'АДМ Ligat',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: 'sn1'
//     },
//     {
//       id: 3,
//       name: 'АДМ Ligat',
//       id_warehouse: 12,
//       warehouse_title: '10-я линия В.О., 17к2',
//       id_category: 2,
//       category_title: 'Монитор',
//       sn: 'sn2'
//     }
//   ]



// bodyContent = useMemo(() => {
//     if (content === null) return getEmptyLine();
//     let table = content.map((item, index) => (
//       <tr>
//         <td>{item.id}</td>
//         <td>{item.warehouse_title}</td>
//         <td>{item.category_title}</td>
//         <td>{item.name}</td>
//         <td>{item.sn}</td>
//         <td>{item.count}</td>
//         <td>
//           <div className={styles.product_action}>
//             <AiOutlineInfoCircle
//               data-productID={item.id}
//               title="Информация"
//               onClick={(e) => {
//                 dispatch(
//                   setActive({ active: true, product_id: e.target.dataset.productID })
//                 );
//               }}
//             />
//             <BiTransfer title="Перемещение" />
//           </div>
//         </td>
//       </tr>
//     ));
//     return table;
//   }, [content]);