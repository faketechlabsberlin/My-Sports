import React from 'react'
import { findEvents } from '../actions/event';

export default function FindEventPage() {
    const getBeachVolleyballEvents = async () => {
        fetch('api/event/beachvolleyball')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const getBasketballEvents = async () => {
        fetch('api/event/basketball')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const getFootballEvents = async () => {
        fetch('api/event/football')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div>
            <p>What are you looking for?</p>
            <button onClick={getBeachVolleyballEvents}>Beach Volleyball</button>
            <button onClick={getBasketballEvents}>Basketball</button>
            <button onClick={getFootballEvents}>Football</button>
            <p>Didn't find what you were looking for? <a href="/create-event">Create your own event!</a></p>
        </div>
    )
}
