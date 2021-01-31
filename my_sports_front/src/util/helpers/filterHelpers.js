export const getVisibleEvents = (events, filters) => {
    return events.filter((event) => {
        const nameMatch = event.title.toLowerCase().includes(filters.name.toLowerCase());
        let sportMatch 
        if (filters.sport.length > 0) {
            sportMatch = filters.sport.includes(event.sport);
        } else {
            sportMatch = event.sport.includes(filters.sport);
        }
        const dateMatch = event.date.slice(0, 10).includes(filters.date);
        let timeMatch
        if (filters.time.length > 0) {
            timeMatch = filters.time.includes(event.time);
        } else {
            timeMatch = event.time.includes(filters.time);
        }
        let locationMatch
        if (filters.location.length > 0) {
            locationMatch = filters.location.includes(event.location);
        } else {
            locationMatch = event.location.includes(filters.location);
        }
        let sizeMatch = true;
        if (event.size < filters.minSize) {
            sizeMatch = false
        }
        if (event.size > filters.maxSize) {
            sizeMatch = false
        }
        let skillMatch = true;
        if (event.skill < filters.minSkill) {
            skillMatch = false
        }
        if (event.skill > filters.maxSkill) {
            skillMatch = false
        }
        return nameMatch && sportMatch && dateMatch && timeMatch && locationMatch && sizeMatch && skillMatch;
    });
};