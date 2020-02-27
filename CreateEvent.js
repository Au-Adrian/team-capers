const ics = require('ics')
const fs = require('fs')

const event = {
    start: [2020, 3, 13, 10, 0],
    startOutputType: 'utc-10',
    end: [2020, 3, 13, 13, 0],
    endOutputType: 'utc-10',
    title: 'Study for exam',
    description: 'Study for exam in Hamilton Library',
    location: 'Hamilton Library',
}

//ics.createEvent
ics.createEvent(event, (error, value) => {
    if (error) {
        console.log(error)
        return
    }
    console.log(value)
    fs.writeFileSync(`./event.ics`, value)
})