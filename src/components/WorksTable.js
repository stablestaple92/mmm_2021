import { isBrowserExtension } from "@firebase/util";
import React, { useState } from "react";
import "./WorksTable.css";

/*
    2021/11/15
    앞으로의 기능 추가 예정
    1. 체크시 테이블 row style변화 주기
    2. css
*/

const WorksTable = ({ works }) => {
    const [checked, setChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Set());

    const checkHandler = ({ target }) => {
        setChecked(!checked);
        checkedItemsHandler(target.parentNode, target.value, target.checked);
    }

    const checkedItemsHandler = (parentNode, id, checked) => {
        if (checked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
        } else if (!checked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
        }
        return checkedItems;
    };
    

    return (
        <table className="table-works">
            <thead>
                <tr>
                    <td></td>
                    <td >Jacket</td>
                    <td className="table-title">Title</td>
                    <td className="table-catalog">Catalog Num.</td>
                    <td className="table-update">Last Update</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {works.length !== 0 ? (
                    <>
                        {works.map((work) => (   
                            <tr key={work.id}>
                            <td><input type="checkbox" value={work.id} onChange={checkHandler}></input></td>
                            <td className="table-jacket"><img src={work.jacketURL} /></td>
                            <td>{work.title}</td>
                            <td>{work.catalog}</td>
                            <td>{work.updateTime}</td>
                            <td>Edit</td>
                            <td>Delete</td>
                            </tr>
                        ))}
                    </>
                ):(
                    <>
                        <tr>
                        <td colSpan="7" className="no-works">There is no discography. Add some!</td>
                        </tr>
                    </>
                )}
            </tbody>
            <tfoot>
                <>
                    <tr>
                    <td colSpan="7" className="length-works">Total Items : {works.length}</td>
                    </tr>
                </>
            </tfoot>
        </table>
    );
}

export default WorksTable;