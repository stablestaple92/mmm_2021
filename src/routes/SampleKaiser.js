import React, { useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    } from 'firebase/auth';
    import { useHistory } from 'react-router';
import "./SampleKaiser.css";

/*
    2021/11/08
    1. 단순 가입 후 회원별 단계 차등 두기
    2. 회원 관리 할 수 있는 페이지 더 만들기
    3. 회원가입, 로그인 실패시 에러 메세지 띄우기 (상황별로 달라야함)
*/

const SamplerKaiser = () => {
    const history = useHistory();
    const authService = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target:{name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
               data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // log in
               data = await signInWithEmailAndPassword(authService, email, password);
               history.push("/samplelaboratory");
            }
        } catch (error) {
            
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <div >
            <form className="form-submit" onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </div>
    );
}

export default SamplerKaiser;