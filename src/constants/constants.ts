import moment from "moment";

export const DAYS_ARRAY = [
    moment().subtract(1, 'day').format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
    moment().add(1, 'day').format('YYYY-MM-DD')
]