const months = [
    'Jan',
     'Feb',
     'Mar',
     'Apr',
     'May',
     'Jun',
     'Jul',
     'Aug',
     'Sep',
     'Oct',
     'Nov',
     'Dec',
    ]

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-")
    const formattedMonth = months[parseInt(month)-1]
    return `${day}-${formattedMonth}-${year}`
}

export const formatDateTime = (dateString) => {
    const [date, time] = dateString.split(" ")
    const [year, month, day] = date.split("/")
    const formattedMonth = months[parseInt(month)-1]
    return `${day}-${formattedMonth}-${year} ${time}:18.570+00:00`
}

export const formatDate2 = (dateString) => {
    const [day, month, year] = dateString.split("/")
    const formattedMonth = months[parseInt(month)-1]
    return `${day}-${formattedMonth}-${year}`
}
