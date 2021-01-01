import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
    return (
        <div>
            <p>This page is about you</p>
            <Link to="/edit-profile">Edit Profile</Link>
        </div>
    )
}
