import React, { useMemo } from 'react';
import Row from '../components/elements/Table/Row.jsx';
import RowDropdown from '../components/elements/Table/RowDropdown.jsx';



const useFilterTable = (arr) => {

    const unique = {
       // id товара: Количество вариантов товара
    }

    

    // arr.forEach(item => {
    //     if( unique.hasOwnProperty(`${item.id}`) ){
    //         unique[`${item.id}`] = unique[`${item.id}`] + 1
    //     } else{
    //         unique[`${item.id}`] = 1
    //     }   
    // });

    // console.log(unique);

    // const bodyContent = useMemo(() => {
    //     return arr.map((item, index) => {
    //        // if (unique[`${item.id}`] === 1){
    //             return (
    //                 <Row product={item} />
    //             )
    //        // } 

    //     });
    // }, []);


    const getHiddenStr = (arr) => {
        const result = [];

        arr.map((item) => {
            let index = result.findIndex((el) => {
                return el?.id == item?.id
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
    }, []);


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