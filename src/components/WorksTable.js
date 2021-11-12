import { isBrowserExtension } from "@firebase/util";
import React, { useState } from "react";
import "./WorksTable.css";

/*
    2021/11/12
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
        <table id="table-works">
            <tbody>
                <tr>
                    <td></td>
                    <td>Jacket</td>
                    <td>Title</td>
                    <td>Catalog Num.</td>
                    <td>Release</td>
                    <td>Origin</td>
                    <td>Form</td>
                    <td>Event</td>
                    <td>Price</td>
                    <td>HP Link</td>
                    <td>Youtube Link</td>
                    <td>Comment</td>
                </tr>
                {works.map((work) => (   
                    <>
                    {work ? (
                        <tr key={work.id}>
                        <td><input type="checkbox" value={work.id} onChange={checkHandler}></input></td>
                        <td><img src={work.jacketURL} /></td>
                        <td>{work.title}</td>
                        <td>{work.catalog}</td>
                        <td>{work.releaseType}</td>
                        <td>{work.originType}</td>
                        <td>{work.formType}</td>
                        <td>{work.event}</td>
                        <td>{work.price}</td>
                        <td>{work.hplink}</td>
                        <td>{work.ytlink}</td>
                        <td>{work.comment}</td>
                        <td>✎</td>
                        <td>𝗫</td>
                        </tr>
                    ):(
                        <tr>
                        <td>There is no discography. Add some!</td>
                        </tr>
                    )}
                    </>
                ))}
            </tbody>
        </table>
    );
}

export default WorksTable;