class Rental {
    constructor(user_id, cosplay_id, reservation_start, reservation_end, is_active){
        this.user_id = user_id
        this.cosplay_id = cosplay_id
        this.reservation_start = reservation_start
        this.reservation_end = reservation_end
        this.is_active = is_active
    }
}

module.exports = { Rental }