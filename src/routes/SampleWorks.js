import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dbService, storageService } from "fbase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "@firebase/firestore";
import { useHistory } from "react-router";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid"; 
import WorksTable from "components/WorksTable";

/*
    2021/11/12
    앞으로의 기능 추가 예정
    1. 파일 크기 제한
    2. map id해결 보기
*/

const SampleWorks = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    const [sampleJacket, setSampleJacket] = useState("");
    const [fileName, setFileName] = useState("");
    const [works, setWorks] = useState([]);
    const {register, handleSubmit} = useForm();

    // 로그인 안하면 내쫒기
    if(!isLoggedIn) {
        history.push("/");
    }

    const getWorks = async () => {
        const dbWorks = await getDocs(collection(dbService, "works"));
        dbWorks.forEach((works) => {
            console.log(works);
            const worksObj = {
                ...works.data(),
                id: works.id,
            };
            setWorks((prev) => [worksObj, ...prev]);
        });
    }

    useEffect(() => {
        getWorks();
    }, []);

    // 앨범 정보 등록하기
    const onSubmit = async (data) => {
        const storageRef = ref(storageService, `jacketImg/${fileName}`);
        const response = await uploadString(storageRef, sampleJacket, "data_url");
        const fileURL = await getDownloadURL(response.ref);
        await setDoc(doc(dbService, "works", uuidv4()), {
            jacketURL : fileURL,
            releaseType : data.releaseType,
            originType : data.originType,
            formType : data.formType,
            title : data.title,
            catalog : data.catalog,
            event : data.event,
            price : data.price,
            hplink : data.hplink,
            ytlink : data.ytlink,
            comment : data.comment,
            createAt : serverTimestamp(),
            creatorId : userObj.uid,
        });
        setSampleJacket("");
        getWorks();
    };

    const onSampleJacket = (event) => {
        const reader = new FileReader();
        const {target : {files},} = event;
        const file = files[0];
        reader.onloadend = (event) => {
            const {
                currentTarget: {result},
            } = event;  
            setSampleJacket(result);
            setFileName(file.name);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSampleJacket("");
            setFileName("");
        }
    }

    return (
        <>
        <WorksTable works={works} />

        <img id="sample"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            {sampleJacket &&
                <img src={sampleJacket} alt="jacketsample"/>
            }
                <input {...register("jacket")} onChange={onSampleJacket} type="file"/>
        
            <select {...register("releaseType")}>
                <option value="Regular">Regular</option>
                <option value="EP">EP</option>
                <option value="Guest">Guest</option>
            </select>
            <select {...register("originType")}>
                <option value="Original">Original</option>
                <option value="Remix">Remix</option>
                <option value="Special">Special</option>
            </select>
            <select {...register("formType")}>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
                <option value="CD & Digital">CD & Digital</option>
                <option value="Etc.">Etc.</option>
            </select>
            <input {...register("title")} name="title" type="text" placeholder="Title"/>
            <input {...register("catalog")} name="catalog" type="text" placeholder="Catalog No."/>
            <input {...register("event")} name="event" type="text" placeholder="Event"/>
            <input {...register("price")} name="price" type="number" placeholder="Price"/>
            <input {...register("hplink")} name="hplink" type="text" placeholder=" Link"/>
            <input {...register("ytlink")} name="ytlink" type="text" placeholder="Youtube Link"/>
            <textarea {...register("comment")} name="comment"></textarea>
            <input type="submit" value="Save"/>
        </form>
        </>
    );
}

export default SampleWorks;