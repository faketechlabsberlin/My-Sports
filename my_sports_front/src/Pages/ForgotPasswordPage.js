import React from 'react'
import { requestEmail } from '../util/password';

export default function ForgotPasswordPage({ history }) {
    const sendEmail = async (e) => {
        e.preventDefault();
        const input = {
            email: e.target.email.value
        }
        await requestEmail(input)
        history.push('/login')
    }
    
    return (
        <div>
            <h2>Password Reset Form</h2>
            <form onSubmit={sendEmail}>
                <label htmlFor="email">Enter email:</label>
                <input type="email" id="email" name="email" placeholder="email" required></input>
                <button>Send Email!</button>
            </form>
        </div>
    )
}
